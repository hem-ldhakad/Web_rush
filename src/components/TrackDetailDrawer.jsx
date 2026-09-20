import React, { useMemo } from 'react';
import { X, Music, Calendar, Clock, Monitor, Shuffle, SkipForward, Disc, ExternalLink, Copy, Check, Play, Pause } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { SpotifyPlayerEmbed } from './SpotifyPlayerEmbed';
import { getSpotifyWebUrl } from '../utils/exportData';

export function TrackDetailDrawer() {
  const { selectedRecord, setSelectedRecord, records } = useData();
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();
  const [copied, setCopied] = React.useState(false);

  const trackHistory = useMemo(() => {
    if (!selectedRecord || !records) return [];
    return records.filter(
      (r) =>
        r.track_name === selectedRecord.track_name &&
        r.artist_name === selectedRecord.artist_name
    );
  }, [selectedRecord, records]);

  if (!selectedRecord) return null;

  const isCurrentPlaying = currentTrack?.id === selectedRecord.id && isPlaying;
  const totalPlays = trackHistory.length;
  const firstPlay = trackHistory[0]?.ts || selectedRecord.ts;
  const lastPlay = trackHistory[trackHistory.length - 1]?.ts || selectedRecord.ts;
  const totalMs = trackHistory.reduce((acc, curr) => acc + curr.ms_played, 0);
  const totalMinutes = Math.round(totalMs / 60000);
  const spotifyUrl = getSpotifyWebUrl(selectedRecord.spotify_track_uri);

  const handleCopyUri = () => {
    navigator.clipboard.writeText(selectedRecord.spotify_track_uri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest border-l border-surface-container-highest h-full flex flex-col shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low">
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              TRACK PROVENANCE DOSSIER
            </span>
            <h2 className="font-syne text-xl font-bold text-on-surface mt-1">
              {selectedRecord.track_name}
            </h2>
          </div>
          <button
            onClick={() => setSelectedRecord(null)}
            className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Track Info & Spotify Embed Player */}
        <div className="p-6 space-y-6 flex-1">
          {/* Official Spotify Web Player Embed */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              Embedded Spotify Player
            </div>
            <SpotifyPlayerEmbed spotifyTrackUri={selectedRecord.spotify_track_uri} height={152} />
          </div>

          <div className="space-y-2 pb-6 border-b border-surface-container-highest flex items-start justify-between">
            <div>
              <div className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                Artist & Album
              </div>
              <div className="font-syne text-lg font-semibold text-on-surface">
                {selectedRecord.artist_name}
              </div>
              <div className="font-mono text-xs text-on-surface-variant italic">
                {selectedRecord.album_name}
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => playTrack(selectedRecord, trackHistory)}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:bg-secondary transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {isCurrentPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              <span>{isCurrentPlaying ? 'Pause' : 'Play Song'}</span>
            </button>
          </div>

          {/* Quantitative Provenance Box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest">
              <div className="font-mono text-xs text-on-surface-variant uppercase">
                Lifetime Track Plays
              </div>
              <div className="font-syne text-2xl font-bold text-primary mt-1">
                {totalPlays} {totalPlays === 1 ? 'play' : 'plays'}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest">
              <div className="font-mono text-xs text-on-surface-variant uppercase">
                Total Time Listened
              </div>
              <div className="font-syne text-2xl font-bold text-on-surface mt-1">
                {totalMinutes} mins
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase text-on-surface-variant tracking-wider font-bold">
              Session Metadata
            </div>
            <div className="divide-y divide-surface-container-highest border border-surface-container-highest rounded-lg overflow-hidden font-mono text-xs">
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Logged Timestamp
                </span>
                <span className="font-semibold text-on-surface">{selectedRecord.ts}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Session Duration
                </span>
                <span className="font-semibold text-on-surface">
                  {selectedRecord.secondsPlayed} seconds ({selectedRecord.ms_played} ms)
                </span>
              </div>
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" /> Device / Platform
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">
                  {selectedRecord.platform}
                </span>
              </div>
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-primary" /> Shuffle Mode
                </span>
                <span className="font-semibold text-on-surface">
                  {selectedRecord.shuffle ? 'ENABLED' : 'OFF'}
                </span>
              </div>
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <SkipForward className="w-4 h-4 text-primary" /> Skipped State
                </span>
                <span className="font-semibold text-on-surface">
                  {selectedRecord.skipped ? 'YES (SKIPPED)' : 'NO (PLAYED)'}
                </span>
              </div>
              <div className="p-3 bg-surface-container-lowest flex items-center justify-between">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Disc className="w-4 h-4 text-primary" /> Reason Start / End
                </span>
                <span className="text-on-surface">
                  {selectedRecord.reason_start} → {selectedRecord.reason_end}
                </span>
              </div>
            </div>
          </div>

          {/* First / Last Date History */}
          <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest space-y-2 font-mono text-xs">
            <div className="text-on-surface-variant uppercase text-[10px] tracking-wider font-bold">
              Lifetime Range for this track
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">First Played:</span>
              <span className="text-on-surface font-semibold">{firstPlay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Last Played:</span>
              <span className="text-on-surface font-semibold">{lastPlay}</span>
            </div>
          </div>

          {/* Spotify URI */}
          <div className="p-3 rounded bg-surface-container border border-surface-container-highest font-mono text-[11px] text-on-surface-variant flex items-center justify-between gap-2">
            <div className="truncate">
              <span className="uppercase text-[10px] text-on-surface block mb-0.5">Spotify Track URI</span>
              <span className="truncate block">{selectedRecord.spotify_track_uri}</span>
            </div>
            <button
              onClick={handleCopyUri}
              className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface shrink-0 cursor-pointer"
              title="Copy URI"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-surface-container-highest bg-surface-container-low flex items-center justify-between gap-3">
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-mono text-xs uppercase tracking-wider hover:bg-secondary text-center font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open on Spotify.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setSelectedRecord(null)}
            className="px-4 py-2.5 rounded-lg bg-on-surface text-surface font-mono text-xs uppercase tracking-wider hover:bg-on-surface-variant transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
