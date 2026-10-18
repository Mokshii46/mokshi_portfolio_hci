import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Briefcase, Users, GitBranch, Trophy, Calendar, MapPin, CheckCircle } from 'lucide-react';
import experienceData from '../../data/experience.json';

/**
 * HCI Principles Applied:
 * - Consistency and Standards (Nielsen #4): Standardized card layout with role, organization, and responsibilities.
 * - F-Pattern Reading Flow: Bold headings on top-left, timeline badges on top-right, bullet points with icons.
 * - Match Real World: Clear professional terminology (Department Head, Mentee, Open Source, Logistics).
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Leadership & Professional"
          title="Campus Involvement & Technical Roles"
          subtitle="Department leadership at Pratibimb, mentorship in Project X, open source contributions, and national hackathons."
          hciNote="F-Pattern Scanning & Consistency of Experience Cards"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {exp.type}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {exp.organization} • <span className="text-xs text-slate-500 font-normal">{exp.location}</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                    Key Achievements & Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
