# 📜 CHANGELOG — LIFE//ARCHIVE

All notable changes to the **LIFE//ARCHIVE (Your Life, In Receipts)** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-09-20

### Added
- **Universal Command Palette (`⌘K` / `Ctrl+K`)**: `CommandPalette.jsx` implementing global keyboard shortcut listener, real-time song search, page navigation, receipt printing, theme toggle, and media player queue controls.
- **Forced Spotify iFrame Remounting**: Added `key={cleanId}` on iframe DOM element in `SpotifyPlayerEmbed.jsx` ensuring instant song reload on any track change.
- **Queue Navigation & Looping**: Functional Next (`SkipForward`) and Previous (`SkipBack`) buttons with queue looping and "Up Next" drawer.
- **Spotify Search V2 Query & Pagination API**: Implemented `querySongs` and `paginateSongs` generator in `spotifyApiService.js` matching Spotify GraphQL `searchV2.tracksV2.items` schema.
- **Dedicated Receipt Generator Route (`/receipts`)**: Added thermal acoustic receipt screen with 4 timeframes (1M, 6M, 1Y, ALL) and 3 item counts (10, 15, 20).
- **Technical Documentation Suite**: Created `ARCHITECTURE.md`, `docs/API.md`, `docs/DATA_PIPELINE.md`, `docs/MUSIC_PLAYER.md`, `docs/COMMAND_PALETTE.md`, and `docs/BENCHMARK.md`.

### Changed
- **Performance Optimizations**: Wrapped core UI elements (`TrackCard`, `StatCard`, `InsightCard`, `TrackAlbumArt`, `ReceiptView`) in `React.memo` to eliminate unnecessary DOM re-renders.
- **Production Build**: Configured vendor chunking in `vite.config.js` for optimized caching.

---

## [1.2.0] - 2026-09-20

### Added
- **Custom React Hooks (`src/hooks/`)**: Extracted `useSpotifyHistory`, `useTheme`, and `useAudioQueue` for modular state architecture.
- **ESLint & Prettier Configs**: Added `.eslintrc.json` and `.prettierrc` configuration files for code quality verification.

---

## [1.1.0] - 2026-09-20

### Added
- **Direct Official Spotify Web Player**: Embedded `SpotifyPlayerEmbed.jsx` iFrame widget for playing exact Spotify tracks.
- **`ReceiptView.jsx`**: Thermal listening receipt widget styled for the "Your Life, In Receipts" challenge.
- **Text & Particle Animations**: `AnimatedHeadline` word reveal with gradient text shimmer and `FloatingNotes` musical note background canvas.

---

## [1.0.0] - 2026-09-20

### Added
- Initial release of LIFE//ARCHIVE listening journal.
- CSV normalization engine for 149,860 stream logs from `spotify_history.csv`.
- 4 core screens: Home Dashboard, Music Journey (5 Eras), Discoveries (6 Insights), Track Explorer.
