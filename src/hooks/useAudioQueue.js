import { useAudioPlayer } from '../context/AudioPlayerContext';

/**
 * Custom Hook: useAudioQueue
 * Manages active Spotify track playback and queue navigation.
 *
 * @returns {Object} Queue state and navigation functions
 */
export function useAudioQueue() {
  const context = useAudioPlayer();
  if (!context) {
    throw new Error('useAudioQueue must be used within AudioPlayerProvider');
  }

  return {
    currentTrack: context.currentTrack,
    setCurrentTrack: context.setCurrentTrack,
    playTrack: context.playTrack,
    playNextTrack: context.playNextTrack,
    playPrevTrack: context.playPrevTrack,
  };
}
