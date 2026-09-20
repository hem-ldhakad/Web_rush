import React, { memo } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { SpotifyPlayerEmbed } from './SpotifyPlayerEmbed';
import { SpotifyIcon } from './SpotifyIcon';
import { getSpotifyWebUrl, getSpotifyTrackId } from '../utils/exportData';
import { X, SkipBack, SkipForward, ExternalLink } from 'lucide-react';

/**
 * AudioPlayerBar Component
 * Renders the sticky bottom Spotify Web Player bar with direct iFrame playback and accessibility live region.
 */
export const AudioPlayerBar = memo(function AudioPlayerBar() {
  const { currentTrack, setCurrentTrack, playNextTrack, playPrevTrack } = useAudioPlayer();

  if (!currentTrack) return null;

  const trackId = getSpotifyTrackId(currentTrack.spotify_track_uri);
  const spotifyUrl = getSpotifyWebUrl(currentTrack.spotify_track_uri);

  return (
    <aside
      aria-label="Direct Spotify Web Player Controls"
      aria-live="polite"
      role="region"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-highest rounded-2xl p-4 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7)] flex flex-col gap-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant border-b border-surface-container-highest/60 pb-2">
          <div className="flex items-center gap-2">
            <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />
            <span className="font-bold text-[#1DB954] uppercase tracking-wider">
              Direct Spotify Web Player
            </span>
            <span className="hidden sm:inline-block text-on-surface">•</span>
            <span className="hidden sm:inline-block font-syne font-semibold text-on-surface truncate max-w-xs">
              {currentTrack.track_name} — {currentTrack.artist_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={playPrevTrack}
                aria-label="Play previous track"
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={playNextTrack}
                aria-label="Play next track"
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open track ${currentTrack.track_name} on Spotify.com`}
              className="px-2.5 py-1 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/40 font-mono text-[11px] font-bold transition-all inline-flex items-center gap-1"
            >
              <span>Spotify.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setCurrentTrack(null)}
              aria-label="Close audio player"
              className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direct Official Spotify iFrame Player */}
        <SpotifyPlayerEmbed spotifyTrackUri={currentTrack.spotify_track_uri} height={152} />
      </div>
    </aside>
  );
});

