import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { TrackAlbumArt } from '../components/TrackAlbumArt';
import { SpotifyIcon } from '../components/SpotifyIcon';
import { AnimatedHeadline, FloatingNotes } from '../components/AnimatedText';
import { Printer, Download, Disc, Sparkles, Filter, Calendar, Share2, Check } from 'lucide-react';

/**
 * Receipts Page Controller (Screen /receipts)
 * Dedicated screen for "Your Life, In Receipts" problem statement.
 */
export function Receipts() {
  const { records, stats, loading } = useData();
  const { playTrack, currentTrack } = useAudioPlayer();
  const [timeRange, setTimeRange] = useState('ALL');
  const [itemCount, setItemCount] = useState(10);
  const [copied, setCopied] = useState(false);

  // Filter records based on selected time range
  const filteredRecords = useMemo(() => {
    if (!records) return [];
    if (timeRange === 'ALL') return records;

    const now = new Date(2024, 11, 31); // Dataset max window
    const targetDate = new Date(now);

    if (timeRange === '1M') targetDate.setMonth(now.getMonth() - 1);
    if (timeRange === '6M') targetDate.setMonth(now.getMonth() - 6);
    if (timeRange === '1Y') targetDate.setFullYear(now.getFullYear() - 1);

    return records.filter((r) => r.date && r.date >= targetDate);
  }, [records, timeRange]);

  // Calculate top tracks for filtered range
  const topTracksForRange = useMemo(() => {
    if (!filteredRecords || filteredRecords.length === 0) return [];
    const trackMap = new Map();

    filteredRecords.forEach((rec) => {
      const key = `${rec.artist_name} — ${rec.track_name}`;
      const existing = trackMap.get(key) || {
        trackName: rec.track_name,
        artistName: rec.artist_name,
        albumName: rec.album_name,
        spotify_track_uri: rec.spotify_track_uri,
        count: 0,
        totalMs: 0,
      };
      existing.count += 1;
      existing.totalMs += rec.ms_played;
      trackMap.set(key, existing);
    });

    return Array.from(trackMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, itemCount);
  }, [filteredRecords, itemCount]);

  const totalMs = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + curr.ms_played, 0);
  }, [filteredRecords]);

  const totalHours = Math.round(totalMs / 3600000);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-20 text-center font-mono text-xs text-on-surface-variant flex items-center justify-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-[#1DB954] border-t-transparent animate-spin"></div>
        <span>Generating receipt ledger...</span>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 lg:py-16 space-y-10 relative overflow-hidden">
      {/* Floating Musical Notes Particles */}
      <FloatingNotes />

      {/* Header */}
      <div className="space-y-3 border-b border-surface-container-highest pb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#1DB954] font-bold flex items-center gap-1.5">
            <SpotifyIcon className="w-3.5 h-3.5" />
            PROBLEM STATEMENT // YOUR LIFE, IN RECEIPTS
          </span>
        </div>

        <AnimatedHeadline text="Acoustic" highlightText="Receipt Generator." className="text-4xl sm:text-5xl" />

        <p className="font-mono text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Customize, print, and export your personal listening receipt constructed deterministically from raw stream logs. Select a timeframe to inspect your top receipts.
        </p>
      </div>

      {/* Interactive Receipt Controls Bar */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-highest space-y-4 shadow-sm relative z-10 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Time Range Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
              Receipt Timeframe
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: '1M', label: '1 Month' },
                { id: '6M', label: '6 Months' },
                { id: '1Y', label: '1 Year' },
                { id: 'ALL', label: 'All Time (11 Yrs)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTimeRange(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    timeRange === opt.id
                      ? 'bg-[#1DB954] text-white shadow-md'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container-highest'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Item Count Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
              Receipt Item Count
            </label>
            <div className="flex items-center gap-2">
              {[10, 15, 20].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setItemCount(cnt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    itemCount === cnt
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container-highest'
                  }`}
                >
                  Top {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#1DB954] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#19a34a] transition-all inline-flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-surface-container-highest transition-colors cursor-pointer"
              title="Copy receipt page URL"
            >
              {copied ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Printable Thermal Receipt Container */}
      <div aria-label="Printable Thermal Receipt" className="w-full max-w-lg mx-auto relative z-10">
        <div className="bg-[#FBF9F5] dark:bg-[#181720] text-[#1a181c] dark:text-[#f0ecf6] border border-surface-container-highest rounded-2xl p-6 sm:p-8 font-mono text-xs shadow-2xl space-y-6">
          {/* Receipt Header */}
          <div className="text-center space-y-2 border-b border-dashed border-on-surface-variant/40 pb-5">
            <div className="flex items-center justify-center gap-2 text-[#1DB954]">
              <SpotifyIcon className="w-6 h-6" />
              <span className="font-syne font-extrabold text-2xl tracking-wider uppercase text-on-surface">
                LIFE // ARCHIVE
              </span>
            </div>
            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              OFFICIAL LISTENING RECEIPT
            </div>
            <div className="text-[10px] text-on-surface-variant font-semibold">
              TIMEFRAME: {timeRange === 'ALL' ? 'LIFETIME (2013-2024)' : timeRange} • ITEMS: TOP {itemCount}
            </div>
            <div className="text-[10px] text-on-surface-variant">
              DATE: {new Date().toLocaleDateString()} • {filteredRecords.length.toLocaleString()} LOGGED STREAMS
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <div className="flex justify-between font-bold text-[11px] border-b border-on-surface-variant/30 pb-1.5 uppercase tracking-wider text-on-surface">
              <span>ITEM / TRACK</span>
              <span>PLAYS</span>
            </div>

            <div className="space-y-3">
              {topTracksForRange.map((item, idx) => {
                const isCurrentPlaying = currentTrack?.track_name === item.trackName;
                return (
                  <div
                    key={idx}
                    onClick={() => playTrack(item)}
                    className={`flex items-start justify-between gap-3 p-2 rounded-lg transition-colors cursor-pointer group ${
                      isCurrentPlaying ? 'bg-[#1DB954]/20 font-bold' : 'hover:bg-on-surface-variant/10'
                    }`}
                    title={`Click to play direct Spotify track: ${item.trackName}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-bold text-[#1DB954] w-5 shrink-0 text-xs">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <TrackAlbumArt trackName={item.trackName} artistName={item.artistName} size="sm" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-sm text-on-surface group-hover:text-[#1DB954] transition-colors">
                          {item.trackName}
                        </div>
                        <div className="text-xs text-on-surface-variant truncate">
                          {item.artistName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#1DB954] text-sm">{item.count}x</div>
                      <div className="text-[10px] text-on-surface-variant">
                        {Math.round(item.totalMs / 60000)} mins
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Totals */}
          <div className="border-t border-dashed border-on-surface-variant/40 pt-4 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">STREAM VOLUME IN RANGE:</span>
              <span className="font-bold">{filteredRecords.length.toLocaleString()} plays</span>
            </div>
            <div className="flex justify-between text-base font-syne font-bold border-t border-on-surface-variant/20 pt-2 text-on-surface">
              <span>TOTAL STREAM HOURS:</span>
              <span className="text-[#1DB954]">{totalHours.toLocaleString()} HRS</span>
            </div>
          </div>

          {/* Barcode & Footer */}
          <div className="text-center space-y-2 pt-2 border-t border-dashed border-on-surface-variant/40">
            <div className="w-full h-12 bg-on-surface/90 rounded-lg flex items-center justify-center p-1.5">
              <div className="w-full h-full bg-surface-container-lowest flex items-center justify-around px-3">
                <span className="w-1.5 h-full bg-on-surface"></span>
                <span className="w-0.5 h-full bg-on-surface"></span>
                <span className="w-2.5 h-full bg-on-surface"></span>
                <span className="w-0.5 h-full bg-on-surface"></span>
                <span className="w-2 h-full bg-on-surface"></span>
                <span className="w-1 h-full bg-on-surface"></span>
                <span className="w-3 h-full bg-on-surface"></span>
                <span className="w-0.5 h-full bg-on-surface"></span>
                <span className="w-2 h-full bg-on-surface"></span>
                <span className="w-1.5 h-full bg-on-surface"></span>
              </div>
            </div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              HASH: {filteredRecords.length}-SPOTIFY-RECEIPT-AUTHENTICATED
            </div>
            <div className="font-syne font-bold text-sm uppercase tracking-wider text-on-surface pt-1">
              *** THANK YOU FOR LISTENING ***
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
