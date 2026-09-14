import json, os, sys, time, glob, urllib.request, urllib.error
S = os.environ.get("ARTIST_CACHE") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")  # fetched JSON + images (gitignored)
UA = "discogs-master-a-poc prototype/1.0 (unauthenticated; paced)"
API_SLEEP = 2.6            # 25 req/min unauthenticated -> ~23/min with headroom
log = open(os.path.join(S, "progress.log"), "a")
def L(msg):
    log.write(time.strftime("%H:%M:%S ") + msg + "\n"); log.flush()

def api(url, tries=4):
    for t in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read().decode("utf-8"))
            time.sleep(API_SLEEP); return data
        except urllib.error.HTTPError as e:
            if e.code == 429: L("429 on %s — backing off 65s" % url); time.sleep(65)
            elif 500 <= e.code < 600: L("%d on %s — retry %d" % (e.code, url, t+1)); time.sleep(10)
            else: L("HTTP %d on %s — giving up" % (e.code, url)); return None
        except Exception as ex:
            L("error %s on %s — retry %d" % (ex, url, t+1)); time.sleep(10)
    return None

def download(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 0: return True
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r, open(path, "wb") as f: f.write(r.read())
        time.sleep(0.3); return True
    except Exception as ex:
        L("download failed %s: %s" % (url, ex)); return False

# 0. repair the index: refetch any page that failed, rebuild releases-all.json
for f in sorted(glob.glob(S + "/pages/p*.json")):
    try: json.load(open(f))
    except Exception:
        p = f.split("/p")[-1][:-5]; L("refetching page " + p)
        d = api("https://api.discogs.com/artists/47333/releases?sort=year&sort_order=asc&per_page=100&page=" + p)
        if d: json.dump(d, open(f, "w"))
rs = []
for f in sorted(glob.glob(S + "/pages/p*.json"), key=lambda x: int(x.split("/p")[-1][:-5])):
    try: rs += json.load(open(f))["releases"]
    except Exception as ex: L("still bad: " + f)
json.dump(rs, open(S + "/releases-all.json", "w"))
main = [r for r in rs if r.get("role") == "Main"]
masters = [r for r in main if r.get("type") == "master"]
singles = [r for r in main if r.get("type") == "release"]
L("index: %d entries, Main %d (masters %d, releases %d)" % (len(rs), len(main), len(masters), len(singles)))

# 1. masters: detail (images, genres, for-sale) + main release (formats -> category)
for i, m in enumerate(masters):
    mp = "%s/masters/%d.json" % (S, m["id"])
    if not os.path.exists(mp):
        d = api("https://api.discogs.com/masters/%d" % m["id"])
        if d: json.dump(d, open(mp, "w"))
    if os.path.exists(mp):
        d = json.load(open(mp)); mr = d.get("main_release")
        rp = "%s/releases/%d.json" % (S, mr) if mr else None
        if rp and not os.path.exists(rp):
            r = api("https://api.discogs.com/releases/%d" % mr)
            if r: json.dump(r, open(rp, "w"))
        im = d.get("images") or []
        if im and im[0].get("uri150"): download(im[0]["uri150"], "%s/art/m%d.jpg" % (S, m["id"]))
    if i % 10 == 0: L("masters %d/%d" % (i + 1, len(masters)))

# 2. standalone Main releases: detail for images (format already in the index)
for i, r in enumerate(singles):
    rp = "%s/releases/%d.json" % (S, r["id"])
    if not os.path.exists(rp):
        d = api("https://api.discogs.com/releases/%d" % r["id"])
        if d: json.dump(d, open(rp, "w"))
    if os.path.exists(rp):
        im = json.load(open(rp)).get("images") or []
        if im and im[0].get("uri150"): download(im[0]["uri150"], "%s/art/r%d.jpg" % (S, r["id"]))
    if i % 20 == 0: L("releases %d/%d" % (i + 1, len(singles)))

# 3. members: photo per member
art = json.load(open(S + "/artist.json"))
for m in art.get("members", []):
    mp = "%s/members/%d.json" % (S, m["id"])
    if not os.path.exists(mp):
        d = api("https://api.discogs.com/artists/%d" % m["id"])
        if d: json.dump(d, open(mp, "w"))
    if os.path.exists(mp):
        im = json.load(open(mp)).get("images") or []
        if im and im[0].get("uri150"): download(im[0]["uri150"], "%s/members/%d.jpg" % (S, m["id"]))
L("members done")

# 4. gallery: primary + up to 7 more decent-sized photos, full size
imgs = [i for i in art.get("images", []) if i.get("uri") and i.get("width", 0) >= 450]
for n, i in enumerate(imgs[:8]):
    download(i["uri"], "%s/gallery/g%d.jpg" % (S, n))
L("gallery done: %d" % min(8, len(imgs)))

covers = len(glob.glob(S + "/art/*.jpg"))
summary = "DONE masters %d/%d detail | releases-json %d | covers %d/%d | members %d | gallery %d" % (
    len(glob.glob(S + "/masters/*.json")), len(masters), len(glob.glob(S + "/releases/*.json")),
    covers, len(masters) + len(singles), len(glob.glob(S + "/members/*.jpg")), len(glob.glob(S + "/gallery/*.jpg")))
L(summary); open(S + "/done.flag", "w").write(summary + "\n")
