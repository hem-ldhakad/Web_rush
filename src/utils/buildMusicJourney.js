import { calculateStats } from './calculateStats';

/**
 * Builds chronological listening eras with real calculated statistics and supporting records.
 */
export function buildMusicJourney(records) {
  if (!records || records.length === 0) return [];

  const ERA_DEFINITIONS = [
    {
      id: 'era-1',
      title: 'Chapter 01: Early Discoveries & Acoustic Roots',
      subtitle: 'The genesis of the digital listening ledger',
      period: '2013 – 2015',
      minYear: 2013,
      maxYear: 2015,
      description: 'The early phase of streaming logging. Listening centered on modern acoustic singer-songwriters, synth-pop debuts, and indie rock staples.',
      narrative: 'Acoustic fingerpicking and early 2010s indie tracks dominated the web player era before mobile streaming became ubiquitous.',
    },
    {
      id: 'era-2',
      title: 'Chapter 02: The Great Catalogue Expansion',
      subtitle: 'Explosive volume surge & Beatles immersion',
      period: '2016 – 2017',
      minYear: 2016,
      maxYear: 2017,
      description: 'A massive spike in annual streaming volume (26,320 plays in 2017 alone). Deep dive into full band discographies and album pressings.',
      narrative: 'A sharp departure into obsessive catalogue exploration. The Beatles emerged as the primary anchor artist during this period.',
    },
    {
      id: 'era-3',
      title: 'Chapter 03: Classic Rock & Songwriter Renaissance',
      subtitle: 'High-fidelity roots, folk, & anthemic rock',
      period: '2018 – 2019',
      minYear: 2018,
      maxYear: 2019,
      description: 'Continuous engagement with timeless rock legends, folk storytellers, and stadium anthems across Android mobile streams.',
      narrative: 'Bob Dylan, Johnny Cash, and The Killers took center stage alongside heavy album plays during daily commutes and work hours.',
    },
    {
      id: 'era-4',
      title: 'Chapter 04: Deep Catalogue & Nocturnal Sanctuary',
      subtitle: 'Quarantine focus, hyper-repetition, & late night sessions',
      period: '2020 – 2021',
      minYear: 2020,
      maxYear: 2021,
      description: 'Peak lifetime listening intensity (47,271 records). Characterized by high late-night resonance and obsessive track looping.',
      narrative: 'Hyper-fixation on signature tracks like "Ode To The Mets" and "In the Blood", accompanied by extensive late night (12 AM–5 AM) listening.',
    },
    {
      id: 'era-5',
      title: 'Chapter 05: Modern Maturity & Curated Provenance',
      subtitle: 'High shuffle preference & refined artistic rotation',
      period: '2022 – 2024',
      minYear: 2022,
      maxYear: 2024,
      description: 'A balanced listening rhythm averaging ~10,000 plays per year with broad artistic rotation and 75%+ shuffle mode utilization.',
      narrative: 'Sustained appreciation for cornerstone artists alongside new single releases and acoustic live recordings.',
    },
  ];

  return ERA_DEFINITIONS.map((def) => {
    // Filter records for this era
    const eraRecords = records.filter(
      (r) => r.year >= def.minYear && r.year <= def.maxYear
    );

    const stats = calculateStats(eraRecords);

    return {
      ...def,
      records: eraRecords,
      stats: {
        totalPlays: stats.totalPlays,
        totalHours: stats.totalHours,
        uniqueTracks: stats.uniqueTracks,
        uniqueArtists: stats.uniqueArtists,
        topArtist: stats.topArtist,
        topArtists: stats.topArtists.slice(0, 5),
        topTracks: stats.topTracks.slice(0, 5),
        lateNightPercentage: stats.lateNightPercentage,
        shufflePercentage: stats.shufflePercentage,
      },
    };
  });
}
