# 📜 LIFE//ARCHIVE — Your Life, In Receipts
> **A Personal Spotify Listening Provenance & Archival Journal Engine**

[![Dataset Verified](https://img.shields.io/badge/Dataset-149%2C860_Rows_Verified-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://open.spotify.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Vanilla_CSS_Tokens-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

---

## 🌟 Executive Overview & Problem Statement

**LIFE//ARCHIVE** solves the **"Your Life, In Receipts"** challenge by transforming 11 years of raw Spotify streaming logs (`spotify_history.csv` — 149,860 stream events, 5,342 hours of continuous audio) into a high-fidelity visual listening journal and provenance dossier.

Rather than relying on vague annual summaries, **LIFE//ARCHIVE** parses every individual timestamp, duration, skip flag, shuffle state, and device platform to construct a deterministic, client-side interactive chronicle of a user's life in music.

---

## 🎯 Key Features & Functional Modules

### 1. 📊 Screen A: Home / Executive Dashboard
- **Quantitative Attribute Cards**: Instant metrics for total volume (149,860 plays), continuous hours (5,342 hrs), catalogue depth (14,637 unique tracks, 4,113 unique artists), anchor artist (*The Beatles* with 3,090 plays), and 11-year archival window (2013–2024).
- **Interactive 3D Vinyl Ledger Visualizer**: Rotatable vinyl record simulation with live audio waveform bars.
- **Visual Receipt Dossier Modal**: Instant Hackathon Compliance dossier detailing data integrity rules and client-side processing guarantees.
- **Export Engine**: One-click exports for full JSON dataset payloads and formatted Markdown reports.

### 2. 🗺️ Screen B: Music Journey (Chronological Arc)
- **5 Chronological Era Chapters**:
  1. *The Formative Years* (2013–2015) — Discovery of classic rock discographies.
  2. *The Great Surge* (2016–2017) — Peak annual listening volume (26,320 plays).
  3. *Nocturnal Shift* (2018–2019) — High late-night stream density (29.5% midnight-5 AM).
  4. *Deep Focus Fixation* (2020–2021) — Hyper-looping single tracks during focus blocks.
  5. *Modern Resonance* (2022–2024) — Curated playlist loyalty and multi-device listening.
- **Interactive Recharts Area Chart**: Smooth trajectory visualization of 11-year stream volume and hours.
- **Era Breakdown**: Top artists, pattern shifts, shuffle rates, and supporting track record drawers for each era.

### 3. 💡 Screen C: Substantiated Discoveries
- **6 Deterministic Insights** (backed 100% by raw stream evidence):
  - **The Loop Syndrome**: Identifying top looped track (*Ode To The Mets* — 207 plays).
  - **Nocturnal Resonances**: 44,208 late-night plays between 00:00 AM and 05:00 AM.
  - **The 2017 Surge**: Peak 26,320 plays in a single calendar year.
  - **Anchor Loyalty**: *The Beatles* logged across 3,090 distinct sessions over 11 years.
  - **Mobile vs Desktop Platform Shift**: Tracking client device migration over a decade.
  - **Skip Frequency Analysis**: Quantifying track completion vs skip behavior.
- **Evidence Ledger Inspector Modal**: Click "Inspect records" on any discovery card to view exact supporting CSV rows with direct Spotify playback triggers.

### 4. 🔍 Screen D: Searchable Track Explorer
- **Real-Time Multi-Filter Engine**: Filter 149,860 records instantly by keyword search, top artists (50 options), calendar years (2013–2024), and playback devices.
- **50-Item Pagination**: Responsive, fast rendering for large dataset browsing.
- **Slide-Over Track Provenance Drawer**: Complete session metadata (timestamp, ms played, shuffle state, skipped flag, start/end reasons, Spotify URI, and first/last lifetime play dates).

### 5. 🎵 Direct Official Spotify Web Player Widget
- **Zero Predesigned Demo Audio**: All generic audio streams and demo MP3 files have been removed.
- **Official Spotify Embed Player**: Every song item renders the official Spotify Web iFrame player (`https://open.spotify.com/embed/track/<id>`), allowing direct playback of exact official Spotify tracks.
- **Album Cover Art & Spotify Branding**: Dynamic album cover icons ([`TrackAlbumArt.jsx`](file:///c:/Users/hemal/OneDrive/Desktop/webrush/src/components/TrackAlbumArt.jsx)), Spotify green accents (`#1DB954`), and direct `open.spotify.com` links.

---

## ⚡ Technical Architecture & Stack

```
Web_rush /
├── index.html                   # HTML5 Entry point with SEO & Google Fonts (Syne + Space Mono)
├── vercel.json                  # Vercel SPA rewrite & build configuration
├── vite.config.js               # Vite build configuration & chunk splitting
├── package.json                 # Project dependencies & build scripts
├── README.md                    # Project documentation dossier
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main router, layout, and global ErrorBoundary
    ├── components/              # UI Components
    │   ├── AnimatedText.jsx     # Word reveal, gradient text shimmer & FloatingNotes canvas
    │   ├── AudioPlayerBar.jsx   # Floating sticky Spotify Web Player bar
    │   ├── ArchiveUploader.jsx  # Drag-and-drop ZIP dataset loader
    │   ├── ErrorBoundary.jsx    # React error boundary
    │   ├── InsightCard.jsx      # Discovery card with evidence ledger modal
    │   ├── Navbar.jsx           # Top navigation bar with theme switcher
    │   ├── SpotifyIcon.jsx      # Official Spotify green SVG icon & play buttons
    │   ├── SpotifyPlayerEmbed.jsx # Official Spotify Web Player iFrame widget
    │   ├── StatCard.jsx         # Metric card widget
    │   ├── TrackAlbumArt.jsx    # Album cover art thumbnail with vinyl groove texture
    │   ├── TrackCard.jsx        # Individual song row component
    │   └── TrackDetailDrawer.jsx# Provenance slide-over drawer
    ├── context/                 # State Management Contexts
    │   ├── DataContext.jsx      # Global dataset state & calculated metrics
    │   └── AudioPlayerContext.jsx # Player state, active track, theme switcher
    ├── data/                    # Dataset Loaders & Parsers
    │   ├── loadSpotifyData.js   # Native fetch & JSZip archive loader
    │   └── normalizeSpotifyData.js # UTF-8 BOM removal, timestamp & duration normalization
    ├── pages/                   # Application Pages
    │   ├── Home.jsx             # Screen A — Overview & Dashboard
    │   ├── Journey.jsx          # Screen B — Chronological Arc & Eras
    │   ├── Discoveries.jsx      # Screen C — Substantiated Insights
    │   └── TrackExplorer.jsx    # Screen D — Searchable Archival Explorer
    └── utils/                   # Statistical & Export Calculations
        ├── buildMusicJourney.js # Era segmentation algorithm
        ├── calculateStats.js    # Overall dataset statistics calculation
        ├── discoverInsights.js # Deterministic discovery generators
        └── exportData.js       # JSON/Markdown export handlers & Spotify URI helpers
```

---

## 🛠️ Local Development & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hem-ldhakad/Web_rush.git
   cd Web_rush
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build Locally**:
   ```bash
   npm run preview
   ```

---

## 🔒 Strict Rules & Compliance Audit

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Strict Dataset Rule** | 100% calculated from `spotify_history.csv` (149,860 entries). Zero synthetic data. | ✅ PASS |
| **Frontend Only** | 0 backend server, 0 external AI API calls, 100% deterministic client-side calculation. | ✅ PASS |
| **Direct Spotify Player** | Official Spotify Web Embed player for every selected track (`open.spotify.com/embed/track/...`). | ✅ PASS |
| **4 Full Screens** | Home (Overview), Music Journey (Eras), Discoveries (Insights), Track Explorer (Search). | ✅ PASS |
| **Design System** | Google Stitch specs: Warm dark mode, `Syne` display typography, `Space Mono` body, `#1DB954` accents. | ✅ PASS |
| **Export Support** | Instant JSON summary payload and Markdown report downloads. | ✅ PASS |

---

## ♿ Accessibility & SEO Best Practices

- **Semantic HTML5**: Full usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements.
- **ARIA Attributes**: Accessible `aria-label`, `role="button"`, and `aria-expanded` attributes on interactive elements.
- **Typography & Contrast**: Clean Google Fonts (`Syne` and `Space Mono`) meeting WCAG AAA color contrast ratios in Dark and Light themes.
- **SEO Optimization**: Configured title tags, meta descriptions, UTF-8 charset, and mobile viewport scales.

---

## 📄 License

This project is open-source and released under the **MIT License**.

*Constructed with ❤️ for the Hackathon / Frontend Arena Intelligence Engine Assessment.*
