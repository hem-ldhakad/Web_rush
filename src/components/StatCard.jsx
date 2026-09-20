import React from 'react';

export function StatCard({ label, value, unit, subtitle, icon, highlightColor = 'primary-container' }) {
  return (
    <div className="group p-6 rounded-xl bg-surface-container-lowest border border-surface-container-highest/80 hover:border-primary-container hover:shadow-[0_8px_24px_-6px_rgba(169,155,234,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-44 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none group-hover:bg-primary-container/20 transition-colors"></div>
      
      <div className="flex items-center justify-between z-10">
        <span className="font-mono text-xs uppercase text-on-surface-variant tracking-wider">
          {label}
        </span>
        {icon || (
          <div className="flex items-end gap-0.5 h-3.5 px-2 py-1 rounded bg-primary-container/15">
            <span className="w-0.5 h-2 bg-primary-container rounded-full animate-wave-1"></span>
            <span className="w-0.5 h-3.5 bg-primary rounded-full animate-wave-2"></span>
            <span className="w-0.5 h-2.5 bg-primary-container rounded-full animate-wave-3"></span>
            <span className="w-0.5 h-3 bg-primary rounded-full animate-wave-4"></span>
          </div>
        )}
      </div>

      <div className="z-10">
        <div className="font-syne text-3xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors flex items-baseline gap-2 truncate">
          {value}
          {unit && (
            <span className="text-xs font-mono text-primary tracking-widest uppercase font-normal">
              {unit}
            </span>
          )}
        </div>
        <div className="font-mono text-xs text-on-surface-variant mt-1.5 truncate">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
