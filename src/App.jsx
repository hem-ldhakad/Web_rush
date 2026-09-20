import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { TrackDetailDrawer } from './components/TrackDetailDrawer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { Home } from './pages/Home';
import { Journey } from './pages/Journey';
import { Discoveries } from './pages/Discoveries';
import { TrackExplorer } from './pages/TrackExplorer';
import { exportSummaryJSON, exportMarkdownReport } from './utils/exportData';
import { Disc } from 'lucide-react';

function MainLayout() {
  const { stats, eras, insights, loading, error } = useData();

  if (loading) {
    return (
      <div className="bg-[#0f0e14] text-[#f6f3f8] min-h-screen flex flex-col items-center justify-center font-mono space-y-6 p-6">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-[#3a3652] border-t-[#a99bea] animate-spin"></div>
          <Disc className="w-8 h-8 text-[#a99bea] absolute animate-pulse" />
        </div>
        <div className="text-center space-y-2 max-w-sm">
          <h2 className="font-syne text-xl font-bold text-[#f6f3f8]">LIFE//ARCHIVE</h2>
          <p className="text-xs text-[#a09cab]">
            Synthesizing 149,860 stream logs from <code>spotify_history.csv</code>...
          </p>
          <div className="flex justify-center items-end gap-1 h-4 pt-2">
            <span className="w-1 h-2 bg-[#a99bea] rounded-full animate-wave-1"></span>
            <span className="w-1 h-4 bg-[#c8beff] rounded-full animate-wave-2"></span>
            <span className="w-1 h-3 bg-[#a99bea] rounded-full animate-wave-3"></span>
            <span className="w-1 h-4 bg-[#c8beff] rounded-full animate-wave-4"></span>
            <span className="w-1 h-2 bg-[#a99bea] rounded-full animate-wave-5"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-mono text-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container transition-colors">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Screen Router Content */}
      <main className="w-full pt-20 pb-24 bg-surface flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/discoveries" element={<Discoveries />} />
          <Route path="/tracks" element={<TrackExplorer />} />
        </Routes>
      </main>

      {/* Interactive Bottom Audio Player Bar */}
      <AudioPlayerBar />

      {/* Slide-over Track Provenance Drawer */}
      <TrackDetailDrawer />

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-surface-container-highest py-10 transition-colors">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-3">
              <span className="font-syne font-semibold text-lg uppercase text-on-surface">
                LIFE//ARCHIVE
              </span>
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
                Edition MMXXIV
              </span>
            </div>
            <p className="font-mono text-xs text-on-surface-variant text-center md:text-left">
              Archival personal listening provenance and acoustic journal ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider text-on-surface-variant">
            <span>Dataset: spotify_history.csv</span>
            <span>•</span>
            <span>{stats.totalPlays ? stats.totalPlays.toLocaleString() : '149,860'} Archival Entries</span>
            <span>•</span>
            <button
              onClick={() => exportSummaryJSON(stats, insights)}
              className="hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
            >
              Export JSON
            </button>
            <span>•</span>
            <button
              onClick={() => exportMarkdownReport(stats, eras, insights)}
              className="hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
            >
              Export Report (.md)
            </button>
          </div>

          <div className="font-mono text-xs text-on-surface-variant">
            © 2024 LIFE//ARCHIVE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <DataProvider>
          <AudioPlayerProvider>
            <MainLayout />
          </AudioPlayerProvider>
        </DataProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
