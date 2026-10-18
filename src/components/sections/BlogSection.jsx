import React, { useState, useMemo } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Tag, X } from 'lucide-react';
import blogsData from '../../data/blogs.json';

/**
 * HCI Principles Applied:
 * - Hick's Law: Filter tags reduce visual clutter by grouping related writing topics.
 * - Visibility of System Status (Nielsen #1): Live article count and clear search feedback.
 * - Progressive Disclosure: Excerpts on cards, comprehensive articles in dedicated reader view.
 */
export function BlogSection({ onSelectBlog }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    blogsData.forEach(b => b.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 5)];
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((article) => {
      const matchesTag = selectedTag === 'All' || article.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTag;

      const matchesText =
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags.some(t => t.toLowerCase().includes(q));

      return matchesTag && matchesText;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section id="blog" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Technical Writing"
          title="Engineering Articles & Notes"
          subtitle="Reflections on compiler ASTs, metagenomic dimensionality reduction, oceanographic RAG, and open-source."
          hciNote="Progressive Disclosure (Card Excerpt to Modal Reader)"
        />

        {/* Search & Tag Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keyword, or technology (e.g. AST, VAE, RAG)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Filter articles by query"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear article search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Topic tags">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all touch-target ${
                    selectedTag === tag
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={selectedTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing <strong className="text-slate-800 dark:text-slate-200">{filteredBlogs.length}</strong> of {blogsData.length} articles
            </span>
            {(searchQuery || selectedTag !== 'All') && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredBlogs.map((article) => (
            <article
              key={article.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectBlog(article)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tag Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1.5">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-xs text-slate-400">By Mokshi Shah</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
