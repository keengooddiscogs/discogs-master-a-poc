/* ==========================================================
   Variant A — app
   Renders every screen from DATA (shared/data.js).
   History-based routing: each drill-down pushes a state so the
   browser back button/gesture returns with scroll preserved.
   Only A-01 (Master, Tracklist tab open) is built so far; all
   other destinations show the "Not in this prototype" toast.
   ========================================================== */

(function () {
  "use strict";

  var app = document.getElementById("app");
  var toastEl = document.getElementById("toast");
  var toastTimer = null;

  function toast(msg) {
    toastEl.textContent = msg || "Not in this prototype";
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 1600);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function money(n) {
    return "$" + (Number.isInteger(n) ? n.toFixed(2) : n.toFixed(2));
  }

  // Display rule: group/version prices are never a bare "from $X".
  // The compact summary chip uses the "about $X" form (user changed
  // "typically" → "about" everywhere; full condition-qualified form
  // doesn't fit the 37px row — logged).
  function priceDisplay(pd) {
    if (!pd) return "";
    return "<span>about <b>$" + pd.typical + "</b></span>";
  }

  // ---------- screen: A-01 Master (Tracklist tab open) ----------

  function versionCardHTML(v) {
    var hasSummary = v.copiesForSale !== null && v.priceDisplay;
    var descLine = v.description ? '<p class="release-description">' + esc(v.description) + "</p>" : "";
    var editionPart = v.edition ? '<span>' + esc(v.edition) + "</span>" : "";
    var summary = hasSummary
      ? '<div class="listing-summary">' +
        '<div class="copies-count">' + v.copiesForSale + " copies for sale</div>" +
        '<div class="listing-price">' + priceDisplay(v.priceDisplay) + "</div>" +
        "</div>"
      : "";
    return (
      '<button class="version-card tappable' + (hasSummary ? " has-summary" : "") + '" data-action="version" data-version="' + esc(v.id) + '">' +
      '<div class="listing-card' + (hasSummary ? "" : " centered") + '">' +
      '<img class="thumb" src="' + esc(v.artwork) + '" alt="" />' +
      '<div class="card-content">' +
      '<p class="entity-type">' + esc(v.format) + "</p>" +
      '<p class="release-title">' + esc(v.title) + "</p>" +
      '<p class="artist-name">' + esc(v.artist) + "</p>" +
      descLine +
      '<p class="year-country">' +
      "<span>" + v.year + "</span>" +
      editionPart +
      '<span class="dot">•</span>' +
      "<span>" + esc(v.country) + "</span>" +
      "</p>" +
      "</div>" +
      "</div>" +
      summary +
      "</button>"
    );
  }

  function trackRowHTML(t) {
    return (
      '<div class="track-row">' +
      '<p class="track-position">' + esc(t.position) + "</p>" +
      '<div class="track-main">' +
      '<p class="track-title">' + esc(t.title) + "</p>" +
      '<p class="track-time">' + esc(t.time) + "</p>" +
      "</div>" +
      "</div>"
    );
  }

  // Tab area content — Tracklist (A-01) / Credits (frame 1470:274838)

  var currentTab = "tracklist";

  function tracklistTabHTML() {
    return (
      '<div class="tracklist">' +
      DATA.tracks.map(trackRowHTML).join("") +
      "</div>" +
      '<button class="scrobble-button tappable" data-action="scrobble">' +
      '<span class="surface"><img src="shared/assets/lastfm.svg" alt="" /><span class="label">Scrobble on Last.fm</span></span>' +
      "</button>"
    );
  }

  function creditsTabHTML() {
    return (
      '<div class="credits-content">' +
      DATA.credits
        .map(function (c) {
          return (
            '<div class="credit-group">' +
            '<p class="credit-role">' + esc(c.role) + "</p>" +
            '<button class="credit-person tappable" data-action="credit" data-name="' + esc(c.name) + '">' +
            '<img class="avatar" src="' + esc(c.avatar) + '" alt="" />' +
            '<span class="name">' + esc(c.name) + "</span>" +
            "</button>" +
            "</div>"
          );
        })
        .join("") +
      '<button class="button-secondary tappable" data-action="all-credits">' +
      '<span class="ttspace"></span>' +
      '<span class="surface"><span class="label">See all credits</span><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></span>' +
      '<span class="ttspace"></span>' +
      "</button>" +
      "</div>"
    );
  }

  function tabAreaInnerHTML() {
    return (
      '<div class="tab-list">' +
      '<button class="tab' + (currentTab === "tracklist" ? " current" : "") + ' tappable" data-action="tab-tracklist">Tracklist</button>' +
      '<button class="tab' + (currentTab === "credits" ? " current" : "") + ' tappable" data-action="tab-credits">Credits</button>' +
      "</div>" +
      '<div id="tab-content" class="tab-content-wrap">' +
      (currentTab === "tracklist" ? tracklistTabHTML() : creditsTabHTML()) +
      "</div>"
    );
  }

  function switchTab(tab) {
    if (tab === currentTab) return;
    currentTab = tab;
    var area = document.getElementById("tab-area");
    if (area) area.innerHTML = tabAreaInnerHTML();
  }

  // ---------- Variant D master (frame 1618:19413 "Master - Tracklist Open") ----------

  // a bare glyph, no count (user: numbers removed from the master header)
  function dSkittleHTML(icon, w, h) {
    return (
      '<span class="d-skittle">' +
      '<span class="sk-icon" style="width:' + w + "px;height:" + h + 'px;-webkit-mask-image:url(shared/assets/' + icon + '.svg);mask-image:url(shared/assets/' + icon + '.svg)"></span>' +
      "</span>"
    );
  }

  // ---------- Artist page (Fleetwood Mac, Discogs 47333) ----------
  // Real data from shared/artist-data.js (ARTIST). Mirrors the master page's
  // structure — fixed header, hero, action row, stats, CTAs, tabs — but the
  // hero is an immersive photo gallery. Only Rumours links out (to the
  // master); every other discography item toasts.
  var ARTIST_ID = 47333;
  var arState = { tab: "discography", open: {}, membersAll: false, bioAll: false };
  var AR_GROUPS = [["albums", "Albums"], ["singles", "Singles & EPs"], ["compilations", "Compilations"], ["videos", "Videos"], ["misc", "Miscellaneous"]];
  var AR_CLAMP = 6;

  // Items Discogs has no image for get a square monogram tile — initials of
  // the title on a tint hashed from it, like the label fallback.
  function arMonogramTile(title) {
    return (
      '<svg class="ar-mono" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<rect width="100" height="100" fill="' + monoTint(title) + '" />' +
      '<text class="sr-mono-text" x="50" y="50" text-anchor="middle" dominant-baseline="central">' + esc(monoInitials(title)) + "</text>" +
      "</svg>"
    );
  }
  function arArt(it, cls) {
    return it.art
      ? '<img class="' + cls + '" src="' + esc(it.art) + '" alt="" />'
      : '<span class="' + cls + ' mono">' + arMonogramTile(it.title) + "</span>";
  }

  function arItemAction(it) { return it.isRumours ? "ar-open-rumours" : "ar-item"; }

  function arItemHTML(it) {
    var meta = [it.year, it.format].filter(Boolean).join(" • ");
    return (
      '<button class="ar-item tappable" data-action="' + arItemAction(it) + '">' +
      arArt(it, "ar-item-art") +
      '<span class="ar-item-info">' +
      '<span class="ar-item-title">' + esc(it.title) + "</span>" +
      '<span class="ar-item-meta">' + esc(meta) + "</span>" +
      "</span>" +
      "</button>"
    );
  }

  function arGroupHTML(key, label) {
    var list = ARTIST.discography[key] || [];
    if (!list.length) return "";
    var open = !!arState.open[key];
    var shown = open ? list : list.slice(0, AR_CLAMP);
    return (
      '<section class="ar-group" data-group="' + key + '">' +
      '<h2 class="ar-group-title">' + label + ' <span class="count">' + list.length + "</span></h2>" +
      shown.map(arItemHTML).join("") +
      (list.length > AR_CLAMP
        ? '<button class="pf-more-btn tappable' + (open ? " up" : "") + '" data-action="ar-more" data-group="' + key + '">' +
          '<span class="lbl">' + (open ? "Show less" : "Show all " + list.length) + '</span><img src="shared/assets/b-chevdown.svg" alt="" /></button>'
        : "") +
      "</section>"
    );
  }

  function arMemberHTML(m) {
    var art = m.photo
      ? '<img class="ar-member-photo" src="' + esc(m.photo) + '" alt="" />'
      : '<span class="ar-member-photo mono">' + srMonogramHTML(m.name) + "</span>";
    return (
      '<div class="ar-member">' + art +
      '<span class="ar-member-info"><span class="ar-member-name">' + esc(m.name) + "</span>" +
      '<span class="ar-member-role">' + (m.active ? "Current member" : "Former member") + "</span></span>" +
      "</div>"
    );
  }

  var AR_LINK_NAMES = { wikipedia: "Wikipedia", youtube: "YouTube", facebook: "Facebook", "x": "X", twitter: "X", instagram: "Instagram", imdb: "IMDb", "last.fm": "Last.fm", myspace: "MySpace", allmusic: "AllMusic", discogs: "Discogs", spotify: "Spotify", bandcamp: "Bandcamp", soundcloud: "SoundCloud" };
  function arLinkLabel(u) {
    var host = u.replace(/^https?:\/\/(www\.|m\.|en\.)?/, "").split("/")[0].toLowerCase();
    var base = host.replace(/\.(com|org|net|co\.uk|io|tv)$/, "");
    return AR_LINK_NAMES[base] || AR_LINK_NAMES[host] || host; // the artist's own site keeps its domain
  }
  function arLinks() {
    var seen = {}, out = [];
    ARTIST.urls.forEach(function (u) { var l = arLinkLabel(u); if (!seen[l]) { seen[l] = true; out.push(l); } });
    return out;
  }

  function arTabBodyHTML() {
    var a = ARTIST;
    if (arState.tab === "members") {
      var cur = a.members.filter(function (m) { return m.active; });
      var former = a.members.filter(function (m) { return !m.active; });
      return (
        '<div class="ar-members">' +
        cur.map(arMemberHTML).join("") +
        (arState.membersAll ? former.map(arMemberHTML).join("") : "") +
        (former.length
          ? '<button class="pf-more-btn tappable' + (arState.membersAll ? " up" : "") + '" data-action="ar-members-more">' +
            '<span class="lbl">' + (arState.membersAll ? "Show fewer" : "Show " + former.length + " former members") + '</span><img src="shared/assets/b-chevdown.svg" alt="" /></button>'
          : "") +
        "</div>"
      );
    }
    if (arState.tab === "about") {
      var paras = arState.bioAll ? a.profile : a.profile.slice(0, 1);
      return (
        '<div class="ar-about">' +
        paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        (a.profile.length > 1
          ? '<button class="ar-readmore tappable" data-action="ar-readmore">' + (arState.bioAll ? "Read less" : "Read more") + "</button>"
          : "") +
        (a.realname ? '<p class="ar-fact"><span class="muted">Real name</span> ' + esc(a.realname) + "</p>" : "") +
        (a.namevariations ? '<p class="ar-fact"><span class="muted">Name variations</span> ' + a.namevariations + "</p>" : "") +
        (a.urls.length
          ? '<div class="ar-links">' + arLinks().map(function (l) {
              return '<button class="pf-chip tappable" data-action="ar-link"><span class="label">' + esc(l) + "</span></button>";
            }).join("") + "</div>"
          : "") +
        "</div>"
      );
    }
    return '<div class="ar-disc">' + AR_GROUPS.map(function (g) { return arGroupHTML(g[0], g[1]); }).join("") + "</div>";
  }

  function arTabsHTML() {
    return [["discography", "Discography"], ["members", "Members"], ["about", "About"]].map(function (t) {
      return '<button class="ar-tab tappable' + (arState.tab === t[0] ? " active" : "") + '" data-action="ar-tab" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("");
  }

  function arPopularHTML() {
    var byId = {};
    AR_GROUPS.forEach(function (g) { (ARTIST.discography[g[0]] || []).forEach(function (it) { byId[it.kind + it.id] = it; }); });
    var items = ARTIST.popular.map(function (id) { return byId["master" + id]; }).filter(Boolean);
    if (!items.length) return "";
    return (
      '<div class="ar-popular">' +
      '<h2 class="ar-sec-title">Popular</h2>' +
      '<div class="ar-popular-scroll">' +
      items.map(function (it) {
        return (
          '<button class="ar-pop tappable" data-action="' + arItemAction(it) + '">' +
          arArt(it, "ar-pop-art") +
          '<span class="ar-pop-title">' + esc(it.title) + "</span>" +
          '<span class="ar-pop-year">' + (it.year || "") + "</span>" +
          "</button>"
        );
      }).join("") +
      "</div></div>"
    );
  }

  function artistScreenHTML() {
    var a = ARTIST;
    var years = a.firstYear ? a.firstYear + "–" + (a.lastYear >= 2024 ? "present" : a.lastYear) : "";
    var meta = [a.origin, years, a.members.length ? a.members.length + " members" : ""].filter(Boolean).join(" • ");
    return (
      '<div class="screen">' +
      // fixed header, same construction as the master's: transparent over the
      // gallery, white + shadow once scrolled, name fades in as the hero passes
      '<div class="ma-header ar-header" id="ar-header">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="back-nav" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      '<span class="ma-header-title" id="ar-header-title">' + esc(a.name) + "</span>" +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      // immersive gallery hero: snap-scrolling real photos with the name over a shade
      '<div class="ar-gallery" id="ar-gallery">' +
      '<div class="ar-gallery-track" id="ar-gallery-track">' +
      a.gallery.map(function (g) { return '<img class="ar-gallery-img" src="' + esc(g.src) + '" alt="" />'; }).join("") +
      "</div>" +
      '<div class="ar-gallery-shade"></div>' +
      '<div class="ar-hero-text" id="ar-hero-text">' +
      '<p class="ar-eyebrow">Artist</p>' +
      '<h1 class="ar-name">' + esc(a.name) + "</h1>" +
      '<p class="ar-meta">' + esc(meta) + "</p>" +
      "</div>" +
      (a.gallery.length > 1
        ? '<div class="ar-dots" id="ar-dots">' + a.gallery.map(function (_, i) { return '<span class="ar-dot' + (i === 0 ? " on" : "") + '"></span>'; }).join("") + "</div>"
        : "") +
      "</div>" +
      // action row: play + the same wantlist eye pill as the master
      '<div class="d-actions ar-actions">' +
      '<button class="d-play tappable" data-action="play" aria-label="Play"><img src="shared/assets/b-play.svg" alt="" /></button>' +
      '<button class="d-skittle-group tappable" data-action="skittles" aria-label="Wantlist">' +
      dSkittleHTML("tab-wantlist", 18, 11.5) +
      "</button>" +
      "</div>" +
      // (the master's "availability + CTAs" slot is intentionally empty here:
      // the stats line and the "Shop <artist>" CTA were both removed by the
      // user; the ar-shop action is kept so the CTA is one line to restore)
      arPopularHTML() +
      // tabs (the master's Tracklist / Credits slot)
      '<div class="ar-tabs" id="ar-tabs">' + arTabsHTML() + "</div>" +
      '<div class="ar-tab-body" id="ar-tab-body">' + arTabBodyHTML() + "</div>" +
      '<div class="ar-foot"></div>' +
      "</div>"
    );
  }

  function refreshArtistTabs() {
    var t = document.getElementById("ar-tabs"), b = document.getElementById("ar-tab-body");
    if (t) t.innerHTML = arTabsHTML();
    if (b) b.innerHTML = arTabBodyHTML();
  }

  function openArtist() {
    if (typeof ARTIST === "undefined") { toast(); return; }
    if (document.getElementById("screen-artist")) return;
    pushScreen("artist", artistScreenHTML());
    var push = document.getElementById("screen-artist");
    push.classList.add("master-push"); // the overlay owns the scrolling
    // Once the slide-in has finished, drop the overlay's transform: a
    // transformed ancestor turns position:fixed into absolute, which would
    // let the header scroll away with the page (same fix as the master).
    var pin = function () { if (push.classList.contains("in") && !push.style.transform) push.style.transform = "none"; };
    push.addEventListener("transitionend", function (e) { if (e.target === push) pin(); });
    setTimeout(pin, 400); // transitionend can be skipped (hidden tab, reduced motion) — pin anyway
    var head = document.getElementById("ar-header");
    var hero = document.getElementById("ar-hero-text");
    push.addEventListener("scroll", function () {
      head.classList.toggle("scrolled", push.scrollTop >= 1);
      // title appears once the hero name has scrolled under the header:
      // compare scroll offset with the hero's bottom edge inside the scroller
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      head.classList.toggle("titled", push.scrollTop >= heroBottom - head.offsetHeight);
    }, { passive: true });
    var track = document.getElementById("ar-gallery-track");
    var dots = document.getElementById("ar-dots");
    if (track && dots) {
      track.addEventListener("scroll", function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle("on", k === i); });
      }, { passive: true });
    }
  }

  function masterScreenHTML() {
    var m = DATA.master;
    return (
      '<div class="screen">' +
      // fixed top header: transparent → bg+shadow at 1px scroll → +title
      // once the page title passes beneath it (frames 1845:144507/144103/143654)
      '<div class="ma-header" id="ma-header">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="back-nav" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      '<span class="ma-header-title" id="ma-header-title">' + esc(m.title) + "</span>" +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="cart" aria-label="Cart">' +
      '<span class="surface"><img class="glyph-cart" src="shared/assets/icon-cart.svg" alt="" /></span>' +
      "</button>" +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="screen-content ma-content">' +
      // compact hero: MASTER RELEASE / title / ALBUM • 2010 / artist
      '<div class="d-hero">' +
      '<div class="d-art-stack">' +
      '<span class="layer l1"></span><span class="layer l2"></span>' +
      '<span class="layer l3"><img src="' + esc(m.artwork) + '" alt="' + esc(m.title) + '" /></span>' +
      "</div>" +
      '<div class="d-hero-info">' +
      '<p class="d-overline">Master Release</p>' +
      '<h1 class="d-title">' + esc(m.title) + "</h1>" +
      '<p class="d-overline d-type-year"><span>' + esc(m.type) + '</span><span class="dot">\u2022</span><span>' + m.year + "</span></p>" +
      '<button class="d-artist tappable" data-action="artist">' + esc(m.artist) + "</button>" +
      "</div>" +
      "</div>" +
      // action row: play + skittle group
      '<div class="d-actions">' +
      '<button class="d-play tappable" data-action="play" aria-label="Play"><img src="shared/assets/b-play.svg" alt="" /></button>' +
      // just the wantlist eye in a round pill (user: collection + inventory
      // glyphs and all counts removed)
      '<button class="d-skittle-group tappable" data-action="skittles" aria-label="Wantlist">' +
      dSkittleHTML("tab-wantlist", 18, 11.5) +
      "</button>" +
      "</div>" +
      // availability + stacked CTAs
      '<div class="album-info-section d-info-section">' +
      '<div class="availability-section">' +
      "<div>" +
      '<p class="availability-header"><span>Available in</span></p>' +
      '<div class="format-chips d-chips">' +
      (function () {
        var fs = m.formats.length > 3 ? m.formats.slice(0, 2) : m.formats;
        var html = fs.map(function (f) {
          var icon = { Vinyl: "chip-vinyl", CD: "chip-cd", Cassette: "chip-cassette" }[f];
          return (
            '<button class="chip tappable" data-action="format" data-format="' + esc(f) + '">' +
            '<span class="surface">' + (icon ? '<img src="shared/assets/' + icon + '.svg" alt="" />' : "") + '<span class="label">' + esc(f) + "</span></span>" +
            "</button>"
          );
        }).join("");
        if (m.formats.length > 3) {
          html += '<button class="chip tappable" data-action="more-formats">' +
            '<span class="surface"><span class="label">+ ' + (m.formats.length - 2) + " more</span></span>" +
            "</button>";
        }
        return html;
      })() +
      "</div>" +
      "</div>" +
      '<button class="action-button-super tappable" data-action="shop-all" id="inline-cta">Shop all ' + fmtN(m.totalListings) + " listings</button>" +
      '<button class="d-versions-btn tappable" data-action="versions">All versions <span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      "</div>" +
      "</div>" +
      // tracklist / credits tabs (same as A)
      '<div class="tab-area" id="tab-area">' +
      tabAreaInnerHTML() +
      "</div>" +
      // artist card (frame 1836:93208) — live Discogs artist data
      '<div class="ma-artist-wrap">' +
      '<button class="ma-artist-card tappable" data-action="artist-card">' +
      '<img class="ma-artist-photo" src="' + esc(DATA.artistCard.photo) + '" alt="" />' +
      '<span class="ma-artist-info">' +
      '<span class="ma-artist-overline">Artist</span>' +
      '<span class="ma-artist-name">' + esc(DATA.artistCard.name) + "</span>" +
      '<span class="ma-artist-bio">' + esc(DATA.artistCard.bio) + "</span>" +
      "</span>" +
      "</button>" +
      "</div>" +
      // details rows: Notes / Lists / Videos (no Reviews in this frame)
      '<div class="details-section">' +
      '<div class="details-row">' +
      '<div class="divider top"></div>' +
      '<button class="details-row-link tappable" data-action="notes">' +
      "<h3>Notes, Genres &amp; Styles</h3>" +
      '<span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span>' +
      "</button>" +
      '<div class="divider"></div>' +
      "</div>" +

      '<div class="details-row">' +
      '<button class="details-row-link tappable" data-action="lists">' +
      "<h3>Lists</h3>" +
      '<span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span>' +
      "</button>" +
      '<div class="divider"></div>' +
      "</div>" +
      '<div class="details-row">' +
      '<button class="details-row-link tappable" data-action="videos">' +
      "<h3>Videos</h3>" +
      '<span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span>' +
      "</button>" +
      '<div class="divider"></div>' +
      "</div>" +
      "</div>" +
      "</div>" + // /screen-content
      // sticky bottom bar: "Available in / Vinyl, CD, Cassette" + CTA
      '<div class="bottom-action-bar" id="bottom-action-bar">' +
      '<span class="d-bar-text"><span class="muted">Available in</span><b>' + (m.formats.length > 3 ? m.formats.slice(0, 2).join(", ") + ", + " + (m.formats.length - 2) + " more" : m.formats.join(", ")) + "</b></span>" +
      '<button class="action-button-super tappable" data-action="shop-all">Shop ' + fmtN(m.totalListings) + " listings</button>" +
      "</div>" +
      '<div class="tab-bar">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>" +
      "</div>"
    );
  }

  // ---------- pre-filter screen (frame 1491:105487) ----------

  // D pre-filter (frame 1618:19684): media condition is a multi-select
  // chip group (best → worst display order), not a minimum slider.
  var GRADES = DATA.gradeScale.slice().reverse(); // Mint → Poor
  var filters = { formats: [], conditions: [], countries: [] };

  function fmtN(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // listings are weighted groups: each entry counts n copies
  function matchCount() {
    return DATA.listings.reduce(function (t, l) {
      if (filters.formats.length && filters.formats.indexOf(l.format) === -1) return t;
      if (filters.conditions.length && filters.conditions.indexOf(l.condition) === -1) return t;
      if (filters.countries.length && filters.countries.indexOf(l.country) === -1) return t;
      return t + (l.n || 1);
    }, 0);
  }

  function formatTileHTML(f) {
    var sel = filters.formats.indexOf(f) !== -1;
    var known = { Vinyl: "fmt-vinyl", CD: "fmt-cd", Cassette: "fmt-cassette" }[f];
    var cls = known ? { Vinyl: "vinyl", CD: "cd", Cassette: "cassette" }[f] : "";
    // long-tail formats: text-only tile, same square size as icon tiles
    var iconHTML = known
      ? '<span class="tile-icon ' + cls + '" style="-webkit-mask-image:url(shared/assets/' + known + '.svg);mask-image:url(shared/assets/' + known + '.svg)"></span>'
      : "";
    return (
      '<button class="format-tile tappable' + (known ? "" : " no-icon") + (sel ? " selected" : "") + '" data-action="pf-format" data-format="' + esc(f) + '">' +
      iconHTML +
      '<span class="tile-label">' + esc(f) + "</span>" +
      "</button>"
    );
  }

  // real data can have many formats: show the top 3 tiles, expand on demand
  var pfFormatsExpanded = false;

  // The format facet comes from listings, not DATA.master.formats: this master
  // has editions in 11 formats but only 4 have copies for sale, so tiles taken
  // from master.formats were guaranteed 0-result dead ends. Ordered by
  // master.formats to keep the intended tile order.
  var shoppableFormats = (function () {
    var seen = {};
    DATA.listings.forEach(function (l) { seen[l.format] = true; });
    var ordered = DATA.master.formats.filter(function (f) { return seen[f]; });
    // a listing format missing from master.formats still earns a tile
    Object.keys(seen).forEach(function (f) {
      if (ordered.indexOf(f) === -1) ordered.push(f);
    });
    return ordered;
  })();

  function formatTilesHTML() {
    var all = shoppableFormats;
    var list = pfFormatsExpanded ? all : all.slice(0, 3);
    var html = '<div class="pf-formats">' + list.map(formatTileHTML).join("") + "</div>";
    if (all.length > 3) {
      html += '<button class="pf-more-btn tappable' + (pfFormatsExpanded ? " up" : "") + '" data-action="pf-formats-more">' +
        '<span class="lbl">' + (pfFormatsExpanded ? "Show less" : "Show more") + '</span><img src="shared/assets/b-chevdown.svg" alt="" /></button>';
    }
    return html;
  }

  function conditionChipHTML(g) {
    var sel = filters.conditions.indexOf(g) !== -1;
    return (
      '<button class="pf-chip tappable' + (sel ? " selected" : "") + '" data-action="pf-condition" data-grade="' + esc(g) + '">' +
      '<span class="surface"><span class="label">' + esc(g) + "</span></span>" +
      "</button>"
    );
  }

  function countryChipHTML(c) {
    var sel = filters.countries.indexOf(c) !== -1;
    return (
      '<button class="pf-chip tappable' + (sel ? " selected" : "") + '" data-action="pf-country" data-country="' + esc(c) + '">' +
      '<span class="surface"><span class="label">' + esc(c) + "</span></span>" +
      "</button>"
    );
  }

  // Find your copy carries every facet the shop's Filters sheet has, in the
  // same order; the first three are open, the rest fold behind a chevron
  var pfOpen = { price: false, descriptions: false, years: false, currencies: false };
  function pfCollapsibleHTML(key, title, body, bodyClass) {
    return (
      '<div class="pf-card collapsible' + (pfOpen[key] ? "" : " closed") + '" data-card="' + key + '">' +
      '<button class="pf-card-head tappable" data-action="pf-toggle" data-card="' + key + '" aria-expanded="' + (pfOpen[key] ? "true" : "false") + '">' +
      "<h2>" + title + '</h2><img class="pf-card-chev" src="shared/assets/b-chevdown.svg" alt="" /></button>' +
      '<div class="pf-card-body' + (bodyClass ? " " + bodyClass : "") + '"><div class="pf-card-inner">' + body + "</div></div>" +
      "</div>"
    );
  }

  function prefilterScreenHTML() {
    var m = DATA.master;
    return (
      '<div class="pf-header" id="pf-header">' +
      '<button class="icon-btn tappable" data-action="pf-back" aria-label="Back"><img src="shared/assets/icon-arrow-left.svg" alt="" /></button>' +
      "<h1>Find your copy</h1>" +
      '<span class="icon-btn spacer"></span>' +
      "</div>" +
      '<div class="pf-content" id="pf-content">' +
      // product info
      '<div class="pf-card">' +
      '<div class="music-card">' +
      '<div class="art-stack">' +
      '<span class="layer l1"></span><span class="layer l2"></span>' +
      '<span class="layer l3"><img src="' + esc(m.artwork) + '" alt="" /></span>' +
      "</div>" +
      '<div class="mc-content">' +
      '<p class="mc-category">Master Release</p>' +
      "<div>" +
      '<p class="mc-title">' + esc(m.title) + "</p>" +
      '<p class="mc-sub"><span>' + esc(m.artist) + '</span><span class="muted">•</span><span class="muted">' + esc(m.type) + "</span></p>" +
      '<p class="mc-year">' + m.year + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      // formats
      '<div class="pf-card">' +
      "<h2>Formats</h2>" +
      '<div id="pf-formats">' + formatTilesHTML() + "</div>" +
      "</div>" +
      // media condition — multi-select chips, always fully exposed, with the
      // grading helper copy and an (i) that opens the grading sheet (frame 1816:160722)
      '<div class="pf-card">' +
      "<h2>Media Condition</h2>" +
      '<button class="info-btn tappable" data-action="pf-info" aria-label="About grading"><img src="shared/assets/icon-info.svg" alt="" /></button>' +
      '<p class="pf-help"><b>Very Good +</b>, and <b>Near Mint</b> balance quality and price. For grading info, tap the i button</p>' +
      '<div class="pf-chips no-clamp" id="pf-conditions">' + GRADES.map(conditionChipHTML).join("") + "</div>" +
      "</div>" +
      // ships from country
      '<div class="pf-card">' +
      "<h2>Ships from Country</h2>" +
      '<div class="pf-chips" id="pf-countries">' + DATA.shipsFromCountries.map(countryChipHTML).join("") + "</div>" +
      "</div>" +
      // the remaining shop-sheet facets, same order, collapsed (user)
      pfCollapsibleHTML("price", "Price Range", priceBodyHTML("pf")) +
      pfCollapsibleHTML("descriptions", "Format Description", descBodyHTML()) +
      pfCollapsibleHTML("years", "Release Year", yearsBodyHTML()) +
      '<div class="pf-card fs-offers"><h2>Accepts offers</h2>' + offersBodyHTML() + "</div>" + // stays exposed (user)
      pfCollapsibleHTML("currencies", "Currency", currencyBodyHTML()) +
      "</div>" +
      // action bar
      '<div class="pf-action-bar">' +
      '<button class="pf-reset tappable" data-action="pf-clear">Reset</button>' +
      '<button class="pf-cta d-pf-cta tappable" data-action="pf-shop" id="pf-cta">Shop ' + fmtN(shopResultCount()) + " listings</button>" +
      "</div>"
    );
  }

  // Two-line clamp for chip filter groups: if a group overflows two
  // 44px rows, collapse it and append Show more / Show less (chevron flips).
  function clampChipGroups(root) {
    var TWO_ROWS = 88;
    root.querySelectorAll(".pf-chips").forEach(function (group) {
      if (group.id === "pf-conditions" || group.classList.contains("no-clamp")) return; // media condition always fully exposed (user rule)
      var old = group.parentNode.querySelector(".pf-more-btn");
      if (old) old.remove();
      group.classList.remove("clamped");
      group.style.maxHeight = "";
      if (group.scrollHeight > TWO_ROWS + 4) {
        group.classList.add("clamped");
        var btn = document.createElement("button");
        btn.className = "pf-more-btn tappable";
        btn.innerHTML = '<span class="lbl">Show more</span><img src="shared/assets/b-chevdown.svg" alt="" />';
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var open = group.classList.toggle("expanded");
          btn.querySelector(".lbl").textContent = open ? "Show less" : "Show more";
          btn.classList.toggle("up", open);
        });
        group.parentNode.appendChild(btn);
      }
    });
  }

  function refreshPrefilter() {
    var el;
    if ((el = document.getElementById("pf-formats"))) el.innerHTML = formatTilesHTML();
    if ((el = document.getElementById("pf-conditions"))) el.innerHTML = GRADES.map(conditionChipHTML).join("");
    if ((el = document.getElementById("pf-countries"))) el.innerHTML = DATA.shipsFromCountries.map(countryChipHTML).join("");
    refreshPrefilterCount();
    var scr = document.getElementById("screen-prefilter");
    if (!scr) return;
    // drawer facets live in both surfaces: mirror the shared state here
    scr.querySelectorAll('.pf-chip[data-action="fs-chip"]').forEach(function (c) {
      c.classList.toggle("selected", drawerFilters[c.dataset.group].indexOf(c.dataset.value) !== -1);
    });
    var tg = scr.querySelector('[data-action="fs-offers"]');
    if (tg) tg.classList.toggle("on", drawerFilters.acceptsOffers);
    initPriceSlider(scr, "pf");
    clampChipGroups(scr);
  }
  function refreshPrefilterCount() {
    var el = document.getElementById("pf-cta");
    if (el) el.textContent = "Shop " + fmtN(shopResultCount()) + " listings";
  }

  // ---------- shop master screen (frame 1491:107920) ----------

  // Filters badge = number of applied pre-filters (each selected format,
  // each selected country, +1 if the min-condition slider was raised).
  function appliedFilterCount() {
    var d = drawerFilters;
    return filters.formats.length + filters.countries.length + filters.conditions.length +
      d.descriptions.length + d.years.length + d.currencies.length + (d.acceptsOffers ? 1 : 0) + (priceNarrowed() ? 1 : 0);
  }

  // The first shop listing is a real listing of the All versions page's top
  // card (the 1977 US Vinyl, r8960635): DATA.referenceListings[0] is baked
  // for exactly that version, at its typical price. It only appears while it
  // passes the active filters, and it carries the same wantlist eye as the
  // version card. Its grade is stored short ("VG+") — cards show full names.
  var COND_FULL = { M: "Mint", NM: "Near Mint", "VG+": "Very Good +", VG: "Very Good", "G+": "Good +", G: "Good", F: "Fair", P: "Poor" };

  function topShopListing(raw) {
    var r = DATA.referenceListings && DATA.referenceListings[0];
    if (!r) return null;
    var l = {};
    for (var k in r) l[k] = r[k];
    l.media = COND_FULL[r.media] || r.media;
    l.sleeve = COND_FULL[r.sleeve] || r.sleeve;
    l.priceNum = parseFloat(r.price) || 0;
    l.year = parseInt(r.yearLine, 10) || null;
    l.descTokens = descTokens(r.description);
    l.currency = currencyFor(r.country);
    l.acceptsOffers = true;
    l.listed = r.listed || "Sep 12";
    l.listedDaysAgo = listedDaysAgo(l.listed);
    l.isTop = true;
    if (raw) return l;
    return passesBase(l) && passesDrawer(l) ? l : null;
  }

  function shopListingCardsHTML() {
    var list = visibleListings().slice(0, 30);
    if (!list.length) return '<p class="sr-hint shop-empty">No listings match these filters</p>';
    return list.map(function (l) { return listingCardHTML(l, !!l.isTop); }).join("");
  }

  function listingCardHTML(l, isTop) {
    var seller = l.seller;
    var eye = isTop
      ? '<span class="vc-eye" role="img" aria-label="In wantlist">' +
        '<span class="sk-icon" style="-webkit-mask-image:url(shared/assets/tab-wantlist.svg);mask-image:url(shared/assets/tab-wantlist.svg)"></span>' +
        "</span>"
      : "";
    return (
      '<button class="shop-listing-card tappable" data-action="listing">' +
      eye +
      '<div class="listing-info">' +
      '<img class="art" src="' + esc(l.artwork) + '" alt="" />' +
      '<div class="info-col">' +
      '<p class="entity-type">' + esc(l.format) + "</p>" +
      '<p class="release-title">' + esc(l.title) + "</p>" +
      '<p class="artist-name">' + esc(l.artist) + "</p>" +
      '<p class="release-description">' + esc(l.description) + "</p>" +
      '<p class="year-country"><span>' + esc(l.yearLine) + '</span><span class="dot">•</span><span>' + esc(l.country) + "</span></p>" +
      "</div>" +
      "</div>" +
      '<div class="grade-row">' +
      '<span class="g-label">Media</span><span class="grade-chip media">' + esc(l.media) + "</span>" +
      '<span class="g-divider"></span>' +
      '<span class="g-label">Sleeve</span><span class="grade-chip sleeve">' + esc(l.sleeve) + "</span>" +
      "</div>" +
      '<p class="listing-price">$' + esc(l.price) + "</p>" +
      (l.note ? '<p class="listing-note">' + esc(l.note) + "</p>" : "") +
      (l.listed ? '<p class="listing-listed">Listed ' + esc(l.listed) + "</p>" : "") +
      '<div class="seller-section">' +
      '<p class="row">' +
      '<span class="s-name">' + esc(seller.name) + "</span>" +
      '<span class="s-dot">•</span>' +
      '<span class="s-rating">' + esc(seller.rating) + "</span>" +  // percent rating, no star (user)
      '<span class="s-reviews">' + esc(seller.reviews) + "</span>" +
      (seller.indieSeal ? '<img class="s-seal" src="shared/assets/icon-store-seal.svg" alt="" />' : "") +
      "</p>" +
      '<p class="row"><span class="muted">Ships from</span><span class="s-country">' + esc(seller.shipsFrom) + "</span></p>" +
      (l.freeShipping
        ? '<p class="row"><img class="s-truck" src="shared/assets/icon-truck.svg" alt="" /><span class="s-shipdeal">' + esc(l.freeShipping) + "</span></p>"
        : "") +
      (l.sellerHasItems
        ? '<span class="seller-wants"><span class="eye"></span>' + esc(l.sellerHasItems) + "</span>"
        : "") +
      "</div>" +
      "</button>"
    );
  }

  // ---------- active-filter chip rows ----------
  // Both chip rows used to be rebuilt with innerHTML on every filter change,
  // so one tap flashed and re-laid-out the whole row. Reconcile by
  // group|value key instead: untouched chips stay put, new ones expand in,
  // removed ones collapse out. Mirrors .af-chip.chip-motion in styles.css.
  var CHIP_MOTION_MS = 260;

  function activeFilterItems() {
    var items = [];
    filters.formats.forEach(function (v) { items.push(["formats", v]); });
    filters.conditions.forEach(function (v) { items.push(["conditions", v]); });
    filters.countries.forEach(function (v) { items.push(["countries", v]); });
    var d = drawerFilters;
    if (priceNarrowed()) items.push(["price", "$" + d.priceMin + "\u2013$" + d.priceMax]);
    d.descriptions.forEach(function (v) { items.push(["descriptions", v]); });
    d.years.forEach(function (v) { items.push(["years", v]); });
    d.currencies.forEach(function (v) { items.push(["currencies", v]); });
    if (d.acceptsOffers) items.push(["offers", "Accepts offers"]);
    return items;
  }

  function afChipHTML(it) {
    return (
      '<button class="af-chip tappable" data-action="af-remove" data-group="' + it[0] + '" data-value="' + esc(it[1]) + '">' +
      '<span class="label">' + esc(it[1]) + '</span><span class="x"></span>' +
      "</button>"
    );
  }

  function chipKey(group, value) { return group + "|" + value; }

  // width animates from/to an explicit px value: auto can't be transitioned
  function expandChipIn(el) {
    var w = el.offsetWidth;
    el.classList.add("chip-motion");
    el.classList.add("collapsed");
    el.style.width = "0px";
    void el.offsetWidth; // flush the collapsed start state
    el.classList.remove("collapsed");
    el.style.width = w + "px";
    setTimeout(function () {
      el.classList.remove("chip-motion");
      el.style.width = "";
    }, CHIP_MOTION_MS);
  }

  function collapseChipOut(el) {
    el.style.width = el.offsetWidth + "px";
    el.classList.add("chip-motion");
    void el.offsetWidth;
    el.classList.add("collapsed");
    el.style.width = "0px";
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, CHIP_MOTION_MS);
  }

  function replayRowIn(wrap) {
    wrap.classList.remove("row-in");
    void wrap.offsetWidth;
    wrap.classList.add("row-in");
  }

  // rowEl holds the chips; wrapEl carries the row entrance + empty state
  function syncChipRow(rowEl, wrapEl) {
    if (!rowEl) return;
    var items = activeFilterItems();
    var wanted = {};
    items.forEach(function (it) { wanted[chipKey(it[0], it[1])] = true; });

    var live = {};
    var had = 0;
    Array.prototype.forEach.call(rowEl.querySelectorAll(".af-chip"), function (el) {
      if (el.classList.contains("collapsed")) return; // already leaving
      had++;
      var key = chipKey(el.dataset.group, el.dataset.value);
      if (wanted[key]) live[key] = el;
      else collapseChipOut(el);
    });

    // walk the wanted order, inserting only what is missing
    var after = null;
    items.forEach(function (it) {
      var el = live[chipKey(it[0], it[1])];
      if (!el) {
        var tmp = document.createElement("div");
        tmp.innerHTML = afChipHTML(it);
        el = tmp.firstChild;
        if (after) rowEl.insertBefore(el, after.nextSibling);
        else rowEl.insertBefore(el, rowEl.firstChild);
        expandChipIn(el);
      }
      after = el;
    });

    if (wrapEl) {
      wrapEl.classList.toggle("is-empty", !items.length);
      if (!had && items.length) replayRowIn(wrapEl); // returning from empty
    }
  }

  // Active filter chips (frame 1845:144912): shown only when any
  // pre-filters are applied; each chip removes its filter.
  function activeChipsHTML() {
    var items = activeFilterItems();
    if (!items.length) return "";
    return (
      '<div class="active-chips row-in">' +
      '<div class="active-chips-scroll">' +
      items.map(afChipHTML).join("") +
      "</div>" +
      "</div>"
    );
  }

  // applied filters above the listings: one horizontally scrolling row
  // that scrolls away with the content (frame 1847:151563)
  function shopChipsRowHTML() {
    var items = activeFilterItems();
    if (!items.length) return "";
    return (
      '<div class="shop-active-chips row-in">' +
      items.map(afChipHTML).join("") +
      "</div>"
    );
  }

  function refreshShopFilters() {
    var host = document.getElementById("shop-active-chips");
    if (host) {
      var row = host.querySelector(".shop-active-chips");
      if (!row) {
        host.innerHTML = '<div class="shop-active-chips"></div>';
        row = host.querySelector(".shop-active-chips");
      }
      syncChipRow(row, row);
    }
    var cards = document.getElementById("shop-listings");
    if (cards) cards.innerHTML = shopListingCardsHTML();
    var n = appliedFilterCount();
    var pill = document.querySelector("#screen-shop .pill-button[data-action=\"shop-filters\"]");
    if (pill) {
      pill.classList.toggle("applied", n > 0);
      var badge = pill.querySelector(".badge");
      if (n > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "badge";
          pill.appendChild(badge);
        }
        badge.textContent = n;
      } else if (badge) badge.remove();
    }
  }

  // ---------- generated shop listings ----------
  // Expand the weighted listing groups (real per-format/condition/country
  // counts) into up to 30 cards that respect the active filters. Prices
  // derive from the matching version's about price x a condition factor
  // with deterministic jitter; sellers are a fixture pool.

  var SELLER_POOL = [
    { name: "CrazyGreatRecords", rating: "99%", reviews: "(64.8k)", indieSeal: true },
    { name: "VinylVaultNL", rating: "98%", reviews: "(12.3k)", indieSeal: true },
    { name: "SpinCitySounds", rating: "97%", reviews: "(3,412)", indieSeal: false },
    { name: "WaxStacksUK", rating: "99%", reviews: "(28.1k)", indieSeal: true },
    { name: "GrooveGarden", rating: "96%", reviews: "(987)", indieSeal: false },
    { name: "NeedleAndDust", rating: "100%", reviews: "(5,204)", indieSeal: false },
    { name: "TokyoRecordBar", rating: "99%", reviews: "(9,876)", indieSeal: true },
    { name: "MintConditionCo", rating: "98%", reviews: "(1,540)", indieSeal: false },
    { name: "SidewalkSpins", rating: "95%", reviews: "(742)", indieSeal: false },
    { name: "AnalogAttic", rating: "99%", reviews: "(15.7k)", indieSeal: true },
  ];

  var COUNTRY_NAMES = { US: "United States", UK: "United Kingdom" };
  var COND_SHORT = { "Mint": "M", "Near Mint": "NM", "Very Good +": "VG+", "Very Good": "VG", "Good +": "G+", "Good": "G", "Fair": "F", "Poor": "P" };
  var COND_FACTOR = { "Mint": 1.3, "Near Mint": 1.15, "Very Good +": 1.0, "Very Good": 0.8, "Good +": 0.6, "Good": 0.45, "Fair": 0.3, "Poor": 0.2 };
  var LISTING_NOTES = [
    "All inventory is new, sealed, truly mint, and ships in a protected mailer (See Seller Terms for more info). Quick turnaround, careful packing.",
    "Visual grade only \u2014 plays with light surface noise between tracks. Original inner sleeve included.",
    "Stored flat in a smoke-free home. Sleeve has minor ring wear, media looks barely played.",
    "Ships boxed with corner protectors. Combined shipping on multiple orders.",
  ];

  // relative timestamps per the Cards doc (minutes < 1h, hours < 24h,
  // days < 7d, then a date)
  var LISTED_AGO = ["18 minutes ago", "3 hours ago", "11 hours ago", "1 day ago", "2 days ago", "4 days ago", "6 days ago", "Aug 28"];

  function seededPick(arr, seed) {
    return arr[((seed * 2654435761) >>> 3) % arr.length];
  }

  // ---------- shop listing pool ----------
  // One deterministic pool of ~160 listings, expanded from the real weighted
  // groups (format / condition / country, n copies each) with every attribute
  // the Filters sheet can act on: numeric price, the version's description
  // tokens and year, a currency implied by the country, an accepts-offers
  // flag and a listed date. Filters and Sort operate on this pool, so every
  // control on the sheet has a visible, consistent effect.
  var CURRENCY_BY_COUNTRY = { US: "USD", UK: "GBP", "United Kingdom": "GBP", Japan: "JPY", Canada: "CAD", Australia: "AUD", Brazil: "BRL", "South Korea": "KRW", "South Africa": "ZAR", Singapore: "SGD" };
  function currencyFor(country) { return CURRENCY_BY_COUNTRY[country] || "EUR"; }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function listedDaysAgo(listed) {
    // LISTED_AGO mixes "18 minutes ago" / "3 hours ago" / "2 days ago" with
    // dates like "Aug 28"; turn all of them into days before the prototype's
    // fixed "today" (Sep 14) so Date listed sorts properly
    var t = String(listed || ""), m;
    if ((m = /(\d+)\s+minute/.exec(t))) return parseInt(m[1], 10) / 1440;
    if ((m = /(\d+)\s+hour/.exec(t))) return parseInt(m[1], 10) / 24;
    if ((m = /(\d+)\s+day/.exec(t))) return parseInt(m[1], 10);
    if ((m = /([A-Z][a-z]{2})\s+(\d{1,2})/.exec(t))) {
      var mi = MONTHS.indexOf(m[1]); if (mi === -1) return 0;
      return Math.max(0, Math.round((Date.UTC(2026, 8, 14) - Date.UTC(2026, mi, parseInt(m[2], 10))) / 86400000));
    }
    return 0;
  }
  function descTokens(desc) {
    return String(desc || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean);
  }

  var shopPoolCache = null;
  function shopPool() {
    if (shopPoolCache) return shopPoolCache;
    var groups = DATA.listings.slice().sort(function (a, b) { return (b.n || 1) - (a.n || 1); });
    var total = groups.reduce(function (t, g) { return t + (g.n || 1); }, 0);
    var count = 160, out = [], gi = 0;
    while (out.length < count && gi < 2000) {
      var g = groups[gi % groups.length];
      var quota = Math.max(1, Math.round(((g.n || 1) / total) * count));
      for (var k = 0; k < quota && out.length < count; k++) {
        var seed = out.length + 1;
        var pool = allVersions().filter(function (v) { return v.format === g.format && v.country === g.country && v.priceDisplay; });
        if (!pool.length) pool = allVersions().filter(function (v) { return v.format === g.format && v.priceDisplay; });
        if (!pool.length) pool = allVersions().filter(function (v) { return v.priceDisplay; });
        var v = seededPick(pool, seed * 13 + gi);
        var base = (v.priceDisplay && v.priceDisplay.typical) || DATA.master.aboutPrice || 30;
        var jitter = 1 + ((((seed * 37) % 41) - 20) / 100);
        var price = Math.max(2, base * (COND_FACTOR[g.condition] || 1) * jitter);
        var cents = [".00", ".00", ".50", ".99"][seed % 4];
        var sleeveIdx = Math.min(GRADES.length - 1, GRADES.indexOf(g.condition) + (seed % 2));
        var seller = seededPick(SELLER_POOL, seed * 7 + gi * 3);
        var listed = seededPick(LISTED_AGO, seed * 5);
        out.push({
          format: g.format, title: v.title, artist: v.artist,
          description: v.description || g.format, descTokens: descTokens(v.description),
          year: v.year, yearLine: String(v.year), country: g.country, currency: currencyFor(g.country),
          media: g.condition, sleeve: GRADES[sleeveIdx] || g.condition,
          priceNum: Math.floor(price) + parseFloat(cents), price: String(Math.floor(price)) + cents,
          acceptsOffers: seed % 3 !== 0,
          note: seed % 3 === 0 ? seededPick(LISTING_NOTES, seed) : null,
          listed: listed, listedDaysAgo: listedDaysAgo(listed),
          artwork: v.artwork,
          seller: { name: seller.name, rating: seller.rating, reviews: seller.reviews, shipsFrom: COUNTRY_NAMES[g.country] || g.country, indieSeal: seller.indieSeal },
          freeShipping: seed % 4 === 1 ? "Free shipping over $" + (50 + (seed % 4) * 50) : null,
          sellerHasItems: seed % 5 === 2 ? "Seller has " + (3 + (seed * 11) % 40) + " items you Want" : null,
        });
      }
      gi++;
    }
    // the pinned listing of the All versions top card joins the pool as a full citizen
    var top = topShopListing(true);
    if (top) out.unshift(top);
    shopPoolCache = out;
    return out;
  }

  function passesBase(l) {
    if (filters.formats.length && filters.formats.indexOf(l.format) === -1) return false;
    if (filters.conditions.length && filters.conditions.indexOf(l.media) === -1) return false;
    if (filters.countries.length && filters.countries.indexOf(l.country) === -1) return false;
    return true;
  }
  function passesDrawer(l) {
    var d = drawerFilters;
    if (d.priceMin !== null && l.priceNum < d.priceMin) return false;
    if (d.priceMax !== null && l.priceNum > d.priceMax) return false;
    if (d.descriptions.length && !d.descriptions.some(function (t) { return l.descTokens.indexOf(t) !== -1; })) return false;
    if (d.years.length && d.years.indexOf(String(l.year)) === -1) return false;
    if (d.currencies.length && d.currencies.indexOf(l.currency) === -1) return false;
    if (d.acceptsOffers && !l.acceptsOffers) return false;
    return true;
  }
  function drawerActive() {
    var d = drawerFilters;
    return !!(d.descriptions.length || d.years.length || d.currencies.length || d.acceptsOffers || priceNarrowed());
  }
  function priceNarrowed() {
    var d = drawerFilters; if (d.priceMin === null && d.priceMax === null) return false;
    var p = fsPrices(); return d.priceMin > Math.min.apply(null, p) || d.priceMax < Math.max.apply(null, p);
  }

  function sortListings(arr) {
    var asc = sortState.order === "Low to high", by = sortState.by;
    return arr.slice().sort(function (a, b) {
      var d;
      if (by === "Condition") d = GRADES.indexOf(b.media) - GRADES.indexOf(a.media); // GRADES runs Mint -> Poor: "low" = worst
      else if (by === "Date listed") d = b.listedDaysAgo - a.listedDaysAgo;            // "low" = oldest
      else d = a.priceNum - b.priceNum;
      return asc ? d : -d;
    });
  }

  // what the shop page shows: pool -> filters -> sort. Under the default sort
  // the pinned Rumours listing leads; once the user sorts, it takes its
  // natural place so the order is honest.
  function visibleListings() {
    var list = sortListings(shopPool().filter(function (l) { return passesBase(l) && passesDrawer(l); }));
    if (sortState.by + "|" + sortState.order === SORT_DEFAULT) {
      var i = -1; list.some(function (l, k) { if (l.isTop) { i = k; return true; } });
      if (i > 0) list.unshift(list.splice(i, 1)[0]);
    }
    return list;
  }

  // Result counts: the weighted groups give the real total for format /
  // condition / country; the sheet's other facets can't be counted from
  // groups, so scale that total by the pool's pass ratio — representational,
  // and always consistent with what the list shows.
  function shopResultCount() {
    var base = matchCount();
    if (!drawerActive()) return base;
    var pool = shopPool(), b = pool.filter(passesBase), a = b.filter(passesDrawer);
    return b.length ? Math.round(base * (a.length / b.length)) : 0;
  }

  function shopScreenHTML() {
    var m = DATA.master;
    var n = appliedFilterCount();
    return (
      '<div class="shop-header">' +
      '<div class="shop-product-row">' +
      '<button class="icon-btn tappable" data-action="screen-back" aria-label="Back"><img src="shared/assets/icon-arrow-left.svg" alt="" /></button>' +
      '<div class="music-card">' +
      '<div class="art-stack">' +
      '<span class="layer l1"></span><span class="layer l2"></span>' +
      '<span class="layer l3"><img src="' + esc(m.artwork) + '" alt="" /></span>' +
      "</div>" +
      '<div class="mc-content">' +
      "<div>" +
      '<p class="mc-title">' + esc(m.title) + "</p>" +
      '<p class="mc-sub"><span>' + esc(m.artist) + '</span><span class="muted">•</span><span class="muted">' + esc(m.type) + "</span></p>" +
      '<p class="mc-year">' + m.year + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="shop-filter-row">' +
      '<button class="pill-button tappable' + (n > 0 ? " applied" : "") + '" data-action="shop-filters">' +
      '<span class="surface">Filters <img class="i-filter" src="shared/assets/icon-filter.svg" alt="" /></span>' +
      (n > 0 ? '<span class="badge">' + n + "</span>" : "") +
      "</button>" +
      '<button class="pill-button tappable" data-action="shop-sort">' +
      '<span class="surface"><span class="sort-prefix">Sort:</span> ' + esc(sortState.by) + ' <img class="i-sort' + (sortState.order === "Low to high" ? " asc" : " desc") + '" src="shared/assets/icon-sort-asc.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div class="shop-content">' +
      '<div id="shop-active-chips">' + shopChipsRowHTML() + "</div>" +
      '<div id="shop-listings">' + shopListingCardsHTML() + "</div>" +
      "</div>" +
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  // ---------- all-versions screen (frame 1494:22414) ----------

  // Full 24-version list: 3 canonical + 21 extras (shared/data.js).
  var VERSION_ART_POOL = [
    "shared/assets/artwork-v1.jpg",
    "shared/assets/artwork-v2.jpg",
    "shared/assets/artwork-v3.jpg",
    "shared/assets/artwork-main.jpg",
  ];

  function allVersions() {
    return DATA.versions.concat(
      DATA.extraVersions.map(function (v, i) {
        return {
          id: v.id,
          format: v.format,
          title: DATA.master.title,
          artist: DATA.master.artist,
          description: v.description,
          year: v.year,
          edition: v.edition,
          country: v.country,
          copiesForSale: v.copiesForSale,
          priceDisplay: v.about ? { typical: v.about } : null,
          artwork: VERSION_ART_POOL[i % VERSION_ART_POOL.length],
        };
      })
    );
  }

  // isTop: the first card on the page carries a small wantlist eye at its
  // top-right (20px pill, 14px glyph). A badge, not a button — the card
  // itself is already a <button>, so nesting one would be invalid.
  function versionsPageCardHTML(v, isTop) {
    var forSale = v.copiesForSale > 0 && v.priceDisplay;
    var eye = isTop
      ? '<span class="vc-eye" role="img" aria-label="In wantlist">' +
        '<span class="sk-icon" style="-webkit-mask-image:url(shared/assets/tab-wantlist.svg);mask-image:url(shared/assets/tab-wantlist.svg)"></span>' +
        "</span>"
      : "";
    var descLine = v.description ? '<p class="release-description">' + esc(v.description) + "</p>" : "";
    var editionPart = v.edition ? "<span>" + esc(v.edition) + "</span>" : "";
    // Cards doc "Version Card": one CTA band — "{n} for sale · about $X"
    // (median, whole dollars); none-for-sale is a disabled grey band.
    var summary = versionCtaHTML(v.copiesForSale, v.priceDisplay);
    return (
      '<div class="version-card has-summary">' +
      '<button class="listing-card tappable" data-action="version" data-version="' + esc(v.id) + '">' +
      '<img class="thumb" src="' + esc(v.artwork) + '" alt="" />' +
      '<div class="card-content">' +
      '<p class="entity-type">' + esc(v.format) + "</p>" +
      '<p class="release-title">' + esc(v.title) + "</p>" +
      '<p class="artist-name">' + esc(v.artist) + ' <span class="dot">\u2022</span> <span class="muted">Album</span></p>' +
      descLine +
      '<p class="year-country">' +
      "<span>" + v.year + "</span>" +
      editionPart +
      '<span class="dot">•</span>' +
      "<span>" + esc(v.country) + "</span>" +
      "</p>" +
      "</div>" +
      "</button>" +
      eye +
      summary +
      "</div>"
    );
  }

  // ---------- All versions: filters + sort (frame 1494:22414 pills) ----------
  // Operate on the real version list. Facets: format, country, release year,
  // format description; sort: year, for sale, price, rating, either order.
  var vsFilters = { formats: [], countries: [], years: [], descriptions: [] };
  var vsSort = { by: "Year", order: "Low to high" };
  var VS_SORTS = ["Year", "For sale", "Price", "Rating"];

  function vsPasses(v) {
    var f = vsFilters;
    if (f.formats.length && f.formats.indexOf(v.format) === -1) return false;
    if (f.countries.length && f.countries.indexOf(v.country) === -1) return false;
    if (f.years.length && f.years.indexOf(String(v.year)) === -1) return false;
    if (f.descriptions.length && !f.descriptions.some(function (t) { return descTokens(v.description).indexOf(t) !== -1; })) return false;
    return true;
  }
  function vsKey(v) {
    if (vsSort.by === "For sale") return v.copiesForSale || 0;
    if (vsSort.by === "Price") return (v.priceDisplay && v.priceDisplay.typical) || 0;
    if (vsSort.by === "Rating") return v.rating || 0;
    return v.year || 0;
  }
  function vsVersions() {
    var asc = vsSort.order === "Low to high";
    return allVersions().filter(vsPasses).sort(function (a, b) { var d = vsKey(a) - vsKey(b); return asc ? d : -d; });
  }
  function vsFilterCount() { var f = vsFilters; return f.formats.length + f.countries.length + f.years.length + f.descriptions.length; }
  function vsFacet(key) {
    var out = [];
    allVersions().forEach(function (v) {
      var vals = key === "descriptions" ? descTokens(v.description) : [String(key === "years" ? v.year : key === "formats" ? v.format : v.country)];
      vals.forEach(function (x) { if (x && out.indexOf(x) === -1) out.push(x); });
    });
    if (key === "years") out.sort();
    return out;
  }

  function vsCardsHTML() {
    var list = vsVersions();
    if (!list.length) return '<p class="sr-hint vs-empty">No versions match these filters</p>';
    return list.map(function (v, i) { return versionsPageCardHTML(v, i === 0); }).join("");
  }
  function vsPillsHTML() {
    var n = vsFilterCount();
    return (
      '<button class="pill-button tappable' + (n ? " applied" : "") + '" data-action="vs-filters">' +
      '<span class="surface">Filters <img class="i-filter" src="shared/assets/icon-filter.svg" alt="" /></span>' +
      (n ? '<span class="badge">' + n + "</span>" : "") +
      "</button>" +
      '<button class="pill-button tappable" data-action="vs-sort">' +
      '<span class="surface"><span class="sort-prefix">Sort:</span> ' + esc(vsSort.by) +
      ' <img class="i-sort' + (vsSort.order === "Low to high" ? " asc" : " desc") + '" src="shared/assets/icon-sort-asc.svg" alt="" /></span>' +
      "</button>"
    );
  }
  function refreshVersionsList() {
    var cards = document.querySelector("#screen-versions .vs-cards");
    if (cards) cards.innerHTML = vsCardsHTML();
    var pills = document.getElementById("vs-pills");
    if (pills) pills.innerHTML = vsPillsHTML();
  }

  // --- filters sheet ---
  var vsSheetEl = null, vsScrimEl = null;
  function vsChipHTML(group, value) {
    var sel = vsFilters[group].indexOf(String(value)) !== -1;
    return '<button class="pf-chip tappable' + (sel ? " selected" : "") + '" data-action="vsf-chip" data-group="' + group + '" data-value="' + esc(String(value)) + '">' +
      '<span class="surface"><span class="label">' + esc(String(value)) + "</span></span></button>";
  }
  function vsFilterSheetHTML() {
    var card = function (title, group) {
      return '<div class="pf-card"><h2>' + title + '</h2><div class="pf-chips no-clamp">' + vsFacet(group).map(function (x) { return vsChipHTML(group, x); }).join("") + "</div></div>";
    };
    return (
      '<div class="fs-header">' +
      '<button class="fs-close tappable" data-action="vsf-close" aria-label="Close"><span class="x"></span></button>' +
      "<h1>Filters</h1>" + '<span class="fs-close-spacer"></span>' +
      "</div>" +
      '<div class="fs-body">' +
      card("Formats", "formats") + card("Country", "countries") + card("Release Year", "years") + card("Format Description", "descriptions") +
      "</div>" +
      '<div class="pf-action-bar">' +
      '<button class="pf-reset tappable" data-action="vsf-clear">Clear all</button>' +
      '<button class="pf-cta d-pf-cta tappable" data-action="vsf-close" id="vsf-cta">View ' + vsVersions().length + " versions</button>" +
      "</div>"
    );
  }
  function openVsFilterSheet() {
    if (vsSheetEl) return;
    vsScrimEl = document.createElement("div"); vsScrimEl.className = "sheet-scrim";
    vsScrimEl.addEventListener("click", function () { history.back(); });
    vsSheetEl = document.createElement("div"); vsSheetEl.className = "filter-sheet";
    vsSheetEl.innerHTML = vsFilterSheetHTML();
    document.body.appendChild(vsScrimEl); document.body.appendChild(vsSheetEl);
    requestAnimationFrame(function () { requestAnimationFrame(function () { vsScrimEl.classList.add("in"); vsSheetEl.classList.add("in"); }); });
    history.pushState({ screen: "vfilters" }, "", "#vfilters");
  }
  function closeVsFilterSheet() {
    if (!vsSheetEl) return;
    var sh = vsSheetEl, sc = vsScrimEl; vsSheetEl = null; vsScrimEl = null;
    sh.classList.remove("in"); sc.classList.remove("in");
    setTimeout(function () { sh.remove(); sc.remove(); }, 350);
  }
  function refreshVsSheet() {
    if (!vsSheetEl) return;
    vsSheetEl.querySelectorAll(".pf-chip[data-action=\"vsf-chip\"]").forEach(function (c) {
      c.classList.toggle("selected", vsFilters[c.dataset.group].indexOf(c.dataset.value) !== -1);
    });
    var cta = vsSheetEl.querySelector("#vsf-cta");
    if (cta) cta.textContent = "View " + vsVersions().length + " versions";
  }

  // --- sort sheet ---
  var vsSortSheetEl = null, vsSortScrimEl = null;
  function vsSortRadioHTML(group, value, extra) {
    var sel = vsSort[group] === value;
    return '<button class="sort-row tappable" data-action="vsort-opt" data-group="' + group + '" data-value="' + esc(value) + '">' +
      (extra ? '<span class="sort-arrow">' + extra + "</span>" : "") +
      '<span class="sort-label">' + esc(value) + "</span>" +
      '<span class="sort-radio' + (sel ? " selected" : "") + '"></span></button>';
  }
  function vsSortSheetHTML() {
    return (
      '<div class="fs-header">' +
      '<button class="fs-close tappable" data-action="vsort-close" aria-label="Close"><span class="x"></span></button>' +
      "<h1>Sort</h1>" + '<span class="fs-close-spacer"></span>' +
      "</div>" +
      '<div class="sort-body">' +
      '<p class="sort-sec-title">Order</p>' +
      vsSortRadioHTML("order", "Low to high", "↑") + vsSortRadioHTML("order", "High to low", "↓") +
      '<div class="vp-divider"></div>' +
      '<p class="sort-sec-title">Sort By</p>' +
      VS_SORTS.map(function (k) { return vsSortRadioHTML("by", k); }).join("") +
      "</div>" +
      '<div class="sort-action-bar"><button class="sort-apply tappable" data-action="vsort-apply">Apply</button></div>'
    );
  }
  function openVsSortSheet() {
    if (vsSortSheetEl) return;
    vsSortScrimEl = document.createElement("div"); vsSortScrimEl.className = "sheet-scrim";
    vsSortScrimEl.addEventListener("click", function () { history.back(); });
    vsSortSheetEl = document.createElement("div"); vsSortSheetEl.className = "filter-sheet sort-sheet";
    vsSortSheetEl.innerHTML = vsSortSheetHTML();
    document.body.appendChild(vsSortScrimEl); document.body.appendChild(vsSortSheetEl);
    requestAnimationFrame(function () { requestAnimationFrame(function () { vsSortScrimEl.classList.add("in"); vsSortSheetEl.classList.add("in"); }); });
    history.pushState({ screen: "vsort" }, "", "#vsort");
  }
  function closeVsSortSheet() {
    if (!vsSortSheetEl) return;
    var sh = vsSortSheetEl, sc = vsSortScrimEl; vsSortSheetEl = null; vsSortScrimEl = null;
    sh.classList.remove("in"); sc.classList.remove("in");
    setTimeout(function () { sh.remove(); sc.remove(); }, 350);
  }

  function versionsScreenHTML() {
    var m = DATA.master;
    return (
      '<div class="shop-header" id="vs-header">' +
      '<div class="shop-product-row">' +
      '<button class="icon-btn tappable" data-action="screen-back" aria-label="Back"><img src="shared/assets/icon-arrow-left.svg" alt="" /></button>' +
      '<h1 class="vs-title">All versions</h1>' +
      "</div>" +
      "</div>" +
      '<div class="vs-scroll" id="vs-scroll">' +
      '<div class="vs-topblock">' +
      '<div class="shop-product-row no-back">' +
      '<div class="music-card">' +
      '<div class="art-stack">' +
      '<span class="layer l1"></span><span class="layer l2"></span>' +
      '<span class="layer l3"><img src="' + esc(m.artwork) + '" alt="" /></span>' +
      "</div>" +
      '<div class="mc-content">' +
      "<div>" +
      '<p class="mc-title">' + esc(m.title) + "</p>" +
      '<p class="mc-sub"><span>' + esc(m.artist) + '</span><span class="muted">•</span><span class="muted">' + esc(m.type) + "</span></p>" +
      '<p class="mc-year">' + m.year + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="vs-search">' +
      '<button class="vs-search-input tappable" data-action="vs-search">' +
      '<span class="mag"></span>' +
      '<span class="placeholder">Search versions</span>' +
      "</button>" +
      "</div>" +
      '<div class="shop-filter-row" id="vs-pills">' + vsPillsHTML() + "</div>" +
      "</div>" + // /vs-topblock
      '<div class="vs-cards">' + vsCardsHTML() + "</div>" +
      "</div>" + // /vs-scroll
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  // Sticky "All versions" row: the music card / search / filters block
  // scrolls away with the content (frame 1494:24837 collapsed state);
  // a hairline shows under the pinned row once the top block is gone.
  function initVersionsCollapse() {
    var scroller = document.getElementById("vs-scroll");
    var top = scroller && scroller.querySelector(".vs-topblock");
    var header = document.getElementById("vs-header");
    if (!scroller || !top || !header) return;
    scroller.addEventListener("scroll", function () {
      header.classList.toggle("collapsed", scroller.scrollTop >= top.offsetHeight);
    });
  }

  // ---------- Notes screen (frame 1842:143604) ----------
  // Real master notes from the API; an empty line in the data renders as
  // a blank paragraph (the frame keeps the empty line between blocks).

  function notesChipsHTML(list) {
    return (
      '<div class="notes-chips">' +
      list.map(function (v) {
        return (
          '<button class="pf-chip tappable" data-action="genre-style">' +
          '<span class="surface"><span class="label">' + esc(v) + "</span></span>" +
          "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  function notesScreenHTML() {
    var body = DATA.master.notes
      .map(function (line) {
        return line ? "<p>" + esc(line) + "</p>" : '<p class="blank">​</p>';
      })
      .join("");
    return (
      '<div class="notes-header" id="notes-header">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="screen-back" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      '<span class="ma-header-title" id="notes-header-title">Notes, Genres &amp; Styles</span>' +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="cart" aria-label="Cart">' +
      '<span class="surface"><img class="glyph-cart" src="shared/assets/icon-cart.svg" alt="" /></span>' +
      "</button>" +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="notes-scroll" id="notes-scroll">' +
      '<div class="notes-content">' +
      '<h1 class="notes-heading" id="notes-heading">Notes, Genres &amp; Styles</h1>' +
      '<div class="notes-section">' +
      '<p class="notes-sec-title">Genres</p>' +
      notesChipsHTML(DATA.master.genres) +
      "</div>" +
      '<div class="notes-section">' +
      '<p class="notes-sec-title">Styles</p>' +
      notesChipsHTML(DATA.master.styles) +
      "</div>" +
      '<div class="notes-body">' + body + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  // ---------- Videos screen (frame 1861:154538) ----------
  // Real master videos (API); static cards — playback not in this prototype.

  function videoCardHTML(v) {
    return (
      '<button class="video-card tappable" data-action="video">' +
      '<span class="vc-thumb">' +
      '<img class="vc-img" src="' + esc(v.thumb) + '" alt="" />' +
      '<img class="vc-play" src="shared/assets/icon-play-outline.svg" alt="" />' +
      "</span>" +
      '<span class="vc-info">' +
      '<span class="vc-title">' + esc(v.title) + "</span>" +
      '<span class="vc-duration">' + esc(v.duration) + "</span>" +
      "</span>" +
      "</button>"
    );
  }

  function videosScreenHTML() {
    return (
      '<div class="notes-header" id="videos-header">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="screen-back" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      '<span class="ma-header-title" id="videos-header-title">Videos</span>' +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="cart" aria-label="Cart">' +
      '<span class="surface"><img class="glyph-cart" src="shared/assets/icon-cart.svg" alt="" /></span>' +
      "</button>" +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="notes-scroll" id="videos-scroll">' +
      '<div class="notes-content">' +
      '<h1 class="notes-heading" id="videos-heading">Videos</h1>' +
      DATA.videos.map(videoCardHTML).join("") +
      "</div>" +
      "</div>" +
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  // ---------- Version page (frame 1857:153839) ----------
  // Opens from any all-versions card. Real per-version data (label/catno,
  // rating, have/want, sales range from price suggestions); the four detail
  // photos are shared across versions (only covers were downloaded per
  // version) and review texts are fixtures — no reviews API.

  var VP_DETAILS = [
    "shared/assets/r-art/detail-1.jpg",
    "shared/assets/r-art/detail-2.jpg",
    "shared/assets/r-art/detail-3.jpg",
    "shared/assets/r-art/detail-4.jpg",
  ];

  var VP_REVIEWS = [
    { score: "4.5", date: "Aug 2026", user: "musicluv3r", avatar: "shared/assets/r-art/credit441677.jpg",
      text: "“One of the best pressings in my collection, no noise on either side, minimal pops or…" },
    { score: "5", date: "July 2026", user: "vinylvictor", avatar: null,
      text: "“The sound is vibrant and every nuance comes through — worth every penny…" },
    { score: "4.7", date: "Jun 2026", user: "crateDigger77", avatar: "shared/assets/r-art/credit257502.jpg",
      text: "“Arrived exactly as described. Quiet surfaces and a beautiful gatefold…" },
  ];

  function vpStarsHistogram(rating) {
    // synthesized distribution shaped by the average (no per-star API data)
    var r = rating || 4.5;
    var weights = [5, 4, 3, 2, 1].map(function (star) {
      return Math.max(0.02, 1 - Math.abs(r - star) / 2.2);
    });
    var max = Math.max.apply(null, weights);
    return weights.map(function (w) { return Math.round((w / max) * 100); });
  }

  function versionScreenHTML(v) {
    var about = v.priceDisplay && v.priceDisplay.typical;
    var rating = v.rating || 4.5;
    var ratingCount = v.ratingCount || 0;
    var bars = vpStarsHistogram(rating);
    var thumbs = [v.artwork].concat(VP_DETAILS);
    var relDesc = v.description || v.format;
    var catLine =
      (v.label ? esc(v.label) : "") +
      (v.label && v.catno ? ' <span class="dot">•</span> <span class="vp-catno">' + esc(v.catno) + "</span>" : "");
    var shopLabel = "Shop " + v.copiesForSale + (v.copiesForSale === 1 ? " copy" : " copies");
    return (
      '<div class="notes-header" id="vp-hd">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="screen-back" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="cart" aria-label="Cart">' +
      '<span class="surface"><img class="glyph-cart" src="shared/assets/icon-cart.svg" alt="" /></span>' +
      "</button>" +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="notes-scroll" id="vp-scroll">' +
      // images: featured + vertical thumb rail
      '<div class="vp-images">' +
      '<img class="vp-featured" id="vp-featured" src="' + esc(v.artwork) + '" alt="" />' +
      '<div class="vp-rail" id="vp-rail">' +
      thumbs.map(function (t, i) {
        return (
          '<button class="vp-thumb tappable' + (i === 0 ? " selected" : "") + '" data-action="vp-thumb" data-src="' + esc(t) + '">' +
          '<img src="' + esc(t) + '" alt="" />' +
          "</button>"
        );
      }).join("") +
      "</div>" +
      "</div>" +
      // release info + action skittles
      '<div class="vp-info">' +
      '<div class="vp-title-block">' +
      '<p class="vp-overline">' + esc(v.format) + "</p>" +
      '<h1 class="vp-title">' + esc(v.title) + "</h1>" +
      '<p class="vp-artist-row"><button class="d-artist tappable" data-action="artist">' + esc(v.artist) + '</button><span class="dot">•</span><span>Album</span></p>' +
      "</div>" +
      '<div class="vp-actions">' +
      '<button class="vp-skittle dark tappable" data-action="skittles" aria-label="In wantlist">' +
      '<span class="sk-icon" style="-webkit-mask-image:url(shared/assets/tab-wantlist.svg);mask-image:url(shared/assets/tab-wantlist.svg)"></span>' +
      '<span class="vp-badge">1</span>' +
      "</button>" +
      '<button class="vp-skittle tappable" data-action="skittles" aria-label="Add to collection">' +
      '<span class="sk-icon black" style="-webkit-mask-image:url(shared/assets/tab-collection.svg);mask-image:url(shared/assets/tab-collection.svg)"></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      // version details card + price/stats
      '<div class="vp-details-card">' +
      '<div class="vp-format-row">' +
      '<span class="vp-format-icon" style="-webkit-mask-image:url(shared/assets/fmt-' + (({ Vinyl: "vinyl", CD: "cd", Cassette: "cassette" })[v.format] || "vinyl") + '-fill.svg);mask-image:url(shared/assets/fmt-' + (({ Vinyl: "vinyl", CD: "cd", Cassette: "cassette" })[v.format] || "vinyl") + '-fill.svg)"></span>' +
      '<div class="vp-format-details">' +
      '<p class="vp-format-desc">' + esc(relDesc) + "</p>" +
      '<p class="vp-format-meta">' + v.year + (v.edition ? " " + esc(v.edition) : "") + ' <span class="dot">•</span> ' + esc(v.country) + "</p>" +
      (catLine ? '<p class="vp-format-meta vp-cat">' + catLine + "</p>" : "") +
      "</div>" +
      "</div>" +
      '<div class="vp-stats-card">' +
      '<div class="vp-price-row">' +
      "<div>" +
      '<p class="vp-stat-label">About price</p>' +
      '<p class="vp-price">' + (about ? '<span class="cur">$</span>' + about : "—") + "</p>" +
      "</div>" +
      (v.copiesForSale > 0
        ? '<button class="vp-shop-btn tappable" id="vp-shop-inline" data-action="pf-shop">' + shopLabel + "</button>"
        : '<span class="vp-none">None for sale</span>') +
      "</div>" +
      '<div class="vp-divider"></div>' +
      '<div class="vp-community">' +
      '<span class="vp-com-stat"><img class="star" src="shared/assets/icon-star-black.svg" alt="" /><b>' + rating.toFixed(2) + "</b><span class=\"muted\">(" + ratingCount + ")</span></span>" +
      '<span class="vp-vdiv"></span>' +
      '<span class="vp-com-stat"><b>' + (v.have || 0) + '</b><span class="vp-com-label">Have</span></span>' +
      '<span class="vp-vdiv"></span>' +
      '<span class="vp-com-stat"><b>' + (v.want || 0) + '</b><span class="vp-com-label">Want</span></span>' +
      "</div>" +
      "</div>" +
      "</div>" +
      // reviews
      '<h2 class="vp-section-title">Reviews</h2>' +
      '<div class="vp-reviews-card">' +
      '<div class="vp-reviews-summary">' +
      '<div class="vp-rating-overview">' +
      '<p class="vp-rating-score"><img class="star" src="shared/assets/icon-star-black.svg" alt="" />' + rating.toFixed(2) + "</p>" +
      '<p class="vp-stat-label">' + ratingCount + " ratings</p>" +
      "</div>" +
      '<span class="vp-vdiv tall"></span>' +
      '<div class="vp-distribution">' +
      bars.map(function (pct, i) {
        return (
          '<div class="vp-bar-row"><span class="n">' + (5 - i) + '</span><span class="track"><span class="fill" style="width:' + pct + '%"></span></span></div>'
        );
      }).join("") +
      "</div>" +
      "</div>" +
      '<div class="vp-reviews-scroller">' +
      VP_REVIEWS.map(function (r) {
        return (
          '<div class="vp-review">' +
          '<p class="vp-review-top"><span class="score"><img class="star" src="shared/assets/icon-star-black.svg" alt="" />' + r.score + '</span><span class="date">' + r.date + "</span></p>" +
          '<p class="vp-review-user">' +
          (r.avatar ? '<img class="ava" src="' + r.avatar + '" alt="" />' : '<span class="ava ph"></span>') +
          "<b>" + esc(r.user) + "</b></p>" +
          '<p class="vp-review-text">' + esc(r.text) + "</p>" +
          "</div>"
        );
      }).join("") +
      "</div>" +
      '<button class="vp-all-btn tappable" data-action="vp-reviews">All reviews <img src="shared/assets/chevron-right.svg" alt="" /></button>' +
      "</div>" +
      // sales history
      '<button class="vp-section-title vp-link tappable" data-action="vp-sales">Sales history <img src="shared/assets/chevron-right.svg" alt="" /></button>' +
      '<div class="vp-sales-card">' +
      '<div class="vp-sales-top">' +
      "<div>" +
      '<p class="vp-stat-label">Last sold</p>' +
      '<p class="vp-price">' + (v.salesMedian ? '<span class="cur">$</span>' + v.salesMedian : "—") + "</p>" +
      '<p class="vp-muted-line">12 days ago</p>' +
      "</div>" +
      '<span class="vp-vdiv tall"></span>' +
      '<button class="vp-sell-btn tappable" data-action="vp-sell">' +
      '<span class="sell-icon" style="-webkit-mask-image:url(shared/assets/icon-sell.svg);mask-image:url(shared/assets/icon-sell.svg)"></span>Sell a Copy</button>' +
      "</div>" +
      '<p class="vp-stat-label vp-sales-label">Last 30 sales</p>' +
      '<div class="vp-sales-range">' +
      '<span class="vp-range-stat"><b>$' + (v.salesLow || Math.round((about || 20) * 0.4)) + "</b><span>Low</span></span>" +
      '<span class="vp-vdiv"></span>' +
      '<span class="vp-range-stat"><b>$' + (v.salesMedian || about || 30) + "</b><span>Median</span></span>" +
      '<span class="vp-vdiv"></span>' +
      '<span class="vp-range-stat"><b>$' + (v.salesHigh || Math.round((about || 30) * 2)) + "</b><span>High</span></span>" +
      "</div>" +
      "</div>" +
      // artist card (same component as the master page)
      '<button class="ma-artist-card tappable vp-artist" data-action="artist-card">' +
      '<img class="ma-artist-photo" src="' + esc(DATA.artistCard.photo) + '" alt="" />' +
      '<span class="ma-artist-info">' +
      '<span class="ma-artist-overline">Artist</span>' +
      '<span class="ma-artist-name">' + esc(DATA.artistCard.name) + "</span>" +
      '<span class="ma-artist-bio">' + esc(DATA.artistCard.bio) + "</span>" +
      "</span>" +
      "</button>" +
      // details nav rows
      '<div class="vp-rows">' +
      '<button class="details-row-link tappable" data-action="vp-tracklist"><h3>Tracklist <span class="muted">(' + DATA.tracks.length + ')</span></h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="vp-credits"><h3>Credits</h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="notes"><h3>Notes, Genres &amp; Styles</h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="vp-companies"><h3>Companies</h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="vp-identifiers"><h3>Identifiers' + (v.identifiers ? ' <span class="muted">(' + v.identifiers + ")</span>" : "") + '</h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="lists"><h3>Lists <span class="muted">(' + DATA.lists.length + ')</span></h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      '<button class="details-row-link tappable" data-action="videos"><h3>Videos <span class="muted">(' + DATA.videos.length + ')</span></h3><span class="chev-box"><img src="shared/assets/chevron-right.svg" alt="" /></span></button>' +
      "</div>" +
      "</div>" + // /vp-scroll
      // sticky buy bar: revealed once the inline shop button scrolls out
      (v.copiesForSale > 0 && about
        ? '<div class="vp-buy-bar" id="vp-buy-bar">' +
          "<div>" +
          '<p class="vp-stat-label">About price</p>' +
          '<p class="vp-price bar"><span class="cur">$</span>' + about + "</p>" +
          "</div>" +
          '<button class="vp-shop-btn tappable" data-action="pf-shop">' + shopLabel + "</button>" +
          "</div>"
        : "") +
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  function openVersionPage(id) {
    var v = allVersions().filter(function (x) { return x.id === id; })[0];
    if (!v) { toast(); return; }
    var sid = "version-" + id;
    if (document.getElementById("screen-" + sid)) return;
    pushScreen(sid, versionScreenHTML(v));
    initPushedHeader("vp");
    // buy bar reveal: inline shop button owns the top of the page
    var scroller = document.getElementById("vp-scroll");
    var inline = document.getElementById("vp-shop-inline");
    var bar = document.getElementById("vp-buy-bar");
    if (scroller && inline && bar) {
      var io = new IntersectionObserver(function (entries) {
        bar.classList.toggle("shown", !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
      }, { root: scroller });
      io.observe(inline);
    } else if (bar) {
      bar.classList.add("shown");
    }
  }

  // ---------- Lists screen (frame 1861:154834) ----------
  // 2-up grid of <ListCard>: dark 2x2 collage of real version covers,
  // list title + avatar/username. List content is a fixture (no API).

  function listCardHTML(l) {
    return (
      '<button class="list-card tappable" data-action="list">' +
      '<span class="lc-collage">' +
      l.art.map(function (a) {
        return '<img src="shared/assets/r-art/' + esc(a) + '" alt="" />';
      }).join("") +
      "</span>" +
      '<span class="lc-info">' +
      '<span class="lc-title">' + esc(l.title) + "</span>" +
      '<span class="lc-user">' +
      '<img class="lc-avatar" src="' + esc(l.avatar) + '" alt="" />' +
      '<span class="lc-username">' + esc(l.user) + "</span>" +
      "</span>" +
      "</span>" +
      "</button>"
    );
  }

  function listsScreenHTML() {
    return (
      '<div class="notes-header" id="lists-header">' +
      '<div class="nav-bar">' +
      '<span class="ma-header-left">' +
      '<button class="nav-icon-btn tappable" data-action="screen-back" aria-label="Back">' +
      '<span class="surface"><img class="glyph-back" src="shared/assets/icon-arrow-left.svg" alt="" /></span>' +
      "</button>" +
      '<span class="ma-header-title" id="lists-header-title">Lists</span>' +
      "</span>" +
      '<div class="nav-actions-right">' +
      '<button class="nav-icon-btn tappable" data-action="cart" aria-label="Cart">' +
      '<span class="surface"><img class="glyph-cart" src="shared/assets/icon-cart.svg" alt="" /></span>' +
      "</button>" +
      '<button class="nav-icon-btn tappable" data-action="share" aria-label="Share">' +
      '<span class="surface"><img class="glyph-share" src="shared/assets/icon-share.svg" alt="" /></span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="notes-scroll" id="lists-scroll">' +
      '<div class="notes-content">' +
      '<h1 class="notes-heading" id="lists-heading">Lists</h1>' +
      '<div class="lists-grid">' + DATA.lists.map(listCardHTML).join("") + "</div>" +
      "</div>" +
      "</div>" +
      '<div class="tab-bar in-screen">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>"
    );
  }

  // Pushed-screen header (notes/videos): shadow once content scrolls >= 1px;
  // the nav title fades in only when the page heading passes under the header
  // (same rules as the master header, scoped to this screen's scroller).
  function initPushedHeader(prefix) {
    var sc = document.getElementById(prefix + "-scroll");
    var header = document.getElementById(prefix + "-header");
    var heading = document.getElementById(prefix + "-heading"); // optional
    if (!sc || !header) return;
    sc.addEventListener("scroll", function () {
      requestAnimationFrame(function () {
        header.classList.toggle("scrolled", sc.scrollTop >= 1);
        if (heading) {
          var hb = header.getBoundingClientRect().bottom;
          header.classList.toggle("titled", heading.getBoundingClientRect().bottom <= hb);
        }
      });
    }, { passive: true });
  }

  // ---------- Filters bottom sheet (frames 1845:144909 / 1847:149589) ----------
  // Shares formats/conditions/countries with the pre-filter; extra groups
  // below are drawer-only and (logged) don't affect the live count.
  var drawerFilters = { descriptions: [], years: [], currencies: [], acceptsOffers: false, priceMin: null, priceMax: null };

  function fsPrices() {
    return allVersions().map(function (v) { return v.priceDisplay && v.priceDisplay.typical; }).filter(Boolean);
  }

  // Facet values shared by the Filters sheet and the Find your copy screen
  function fsFacetValues() {
    var descs = [], years = [];
    allVersions().forEach(function (v) {
      descTokens(v.description).forEach(function (t) { if (descs.indexOf(t) === -1) descs.push(t); });
      if (years.indexOf(v.year) === -1) years.push(v.year);
    });
    years.sort();
    return { descs: descs, years: years, currencies: ["USD", "EUR", "GBP", "CAD", "AUD", "CHF", "JPY", "BRL", "SEK", "DKK"] };
  }
  function priceBounds() { var p = fsPrices(); return { min: Math.min.apply(null, p), max: Math.max.apply(null, p) }; }
  // the same five facet bodies render on both surfaces; ids carry a prefix
  // ("fs" sheet, "pf" pre-filter) because both screens can be in the DOM
  function priceBodyHTML(prefix) {
    var b = priceBounds();
    var lo = drawerFilters.priceMin === null ? b.min : drawerFilters.priceMin;
    var hi = drawerFilters.priceMax === null ? b.max : drawerFilters.priceMax;
    return (
      fsHistogramHTML() +
      '<div class="fs-slider" id="' + prefix + '-slider">' +
      '<span class="rail"></span><span class="fill" id="' + prefix + '-fill"></span>' +
      '<span class="thumb" id="' + prefix + '-thumb-lo"></span><span class="thumb" id="' + prefix + '-thumb-hi"></span>' +
      "</div>" +
      '<div class="fs-price-inputs">' +
      '<span class="box" id="' + prefix + '-price-lo">$' + lo + '</span><span class="to">to</span><span class="box" id="' + prefix + '-price-hi">$' + hi + "</span>" +
      "</div>"
    );
  }
  function chipsBodyHTML(group, values) {
    return '<div class="pf-chips">' + values.map(function (v) { return fsChipHTML(group, v, drawerFilters[group].indexOf(String(v)) !== -1); }).join("") + "</div>";
  }
  function descBodyHTML() { return chipsBodyHTML("descriptions", fsFacetValues().descs); }
  function yearsBodyHTML() { return chipsBodyHTML("years", fsFacetValues().years); }
  function currencyBodyHTML() { return chipsBodyHTML("currencies", fsFacetValues().currencies); }
  function offersBodyHTML() {
    return '<button class="fs-toggle' + (drawerFilters.acceptsOffers ? " on" : "") + ' tappable" data-action="fs-offers" aria-label="Accepts offers"><span class="knob"></span></button>';
  }

  function fsChipHTML(group, value, selected) {
    return (
      '<button class="pf-chip tappable' + (selected ? " selected" : "") + '" data-action="fs-chip" data-group="' + group + '" data-value="' + esc(String(value)) + '">' +
      '<span class="surface"><span class="label">' + esc(String(value)) + "</span></span>" +
      "</button>"
    );
  }

  function fsHistogramHTML() {
    var prices = fsPrices();
    var lo = Math.min.apply(null, prices), hi = Math.max.apply(null, prices);
    var buckets = [];
    var N = 30;
    for (var i = 0; i < N; i++) buckets.push(0);
    prices.forEach(function (p) {
      var idx = Math.min(N - 1, Math.floor(((p - lo) / (hi - lo || 1)) * N));
      buckets[idx]++;
    });
    var max = Math.max.apply(null, buckets);
    return '<div class="fs-histogram">' + buckets.map(function (b) {
      var h = 6 + Math.round((b / (max || 1)) * 36);
      return '<span style="height:' + h + 'px"></span>';
    }).join("") + "</div>";
  }

  function filterSheetHTML() {
    var m = DATA.master;
    return (
      '<div class="fs-header">' +
      '<button class="fs-close tappable" data-action="fs-close" aria-label="Close"><span class="x"></span></button>' +
      "<h1>Filters</h1>" +
      '<span class="fs-close-spacer"></span>' + // keeps the title centered
      "</div>" +
      '<div class="fs-body">' +
      '<div id="fs-active-chips">' + activeChipsHTML() + "</div>" +
      // formats (real data: no extra formats beyond the tiles -> no Show more)
      '<div class="pf-card"><h2>Formats</h2>' +
      '<div id="fs-formats">' + formatTilesHTML() + "</div></div>" +
      // media condition — always fully exposed (user rule) + info icon
      '<div class="pf-card"><h2>Media Condition</h2>' +
      '<button class="info-btn tappable" data-action="pf-info" aria-label="About grading"><img src="shared/assets/icon-info.svg" alt="" /></button>' +
      '<div class="pf-chips no-clamp" id="fs-conditions">' + GRADES.map(conditionChipHTML).join("") + "</div></div>" +
      // ships from country
      '<div class="pf-card"><h2>Ships from Country</h2>' +
      '<div class="pf-chips" id="fs-countries">' + DATA.shipsFromCountries.map(countryChipHTML).join("") + "</div></div>" +
      '<div class="pf-card"><h2>Price Range</h2>' + priceBodyHTML("fs") + "</div>" +
      '<div class="pf-card"><h2>Format Description</h2>' + descBodyHTML() + "</div>" +
      '<div class="pf-card"><h2>Release Year</h2>' + yearsBodyHTML() + "</div>" +
      '<div class="pf-card fs-offers"><h2>Accepts offers</h2>' + offersBodyHTML() + "</div>" +
      '<div class="pf-card"><h2>Currency</h2>' + currencyBodyHTML() + "</div>" +
      "</div>" +
      // action bar
      '<div class="pf-action-bar">' +
      '<button class="pf-reset tappable" data-action="fs-clear">Clear all</button>' +
      '<button class="pf-cta d-pf-cta tappable" data-action="fs-close" id="fs-cta">View ' + fmtN(shopResultCount()) + " Results</button>" +
      "</div>"
    );
  }

  var sheetEl = null, scrimEl = null;

  // ---------- Sort bottom sheet (frame 1842:142511) ----------
  // Selection persists; Apply closes and the shop Sort pill reflects it.
  // Listings are fixture cards, so re-ordering them is out of scope (logged).

  var sortState = { order: "Low to high", by: "Price" }; // the list opens cheapest-first
  var SORT_DEFAULT = "Price|Low to high";
  var sortSheetEl = null, sortScrimEl = null;

  function sortRadioHTML(group, value, extra) {
    var sel = sortState[group === "order" ? "order" : "by"] === value;
    return (
      '<button class="sort-row tappable" data-action="sort-opt" data-group="' + group + '" data-value="' + esc(value) + '">' +
      (extra ? '<span class="sort-arrow">' + extra + "</span>" : "") +
      '<span class="sort-label">' + esc(value) + "</span>" +
      '<span class="sort-radio' + (sel ? " selected" : "") + '"></span>' +
      "</button>"
    );
  }

  function sortSheetHTML() {
    return (
      '<div class="fs-header">' +
      '<button class="fs-close tappable" data-action="sort-close" aria-label="Close"><span class="x"></span></button>' +
      "<h1>Sort</h1>" +
      '<span class="fs-close-spacer"></span>' +
      "</div>" +
      '<div class="sort-body">' +
      '<p class="sort-sec-title">Order</p>' +
      sortRadioHTML("order", "Low to high", "↑") +
      sortRadioHTML("order", "High to low", "↓") +
      '<div class="vp-divider"></div>' +
      '<p class="sort-sec-title">Sort By</p>' +
      sortRadioHTML("by", "Price") +
      sortRadioHTML("by", "Condition") +
      sortRadioHTML("by", "Date listed") +
      "</div>" +
      '<div class="sort-action-bar">' +
      '<button class="sort-apply tappable" data-action="sort-apply">Apply</button>' +
      "</div>"
    );
  }

  function openSortSheet() {
    if (sortSheetEl) return;
    sortScrimEl = document.createElement("div");
    sortScrimEl.className = "sheet-scrim";
    sortScrimEl.addEventListener("click", function () { history.back(); });
    sortSheetEl = document.createElement("div");
    sortSheetEl.className = "filter-sheet sort-sheet";
    sortSheetEl.innerHTML = sortSheetHTML();
    document.body.appendChild(sortScrimEl);
    document.body.appendChild(sortSheetEl);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        sortScrimEl.classList.add("in");
        sortSheetEl.classList.add("in");
      });
    });
    history.pushState({ screen: "sort" }, "", "#sort");
  }

  function closeSortSheet() {
    if (!sortSheetEl) return;
    var sh = sortSheetEl, sc = sortScrimEl;
    sortSheetEl = null; sortScrimEl = null;
    sh.classList.remove("in"); sc.classList.remove("in");
    setTimeout(function () { sh.remove(); sc.remove(); }, 350);
  }

  // ---------- Grading bottom sheet (frame 1681:78895) ----------
  // Opened from the (i) beside Media Condition on the pre-filter screen and
  // in the Filters sheet. Same scrim/sheet/history mechanics as Sort; sits
  // above the Filters sheet (z 40/41) since it can open on top of it.
  var GRADE_INFO = [
    ["Mint (M)", "Absolutely perfect in every way. Certainly never been played. Should be used sparingly as a grade."],
    ["Near Mint (NM)", "A nearly perfect record. The record should show no obvious signs of wear."],
    ["Very Good+ (VG+)", "Will show some signs that it was played and otherwise handled by a previous owner who took good care of it."],
    ["Very Good (VG)", "Noticeable groove wear and light scratches. Surface noise will not overpower the music."],
    ["Good+ (G+)", "Can play without skipping. Significant scratches, surface noise, and groove wear."],
    ["Good (G)", "Can play without skipping. Significant scratches, surface noise, and groove wear."],
    ["Fair (F)", "Significant scratches, surface noise, groove wear and maybe skips"],
    ["Poor (P)", "Damage heard when playing, the lowest quality rating"],
  ];
  var gradingSheetEl = null, gradingScrimEl = null;

  function gradingSheetHTML() {
    return (
      '<div class="fs-header grading-head">' +
      '<button class="fs-close tappable" data-action="grading-close" aria-label="Close"><span class="x"></span></button>' +
      "</div>" +
      '<div class="grading-body">' +
      "<h1>All About Record Grading</h1>" +
      GRADE_INFO.map(function (g) {
        return '<section class="grade-def"><h3>' + esc(g[0]) + "</h3><p>" + esc(g[1]) + "</p></section>";
      }).join("") +
      "</div>"
    );
  }

  function openGradingSheet() {
    if (gradingSheetEl) return;
    gradingScrimEl = document.createElement("div");
    gradingScrimEl.className = "sheet-scrim above";
    gradingScrimEl.addEventListener("click", function () { history.back(); });
    gradingSheetEl = document.createElement("div");
    gradingSheetEl.className = "filter-sheet grading-sheet";
    gradingSheetEl.innerHTML = gradingSheetHTML();
    document.body.appendChild(gradingScrimEl);
    document.body.appendChild(gradingSheetEl);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        gradingScrimEl.classList.add("in");
        gradingSheetEl.classList.add("in");
      });
    });
    history.pushState({ screen: "grading" }, "", "#grading");
  }

  function closeGradingSheet() {
    if (!gradingSheetEl) return;
    var sh = gradingSheetEl, sc = gradingScrimEl;
    gradingSheetEl = null; gradingScrimEl = null;
    sh.classList.remove("in"); sc.classList.remove("in");
    setTimeout(function () { sh.remove(); sc.remove(); }, 350);
  }

  function refreshSortPill() {
    var pill = document.querySelector('#screen-shop .pill-button[data-action="shop-sort"] .surface');
    if (!pill) return;
    pill.innerHTML =
      '<span class="sort-prefix">Sort:</span> ' + esc(sortState.by) +
      ' <img class="i-sort' + (sortState.order === "Low to high" ? " asc" : " desc") + '" src="shared/assets/icon-sort-asc.svg" alt="" />';
  }

  function openFilterSheet() {
    if (sheetEl) return;
    scrimEl = document.createElement("div");
    scrimEl.className = "sheet-scrim";
    scrimEl.addEventListener("click", function () { history.back(); });
    sheetEl = document.createElement("div");
    sheetEl.className = "filter-sheet";
    sheetEl.innerHTML = filterSheetHTML();
    document.body.appendChild(scrimEl);
    document.body.appendChild(sheetEl);
    clampChipGroups(sheetEl);
    initFsSlider();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        scrimEl.classList.add("in");
        sheetEl.classList.add("in");
      });
    });
    history.pushState({ screen: "filters" }, "", "#filters");
  }

  function closeFilterSheet() {
    if (!sheetEl) return;
    var sh = sheetEl, sc = scrimEl;
    sheetEl = null; scrimEl = null;
    sh.classList.remove("in"); sc.classList.remove("in");
    setTimeout(function () { sh.remove(); sc.remove(); }, 350);
  }

  function refreshFilterSheet() {
    if (!sheetEl) return;
    var chips = sheetEl.querySelector("#fs-active-chips");
    if (chips) {
      var wrap = chips.querySelector(".active-chips");
      if (!wrap) {
        chips.innerHTML = '<div class="active-chips"><div class="active-chips-scroll"></div></div>';
        wrap = chips.querySelector(".active-chips");
      }
      syncChipRow(wrap.querySelector(".active-chips-scroll"), wrap);
    }
    var f = sheetEl.querySelector("#fs-formats");
    if (f) f.innerHTML = formatTilesHTML();
    var c = sheetEl.querySelector("#fs-conditions");
    if (c) c.innerHTML = GRADES.map(conditionChipHTML).join("");
    var co = sheetEl.querySelector("#fs-countries");
    if (co) co.innerHTML = DATA.shipsFromCountries.map(countryChipHTML).join("");
    var cta = sheetEl.querySelector("#fs-cta");
    if (cta) cta.textContent = "View " + fmtN(shopResultCount()) + " Results";
    refreshShopFilters();
  }
  function refreshSheetCount() {
    var cta = sheetEl && sheetEl.querySelector("#fs-cta");
    if (cta) cta.textContent = "View " + fmtN(shopResultCount()) + " Results";
  }

  // Dual-thumb price slider. Positions derive from drawerFilters so the
  // sheet's and the pre-filter's sliders always agree; each element is wired
  // once (re-calls just re-sync).
  function initPriceSlider(root, prefix) {
    var slider = root && root.querySelector("#" + prefix + "-slider");
    if (!slider) return;
    if (slider._sync) { slider._sync(); return; }
    var loT = root.querySelector("#" + prefix + "-thumb-lo"), hiT = root.querySelector("#" + prefix + "-thumb-hi"), fill = root.querySelector("#" + prefix + "-fill");
    var bars = root.querySelectorAll("#" + prefix + "-slider ~ .fs-histogram span, .fs-histogram span");
    function frac() {
      var b = priceBounds(), span = (b.max - b.min) || 1;
      var lo = drawerFilters.priceMin === null ? 0 : (drawerFilters.priceMin - b.min) / span;
      var hi = drawerFilters.priceMax === null ? 1 : (drawerFilters.priceMax - b.min) / span;
      return { lo: Math.max(0, Math.min(1, lo)), hi: Math.max(0, Math.min(1, hi)), b: b };
    }
    function render() {
      var f = frac(), lo = f.lo, hi = f.hi;
      // 44px hit area with an 18px dot centred in it: the dot travels the rail
      loT.style.left = "calc(" + lo * 100 + "% - " + lo * 18 + "px - 13px)";
      hiT.style.left = "calc(" + hi * 100 + "% - " + hi * 18 + "px - 13px)";
      fill.style.left = lo * 100 + "%"; fill.style.right = (1 - hi) * 100 + "%";
      var lv = Math.round(f.b.min + lo * (f.b.max - f.b.min)), hv = Math.round(f.b.min + hi * (f.b.max - f.b.min));
      var elLo = root.querySelector("#" + prefix + "-price-lo"), elHi = root.querySelector("#" + prefix + "-price-hi");
      if (elLo) elLo.textContent = "$" + lv;
      if (elHi) elHi.textContent = "$" + hv;
      var card = slider.closest(".pf-card"), hb = card ? card.querySelectorAll(".fs-histogram span") : [];
      for (var i = 0; i < hb.length; i++) { var c = (i + 0.5) / hb.length; hb[i].classList.toggle("out", c < lo || c > hi); }
    }
    slider._sync = render;
    function drag(thumb, isLo) {
      thumb.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        try { thumb.setPointerCapture(e.pointerId); } catch (_) { /* capture is a nicety, not required */ }
        function move(ev) {
          var r = slider.getBoundingClientRect(), f = frac();
          var t = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
          var lo = isLo ? Math.min(t, f.hi) : f.lo, hi = isLo ? f.hi : Math.max(t, f.lo);
          drawerFilters.priceMin = Math.round(f.b.min + lo * (f.b.max - f.b.min));
          drawerFilters.priceMax = Math.round(f.b.min + hi * (f.b.max - f.b.min));
          render(); refreshSheetCount(); refreshPrefilterCount();
        }
        function up() {
          thumb.removeEventListener("pointermove", move);
          thumb.removeEventListener("pointerup", up);
          refreshShopFilters(); refreshFilterSheet(); refreshPrefilter(); // apply the range everywhere
        }
        thumb.addEventListener("pointermove", move);
        thumb.addEventListener("pointerup", up);
      });
    }
    drag(loT, true); drag(hiT, false);
    render();
  }
  function initFsSlider() { initPriceSlider(sheetEl, "fs"); }

  // ---------- pushed-screen router (history-based stack) ----------

  var screenStack = [];

  function pushScreen(id, html) {
    var el = document.createElement("div");
    el.className = "screen-push";
    el.id = "screen-" + id;
    el.innerHTML = html;
    document.body.appendChild(el);
    screenStack.push({ id: id, el: el });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add("in");
      });
    });
    history.pushState({ screen: id, depth: screenStack.length }, "", "#" + id);
  }

  function slideOut(entry) {
    entry.el.style.transform = ""; // clear the settled pin (master push)
    entry.el.classList.remove("in");
    entry.el.addEventListener("transitionend", function () {
      entry.el.remove();
    });
    setTimeout(function () { entry.el.remove(); }, 400); // fallback
  }

  window.addEventListener("popstate", function () {
    var id = location.hash ? location.hash.slice(1) : null;
    if (id !== "filters") closeFilterSheet();
    if (id !== "sort") closeSortSheet();
    if (id !== "grading") closeGradingSheet();
    if (id !== "vfilters") closeVsFilterSheet();
    if (id !== "vsort") closeVsSortSheet();
    // pop overlays until the top matches the current history entry;
    // underlying screens keep their DOM (and scroll) untouched
    while (screenStack.length && screenStack[screenStack.length - 1].id !== id) {
      slideOut(screenStack.pop());
    }
  });

  function openPrefilter() {
    if (document.getElementById("screen-prefilter")) return;
    pushScreen("prefilter", prefilterScreenHTML());
    clampChipGroups(document.getElementById("screen-prefilter"));
    initPriceSlider(document.getElementById("screen-prefilter"), "pf");
    // pre-filter header responds to scroll differently from the master:
    // title always visible; bg+shadow (and the back button's grey circle)
    // appear once content scrolls >= 1px (frames 1846:145823/146864)
    var sc = document.getElementById("pf-content");
    var head = document.getElementById("pf-header");
    if (sc && head) {
      sc.addEventListener("scroll", function () {
        head.classList.toggle("scrolled", sc.scrollTop >= 1);
      }, { passive: true });
    }
  }

  // ---------- actions ----------
  // Every visibly tappable element routes here. Destinations not
  // yet built (no signed-off frame) show the toast — no dead taps.

  var actions = {
    "shop-all": function () { openPrefilter(); },
    versions: function () {
      if (!document.getElementById("screen-versions")) {
        pushScreen("versions", versionsScreenHTML());
        initVersionsCollapse();
      }
    },
    "vs-search": function () { toast(); },
    "vs-filters": function () { openVsFilterSheet(); },
    "vs-sort": function () { openVsSortSheet(); },
    "vsf-close": function () { history.back(); },
    "vsf-chip": function (el) {
      var arr = vsFilters[el.dataset.group], i = arr.indexOf(el.dataset.value);
      if (i === -1) arr.push(el.dataset.value); else arr.splice(i, 1);
      refreshVsSheet(); refreshVersionsList();
    },
    "vsf-clear": function () {
      vsFilters = { formats: [], countries: [], years: [], descriptions: [] };
      refreshVsSheet(); refreshVersionsList();
    },
    "vsort-close": function () { history.back(); },
    "vsort-opt": function (el) {
      vsSort[el.dataset.group] = el.dataset.value;
      if (vsSortSheetEl) vsSortSheetEl.querySelectorAll(".sort-row").forEach(function (row) {
        row.querySelector(".sort-radio").classList.toggle("selected", vsSort[row.dataset.group] === row.dataset.value);
      });
    },
    "vsort-apply": function () { refreshVersionsList(); history.back(); },
    "pf-back": function () { history.back(); },
    "more-formats": function () {
      pfFormatsExpanded = true;
      openPrefilter();
      refreshPrefilter();
    },
    "pf-formats-more": function () {
      pfFormatsExpanded = !pfFormatsExpanded;
      refreshPrefilter();
      refreshFilterSheet();
    },
    "pf-format": function (el) {
      var f = el.dataset.format;
      var i = filters.formats.indexOf(f);
      if (i === -1) filters.formats.push(f); else filters.formats.splice(i, 1);
      refreshPrefilter();
      refreshFilterSheet();
      refreshShopFilters();
    },
    "pf-country": function (el) {
      var c = el.dataset.country;
      var i = filters.countries.indexOf(c);
      if (i === -1) filters.countries.push(c); else filters.countries.splice(i, 1);
      refreshPrefilter();
      refreshFilterSheet();
      refreshShopFilters();
    },
    "pf-condition": function (el) {
      var g = el.dataset.grade;
      var i = filters.conditions.indexOf(g);
      if (i === -1) filters.conditions.push(g); else filters.conditions.splice(i, 1);
      refreshPrefilter();
      refreshFilterSheet();
      refreshShopFilters();
    },
    "pf-showmore": function () { toast(); },
    "pf-clear": function () {
      drawerFilters = { descriptions: [], years: [], currencies: [], acceptsOffers: false, priceMin: null, priceMax: null };
      filters.formats = [];
      filters.conditions = [];
      filters.countries = [];
      refreshPrefilter();
      refreshShopFilters();
    },
    "pf-info": function () { openGradingSheet(); },
    "grading-close": function () { history.back(); },
    "pf-shop": function () {
      if (!document.getElementById("screen-shop")) pushScreen("shop", shopScreenHTML());
    },
    "screen-back": function () { history.back(); },
    "shop-filters": function () { openFilterSheet(); },
    "fs-close": function () { history.back(); },
    "fs-clear": function () {
      filters.formats = []; filters.conditions = []; filters.countries = [];
      drawerFilters = { descriptions: [], years: [], currencies: [], acceptsOffers: false, priceMin: null, priceMax: null };
      var sh = sheetEl; if (sh) { sh.innerHTML = filterSheetHTML(); clampChipGroups(sh); initFsSlider(); }
      refreshShopFilters(); refreshPrefilter();
    },
    "fs-chip": function (el) {
      var arr = drawerFilters[el.dataset.group];
      var i = arr.indexOf(el.dataset.value);
      if (i === -1) arr.push(el.dataset.value); else arr.splice(i, 1);
      el.classList.toggle("selected");
      refreshSheetCount(); refreshShopFilters(); refreshFilterSheet(); refreshPrefilter();
    },
    "fs-offers": function (el) {
      drawerFilters.acceptsOffers = !drawerFilters.acceptsOffers;
      el.classList.toggle("on");
      refreshSheetCount(); refreshShopFilters(); refreshFilterSheet(); refreshPrefilter();
    },
    "pf-toggle": function (el) {
      var key = el.dataset.card, card = el.closest(".pf-card");
      pfOpen[key] = !pfOpen[key];
      card.classList.toggle("closed", !pfOpen[key]);
      el.setAttribute("aria-expanded", pfOpen[key] ? "true" : "false");
      if (pfOpen[key]) { clampChipGroups(card); initPriceSlider(card, "pf"); } // chips can only be measured once visible
    },
    "af-remove": function (el) {
      var g = el.dataset.group;
      if (g === "price") { drawerFilters.priceMin = null; drawerFilters.priceMax = null; if (sheetEl) initFsSlider(); }
      else if (g === "offers") drawerFilters.acceptsOffers = false;
      else {
        var arr = filters[g] || drawerFilters[g] || [];
        var i = arr.indexOf(el.dataset.value);
        if (i !== -1) arr.splice(i, 1);
      }
      refreshFilterSheet();
      refreshPrefilter(); // keep the pre-filter behind in sync
      refreshShopFilters();
    },
    "shop-sort": function () { openSortSheet(); },
    "sort-close": function () { history.back(); },
    "sort-opt": function (el) {
      sortState[el.dataset.group === "order" ? "order" : "by"] = el.dataset.value;
      if (sortSheetEl) {
        sortSheetEl.querySelectorAll(".sort-row").forEach(function (row) {
          var g = row.dataset.group === "order" ? "order" : "by";
          row.querySelector(".sort-radio").classList.toggle("selected", sortState[g] === row.dataset.value);
        });
      }
    },
    "sort-apply": function () {
      refreshSortPill();
      refreshShopFilters(); // re-order the listings
      history.back();
    },
    listing: function () { toast(); },
    version: function () { toast(); }, // version pages off for this test (user)
    "vp-thumb": function (el) {
      var img = document.getElementById("vp-featured");
      if (img) img.src = el.dataset.src;
      var rail = document.getElementById("vp-rail");
      if (rail) {
        rail.querySelectorAll(".vp-thumb").forEach(function (t) {
          t.classList.toggle("selected", t === el);
        });
      }
    },
    "vp-reviews": function () { toast(); },
    "vp-sales": function () { toast(); },
    "vp-sell": function () { toast(); },
    "vp-tracklist": function () { toast(); },
    "vp-credits": function () { toast(); },
    "vp-companies": function () { toast(); },
    "vp-identifiers": function () { toast(); },
    "artist-card": function () { toast(); },
    play: function () { toast(); },
    skittles: function () { toast(); },
    lists: function () {
      if (!document.getElementById("screen-lists")) {
        pushScreen("lists", listsScreenHTML());
        initPushedHeader("lists");
      }
    },
    list: function () { toast(); },
    videos: function () {
      if (!document.getElementById("screen-videos")) {
        pushScreen("videos", videosScreenHTML());
        initPushedHeader("videos");
      }
    },
    // master format chips: open the pre-filter with that format applied
    format: function (el) {
      var f = el.dataset.format;
      // never pre-select a format with no listings (see shoppableFormats)
      filters.formats = shoppableFormats.indexOf(f) === -1 ? [] : [f];
      openPrefilter();
      refreshPrefilter();
    },
    artist: function () { openArtist(); },
    "genre-style": function () { toast(); },
    notes: function () {
      if (!document.getElementById("screen-notes")) {
        pushScreen("notes", notesScreenHTML());
        initPushedHeader("notes");
      }
    },
    video: function () { toast(); },
    reviews: function () { toast(); },
    scrobble: function () { toast(); },
    cart: function () { toast(); },
    share: function () { toast(); },
    "back-nav": function () { history.back(); },
    "tab-tracklist": function () { switchTab("tracklist"); },
    "tab-credits": function () { switchTab("credits"); },
    credit: function () { toast(); },
    "all-credits": function () { toast(); },
    "tabbar-explore": function () { /* current tab */ },
    "tabbar-collection": function () { toast(); },
    "tabbar-wantlist": function () { toast(); },
    "tabbar-profile": function () { toast(); },
  };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var fn = actions[el.dataset.action];
    if (fn) fn(el);
  });

  // ---------- sticky CTA reveal ----------
  // Inline primary button owns the top; the sticky bar appears
  // only once the inline CTA has scrolled out of the viewport.

  function initStickyCTA() {
    var inline = document.getElementById("inline-cta");
    var bar = document.getElementById("bottom-action-bar");
    if (!inline || !bar) return;
    var io = new IntersectionObserver(
      function (entries) {
        bar.classList.toggle("visible", !entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(inline);
  }

  // fixed-header scroll behavior (Master A) — master lives in a pushed
  // overlay now, so the overlay element is the scroll container
  function initMaHeader(scroller) {
    var header = document.getElementById("ma-header");
    var title = document.querySelector(".d-title");
    if (!header || !title || !scroller) return;
    function update() {
      header.classList.toggle("scrolled", scroller.scrollTop >= 1);
      var hb = header.getBoundingClientRect().bottom;
      header.classList.toggle("titled", title.getBoundingClientRect().bottom <= hb);
    }
    scroller.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
    update();
  }

  // ---------- Search screen (frame 2005:92242) — the flow's entry point ----------
  // Live-feeling typeahead over baked REAL Discogs search results
  // (shared/search-data.js, one entry per typing prefix). The Rumours
  // master opens the master page; other results toast.

  var searchState = { q: "", tab: "All" };
  var SEARCH_TABS = ["All", "Master", "Versions", "Artists", "Labels"];
  var RUMOURS_MASTER_ID = 38722;

  function srMasterAction(m) {
    return m.id === RUMOURS_MASTER_ID ? "open-master" : "sr-item";
  }

  // The one master card, used for Top result and every master list so they
  // are identical everywhere. The stacked art reads as "this master has many
  // versions", which a flat thumb didn't convey.
  function srBigCardHTML(m) {
    return (
      '<button class="sr-card tappable" data-action="' + srMasterAction(m) + '">' +
      '<span class="sr-art-stack"><span class="layer l1"></span><span class="layer l2"></span>' +
      '<span class="layer l3">' + (m.thumb ? '<img src="' + esc(m.thumb) + '" alt="" />' : "") + "</span></span>" +
      '<span class="sr-info">' +
      '<span class="sr-overline">Master</span>' +
      '<span class="sr-title">' + esc(m.title) + "</span>" +
      '<span class="sr-sub">' + esc(m.artist || "") + (m.artist ? ' <span class="dot">\u2022</span> ' : "") + "Album</span>" +
      (m.year ? '<span class="sr-year">' + esc(m.year) + "</span>" : "") +
      "</span>" +
      "</button>"
    );
  }

  // The baked search data carries only three releases per query. For Rumours
  // the real version list already lives in data.js, so the Versions tab shows
  // those instead of a three-row stub. Format is joined the way the baked
  // releases spell it ("Vinyl, LP, Album") so both sources render alike.
  function rumoursVersionCards() {
    return DATA.versions.map(function (v) {
      return {
        title: v.title,
        artist: v.artist,
        format: [v.format, v.description].filter(Boolean).join(", "),
        year: v.year,
        country: v.country,
        thumb: v.artwork,
        copiesForSale: v.copiesForSale,
        priceDisplay: v.priceDisplay,
      };
    });
  }

  // Version-card CTA (Cards doc "Version Card"): a 30px tinted button inset
  // in a 48px frame — "{n} for sale · about $X" (median, whole dollars);
  // none-for-sale is the disabled grey state.
  function versionCtaHTML(n, price) {
    return n > 0 && price
      ? '<button class="version-cta tappable" data-action="version-shop">' + fmtN(n) + ' for sale <span class="dot">\u00B7</span> ' + priceDisplay(price) + "</button>"
      : '<span class="version-cta none">None for sale</span>'; // onPress removed
  }

  function isRumoursQuery(d) {
    return d.masters.some(function (m) { return m.id === RUMOURS_MASTER_ID; });
  }

  function srReleaseCardHTML(r) {
    // Both sources spell the format list as one string with the media format
    // first ("Vinyl, LP, Album"). The leading token becomes the overline on
    // its own, leaving only the pressing detail on the meta line. "Release"
    // is the fallback for the rare entry with no format at all.
    var list = String(r.format || "");
    var comma = list.indexOf(",");
    var media = (comma === -1 ? list : list.slice(0, comma)).trim();
    var detail = comma === -1 ? "" : list.slice(comma + 1).trim();
    var hasListing = typeof r.copiesForSale === "number";
    var inner =
      (r.thumb ? '<img class="sr-thumb" src="' + esc(r.thumb) + '" alt="" />' : '<span class="sr-thumb ph"></span>') +
      '<span class="sr-info">' +
      '<span class="sr-overline">' + esc(media || "Release") + "</span>" +
      '<span class="sr-title">' + esc(r.title) + "</span>" +
      (r.artist ? '<span class="sr-sub">' + esc(r.artist) + (hasListing ? ' <span class="dot">\u2022</span> <span class="muted">Album</span>' : "") + "</span>" : "") +
      (detail ? '<span class="sr-desc">' + esc(detail) + "</span>" : "") +
      '<span class="sr-year">' + esc([r.year, r.country].filter(Boolean).join(" \u2022 ")) + "</span>" +
      "</span>";
    // Rumours versions (real listing data) take the full Version Card with
    // its Shop CTA; other queries' releases stay plain rows.
    return hasListing
      ? '<div class="sr-card sr-version">' +
        '<button class="sr-row-inner tappable" data-action="sr-item">' + inner + "</button>" +
        versionCtaHTML(r.copiesForSale, r.priceDisplay) +
        "</div>"
      : '<button class="sr-card sr-row tappable" data-action="sr-item">' + inner + "</button>";
  }

  // 41% of the baked label results have no thumb (Discogs has no image for
  // them), which left the Labels grid full of blank circles. Stand a monogram
  // in instead: initials taken from the label's own name over a tint hashed
  // from that name, so each label keeps a stable identity across renders.
  // Deliberately generic — not an attempt at any label's real mark.
  var MONO_TINTS = ["#e3e1dc", "#dfe3e6", "#e2e5dd", "#e8e0da", "#dee2ea", "#e6e0e6"];

  function monoInitials(name) {
    // skip "(2)"-style disambiguators and punctuation-only tokens
    var words = String(name).split(/[\s,\/]+/).filter(function (w) {
      return w.charAt(0) !== "(" && /[A-Za-z0-9]/.test(w);
    });
    var letters = words.slice(0, 2).map(function (w) {
      return w.match(/[A-Za-z0-9]/)[0].toUpperCase();
    }).join("");
    return letters || "?";
  }

  function monoTint(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return MONO_TINTS[h % MONO_TINTS.length];
  }

  // ---------- generated label marks (user request) ----------
  // Simple vector logos for the baked labels that have no artwork: a motif
  // keyed to the label's name plus a short letter-spaced wordmark, over the
  // hashed tint. Deliberately generic geometry — not any label's real mark.
  var INK = "#121212";
  var LABEL_LOGOS = {
    "A Fleetwood Mac Production":   { motif: "clapper",  mark: "AFMP" },
    "A2F Studios, Miami, FL":       { motif: "faders",   mark: "A2F" },
    "Det Røde Rum":                 { motif: "room",     mark: "DRR", accent: "#b3261e" },
    "FLE":                          { motif: "pennant",  mark: "FLE" },
    "Fle Publishing":               { motif: "pages",    mark: "FLE" },
    "Fleedleedle Music":            { motif: "notes",    mark: "FDL" },
    "Fleet Benelux":                { motif: "tribar",   mark: "FLEET" },
    "Fleet Foxes":                  { motif: "fox",      mark: "FF" },
    "Fleetwood (5)":                { motif: "pennant",  mark: "FW" },
    "Fleetwood Mac":                { motif: "pennant",  mark: "FM" },
    "Fleetwood Music Ltd.":         { motif: "notes",    mark: "FML" },
    "JTV-FL":                       { motif: "tiles",    mark: "JTV" },
    "La Rumours":                   { motif: "whisper",  mark: "LA R" },
    "Nasty Rumours":                { motif: "whisper",  mark: "NR" },
    "Not On Label (Fleetwood Mac)": { motif: "nolabel",  mark: "N/L" },
    "R. Twerk & Co.":               { motif: "amp",      mark: "RT&CO" },
    "Red Rum Records":              { motif: "disc",     mark: "RRR", accent: "#b3261e" },
    "Ru Music":                     { motif: "notes",    mark: "RU" },
    "Rum":                          { motif: "tumbler",  mark: "RUM" },
    "Rum Music":                    { motif: "notes",    mark: "RUM" },
    "Rumo Empreendimentos Artisticos Ltda": { motif: "compass", mark: "RUMO" },
    "Rumour":                       { motif: "whisper",  mark: "R" },
    "Rumour Music":                 { motif: "whisper",  mark: "RM" },
    "Rumour Music Publishing":      { motif: "pages",    mark: "RMP" },
    "Rumour Publishing":            { motif: "pages",    mark: "RP" },
    "Rumours Music":                { motif: "whisper",  mark: "RM" },
    "Rumours Records Limited":      { motif: "disc",     mark: "RRL" },
    "Rumours, NYC":                 { motif: "skyline",  mark: "NYC" },
    "Studio 308, Miami, Fl":        { motif: "faders",   mark: "308" },
    "The Record Room, Miami, FL":   { motif: "disc",     mark: "TRR" },
    "www.cdline.ru":                { motif: "globe",    mark: "CDLINE" },
    "www.soundcheck.ru":            { motif: "globe",    mark: "SNDCHK" },
  };

  // every motif is drawn inside x 22..78, y 14..58 of a 100x100 box
  function labelMotifSVG(key, ink) {
    var s = 'stroke="' + ink + '" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
    switch (key) {
      case "disc":    return '<circle cx="50" cy="36" r="20" ' + s + '/><circle cx="50" cy="36" r="11" ' + s + '/><circle cx="50" cy="36" r="3" fill="' + ink + '"/>';
      case "whisper": return '<path d="M30 20h40v22H46l-10 9v-9h-6z" ' + s + '/><line x1="40" y1="31" x2="60" y2="31" ' + s + '/>';
      case "notes":   return '<line x1="40" y1="20" x2="40" y2="46" ' + s + '/><line x1="62" y1="16" x2="62" y2="42" ' + s + '/><line x1="40" y1="20" x2="62" y2="16" ' + s + '/><circle cx="34" cy="47" r="6" fill="' + ink + '"/><circle cx="56" cy="43" r="6" fill="' + ink + '"/>';
      case "pages":   return '<rect x="30" y="18" width="30" height="38" rx="3" ' + s + '/><line x1="38" y1="30" x2="52" y2="30" ' + s + '/><line x1="38" y1="38" x2="52" y2="38" ' + s + '/><line x1="38" y1="46" x2="48" y2="46" ' + s + '/>';
      case "faders":  return '<line x1="36" y1="18" x2="36" y2="56" ' + s + '/><line x1="50" y1="18" x2="50" y2="56" ' + s + '/><line x1="64" y1="18" x2="64" y2="56" ' + s + '/><rect x="31" y="40" width="10" height="6" rx="1" fill="' + ink + '"/><rect x="45" y="24" width="10" height="6" rx="1" fill="' + ink + '"/><rect x="59" y="34" width="10" height="6" rx="1" fill="' + ink + '"/>';
      case "skyline": return '<path d="M26 56V38h8v18M38 56V24h10v32M52 56V32h8v24M64 56V42h10v14" ' + s + '/><line x1="24" y1="56" x2="76" y2="56" ' + s + '/>';
      case "globe":   return '<circle cx="50" cy="36" r="20" ' + s + '/><ellipse cx="50" cy="36" rx="8" ry="20" ' + s + '/><line x1="30" y1="36" x2="70" y2="36" ' + s + '/>';
      case "pennant": return '<line x1="34" y1="16" x2="34" y2="58" ' + s + '/><path d="M34 18h34l-10 11 10 11H34z" fill="' + ink + '"/>';
      case "fox":     return '<path d="M30 20l8 14h24l8-14v22c0 9-9 16-20 16S30 51 30 42z" ' + s + '/><circle cx="43" cy="42" r="2.5" fill="' + ink + '"/><circle cx="57" cy="42" r="2.5" fill="' + ink + '"/>';
      case "clapper": return '<rect x="28" y="30" width="44" height="26" rx="3" ' + s + '/><path d="M28 30l6-12h38l-6 12" ' + s + '/><line x1="42" y1="18" x2="36" y2="30" ' + s + '/><line x1="56" y1="18" x2="50" y2="30" ' + s + '/>';
      case "tribar":  return '<rect x="28" y="20" width="44" height="9" rx="2" fill="' + ink + '"/><rect x="28" y="33" width="44" height="9" rx="2" ' + s + '/><rect x="28" y="46" width="44" height="9" rx="2" fill="' + ink + '"/>';
      case "tiles":   return '<rect x="28" y="18" width="18" height="18" rx="3" fill="' + ink + '"/><rect x="54" y="18" width="18" height="18" rx="3" ' + s + '/><rect x="28" y="40" width="18" height="18" rx="3" ' + s + '/><rect x="54" y="40" width="18" height="18" rx="3" fill="' + ink + '"/>';
      case "nolabel": return '<circle cx="50" cy="36" r="20" ' + s + ' stroke-dasharray="6 6"/><line x1="36" y1="22" x2="64" y2="50" ' + s + '/>';
      case "amp":     return '<text x="50" y="40" text-anchor="middle" dominant-baseline="central" font-family="Inter, system-ui, sans-serif" font-size="46" font-weight="700" fill="' + ink + '">&amp;</text>';
      case "tumbler": return '<path d="M32 18h36l-4 38H36z" ' + s + '/><line x1="35" y1="34" x2="65" y2="34" ' + s + '/>';
      case "compass": return '<circle cx="50" cy="36" r="20" ' + s + '/><path d="M50 18l7 18-7 18-7-18z" fill="' + ink + '"/>';
      case "room":    return '<rect x="28" y="16" width="44" height="40" rx="2" ' + s + '/><rect x="44" y="30" width="12" height="26" fill="' + ink + '"/><circle cx="53" cy="44" r="1.6" fill="#fff"/>';
      default:        return "";
    }
  }

  function srLabelLogoHTML(name, square) {
    var spec = LABEL_LOGOS[name];
    if (!spec) return null;
    var ink = spec.accent || INK;
    var mark = esc(spec.mark);
    var fs = mark.length > 4 ? 13 : 16;
    return (
      '<svg class="sr-circle-ph mono label-logo" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      (square
        ? '<rect x="0" y="0" width="100" height="100" rx="5" fill="' + monoTint(name) + '" />'
        : '<circle cx="50" cy="50" r="50" fill="' + monoTint(name) + '" />') +
      labelMotifSVG(spec.motif, ink) +
      '<text x="50" y="76" text-anchor="middle" dominant-baseline="central" font-family="Inter, system-ui, sans-serif" font-size="' + fs + '" font-weight="700" letter-spacing="2" fill="' + INK + '">' + mark + "</text>" +
      "</svg>"
    );
  }

  // an SVG so the initials scale with the circle at any grid width
  function srMonogramHTML(name, square) {
    var logo = srLabelLogoHTML(name, square);
    if (logo) return logo;
    return (
      '<svg class="sr-circle-ph mono" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      (square
        ? '<rect x="0" y="0" width="100" height="100" rx="5" fill="' + monoTint(name) + '" />'
        : '<circle cx="50" cy="50" r="50" fill="' + monoTint(name) + '" />') +
      '<text class="sr-mono-text" x="50" y="50" text-anchor="middle" dominant-baseline="central">' +
      esc(monoInitials(name)) + "</text>" +
      "</svg>"
    );
  }

  function srCircleCardHTML(x, monogram) {
    var art = x.thumb
      ? '<img src="' + esc(x.thumb) + '" alt="" />'
      : (monogram ? srMonogramHTML(x.name) : '<span class="sr-circle-ph"></span>');
    return (
      '<button class="sr-circle tappable" data-action="sr-item">' +
      art +
      '<span class="sr-circle-name">' + esc(x.name) + "</span>" +
      "</button>"
    );
  }

  // Full list-view entity card for the Artists / Labels tabs (Cards doc,
  // "Artist & Label Cards"): 86x86 image — circular for artists, square
  // for labels — ARTIST/LABEL overline, name clamped to 2 lines. The All
  // tab keeps the circle previews. Count pills omitted: no per-entity
  // aggregate data in the dataset (doc itself flags the source as TBC).
  function srEntityRowHTML(x, kind) {
    var isLabel = kind === "label";
    var art = x.thumb
      ? '<img class="sr-entity-art' + (isLabel ? " square" : "") + '" src="' + esc(x.thumb) + '" alt="" />'
      : (isLabel
          ? '<span class="sr-entity-art square mono">' + srMonogramHTML(x.name, true) + "</span>"
          : '<span class="sr-entity-art ph"></span>');
    return (
      '<button class="sr-card sr-entity tappable" data-action="' + (!isLabel && x.id === ARTIST_ID ? "open-artist" : "sr-item") + '">' +
      art +
      '<span class="sr-info">' +
      '<span class="sr-overline">' + (isLabel ? "Label" : "Artist") + "</span>" +
      '<span class="sr-title">' + esc(x.name) + "</span>" +
      "</span>" +
      "</button>"
    );
  }

  // plain section label: no chevron, not tappable (user) — the chevron was
  // the only affordance for a tap that just toasted
  function srSectionHeader(label) {
    return '<div class="sr-sec-head"><span class="sr-sec-title">' + label + "</span></div>";
  }

  // Any of these, at every point while typing, resolve to the Rumours master:
  //   "fleetwood mac r…umours", "rumours f…leetwood mac", "rumours by f…leetwood mac"
  function isFmRumoursQuery(q) {
    q = q.replace(/\s+/g, " ");
    var isPrefix = function (rem, full) { return rem.length > 0 && full.indexOf(rem) === 0; };
    var m = q.match(/^fleetwood mac (.+)$/);
    if (m && isPrefix(m[1], "rumours")) return true;
    m = q.match(/^rumours (.+)$/);
    return !!(m && (isPrefix(m[1], "fleetwood mac") || isPrefix(m[1], "by fleetwood mac")));
  }

  function fmRumoursResults() {
    var base = SEARCH_DATA["rumours"], fm = SEARCH_DATA["fleetwood mac"];
    var rum = base && base.masters.filter(function (m) { return m.id === RUMOURS_MASTER_ID; })[0];
    var art = fm && fm.artists.filter(function (a) { return a.id === ARTIST_ID; })[0];
    if (!rum) return null;
    return { masters: [rum], artists: art ? [art] : [], labels: [], releases: [], single: true };
  }

  // the query's Fleetwood Mac hits, when present: the artist row and the
  // self-titled master lead the "Top results" block
  function fmTopHits(d) {
    var artist = d.artists.filter(function (a) { return a.id === ARTIST_ID; })[0];
    if (!artist) return null;
    var master = d.masters.filter(function (m) { return /^fleetwood mac$/i.test(m.title) && /fleetwood mac/i.test(m.artist); })[0] || d.masters[0];
    return { artist: artist, master: master };
  }

  function searchResultsHTML() {
    var raw = searchState.q.trim().toLowerCase();
    if (!raw) {
      return '<p class="sr-hint">Search for artists, albums, labels, and more</p>';
    }
    // "rumor"/"rumors" (US spelling) resolve to the baked "rumour(s)" data,
    // with a note so the correction is visible
    var q = raw.replace(/\brumor(s?)\b/g, "rumour$1");
    var corrected = q !== raw;
    var d = typeof SEARCH_DATA !== "undefined" && SEARCH_DATA[q];
    // The baked prefixes stop at "fleetwood mac". Keep typing toward Rumours
    // and the query resolves to that master alone as the top result (the
    // artist row stays as the one other relevant hit); the Versions tab then
    // shows the real Rumours versions via isRumoursQuery.
    if (!d && isFmRumoursQuery(q)) d = fmRumoursResults();
    if (!d || (!d.masters.length && !d.artists.length && !d.labels.length && !d.releases.length)) {
      return '<p class="sr-hint">No results for \u201C' + esc(searchState.q.trim()) + '\u201D</p>';
    }
    var t = searchState.tab;
    var html = corrected ? '<p class="sr-corrected">Showing results for <b>' + esc(q) + "</b></p>" : "";
    var showMasters = t === "All" || t === "Master";
    var showArtists = t === "All" || t === "Artists";
    var showLabels = t === "All" || t === "Labels";
    // Releases are the Versions tab's only content, so they stay there —
    // but they no longer tail the combined "All" results.
    var showReleases = t === "Versions";
    if (showMasters && d.masters.length) {
      if (t === "All") {
        // single-master query: the master alone is the top result; the
        // artist appears once, in the Artists section below
        var fm = !d.single && fmTopHits(d);
        html += fm
          // Fleetwood Mac in the results: "Top results" — the artist's list
          // row (opens the artist page) followed by the self-titled master
          ? '<div class="sr-section">' + srSectionHeader("Top results") + srEntityRowHTML(fm.artist, "artist") + srBigCardHTML(fm.master) + "</div>"
          : '<div class="sr-section">' + srSectionHeader("Top result") + srBigCardHTML(d.masters[0]) + "</div>";
      }
      // a single-master query ("fleetwood mac rumours") shows nothing below
      // the top result but the artist row
      if (d.single && t === "All") {
        return html + (d.artists.length ? '<div class="sr-section">' + srSectionHeader("Artists") + '<div class="sr-scroll">' + d.artists.map(function (x) { return srEntityRowHTML(x, "artist"); }).join("") + "</div></div>" : "");
      }
      var tops = t === "All" ? d.masters.slice(0, 3) : d.masters;
      if (t === "All") {
        html += '<div class="sr-section">' + srSectionHeader("Top master releases") +
          tops.map(srBigCardHTML).join("") + "</div>";
      } else {
        html += '<div class="sr-section">' + tops.map(srBigCardHTML).join("") + "</div>";
      }
    }
    // On "All" these are previews: a labelled, chevroned row that scrolls
    // sideways. On their own tab they are the whole screen, so the label,
    // chevron and See all go away and the circles wrap in a grid instead.
    if (showArtists && d.artists.length) {
      html += t === "All"
        ? '<div class="sr-section">' + srSectionHeader("Artists") +
          '<div class="sr-scroll">' + d.artists.map(srCircleCardHTML).join("") + "</div></div>"
        : '<div class="sr-section">' + d.artists.map(function (x) { return srEntityRowHTML(x, "artist"); }).join("") + "</div>";
    }
    if (showLabels && d.labels.length) {
      html += t === "All"
        ? '<div class="sr-section">' + srSectionHeader("Labels") +
          '<div class="sr-scroll">' + d.labels.map(function (l) { return srCircleCardHTML(l, true); }).join("") + "</div></div>"
        : '<div class="sr-section">' + d.labels.map(function (x) { return srEntityRowHTML(x, "label"); }).join("") + "</div>";
    }
    if (showMasters && t === "All" && d.masters.length > 3) {
      html += '<div class="sr-section">' + srSectionHeader("More master releases") +
        d.masters.slice(3, 7).map(srBigCardHTML).join("") + "</div>";
    }
    if (showReleases) {
      var rels = isRumoursQuery(d) ? rumoursVersionCards() : d.releases;
      // Versions only ever renders on its own tab, so it needs no label
      if (rels.length) {
        html += '<div class="sr-section">' + rels.map(srReleaseCardHTML).join("") + "</div>";
      }
    }
    return html;
  }

  function searchScreenHTML() {
    return (
      '<div class="screen search-screen">' +
      '<div class="search-head" id="search-head">' +
      '<div class="safe-top"></div>' +
      '<div class="search-bar-row">' +
      '<div class="search-input-pill">' +
      '<button class="search-back tappable" data-action="search-back" aria-label="Back"><img src="shared/assets/icon-arrow-left-24.svg" alt="" /></button>' +
      '<input class="search-input" id="search-input" type="search" placeholder="Search Discogs" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search" />' +
      '<button class="search-clear tappable" id="search-clear" data-action="search-clear" aria-label="Clear" hidden><img src="shared/assets/icon-close-circle.svg" alt="" /></button>' +
      "</div>" +
      '<button class="search-scan tappable" data-action="search-scan" aria-label="Scan barcode"><img src="shared/assets/icon-barcode.svg" alt="" /></button>' +
      "</div>" +
      '<div class="search-tabs" id="search-tabs"' + (searchState.q.trim() ? "" : " hidden") + ">" +
      SEARCH_TABS.map(function (t) {
        return '<button class="search-tab tappable' + (t === searchState.tab ? " active" : "") + '" data-action="search-tab" data-tab="' + t + '">' + t + "</button>";
      }).join("") +
      "</div>" +
      "</div>" +
      // Filters/Sort scroll away with the results (user); bar+tabs stay sticky
      '<div class="search-toolbar" id="search-toolbar"' + (searchState.q.trim() ? "" : " hidden") + ">" +
      '<button class="pill-button tappable" data-action="search-filters"><span class="surface">Filters <img class="i-filter" src="shared/assets/icon-filter.svg" alt="" /></span></button>' +
      '<button class="pill-button tappable" data-action="search-sort"><span class="surface"><span class="sort-prefix">Sort:</span> Relevance <img class="i-sort" src="shared/assets/icon-sort-asc.svg" alt="" /></span></button>' +
      "</div>" +
      '<div class="search-results" id="search-results">' + searchResultsHTML() + "</div>" +
      '<div class="tab-bar">' +
      '<button class="tab-bar-item active tappable" data-action="tabbar-explore">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-explore" src="shared/assets/tab-explore.svg" alt="" /></span></span>' +
      '<span class="label">Explore</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-collection">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-collection" src="shared/assets/tab-collection.svg" alt="" /></span></span>' +
      '<span class="label">Collection</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-wantlist">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-wantlist" src="shared/assets/tab-wantlist.svg" alt="" /></span></span>' +
      '<span class="label">Wantlist</span>' +
      "</button>" +
      '<button class="tab-bar-item tappable" data-action="tabbar-profile">' +
      '<span class="icon-div"><span class="icon-box"><img class="glyph-profile" src="shared/assets/tab-profile.svg" alt="" /></span></span>' +
      '<span class="label">Profile</span>' +
      "</button>" +
      "</div>" +
      "</div>"
    );
  }

  // CSS can't count rendered lines, so measure after each render: once the
  // pressing detail passes two lines, centring the square leaves a wide gap
  // above it, so pin the art to the top of the card instead.
  function syncRowArtAlign() {
    var rows = document.querySelectorAll(".sr-card.sr-row");
    Array.prototype.forEach.call(rows, function (card) {
      var meta = card.querySelector(".sr-year");
      if (!meta) return;
      var cs = getComputedStyle(meta);
      var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.35;
      var lines = Math.round(meta.getBoundingClientRect().height / lh);
      card.classList.toggle("art-top", lines > 2);
    });
  }

  function refreshSearchResults() {
    var el = document.getElementById("search-results");
    if (el) el.innerHTML = searchResultsHTML();
    syncRowArtAlign();
  }

  // wrapping depends on width, so re-measure when the viewport changes
  window.addEventListener("resize", syncRowArtAlign);

  function initSearch() {
    var input = document.getElementById("search-input");
    var clear = document.getElementById("search-clear");
    if (!input) return;
    input.addEventListener("input", function () {
      searchState.q = input.value;
      if (clear) clear.hidden = !input.value;
      var has = !!input.value.trim();
      var tabs = document.getElementById("search-tabs");
      var toolbar = document.getElementById("search-toolbar");
      if (tabs) tabs.hidden = !has;
      if (toolbar) toolbar.hidden = !has;
      refreshSearchResults();
    });
  }

  function openMaster() {
    if (document.getElementById("screen-master")) return;
    pushScreen("master", masterScreenHTML());
    var push = document.getElementById("screen-master");
    push.classList.add("master-push");
    // once settled, drop the transform so the master's fixed chrome
    // (header, action bar, tab bar) anchors to the viewport again
    push.addEventListener("transitionend", function (e) {
      if (e.target === push && push.classList.contains("in") && !push.style.transform) {
        push.style.transform = "none";
      }
    });
    initStickyCTA();
    initMaHeader(push);
  }

  actions["open-master"] = openMaster;
  actions["sr-item"] = function () { toast(); };
  actions["version-shop"] = function () { actions["pf-shop"](); };
  actions["sr-see-all"] = function () { toast(); };
  // artist page
  actions["artist-card"] = function () { openArtist(); };
  actions["open-artist"] = function () { openArtist(); };
  actions["ar-tab"] = function (el) { arState.tab = el.dataset.tab; refreshArtistTabs(); };
  actions["ar-more"] = function (el) { arState.open[el.dataset.group] = !arState.open[el.dataset.group]; refreshArtistTabs(); };
  actions["ar-members-more"] = function () { arState.membersAll = !arState.membersAll; refreshArtistTabs(); };
  actions["ar-readmore"] = function () { arState.bioAll = !arState.bioAll; refreshArtistTabs(); };
  actions["ar-item"] = function () { toast(); };
  actions["ar-link"] = function () { toast(); };
  actions["ar-shop"] = function () { toast(); };
  // Rumours is the one live link: back to the master if we came from it,
  // otherwise open it fresh (e.g. artist reached from search)
  actions["ar-open-rumours"] = function (el) {
    if (document.getElementById("screen-master")) { history.back(); return; }
    if (actions["open-master"]) actions["open-master"](el);
  };
  actions["search-back"] = function () { toast(); };
  actions["search-scan"] = function () { toast(); };
  actions["search-filters"] = function () { toast(); };
  actions["search-sort"] = function () { toast(); };
  actions["search-clear"] = function () {
    var input = document.getElementById("search-input");
    if (input) { input.value = ""; input.focus(); }
    searchState.q = "";
    var clear = document.getElementById("search-clear");
    if (clear) clear.hidden = true;
    var tabs = document.getElementById("search-tabs");
    var toolbar = document.getElementById("search-toolbar");
    if (tabs) tabs.hidden = true;
    if (toolbar) toolbar.hidden = true;
    refreshSearchResults();
  };
  actions["search-tab"] = function (el) {
    searchState.tab = el.dataset.tab;
    var tabs = document.getElementById("search-tabs");
    if (tabs) {
      tabs.querySelectorAll(".search-tab").forEach(function (t) {
        t.classList.toggle("active", t.dataset.tab === searchState.tab);
      });
    }
    refreshSearchResults();
  };

  // ---------- intro screens (frame 2059:28994) ----------
  // Two steps before search: brand splash, then the participant's task.
  // Elements pop in (fade + blur + 8px rise); Continue on step 1 pushes
  // step 2 from the right; Continue on step 2 fades through white into
  // the default search screen. ?start=search skips the intro (internal).

  function introButtonHTML(action) {
    return (
      '<button class="intro-continue tappable" data-action="' + action + '">' +
      'Continue <img class="intro-arrow" src="shared/assets/icon-arrow-left-24.svg" alt="" />' +
      "</button>"
    );
  }

  function introOneHTML() {
    return (
      '<div class="screen intro-screen">' +
      '<div class="intro-body intro-pop">' +
      '<img class="intro-logo" src="shared/assets/discogs-logo.svg" alt="Discogs" />' +
      '<h1 class="intro-title">New Mobile App Flow Experience</h1>' +
      "</div>" +
      '<div class="intro-foot intro-pop">' + introButtonHTML("intro-next") + "</div>" +
      "</div>"
    );
  }

  function introTwoHTML() {
    return (
      '<div class="screen intro-screen">' +
      '<div class="intro-body intro-pop">' +
      '<p class="intro-eyebrow">Your task</p>' +
      '<p class="intro-task">Search for <b>\u2018Rumours\u2019</b> by the artist <b>Fleetwood Mac.</b></p>' +
      "</div>" +
      '<div class="intro-foot intro-pop">' + introButtonHTML("intro-done") + "</div>" +
      "</div>"
    );
  }

  var introBusy = false;

  // step 1 -> 2: play the pop-in backwards (settle -> blur/fade/sink), then
  // step 2's elements pop in on the same canvas — no push
  actions["intro-next"] = function () {
    if (introBusy) return;
    introBusy = true;
    app.querySelectorAll(".intro-pop").forEach(function (p) { p.classList.add("out"); });
    setTimeout(function () {
      app.innerHTML = introTwoHTML();
      introBusy = false;
    }, 260); // exit is 240 + 60 stagger; step 2 starts popping as it clears
  };

  actions["intro-done"] = function () {
    var veil = document.createElement("div");
    veil.className = "intro-veil";
    document.body.appendChild(veil);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { veil.classList.add("in"); });
    });
    // once white, swap the root to search behind the veil, then lift it
    setTimeout(function () {
      app.innerHTML = searchScreenHTML();
      initSearch();
      requestAnimationFrame(function () {
        veil.classList.remove("in");
        setTimeout(function () { veil.remove(); }, 450);
      });
    }, 320);
  };

  // ---------- boot ----------

  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  if (/[?&]start=search/.test(location.search)) {
    app.innerHTML = searchScreenHTML();
    initSearch();
  } else {
    app.innerHTML = introOneHTML();
  }
})();
