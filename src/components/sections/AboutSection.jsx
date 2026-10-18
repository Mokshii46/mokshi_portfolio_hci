import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GraduationCap, Award, Compass, Heart, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import profileData from '../../data/profile.json';
import mokshiPhoto from '../../assets/mokshi.jpg';




/**
 * HCI Principles Applied:
 * - Miller's Law: Quick facts partitioned into 6 structured data cards ($7 \pm 2$ limit)
 *   to avoid working memory fatigue.
 * - Gestalt Principle of Proximity: Grouping institution, degree, and ranks into unified cards.
 * - Aesthetic & Minimalist Design: High-contrast typography with balanced negative space.
 */
export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Profile Overview"
          title="About & Engineering Philosophy"
          subtitle="Second-year Computer Engineering undergrad at VJTI Matunga combining deterministic systems with applied machine learning."
          hciNote="Miller's Law (6 chunked quick facts) & Gestalt Proximity"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Avatar & Bio Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
              
              {/* Author Photo & Identity Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={mokshiPhoto}
                  alt="Mokshi Shah portrait"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/80 shadow-md shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                      {profileData.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      VJTI Matunga
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    B.Tech Computer Engineering '28 • Systems & Machine Learning
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>Background & Technical Focus</span>
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {profileData.bio}
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Core Research & Development Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* HCI Design Commitment Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-200/50 dark:border-indigo-900/50 flex items-start gap-3">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-slate-900 dark:text-white">
                  College Mini-Project Usability Commitment:
                </span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every interface element adheres to WCAG 2.2 AA accessibility (contrast ratio &ge; 4.5:1), visible focus states, full keyboard navigation, and explicit Nielsen heuristic implementations tested in our live Usability Lab.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Quick Facts (Miller's Law Chunking) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {profileData.quickFacts.map((fact, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-start justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {fact.label}
                  </span>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {fact.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {fact.sub}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
