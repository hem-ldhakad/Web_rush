import React, { memo, useState } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { SpotifyPlayerEmbed } from './SpotifyPlayerEmbed';
import { SpotifyIcon } from './SpotifyIcon';
import { TrackAlbumArt } from './TrackAlbumArt';
import { getSpotifyWebUrl } from '../utils/exportData';
import {
  X,
  SkipBack,
  SkipForward,
  ExternalLink,
  Shuffle,
  Repeat,
  Heart,
  ListMusic,
  ChevronDown,
  ChevronUp,
  Music,
} from 'lucide-react';

/**
 * AudioPlayerBar Component
 * Direct Official Spotify Player Bar that embeds Spotify's official player widget for exact song streaming.
 */
export const AudioPlayerBar = memo(function AudioPlayerBar() {
  const {
    currentTrack,
    setCurrentTrack,
    trackList,
    setTrackList,
    playTrack,
    playNextTrack,
    playPrevTrack,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    likedTrackIds,
    toggleLikeTrack,
    isTrackLiked,
  } = useAudioPlayer();

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  const spotifyUri = currentTrack.spotify_track_uri || currentTrack.uri;
  const spotifyUrl = getSpotifyWebUrl(spotifyUri);
  const trackId = spotifyUri || currentTrack.id;
  const isLiked = isTrackLiked(trackId);

  return (
    <aside
      aria-label="Spotify Official Web Player"
      aria-live="polite"
      role="region"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 animate-in slide-in-from-bottom-5 duration-300 select-none max-w-7xl mx-auto"
    >
      {/* Up Next Queue Drawer Modal */}
      {isQueueOpen && (
        <div className="mb-2 bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-highest rounded-2xl p-4 shadow-2xl max-h-72 overflow-y-auto animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-[#1DB954]" />
              <h4 className="font-syne font-bold text-sm text-on-surface uppercase tracking-wider">
                Up Next Queue ({trackList.length} Tracks)
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (trackList.length > 0) {
                    const shuffled = [...trackList].sort(() => Math.random() - 0.5);
                    setTrackList(shuffled);
                  }
                }}
                className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-[11px] font-mono text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3 h-3 text-[#1DB954]" />
                <span>Shuffle Queue</span>
              </button>
              <button
                type="button"
                onClick={() => setIsQueueOpen(false)}
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {trackList.length === 0 ? (
              <p className="font-mono text-xs text-on-surface-variant py-4 text-center">
                Queue is empty. Select songs from Top Songs or Receipts to add to queue.
              </p>
            ) : (
              trackList.map((track, idx) => {
                const isCurrent = (track.spotify_track_uri || track.id) === trackId;
                return (
                  <div
                    key={track.id || `${track.spotify_track_uri}-${idx}`}
                    onClick={() => playTrack(track, trackList)}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1DB954]/15 border border-[#1DB954]/40 font-semibold'
                        : 'hover:bg-surface-container-high/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs text-on-surface-variant w-5 text-center">
                        {isCurrent ? <Music className="w-3.5 h-3.5 text-[#1DB954] animate-bounce" /> : idx + 1}
                      </span>
                      <TrackAlbumArt track={track} size="sm" showHoverBadge={false} />
                      <div className="min-w-0">
                        <p className={`font-syne text-xs truncate ${isCurrent ? 'text-[#1DB954] font-bold' : 'text-on-surface'}`}>
                          {track.track_name || track.trackName}
                        </p>
                        <p className="font-mono text-[11px] text-on-surface-variant truncate">
                          {track.artist_name || track.artistName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded bg-[#1DB954] text-white font-bold text-[9px] uppercase tracking-wider">
                          NOW PLAYING
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Main Spotify Player Container */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-highest rounded-2xl p-3 md:p-4 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)] flex flex-col gap-3">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3 font-mono text-xs text-on-surface-variant">
          {/* Left: Spotify Logo, Track Title & Artist */}
          <div className="flex items-center gap-3 min-w-0">
            <SpotifyIcon className="w-5 h-5 text-[#1DB954] shrink-0" />
            <TrackAlbumArt track={currentTrack} size="xs" showHoverBadge={false} />
            <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-syne font-bold text-on-surface truncate text-xs sm:text-sm">
                {currentTrack.track_name || currentTrack.trackName}
              </span>
              <span className="hidden sm:inline text-on-surface-variant/40">•</span>
              <span className="font-mono text-xs text-[#1DB954] font-semibold truncate">
                {currentTrack.artist_name || currentTrack.artistName}
              </span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Heart Favorite Toggle */}
            <button
              type="button"
              onClick={() => toggleLikeTrack(trackId)}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isLiked
                  ? 'bg-error/20 text-error scale-110'
                  : 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
              title={isLiked ? 'Liked Track' : 'Like Track (Key: L)'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Skip Prev / Next Track Buttons */}
            <div className="flex items-center gap-1 bg-surface-container-high/50 p-1 rounded-xl border border-surface-container-highest/60">
              <button
                type="button"
                onClick={toggleShuffle}
                aria-label="Toggle shuffle mode"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  isShuffle ? 'bg-[#1DB954]/20 text-[#1DB954] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title={isShuffle ? 'Shuffle Mode: ON' : 'Shuffle Mode: OFF'}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={playPrevTrack}
                aria-label="Play previous track"
                className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Previous Track (Shift+Left)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={playNextTrack}
                aria-label="Play next track"
                className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                title="Next Track (Shift+Right)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleRepeat}
                aria-label="Toggle repeat mode"
                className={`p-1 rounded-md transition-colors cursor-pointer ${
                  isRepeat ? 'bg-[#1DB954]/20 text-[#1DB954] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title={isRepeat ? 'Repeat Mode: ON' : 'Repeat Mode: OFF'}
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Queue Toggle Button */}
            <button
              type="button"
              onClick={() => setIsQueueOpen((prev) => !prev)}
              aria-label="Toggle Up Next Queue"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isQueueOpen
                  ? 'bg-[#1DB954] text-white shadow-md'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest'
              }`}
              title="Toggle Up Next Queue"
            >
              <ListMusic className="w-4 h-4" />
              <span className="hidden sm:inline">Queue</span>
              {trackList.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-surface-container-lowest text-[10px] text-[#1DB954]">
                  {trackList.length}
                </span>
              )}
            </button>

            {/* Spotify Link */}
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open track ${currentTrack.track_name || currentTrack.trackName} on Spotify.com`}
              className="px-2.5 py-1.5 rounded-xl bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/40 font-mono text-[11px] font-bold transition-all hidden md:inline-flex items-center gap-1"
            >
              <span>Spotify.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Minimize / Maximize Embed */}
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              aria-label={isMinimized ? 'Expand Spotify Embed' : 'Minimize Spotify Embed'}
              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title={isMinimized ? 'Expand Spotify Embed' : 'Minimize Player'}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Close Player */}
            <button
              type="button"
              onClick={() => setCurrentTrack(null)}
              aria-label="Close audio player"
              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direct Official Spotify iFrame Player Widget */}
        {!isMinimized && (
          <div className="animate-in fade-in duration-200">
            <SpotifyPlayerEmbed spotifyTrackUri={spotifyUri} height={152} />
          </div>
        )}
      </div>
    </aside>
  );
});
