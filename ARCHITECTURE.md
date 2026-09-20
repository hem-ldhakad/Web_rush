# 🏗️ ARCHITECTURE & DESIGN SYSTEM SPECIFICATION — LIFE//ARCHIVE

> **System Architecture, Data Flow Pipeline, and Design Patterns for "Your Life, In Receipts"**

---

## 1. High-Level Architectural Pattern

`LIFE//ARCHIVE` is constructed as a **Single Page Application (SPA)** using **React 18** and **Vite 5**, adhering to a **Unidirectional Data Flow (Flux-inspired Context Pattern)** with 100% deterministic client-side execution.

```
                  ┌─────────────────────────────────────┐
                  │        Raw Input Data Source        │
                  │ (spotify_history.csv / JSZip Archive)│
                  └──────────────────┬──────────────────┘
                                     │ Native Fetch / JSZip
                                     ▼
                  ┌─────────────────────────────────────┐
                  │    normalizeSpotifyData.js Parser   │
                  │ - Strips UTF-8 BOM                   │
                  │ - Normalizes ISO 8601 Timestamps    │
                  │ - Calculates ms -> Seconds          │
                  │ - Tags Nocturnal Flag (00:00-05:00) │
                  └──────────────────┬──────────────────┘
                                     │ Normalized Array
                                     ▼
                  ┌─────────────────────────────────────┐
                  │       DataContext (Global State)    │
                  │ - Calculates stats (calculateStats) │
                  │ - Segments eras (buildMusicJourney) │
                  │ - Generates insights (discover)     │
                  └─────────┬─────────────────┬─────────┘
                            │                 │
             ┌──────────────┘                 └──────────────┐
             ▼                                               ▼
┌───────────────────────────┐                   ┌───────────────────────────┐
│     UI Pages & Views      │                   │   AudioPlayerContext      │
│ - Screen A: Home / Dossier│                   │ - Active Track State      │
│ - Screen B: Music Journey │                   │ - Spotify iFrame Player   │
│ - Screen C: Discoveries   │                   │ - Direct Web Embed        │
│ - Screen D: Track Explorer│                   │ - Dark / Light Theme      │
└───────────────────────────┘                   └───────────────────────────┘
```

---

## 2. Directory & Module Specifications

```
src/
├── App.jsx                     # Top-level Routing, Layout Shell, & Global ErrorBoundary
├── main.jsx                    # React 18 DOM Root Mount
├── components/                 # Atomic & Composite UI Components
│   ├── AnimatedText.jsx        # Headline word reveal, gradient text shimmer & FloatingNotes canvas
│   ├── AudioPlayerBar.jsx      # Sticky bottom Spotify Web Player bar
│   ├── ArchiveUploader.jsx     # Drag-and-drop ZIP dataset loader
│   ├── ErrorBoundary.jsx       # Global React Error Boundary fallback screen
│   ├── InsightCard.jsx         # Discovery card with modal evidence inspector
│   ├── Navbar.jsx              # Responsive header navigation bar with theme toggle
│   ├── ReceiptView.jsx         # "Your Life, In Receipts" thermal acoustic receipt generator
│   ├── SpotifyIcon.jsx         # SVG Spotify icons & play buttons
│   ├── SpotifyPlayerEmbed.jsx  # Official Spotify Web Player iFrame widget
│   ├── StatCard.jsx            # Quantitative metric card widget
│   ├── TrackAlbumArt.jsx       # Dynamic album cover thumbnail with vinyl groove texture
│   ├── TrackCard.jsx           # Individual song list row with play controls
│   └── TrackDetailDrawer.jsx   # Provenance slide-over drawer
├── context/                    # Centralized State Providers
│   ├── DataContext.jsx         # Parsing, dataset caching, and calculated metrics
│   └── AudioPlayerContext.jsx  # Playback queue, active Spotify track, and dark theme state
├── data/                       # Async Loaders & Normalizers
│   ├── loadSpotifyData.js      # Native fetch with candidate fallbacks & JSZip loader
│   └── normalizeSpotifyData.js # Stream log sanitizer & date parser
├── pages/                      # Page View Controllers
│   ├── Home.jsx                # Screen A — Executive Summary & Acoustic Receipt
│   ├── Journey.jsx             # Screen B — Chronological Eras Timeline
│   ├── Discoveries.jsx         # Screen C — Deterministic Data Discoveries
│   └── TrackExplorer.jsx       # Screen D — Multi-Filter Search & Pagination
└── utils/                      # Pure Business Logic & Statistical Calculation
    ├── buildMusicJourney.js    # Chronological era chapter segmentation
    ├── calculateStats.js       # Macro quantitative statistical calculations
    ├── discoverInsights.js     # Evidence-backed discovery generators
    └── exportData.js          # JSON/Markdown export handlers & Spotify URI helpers
```

---

## 3. Data Integrity & Verification Standards

1. **Zero External AI / Zero Backend API**: All parsing, statistical aggregation, era segmentation, and discovery detection execute 100% in the user's browser thread.
2. **0 Synthetic Data**: Every single number displayed across all screens is computed strictly from the 149,860 entries in `spotify_history.csv`.
3. **Deterministic State**: State transitions are immutable. React context actions (`playTrack`, `setSelectedRecord`, `toggleTheme`) produce predictable side effects.

---

## 4. Accessibility & Performance Controls

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`, and `<footer>` tags.
- **WAI-ARIA**: `aria-label`, `role="region"`, `role="navigation"`, `role="status"`, `aria-expanded` attributes on interactive elements.
- **React Optimizations**: `React.memo` wrappers on list items (`TrackCard`, `StatCard`, `InsightCard`) to prevent redundant component re-renders during high-frequency user interactions.
- **Code Splitting**: Splitting vendor chunks (`vendor.js` and `index.js`) in `vite.config.js`.

---

## 5. License

MIT License © 2024 LIFE//ARCHIVE.
