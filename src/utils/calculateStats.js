/**
 * Calculates quantitative summary statistics from normalized records.
 */
export function calculateStats(records) {
  if (!records || records.length === 0) {
    return {
      totalPlays: 0,
      totalHours: 0,
      uniqueTracks: 0,
      uniqueArtists: 0,
      topArtist: { name: 'N/A', count: 0, totalMs: 0 },
      topArtists: [],
      topTracks: [],
      topAlbums: [],
      dateRange: { start: 'N/A', end: 'N/A', days: 0, startDateStr: '', endDateStr: '' },
      hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 })),
      lateNightPlays: 0,
      lateNightPercentage: 0,
      shuffleCount: 0,
      shufflePercentage: 0,
      skippedCount: 0,
      skippedPercentage: 0,
      platformBreakdown: {},
    };
  }

  const totalPlays = records.length;
  let totalMs = 0;
  
  const artistMap = new Map();
  const trackMap = new Map();
  const albumMap = new Map();
  const platformMap = new Map();
  const hourCounts = new Array(24).fill(0);
  
  let lateNightPlays = 0;
  let shuffleCount = 0;
  let skippedCount = 0;

  let minDate = records[0]?.date;
  let maxDate = records[records.length - 1]?.date;

  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    totalMs += rec.ms_played;

    // Track min/max date
    if (rec.date) {
      if (!minDate || rec.date < minDate) minDate = rec.date;
      if (!maxDate || rec.date > maxDate) maxDate = rec.date;
    }

    // Artist stats
    if (rec.artist_name) {
      const existing = artistMap.get(rec.artist_name) || { count: 0, totalMs: 0 };
      existing.count += 1;
      existing.totalMs += rec.ms_played;
      artistMap.set(rec.artist_name, existing);
    }

    // Track stats
    if (rec.track_name && rec.artist_name) {
      const trackKey = `${rec.artist_name} — ${rec.track_name}`;
      const existing = trackMap.get(trackKey) || {
        track_name: rec.track_name,
        trackName: rec.track_name,
        artist_name: rec.artist_name,
        artistName: rec.artist_name,
        album_name: rec.album_name,
        albumName: rec.album_name,
        spotify_track_uri: rec.spotify_track_uri,
        uri: rec.spotify_track_uri,
        count: 0,
        totalMs: 0,
        secondsPlayed: rec.secondsPlayed || Math.round(rec.ms_played / 1000),
      };
      existing.count += 1;
      existing.totalMs += rec.ms_played;
      trackMap.set(trackKey, existing);
    }

    // Album stats
    if (rec.album_name && rec.album_name !== 'Unknown Album') {
      const albumKey = `${rec.artist_name} — ${rec.album_name}`;
      const existing = albumMap.get(albumKey) || {
        album_name: rec.album_name,
        albumName: rec.album_name,
        artist_name: rec.artist_name,
        artistName: rec.artist_name,
        count: 0,
      };
      existing.count += 1;
      albumMap.set(albumKey, existing);
    }

    // Platform stats
    if (rec.platform) {
      const curr = platformMap.get(rec.platform) || 0;
      platformMap.set(rec.platform, curr + 1);
    }

    // Hour stats
    if (rec.hour >= 0 && rec.hour < 24) {
      hourCounts[rec.hour] += 1;
    }

    // Late night
    if (rec.isLateNight) {
      lateNightPlays += 1;
    }

    // Shuffle & Skipped
    if (rec.shuffle) shuffleCount += 1;
    if (rec.skipped) skippedCount += 1;
  }

  // Top artists array
  const sortedArtists = Array.from(artistMap.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      totalMs: data.totalMs,
      totalHours: Math.round(data.totalMs / 3600000),
      percentage: parseFloat(((data.count / totalPlays) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count);

  // Top tracks array
  const sortedTracks = Array.from(trackMap.values())
    .sort((a, b) => b.count - a.count);

  // Top albums array
  const sortedAlbums = Array.from(albumMap.values())
    .sort((a, b) => b.count - a.count);

  // Date range formatting
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let startDateStr = '2013';
  let endDateStr = '2024';
  let daysDiff = 0;

  if (minDate && maxDate) {
    startDateStr = `${months[minDate.getMonth()]} ${minDate.getFullYear()}`;
    endDateStr = `${months[maxDate.getMonth()]} ${maxDate.getFullYear()}`;
    const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
    daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const platformBreakdown = Object.fromEntries(platformMap);

  return {
    totalPlays,
    totalHours: Math.round(totalMs / 3600000),
    uniqueTracks: trackMap.size,
    uniqueArtists: artistMap.size,
    topArtist: sortedArtists[0] || { name: 'N/A', count: 0, totalMs: 0 },
    topArtists: sortedArtists,
    topTracks: sortedTracks,
    topAlbums: sortedAlbums,
    dateRange: {
      start: startDateStr,
      end: endDateStr,
      days: daysDiff,
      fullStr: `${startDateStr} – ${endDateStr}`,
    },
    hourlyDistribution: hourCounts.map((count, hour) => ({ hour, count })),
    lateNightPlays,
    lateNightPercentage: parseFloat(((lateNightPlays / totalPlays) * 100).toFixed(1)),
    shuffleCount,
    shufflePercentage: parseFloat(((shuffleCount / totalPlays) * 100).toFixed(1)),
    skippedCount,
    skippedPercentage: parseFloat(((skippedCount / totalPlays) * 100).toFixed(1)),
    platformBreakdown,
  };
}
