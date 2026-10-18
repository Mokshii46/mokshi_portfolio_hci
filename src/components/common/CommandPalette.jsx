import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Code2, BookOpen, Layers, Terminal, Sparkles, 
  ArrowRight, X, ExternalLink, Activity
} from 'lucide-react';
import projectsData from '../../data/projects.json';
import blogsData from '../../data/blogs.json';
import skillsData from '../../data/skills.json';

/**
 * HCI Principle: Flexibility and Efficiency of Use (Nielsen #7)
 * Command palette accelerator allowing power users and evaluators to instantly jump
 * to any project, article, skill category, or action with fuzzy search.
 */
export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onSelectBlog,
  onToggleTheme,
  onOpenHciGuide,
  onOpenResume,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Aggregate searchable items
  const items = [
    // Actions
    {
      id: 'action-resume',
      category: 'Actions',
      title: 'View or Download Resume PDF',
      subtitle: 'Complete academic and engineering background',
      icon: Terminal,
      action: () => { onClose(); onOpenResume(); }
    },
    {
      id: 'action-evaluation',
      category: 'Actions',
      title: 'Open Usability Evaluation & SUS Lab',
      subtitle: 'Nielsen heuristics, 5 user tasks, and live SUS survey',
      icon: Activity,
      action: () => {
        onClose();
        document.getElementById('evaluation')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'action-theme',
      category: 'Actions',
      title: 'Toggle Dark / Light Theme',
      subtitle: 'Switch color contrast mode (Hotkey: D)',
      icon: Sparkles,
      action: () => { onClose(); onToggleTheme(); }
    },
    {
      id: 'action-hci',
      category: 'Actions',
      title: 'Open HCI Principles & Navigation Guide',
      subtitle: 'Learn about all heuristics applied in this project (Hotkey: ?)',
      icon: Layers,
      action: () => { onClose(); onOpenHciGuide(); }
    },
    // Projects
    ...projectsData.map(p => ({
      id: `proj-${p.id}`,
      category: 'Projects',
      title: p.title,
      subtitle: `${p.category} • ${p.stack.slice(0, 3).join(', ')}`,
      icon: Code2,
      action: () => { onClose(); onSelectProject(p); }
    })),
    // Articles / Blog
    ...blogsData.map(b => ({
      id: `blog-${b.id}`,
      category: 'Articles',
      title: b.title,
      subtitle: `${b.category} • ${b.readTime}`,
      icon: BookOpen,
      action: () => { onClose(); onSelectBlog(b); }
    }))
  ];

  const filteredItems = items.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, articles, sections, actions... (e.g. CodeSage, VAE, SUS)"
            className="w-full px-3 py-4 text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0"
            aria-label="Search query"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching results found for <span className="font-semibold text-slate-700 dark:text-slate-300">"{query}"</span>.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-100'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{item.title}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-indigo-600 dark:text-indigo-400' : 'opacity-0'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">Enter</kbd> to select</span>
          </div>
          <span>Accelerators: Ctrl+K, ?, D</span>
        </div>
      </div>
    </div>
  );
}
