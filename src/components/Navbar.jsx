
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { ArchiveUploader } from './ArchiveUploader';
import { TrackAlbumArt } from './TrackAlbumArt';
import { querySongs, extractTracksFromSearchV2 } from '../services/spotifyApiService';
import { Menu, X, Search, Database, Sun, Moon, Play, Music } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const { records, stats, loading } = useData();
  const { theme, toggleTheme, currentTrack, isPlaying, playTrack } = useAudioPlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [datasetModalOpen, setDatasetModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('weezer');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResultsV2 = useMemo(() => {
    if (!records || records.length === 0) return [];
    const response = querySongs(records, searchQuery || 'weezer', 20);
    const items = response.data.searchV2.tracksV2.items;
    return items;
  }, [records, searchQuery]);

  const navItems = [
    { label: 'Overview', path: '/' },
    { label: 'Receipts', path: '/receipts' },
    { label: 'Journey', path: '/journey' },
    { label: 'Discoveries', path: '/discoveries' },
    { label: 'Tracks', path: '/tracks' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-highest transition-colors">
        <div className="h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-syne font-semibold text-lg uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
                  LIFE//ARCHIVE
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="hidden sm:inline-block font-mono text-xs uppercase text-on-surface-variant tracking-widest">
                  A Life in Listening
                </span>
              </div>
              <span className="sm:hidden font-mono text-[10px] uppercase text-on-surface-variant tracking-widest mt-0.5">
                A Life in Listening
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-surface-container-low rounded-full border border-surface-container-highest">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${active
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_1px_3px_0_rgba(169,155,234,0.25)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Spotify Search, Theme Toggle & Dataset Info Pill */}
          <div className="flex items-center gap-3">
            {/* Spotify Song Query Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-surface-container-highest text-on-surface transition-colors cursor-pointer flex items-center gap-1.5 font-mono text-xs"
              title="Query songs via Spotify searchV2 API (e.g. weezer)"
            >
              <Search className="w-4 h-4 text-[#1DB954]" />
              <span className="hidden lg:inline text-on-surface-variant font-semibold">Search Songs</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-surface-container-highest text-on-surface transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>

            {/* Dataset Pill */}
            <button
              onClick={() => setDatasetModalOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-surface-container-highest font-mono text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer group"
              title="Click to view dataset schema or load custom archive.zip"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse group-hover:scale-125 transition-transform"></span>
              <span>
                {loading
                  ? 'Loading dataset...'
                  : `spotify_history.csv • ${stats.totalPlays.toLocaleString()} plays`}
              </span>
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className={`w-0.5 h-1.5 bg-primary rounded-full ${isPlaying ? 'animate-wave-1' : ''}`}></span>
                <span className={`w-0.5 h-3 bg-primary rounded-full ${isPlaying ? 'animate-wave-2' : ''}`}></span>
                <span className={`w-0.5 h-2 bg-primary rounded-full ${isPlaying ? 'animate-wave-3' : ''}`}></span>
                <span className={`w-0.5 h-2.5 bg-primary rounded-full ${isPlaying ? 'animate-wave-4' : ''}`}></span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container border border-surface-container-highest transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-container via-primary to-primary-container transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-surface-container-highest px-6 py-4 flex flex-col gap-3 shadow-lg">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors ${active
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-surface-container-highest flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="text-[#1DB954] font-bold hover:underline flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Songs V2</span>
              </button>
              <button
                onClick={toggleTheme}
                className="text-on-surface font-semibold flex items-center gap-1"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-primary" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spotify Search V2 Song Query Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl w-full max-w-2xl p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#1DB954]" />
                <div>
                  <h2 className="font-syne text-xl font-bold text-on-surface">
                    Spotify Song Query Engine
                  </h2>
                  <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Query Schema: data.searchV2.tracksV2.items
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Search Box */}
            <div className="space-y-2 font-mono text-xs">
              <label className="text-on-surface-variant font-bold uppercase text-[10px] tracking-wider block">
                Search Artist / Song Query (e.g. "weezer")
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter artist or song name (e.g. weezer)..."
                  className="w-full bg-surface-container-low border border-surface-container-highest rounded-xl px-4 py-3 pl-10 text-on-surface font-mono text-sm focus:outline-none focus:border-[#1DB954]"
                />
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Search V2 Results List */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-on-surface-variant text-[11px] px-1 font-bold">
                <span>query_songs("{searchQuery || 'weezer'}", limit=20)</span>
                <span>{searchResultsV2.length} items found</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 border border-surface-container-highest rounded-xl p-2 bg-surface-container-low">
                {searchResultsV2.length === 0 ? (
                  <p className="py-6 text-center text-on-surface-variant">
                    No songs found for query "{searchQuery}". Try "weezer", "Taylor Swift", or "Lana Del Rey".
                  </p>
                ) : (
                  searchResultsV2.map((itemObj, idx) => {
                    const trackData = itemObj.item.data;
                    const name = trackData.name;
                    const artistName = trackData.artists?.items?.[0]?.profile?.name || 'Unknown Artist';
                    const albumName = trackData.albumOfTrack?.name || 'Unknown Album';
                    const isCurrent = (currentTrack?.spotify_track_uri || currentTrack?.id) === (trackData.uri || trackData.id);

                    return (
                      <div
                        key={trackData.id || idx}
                        onClick={() => {
                          const normalizedTracks = extractTracksFromSearchV2(searchResultsV2);
                          const currentNorm = normalizedTracks[idx];
                          playTrack(currentNorm, normalizedTracks);
                          setSearchModalOpen(false);
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group ${isCurrent
                            ? 'bg-[#1DB954]/20 border border-[#1DB954]/50 font-bold'
                            : 'hover:bg-surface-container-high border border-transparent'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-[#1DB954] font-bold w-5 text-center shrink-0">
                            {idx + 1}
                          </span>
                          <TrackAlbumArt trackName={name} artistName={artistName} size="sm" />
                          <div className="min-w-0">
                            <div className="font-syne font-bold text-sm text-on-surface truncate group-hover:text-[#1DB954] transition-colors">
                              {name}
                            </div>
                            <div className="text-[11px] text-on-surface-variant truncate">
                              {artistName} • <span className="italic">{albumName}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="px-3 py-1 rounded-full bg-[#1DB954] text-white font-mono text-[10px] uppercase font-bold tracking-wider hover:scale-105 transition-transform flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Play</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container-highest flex justify-end">
              <button
                onClick={() => setSearchModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-on-surface text-surface font-mono text-xs uppercase tracking-wider hover:bg-on-surface-variant transition-colors cursor-pointer"
              >
                Close Query Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dataset Metadata & Upload Modal */}
      {datasetModalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl w-full max-w-2xl p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between border-b border-surface-container-highest pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="font-syne text-xl font-bold text-on-surface">
                  Spotify History Dataset Provenance
                </h2>
              </div>
              <button
                onClick={() => setDatasetModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 font-mono text-xs text-on-surface-variant">
              {/* Archive Uploader Component */}
              <div className="space-y-2">
                <div className="font-bold text-on-surface uppercase text-[10px] tracking-wider">
                  Load Custom Spotify Archive (.zip or .csv)
                </div>
                <ArchiveUploader onComplete={() => setDatasetModalOpen(false)} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                <div className="p-3 rounded bg-surface-container-low border border-surface-container-highest">
                  <div className="text-[10px] text-on-surface-variant uppercase">Total Rows</div>
                  <div className="font-syne font-bold text-base text-primary mt-0.5">
                    {stats.totalPlays.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded bg-surface-container-low border border-surface-container-highest">
                  <div className="text-[10px] text-on-surface-variant uppercase">File Size</div>
                  <div className="font-syne font-bold text-base text-on-surface mt-0.5">
                    21.3 MB
                  </div>
                </div>
                <div className="p-3 rounded bg-surface-container-low border border-surface-container-highest">
                  <div className="text-[10px] text-on-surface-variant uppercase">Unique Artists</div>
                  <div className="font-syne font-bold text-base text-on-surface mt-0.5">
                    {stats.uniqueArtists.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded bg-surface-container-low border border-surface-container-highest">
                  <div className="text-[10px] text-on-surface-variant uppercase">Unique Tracks</div>
                  <div className="font-syne font-bold text-base text-on-surface mt-0.5">
                    {stats.uniqueTracks.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-on-surface uppercase text-[10px] tracking-wider">
                  CSV Fields & Schema Definition
                </div>
                <div className="divide-y divide-surface-container-highest border border-surface-container-highest rounded-lg overflow-hidden bg-surface-container-low text-[11px]">
                  <div className="p-2.5 flex justify-between">
                    <span className="font-bold text-on-surface">spotify_track_uri</span>
                    <span>Spotify URI (Base-62 unique track string)</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="font-bold text-on-surface">ts</span>
                    <span>Timestamp in UTC (YYYY-MM-DD HH:mm:ss)</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="font-bold text-on-surface">ms_played</span>
                    <span>Milliseconds stream was played</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="font-bold text-on-surface">track_name / artist_name / album_name</span>
                    <span>Track metadata string labels</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span className="font-bold text-on-surface">platform / shuffle / skipped</span>
                    <span>Streaming hardware device, shuffle & skip flags</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container-highest flex justify-end">
              <button
                onClick={() => setDatasetModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-on-surface text-surface font-mono text-xs uppercase tracking-wider hover:bg-on-surface-variant transition-colors cursor-pointer"
              >
                Close Metadata
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
