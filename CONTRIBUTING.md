# 🤝 Contributing to LIFE//ARCHIVE — Your Life, In Receipts

Thank you for considering contributing to **LIFE//ARCHIVE**! We welcome contributions to enhance data processing efficiency, accessibility, UI aesthetics, and test coverage.

---

## 📋 Code of Conduct

1. Be respectful and constructive in all communication.
2. Ensure all data processing remains **100% client-side** with zero external backend or AI API dependencies.
3. Maintain zero synthetic data guarantees — all metrics must derive strictly from `spotify_history.csv`.

---

## 🛠️ Development Workflow

1. **Fork & Clone the Repository**:
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

4. **Verify Production Build**:
   ```bash
   npm run build
   ```

---

## 📏 Coding Standards & Architecture

- **Framework**: React 18 with Vite 5.
- **Styling**: Vanilla TailwindCSS utility tokens matching Google Stitch specifications.
- **State Management**: React Context pattern (`DataContext` & `AudioPlayerContext`).
- **Documentation**: All new components and utility functions must include JSDoc comments (`@param`, `@returns`).
- **Performance**: Wrap list items in `React.memo` and use `useMemo`/`useCallback` for calculated values.
- **Accessibility**: Use semantic HTML5 landmarks and WAI-ARIA attributes (`aria-label`, `role="region"`, `aria-live`).

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
