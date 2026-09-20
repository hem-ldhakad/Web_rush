/**
 * @file dataService.js
 * @description Data service encapsulating fetch, parsing, BOM removal, and statistical calculation.
 */

import { loadSpotifyData } from '../data/loadSpotifyData';
import { normalizeSpotifyData } from '../data/normalizeSpotifyData';
import { calculateStats } from '../utils/calculateStats';
import { buildMusicJourney } from '../utils/buildMusicJourney';
import { discoverInsights } from '../utils/discoverInsights';

/**
 * Loads, normalizes, and computes metrics for Spotify history dataset.
 * @returns {Promise<{records: Array, stats: Object, eras: Array, insights: Array}>}
 */
export async function fetchAndProcessSpotifyData() {
  const rawRecords = await loadSpotifyData();
  const normalizedRecords = normalizeSpotifyData(rawRecords);
  const stats = calculateStats(normalizedRecords);
  const eras = buildMusicJourney(normalizedRecords);
  const insights = discoverInsights(normalizedRecords, stats);

  return {
    records: normalizedRecords,
    stats,
    eras,
    insights,
  };
}
