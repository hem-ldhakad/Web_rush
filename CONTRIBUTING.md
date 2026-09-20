# 🤝 Contributing to LIFE//ARCHIVE — Your Life, In Receipts

Thank you for your interest in contributing to **LIFE//ARCHIVE**! We welcome contributions to enhance data processing efficiency, accessibility, UI aesthetics, and documentation standards.

---

## 📋 Code of Conduct

1. Be respectful and constructive in all communication.
2. Ensure all data processing remains **100% client-side** with zero external server or AI API dependencies.
3. Maintain zero synthetic data guarantees — all metrics must derive strictly from `spotify_history.csv` or uploaded Spotify `archive.zip` exports.

---

## 🛠️ Development Workflow

1. **Fork & Clone the Repository**:
   ```bash
   git clone https://github.com/hem-ldhakad/Web_rush.git
   cd webrush
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Production Build**:
   ```bash
   npm run build
   ```

---

## 📏 Coding Standards & Architecture

- **Framework**: React 18 with Vite 5.
- **Styling**: Vanilla TailwindCSS utility tokens matching Google Stitch specifications.
- **State Management**: React Context pattern (`DataContext` & `AudioPlayerContext`).
- **Documentation**: All new components and utility functions must include detailed JSDoc comments (`@param`, `@returns`).
- **Performance**: Wrap list items in `React.memo` and use `useMemo`/`useCallback` for calculated values.
- **Accessibility**: Use semantic HTML5 landmarks and WAI-ARIA attributes (`aria-label`, `role="region"`, `aria-live`).

---

## 📄 Documentation Structure

When modifying system components, ensure corresponding documentation files are updated:
- **`README.md`**: Main project overview, quick start, and feature matrix.
- **`ARCHITECTURE.md`**: C4 diagrams, system architecture, and service layer breakdown.
- **`docs/API.md`**: API service methods, custom hooks, and context state reference.
- **`docs/DATA_PIPELINE.md`**: Data schemas, normalization rules, and math formulas.
- **`docs/MUSIC_PLAYER.md`**: Spotify Web Player embed specs, queue drawer, and hotkey matrix.
- **`docs/COMMAND_PALETTE.md`**: Command Palette (`⌘K`) hotkeys and actions.
- **`docs/BENCHMARK.md`**: Quality audit, load time benchmarks, and competitive analysis.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
