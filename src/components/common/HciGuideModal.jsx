import React from 'react';
import { Modal } from './Modal';
import { CheckCircle2, ShieldCheck, Zap, Eye, Keyboard, HelpCircle } from 'lucide-react';

/**
 * HCI Principle: Help and Documentation (Nielsen #10)
 * Contextual guide enabling college evaluators, reviewers, and visitors to inspect
 * how specific HCI, cognitive, and accessibility laws are operationalized across this application.
 */
export function HciGuideModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="HCI Design System & Evaluator Guide"
      subtitle="Architectural mapping of Human-Computer Interaction heuristics and cognitive psychology principles"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
        
        {/* Quick Intro */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Academic Project Objective & Compliance
            </h3>
            <p className="mt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              This interactive professional profile is engineered for a university mini-project evaluating the practical application of <strong>Nielsen's 10 Usability Heuristics</strong>, <strong>Shneiderman's 8 Golden Rules</strong>, <strong>Fitts's Law</strong>, <strong>Hick's Law</strong>, and <strong>WCAG 2.2 AA Accessibility</strong>.
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts Cheat Sheet */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Keyboard className="w-4 h-4 text-indigo-500" />
            <span>Power User Keyboard Accelerators (Nielsen Heuristic #7)</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <kbd className="px-1.5 py-0.5 font-mono font-bold bg-slate-100 dark:bg-slate-900 rounded border">Ctrl + K</kbd>
              <p className="mt-1.5 text-slate-500 dark:text-slate-400">Open Command Palette / Instant Search</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <kbd className="px-1.5 py-0.5 font-mono font-bold bg-slate-100 dark:bg-slate-900 rounded border">?</kbd>
              <p className="mt-1.5 text-slate-500 dark:text-slate-400">Open this HCI Evaluator Guide</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <kbd className="px-1.5 py-0.5 font-mono font-bold bg-slate-100 dark:bg-slate-900 rounded border">D</kbd>
              <p className="mt-1.5 text-slate-500 dark:text-slate-400">Toggle Dark / Light Contrast Mode</p>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <kbd className="px-1.5 py-0.5 font-mono font-bold bg-slate-100 dark:bg-slate-900 rounded border">Esc</kbd>
              <p className="mt-1.5 text-slate-500 dark:text-slate-400">Dismiss any active modal dialog</p>
            </div>
          </div>
        </div>

        {/* Cognitive Laws Implemented */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Fitts's Law</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Target acquisition time is a function of distance and target size. All interactive buttons, chips, and mobile touch targets strictly adhere to a minimum <strong>44 × 44px</strong> hit area. Primary action triggers (View Projects, Download Resume, Back to Top) are positioned prominently above the fold and in sticky reach zones.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Eye className="w-4 h-4 text-emerald-500" />
              <span>Hick's Law</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Decision time increases logarithmically with the number of choices ($T = b \log_2(n + 1)$). The primary navigation is strictly capped at <strong>6 top-level destinations</strong>. Deep project technical details and long articles use <em>progressive disclosure</em> via modal dialogs rather than overwhelming the main canvas.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              <span>Miller's Law ($7 \pm 2$ Working Memory)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Technical skills are chunked into <strong>5 distinct conceptual domains</strong> (Languages, AI/ML, Full Stack, Tools, Core CS) with 4-5 items each, eliminating cognitive overload. Evaluator user testing is partitioned into exactly 5 focused tasks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span>Gestalt Principles & WCAG 2.2 AA</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Proximity groups metadata with cards; similarity ensures uniform interactive affordances; high color contrast meets WCAG 2.2 AA standards ($\ge 4.5:1$); full keyboard traversal with visible focus rings (`:focus-visible`).
            </p>
          </div>
        </div>

        {/* Usability Lab Navigation Link */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              onClose();
              document.getElementById('evaluation')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Jump to Usability Evaluation & SUS Lab →
          </button>
        </div>

      </div>
    </Modal>
  );
}
