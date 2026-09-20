import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { InsightCard } from '../components/InsightCard';
import { Sparkles, Filter, Search, ShieldCheck } from 'lucide-react';

export function Discoveries() {
  const { insights, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('All');

  if (loading || !insights) {
    return (
      <div className="w-full px-6 py-20 text-center font-mono text-xs text-on-surface-variant">
        Calculating dataset discoveries...
      </div>
    );
  }

  const categories = ['All', 'Pattern', 'Fixation', 'Nocturnal', 'Platform'];

  const filteredInsights = insights.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 lg:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 border-b border-surface-container-highest pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            SCREEN C // DETERMINISTIC DATA DISCOVERIES
          </span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
          Substantiated Discoveries
        </h1>
        <p className="font-mono text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Every pattern below was calculated deterministically from raw stream logs. Click "Inspect records" on any discovery card to view its exact supporting dataset evidence.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-primary" /> Filter Category:
        </span>
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-colors shrink-0 ${
                isSelected
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="p-12 text-center font-mono text-xs text-on-surface-variant rounded-xl bg-surface-container-low border border-surface-container-highest">
          No discoveries found for category "{activeCategory}".
        </div>
      )}

      {/* Verification Notice */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-surface-container-highest font-mono text-xs text-on-surface-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <div>
            <div className="font-bold text-on-surface uppercase text-[11px]">Strict Fact Guarantee</div>
            <div>No synthetic insights or fabricated records. All numbers derive directly from spotify_history.csv.</div>
          </div>
        </div>
        <span className="px-3 py-1 rounded bg-surface-container-high text-on-surface font-semibold text-[11px] shrink-0">
          6 SUBSTANTIATED INSIGHTS
        </span>
      </div>
    </div>
  );
}
