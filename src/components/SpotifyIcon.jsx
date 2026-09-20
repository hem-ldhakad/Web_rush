import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getSpotifyWebUrl } from '../utils/exportData';

export function SpotifyIcon({ className = "w-4 h-4 text-[#1DB954]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.219.359-.692.472-1.05.253-2.879-1.758-6.502-2.157-10.77-1.18-.409.093-.815-.162-.908-.571-.093-.409.162-.815.571-.908 4.676-1.07 8.687-.611 11.905 1.354.359.219.472.692.252 1.056zm1.472-3.272c-.276.449-.863.591-1.312.315-3.294-2.023-8.318-2.609-12.215-1.427-.504.153-1.036-.134-1.188-.638-.153-.504.134-1.036.638-1.188 4.453-1.352 9.992-.705 13.762 1.616.449.276.591.863.315 1.322zm.127-3.41c-3.95-2.346-10.457-2.562-14.225-1.419-.607.184-1.246-.164-1.43-.771-.184-.607.164-1.246.771-1.43 4.321-1.312 11.493-1.05 16.027 1.64.545.324.726 1.033.402 1.578-.324.545-1.033.726-1.545.402z" />
    </svg>
  );
}

export function SpotifyPlayButton({ spotifyTrackUri, size = "md", label = "Play on Spotify" }) {
  const spotifyUrl = getSpotifyWebUrl(spotifyTrackUri);

  const sizeClasses = {
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-3.5 py-1.5 text-xs",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <a
      href={spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-2 rounded-full bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/40 font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-sm group ${sizeClasses[size]}`}
      title="Play direct song on Spotify"
    >
      <SpotifyIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
      <span>{label}</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
