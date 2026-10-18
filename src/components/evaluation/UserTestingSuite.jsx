import React, { useState, useEffect } from 'react';
import { 
  Play, CheckCircle2, Clock, AlertTriangle, Star, 
  RotateCcw, ArrowRight, ShieldCheck, HelpCircle, Check 
} from 'lucide-react';
import usabilityTasksData from '../../data/usabilityTasks.json';

/**
 * HCI Task-Based User Testing Plan
 * Measures core empirical metrics:
 * 1. Task Success Rate (%)
 * 2. Time on Task (Seconds)
 * 3. Error Frequency Count
 * 4. User Satisfaction (1-5 Likert scale)
 */
export function UserTestingSuite({ taskSessions, onUpdateTaskSession, onTriggerToast }) {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Active stopwatch timer
  useEffect(() => {
    let interval = null;
    if (activeTaskId) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeTaskId]);

  const handleStartTask = (taskId) => {
    setActiveTaskId(taskId);
    setElapsedSeconds(0);
    if (onTriggerToast) {
      onTriggerToast({
        type: 'info',
        title: 'Task Timer Started',
        message: `Task ${taskId} is now active. Follow the goal instructions and complete the action.`,
      });
    }
  };

  const handleCompleteTask = (taskId) => {
    const finalDuration = elapsedSeconds || 12;
    onUpdateTaskSession(taskId, {
      completed: true,
      durationSeconds: finalDuration,
      testedAt: new Date().toISOString(),
    });
    setActiveTaskId(null);

    if (onTriggerToast) {
      onTriggerToast({
        type: 'success',
        title: 'Task Marked Complete!',
        message: `Finished in ${finalDuration}s with status logged in localStorage.`,
      });
    }
  };

  const handleIncrementError = (taskId) => {
    const current = taskSessions[taskId]?.errorsCount || 0;
    onUpdateTaskSession(taskId, { errorsCount: current + 1 });
  };

  const handleDecrementError = (taskId) => {
    const current = taskSessions[taskId]?.errorsCount || 0;
    if (current > 0) {
      onUpdateTaskSession(taskId, { errorsCount: current - 1 });
    }
  };

  const handleSetSatisfaction = (taskId, score) => {
    onUpdateTaskSession(taskId, { satisfaction: score });
  };

  const handleJumpToSection = (targetPath) => {
    if (targetPath.includes('Projects')) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (targetPath.includes('Hero') || targetPath.includes('Resume')) {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    } else if (targetPath.includes('Blog')) {
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    } else if (targetPath.includes('Contact')) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="evaluation-tasks" className="space-y-6">
      
      {/* Overview Card */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="space-y-1">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Interactive 5-Task User Evaluation Suite</span>
          </span>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Start the timer, complete the scenario on the page, tally any cognitive stumbles, and record satisfaction.
          </p>
        </div>

        {activeTaskId && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono font-bold animate-pulse text-xs shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Active Timer: {elapsedSeconds}s</span>
          </div>
        )}
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {usabilityTasksData.map((task, idx) => {
          const session = taskSessions[task.id] || {
            completed: false,
            durationSeconds: 0,
            errorsCount: 0,
            satisfaction: 5,
          };
          const isTimerActive = activeTaskId === task.id;

          return (
            <div
              key={task.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                session.completed
                  ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                  : isTimerActive
                  ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                {/* Task Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Task {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      HCI Principle: {task.hciPrinciple}
                    </span>
                    {session.completed && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        <Check className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {task.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Scenario:</strong>{' '}
                      <span className="text-slate-600 dark:text-slate-400">{task.scenario}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Goal:</strong>{' '}
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{task.goal}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Success Criteria:</strong>{' '}
                      <span className="text-emerald-700 dark:text-emerald-400">{task.successCriteria}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Controls & Metrics Tracker */}
                <div className="lg:w-80 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 shrink-0 text-xs">
                  
                  {/* Timer & Completion Actions */}
                  <div className="flex items-center gap-2">
                    {!isTimerActive ? (
                      <button
                        type="button"
                        onClick={() => handleStartTask(task.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{session.completed ? 'Re-Test Task' : 'Start Task Timer'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCompleteTask(task.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs transition-colors animate-bounce"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Task Done ({elapsedSeconds}s)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleJumpToSection(task.targetPath)}
                      className="px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold"
                      title="Jump to relevant section"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Recorded Duration */}
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Time on task:</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {session.completed ? `${session.durationSeconds}s` : isTimerActive ? `${elapsedSeconds}s (live)` : 'Pending'}
                    </span>
                  </div>

                  {/* Error Tally Counter */}
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Error count:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrementError(task.id)}
                        className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-300"
                        title="Decrement error count"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-slate-900 dark:text-white w-4 text-center">
                        {session.errorsCount || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrementError(task.id)}
                        className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-300"
                        title="Increment error count"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 1-5 Star Satisfaction Rating */}
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span>Satisfaction:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleSetSatisfaction(task.id, star)}
                          className="p-0.5 text-amber-400 hover:scale-110 transition-transform"
                          title={`Rate ${star} out of 5`}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              (session.satisfaction || 5) >= star ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
