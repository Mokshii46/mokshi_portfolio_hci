import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import heuristicsData from '../../data/heuristics.json';

/**
 * HCI Heuristic Evaluation Table (Jakob Nielsen, 1994)
 * Severity Scale:
 * 0 = Not a usability problem at all
 * 1 = Cosmetic problem only: need not be fixed unless extra time is available
 * 2 = Minor usability problem: fixing should be given low priority
 * 3 = Major usability problem: important to fix, so should be given high priority
 * 4 = Usability catastrophe: imperative to fix before product can be released
 */
export function HeuristicsTable() {
  const [selectedHeuristic, setSelectedHeuristic] = useState(null);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 0:
        return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 1:
        return 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 2:
        return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    }
  };

  return (
    <div id="evaluation-heuristics" className="space-y-6">
      
      {/* Intro info banner */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">
            Nielsen Heuristic Evaluation Methodology:
          </span>
          <p className="mt-1 leading-relaxed">
            All 10 heuristics from Jakob Nielsen's usability inspection framework were audited across the portfolio. Every detected defect was resolved, bringing all post-fix severity scores down to <strong>0 (No Usability Problem)</strong>.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              <th scope="col" className="p-3.5 sm:p-4"># Heuristic</th>
              <th scope="col" className="p-3.5 sm:p-4">Rule Definition</th>
              <th scope="col" className="p-3.5 sm:p-4">Implementation Location</th>
              <th scope="col" className="p-3.5 sm:p-4">Severity (0-4)</th>
              <th scope="col" className="p-3.5 sm:p-4">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
            {heuristicsData.map((h) => (
              <tr 
                key={h.id}
                onClick={() => setSelectedHeuristic(selectedHeuristic?.id === h.id ? null : h)}
                className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-mono">
                      {h.id}
                    </span>
                    <span>{h.name}</span>
                  </div>
                </td>
                <td className="p-3.5 sm:p-4 text-xs leading-relaxed max-w-xs sm:max-w-md">
                  {h.rule}
                </td>
                <td className="p-3.5 sm:p-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {h.location}
                </td>
                <td className="p-3.5 sm:p-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getSeverityBadge(h.severity)}`}>
                    {h.severityLabel}
                  </span>
                </td>
                <td className="p-3.5 sm:p-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Heuristic Deep-Dive Drawer */}
      {selectedHeuristic && (
        <div className="p-5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Inspection Drilldown: Heuristic #{selectedHeuristic.id} — {selectedHeuristic.name}</span>
            </h4>
            <button
              type="button"
              onClick={() => setSelectedHeuristic(null)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Dismiss Drilldown
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                Concrete Implementation in this Profile:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedHeuristic.implementation}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div>
                <span className="font-bold text-red-500 uppercase tracking-wider text-[10px] block">
                  Defect Found in Pre-Test:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  {selectedHeuristic.beforeFix}
                </p>
              </div>
              <div>
                <span className="font-bold text-emerald-500 uppercase tracking-wider text-[10px] block">
                  HCI Solution Implemented:
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-xs font-medium">
                  {selectedHeuristic.afterFix}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
