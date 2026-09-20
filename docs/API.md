# 🔌 API & SERVICE LAYER TECHNICAL SPECIFICATION — LIFE//ARCHIVE

> **Exhaustive Reference Manual for Services, Custom React Hooks, Utility Functions, and Context Methods**

---

## 1. Spotify API Service ([`src/services/spotifyApiService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/spotifyApiService.js))

The Spotify API service provides querying and pagination interfaces that structure local dataset results into Spotify's GraphQL `searchV2.tracksV2.items` schema.

### `querySongs(records, query, limit)`
Queries dataset records and formats the response into Spotify's Search V2 JSON structure.

#### Parameters:
- `records` (*Array<SpotifyRecord>*): Array of normalized stream records.
- `query` (*string*): Search term (e.g., `"weezer"`).
- `limit` (*number*, default `20`): Maximum number of items to return.

#### Return Value (*Object*):
```json
{
  "data": {
    "searchV2": {
      "tracksV2": {
        "items": [
          {
            "item": {
              "data": {
                "id": "4cOdK2wGLETKBW3PvgPWqT",
                "name": "Island In The Sun",
                "uri": "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
                "albumOfTrack": { "name": "Weezer (Green Album)" },
                "artists": {
                  "items": [
                    { "profile": { "name": "Weezer" } }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

### `paginateSongs(records, query, batchSize)`
Generator function yielding batches of tracks (100 per batch by default).

#### Example Usage:
```javascript
import { paginateSongs } from '../services/spotifyApiService';

const generator = paginateSongs(records, "weezer", 100);
for (const batch of generator) {
  batch.forEach((itemObj, idx) => {
    console.log(idx, itemObj.item.data.name);
  });
}
```

### Class `Song` (Spotipy-Compatible Interface)
Provides an object-oriented wrapper mirroring Spotipy's syntax.

```javascript
import { Song } from '../services/spotifyApiService';

const songService = new Song(records);

// Paginates 100 songs at a time till exhausted
const gen = songService.paginate_songs("weezer", 100);
for (const batch of gen) {
  for (const [idx, item] of batch.entries()) {
    console.log(idx, item['item']['data']['name']);
  }
}

// Query specific amount
const songs = songService.query_songs("weezer", 20);
const items = songs["data"]["searchV2"]["tracksV2"]["items"];
items.forEach((item, idx) => {
  console.log(idx, item['item']['data']['name']);
});
```

---

## 2. Data Service Layer ([`src/services/dataService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/dataService.js))

### `fetchAndProcessSpotifyData()`
Asynchronously loads raw CSV or ZIP data, parses and normalizes stream entries, and runs statistical, era, and discovery calculation pipelines.

#### Return Value (*Promise<Object>*):
```typescript
interface ProcessedDataResult {
  records: SpotifyRecord[];
  stats: StatisticalSummary;
  eras: EraChapter[];
  insights: SubstantiatedDiscovery[];
}
```

---

## 3. Custom React Hooks (`src/hooks/`)

### `useSpotifyHistory()` ([`src/hooks/useSpotifyHistory.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useSpotifyHistory.js))
Exposes loaded Spotify stream records, statistical metrics, loading state, and selected record drawer state.

#### Signature:
```javascript
const { records, stats, eras, insights, loading, selectedRecord, setSelectedRecord } = useSpotifyHistory();
```

### `useAudioQueue()` ([`src/hooks/useAudioQueue.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useAudioQueue.js))
Provides audio player state and queue control functions.

#### Signature:
```javascript
const {
  currentTrack,
  trackList,
  isPlaying,
  isShuffle,
  isRepeat,
  playTrack,
  playNextTrack,
  playPrevTrack,
  togglePlay,
  toggleShuffle,
  toggleRepeat
} = useAudioQueue();
```

### `useTheme()` ([`src/hooks/useTheme.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useTheme.js))
Exposes current UI theme mode and toggle trigger.

#### Signature:
```javascript
const { theme, toggleTheme } = useTheme(); // theme is 'dark' | 'light'
```

---

## 4. Export Service Layer ([`src/services/exportService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/exportService.js))

### `exportSummaryJSON(stats, insights)`
Generates and downloads a formatted JSON provenance report.

### `exportMarkdownReport(stats, eras, insights)`
Generates and downloads a GitHub Flavored Markdown provenance report.

---

## 5. Analytical Engine Utilities (`src/utils/`)

### `calculateStats(records)` ([`src/utils/calculateStats.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/utils/calculateStats.js))
Computes total plays, total stream hours, unique artists, unique tracks, nocturnal stream ratio, shuffle rate, skip rate, top artists, and top tracks.

### `buildMusicJourney(records)` ([`src/utils/buildMusicJourney.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/utils/buildMusicJourney.js))
Segments stream logs into 5 chronological listening era chapters (2013–2024).

### `discoverInsights(records, stats)` ([`src/utils/discoverInsights.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/utils/discoverInsights.js))
Generates evidence-backed discovery cards with underlying supporting record sets.
