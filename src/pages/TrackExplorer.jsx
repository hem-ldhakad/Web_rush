import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { TrackCard } from '../components/TrackCard';
import { SpotifyIcon } from '../components/SpotifyIcon';
import { AnimatedHeadline, FloatingNotes } from '../components/AnimatedText';
import { Search, Filter, ChevronLeft, ChevronRight, RotateCcw, ListFilter, SlidersHorizontal } from 'lucide-react';

export function TrackExplorer() {
  const { records, stats, loading } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialArtist = searchParams.get('artist') || 'ALL';
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedArtist, setSelectedArtist] = useState(initialArtist);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    const artistParam = searchParams.get('artist');
    if (artistParam) {
      setSelectedArtist(artistParam);
    }
  }, [searchParams]);

  // Derive unique years & top artists for dropdowns
  const availableYears = useMemo(() => {
    if (!records) return [];
    const yrs = new Set();
    records.forEach((r) => r.year && yrs.add(r.year));
    return Array.from(yrs).sort((a, b) => b - a);
  }, [records]);

  const topArtistOptions = useMemo(() => {
    if (!stats || !stats.topArtists) return [];
    return stats.topArtists.slice(0, 50);
  }, [stats]);

  const platformOptions = useMemo(() => {
    if (!stats || !stats.platformBreakdown) return [];
    return Object.keys(stats.platformBreakdown);
  }, [stats]);

  // Filter records based on active controls
  const filteredRecords = useMemo(() => {
    if (!records) return [];

    return records.filter((rec) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTrack = rec.track_name.toLowerCase().includes(q);
        const matchArtist = rec.artist_name.toLowerCase().includes(q);
        const matchAlbum = rec.album_name.toLowerCase().includes(q);
        if (!matchTrack && !matchArtist && !matchAlbum) return false;
      }

      // Artist filter
      if (selectedArtist !== 'ALL' && rec.artist_name !== selectedArtist) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'ALL' && String(rec.year) !== String(selectedYear)) {
        return false;
      }

      // Platform filter
      if (selectedPlatform !== 'ALL' && rec.platform !== selectedPlatform) {
        return false;
      }

      return true;
    });
  }, [records, searchQuery, selectedArtist, selectedYear, selectedPlatform]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArtist('ALL');
    setSelectedYear('ALL');
    setSelectedPlatform('ALL');
    setCurrentPage(1);
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-20 text-center font-mono text-xs text-on-surface-variant">
        Loading track explorer dataset...
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 lg:py-16 space-y-8 relative overflow-hidden">
      {/* Floating Musical Notes Particles */}
      <FloatingNotes />

      {/* Page Header */}
      <div className="space-y-3 border-b border-surface-container-highest pb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#1DB954] font-bold flex items-center gap-1.5">
            <SpotifyIcon className="w-3.5 h-3.5" />
            SCREEN D // SEARCHABLE ARCHIVAL EXPLORER
          </span>
        </div>

        <AnimatedHeadline text="Track" highlightText="Explorer." className="text-4xl sm:text-5xl" />

        <p className="font-mono text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Search and filter all {stats.totalPlays.toLocaleString()} listening history events across eleven years. Click any track to open its full provenance dossier or play directly on Spotify.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-highest space-y-4 shadow-sm relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4">

          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by track name, artist, or album..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest font-mono text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Reset Filters Button */}
          {(searchQuery || selectedArtist !== 'ALL' || selectedYear !== 'ALL' || selectedPlatform !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-mono text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Artist Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
              Filter by Artist
            </label>
            <select
              value={selectedArtist}
              onChange={(e) => {
                setSelectedArtist(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="ALL">All Artists ({stats.uniqueArtists.toLocaleString()})</option>
              {topArtistOptions.map((art) => (
                <option key={art.name} value={art.name}>
                  {art.name} ({art.count.toLocaleString()} plays)
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
              Filter by Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="ALL">All Years (2013 – 2024)</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
              Filter by Device / Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="ALL">All Devices</option>
              {platformOptions.map((plat) => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-on-surface-variant border-b border-surface-container-highest pb-3">
        <div>
          <span>
            Found <strong className="text-on-surface">{filteredRecords.length.toLocaleString()}</strong> matching records
          </span>
          {searchQuery && <span> for "{searchQuery}"</span>}
          {selectedArtist !== 'ALL' && <span> for artist "{selectedArtist}"</span>}
        </div>
        <div>
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Track List */}
      <div className="divide-y divide-surface-container-highest border border-surface-container-highest rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm">
        {paginatedRecords.map((record, idx) => {
          const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx;
          return <TrackCard key={record.id} record={record} index={globalIdx} />;
        })}

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center font-mono text-xs text-on-surface-variant">
            No Spotify records found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between font-mono text-xs pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="text-on-surface-variant font-semibold">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} – {Math.min(currentPage * ITEMS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length.toLocaleString()}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
