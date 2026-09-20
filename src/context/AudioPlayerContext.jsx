import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Initialize theme on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const playTrack = (track, list = []) => {
    if (list && list.length > 0) {
      setTrackList(list);
    }
    setCurrentTrack(track);
  };

  const playNextTrack = () => {
    if (!currentTrack || trackList.length === 0) return;
    const idx = trackList.findIndex((t) => t.id === currentTrack.id);
    if (idx !== -1 && idx < trackList.length - 1) {
      setCurrentTrack(trackList[idx + 1]);
    }
  };

  const playPrevTrack = () => {
    if (!currentTrack || trackList.length === 0) return;
    const idx = trackList.findIndex((t) => t.id === currentTrack.id);
    if (idx > 0) {
      setCurrentTrack(trackList[idx - 1]);
    }
  };

  const value = {
    currentTrack,
    setCurrentTrack,
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
