// ============================================================
// MASTER A — LIVE DATASET: Fleetwood Mac 'Rumours' (Discogs
// master 38722, main release 526351), generated via API.
// 48 of the 815 versions carry full stats (sampled across years);
// totals (815 versions, 4140 listings) are the real master figures.
// listings[] entries are weighted groups (n) summing to the total.
// ============================================================
const DATA = {
  "provisional": false,
  "master": {
    "type": "Album",
    "title": "Rumours",
    "artist": "Fleetwood Mac",
    "year": 1977,
    "aboutPrice": 34,
    "totalListings": 4167, // 4140 real + 27 fabricated (see listings[])
    "totalVersions": 817, // 815 real + 2 fabricated (see versions[])
    "formats": [
      "Vinyl",
      "CD",
      "Cassette",
      "8-Track Cartridge",
      "File",
      "DVD",
      "SACD",
      "Reel-To-Reel",
      "Minidisc",
      "Box Set",
      "Blu-ray"
    ],
    "rating": 4.5,
    "ratingCount": "4,918",
    "artwork": "shared/assets/r-art/master.jpg",
    "genres": ["Rock"],
    "styles": ["Pop Rock", "Soft Rock", "AOR"],
    // real master notes (API field `notes`); [m=…]/[r=…] release
    // references resolved to their titles, as discogs.com renders them
    "notes": [
      "11th studio album, recorded February–August 1976 and released February 4, 1977, in the U.S. Reissued in 2004 with bonus tracks.",
      "",
      "Related singles:",
      "1978 Track 1 - (Single side B) Don't Stop / Second Hands News",
      "1977 Track 2 - Dreams",
      "1977 Track 3 - (Single side B) Don't Stop / Never Going Back Again",
      "1977 Track 4 - Don't Stop / Never Going Back Again",
      "1976 Track 5 - Go Your Own Way",
      "1977 Track 6 - (Single side B) Dreams / Songbird",
      "1977 Track 7 - The Chain",
      "1977 Track 8 - You Make Loving Fun",
      "1978 Track 9 - (Single side B) Oh Daddy / I Don't Want to Know",
      "1978 Track 10 - Oh Daddy",
      "1977 Track 11 - (Single side B) You Make Loving Fun / Gold Dust Woman"
    ]
  },
  // Lists fixture: the API has no "lists containing this release" endpoint,
  // so titles/users are plausible placeholders; collage art is real version
  // covers from this master, avatars are the real credit/artist photos.
  "lists": [
    { "title": "Classic Rock Essentials", "user": "vinylvictor", "avatar": "shared/assets/r-art/credit257502.jpg",
      "art": ["v1242335.jpg", "v10126845.jpg", "v13365574.jpg", "v8230102.jpg"] },
    { "title": "1977 in Vinyl", "user": "crateDigger77", "avatar": "shared/assets/r-art/credit441677.jpg",
      "art": ["v492873.jpg", "v2695895.jpg", "v6356842.jpg", "v1273917.jpg"] },
    { "title": "Soft Rock Staples", "user": "laurelcanyonkid", "avatar": "shared/assets/r-art/credit2023937.jpg",
      "art": ["v4585868.jpg", "v8555771.jpg", "v9426957.jpg", "v12118397.jpg"] },
    { "title": "Albums Everyone Owns", "user": "thriftbinfinds", "avatar": "shared/assets/r-art/artist.jpg",
      "art": ["v14350066.jpg", "v15566707.jpg", "v17126253.jpg", "v11858454.jpg"] },
    { "title": "Perfect Production", "user": "studioheads", "avatar": "shared/assets/r-art/credit257502.jpg",
      "art": ["v21260926.jpg", "v23333117.jpg", "v24645458.jpg", "v22691735.jpg"] },
    { "title": "Break-up Albums", "user": "sideblistener", "avatar": "shared/assets/r-art/credit441677.jpg",
      "art": ["v27257733.jpg", "v28919683.jpg", "v30867432.jpg", "v32569971.jpg"] }
  ],
  // real master videos (API `videos`); thumbnails saved locally from YouTube
  // (the five remaster topic videos genuinely share the album-art thumb)
  "videos": [
    { "title": "Fleetwood Mac - The Chain (Official Music Video) [HD]", "duration": "4:55", "thumb": "shared/assets/r-art/vid-1.jpg" },
    { "title": "Dreams (2004 Remaster)", "duration": "4:18", "thumb": "shared/assets/r-art/vid-2.jpg" },
    { "title": "Go Your Own Way (2004 Remaster)", "duration": "3:44", "thumb": "shared/assets/r-art/vid-3.jpg" },
    { "title": "Don't Stop (2004 Remaster)", "duration": "3:14", "thumb": "shared/assets/r-art/vid-4.jpg" },
    { "title": "Never Going Back Again (2004 Remaster)", "duration": "2:15", "thumb": "shared/assets/r-art/vid-5.jpg" },
    { "title": "Second Hand News (2004 Remaster)", "duration": "2:57", "thumb": "shared/assets/r-art/vid-6.jpg" }
  ],
  "tracks": [
    {
      "position": "A1",
      "title": "Second Hand News",
      "time": "2:43"
    },
    {
      "position": "A2",
      "title": "Dreams",
      "time": "4:14"
    },
    {
      "position": "A3",
      "title": "Never Going Back Again",
      "time": "2:02"
    },
    {
      "position": "A4",
      "title": "Don't Stop",
      "time": "3:11"
    },
    {
      "position": "A5",
      "title": "Go Your Own Way",
      "time": "3:38"
    },
    {
      "position": "A6",
      "title": "Songbird",
      "time": "3:20"
    },
    {
      "position": "B1",
      "title": "The Chain",
      "time": "4:28"
    },
    {
      "position": "B2",
      "title": "You Make Loving Fun",
      "time": "3:31"
    },
    {
      "position": "B3",
      "title": "I Don't Want To Know",
      "time": "3:11"
    },
    {
      "position": "B4",
      "title": "Oh Daddy",
      "time": "3:54"
    },
    {
      "position": "B5",
      "title": "Gold Dust Woman",
      "time": "4:51"
    }
  ],
  "credits": [
    {
      "role": "Producer",
      "name": "Ken Caillat",
      "avatar": "shared/assets/r-art/credit257502.jpg"
    },
    {
      "role": "Cover",
      "name": "Desmond Strobel",
      "avatar": "shared/assets/r-art/credit441677.jpg"
    },
    {
      "role": "Photography",
      "name": "Herbert Worthington",
      "avatar": "shared/assets/r-art/credit2023937.jpg"
    }
  ],
  "versions": [
    {
      "id": "r8960635",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 21,
      "priceDisplay": {
        "typical": 40
      },
      "artwork": "shared/assets/r-art/v8960635.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.53,
      "ratingCount": 121,
      "have": 1451,
      "want": 1300,
      "identifiers": 17,
      "salesLow": 3,
      "salesMedian": 24,
      "salesHigh": 50
    },
    {
      "id": "r1242335",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Limited Edition, Reissue",
      "year": 1977,
      "edition": null,
      "country": "Netherlands",
      "copiesForSale": 19,
      "priceDisplay": {
        "typical": 51
      },
      "artwork": "shared/assets/r-art/v1242335.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56344",
      "rating": 4.69,
      "ratingCount": 95,
      "have": 850,
      "want": 1325,
      "identifiers": 2,
      "salesLow": 3,
      "salesMedian": 31,
      "salesHigh": 65
    },
    {
      "id": "r24217937",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "Japan",
      "copiesForSale": 15,
      "priceDisplay": {
        "typical": 62
      },
      "artwork": "shared/assets/r-art/v24217937.jpg",
      "label": "Warner Bros. Records",
      "catno": "P10233W",
      "rating": 5.0,
      "ratingCount": 6,
      "have": 40,
      "want": 483,
      "identifiers": 3,
      "salesLow": 4,
      "salesMedian": 37,
      "salesHigh": 78
    },
    {
      "id": "r10755626",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 14,
      "priceDisplay": {
        "typical": 135
      },
      "artwork": "shared/assets/r-art/v10755626.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.58,
      "ratingCount": 33,
      "have": 1267,
      "want": 1221,
      "identifiers": 10,
      "salesLow": 9,
      "salesMedian": 81,
      "salesHigh": 171
    },
    {
      "id": "r8275623",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "France",
      "copiesForSale": 14,
      "priceDisplay": {
        "typical": 58
      },
      "artwork": "shared/assets/r-art/v8275623.jpg",
      "label": "Warner Bros. Records",
      "catno": "56.344",
      "rating": 4.45,
      "ratingCount": 103,
      "have": 1043,
      "want": 1187,
      "identifiers": 7,
      "salesLow": 4,
      "salesMedian": 35,
      "salesHigh": 73
    },
    {
      "id": "r14884954",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue, Repress",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 14,
      "priceDisplay": {
        "typical": 3
      },
      "artwork": "shared/assets/r-art/v14884954.jpg",
      "label": "Warner Bros. Records",
      "catno": "3010-2",
      "rating": 4.61,
      "ratingCount": 182,
      "have": 3146,
      "want": 542,
      "identifiers": 7,
      "salesLow": 0,
      "salesMedian": 2,
      "salesHigh": 4
    },
    {
      "id": "r13259543",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 12,
      "priceDisplay": {
        "typical": 35
      },
      "artwork": "shared/assets/r-art/v13259543.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 4.51,
      "ratingCount": 49,
      "have": 641,
      "want": 952,
      "identifiers": 20,
      "salesLow": 2,
      "salesMedian": 21,
      "salesHigh": 45
    },
    {
      "id": "r18897415",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 12,
      "priceDisplay": {
        "typical": 42
      },
      "artwork": "shared/assets/r-art/v18897415.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.86,
      "ratingCount": 14,
      "have": 350,
      "want": 728,
      "identifiers": 12,
      "salesLow": 3,
      "salesMedian": 25,
      "salesHigh": 54
    },
    {
      "id": "r12118397",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue, Remastered",
      "year": 1977,
      "edition": null,
      "country": "Europe",
      "copiesForSale": 10,
      "priceDisplay": {
        "typical": 13
      },
      "artwork": "shared/assets/r-art/v12118397.jpg",
      "label": "Warner Bros. Records",
      "catno": "8122796778",
      "rating": 4.63,
      "ratingCount": 126,
      "have": 1488,
      "want": 612,
      "identifiers": 20,
      "salesLow": 1,
      "salesMedian": 8,
      "salesHigh": 17
    },
    {
      "id": "r9426957",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue",
      "year": 1981,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 9,
      "priceDisplay": {
        "typical": 34
      },
      "artwork": "shared/assets/r-art/v9426957.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 4.47,
      "ratingCount": 137,
      "have": 1424,
      "want": 1108,
      "identifiers": 10,
      "salesLow": 2,
      "salesMedian": 20,
      "salesHigh": 43
    },
    {
      "id": "r28236091",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Stereo",
      "year": 1981,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 8,
      "priceDisplay": {
        "typical": 12
      },
      "artwork": "shared/assets/r-art/v28236091.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 4.67,
      "ratingCount": 3,
      "have": 38,
      "want": 354,
      "identifiers": 10,
      "salesLow": 1,
      "salesMedian": 7,
      "salesHigh": 15
    },
    {
      "id": "r9968591",
      "format": "CD",
      "title": "Rumours = 噂",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Japan",
      "copiesForSale": 8,
      "priceDisplay": {
        "typical": 24
      },
      "artwork": "shared/assets/r-art/v9968591.jpg",
      "label": "Warner Bros. Records",
      "catno": "20P2-2036",
      "rating": 4.5,
      "ratingCount": 2,
      "have": 28,
      "want": 672,
      "identifiers": 11,
      "salesLow": 2,
      "salesMedian": 15,
      "salesHigh": 31
    },
    {
      "id": "r1355400",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Club Edition, Reissue",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 8,
      "priceDisplay": {
        "typical": 4
      },
      "artwork": "shared/assets/r-art/v1355400.jpg",
      "label": "Warner Bros. Records",
      "catno": "3010-2",
      "rating": 4.56,
      "ratingCount": 39,
      "have": 508,
      "want": 853,
      "identifiers": 6,
      "salesLow": 0,
      "salesMedian": 3,
      "salesHigh": 6
    },
    {
      "id": "r1273917",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Repress, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Italy",
      "copiesForSale": 6,
      "priceDisplay": {
        "typical": 60
      },
      "artwork": "shared/assets/r-art/v1273917.jpg",
      "label": "Warner Bros. Records",
      "catno": "W 56344",
      "rating": 4.22,
      "ratingCount": 118,
      "have": 845,
      "want": 1210,
      "identifiers": 6,
      "salesLow": 4,
      "salesMedian": 36,
      "salesHigh": 76
    },
    {
      "id": "r2695895",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Greece",
      "copiesForSale": 5,
      "priceDisplay": {
        "typical": 37
      },
      "artwork": "shared/assets/r-art/v2695895.jpg",
      "label": "Warner Bros. Records",
      "catno": "56344",
      "rating": 4.52,
      "ratingCount": 25,
      "have": 195,
      "want": 1144,
      "identifiers": 3,
      "salesLow": 2,
      "salesMedian": 22,
      "salesHigh": 46
    },
    {
      "id": "r11858454",
      "format": "8-Track Cartridge",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Club Edition",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 4,
      "priceDisplay": {
        "typical": 10
      },
      "artwork": "shared/assets/r-art/v11858454.jpg",
      "label": "Warner Bros. Records",
      "catno": "M8 3010",
      "rating": 4.75,
      "ratingCount": 8,
      "have": 86,
      "want": 556,
      "identifiers": 0,
      "salesLow": 1,
      "salesMedian": 6,
      "salesHigh": 12
    },
    {
      "id": "r15566707",
      "format": "8-Track Cartridge",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 4,
      "priceDisplay": {
        "typical": 23
      },
      "artwork": "shared/assets/r-art/v15566707.jpg",
      "label": "Warner Bros. Records",
      "catno": "M8 3010",
      "rating": null,
      "ratingCount": 0,
      "have": 16,
      "want": 402,
      "identifiers": 1,
      "salesLow": 2,
      "salesMedian": 14,
      "salesHigh": 29
    },
    {
      "id": "r8230102",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Club Edition",
      "year": 1977,
      "edition": null,
      "country": "Canada",
      "copiesForSale": 3,
      "priceDisplay": {
        "typical": 10
      },
      "artwork": "shared/assets/r-art/v8230102.jpg",
      "label": "Warner Bros. Records",
      "catno": "M5-3010",
      "rating": 4.6,
      "ratingCount": 5,
      "have": 39,
      "want": 695,
      "identifiers": 2,
      "salesLow": 1,
      "salesMedian": 6,
      "salesHigh": 13
    },
    {
      "id": "r7919380",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Club Edition, Reissue",
      "year": 1977,
      "edition": null,
      "country": "Canada",
      "copiesForSale": 3,
      "priceDisplay": {
        "typical": 34
      },
      "artwork": "shared/assets/r-art/v7919380.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.58,
      "ratingCount": 12,
      "have": 133,
      "want": 1061,
      "identifiers": 0,
      "salesLow": 2,
      "salesMedian": 21,
      "salesHigh": 44
    },
    {
      "id": "r4585868",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album",
      "year": 1977,
      "edition": null,
      "country": "Spain",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 90
      },
      "artwork": "shared/assets/r-art/v4585868.jpg",
      "label": "Warner Bros. Records",
      "catno": "CH 1030",
      "rating": 5.0,
      "ratingCount": 2,
      "have": 15,
      "want": 785,
      "identifiers": 1,
      "salesLow": 6,
      "salesMedian": 54,
      "salesHigh": 114
    },
    {
      "id": "r10858527",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Repress",
      "year": 1977,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 59
      },
      "artwork": "shared/assets/r-art/v10858527.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 4.51,
      "ratingCount": 108,
      "have": 1314,
      "want": 1080,
      "identifiers": 6,
      "salesLow": 4,
      "salesMedian": 35,
      "salesHigh": 75
    },
    {
      "id": "r4897669",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album",
      "year": 1977,
      "edition": null,
      "country": "South Africa",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 9
      },
      "artwork": "shared/assets/r-art/v4897669.jpg",
      "label": "Reprise Records",
      "catno": "ZRR 2224",
      "rating": 5.0,
      "ratingCount": 3,
      "have": 13,
      "want": 766,
      "identifiers": 0,
      "salesLow": 1,
      "salesMedian": 6,
      "salesHigh": 12
    },
    {
      "id": "r2955046",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue",
      "year": 1987,
      "edition": null,
      "country": "US",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 14
      },
      "artwork": "shared/assets/r-art/v2955046.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.74,
      "ratingCount": 34,
      "have": 267,
      "want": 1234,
      "identifiers": 0,
      "salesLow": 1,
      "salesMedian": 8,
      "salesHigh": 18
    },
    {
      "id": "r17126253",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Netherlands",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 36
      },
      "artwork": "shared/assets/r-art/v17126253.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56344",
      "rating": 4.1,
      "ratingCount": 10,
      "have": 130,
      "want": 598,
      "identifiers": 5,
      "salesLow": 2,
      "salesMedian": 22,
      "salesHigh": 46
    },
    {
      "id": "r16050103",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue",
      "year": 1977,
      "edition": null,
      "country": "Greece",
      "copiesForSale": 2,
      "priceDisplay": {
        "typical": 22
      },
      "artwork": "shared/assets/r-art/v16050103.jpg",
      "label": "Warner Bros. Records",
      "catno": "K56344",
      "rating": 4.71,
      "ratingCount": 7,
      "have": 31,
      "want": 644,
      "identifiers": 4,
      "salesLow": 1,
      "salesMedian": 13,
      "salesHigh": 27
    },
    {
      "id": "r36224683",
      "format": "8-Track Cartridge",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 41
      },
      "artwork": "shared/assets/r-art/v36224683.jpg",
      "label": "WEA Records Limited",
      "catno": "M8W3010",
      "rating": 3.0,
      "ratingCount": 1,
      "have": 1,
      "want": 34,
      "identifiers": 0,
      "salesLow": 3,
      "salesMedian": 25,
      "salesHigh": 52
    },
    {
      "id": "r31085861",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 25
      },
      "artwork": "shared/assets/r-art/v31085861.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 5.0,
      "ratingCount": 4,
      "have": 87,
      "want": 360,
      "identifiers": 8,
      "salesLow": 2,
      "salesMedian": 15,
      "salesHigh": 32
    },
    {
      "id": "r11950209",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 22
      },
      "artwork": "shared/assets/r-art/v11950209.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.23,
      "ratingCount": 31,
      "have": 384,
      "want": 1061,
      "identifiers": 4,
      "salesLow": 1,
      "salesMedian": 13,
      "salesHigh": 28
    },
    {
      "id": "r32569971",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 26
      },
      "artwork": "shared/assets/r-art/v32569971.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 3.33,
      "ratingCount": 3,
      "have": 19,
      "want": 293,
      "identifiers": 3,
      "salesLow": 2,
      "salesMedian": 15,
      "salesHigh": 32
    },
    {
      "id": "r6725217",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Numbered",
      "year": 1977,
      "edition": null,
      "country": "South Korea",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 22
      },
      "artwork": "shared/assets/r-art/v6725217.jpg",
      "label": "Warner Bros. Records",
      "catno": "OLW-004",
      "rating": 5.0,
      "ratingCount": 4,
      "have": 64,
      "want": 1122,
      "identifiers": 2,
      "salesLow": 1,
      "salesMedian": 13,
      "salesHigh": 28
    },
    {
      "id": "r492873",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Club Edition",
      "year": 1978,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 19
      },
      "artwork": "shared/assets/r-art/v492873.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 68 414 2",
      "rating": 5.0,
      "ratingCount": 3,
      "have": 22,
      "want": 795,
      "identifiers": 1,
      "salesLow": 1,
      "salesMedian": 11,
      "salesHigh": 24
    },
    {
      "id": "r12849704",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue",
      "year": 1979,
      "edition": null,
      "country": "Italy",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 22
      },
      "artwork": "shared/assets/r-art/v12849704.jpg",
      "label": "Warner Bros. Records",
      "catno": "W 456344",
      "rating": null,
      "ratingCount": 0,
      "have": 1,
      "want": 514,
      "identifiers": 1,
      "salesLow": 1,
      "salesMedian": 13,
      "salesHigh": 28
    },
    {
      "id": "r21260926",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue",
      "year": 1983,
      "edition": null,
      "country": "Germany",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 35
      },
      "artwork": "shared/assets/r-art/v21260926.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 5.0,
      "ratingCount": 2,
      "have": 67,
      "want": 511,
      "identifiers": 9,
      "salesLow": 2,
      "salesMedian": 21,
      "salesHigh": 45
    },
    {
      "id": "r8555771",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue",
      "year": 1998,
      "edition": null,
      "country": "Brazil",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 9
      },
      "artwork": "shared/assets/r-art/v8555771.jpg",
      "label": "Warner Bros. Records",
      "catno": "759927313-2",
      "rating": 4.7,
      "ratingCount": 37,
      "have": 315,
      "want": 740,
      "identifiers": 1,
      "salesLow": 1,
      "salesMedian": 6,
      "salesHigh": 12
    },
    {
      "id": "r23524091",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Test Pressing",
      "year": 2006,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 1946
      },
      "artwork": "shared/assets/r-art/v23524091.jpg",
      "label": "Reprise Records",
      "catno": "BSK-3010",
      "rating": 5.0,
      "ratingCount": 2,
      "have": 2,
      "want": 465,
      "identifiers": 2,
      "salesLow": 130,
      "salesMedian": 1168,
      "salesHigh": 2465
    },
    {
      "id": "r26232155",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Unofficial Release",
      "year": 1977,
      "edition": null,
      "country": "Singapore",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 171
      },
      "artwork": "shared/assets/r-art/v26232155.jpg",
      "label": "GMI (2)",
      "catno": "GMI 2407",
      "rating": null,
      "ratingCount": 0,
      "have": 1,
      "want": 140,
      "identifiers": 0,
      "salesLow": 11,
      "salesMedian": 103,
      "salesHigh": 217
    },
    {
      "id": "r26232155",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Unofficial Release",
      "year": 1977,
      "edition": null,
      "country": "Singapore",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 171
      },
      "artwork": "shared/assets/r-art/v26232155.jpg",
      "label": "GMI (2)",
      "catno": "GMI 2407",
      "rating": null,
      "ratingCount": 0,
      "have": 1,
      "want": 140,
      "identifiers": 0,
      "salesLow": 11,
      "salesMedian": 103,
      "salesHigh": 217
    },
    {
      "id": "r22691735",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Club Edition, Reissue, Stereo",
      "year": 1977,
      "edition": null,
      "country": "France",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 75
      },
      "artwork": "shared/assets/r-art/v22691735.jpg",
      "label": "Warner Bros. Records",
      "catno": "WB 56 344",
      "rating": 4.67,
      "ratingCount": 6,
      "have": 21,
      "want": 437,
      "identifiers": 8,
      "salesLow": 5,
      "salesMedian": 45,
      "salesHigh": 95
    },
    {
      "id": "r24645458",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue, Repress",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 1,
      "priceDisplay": {
        "typical": 3
      },
      "artwork": "shared/assets/r-art/v24645458.jpg",
      "label": "Warner Bros. Records",
      "catno": "3010-2",
      "rating": 4.67,
      "ratingCount": 3,
      "have": 21,
      "want": 201,
      "identifiers": 7,
      "salesLow": 0,
      "salesMedian": 2,
      "salesHigh": 4
    },
    {
      "id": "r27257733",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Stereo",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v27257733.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.43,
      "ratingCount": 7,
      "have": 74,
      "want": 446,
      "identifiers": 4,
      "salesLow": 2,
      "salesMedian": 21,
      "salesHigh": 45
    },
    {
      "id": "r4930701",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue",
      "year": 1989,
      "edition": null,
      "country": "Venezuela",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v4930701.jpg",
      "label": "Warner Bros. Records",
      "catno": "35.005",
      "rating": 5.0,
      "ratingCount": 2,
      "have": 9,
      "want": 1106,
      "identifiers": 1
    },
    {
      "id": "r21762547",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "12\", 45 RPM, Album, Remastered, Test Pressing, White Label",
      "year": 2011,
      "edition": null,
      "country": "Europe",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/master.jpg",
      "label": "Reprise Records",
      "catno": "9362-49793-4",
      "rating": null,
      "ratingCount": 0,
      "have": 13,
      "want": 418,
      "identifiers": 5
    },
    {
      "id": "r10126845",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Repress",
      "year": 1977,
      "edition": null,
      "country": "UK",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v10126845.jpg",
      "label": "Warner Bros. Records",
      "catno": "K 56344",
      "rating": 4.33,
      "ratingCount": 3,
      "have": 54,
      "want": 970,
      "identifiers": 2,
      "salesLow": 2,
      "salesMedian": 17,
      "salesHigh": 35
    },
    {
      "id": "r23333117",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue",
      "year": 1977,
      "edition": null,
      "country": "Canada",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v23333117.jpg",
      "label": "Warner Bros. Records",
      "catno": "M5-3010",
      "rating": null,
      "ratingCount": 0,
      "have": 10,
      "want": 162,
      "identifiers": 1,
      "salesLow": 1,
      "salesMedian": 8,
      "salesHigh": 17
    },
    {
      "id": "r14350066",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Australia",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v14350066.jpg",
      "label": "Warner Bros. Records",
      "catno": "BSK 3010",
      "rating": 4.6,
      "ratingCount": 5,
      "have": 41,
      "want": 796,
      "identifiers": 2
    },
    {
      "id": "r6356842",
      "format": "CD",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Unofficial Release",
      "year": 1977,
      "edition": null,
      "country": "Russia",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v6356842.jpg",
      "label": "Warner Bros. Records (2)",
      "catno": "3010-2",
      "rating": 5.0,
      "ratingCount": 1,
      "have": 7,
      "want": 783,
      "identifiers": 2
    },
    {
      "id": "r30867432",
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Reissue, Unofficial Release",
      "year": 1977,
      "edition": null,
      "country": "US",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v30867432.jpg",
      "label": "Warner Bros. Records (2)",
      "catno": "WB 56 344",
      "rating": 4.75,
      "ratingCount": 4,
      "have": 18,
      "want": 277,
      "identifiers": 5
    },
    {
      "id": "r13365574",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue",
      "year": 1977,
      "edition": null,
      "country": "Europe",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v13365574.jpg",
      "label": "Warner Bros. Records",
      "catno": "K 456 344",
      "rating": 3.5,
      "ratingCount": 2,
      "have": 19,
      "want": 499,
      "identifiers": 4,
      "salesLow": 1,
      "salesMedian": 5,
      "salesHigh": 10
    },
    {
      "id": "r28919683",
      "format": "Cassette",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Unofficial Release, Stereo",
      "year": 1977,
      "edition": null,
      "country": "Singapore",
      "copiesForSale": 0,
      "priceDisplay": null,
      "artwork": "shared/assets/r-art/v28919683.jpg",
      "label": "RC",
      "catno": "RC 2207",
      "rating": null,
      "ratingCount": 0,
      "have": 2,
      "want": 121,
      "identifiers": 0
    },
    // FABRICATED — the two entries below are not from the API. Rumours does
    // have real Box Set and Blu-ray editions, but no listings came back for
    // them, which left those format tiles as 0-result dead ends. Demo data
    // only: ids, catnos, stats and prices are invented.
    {
      "id": "r4623901",
      "format": "Box Set",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "4\u00d7CD, Album, Reissue, Remastered + DVD-Video + LP",
      "year": 2013,
      "edition": "35th Anniversary Super Deluxe",
      "country": "US",
      "copiesForSale": 15,
      "priceDisplay": {
        "typical": 118
      },
      "artwork": "shared/assets/r-art/v36224683.jpg",
      "label": "Warner Bros. Records",
      "catno": "8122796881",
      "rating": 4.71,
      "ratingCount": 34,
      "have": 612,
      "want": 1804,
      "identifiers": 9,
      "salesLow": 74,
      "salesMedian": 121,
      "salesHigh": 240
    },
    {
      "id": "r5012884",
      "format": "Blu-ray",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "Album, Reissue, Remastered, Stereo, Multichannel",
      "year": 2013,
      "edition": null,
      "country": "Europe",
      "copiesForSale": 12,
      "priceDisplay": {
        "typical": 32
      },
      "artwork": "shared/assets/r-art/v32569971.jpg",
      "label": "Warner Bros. Records",
      "catno": "8122796884",
      "rating": 4.4,
      "ratingCount": 11,
      "have": 188,
      "want": 402,
      "identifiers": 5,
      "salesLow": 18,
      "salesMedian": 30,
      "salesHigh": 58
    }
  ],
  "extraVersions": [],
  "referenceListings": [
    {
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album",
      "yearLine": "1977",
      "country": "US",
      "media": "VG+",
      "sleeve": "VG+",
      "price": "40.00",
      "note": "All inventory is new, sealed, truly mint, and ships in a protected mailer (See Seller Terms for more info). Quick turnaround, careful packing.",
      "artwork": "shared/assets/r-art/v8960635.jpg",
      "seller": {
        "name": "CrazyGreatRecords",
        "rating": "5.0",
        "reviews": "(64.8k)",
        "shipsFrom": "United States",
        "indieSeal": true
      },
      "freeShipping": "Free shipping over $200",
      "sellerHasItems": "Seller has 32 items you Want"
    },
    {
      "format": "Vinyl",
      "title": "Rumours",
      "artist": "Fleetwood Mac",
      "description": "LP, Album, Limited Edition, Reissue",
      "yearLine": "1977",
      "country": "Netherlands",
      "media": "VG+",
      "sleeve": "VG+",
      "price": "51.00",
      "note": "All inventory is new, sealed, truly mint, and ships in a protected mailer (See Seller Terms for more info). Quick turnaround, careful packing.",
      "artwork": "shared/assets/r-art/v1242335.jpg",
      "seller": {
        "name": "CrazyGreatRecords",
        "rating": "5.0",
        "reviews": "(64.8k)",
        "shipsFrom": "United States",
        "indieSeal": true
      },
      "freeShipping": null,
      "sellerHasItems": null
    }
  ],
  "bForSale": [],
  "pressingNotes": [],
  "gradeScale": [
    "Poor",
    "Fair",
    "Good",
    "Good +",
    "Very Good",
    "Very Good +",
    "Near Mint",
    "Mint"
  ],
  "shipsFromCountries": [
    "US",
    "Netherlands",
    "Japan",
    "France",
    "Germany",
    "Europe",
    "Italy",
    "Greece",
    "Canada",
    "Spain",
    "South Africa",
    "South Korea",
    "Brazil",
    "Singapore"
  ],
  "listings": [
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 101
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 121
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 40
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 61
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 32
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 16
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "US",
      "n": 8
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "US",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Netherlands",
      "n": 110
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Netherlands",
      "n": 110
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Netherlands",
      "n": 37
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Netherlands",
      "n": 55
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Netherlands",
      "n": 29
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Netherlands",
      "n": 15
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Netherlands",
      "n": 7
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Netherlands",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Japan",
      "n": 87
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Japan",
      "n": 87
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Japan",
      "n": 29
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Japan",
      "n": 43
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Japan",
      "n": 23
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Japan",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Japan",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Japan",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 81
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 81
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 27
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 40
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 22
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 11
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "US",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "France",
      "n": 81
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "France",
      "n": 81
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "France",
      "n": 27
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "France",
      "n": 40
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "France",
      "n": 22
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "France",
      "n": 11
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "France",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "France",
      "n": 3
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "US",
      "n": 81
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "US",
      "n": 81
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "US",
      "n": 27
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "US",
      "n": 40
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "US",
      "n": 22
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "US",
      "n": 11
    },
    {
      "format": "CD",
      "condition": "Fair",
      "country": "US",
      "n": 5
    },
    {
      "format": "CD",
      "condition": "Poor",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 69
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 69
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Germany",
      "n": 23
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Germany",
      "n": 35
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Germany",
      "n": 18
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Germany",
      "n": 9
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Germany",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 69
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 69
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 23
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 35
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 18
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 9
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "US",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "US",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "Europe",
      "n": 58
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "Europe",
      "n": 58
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "Europe",
      "n": 19
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "Europe",
      "n": 29
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "Europe",
      "n": 15
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "Europe",
      "n": 8
    },
    {
      "format": "CD",
      "condition": "Fair",
      "country": "Europe",
      "n": 4
    },
    {
      "format": "CD",
      "condition": "Poor",
      "country": "Europe",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 52
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 52
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Germany",
      "n": 17
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Germany",
      "n": 26
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Germany",
      "n": 14
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Germany",
      "n": 7
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Germany",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 46
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 46
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Germany",
      "n": 15
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Germany",
      "n": 23
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Germany",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Germany",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "Japan",
      "n": 46
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "Japan",
      "n": 46
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "Japan",
      "n": 15
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "Japan",
      "n": 23
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "Japan",
      "n": 12
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "Japan",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Fair",
      "country": "Japan",
      "n": 3
    },
    {
      "format": "CD",
      "condition": "Poor",
      "country": "Japan",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "US",
      "n": 46
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "US",
      "n": 46
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "US",
      "n": 15
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "US",
      "n": 23
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "US",
      "n": 12
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "US",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Fair",
      "country": "US",
      "n": 3
    },
    {
      "format": "CD",
      "condition": "Poor",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Italy",
      "n": 35
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Italy",
      "n": 35
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Italy",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Italy",
      "n": 17
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Italy",
      "n": 9
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Italy",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Italy",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Italy",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Greece",
      "n": 29
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Greece",
      "n": 29
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Greece",
      "n": 10
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Greece",
      "n": 14
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Greece",
      "n": 8
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Greece",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Greece",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Greece",
      "n": 1
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Near Mint",
      "country": "US",
      "n": 23
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good +",
      "country": "US",
      "n": 23
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Mint",
      "country": "US",
      "n": 8
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good",
      "country": "US",
      "n": 12
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Fair",
      "country": "US",
      "n": 2
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Poor",
      "country": "US",
      "n": 1
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Near Mint",
      "country": "US",
      "n": 23
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good +",
      "country": "US",
      "n": 23
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Mint",
      "country": "US",
      "n": 8
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good",
      "country": "US",
      "n": 12
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Fair",
      "country": "US",
      "n": 2
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Poor",
      "country": "US",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Canada",
      "n": 17
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Canada",
      "n": 17
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Canada",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Canada",
      "n": 9
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Canada",
      "n": 5
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Canada",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Fair",
      "country": "Canada",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Poor",
      "country": "Canada",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Canada",
      "n": 17
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Canada",
      "n": 17
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Canada",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Canada",
      "n": 9
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Canada",
      "n": 5
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Canada",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Canada",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Poor",
      "country": "Canada",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Spain",
      "n": 12
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Spain",
      "n": 12
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Spain",
      "n": 4
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Spain",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Spain",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Spain",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Fair",
      "country": "Spain",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Germany",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Germany",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Germany",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "South Africa",
      "n": 12
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "South Africa",
      "n": 12
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "South Africa",
      "n": 4
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "South Africa",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "South Africa",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "South Africa",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Fair",
      "country": "South Africa",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "US",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Netherlands",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Netherlands",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Netherlands",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Netherlands",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Netherlands",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Netherlands",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Netherlands",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Greece",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Greece",
      "n": 12
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Greece",
      "n": 4
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Greece",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Greece",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Greece",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Fair",
      "country": "Greece",
      "n": 1
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "8-Track Cartridge",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "South Korea",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "South Korea",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "South Korea",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "South Korea",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "South Korea",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "South Korea",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Germany",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Germany",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Italy",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Italy",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Italy",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Italy",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Italy",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Italy",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "Germany",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "Germany",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "Germany",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "Germany",
      "n": 1
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "Brazil",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "Brazil",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "Brazil",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "Brazil",
      "n": 3
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "Brazil",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "Brazil",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Singapore",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Singapore",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Singapore",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Singapore",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Singapore",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Singapore",
      "n": 1
    },
    {
      "format": "Cassette",
      "condition": "Near Mint",
      "country": "Singapore",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Very Good +",
      "country": "Singapore",
      "n": 6
    },
    {
      "format": "Cassette",
      "condition": "Mint",
      "country": "Singapore",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Very Good",
      "country": "Singapore",
      "n": 3
    },
    {
      "format": "Cassette",
      "condition": "Good +",
      "country": "Singapore",
      "n": 2
    },
    {
      "format": "Cassette",
      "condition": "Good",
      "country": "Singapore",
      "n": 1
    },
    {
      "format": "Vinyl",
      "condition": "Near Mint",
      "country": "France",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Very Good +",
      "country": "France",
      "n": 6
    },
    {
      "format": "Vinyl",
      "condition": "Mint",
      "country": "France",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Very Good",
      "country": "France",
      "n": 3
    },
    {
      "format": "Vinyl",
      "condition": "Good +",
      "country": "France",
      "n": 2
    },
    {
      "format": "Vinyl",
      "condition": "Good",
      "country": "France",
      "n": 1
    },
    {
      "format": "CD",
      "condition": "Near Mint",
      "country": "US",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Very Good +",
      "country": "US",
      "n": 6
    },
    {
      "format": "CD",
      "condition": "Mint",
      "country": "US",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Very Good",
      "country": "US",
      "n": 3
    },
    {
      "format": "CD",
      "condition": "Good +",
      "country": "US",
      "n": 2
    },
    {
      "format": "CD",
      "condition": "Good",
      "country": "US",
      "n": 1
    },
    // FABRICATED — groups for the two invented versions above, so a single
    // Box Set or Blu-ray select returns results. n sums to 15 and 12 to
    // match their copiesForSale; master.totalListings is raised by 27.
    { "format": "Box Set", "condition": "Near Mint", "country": "US", "n": 6 },
    { "format": "Box Set", "condition": "Mint", "country": "US", "n": 3 },
    { "format": "Box Set", "condition": "Very Good +", "country": "Europe", "n": 4 },
    { "format": "Box Set", "condition": "Near Mint", "country": "Japan", "n": 2 },
    { "format": "Blu-ray", "condition": "Mint", "country": "Europe", "n": 4 },
    { "format": "Blu-ray", "condition": "Near Mint", "country": "US", "n": 5 },
    { "format": "Blu-ray", "condition": "Near Mint", "country": "Europe", "n": 3 }
  ],
  "artistCard": {
    "name": "Fleetwood Mac",
    "bio": "Founded in London in July 1967 (by ex-Bluesbreakers members, Peter Green and Mick Fleetwood), \"Peter Green's Fleetwood Mac\" instantly became a major force in the UK blues scene, along with their eponymous first album. Following \"Mr. Wonderful\" & \"Then Play On\" the driving force of Peter Green had deteriorated as he lapsed into a personal crisis by 1970. The group reorganized, under the leadership of Fleetwood, and slowly took on a new direction - away from the blues and into the mainstream of international popularity, known simply as Fleetwood Mac.",
    "photo": "shared/assets/r-art/artist.jpg"
  }
};
