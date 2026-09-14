# Bakes the scratchpad fetch into shared/artist-data.js + shared/assets/a-art/.
# Tolerant of missing files (the fetch is long); re-run at the end for the full set.
import json, os, re, glob, shutil, collections
S = os.environ.get("ARTIST_CACHE") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
A = os.path.join(REPO, "shared/assets/a-art"); os.makedirs(A + "/members", exist_ok=True); os.makedirs(A + "/gallery", exist_ok=True)
RUMOURS = 38722

def J(p):
    try: return json.load(open(p))
    except Exception: return None

art = J(S + "/artist.json"); idx = J(S + "/releases-all.json") or []
main = [r for r in idx if r.get("role") == "Main"]

# ---- profile: strip Discogs BBCode into plain paragraphs ----
def strip_bb(t):
    t = re.sub(r"\[url=[^\]]*\](.*?)\[/url\]", r"\1", t, flags=re.S)
    t = re.sub(r"\[url\](.*?)\[/url\]", r"\1", t, flags=re.S)
    t = re.sub(r"\[(a|l|m|r)=([^\]]*)\]", r"\2", t)           # [a=Name] -> Name
    t = re.sub(r"\[(a|l|m|r)(\d+)\]", "", t)                   # bare id refs
    t = re.sub(r"\[/?(b|i|u|s|quote)\]", "", t)
    t = t.replace("\r", "")
    paras = [re.sub(r"\s*\n\s*", " ", p).strip() for p in re.split(r"\n\s*\n", t)]
    return [p for p in paras if p]
profile = strip_bb(art.get("profile", ""))
m = re.search(r"Founded in ([A-Z][a-zA-Z ]+?) in (?:[A-Za-z]+ )?(\d{4})", art.get("profile", ""))
origin = m.group(1) if m else None

# ---- discography ----
VIDEO = {"DVD", "DVDr", "Blu-ray", "Blu-ray-R", "VHS", "Laserdisc", "Betamax", "Video 8", "HD DVD", "CDV", "Video 2000", "UMD", "Film Reel"}
def category(names, descs):
    d = " ".join(descs); n = set(names)
    if n & VIDEO or "NTSC" in d or "PAL" in d: return "videos"
    if "Compilation" in d: return "compilations"
    if re.search(r"\b(Single|EP|Maxi-Single)\b", d): return "singles"
    if re.search(r"\b(Album|Mini-Album)\b", d): return "albums"
    # a 7" or 45 RPM disc, or a bare 12", is a single/EP even when the
    # descriptor is missing — that is how Discogs files them
    if '7"' in " ".join(names) or "45 RPM" in d or ('12"' in " ".join(names) and "LP" not in d): return "singles"
    return "misc"
def fmt_label(formats):
    if not formats: return ""
    f = formats[0]; q = f.get("qty", "1")
    return ("%s×%s" % (q, f["name"])) if q not in ("1", "", None) else f["name"]

items = []; missing_art = 0
for r in main:
    it = {"id": r["id"], "kind": r["type"], "title": r["title"], "year": r.get("year") or None,
          "inCollection": r.get("stats", {}).get("community", {}).get("in_collection", 0),
          "inWantlist": r.get("stats", {}).get("community", {}).get("in_wantlist", 0),
          "isRumours": r["type"] == "master" and r["id"] == RUMOURS}
    names, descs = [], []
    if r["type"] == "master":
        md = J("%s/masters/%d.json" % (S, r["id"])) or {}
        it["genres"] = md.get("genres", []); it["forSale"] = md.get("num_for_sale"); it["lowestPrice"] = md.get("lowest_price")
        rel = J("%s/releases/%s.json" % (S, md.get("main_release"))) if md.get("main_release") else None
        fm = (rel or {}).get("formats") or []
        src = "%s/art/m%d.jpg" % (S, r["id"]); dst = "m%d.jpg" % r["id"]
    else:
        rel = J("%s/releases/%d.json" % (S, r["id"])) or {}
        fm = rel.get("formats") or []
        if not fm and r.get("format"):                      # fall back to the index string
            toks = [t.strip() for t in r["format"].split(",")]
            fm = [{"name": toks[0], "qty": "1", "descriptions": toks[1:]}]
        it["genres"] = rel.get("genres", []); it["forSale"] = rel.get("num_for_sale"); it["lowestPrice"] = rel.get("lowest_price")
        src = "%s/art/r%d.jpg" % (S, r["id"]); dst = "r%d.jpg" % r["id"]
    for f in (fm or []):  # real data: descriptions (or formats) can be null
        names.append(f.get("name") or ""); descs += (f.get("descriptions") or [])
    it["category"] = category(names, descs); it["format"] = fmt_label(fm)
    if os.path.exists(src) and os.path.getsize(src) > 0:
        shutil.copyfile(src, os.path.join(A, dst)); it["art"] = "shared/assets/a-art/" + dst
    else:
        it["art"] = None; missing_art += 1
    items.append(it)
