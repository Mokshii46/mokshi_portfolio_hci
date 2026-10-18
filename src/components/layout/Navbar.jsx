import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, Command, HelpCircle, 
  FileText, Sparkles, Activity
} from 'lucide-react';

/**
 * HCI Principles Applied:
 * - Hick's Law: Exactly 6 top-level navigation links to minimize cognitive load and decision time.
 * - Fitts's Law: Large clickable targets (min 44x44px padding) easily reachable on desktop and mobile.
 * - Nielsen #1 (Visibility of System Status): Real-time scroll progress indicator and dynamic active link highlight.
 * - Nielsen #6 (Recognition over Recall): Clear text labels paired with intuitive icons and keyboard hotkey cues.
 * - WCAG 2.2 AA: High contrast ratios, semantic <nav> element, visible focus outlines, ARIA attributes.
 */
export function Navbar({
  activeSection,
  isDark,
  onToggleTheme,
  onOpenCommandPalette,
  onOpenHciGuide,
  onOpenResume,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Top 6 primary navigation destinations (Hick's Law compliant)
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics & Exp' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Articles' },
    { id: 'evaluation', label: 'Usability Lab', isSpecial: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      {/* Nielsen #1: System Status Scroll Progress Bar */}
      <div 
        className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1.5"
            aria-label="Mokshi Shah - Return to top"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="text-left">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Mokshi Shah
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  VJTI Matunga
                </span>
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Comp Engg '28 • Systems & AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Hick's Law: Exactly 6 core links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 touch-target flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  } ${item.isSpecial ? 'border border-indigo-200/80 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/30' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.isSpecial && <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities (Flexibility & Efficiency) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Command Palette Trigger (Nielsen #7 Accelerator) */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Search anything (Ctrl+K)"
              aria-label="Open command search palette"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-600 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="View or download Mokshi's resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* HCI Principles Guide Quick Trigger */}
            <button
              type="button"
              onClick={onOpenHciGuide}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 touch-target"
              title="HCI Design Principles Guide (?)"
              aria-label="Open HCI Design Principles Guide"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Dark / Light Theme Toggle (User Control & Freedom) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 touch-target"
              title={isDark ? "Switch to Light Mode (Press 'D')" : "Switch to Dark Mode (Press 'D')"}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Mobile Hamburger Toggle (Fitts's Law touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-2xl transition-all"
          role="dialog"
          aria-label="Mobile navigation drawer"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between touch-target ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2">
                    {item.isSpecial && <Activity className="w-4 h-4 text-emerald-500" />}
                    {item.label}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
              >
                <Command className="w-4 h-4" />
                <span>Quick Search (⌘K)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
