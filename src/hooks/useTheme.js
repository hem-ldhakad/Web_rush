import { useAudioPlayer } from '../context/AudioPlayerContext';

/**
 * Custom Hook: useTheme
 * Provides active theme state and theme switching capabilities.
 *
 * @returns {Object} Theme state and toggle function
 */
export function useTheme() {
  const context = useAudioPlayer();
  if (!context) {
    throw new Error('useTheme must be used within AudioPlayerProvider');
  }

  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    isDark: context.theme === 'dark',
  };
}
