import React, { useState } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, Disc, Volume2, ExternalLink, X, SkipBack, SkipForward, Music } from 'lucide-react';
import { SpotifyPlayerEmbed } from './SpotifyPlayerEmbed';
import { getSpotifyWebUrl } from '../utils/exportData';

export function AudioPlayerBar() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    progress,
    setProgress,
    volume,
    setVolume,
    playNextTrack,
    playPrevTrack,
  } = useAudioPlayer();

  const [showEmbed, setShowEmbed] = useState(false);

  if (!currentTrack) return null;

  const minutes = Math.floor(currentTrack.secondsPlayed / 60);
  const seconds = currentTrack.secondsPlayed % 60;
  const durationStr = `${minutes}:${String(seconds).padStart(2, '0')}`;

  const currentSeconds = Math.round((progress / 100) * currentTrack.secondsPlayed);
  const currMin = Math.floor(currentSeconds / 60);
  const currSec = currentSeconds % 60;
  const elapsedStr = `${currMin}:${String(currSec).padStart(2, '0')}`;

  const spotifyUrl = getSpotifyWebUrl(currentTrack.spotify_track_uri);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 flex flex-col gap-2">
      {/* Optional Embedded Official Spotify Web Player Drawer */}
      {showEmbed && (
        <div className="w-full max-w-xl mx-auto animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex justify-end mb-1">
            <button
              onClick={() => setShowEmbed(false)}
              className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface-variant text-[11px] font-mono hover:text-on-surface"
            >
              Hide Spotify Player Widget
            </button>
          </div>
          <SpotifyPlayerEmbed spotifyTrackUri={currentTrack.spotify_track_uri} height={152} />
        </div>
      )}

      {/* Main Floating Audio Player Bar */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-highest rounded-2xl p-4 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 animate-in slide-in-from-bottom-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Track info & Cover Disc */}
          <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
            <div
              onClick={() => setShowEmbed(!showEmbed)}
              className={`w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container p-1 shadow-md shrink-0 flex items-center justify-center relative cursor-pointer group ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
              title="Click to toggle Spotify Web Player widget"
            >
              <div className="w-full h-full rounded-full bg-on-surface flex items-center justify-center border border-surface-container-lowest">
                <Disc className="w-6 h-6 text-primary-container group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-syne font-semibold text-sm text-on-surface truncate flex items-center gap-1.5">
                <span className="truncate">{currentTrack.track_name}</span>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-3 shrink-0">
                    <span className="w-0.5 h-1.5 bg-primary rounded-full animate-wave-1"></span>
                    <span className="w-0.5 h-3 bg-primary rounded-full animate-wave-2"></span>
                    <span className="w-0.5 h-2 bg-primary rounded-full animate-wave-3"></span>
                  </div>
                )}
              </span>
              <span className="font-mono text-xs text-on-surface-variant truncate">
                {currentTrack.artist_name} • <span className="italic">{currentTrack.album_name}</span>
              </span>
            </div>
          </div>

          {/* Playback Controls & Progress Bar */}
          <div className="flex flex-col items-center gap-1.5 w-full sm:w-1/3">
            <div className="flex items-center gap-4">
              <button
                onClick={playPrevTrack}
                className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-primary hover:bg-secondary text-on-primary flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={playNextTrack}
                className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Interactive Progress Scrubber Slider */}
            <div className="w-full flex items-center gap-2 font-mono text-[10px] text-on-surface-variant">
              <span>{elapsedStr}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span>{durationStr}</span>
            </div>
          </div>

          {/* Volume, Spotify Embed Toggle & External Spotify Action */}
          <div className="flex items-center justify-end gap-3 w-full sm:w-1/3">
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
                showEmbed
                  ? 'bg-primary text-on-primary border-primary font-bold'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-surface-container-highest'
              }`}
              title="Toggle Spotify embedded player iframe"
            >
              <Music className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Embed</span>
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-on-surface-variant" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-primary-container/20 hover:bg-primary-container/30 border border-primary-container/40 text-on-primary-container font-mono text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
