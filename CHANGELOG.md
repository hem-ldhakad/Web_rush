# 📜 CHANGELOG — LIFE//ARCHIVE

All notable changes to the **LIFE//ARCHIVE (Your Life, In Receipts)** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-09-20

### Added
- **Dedicated Receipts Route (`/receipts`)**: Full-screen interactive acoustic receipt generator allowing range filtering (1 Month, 6 Months, 1 Year, All Time), thermal print support, and direct Spotify playback.
- **Custom React Hooks (`src/hooks/`)**: Extracted `useSpotifyHistory`, `useTheme`, and `useAudioQueue` for modular architecture.
- **`docs/API.md` Specification**: Exhaustive API and component prop documentation.
- **`jsconfig.json`**: Added JavaScript compiler configuration with path alias support (`@/*`).
- **ESLint & Prettier Configs**: Added `.eslintrc.json` and `.prettierrc` configuration files for code quality verification.

### Changed
- **Performance Optimization**: Wrapped all core components (`TrackCard`, `StatCard`, `InsightCard`, `TrackAlbumArt`, `SpotifyIcon`, `ReceiptView`) in `React.memo`.
- **Code Splitting**: Configured `React.lazy()` and `<Suspense>` route splitting for page views.

---

## [1.1.0] - 2026-09-20

### Added
- **Direct Official Spotify Web Player**: Embedded `SpotifyPlayerEmbed.jsx` iFrame widget for playing exact Spotify tracks.
- **`ReceiptView.jsx`**: Thermal listening receipt widget styled for the "Your Life, In Receipts" challenge.
- **Text & Particle Animations**: `AnimatedHeadline` word reveal with gradient text shimmer and `FloatingNotes` musical note background canvas.
- **Documentation**: Added comprehensive `README.md`, `ARCHITECTURE.md`, and `LICENSE` files.

---

## [1.0.0] - 2026-09-20

### Added
- Initial release of LIFE//ARCHIVE listening journal.
- CSV normalization engine for 149,860 stream logs from `spotify_history.csv`.
- 4 core screens: Home Dashboard, Music Journey (5 Eras), Discoveries (6 Insights), Track Explorer.
