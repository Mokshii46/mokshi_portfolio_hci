import { useState, useEffect } from 'react';
import usabilityTasksData from '../data/usabilityTasks.json';

const SUS_STORAGE_KEY = 'mokshi_portfolio_sus_v1';
const TASKS_STORAGE_KEY = 'mokshi_portfolio_tasks_v1';

// Default baseline SUS survey questions (Standard Brooke 1996 10-item instrument)
export const SUS_QUESTIONS = [
  "1. I think that I would like to use this system frequently.",
  "2. I found the system unnecessarily complex.",
  "3. I thought the system was easy to use.",
  "4. I think that I would need the support of a technical person to be able to use this system.",
  "5. I found the various functions in this system were well integrated.",
  "6. I thought there was too much inconsistency in this system.",
  "7. I would imagine that most people would learn to use this system very quickly.",
  "8. I found the system very cumbersome to use.",
  "9. I felt very confident using the system.",
  "10. I needed to learn a lot of things before I could get going with this system."
];

/**
 * Standard SUS formula:
 * For odd items (1, 3, 5, 7, 9): score contribution = response - 1
 * For even items (2, 4, 6, 8, 10): score contribution = 5 - response
 * Sum contributions and multiply by 2.5 to get 0 - 100 scale.
 * Formula simplified: ((sum of odd - 5) + (25 - sum of even)) * 2.5
 */
export function calculateSusScore(answers) {
  if (!answers || Object.keys(answers).length < 10) return null;

  let oddSum = 0;
  let evenSum = 0;

  for (let i = 1; i <= 10; i++) {
    const val = Number(answers[i] || 3);
    if (i % 2 !== 0) {
      oddSum += val;
    } else {
      evenSum += val;
    }
  }

  const score = ((oddSum - 5) + (25 - evenSum)) * 2.5;
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

export function getSusGrade(score) {
  if (score === null) return { grade: 'Pending', adjective: 'Incomplete', color: 'text-slate-400', percentile: 0 };
  if (score >= 85.5) return { grade: 'A+', adjective: 'Best Imaginable (Excellent)', color: 'text-emerald-600 dark:text-emerald-400', percentile: 96 };
  if (score >= 80.3) return { grade: 'A', adjective: 'Excellent', color: 'text-emerald-600 dark:text-emerald-400', percentile: 90 };
  if (score >= 74) return { grade: 'B', adjective: 'Good', color: 'text-indigo-600 dark:text-indigo-400', percentile: 70 };
  if (score >= 68) return { grade: 'C', adjective: 'Average / OK (Benchmark)', color: 'text-amber-600 dark:text-amber-400', percentile: 50 };
  if (score >= 51) return { grade: 'D', adjective: 'Poor', color: 'text-orange-600 dark:text-orange-400', percentile: 25 };
  return { grade: 'F', adjective: 'Awful', color: 'text-red-600 dark:text-red-400', percentile: 10 };
}

export function useUsabilityStore() {
  // SUS Survey State
  const [susAnswers, setSusAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(SUS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Task Evaluation State
  const [taskSessions, setTaskSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Initialize task sessions from usabilityTasksData
    const initial = {};
    usabilityTasksData.forEach(task => {
      initial[task.id] = {
        id: task.id,
        completed: false,
        durationSeconds: 0,
        errorsCount: 0,
        satisfaction: 5,
        testedAt: null,
      };
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(SUS_STORAGE_KEY, JSON.stringify(susAnswers));
  }, [susAnswers]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskSessions));
  }, [taskSessions]);

  const updateSusAnswer = (questionIndex, value) => {
    setSusAnswers(prev => ({
      ...prev,
      [questionIndex]: Number(value),
    }));
  };

  const updateTaskSession = (taskId, updates) => {
    setTaskSessions(prev => ({
      ...prev,
      [taskId]: {
        ...(prev[taskId] || {}),
        ...updates,
      },
    }));
  };

  const resetAllData = () => {
    const freshTasks = {};
    usabilityTasksData.forEach(task => {
      freshTasks[task.id] = {
        id: task.id,
        completed: false,
        durationSeconds: 0,
        errorsCount: 0,
        satisfaction: 5,
        testedAt: null,
      };
    });
    setSusAnswers({});
    setTaskSessions(freshTasks);
    localStorage.removeItem(SUS_STORAGE_KEY);
    localStorage.removeItem(TASKS_STORAGE_KEY);
  };

  const currentScore = calculateSusScore(susAnswers);
  const gradeInfo = getSusGrade(currentScore);

  // Computed task statistics
  const completedTasks = Object.values(taskSessions).filter(t => t.completed);
  const totalTasks = usabilityTasksData.length;
  const completionRate = Math.round((completedTasks.length / totalTasks) * 100);
  const avgTime = completedTasks.length > 0
    ? Math.round((completedTasks.reduce((acc, t) => acc + (t.durationSeconds || 0), 0) / completedTasks.length) * 10) / 10
    : 0;
  const totalErrors = Object.values(taskSessions).reduce((acc, t) => acc + (t.errorsCount || 0), 0);
  const avgSatisfaction = completedTasks.length > 0
    ? Math.round((completedTasks.reduce((acc, t) => acc + (t.satisfaction || 5), 0) / completedTasks.length) * 10) / 10
    : 5.0;

  return {
    susAnswers,
    updateSusAnswer,
    currentScore,
    gradeInfo,
    taskSessions,
    updateTaskSession,
    resetAllData,
    stats: {
      completionRate,
      completedCount: completedTasks.length,
      totalTasks,
      avgTime,
      totalErrors,
      avgSatisfaction,
    },
  };
}
