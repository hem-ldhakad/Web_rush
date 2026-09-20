/**
 * Normalizes a single raw row object from spotify_history.csv
 */
export function normalizeRecord(row, index) {
  const uri = row.spotify_track_uri || row['\uFEFFspotify_track_uri'] || `track-${index}`;
  const tsStr = row.ts ? String(row.ts).trim() : '';
  
  let dateObj = null;
  let year = null;
  let month = null;
  let yearMonth = null;
  let hour = null;
  let isLateNight = false;

  if (tsStr) {
    // Expected format: YYYY-MM-DD HH:mm:ss or ISO
    const parts = tsStr.split(' ');
    if (parts.length >= 2) {
      const [datePart, timePart] = parts;
      const [y, m, d] = datePart.split('-');
      const [h, min, s] = timePart.split(':');
      year = parseInt(y, 10);
      month = parseInt(m, 10);
      hour = parseInt(h, 10);
      if (!isNaN(year) && !isNaN(month)) {
        yearMonth = `${year}-${String(month).padStart(2, '0')}`;
      }
      if (!isNaN(hour)) {
        isLateNight = hour >= 0 && hour < 5;
      }
    }
    dateObj = new Date(tsStr.replace(' ', 'T') + 'Z');
    if (isNaN(dateObj.getTime())) {
      dateObj = new Date(tsStr);
    }
  }

  const msPlayed = parseInt(row.ms_played, 10) || 0;
  const trackName = (row.track_name || 'Unknown Track').trim();
  const artistName = (row.artist_name || 'Unknown Artist').trim();
  const albumName = (row.album_name || 'Unknown Album').trim();
  const platform = (row.platform || 'unknown').trim();
  const reasonStart = (row.reason_start || 'unknown').trim();
  const reasonEnd = (row.reason_end || 'unknown').trim();
  
  const shuffle = String(row.shuffle).toUpperCase() === 'TRUE';
  const skipped = String(row.skipped).toUpperCase() === 'TRUE';

  return {
    id: index,
    spotify_track_uri: uri,
    ts: tsStr,
    date: dateObj,
    year: year || 2024,
    month: month || 1,
    yearMonth: yearMonth || '2024-01',
    hour: hour !== null ? hour : 12,
    isLateNight,
    platform,
    ms_played: msPlayed,
    secondsPlayed: Math.round(msPlayed / 1000),
    minutesPlayed: parseFloat((msPlayed / 60000).toFixed(2)),
    track_name: trackName,
    artist_name: artistName,
    album_name: albumName,
    reason_start: reasonStart,
    reason_end: reasonEnd,
    shuffle,
    skipped,
  };
}

/**
 * Normalizes an array of raw CSV rows.
 */
export function normalizeSpotifyData(rawRows) {
  if (!Array.isArray(rawRows)) return [];
  const validRecords = [];
  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (!row) continue;
    // Ensure we have at least artist or track name
    if (row.artist_name || row.track_name || row.ts) {
      validRecords.push(normalizeRecord(row, i));
    }
  }
  // Sort by timestamp chronologically
  return validRecords.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date.getTime() - b.date.getTime();
  });
}
