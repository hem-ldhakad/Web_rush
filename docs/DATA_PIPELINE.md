# 🔄 DATA PROCESSING PIPELINE & TYPES — LIFE//ARCHIVE

> **Comprehensive Technical Specification of Data Normalization, Type Definitions, and Calculation Rules**

---

## 1. Type Definitions (JSDoc / TypeScript Spec)

```typescript
/**
 * @typedef {Object} SpotifyRecord
 * @property {string} id - Unique deterministic ID
 * @property {string} spotify_track_uri - Base-62 Spotify URI (e.g. spotify:track:...)
 * @property {string} ts - ISO 8601 Timestamp in UTC
 * @property {Date} date - Parsed JavaScript Date object
 * @property {number} year - Stream year (2013-2024)
 * @property {number} month - Stream month (0-11)
 * @property {number} hour - Stream hour of day (0-23)
 * @property {number} ms_played - Milliseconds played
 * @property {number} secondsPlayed - Math.round(ms_played / 1000)
 * @property {string} track_name - Cleaned track title
 * @property {string} artist_name - Cleaned artist name
 * @property {string} album_name - Cleaned album title
 * @property {string} platform - Device / platform string
 * @property {boolean} shuffle - True if shuffle mode enabled
 * @property {boolean} skipped - True if stream was skipped
 * @property {string} reason_start - Track start reason
 * @property {string} reason_end - Track end reason
 * @property {boolean} isLateNight - True if stream hour is 00:00 - 05:00
 */
```

---

## 2. Pipeline Execution Steps

```
[Raw CSV String]
       │
       ▼
1. Strip UTF-8 BOM (\uFEFF)
       │
       ▼
2. Parse CSV via PapaParse (Header mode, dynamic typing)
       │
       ▼
3. Normalize Timestamps & Calculate Seconds
       │
       ▼
4. Tag Nocturnal Flag (isLateNight: hour >= 0 && hour < 5)
       │
       ▼
5. Calculate Quantitative Stats & Hourly Histogram (calculateStats)
       │
       ▼
6. Segment Chronological Eras (buildMusicJourney)
       │
       ▼
7. Discover Evidence-Backed Insights (discoverInsights)
```

---

## 3. Client-Side Guarantee

All pipeline steps run 100% in the browser UI thread without sending any listening data to external servers.
