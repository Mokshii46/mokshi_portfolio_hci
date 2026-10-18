import React, { useState, useMemo } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { 
  Search, Filter, ExternalLink, ArrowRight, 
  Layers, X, Sparkles, CheckCircle2 
} from 'lucide-react';
import { Github } from '../common/Icons';

import projectsData from '../../data/projects.json';

/**
 * HCI Principles Applied:
 * - Nielsen #1 (Visibility of System Status): Dynamic count indicator showing matched items.
 * - Nielsen #3 (User Control and Freedom): Single-click 'Clear Filters' button to recover from empty searches.
 * - Nielsen #7 (Flexibility and Efficiency): Instant category filter chips paired with fuzzy text query.
 * - Nielsen #8 (Aesthetic & Minimalist Design): Clean, uncluttered cards with progressive disclosure.
 * - Nielsen #9 (Error Recovery): Contextual empty state offering immediate reset action.
 */
export function ProjectsSection({ onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', 'NLP & Systems', 'AI / ML', 'Full Stack'];

  // Filter and search
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText = 
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.stack.some(s => s.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Featured Engineering"
          title="Projects & Applied Systems"
          subtitle="Compiler AST pipelines, metagenomic autoencoders, Supabase architectures, and oceanographic RAG systems."
          hciNote="Recognition over Recall (Filter Chips) & Error Recovery Zero-State"
        />

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input (Flexibility & Efficiency) */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, keyword, or technology (e.g. AST, VAE, Groq)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter projects by search query"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips (Recognition over Recall) */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Category filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all touch-target ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Visibility of System Status (Match count) */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProjects.length}</strong> of {projectsData.length} engineering projects
            </span>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          /* Nielsen #9: Friendly Error Recovery Zero-State */
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching projects found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No project matches your query <span className="font-semibold text-slate-700 dark:text-slate-300">"{searchQuery}"</span> under category <span className="font-semibold">{selectedCategory}</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Reset Filters & View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Period */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {project.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Quantitative Metric Badges (Gestalt Proximity) */}
                  {project.metrics && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                          <span className="block text-sm font-black text-indigo-600 dark:text-indigo-400">
                            {m.value}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/btn focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1 touch-target"
                    aria-label={`View architecture and details for ${project.title}`}
                  >
                    <span>View Architecture & Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                        title="GitHub Repository"
                        aria-label={`GitHub repo for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
