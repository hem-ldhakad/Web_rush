import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { TrackCard } from '../components/TrackCard';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Disc, ArrowRight, Filter, ChevronRight, Moon, Shuffle, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export function Journey() {
  const { eras, loading, records } = useData();
  const [selectedEraId, setSelectedEraId] = useState('era-1');
  const [trackSearch, setTrackSearch] = useState('');
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full px-6 py-20 text-center font-mono text-xs text-on-surface-variant flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        <span>Building Music Journey eras from dataset ({records?.length?.toLocaleString() || 0} records)...</span>
      </div>
    );
  }

  if (!eras || eras.length === 0) {
    return (
      <div className="w-full px-6 py-20 text-center font-mono text-xs text-on-surface-variant">
        No era chapters available. Please ensure spotify_history.csv is loaded.
      </div>
    );
  }

  const activeEra = eras.find((e) => e.id === selectedEraId) || eras[0];

  const eraRecords = activeEra.records || [];
  const filteredEraRecords = eraRecords.filter((r) => {
    if (!trackSearch) return true;
    const q = trackSearch.toLowerCase();
    return (
      r.track_name.toLowerCase().includes(q) ||
      r.artist_name.toLowerCase().includes(q) ||
      r.album_name.toLowerCase().includes(q)
    );
  });

  // Recharts chart data for era comparison
  const eraChartData = eras.map((e) => ({
    name: e.period,
    plays: e.stats?.totalPlays || 0,
    hours: e.stats?.totalHours || 0,
  }));

  const handleArtistClick = (artistName, e) => {
    if (e) e.stopPropagation();
    navigate(`/tracks?artist=${encodeURIComponent(artistName)}`);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 lg:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 border-b border-surface-container-highest pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            SCREEN B // CHRONOLOGICAL ARC
          </span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
          Your Music Journey
        </h1>
        <p className="font-mono text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Eleven years of listening provenance segmented into five distinct acoustic chapters. Select an era to inspect its calculated stats, artist rotation, and supporting track records.
        </p>
      </div>

      {/* Era Macro Timeline Chart */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-highest space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-widest flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            Lifetime Volume Trajectory (2013 – 2024)
          </span>
          <span className="font-mono text-[11px] text-on-surface-variant">5 Chronological Chapters</span>
        </div>

        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height={176}>
            <AreaChart data={eraChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPlays" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#61549d" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#61549d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 10, fill: '#797581' }} />
              <YAxis tickLine={false} tick={{ fontSize: 10, fill: '#797581' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-on-surface text-surface px-3 py-1.5 rounded text-xs font-mono shadow-md">
                        <div className="font-bold">{data.name}</div>
                        <div className="text-primary-container font-bold">{data.plays.toLocaleString()} plays</div>
                        <div className="text-on-surface-variant">{data.hours.toLocaleString()} hours</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="plays" stroke="#61549d" strokeWidth={2} fillOpacity={1} fill="url(#colorPlays)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: Era Selector Timeline (Left) & Era Detail View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Era Timeline Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-2">
            Select Era Chapter ({eras.length} Chapters)
          </div>

          <div className="space-y-3">
            {eras.map((era) => {
              const isSelected = era.id === selectedEraId;
              const topArtists = era.stats?.topArtists || [];
              const totalPlays = era.stats?.totalPlays || 0;

              return (
                <div
                  key={era.id}
                  onClick={() => {
                    setSelectedEraId(era.id);
                    setTrackSearch('');
                  }}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-surface-container-lowest border-primary shadow-[0_4px_20px_-2px_rgba(169,155,234,0.3)] ring-1 ring-primary'
                      : 'bg-surface-container-lowest/60 border-surface-container-highest hover:bg-surface-container-lowest hover:border-primary-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                      {era.period}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-mono text-[10px] text-on-surface font-semibold">
                      {totalPlays.toLocaleString()} Plays
                    </span>
                  </div>

                  <div>
                    <h3 className="font-syne text-base font-semibold text-on-surface">
                      {era.title}
                    </h3>
                    <p className="font-mono text-xs text-on-surface-variant mt-1 line-clamp-2">
                      {era.subtitle}
                    </p>
                  </div>

                  {/* Top Artists in Era */}
                  <div className="pt-2 border-t border-surface-container-highest/60 flex flex-wrap gap-1.5">
                    {topArtists.slice(0, 3).map((artist) => (
                      <span
                        key={artist.name}
                        onClick={(e) => handleArtistClick(artist.name, e)}
                        className="px-2 py-0.5 rounded bg-surface-container hover:bg-primary-container/30 hover:text-primary font-mono text-[10px] text-on-surface-variant transition-colors cursor-pointer"
                        title={`Filter tracks by ${artist.name}`}
                      >
                        {artist.name} ({artist.count})
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Active Era Inspection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Era Banner Card */}
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  CHAPTER INSIGHT // {activeEra.period}
                </span>
                <h2 className="font-syne text-2xl font-bold text-on-surface mt-0.5">
                  {activeEra.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container/40 text-on-primary-container font-mono text-xs font-bold self-start sm:self-center">
                {(activeEra.stats?.totalHours || 0).toLocaleString()} Hours Logged
              </span>
            </div>

            {/* Narrative & Shift */}
            <div className="space-y-3 font-mono text-xs text-on-surface-variant leading-relaxed">
              <p>{activeEra.description}</p>
              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest text-on-surface">
                <span className="font-bold text-primary uppercase text-[10px] block mb-1">
                  Notable Pattern Shift
                </span>
                {activeEra.narrative}
              </div>
            </div>

            {/* Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div className="text-[10px] text-on-surface-variant uppercase">Total Plays</div>
                <div className="font-syne font-bold text-lg text-on-surface">
                  {(activeEra.stats?.totalPlays || 0).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div className="text-[10px] text-on-surface-variant uppercase">Unique Artists</div>
                <div className="font-syne font-bold text-lg text-on-surface">
                  {(activeEra.stats?.uniqueArtists || 0).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div className="text-[10px] text-on-surface-variant uppercase">Late Night %</div>
                <div className="font-syne font-bold text-lg text-primary">
                  {activeEra.stats?.lateNightPercentage || 0}%
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div className="text-[10px] text-on-surface-variant uppercase">Shuffle Rate</div>
                <div className="font-syne font-bold text-lg text-on-surface">
                  {activeEra.stats?.shufflePercentage || 0}%
                </div>
              </div>
            </div>

            {/* Top 5 Artists in this Era */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Most-Played Artists in {activeEra.period}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {(activeEra.stats?.topArtists || []).map((artist, idx) => (
                  <div
                    key={artist.name}
                    onClick={(e) => handleArtistClick(artist.name, e)}
                    className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container border border-surface-container-highest flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="font-semibold text-on-surface truncate">
                      #{idx + 1} {artist.name}
                    </span>
                    <span className="text-primary font-bold">{artist.count} plays</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supporting Track Records Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-highest pb-3">
              <div>
                <h3 className="font-syne text-lg font-bold text-on-surface">
                  Supporting Track Records ({filteredEraRecords.length.toLocaleString()})
                </h3>
                <span className="font-mono text-xs text-on-surface-variant">
                  Actual CSV rows recorded during {activeEra.period}
                </span>
              </div>

              {/* Quick Search within Era */}
              <input
                type="text"
                placeholder="Filter tracks in era..."
                value={trackSearch}
                onChange={(e) => setTrackSearch(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest font-mono text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Track Records List */}
            <div className="divide-y divide-surface-container-highest border border-surface-container-highest rounded-xl overflow-hidden bg-surface-container-lowest max-h-[500px] overflow-y-auto">
              {filteredEraRecords.slice(0, 100).map((record, index) => (
                <TrackCard key={record.id} record={record} index={index} />
              ))}
              {filteredEraRecords.length === 0 && (
                <div className="p-8 text-center font-mono text-xs text-on-surface-variant">
                  No records match "{trackSearch}" in this era.
                </div>
              )}
            </div>
            {filteredEraRecords.length > 100 && (
              <div className="font-mono text-[11px] text-on-surface-variant text-center">
                Showing top 100 of {filteredEraRecords.length.toLocaleString()} records for performance.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
