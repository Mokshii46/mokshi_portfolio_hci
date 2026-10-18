import React from 'react';
import { Modal } from '../common/Modal';
import { 
  ExternalLink, Cpu, GitBranch, Layers, 
  CheckCircle, ArrowRight, Activity, ShieldCheck 
} from 'lucide-react';
import { Github } from '../common/Icons';


/**
 * HCI Principles Applied:
 * - Progressive Disclosure: Deep 6-stage architecture diagrams and quantitative metrics
 *   revealed on demand without cluttering the main grid.
 * - Shneiderman's Rule of Yielding Closure: Clear modal boundaries, complete project specifications.
 * - User Control and Freedom (Nielsen #3): Esc key and explicit exit actions.
 */
export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={project.subtitle}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Top Badges & External Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {project.period}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Walkthrough</span>
              </a>
            )}
          </div>
        </div>

        {/* High-Level Summary */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Engineering Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Quantitative Performance Metrics (Miller's Law Chunking) */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Verified Benchmark Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {m.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6-Stage / Multi-Stage Architectural Pipeline */}
        {project.architecture && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Architectural Execution Pipeline</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                >
                  <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{stage.step}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Architectural Highlights */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            Key Engineering Contributions
          </h3>
          <ul className="space-y-2">
            {project.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Complete Tech Stack */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Technology Stack & Libraries
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* HCI Annotation Note */}
        {project.hciHighlights && (
          <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 flex items-start gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-indigo-900 dark:text-indigo-200">HCI Design Integration:</strong> {project.hciHighlights}
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
}
