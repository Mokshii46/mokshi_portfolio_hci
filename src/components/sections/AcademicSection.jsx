import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GraduationCap, BookOpen, Award, CheckCircle, ExternalLink, Calendar, MapPin } from 'lucide-react';
import academicsData from '../../data/academics.json';

/**
 * HCI Principles Applied:
 * - Gestalt Principle of Similarity: Coursework tags share identical visual weight and contrast.
 * - Progressive Disclosure: Categorized coursework tabs allowing focused exploration without clutter.
 * - Match with Real World: Familiar academic terminology (CGPA, SGPA, Autonomous Institute, Semester).
 */
export function AcademicSection() {
  const [activeCourseCategory, setActiveCourseCategory] = useState(0);

  return (
    <section id="academics" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Academic Background"
          title="Education, Coursework & Credentials"
          subtitle="Autonomous engineering curriculum at VJTI Matunga, competitive exam benchmarks, and certified cloud specializations."
          hciNote="Progressive Disclosure (Coursework Domains) & Gestalt Similarity"
        />

        {/* Education Timeline */}
        <div className="space-y-6 mb-12">
          {academicsData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {edu.degree}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
                    {edu.institution}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="lg:text-right shrink-0">
                  <span className="inline-block px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base border border-slate-200 dark:border-slate-700">
                    {edu.score}
                  </span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    {edu.subScore}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {edu.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Coursework Tabs (Progressive Disclosure) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Rigorous Computer Engineering Coursework</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Categorized according to academic domains (Click tabs to inspect modules)
              </p>
            </div>

            {/* Domain Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl" role="tablist">
              {academicsData.coursework.map((group, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeCourseCategory === index}
                  onClick={() => setActiveCourseCategory(index)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all touch-target ${
                    activeCourseCategory === index
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {group.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
              {academicsData.coursework[activeCourseCategory].category}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {academicsData.coursework[activeCourseCategory].courses.map((course) => (
                <span
                  key={course}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-400 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Academic Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Certifications */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-indigo-500" />
              <span>Industry & Open Source Certifications</span>
            </h3>
            <div className="space-y-4">
              {academicsData.certifications.map((cert, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {cert.title}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      {cert.date}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Issuer: {cert.issuer}
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Honors */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-emerald-500" />
              <span>Academic Accolades & State Ranks</span>
            </h3>
            <div className="space-y-4">
              {academicsData.academicAchievements.map((ach, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {ach.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {ach.rank}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ach.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
