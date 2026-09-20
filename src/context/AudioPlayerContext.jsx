import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    try {
      const saved = localStorage.getItem('life_archive_liked_tracks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save liked tracks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('life_archive_liked_tracks', JSON.stringify(likedTrackIds));
    } catch {
      // Ignore storage errors
    }
  }, [likedTrackIds]);

  // Toggle Liked Track
  const toggleLikeTrack = useCallback((trackId) => {
    if (!trackId) return;
    setLikedTrackIds((prev) =>
      prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
    );
  }, []);

  const isTrackLiked = useCallback((trackId) => {
    return likedTrackIds.includes(trackId);
  }, [likedTrackIds]);

  // Initialize theme on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Helper to normalize track objects universally
  const normalizeTrackObj = (raw) => {
    if (!raw) return null;
    const tName = raw.track_name || raw.trackName || 'Unknown Song';
    const aName = raw.artist_name || raw.artistName || 'Unknown Artist';
    const albName = raw.album_name || raw.albumName || 'Unknown Album';
    const uri = raw.spotify_track_uri || raw.uri || '';
    const id = raw.id || uri || `${tName}-${aName}`;
    const secondsPlayed = raw.secondsPlayed || Math.round((raw.ms_played || raw.totalMs || 210000) / 1000);

    return {
      ...raw,
      id,
      track_name: tName,
      trackName: tName,
      artist_name: aName,
      artistName: aName,
      album_name: albName,
      albumName: albName,
      spotify_track_uri: uri,
      uri: uri,
      secondsPlayed,
    };
  };

  const playTrack = useCallback((rawTrack, list = []) => {
    if (!rawTrack) return;
    const normalized = normalizeTrackObj(rawTrack);

    if (list && list.length > 0) {
      const normalizedList = list.map(normalizeTrackObj).filter(Boolean);
      setTrackList(normalizedList);
    } else {
      setTrackList((prev) => {
        if (!prev.some((t) => (t.spotify_track_uri || t.id) === (normalized.spotify_track_uri || normalized.id))) {
          return [...prev, normalized];
        }
        return prev;
      });
    }

    setCurrentTrack(normalized);
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const playNextTrack = useCallback(() => {
    if (!currentTrack || trackList.length === 0) return;

    if (isRepeat) {
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * trackList.length);
      setCurrentTrack(trackList[randomIndex]);
      setIsPlaying(true);
      return;
    }

    const currentId = currentTrack.spotify_track_uri || currentTrack.id;
    const idx = trackList.findIndex((t) => (t.spotify_track_uri || t.id) === currentId);
    if (idx !== -1 && idx < trackList.length - 1) {
      setCurrentTrack(trackList[idx + 1]);
      setIsPlaying(true);
    } else if (trackList.length > 0) {
      setCurrentTrack(trackList[0]); // Loop back to start of queue
      setIsPlaying(true);
    }
  }, [currentTrack, trackList, isRepeat, isShuffle]);

  const playPrevTrack = useCallback(() => {
    if (!currentTrack || trackList.length === 0) return;
    const currentId = currentTrack.spotify_track_uri || currentTrack.id;
    const idx = trackList.findIndex((t) => (t.spotify_track_uri || t.id) === currentId);
    if (idx > 0) {
      setCurrentTrack(trackList[idx - 1]);
      setIsPlaying(true);
    } else if (trackList.length > 0) {
      setCurrentTrack(trackList[trackList.length - 1]);
      setIsPlaying(true);
    }
  }, [currentTrack, trackList]);

  // Global Keyboard Controls for Music Player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (!currentTrack) return;

      if (e.code === 'ArrowRight' && e.shiftKey) {
        e.preventDefault();
        playNextTrack();
      } else if (e.code === 'ArrowLeft' && e.shiftKey) {
        e.preventDefault();
        playPrevTrack();
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        const trackId = currentTrack.spotify_track_uri || currentTrack.id;
        if (trackId) toggleLikeTrack(trackId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrack, playNextTrack, playPrevTrack, toggleLikeTrack]);

  const value = {
    currentTrack,
    setCurrentTrack,
    trackList,
    setTrackList,
    isPlaying,
    setIsPlaying,
    togglePlayPause,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    likedTrackIds,
    toggleLikeTrack,
    isTrackLiked,
    theme,
    toggleTheme,
    playTrack,
    playNextTrack,
    playPrevTrack,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return ctx;
};
