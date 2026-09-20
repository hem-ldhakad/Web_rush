import React from 'react';

/**
 * SpotifyPlayerEmbed Component
 * Renders an official Spotify iFrame player widget.
 * Uses key={cleanId} on the iframe to force a complete DOM remount whenever the active track changes.
 */
export function SpotifyPlayerEmbed({ spotifyTrackUri, height = 152 }) {
  if (!spotifyTrackUri) return null;

  // Clean URI to extract Spotify track ID
  const cleanId = String(spotifyTrackUri).replace('spotify:track:', '').trim();

  if (!cleanId || cleanId.length < 5) return null;

  const embedUrl = `https://open.spotify.com/embed/track/${cleanId}?utm_source=generator&theme=0`;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-surface-container-highest bg-surface-container-low">
      <iframe
        key={cleanId}
        title={`Spotify Web Player ${cleanId}`}
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
      ></iframe>
    </div>
  );
}
