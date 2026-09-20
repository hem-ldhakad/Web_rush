import { useData } from '../context/DataContext';

/**
 * Custom Hook: useSpotifyHistory
 * Provides streamlined access to global dataset records, calculated metrics, and era chapters.
 *
 * @returns {Object} Dataset state and utility functions
 */
export function useSpotifyHistory() {
  const context = useData();
  if (!context) {
    throw new Error('useSpotifyHistory must be used within a DataProvider');
  }

  return {
    records: context.records,
    stats: context.stats,
    eras: context.eras,
    insights: context.insights,
    loading: context.loading,
    error: context.error,
    selectedRecord: context.selectedRecord,
    setSelectedRecord: context.setSelectedRecord,
  };
}
