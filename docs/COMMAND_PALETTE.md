# ⌨️ COMMAND PALETTE SPECIFICATION — LIFE//ARCHIVE

> **Comprehensive Technical Guide for the Universal Command Palette (`⌘K` / `Ctrl+K`) Component**

---

## 1. Overview & Objectives

The **Universal Command Palette** (`CommandPalette.jsx`) provides single-keypress global navigation, real-time dataset song search, print triggers, export actions, theme toggling, and media player controls across `LIFE//ARCHIVE`.

---

## 2. Global Hotkey Event Listener

The command palette attaches a non-intrusive global event listener to the `window` object:

```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## 3. Command Action Matrix

### 🧭 Navigation Commands
- **Go to Overview / Home**: Routes to `/`
- **Go to Acoustic Receipts**: Routes to `/receipts`
- **Go to Music Journey Eras**: Routes to `/journey`
- **Go to Substantiated Discoveries**: Routes to `/discoveries`
- **Go to Track Explorer**: Routes to `/tracks`

### ⚡ Actions & Utilities
- **Print / Export Thermal Receipt**: Triggers `window.print()` formatted for thermal receipt printing or PDF save.
- **Switch Theme**: Toggles between Dark Mode and Light Mode.
- **Export Dataset Provenance (JSON)**: Initiates download of structured summary JSON.
- **Export Provenance Report (.md)**: Initiates download of Markdown report.

### 🎧 Media Player Controls
- **Play Next Track in Queue**: Executes `playNextTrack()`.
- **Play Previous Track in Queue**: Executes `playPrevTrack()`.
- **Toggle Shuffle Mode**: Executes `toggleShuffle()`.

---

## 4. Real-Time Track Search

When a query is entered, the palette performs fuzzy string matching against track titles and artist names across all 149,860 records:

```javascript
const searchResults = query.trim()
  ? (records || [])
      .filter(
        (r) =>
          r.track_name?.toLowerCase().includes(query.toLowerCase()) ||
          r.artist_name?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
  : [];
```

Clicking any matching track result instantly routes to `/tracks?q=...` focusing on that exact track.

---

## 5. Accessibility & UX Features

- **Auto Focus**: Focuses search input upon opening modal (`inputRef.current?.focus()`).
- **Escape Key Dismissal**: Pressing `ESC` closes the palette modal immediately.
- **Backdrop Blur**: High-contrast glassmorphism backdrop (`bg-on-surface/60 backdrop-blur-md`).
- **Screen Reader Support**: Fully labelled with semantic input roles.
