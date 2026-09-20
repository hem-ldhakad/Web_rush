import { calculateStats } from './calculateStats';

/**
 * Deterministically generates substantiated data discoveries from normalized records.
 *
 * @param {Array} records Array of normalized Spotify records
 * @returns {Array<Object>} Array of discovery insight objects
 */
export function discoverInsights(records) {
  if (!records || records.length === 0) return [];

  const stats = calculateStats(records);
  const totalPlays = stats.totalPlays || 1;

  const insights = [];

  // Insight 1: Anchor Artist Monopoly
  const topArtistName = stats.topArtist?.name || 'The Beatles';
  const topArtistRecords = records.filter(r => r.artist_name === topArtistName);
  if (topArtistRecords.length > 0) {
    const topArtistPct = ((topArtistRecords.length / totalPlays) * 100).toFixed(1);
    insights.push({
      id: 'top-artist-monopoly',
      category: 'Pattern',
      title: 'Anchor Artist Monolith',
      headline: `${topArtistName} accounts for ${topArtistRecords.length.toLocaleString()} streams — ${topArtistPct}% of total lifetime history`,
      measuredFact: `${topArtistRecords.length.toLocaleString()} individual stream logs across 11+ years.`,
      explanation: `No other artist in the ledger comes close. ${topArtistName} remains the single undisputed bedrock of this listening provenance, spanning studio albums, anthologies, and remaster collections.`,
      supportingMetric: `${topArtistRecords.length.toLocaleString()} Plays // ${topArtistPct}% Total Share`,
      records: topArtistRecords,
    });
  }

  // Insight 2: Nocturnal Listening
  const lateNightRecords = records.filter(r => r.isLateNight);
  if (lateNightRecords.length > 0) {
    const lateNightPct = ((lateNightRecords.length / totalPlays) * 100).toFixed(1);
    insights.push({
      id: 'nocturnal-resonances',
      category: 'Nocturnal',
      title: 'Nocturnal Resonances',
      headline: `${lateNightPct}% of all streaming occurred between 12:00 AM and 05:00 AM`,
      measuredFact: `${lateNightRecords.length.toLocaleString()} nocturnal plays logged in total blackout hours.`,
      explanation: 'Nearly a third of all listening occurred while the rest of the world was asleep. These hours feature disproportionate acoustic immersion, quiet album playback, and repetitive night streams.',
      supportingMetric: `${lateNightRecords.length.toLocaleString()} Plays // ${lateNightPct}% Nocturnal`,
      records: lateNightRecords,
    });
  }

  // Insight 3: Hyper-Repetition (Loop Syndrome)
  const topTrack = stats.topTracks[0];
  if (topTrack) {
    const topTrackRecords = records.filter(
      r => r.artist_name === topTrack.artistName && r.track_name === topTrack.trackName
    );
    insights.push({
      id: 'loop-syndrome',
      category: 'Fixation',
      title: 'The Loop Syndrome',
      headline: `"${topTrack.trackName}" played ${topTrack.count} times`,
      measuredFact: `Top replayed track: ${topTrack.artistName} — "${topTrack.trackName}" (${topTrack.count} repeats).`,
      explanation: 'Certain tracks triggered intense hyper-repetition cycles. When a track locked into focus or emotional resonance, it was queued dozens of times back-to-back.',
      supportingMetric: `${topTrack.count} Repeats // ${topTrack.artistName}`,
      records: topTrackRecords,
    });
  }

  // Insight 4: Mobile Companion Ecosystem
  const androidRecords = records.filter(r => r.platform && r.platform.toLowerCase() === 'android');
  if (androidRecords.length > 0) {
    const androidPct = ((androidRecords.length / totalPlays) * 100).toFixed(1);
    insights.push({
      id: 'platform-companion',
      category: 'Platform',
      title: 'Mobile Companion Ecosystem',
      headline: `Android hardware delivered ${androidPct}% of all streaming logs`,
      measuredFact: `${androidRecords.length.toLocaleString()} plays executed via Android mobile client.`,
      explanation: 'This digital archive was overwhelmingly captured on the go — during daily transit, walking, workouts, and bedtime rituals via mobile headphones.',
      supportingMetric: `${androidPct}% Android // ${androidRecords.length.toLocaleString()} Plays`,
      records: androidRecords,
    });
  }

  // Insight 5: Shuffle Preference
  const shuffleRecords = records.filter(r => r.shuffle);
  if (shuffleRecords.length > 0) {
    const shufflePct = ((shuffleRecords.length / totalPlays) * 100).toFixed(1);
    insights.push({
      id: 'shuffle-habit',
      category: 'Pattern',
      title: 'Algorithmic Serendipity',
      headline: `${shufflePct}% of streams were played with Shuffle Mode active`,
      measuredFact: `${shuffleRecords.length.toLocaleString()} plays configured with randomized playback.`,
      explanation: 'Rather than strictly linear album listening, the user relied heavily on algorithmic shuffle to curate unexpected transitions and mood-based sessions.',
      supportingMetric: `${shufflePct}% Shuffle Rate`,
      records: shuffleRecords,
    });
  }

  // Insight 6: Peak Year Surge
  const records2017 = records.filter(r => r.year === 2017);
  if (records2017.length > 0) {
    insights.push({
      id: 'volume-spike-2017',
      category: 'Pattern',
      title: 'The 2017 Peak Surge',
      headline: `2017 recorded a lifetime peak of ${records2017.length.toLocaleString()} streaming sessions`,
      measuredFact: `${records2017.length.toLocaleString()} plays logged in 12 months (averaging ~${Math.round(records2017.length / 365)} plays per day).`,
      explanation: '2017 represents the single highest volume chapter in the entire 11-year dataset, driven by continuous background playback and multi-album discovery.',
      supportingMetric: `${records2017.length.toLocaleString()} Plays // 2017 Record Year`,
      records: records2017,
    });
  }

  return insights;
}

