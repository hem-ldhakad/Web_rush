import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Disc, Play, Pause, RotateCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export function AcousticLedgerVisual() {
  const { stats, records } = useData();
  const { isPlaying, togglePlayPause, playTrack, currentTrack } = useAudioPlayer();
  const [rpm, setRpm] = useState('33⅓');
  const [viewMode, setViewMode] = useState('vinyl');

  const hourlyData = stats.hourlyDistribution || [];
  const topRecord = records[0] || {
    id: 'top-1',
    track_name: stats.topTracks[0]?.trackName || 'Ode To The Mets',
    artist_name: stats.topTracks[0]?.artistName || 'The Strokes',
    album_name: 'The New Abnormal',
    secondsPlayed: 351,
  };

  const isVinylPlaying = isPlaying;

  const handleCenterDiscClick = () => {
    if (currentTrack) {
      togglePlayPause();
    } else {
      playTrack(topRecord);
    }
  };

  return (
    <section className="w-full">
      <div className="rounded-xl bg-surface-container-low p-6 lg:p-8 shadow-sm relative overflow-hidden border border-surface-container-highest transition-colors">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-surface-container-highest pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-widest">
              Acoustic Ledger Geometry // Specimen 01
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-surface-container-high font-mono text-[11px] text-on-surface-variant uppercase border border-surface-container-highest">
              {rpm} RPM ANALOG FLUID ENGINE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-on-surface-variant hidden lg:inline-block">
              ACOUSTIC HARMONIC ROTATION: {stats.totalPlays.toLocaleString()} CYCLES
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest border border-surface-container-highest">
              <span className={`w-1 h-3 bg-primary rounded-full ${isVinylPlaying ? 'animate-wave-1' : ''}`}></span>
              <span className={`w-1 h-4 bg-primary rounded-full ${isVinylPlaying ? 'animate-wave-2' : ''}`}></span>
              <span className={`w-1 h-2 bg-primary rounded-full ${isVinylPlaying ? 'animate-wave-3' : ''}`}></span>
              <span className={`w-1 h-3 bg-primary rounded-full ${isVinylPlaying ? 'animate-wave-4' : ''}`}></span>
              <span className={`w-1 h-2 bg-primary rounded-full ${isVinylPlaying ? 'animate-wave-5' : ''}`}></span>
            </div>
          </div>
        </div>

        {/* Main Canvas Container */}
        <div className="relative w-full min-h-[460px] flex items-center justify-center bg-surface-container-lowest rounded-lg border border-surface-container-highest/60 overflow-hidden p-6 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/20 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a3652_1px,transparent_1px),linear-gradient(to_bottom,#3a3652_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

          {/* Top Info Overlays */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
            <div className="flex items-center gap-1.5 font-mono text-xs text-primary tracking-wider uppercase font-bold">
              <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: rpm === '33⅓' ? '4s' : '2s' }} />
              <span>INTERACTIVE SPATIAL ARCHIVE</span>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">
              ARCHIVE WINDOW: {stats.dateRange.fullStr}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/90 backdrop-blur border border-surface-container-highest font-mono text-xs text-on-surface shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span>POLAR PHASE: CONTINUOUS</span>
            <span className="text-on-surface-variant text-[10px] font-mono ml-1">44.1kHz STREAM</span>
          </div>

          {/* Visual Content */}
          {viewMode === 'vinyl' ? (
            <div className="relative flex items-center justify-center py-8">
              {/* Spinning Vinyl Representation */}
              <div
                className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-on-surface via-inverse-surface to-on-surface p-4 shadow-2xl relative flex items-center justify-center border-4 border-surface-container-highest transition-all duration-700 ${
                  isVinylPlaying ? 'animate-spin' : ''
                }`}
                style={{
                  animationDuration: rpm === '33⅓' ? '6s' : '3s',
                }}
              >
                {/* Grooves */}
                <div className="w-full h-full rounded-full border border-surface-container/20 flex items-center justify-center relative">
                  <div className="w-5/6 h-5/6 rounded-full border border-surface-container/30 flex items-center justify-center">
                    <div className="w-4/6 h-4/6 rounded-full border border-surface-container/40 flex items-center justify-center">
                      {/* Label Center with Play Button */}
                      <button
                        onClick={handleCenterDiscClick}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary-container text-on-primary-container p-3 flex flex-col items-center justify-center text-center shadow-inner border-2 border-primary hover:scale-105 transition-transform cursor-pointer group/disc"
                        title={isVinylPlaying ? 'Pause Audio' : 'Play Top Track'}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center mb-1 group-hover/disc:scale-110 transition-transform shadow">
                          {isVinylPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </div>
                        <span className="font-syne text-[10px] font-bold uppercase tracking-widest line-clamp-1">
                          {currentTrack ? currentTrack.track_name : topRecord.track_name}
                        </span>
                        <span className="font-mono text-[8px] opacity-80 line-clamp-1">
                          {currentTrack ? currentTrack.artist_name : topRecord.artist_name}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-80 pt-8 px-4 z-10 flex flex-col justify-end">
              <div className="font-mono text-xs uppercase text-on-surface-variant mb-2 text-center">
                Hourly Play Distribution (00:00 - 23:00)
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={hourlyData}>
                  <XAxis dataKey="hour" tickLine={false} tick={{ fontSize: 10, fill: '#797581' }} formatter={(val) => `${val}h`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-on-surface text-surface px-3 py-1.5 rounded text-xs font-mono shadow-md">
                            <div>Hour {data.hour}:00</div>
                            <div className="text-primary-container font-bold">{data.count.toLocaleString()} plays</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.hour >= 0 && entry.hour < 5 ? '#a99bea' : '#61549d'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Bottom Control Pills */}
          <div className="absolute bottom-4 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setRpm('33⅓'); setViewMode('vinyl'); }}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                rpm === '33⅓' && viewMode === 'vinyl'
                  ? 'bg-surface-container-high text-on-surface border border-surface-container-highest shadow-sm font-bold'
                  : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-surface-container-highest'
              }`}
            >
              33⅓ RPM
            </button>
            <button
              onClick={() => { setRpm('45'); setViewMode('vinyl'); }}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                rpm === '45' && viewMode === 'vinyl'
                  ? 'bg-surface-container-high text-on-surface border border-surface-container-highest shadow-sm font-bold'
                  : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-surface-container-highest'
              }`}
            >
              45 RPM
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'chart' ? 'vinyl' : 'chart')}
              className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-primary text-on-primary border border-primary shadow-sm font-bold'
                  : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-surface-container-highest'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{viewMode === 'chart' ? 'VINYL VIEW' : 'SPECTROGRAM VIEW'}</span>
            </button>
          </div>

          <div className="absolute bottom-4 right-4 sm:right-6 z-20 hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur border border-primary-container/40 text-on-surface font-mono text-xs shadow-sm pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="uppercase tracking-wider text-[11px]">
              {stats.uniqueTracks.toLocaleString()} Tracks Registered
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <p className="uppercase text-on-surface font-semibold">FIG. 1.0 — Harmonic density & temporal listening rhythms.</p>
            <span className="hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block">Data aggregated from {stats.totalPlays.toLocaleString()} sequential logs.</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] uppercase">
            <span>SPECTRAL STABILITY: 99.8%</span>
            <span>//</span>
            <span className="text-primary font-bold">LIVE MATRIX</span>
          </div>
        </div>
      </div>
    </section>
  );
}
