import React from 'react';

/**
 * HCI Principle: Visual Hierarchy (F-Pattern) & Consistency and Standards (Nielsen #4)
 * Provides uniform section title anatomy, clear subtitle context, and optional badge chips.
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  hciNote,
}) {
  return (
    <div className={`mb-10 sm:mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3">
          <span>{badge}</span>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}

      {hciNote && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60 font-mono">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">HCI Principle:</span>
          <span>{hciNote}</span>
        </div>
      )}
    </div>
  );
}
