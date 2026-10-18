import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { 
  Mail, Phone, ExternalLink, 
  Copy, Check, Users, Sparkles, Trophy 
} from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

import profileData from '../../data/profile.json';

/**
 * HCI Principles Applied:
 * - Match with Real World: Standard recognizable icons and profiles.
 * - Visibility of System Status: Live 'Copied!' toast feedback when clicking copy actions.
 * - Fitts's Law: Generous target padding on social tiles.
 */
export function SocialSection({ onTriggerToast }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onTriggerToast) {
      onTriggerToast({
        type: 'success',
        title: 'Copied to Clipboard',
        message: `${label} (${text}) copied successfully.`,
      });
    }
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const socialLinks = [
    {
      key: 'github',
      name: 'GitHub',
      handle: '@Mokshii46',
      url: profileData.github,
      description: 'Repositories for CodeSage, eDNA taxonomy, JobLink, and Hacktoberfest contributions.',
      icon: Github,
      actionLabel: 'Visit GitHub Profile',
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      handle: 'in/mokshee46',
      url: profileData.linkedin,
      description: 'Professional networking, campus updates, and engineering internship announcements.',
      icon: Linkedin,
      actionLabel: 'Connect on LinkedIn',
    },
    {
      key: 'email',
      name: 'Email Inquiries',
      handle: profileData.email,
      url: `mailto:${profileData.email}`,
      description: 'Direct contact for research internships, engineering roles, and academic collaborations.',
      icon: Mail,
      isCopyable: true,
      copyValue: profileData.email,
      actionLabel: 'Send Direct Email',
    },
    {
      key: 'phone',
      name: 'Contact Phone',
      handle: profileData.phone,
      url: `tel:${profileData.phone}`,
      description: 'Direct phone & messaging contact for urgent recruitment and project verification.',
      icon: Phone,
      isCopyable: true,
      copyValue: profileData.phone,
      actionLabel: 'Call Phone Number',
    }
  ];

  return (
    <section id="social" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Network & Involvement"
          title="Social Channels & Campus Organizations"
          subtitle="Connect across developer communities, inspect open-source contributions, and explore VJTI student organizations."
          hciNote="Visibility of System Status (Clipboard Feedback) & Fitts's Law"
        />

        {/* Social Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedKey === item.key;
            return (
              <div
                key={item.key}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    {item.isCopyable && (
                      <button
                        type="button"
                        onClick={() => handleCopy(item.copyValue, item.key, item.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
                        title="Copy to clipboard"
                        aria-label={`Copy ${item.name} to clipboard`}
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 truncate">
                    {item.handle}
                  </div>

                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group"
                  >
                    <span>{item.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus Organizations Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Active VJTI Campus Societies & Leadership
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                As Department Head at Pratibimb (VJTI's annual cultural fest) and Mentee in Project X, I combine technical discipline with large-scale event orchestration and peer mentorship.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs">
                Pratibimb VJTI (Head)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs">
                Technovanza VJTI
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs">
                Project X Mentorship
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
