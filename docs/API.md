# 📖 API & COMPONENT REFERENCE — LIFE//ARCHIVE

> **Technical Reference for Components, Contexts, Hooks, and Utility Modules**

---

## 1. Contexts & Hooks

### `useData()`
Custom hook to consume `DataContext`. Provides global listening metrics, parsed records, era chapters, and discoveries.

**Returns (`Object`)**:
- `records` (`Array<Record>`): Array of 149,860 normalized Spotify stream log objects.
- `stats` (`Object`): Calculated statistics object (total plays, total hours, top artist, date range, etc.).
- `eras` (`Array<Era>`): Array of 5 chronological era chapter objects.
- `insights` (`Array<Insight>`): Array of 6 deterministic discovery objects.
- `loading` (`Boolean`): Loading state flag.
- `selectedRecord` (`Record|null`): Currently selected record for slide-over drawer.
- `setSelectedRecord` (`Function`): Handler to set active selected record.

### `useAudioPlayer()`
Custom hook to consume `AudioPlayerContext`. Manages active Spotify track playback, queue navigation, and theme.

**Returns (`Object`)**:
- `currentTrack` (`Record|null`): Active song playing in Spotify iFrame.
- `theme` (`String`): Current theme (`'dark'` or `'light'`).
- `toggleTheme` (`Function`): Toggles theme between dark and light modes.
- `playTrack` (`Function(track, list)`): Starts playing selected track in direct Spotify Web Player.
- `playNextTrack` (`Function`): Advances queue to next track.
- `playPrevTrack` (`Function`): Moves queue to previous track.

---

## 2. Core UI Components

### `<SpotifyPlayerEmbed />`
Renders the official Spotify Web Player iFrame widget for a given track URI.

**Props**:
- `spotifyTrackUri` (`String`): Spotify track URI or ID (e.g. `spotify:track:4uLU6hMCjMI75M1A2tKUQC`).
- `height` (`Number`): iFrame height in pixels (default: `152`).

### `<ReceiptView />`
Thermal acoustic receipt generator matching the "Your Life, In Receipts" problem statement.

**Props**:
- None (consumes `useData()` and `useAudioPlayer()` internally).

### `<TrackAlbumArt />`
Dynamic album cover art thumbnail with vinyl groove ring and Spotify green ribbon.

**Props**:
- `trackName` (`String`): Song title.
- `artistName` (`String`): Artist name.
- `size` (`String`): Thumbnail size (`'sm'`, `'md'`, `'lg'`, `'xl'`).

---

## 3. Data Utility Modules

### `calculateStats(records)`
Calculates macro quantitative statistical metrics from raw records.

**Parameters**:
- `records` (`Array<Record>`): Array of normalized stream logs.

**Returns (`Object`)**:
- `totalPlays`, `totalHours`, `uniqueTracks`, `uniqueArtists`, `topArtist`, `topArtists`, `topTracks`, `dateRange`, `lateNightPercentage`, `platformBreakdown`.

### `buildMusicJourney(records)`
Segments 11 years of streaming logs into 5 chronological era chapters.

**Returns (`Array<Era>`)**: Array of 5 era objects containing period, title, description, narrative, and era stats.

---

## 4. Spotify API & Pagination Integration (`spotapi` Specification)

### Python `spotapi` Quick-Start Pattern
```python
from spotapi import Song

song = Song()

# 1. Paginates 100 songs at a time till exhausted
gen = song.paginate_songs("weezer")
for batch in gen:
    for idx, item in enumerate(batch):
        print(idx, item['item']['data']['name'])

# 2. Query a specific amount (limit=20)
songs = song.query_songs("weezer", limit=20)
data = songs["data"]["searchV2"]["tracksV2"]["items"]
for idx, item in enumerate(data):
    print(idx, item['item']['data']['name'])
```

### Client-Side JavaScript Pagination Equivalence
In `LIFE//ARCHIVE`, song pagination and search query matching are executed client-side in `TrackExplorer.jsx` across 149,860 CSV rows:
```javascript
const ITEMS_PER_PAGE = 50;
const paginatedRecords = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
}, [filteredRecords, currentPage]);
```

