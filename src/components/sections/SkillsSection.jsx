import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { 
  Code2, Cpu, FileCode, Layout, Database, Brain, 
  Network, Binary, BarChart3, Search, Atom, Server, 
  Globe, Palette, GitBranch, Cloud, Terminal, FileSpreadsheet, 
  Layers, Eye, Settings, CheckSquare, Info 
} from 'lucide-react';
import skillsData from '../../data/skills.json';

// Map string icon names to Lucide icon components
const ICON_MAP = {
  Code2, Cpu, FileCode, Layout, Database, Brain, 
  Network, Binary, BarChart3, Search, Atom, Server, 
  Globe, Palette, GitBranch, Cloud, Terminal, FileSpreadsheet, 
  Layers, Eye, Settings, CheckSquare
};

/**
 * HCI Principles Applied:
 * - Miller's Law (7 ± 2 Chunking): Skills grouped into 5 clear domains with 4-5 items each.
 * - Match with Real World & Anti-Deceptive Design: Replaces misleading percentages (e.g. '87% Python')
 *   with qualitative competency tiers ('Proficient', 'Working Knowledge', 'Certified/Academic').
 * - Gestalt Principle of Proximity: Grouping tool icons, applied context, and experience duration.
 */
export function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Proficient':
        return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Working Knowledge':
        return 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'Certified':
        return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Technical Taxonomy"
          title="Skills & Competency Tiers"
          subtitle="Empirical taxonomy chunked into 5 domains without misleading percentages, focusing on real applied engineering."
          hciNote="Miller's Law (5 Chunked Domains) & Honest Qualitative Tiers"
        />

        {/* Domain Navigation Tabs (Miller's Law) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800" role="tablist">
          {skillsData.map((cat, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={activeCategoryIndex === idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all touch-target text-center ${
                activeCategoryIndex === idx
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Domain Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          
          <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {skillsData[activeCategoryIndex].category}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {skillsData[activeCategoryIndex].description}
            </p>
          </div>

          {/* Competency Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsData[activeCategoryIndex].skills.map((skill, sIdx) => {
              const IconComponent = ICON_MAP[skill.icon] || Code2;
              return (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTierBadge(skill.tier)}`}>
                        {skill.tier}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                      {skill.context}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Experience depth:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {skill.years}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Competency Tier Legend / HCI Rationale */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">HCI Design Note:</span>
              <span>Arbitrary percentage bars are scientifically non-verifiable. We employ discrete qualitative mastery tiers.</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Proficient</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Working Knowledge</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Certified / Academic</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
