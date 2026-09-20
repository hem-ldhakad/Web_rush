import React, { memo } from 'react';
import { Shuffle, SkipForward } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { TrackAlbumArt } from './TrackAlbumArt';
import { SpotifyIcon } from './SpotifyIcon';
import { getSpotifyWebUrl } from '../utils/exportData';

export const TrackCard = memo(function TrackCard({ record, index }) {
  const { setSelectedRecord, records } = useData();
  const { currentTrack, playTrack } = useAudioPlayer();

  if (!record) return null;

  const isCurrentPlaying = (currentTrack?.spotify_track_uri || currentTrack?.id) === (record.spotify_track_uri || record.id);

  const minutes = Math.floor(record.secondsPlayed / 60);
  const seconds = record.secondsPlayed % 60;
  const timeFormatted = `${minutes}:${String(seconds).padStart(2, '0')}`;
  const spotifyUrl = getSpotifyWebUrl(record.spotify_track_uri);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playTrack(record, records);
  };

  return (
    <div
      onClick={() => setSelectedRecord(record)}
      className={`group p-4 border-b transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
        isCurrentPlaying
          ? 'bg-[#1DB954]/10 border-[#1DB954]/40 shadow-[inset_4px_0_0_0_#1DB954]'
          : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container-highest'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Play Direct Spotify Track Button */}
        <button
          onClick={handlePlayClick}
          aria-label={`Play direct Spotify track: ${record.track_name}`}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isCurrentPlaying
              ? 'bg-[#1DB954] text-white shadow-md scale-105'
              : 'bg-surface-container-high hover:bg-[#1DB954] hover:text-white text-on-surface-variant'
          }`}
          title={`Play direct Spotify track: ${record.track_name}`}
        >
          <SpotifyIcon className={`w-4 h-4 ${isCurrentPlaying ? 'text-white' : 'text-[#1DB954] group-hover:text-white'}`} />
        </button>

        {/* Track Album Art Cover Icon Image */}
        <TrackAlbumArt
          track={record}
          size="md"
        />

        {/* Index / Timestamp */}
        <span className="font-mono text-xs text-on-surface-variant w-9 shrink-0">
          {index !== undefined ? `#${String(index + 1).padStart(2, '0')}` : record.hour + ':00'}
        </span>

        {/* Track & Artist Info */}
        <div className="flex flex-col min-w-0">
          <span className={`font-syne font-semibold text-sm transition-colors flex items-center gap-2 truncate ${
            isCurrentPlaying ? 'text-[#1DB954] font-bold' : 'text-on-surface group-hover:text-primary'
          }`}>
            <span className="truncate">{record.track_name}</span>
            {isCurrentPlaying && (
              <span className="px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] font-mono text-[10px] uppercase font-bold shrink-0">
                Playing in Spotify
              </span>
            )}
          </span>
          <span className="font-mono text-xs text-on-surface-variant truncate">
            {record.artist_name} • <span className="italic opacity-80">{record.album_name}</span>
          </span>
        </div>
      </div>

      {/* Right Side Metadata & Direct Spotify Button */}
      <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant self-end md:self-center shrink-0">
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

        {/* Direct Spotify Icon Link Button */}
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open track ${record.track_name} directly on Spotify.com`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/30 font-mono text-[11px] font-bold transition-all shadow-sm group/sp"
          title="Open song directly on Spotify.com"
        >
          <SpotifyIcon className="w-3.5 h-3.5 shrink-0 group-hover/sp:scale-110 transition-transform" />
          <span className="hidden sm:inline">Spotify</span>
        </a>
      </div>
    </div>
  );
});
