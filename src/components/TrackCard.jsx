import React from 'react';
import { Play, Pause, Shuffle, SkipForward, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { getSpotifyWebUrl } from '../utils/exportData';

export function TrackCard({ record, index }) {
  const { setSelectedRecord } = useData();
  const { currentTrack, isPlaying, playTrack } = useAudioPlayer();

  if (!record) return null;

  const isCurrentPlaying = currentTrack?.id === record.id && isPlaying;

  const minutes = Math.floor(record.secondsPlayed / 60);
  const seconds = record.secondsPlayed % 60;
  const timeFormatted = `${minutes}:${String(seconds).padStart(2, '0')}`;
  const spotifyUrl = getSpotifyWebUrl(record.spotify_track_uri);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playTrack(record);
  };

  return (
    <div
      onClick={() => setSelectedRecord(record)}
      className={`group p-4 border-b transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
        isCurrentPlaying
          ? 'bg-primary-container/20 border-primary/50 shadow-[inset_4px_0_0_0_#a99bea]'
          : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container-highest'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Play Button Action Overlay */}
        <button
          onClick={handlePlayClick}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isCurrentPlaying
              ? 'bg-primary text-on-primary shadow-md scale-105'
              : 'bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant'
          }`}
          title={isCurrentPlaying ? 'Pause' : `Play ${record.track_name}`}
        >
          {isCurrentPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Index / Timestamp */}
        <span className="font-mono text-xs text-on-surface-variant w-10 shrink-0">
          {index !== undefined ? `#${String(index + 1).padStart(2, '0')}` : record.hour + ':00'}
        </span>

        {/* Track & Artist Info */}
        <div className="flex flex-col min-w-0">
          <span className={`font-syne font-semibold text-sm transition-colors flex items-center gap-2 truncate ${
            isCurrentPlaying ? 'text-primary font-bold' : 'text-on-surface group-hover:text-primary'
          }`}>
            <span className="truncate">{record.track_name}</span>
            {isCurrentPlaying && (
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <span className="w-0.5 h-1.5 bg-primary rounded-full animate-wave-1"></span>
                <span className="w-0.5 h-3 bg-primary rounded-full animate-wave-2"></span>
                <span className="w-0.5 h-2 bg-primary rounded-full animate-wave-3"></span>
              </div>
            )}
          </span>
          <span className="font-mono text-xs text-on-surface-variant truncate">
            {record.artist_name} • <span className="opacity-80 italic">{record.album_name}</span>
          </span>
        </div>
      </div>

      {/* Right Side Metadata & External Spotify Link */}
      <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant self-end md:self-center shrink-0">
        {record.shuffle && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface text-[10px] border border-surface-container-highest">
            <Shuffle className="w-3 h-3 text-primary" />
            <span>Shuffle</span>
          </span>
        )}
        {record.skipped && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container/40 text-on-error-container text-[10px]">
            <SkipForward className="w-3 h-3" />
            <span>Skipped</span>
          </span>
        )}
        <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] hidden sm:inline-block">
          {record.platform}
        </span>
        <span className="w-24 text-right hidden lg:inline-block text-[11px]">
          {record.ts}
        </span>
        <span className="font-semibold text-on-surface w-12 text-right">
          {timeFormatted}
        </span>

        {/* Direct Spotify Link */}
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
          title="Open track on Spotify"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
