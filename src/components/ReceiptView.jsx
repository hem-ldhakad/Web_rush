import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { TrackAlbumArt } from './TrackAlbumArt';
import { SpotifyIcon } from './SpotifyIcon';
import { Printer, Download, Sparkles, Disc } from 'lucide-react';

/**
 * ReceiptView Component
 * Renders a visual "Acoustic Receipt" mapping 100% to the "Your Life, In Receipts" problem statement.
 */
export function ReceiptView() {
  const { stats, loading } = useData();
  const { playTrack, currentTrack } = useAudioPlayer();
  const receiptRef = useRef(null);

  if (loading || !stats || !stats.topTracks) return null;

  const topTracks = stats.topTracks.slice(0, 10);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <section aria-label="Acoustic Receipt Dossier" className="w-full space-y-4 z-10 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-3">
        <div>
          <span className="font-mono text-xs text-[#1DB954] uppercase tracking-widest font-bold flex items-center gap-1.5">
            <SpotifyIcon className="w-4 h-4" />
            PROBLEM STATEMENT // YOUR LIFE, IN RECEIPTS
          </span>
          <h2 className="font-syne text-2xl font-bold text-on-surface mt-0.5">
            Official Listening Receipt
          </h2>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container-highest font-mono text-xs text-on-surface font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center shadow-sm"
          title="Print or Save Receipt as PDF"
        >
          <Printer className="w-3.5 h-3.5 text-[#1DB954]" />
          <span>Print / Save Receipt</span>
        </button>
      </div>

      {/* Authentic Thermal Receipt Paper Widget */}
      <div
        ref={receiptRef}
        className="w-full max-w-md mx-auto bg-[#FBF9F5] dark:bg-[#1a1921] text-[#1a181c] dark:text-[#f0ecf6] border border-surface-container-highest rounded-xl p-6 sm:p-8 font-mono text-xs shadow-2xl relative overflow-hidden space-y-5 transition-colors"
      >
        {/* Receipt Header */}
        <div className="text-center space-y-1.5 border-b border-dashed border-on-surface-variant/40 pb-4">
          <div className="font-syne font-extrabold text-xl tracking-wider uppercase text-on-surface">
            LIFE // ARCHIVE
          </div>
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
            STORE № 2024 — YOUR LIFE IN RECEIPTS
          </div>
          <div className="text-[10px] text-on-surface-variant">
            ORDER #8849-SPOTIFY-PROVENANCE
          </div>
          <div className="text-[10px] text-on-surface-variant">
            DATE: {currentDate} • RANGE: {stats.dateRange.start} – {stats.dateRange.end}
          </div>
        </div>

        {/* Receipt Line Items Table */}
        <div className="space-y-3">
          <div className="flex justify-between font-bold text-[11px] border-b border-on-surface-variant/30 pb-1 uppercase tracking-wider text-on-surface">
            <span>QTY  ITEM / TRACK</span>
            <span>PLAYS</span>
          </div>

          <div className="space-y-2.5">
            {topTracks.map((item, idx) => {
              const isCurrentPlaying = currentTrack?.track_name === item.trackName;
              return (
                <div
                  key={idx}
                  onClick={() => playTrack(item)}
                  className={`flex items-start justify-between gap-2 p-1.5 rounded transition-colors cursor-pointer group ${
                    isCurrentPlaying ? 'bg-[#1DB954]/20 font-bold' : 'hover:bg-on-surface-variant/10'
                  }`}
                  title={`Click to play direct Spotify track: ${item.trackName}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-[#1DB954] w-4 shrink-0 text-[11px]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <TrackAlbumArt trackName={item.trackName} artistName={item.artistName} size="sm" />
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-on-surface group-hover:text-[#1DB954] transition-colors">
                        {item.trackName}
                      </div>
                      <div className="text-[10px] text-on-surface-variant truncate">
                        {item.artistName}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#1DB954]">{item.count}x</div>
                    <div className="text-[9px] text-on-surface-variant">
                      {Math.round(item.totalMs / 60000)} mins
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Receipt Totals Section */}
        <div className="border-t border-dashed border-on-surface-variant/40 pt-4 space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">TOTAL TRACKS CATALOGUED:</span>
            <span className="font-bold">{stats.uniqueTracks.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">TOTAL ARTISTS DISCOVERED:</span>
            <span className="font-bold">{stats.uniqueArtists.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-syne font-bold border-t border-on-surface-variant/20 pt-2 text-on-surface">
            <span>TOTAL STREAM TIME:</span>
            <span className="text-[#1DB954]">{stats.totalHours.toLocaleString()} HOURS</span>
          </div>
        </div>

        {/* Simulated Barcode */}
        <div className="text-center space-y-2 pt-2 border-t border-dashed border-on-surface-variant/40">
          <div className="w-full h-10 bg-on-surface/90 rounded flex items-center justify-center p-1">
            <div className="w-full h-full bg-surface-container-lowest flex items-center justify-around px-2">
              <span className="w-1 h-full bg-on-surface"></span>
              <span className="w-0.5 h-full bg-on-surface"></span>
              <span className="w-2 h-full bg-on-surface"></span>
              <span className="w-0.5 h-full bg-on-surface"></span>
              <span className="w-1.5 h-full bg-on-surface"></span>
              <span className="w-1 h-full bg-on-surface"></span>
              <span className="w-2 h-full bg-on-surface"></span>
              <span className="w-0.5 h-full bg-on-surface"></span>
              <span className="w-1.5 h-full bg-on-surface"></span>
              <span className="w-1 h-full bg-on-surface"></span>
            </div>
          </div>
          <div className="text-[9px] text-on-surface-variant uppercase tracking-widest">
            AUTH-KEY: 149860-SPOTIFY-LOGS-VERIFIED
          </div>
          <div className="font-syne font-bold text-xs uppercase tracking-wider text-on-surface pt-1">
            *** THANK YOU FOR LISTENING ***
          </div>
        </div>
      </div>
    </section>
  );
}
