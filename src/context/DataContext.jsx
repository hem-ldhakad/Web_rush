import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { loadSpotifyData, loadCustomFile } from '../data/loadSpotifyData';
import { calculateStats } from '../utils/calculateStats';
import { buildMusicJourney } from '../utils/buildMusicJourney';
import { discoverInsights } from '../utils/discoverInsights';

const DataContext = createContext(null);

/**
 * DataProvider Component
 * Manages global dataset state, memoized statistics, era chapters, and discoveries.
 */
export const DataProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [customFileLoaded, setCustomFileLoaded] = useState(false);

  const loadDefaultData = useCallback(() => {
    setLoading(true);
    setError(null);
    loadSpotifyData()
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load default dataset:', err);
        setError(err.message || 'Failed to parse dataset');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadDefaultData();
  }, [loadDefaultData]);

  const handleUploadFile = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadCustomFile(file);
      setRecords(data);
      setCustomFileLoaded(true);
      setLoading(false);
      return data;
    } catch (err) {
      console.error('Failed to parse custom file:', err);
      setError(err.message || 'Failed to process file');
      setLoading(false);
      throw err;
    }
  }, []);

  // Memoized stats & derivative structures
  const stats = useMemo(() => calculateStats(records), [records]);
  const eras = useMemo(() => buildMusicJourney(records), [records]);
  const insights = useMemo(() => discoverInsights(records), [records]);

  const value = useMemo(
    () => ({
      records,
      stats,
      eras,
      insights,
      loading,
      error,
      selectedRecord,
      setSelectedRecord,
      customFileLoaded,
      handleUploadFile,
      reloadDefaultData: loadDefaultData,
    }),
    [records, stats, eras, insights, loading, error, selectedRecord, customFileLoaded, handleUploadFile, loadDefaultData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

/**
 * Hook to consume DataContext
 */
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
};