items.sort(key=lambda x: (x["year"] or 9999, x["title"]))
disc = collections.OrderedDict((k, []) for k in ["albums", "singles", "compilations", "videos", "misc"])
for it in items: disc[it["category"]].append(it)
popular = [it["id"] for it in sorted([i for i in items if i["kind"] == "master"], key=lambda x: -x["inCollection"])[:12]]

# ---- members ----
members = []
for mm in art.get("members", []):
    p = "%s/members/%d.jpg" % (S, mm["id"]); photo = None
    if os.path.exists(p) and os.path.getsize(p) > 0:
        shutil.copyfile(p, A + "/members/%d.jpg" % mm["id"]); photo = "shared/assets/a-art/members/%d.jpg" % mm["id"]
    members.append({"id": mm["id"], "name": mm["name"], "active": bool(mm.get("active")), "photo": photo})
members.sort(key=lambda x: (not x["active"], x["name"]))

# ---- gallery ----
gallery = []
imgs = [i for i in art.get("images", []) if i.get("uri") and i.get("width", 0) >= 450][:8]
for n, i in enumerate(imgs):
    p = "%s/gallery/g%d.jpg" % (S, n)
    if os.path.exists(p) and os.path.getsize(p) > 0:
        shutil.copyfile(p, A + "/gallery/g%d.jpg" % n)
        gallery.append({"src": "shared/assets/a-art/gallery/g%d.jpg" % n, "w": i["width"], "h": i["height"]})
if not gallery: gallery.append({"src": "shared/assets/r-art/artist.jpg", "w": 600, "h": 722})

years = [i["year"] for i in items if i["year"]]
out = {
    "id": art["id"], "name": art["name"], "realname": art.get("realname"), "origin": origin,
    "profile": profile, "urls": art.get("urls", []), "namevariations": len(art.get("namevariations", [])),
    "firstYear": min(years) if years else None, "lastYear": max(years) if years else None,
    "gallery": gallery, "members": members, "popular": popular,
    "stats": {"mainMasters": sum(1 for i in items if i["kind"] == "master"), "mainReleases": sum(1 for i in items if i["kind"] == "release"),
              "indexEntries": len(idx), "inCollection": sum(i["inCollection"] for i in items), "inWantlist": sum(i["inWantlist"] for i in items)},
    "discography": disc,
}
hdr = ("// Fleetwood Mac (Discogs artist 47333) — REAL data from the public Discogs API,\n"
       "// baked by tools/artist/bake.py (run tools/artist/fetch.py first) (unauthenticated: profile, members, images, the\n"
       "// Main-role discography with covers from /masters and /releases). Regenerate, don't hand-edit.\n")
open(os.path.join(REPO, "shared/artist-data.js"), "w").write(hdr + "const ARTIST = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
print("baked: items %d (missing art %d) | groups %s | members %d (photos %d) | gallery %d | profile paras %d | origin %s | years %s–%s" % (
    len(items), missing_art, {k: len(v) for k, v in disc.items()}, len(members), sum(1 for x in members if x["photo"]), len(gallery), len(profile), origin, out["firstYear"], out["lastYear"]))
