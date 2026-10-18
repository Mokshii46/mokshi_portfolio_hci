import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { HeuristicsTable } from './HeuristicsTable';
import { UserTestingSuite } from './UserTestingSuite';
import { SusQuestionnaire } from './SusQuestionnaire';
import { UsabilityMetricsChart } from './UsabilityMetricsChart';
import { BeforeAfterSection } from './BeforeAfterSection';
import { AuditScorecard } from './AuditScorecard';
import { 
  Activity, Award, CheckCircle2, BarChart3, 
  RotateCcw, Download, Sparkles, Layers, ShieldCheck, Printer, FileText 
} from 'lucide-react';

/**
 * HCI Principles Applied:
 * - Hick's Law: Tabbed interface chunks the extensive evaluation documentation into 6 digestible panels.
 * - Visibility of System Status (Nielsen #1): Live calculation of SUS and user task completion rate in real time.
 * - User Control and Freedom (Nielsen #3): Data reset and export affordances.
 */
export function EvaluationDashboard({
  store,
  onTriggerToast,
}) {
  const [activeTab, setActiveTab] = useState('heuristics');

  const {
    susAnswers,
    updateSusAnswer,
    currentScore,
    gradeInfo,
    taskSessions,
    updateTaskSession,
    resetAllData,
    stats,
  } = store;

  const tabs = [
    { id: 'heuristics', label: '10 Heuristics Audit', icon: ShieldCheck, badge: 'Nielsen' },
    { id: 'tasks', label: '5-Task User Tests', icon: CheckCircle2, badge: `${stats.completedCount}/5 Done` },
    { id: 'sus', label: 'SUS Questionnaire', icon: Award, badge: currentScore !== null ? `Score ${currentScore}` : '10 Items' },
    { id: 'metrics', label: 'Analytics & Charts', icon: BarChart3, badge: `${stats.completionRate}% Success` },
    { id: 'before-after', label: 'Before & After Fixes', icon: Sparkles, badge: '5 Refinements' },
    { id: 'audit', label: 'Lighthouse & axe', icon: Activity, badge: 'WCAG 2.2 AA' },
  ];

  const handleExportJson = () => {
    const exportPayload = {
      project: "Interactive Personal Professional Profile - Usability Evaluation",
      owner: "Mokshi Shah (VJTI Matunga)",
      evaluatedAt: new Date().toISOString(),
      compositeSusScore: currentScore,
      susGrade: gradeInfo,
      susAnswers,
      taskSessions,
      aggregateStats: stats,
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mokshi_HCI_Usability_Evaluation_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onTriggerToast) {
      onTriggerToast({
        type: 'success',
        title: 'Evaluation Data Exported',
        message: 'JSON file with SUS scores and task benchmarks has been downloaded.',
      });
    }
  };

  const handleConfirmReset = () => {
    if (window.confirm('Reset all task timings, error tallies, and SUS survey responses in localStorage?')) {
      resetAllData();
      if (onTriggerToast) {
        onTriggerToast({
          type: 'info',
          title: 'Evaluation Data Reset',
          message: 'All task logs and survey inputs have been cleared.',
        });
      }
    }
  };

  return (
    <section id="evaluation" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Academic Usability Engineering Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Usability Evaluation & HCI Research
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Formal empirical evaluation featuring Nielsen's 10 Usability Heuristics, standardized 10-item System Usability Scale (SUS), 5 task-based user walkthroughs, and automated WCAG 2.2 AA audits.
            </p>
          </div>

          {/* Reset & Export Actions (User Control) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
              title="Print or Save PDF report for college submission"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleConfirmReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-xs"
              title="Reset all recorded evaluation data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              title="Download full evaluation metrics JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation (Hick's Law Chunking) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all touch-target flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
                <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div>
          {activeTab === 'heuristics' && <HeuristicsTable />}
          {activeTab === 'tasks' && (
            <UserTestingSuite
              taskSessions={taskSessions}
              onUpdateTaskSession={updateTaskSession}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeTab === 'sus' && (
            <SusQuestionnaire
              answers={susAnswers}
              onUpdateAnswer={updateSusAnswer}
              score={currentScore}
              gradeInfo={gradeInfo}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeTab === 'metrics' && (
            <UsabilityMetricsChart
              stats={stats}
              taskSessions={taskSessions}
              currentScore={currentScore}
            />
          )}
          {activeTab === 'before-after' && <BeforeAfterSection />}
          {activeTab === 'audit' && <AuditScorecard />}
        </div>

      </div>
    </section>
  );
}
