import React, { useState } from 'react';
import { Disc, Music, Play } from 'lucide-react';
import { getAlbumArtColor, getSpotifyTrackId } from '../utils/exportData';
import { SpotifyIcon } from './SpotifyIcon';

/**
 * TrackAlbumArt Component
 * Renders album cover artwork thumbnail with Spotify music song icon, vinyl record grooves, artist initials, and green Spotify badge.
 * Supports both `track` object prop and individual `trackName`/`artistName` props.
 */
export function TrackAlbumArt({
  track,
  trackName,
  artistName,
  size = "md",
  showHoverBadge = true,
  className = ""
}) {
  const [imageError, setImageError] = useState(false);

  const finalTrackName = track?.track_name || trackName || 'Song';
  const finalArtistName = track?.artist_name || artistName || 'Artist';
  const spotifyUri = track?.spotify_track_uri || track?.uri;
  const trackId = getSpotifyTrackId(spotifyUri);

  const sizeClasses = {
    xs: "w-7 h-7 text-[8px]",
    sm: "w-8 h-8 text-[9px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-sm",
    xl: "w-20 h-20 text-base",
  };

  const bgColor = getAlbumArtColor(finalArtistName || finalTrackName || 'Spotify');
  const initials = (finalArtistName || 'SP').slice(0, 2).toUpperCase();

  // Spotify iFrame embed artwork image fallback
  const albumImgUrl = trackId ? `https://i.scdn.co/image/${trackId}` : null;

  return (
    <div
      role="img"
      aria-label={`Album art for ${finalTrackName} by ${finalArtistName}`}
      className={`rounded-xl shrink-0 flex flex-col items-center justify-center font-syne font-bold text-white shadow-md relative overflow-hidden group border border-white/20 select-none ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Rich Multi-Tone Album Art Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-white/20 pointer-events-none z-0"></div>

      {/* Simulated Vinyl Record Outer Groove Ring */}
      <div className="w-full h-full absolute inset-0 rounded-xl border border-white/15 flex items-center justify-center pointer-events-none z-[1]">
        <Disc className="w-3/5 h-3/5 text-white/20 group-hover:rotate-180 transition-transform duration-700 ease-out" />
      </div>

      {/* Music Song Note Icon Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Music className="w-3.5 h-3.5 text-white/95 drop-shadow-md group-hover:scale-110 transition-transform mb-0.5" />
        <span className="font-syne font-extrabold tracking-wider drop-shadow-md leading-none group-hover:scale-95 transition-transform text-[9px] uppercase">
          {initials}
        </span>
      </div>

      {/* Spotify Green Badge Ribbon with Spotify Logo & Song Icon */}
      <div className="absolute bottom-0 right-0 px-1 py-0.5 bg-[#1DB954] rounded-tl-md shadow-sm z-10 flex items-center gap-0.5">
        <SpotifyIcon className="w-2.5 h-2.5 text-white" />
      </div>

      {/* Hover Direct Play Overlay */}
      {showHoverBadge && (
        <div className="absolute inset-0 bg-[#1DB954]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />
        </div>
      )}
    </div>
  );
}
