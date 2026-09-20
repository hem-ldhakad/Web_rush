import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { exportSummaryJSON, exportMarkdownReport } from '../utils/exportData';
import {
  Command,
  Search,
  Printer,
  Sun,
  Moon,
  Home,
  Receipt,
  Navigation,
  Sparkles,
  Music,
  Download,
  X,
  Shuffle,
  SkipForward,
  SkipBack,
} from 'lucide-react';

/**
 * CommandPalette Component (⌘K / Ctrl+K)
 * Universal Command Palette for instant keyboard-driven search, page navigation, receipt printing, export, and player control.
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { records, stats, insights } = useData();
  const { theme, toggleTheme, currentTrack, playNextTrack, playPrevTrack, toggleShuffle } = useAudioPlayer();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Global Hotkey Listener for Cmd+K or Ctrl+K
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

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = (action) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  const navCommands = [
    { id: 'nav-home', label: 'Go to Overview / Home', icon: Home, action: () => navigate('/') },
    { id: 'nav-receipts', label: 'Go to Acoustic Receipts', icon: Receipt, action: () => navigate('/receipts') },
    { id: 'nav-journey', label: 'Go to Music Journey Eras', icon: Navigation, action: () => navigate('/journey') },
    { id: 'nav-discoveries', label: 'Go to Substantiated Discoveries', icon: Sparkles, action: () => navigate('/discoveries') },
    { id: 'nav-tracks', label: 'Go to Track Explorer', icon: Music, action: () => navigate('/tracks') },
  ];

  const utilityCommands = [
    { id: 'print-receipt', label: 'Print / Export Thermal Receipt (PDF)', icon: Printer, action: () => window.print() },
    { id: 'toggle-theme', label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? Sun : Moon, action: () => toggleTheme() },
    { id: 'export-json', label: 'Export Dataset Provenance (JSON)', icon: Download, action: () => exportSummaryJSON(stats, insights) },
    { id: 'export-md', label: 'Export Provenance Report (.md)', icon: Download, action: () => exportMarkdownReport(stats, [], insights) },
    { id: 'next-track', label: 'Play Next Track in Queue', icon: SkipForward, action: () => playNextTrack() },
    { id: 'prev-track', label: 'Play Previous Track in Queue', icon: SkipBack, action: () => playPrevTrack() },
    { id: 'shuffle-queue', label: 'Toggle Shuffle Mode', icon: Shuffle, action: () => toggleShuffle() },
  ];

  // Search matching tracks in dataset
  const searchResults = query.trim()
    ? (records || [])
        .filter(
          (r) =>
            r.track_name?.toLowerCase().includes(query.toLowerCase()) ||
            r.artist_name?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/60 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
        {/* Header Input */}
        <div className="p-4 border-b border-surface-container-highest flex items-center gap-3 bg-surface-container-low">
          <Search className="w-5 h-5 text-[#1DB954] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search tracks (e.g. 'weezer', 'receipt', 'dark mode')..."
            className="w-full bg-transparent text-on-surface font-mono text-sm placeholder:text-on-surface-variant/60 focus:outline-none"
          />
          <span className="px-2 py-1 rounded bg-surface-container text-[10px] text-on-surface-variant uppercase font-bold shrink-0">
            ESC
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Quick Track Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
                Matching Songs ({searchResults.length})
              </div>
              {searchResults.map((tr) => (
                <div
                  key={tr.id}
                  onClick={() => handleAction(() => navigate(`/tracks?q=${encodeURIComponent(tr.track_name)}`))}
                  className="p-2.5 rounded-xl hover:bg-[#1DB954]/15 hover:border-[#1DB954]/40 border border-transparent flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Music className="w-3.5 h-3.5 text-[#1DB954] shrink-0" />
                    <span className="font-syne font-bold text-on-surface truncate">{tr.track_name}</span>
                    <span className="text-on-surface-variant truncate">— {tr.artist_name}</span>
                  </div>
                  <span className="text-[10px] text-[#1DB954] uppercase font-bold shrink-0">Jump to Track</span>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Commands */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Navigation
            </div>
            {navCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => handleAction(cmd.action)}
                  className="p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-on-surface">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">Go</span>
                </div>
              );
            })}
          </div>

          {/* Utility Commands */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              Actions & Player Controls
            </div>
            {utilityCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => handleAction(cmd.action)}
                  className="p-2.5 rounded-xl hover:bg-surface-container-high flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#1DB954]" />
                    <span className="font-semibold text-on-surface">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-[#1DB954] font-bold uppercase">Execute</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Shortcut Hint */}
        <div className="p-3 border-t border-surface-container-highest bg-surface-container-low flex items-center justify-between text-[10px] text-on-surface-variant font-mono">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface">⌘K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-bold text-on-surface">Ctrl+K</kbd> to open Command Palette anytime</span>
          <span className="text-[#1DB954] font-bold">LIFE//ARCHIVE</span>
        </div>
      </div>
    </div>
  );
}
