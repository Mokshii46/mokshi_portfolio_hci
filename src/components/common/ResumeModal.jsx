import React from 'react';
import { Modal } from './Modal';
import { Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

/**
 * HCI Principle: Match with Real World & Fitts's Law
 * Clean, printable digital resume view presenting authentic credentials directly,
 * with clear downloadable affordances and print stylesheet compatibility.
 */
export function ResumeModal({ isOpen, onClose, onDownload }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (onDownload) onDownload();
    
    // Create a downloadable formatted text/html blob or trigger print
    const resumeText = `Mokshi Shah - B.Tech Computer Engineering, VJTI Matunga\nCGPA: 8.94 | SGPA: 9.48\nEmail: mokshishah0501@gmail.com | Phone: +91 7506176003\nGitHub: https://github.com/Mokshii46 | LinkedIn: https://linkedin.com/in/mokshee46\n\nProjects: CodeSage (AST Compiler & BiLSTM), eDNA Taxonomy (VAE & HDBSCAN), JobLink (Supabase & Groq), FloatChat (SIH 2025)\nAchievements: Hacktoberfest Supercontributor, AWS Cloud Practitioner Essentials, 1st Place Pratibimb VJTI, MHT-CET State Rank 152.`;
    
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mokshi_Shah_Resume_VJTI.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum Vitae — Mokshi Shah"
      subtitle="B.Tech Computer Engineering • Veermata Jijabai Technological Institute (VJTI)"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Verified VJTI Autonomous Institute Student Credentials</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Layout */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 font-sans text-slate-800 dark:text-slate-200 shadow-xs">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mokshi Shah
            </h1>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
              Veermata Jijabai Technological Institute (VJTI), Matunga, Mumbai
            </p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                +91 7506176003
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                mokshishah0501@gmail.com
              </span>
              <a href="https://linkedin.com/in/mokshee46" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                linkedin.com/in/mokshee46
              </a>
              <a href="https://github.com/Mokshii46" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                github.com/Mokshii46
              </a>
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Veermata Jijabai Technological Institute (VJTI), Matunga
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Bachelor of Technology in Computer Engineering — <span className="font-semibold text-emerald-600 dark:text-emerald-400">CGPA: 8.94 / SGPA: 9.48</span>
                  </p>
                </div>
                <span className="font-mono text-slate-500">Aug 2024 – Present</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Prakash College of Commerce and Science
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    HSC: 90.50% — <span className="font-semibold">MHT-CET: 99.94%ile (State Rank 152)</span> — JEE-Mains: 97.58%ile
                  </p>
                </div>
                <span className="font-mono text-slate-500">Aug 2022 – May 2024</span>
              </div>
            </div>
          </section>

          {/* Relevant Coursework */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
              Relevant Coursework
            </h2>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {[
                'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems',
                'Software Engineering', 'Object Oriented Programming', 'Machine Learning',
                'Artificial Intelligence', 'Natural Language Processing', 'Discrete Mathematics', 'Linear Algebra'
              ].map(course => (
                <span key={course} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {course}
                </span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
              Technical Projects
            </h2>
            <div className="space-y-3.5 text-xs">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    CODESAGE | Python, NLP, AST, Regex, BiLSTM
                    <span className="font-normal text-xs text-slate-500">Jul 2025 – Oct 2025</span>
                  </h3>
                </div>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Built CodeSage, an AI-powered code explanation engine with a 6-stage pipeline (lexer → parser → AST → summarizer → interpreter → NLP) and custom recursive-descent parser supporting 5+ Python constructs and 15+ AST node types.</li>
                  <li>Trained a seq2seq BiLSTM decoder on 5,000 labeled code-summary pairs (30 epochs) and replaced GPT-4o-mini with an AST-based rule engine, reducing external API calls by 100%.</li>
                  <li>Developed Tkinter GUI with interpreter output, AST visualization, reducing latency by 40%.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    eDNA Taxonomy and Biodiversity | TensorFlow, scikit-learn, HDBSCAN, NumPy
                    <span className="font-normal text-xs text-slate-500">Aug 2025 – Oct 2025</span>
                  </h3>
                </div>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Engineered AI-driven eDNA pipeline processing 20,000+ sequences, compressing 256-dim k-mer vectors into 32-dim VAE embeddings (87.5% reduction) bypassing reference databases.</li>
                  <li>Applied HDBSCAN clustering on VAE latent space for de novo taxonomic identification, isolating 8+ known species clusters and flagging ~20% novel OTUs with 85–99% confidence.</li>
                  <li>Deployed Flask REST API serving UMAP 2D projections and 4 ecological biodiversity indices.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    JobLink – AI-Powered Job Matching Platform | React, Node.js, Supabase, Groq
                    <span className="font-normal text-xs text-slate-500">Dec 2025 – Feb 2026</span>
                  </h3>
                </div>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Full-stack platform with Groq LLM resume parsing, extracting 5+ contact fields and 6 skill taxonomy categories, stored across 4 Supabase PostgreSQL tables with RLS.</li>
                  <li>Designed RESTful API with 14+ endpoints, JWT auth, RBAC, and in-memory rate limiting (100 req/15 min).</li>
                  <li>Cross-referenced resume vectors against job requirements with 85–99% match confidence scores.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Responsibilities & Achievements */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
              Leadership & Achievements
            </h2>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p>
                <strong className="text-slate-900 dark:text-white">Department Head | Pratibimb, VJTI (Nov 2025 – Present):</strong> Led a committee of 8 coordinating logistics across 3-day cultural fest; won 1st Place Trophy overall.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Mentee | Project X, VJTI (Jul 2025 – Present):</strong> 3-month mentorship designing Python interpreter and NLP engine; earned <strong>Hacktoberfest Supercontributor</strong> distinction.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">AWS Cloud Practitioner (Aug 2026):</strong> Completed AWS Cloud Practitioner Essentials (AWS Training & Certification).
              </p>
            </div>
          </section>

        </div>
      </div>
    </Modal>
  );
}
