/**
 * @file spotifyApiService.js
 * @description Spotify API Service implementing query_songs and paginate_songs with searchV2.tracksV2.items schema.
 */

/**
 * Formats a record into Spotify GraphQL searchV2 track item structure
 */
export function formatTrackItem(record, idx) {
  const name = record.track_name || record.trackName || 'Unknown Track';
  const artistName = record.artist_name || record.artistName || 'Unknown Artist';
  const albumName = record.album_name || record.albumName || 'Unknown Album';
  const uri = record.spotify_track_uri || record.uri || `spotify:track:${idx}`;

  return {
    item: {
      data: {
        id: record.id || uri,
        name: name,
        uri: uri,
        albumOfTrack: {
          name: albumName,
        },
        artists: {
          items: [
            {
              profile: {
                name: artistName,
              },
            },
          ],
        },
        secondsPlayed: record.secondsPlayed || 210,
        rawRecord: record,
      },
    },
  };
}

/**
 * Query songs matching a query string (e.g., "weezer"), returning Spotify searchV2 schema object.
 * @param {Array} records - Dataset records array
 * @param {string} query - Query string (e.g., "weezer")
 * @param {number} limit - Max number of songs to return (default: 20)
 */
export function querySongs(records = [], query = '', limit = 20) {
  if (!Array.isArray(records)) return { data: { searchV2: { tracksV2: { items: [] } } } };

  const q = String(query).toLowerCase().trim();
  let matches = records;

  if (q) {
    matches = records.filter(
      (r) =>
        (r.track_name && r.track_name.toLowerCase().includes(q)) ||
        (r.artist_name && r.artist_name.toLowerCase().includes(q)) ||
        (r.album_name && r.album_name.toLowerCase().includes(q))
    );
  }

  const sliced = matches.slice(0, limit);
  const items = sliced.map((r, idx) => formatTrackItem(r, idx));

  return {
    data: {
      searchV2: {
        tracksV2: {
          items: items,
        },
      },
    },
  };
}

/**
 * Generator function to paginate songs matching query in batches of 100
 * @param {Array} records - Dataset records array
 * @param {string} query - Query string (e.g., "weezer")
 * @param {number} batchSize - Batch size (default: 100)
 */
export function* paginateSongs(records = [], query = '', batchSize = 100) {
  const q = String(query).toLowerCase().trim();
  let matches = records;

  if (q) {
    matches = records.filter(
      (r) =>
        (r.track_name && r.track_name.toLowerCase().includes(q)) ||
        (r.artist_name && r.artist_name.toLowerCase().includes(q)) ||
        (r.album_name && r.album_name.toLowerCase().includes(q))
    );
  }

  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = matches.slice(i, i + batchSize);
    yield batch.map((r, idx) => formatTrackItem(r, i + idx));
  }
}

/**
 * Class representation of Spotipy-like Song API client for object-oriented querying and pagination.
 */
export class Song {
  constructor(records = []) {
    this.records = records;
  }

  /**
   * Set or update dataset records
   */
  setRecords(records) {
    this.records = records;
  }

  /**
   * Query songs matching a string with limit
   */
  query_songs(query = '', limit = 20) {
    return querySongs(this.records, query, limit);
  }

  /**
   * Paginate songs matching a string in batches
   */
  paginate_songs(query = '', batchSize = 100) {
    return paginateSongs(this.records, query, batchSize);
  }
}

/**
 * Normalizes Spotify searchV2 items array into flat track objects for playback
 */
export function extractTracksFromSearchV2(items = []) {
  if (!Array.isArray(items)) return [];
  return items.map((itemObj) => {
    const d = itemObj?.item?.data || {};
    const artistName = d?.artists?.items?.[0]?.profile?.name || 'Unknown Artist';
    const albumName = d?.albumOfTrack?.name || 'Unknown Album';
    const trackName = d?.name || 'Unknown Track';
    const uri = d?.uri || '';

    return {
      id: d?.id || uri,
      track_name: trackName,
      trackName: trackName,
      artist_name: artistName,
      artistName: artistName,
      album_name: albumName,
      albumName: albumName,
      spotify_track_uri: uri,
      uri: uri,
      secondsPlayed: d?.secondsPlayed || 210,
    };
  });
}

