import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getSpotifyWebUrl } from '../utils/exportData';

const AudioPlayerContext = createContext(null);

// High quality audio streams for realistic web player playback
const DEMO_AUDIO_STREAMS = [
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', // Chill indie acoustic
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8bbf9d02d.mp3', // Rock track
  'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f604d0.mp3', // Modern pop guitar
  'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3', // Ambient electronic
];

export function AudioPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackList, setTrackList] = useState([]); // List of current queue tracks
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [volume, setVolume] = useState(0.8);
  const [theme, setTheme] = useState('dark');

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize Theme
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

  // HTML5 Audio setup
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(100);
      playNextTrack();
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onerror = () => {
      console.warn('Audio stream fallback...');
    };

    return () => {
      audio.pause();
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = (track, list = []) => {
    if (list && list.length > 0) {
      setTrackList(list);
    }

    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    setCurrentTrack(track);
    setProgress(0);

    // Pick a demo audio stream deterministically based on track id
    const streamIndex = Math.abs(Number(track.id) || 0) % DEMO_AUDIO_STREAMS.length;
    const streamUrl = DEMO_AUDIO_STREAMS[streamIndex];

    if (audioRef.current) {
      audioRef.current.src = streamUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio autoplay prevented or failed:', err);
        setIsPlaying(true); // fall back to UI progress animation
      });
    } else {
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playNextTrack = () => {
    if (!currentTrack || trackList.length === 0) return;
    const idx = trackList.findIndex((t) => t.id === currentTrack.id);
    if (idx !== -1 && idx < trackList.length - 1) {
      playTrack(trackList[idx + 1], trackList);
    }
  };

  const playPrevTrack = () => {
    if (!currentTrack || trackList.length === 0) return;
    const idx = trackList.findIndex((t) => t.id === currentTrack.id);
    if (idx > 0) {
      playTrack(trackList[idx - 1], trackList);
    }
  };

  const handleSeek = (newProgressPercent) => {
    setProgress(newProgressPercent);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgressPercent / 100) * audioRef.current.duration;
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    progress,
    setProgress: handleSeek,
    volume,
    setVolume,
    theme,
    toggleTheme,
    playTrack,
    togglePlayPause,
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
