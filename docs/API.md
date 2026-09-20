# 🔌 API & SERVICE LAYER SPECIFICATION — LIFE//ARCHIVE

> **Comprehensive Documentation for Services, Custom Hooks, Utility Functions, and Context Methods**

---

## 1. Spotify API Service ([`src/services/spotifyApiService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/spotifyApiService.js))

The Spotify API service implements search and pagination methods matching Spotify's GraphQL `searchV2.tracksV2.items` schema structure.

### `querySongs(records, query, limit)`
Queries dataset records and formats the response into Spotify's Search V2 JSON structure.

#### Parameters:
- `records` (*Array*): Normalized stream records.
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
Generator function yielding batches of 100 tracks at a time.

#### Signature:
```javascript
import { paginateSongs } from '../services/spotifyApiService';

const gen = paginateSongs(records, "weezer", 100);
for (const batch of gen) {
  batch.forEach((itemObj, idx) => {
    console.log(idx, itemObj.item.data.name);
  });
}
```

---

## 2. Data Service Layer ([`src/services/dataService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/dataService.js))

### `fetchAndProcessSpotifyData()`
Loads raw CSV data, parses and normalizes stream entries, and computes statistical metrics, era segmentations, and discoveries.

#### Return Value (*Promise<Object>*):
```javascript
{
  records: Array<Record>,
  stats: StatisticalSummary,
  eras: Array<EraChapter>,
  insights: Array<SubstantiatedDiscovery>
}
```

---

## 3. Custom Hooks (`src/hooks/`)

### `useSpotifyHistory()` ([`src/hooks/useSpotifyHistory.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useSpotifyHistory.js))
Provides direct access to loaded Spotify stream records and statistics context.

#### Return Value:
```javascript
const { records, stats, loading, selectedRecord, setSelectedRecord } = useSpotifyHistory();
```

### `useAudioQueue()` ([`src/hooks/useAudioQueue.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useAudioQueue.js))
Provides playback queue controls.

#### Return Value:
```javascript
const { currentTrack, trackList, playNextTrack, playPrevTrack, playTrack } = useAudioQueue();
```

### `useTheme()` ([`src/hooks/useTheme.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/hooks/useTheme.js))
Provides active UI theme state and toggle callback.

#### Return Value:
```javascript
const { theme, toggleTheme } = useTheme();
```

---

## 4. Export Service Layer ([`src/services/exportService.js`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/services/exportService.js))

### `exportSummaryJSON(stats, insights)`
Generates and downloads a structured JSON report containing dataset metrics and discoveries.

### `exportMarkdownReport(stats, eras, insights)`
Generates and downloads a GitHub Flavored Markdown provenance report.
