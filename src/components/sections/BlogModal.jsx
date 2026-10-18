import React from 'react';
import { Modal } from '../common/Modal';
import { Calendar, Clock, Tag, BookOpen, Share2, ArrowLeft } from 'lucide-react';

/**
 * HCI Principle: Aesthetic and Minimalist Design (Nielsen #8) & User Control (Nielsen #3)
 * Focused reader view with comfortable typographic measure (max 70 characters per line)
 * and clear markdown structure to optimize readability and visual comfort.
 */
export function BlogModal({ article, isOpen, onClose }) {
  if (!article) return null;

  // Simple parser to render headings, lists, bold text and code snippets
  const renderFormattedContent = (content) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('1. ') || block.startsWith('- ')) {
        const items = block.split('\n');
        return (
          <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>
                {item.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {block}
        </p>
      );
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={article.title}
      subtitle={`${article.category} • ${article.date}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              {article.readTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Excerpt Lead */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-indigo-600 text-slate-700 dark:text-slate-300 text-sm sm:text-base italic font-serif">
          "{article.excerpt}"
        </div>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none space-y-4">
          {renderFormattedContent(article.content)}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Written by <strong>Mokshi Shah</strong> (VJTI Computer Engineering)
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Articles</span>
          </button>
        </div>

      </div>
    </Modal>
  );
}
