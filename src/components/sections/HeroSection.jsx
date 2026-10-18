import React from 'react';
import { ArrowRight, FileText, Sparkles, MapPin, Award, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import profileData from '../../data/profile.json';
import mokshiPhoto from '../../assets/mokshi.jpg';


/**
 * HCI Principles Applied:
 * - Fitts's Law: Two prominent, high-contrast CTAs ('Explore Projects' and 'Download Resume')
 *   with expansive touch targets (> 48x48px) positioned directly in the initial visual fixation zone.
 * - Visual Hierarchy (F-Pattern): Name, headline, role, photo, and key credentials chunked for immediate scanning.
 * - Visibility of System Status (Nielsen #1): Live availability status pill with pulsing indicator.
 * - Match with Real World (Nielsen #2): Authentic personal portrait paired with verified institutional credentials.
 */
export function HeroSection({ onOpenResume, onExploreProjects }) {
  return (
    <section 
      id="hero" 
      className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden"
      aria-label="Introduction and summary"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Role, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill (Nielsen #1: System Status) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profileData.status}</span>
            </div>

            {/* Heading 1: Mokshi Shah */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">{profileData.name}</span>.
            </h1>

            {/* Role & Institution */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                <Terminal className="w-4 h-4" />
                Computer Engineering Undergrad
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                VJTI, Matunga, Mumbai
              </span>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {profileData.tagline}
            </p>

            {/* 2 Clear CTAs (Fitts's Law compliant) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Primary CTA: Explore Projects */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreProjects();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-indigo-500/25 transition-all duration-150 touch-target focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 group"
                aria-label="Navigate to Projects Section"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA: Download Resume */}
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base border border-slate-300 dark:border-slate-700 shadow-xs hover:border-slate-400 transition-all duration-150 touch-target focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                aria-label="Open resume preview and download modal"
              >
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Download Resume</span>
              </button>

              {/* Quick Social Icon Links */}
              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="GitHub Profile - Mokshii46"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="LinkedIn Profile - mokshee46"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar (Recognition over Recall) */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="block text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  8.94
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  CGPA (SGPA 9.48)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="block text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  Rank 152
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  MHT-CET (99.94%ile)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="block text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  4+ Systems
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  CodeSage, eDNA, JobLink
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="block text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
                  1st Place
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Pratibimb Lead & Win
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Mokshi's Photo Card (Match Real World) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Outer decorative gradient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-300" />
              
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                
                {/* Photo Element */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={mokshiPhoto}
                    alt="Mokshi Shah - B.Tech Computer Engineering at VJTI Matunga"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>VJTI Autonomous Institute</span>
                    </div>
                    <div className="text-lg font-extrabold mt-0.5">
                      Mokshi Shah
                    </div>
                    <p className="text-xs text-slate-200">
                      B.Tech Computer Engineering '28 • Systems & AI
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Card Summary */}
                <div className="p-4 bg-white dark:bg-slate-900 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Open to Summer '26 Internships
                    </span>
                  </div>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    CGPA: 8.94
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
