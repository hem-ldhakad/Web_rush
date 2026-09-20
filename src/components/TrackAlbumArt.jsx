import React from 'react';
import { Disc, Play } from 'lucide-react';
import { getAlbumArtColor } from '../utils/exportData';
import { SpotifyIcon } from './SpotifyIcon';

export function TrackAlbumArt({ trackName, artistName, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-sm",
    xl: "w-20 h-20 text-base",
  };

  const bgColor = getAlbumArtColor(artistName || trackName || 'Spotify');
  const initials = (artistName || 'SP').slice(0, 2).toUpperCase();

  return (
    <div
      className={`rounded-lg shrink-0 flex flex-col items-center justify-center font-syne font-bold text-white shadow-md relative overflow-hidden group border border-white/10 ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-white/20 pointer-events-none"></div>

      {/* Simulated Vinyl Groove Ring */}
      <div className="w-full h-full absolute inset-0 rounded-lg border border-white/15 flex items-center justify-center pointer-events-none">
        <Disc className="w-1/2 h-1/2 text-white/30 group-hover:rotate-90 transition-transform duration-700 ease-out" />
      </div>

      {/* Artist Initials Badge */}
      <span className="relative z-10 font-syne font-bold tracking-widest drop-shadow-md text-[10px] sm:text-xs group-hover:scale-95 transition-transform">
        {initials}
      </span>

      {/* Spotify Green Accent Ribbon */}
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#1DB954] rounded-tl-sm shadow-sm z-10 flex items-center justify-center">
        <SpotifyIcon className="w-2 h-2 text-white" />
      </div>

      {/* Hover Direct Play Overlay */}
      <div className="absolute inset-0 bg-[#1DB954]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
        <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />
      </div>
    </div>
  );
}

