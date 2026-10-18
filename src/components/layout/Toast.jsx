import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Undo2 } from 'lucide-react';

/**
 * HCI Principle: Visibility of System Status (Nielsen #1) & User Control (Nielsen #3)
 * Non-intrusive toast notification providing clear confirmation of background operations
 * with built-in action reversal (Undo) where applicable.
 */
export function Toast({ toast, onClose, onUndo }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 4500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <aside
      className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] sm:w-auto flex items-center gap-3 p-4 rounded-xl shadow-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 animate-slide-up transition-all"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="shrink-0">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-500" />}
      </div>

      <div className="flex-1 text-sm">
        <p className="font-semibold text-xs tracking-wide uppercase text-slate-500 dark:text-slate-400">
          {toast.title || (isSuccess ? 'Success' : isError ? 'Attention' : 'Notification')}
        </p>
        <p className="mt-0.5 text-slate-800 dark:text-slate-200 leading-snug">
          {toast.message}
        </p>
      </div>

      {onUndo && toast.hasUndo && (
        <button
          type="button"
          onClick={() => { onUndo(); onClose(); }}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center gap-1 transition-colors touch-target focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Undo previous action"
        >
          <Undo2 className="w-3 h-3" />
          <span>Undo</span>
        </button>
      )}

      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
