import React, { useState } from 'react';
import { ArrowRight, Layers, ExternalLink, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { TrackAlbumArt } from './TrackAlbumArt';
import { SpotifyIcon } from './SpotifyIcon';
import { getSpotifyWebUrl } from '../utils/exportData';

export function InsightCard({ insight }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { setSelectedRecord } = useData();
  const { playTrack, currentTrack } = useAudioPlayer();

  if (!insight) return null;

  const records = insight.records || [];
  const previewRecords = records.slice(0, 100); // show top 100 in inspector modal

  return (
    <>
      <article className="group p-6 rounded-xl bg-surface-container-lowest border border-surface-container-highest/80 hover:border-primary-container hover:shadow-[0_12px_32px_-8px_rgba(169,155,234,0.28)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full">
        <div className="space-y-4">
          {/* Header Tag */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase">
              {insight.category} // Provenance
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary-container/40 text-on-primary-container font-mono text-[10px] font-bold tracking-wider uppercase">
              {insight.supportingMetric}
            </span>
          </div>

          {/* Title & Headline */}
          <div className="space-y-1.5">
            <h3 className="font-syne text-xl font-semibold text-on-surface group-hover:text-primary transition-colors">
              {insight.title}
            </h3>
            <p className="font-mono text-xs font-semibold text-primary/90">
              {insight.headline}
            </p>
          </div>

          {/* Explanation */}
          <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
            {insight.explanation}
          </p>

          {/* Measured Fact */}
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest font-mono text-xs text-on-surface">
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">
              Measured Fact
            </div>
            <div>{insight.measuredFact}</div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 mt-6 border-t border-surface-container-highest/60 flex items-center justify-between">
          <span className="font-mono text-xs text-on-surface-variant">
            {records.length.toLocaleString()} supporting records
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-secondary font-semibold transition-colors group/btn cursor-pointer"
          >
            <span>Inspect records</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </article>

      {/* Modal / Drawer for Supporting Records */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-3">
                <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
                <div>
                  <div className="font-mono text-xs text-primary uppercase tracking-widest">
                    {insight.category} Evidence Ledger
                  </div>
                  <h2 className="font-syne text-lg font-bold text-on-surface">
                    {insight.title} — Supporting Records
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Info Bar */}
            <div className="px-6 py-3 bg-surface border-b border-surface-container-highest flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-on-surface-variant">
              <span>Showing top {previewRecords.length} of {records.length.toLocaleString()} records</span>
              <span className="text-[#1DB954] font-semibold flex items-center gap-1">
                <SpotifyIcon className="w-3.5 h-3.5" />
                {insight.supportingMetric}
              </span>
            </div>

            {/* Records List Table */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="divide-y divide-surface-container-highest border border-surface-container-highest rounded-lg overflow-hidden">
                {previewRecords.map((rec) => {
                  const isCurrentPlaying = currentTrack?.id === rec.id;
                  const spotifyUrl = getSpotifyWebUrl(rec.spotify_track_uri);

                  return (
                    <div
                      key={rec.id}
                      onClick={() => {
                        setSelectedRecord(rec);
                        setModalOpen(false);
                      }}
                      className={`p-3.5 border-b transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
                        isCurrentPlaying ? 'bg-[#1DB954]/10 border-[#1DB954]/40' : 'bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Play Direct Spotify Track Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(rec);
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                            isCurrentPlaying ? 'bg-[#1DB954] text-white' : 'bg-surface-container-high hover:bg-[#1DB954] text-[#1DB954] hover:text-white'
                          }`}
                          title={`Play direct Spotify track: ${rec.track_name}`}
                        >
                          <SpotifyIcon className="w-3.5 h-3.5" />
                        </button>

                        {/* Track Album Art Cover Icon Image */}
                        <TrackAlbumArt
                          trackName={rec.track_name}
                          artistName={rec.artist_name}
                          size="sm"
                        />

                        <div className="min-w-0">
                          <div className={`font-syne font-semibold text-sm truncate ${isCurrentPlaying ? 'text-[#1DB954]' : 'text-on-surface'}`}>
                            {rec.track_name}
                          </div>
                          <div className="text-on-surface-variant truncate">
                            {rec.artist_name} • <span className="italic">{rec.album_name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-on-surface-variant text-[11px] self-end sm:self-center shrink-0">
                        <span>{rec.ts}</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface border border-surface-container-highest">
                          {rec.platform}
                        </span>

                        {/* Direct Spotify Icon Link */}
                        <a
                          href={spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white border border-[#1DB954]/30 font-mono text-[10px] font-bold transition-all"
                        >
                          <SpotifyIcon className="w-3 h-3" />
                          <span>Spotify</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-surface-container-highest bg-surface-container-low flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-on-surface text-surface font-mono text-xs uppercase tracking-wider hover:bg-on-surface-variant transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

