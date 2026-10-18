import React from 'react';
import { ArrowUp, Mail, Heart, Award, ShieldCheck } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';


/**
 * HCI Principles Applied:
 * - Fitts's Law: Prominent back-to-top action target (min 48x48px).
 * - Match Real World & Standards: Standardized social links and institutional accreditation.
 * - WCAG 2.2 AA: High contrast text and clear semantic <footer> tag.
 */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Identity & Department */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                M
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 dark:text-white">Mokshi Shah</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Veermata Jijabai Technological Institute (VJTI), Matunga, Mumbai
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              Interactive Personal Professional Profile engineered for College Mini Project with comprehensive Human-Computer Interaction (HCI) evaluation, Nielsen Heuristics auditing, and empirical SUS benchmarking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Mokshii46"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="GitHub Profile - Mokshii46"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mokshee46"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="LinkedIn Profile - mokshee46"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:mokshishah0501@gmail.com"
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Email Mokshi Shah"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Section Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Sections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <a href="#academics" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  VJTI Academics & Coursework
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Featured Projects (CodeSage, eDNA)
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Technical Competency Tiers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Engineering Articles
                </a>
              </li>
            </ul>
          </div>

          {/* HCI & Compliance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              HCI & Usability
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#evaluation" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Usability Evaluation Suite</span>
                </a>
              </li>
              <li>
                <a href="#evaluation-sus" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  SUS 10-Item Questionnaire
                </a>
              </li>
              <li>
                <a href="#evaluation-heuristics" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Nielsen's 10 Heuristics Audit
                </a>
              </li>
              <li>
                <a href="#evaluation-tasks" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  5 Task-Based User Tests
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  WCAG 2.2 AA Verified
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Back to Top (Fitts's Law) */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Mokshi Shah. Crafted with React, Tailwind CSS & HCI Principles. Veermata Jijabai Technological Institute (VJTI).
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 touch-target"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
