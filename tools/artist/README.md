# Artist page data pipeline (Fleetwood Mac, Discogs 47333)

Everything on the Artist page is real Discogs data, fetched from the **public,
unauthenticated** API (no token) and baked into `shared/artist-data.js`.

    python3 tools/artist/fetch.py   # ~650 paced calls (25/min limit), resumable; ~30 min
    python3 tools/artist/bake.py    # -> shared/artist-data.js + shared/assets/a-art/

`fetch.py` pages the artist's release index, then pulls every Main-role master
(`/masters/{id}` for cover + `/releases/{main}` for the format that decides the
Albums / Singles & EPs / Compilations / Videos grouping), every standalone Main
release, member photos, and the gallery images into `tools/artist/cache/`
(gitignored). `bake.py` is tolerant of a partial cache. Don't hand-edit the
baked file — change the scripts and regenerate.
