import React from 'react';

/**
 * WCAG 2.2 AA (Criterion 2.4.1: Bypass Blocks)
 * Provides keyboard and screen reader users a mechanism to bypass recurring header navigation
 * and jump straight to the primary content area.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 font-medium text-sm transition-all"
    >
      Skip to main content (Press Enter)
    </a>
  );
}
