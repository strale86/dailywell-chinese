import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { 
  BarChart3, 
  CheckSquare, 
  Timer, 
  Target, 
  Heart, 
  Flag, 
  TrendingUp, 
  Star, 
  FileText, 
  Brain, 
  Activity 
} from 'lucide-react';
import { Header } from './Header';
import { Dashboard } from './Dashboard';
import { TaskManager } from './TaskManager';
import { PomodoroTimer } from './PomodoroTimer';
import { HabitsTracker } from './HabitsTracker';
import { WellnessCheck } from './WellnessCheck';
import { GoalSetting } from './GoalSetting';
import { StatsDisplay } from './StatsDisplay';
import { PremiumFeatures } from './PremiumFeatures';
import { Notes } from './Notes';
import { AIRecommendations } from './AIRecommendations';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { UserStats, Task, Habit, WellnessEntry, PomodoroSession, Goal, Note } from '../types';

// Static translations for navigation
const translations = {
  en: {
    dashboard: "Dashboard",
    tasks: "Tasks",
    timer: "Timer",
    habits: "Habits",
    wellness: "Wellness",
    goals: "Goals",
    stats: "Stats",
    premium: "Premium",
    notes: "Notes",
    ai: "AI",
    analytics: "Analytics",
    selectTab: "Select a tab to get started"
  },
  sr: {
    dashboard: "Kontrolna tabla",
    tasks: "Zadaci",
    timer: "Timer",
    habits: "Navike",
    wellness: "Wellness",
    goals: "Ciljevi",
    stats: "Statistike",
    premium: "Premium",
    notes: "Beleške",
    ai: "Vestacka inteligencija",
    analytics: "Analitika",
    selectTab: "Izaberite tab da započnete"
  },
  zh: {
    dashboard: "仪表板",
    tasks: "任务",
    timer: "计时器",
    habits: "习惯",
    wellness: "健康",
    goals: "目标",
    stats: "统计",
    premium: "高级版",
    notes: "笔记",
    ai: "人工智能",
    analytics: "分析",
    selectTab: "选择一个标签开始"
  }
};

type ActiveTab = 'dashboard' | 'tasks' | 'pomodoro' | 'habits' | 'wellness' | 'goals' | 'stats' | 'premium' | 'notes' | 'ai' | 'analytics';

interface MainAppProps {
  onLogout: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // State for habits
  const [habits, setHabits] = useState<Habit[]>([]);
  
  // State for wellness entries
  const [wellnessEntries, setWellnessEntries] = useState<WellnessEntry[]>([]);
  
  // State for pomodoro sessions
  const [pomodoroSessions, setPomodoroSessions] = useState<PomodoroSession[]>([]);
  
  // State for goals
  const [goals, setGoals] = useState<Goal[]>([]);
  
  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);

  // Stats state
  const [stats, setStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    tasksCompleted: 0,
    habitsCompleted: 0,
    pomodoroSessions: 0,
    currentStreak: 0
  });

  // Function to add points and update level
  const addPoints = (points: number) => {
    setStats(prevStats => {
      const newTotalPoints = prevStats.totalPoints + points;
      const newLevel = Math.floor(newTotalPoints / 1000) + 1;
      return {
        ...prevStats,
        totalPoints: newTotalPoints,
        level: newLevel
      };
    });
  };

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleAddTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const handleToggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const handleAddHabit = useCallback((habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      streak: 0,
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const handleToggleHabit = useCallback((id: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const completedDates = habit.completedDates || [];
        const newCompletedDates = completedDates.includes(date)
          ? completedDates.filter(d => d !== date)
          : [...completedDates, date];
        return { ...habit, completedDates: newCompletedDates };
      }
      return habit;
    }));
  }, []);

  const handleDeleteHabit = useCallback((id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }, []);

  const handleAddWellnessEntry = useCallback((entry: Omit<WellnessEntry, 'date'>) => {
    const newEntry: WellnessEntry = {
      ...entry,
      date: new Date().toISOString().split('T')[0],
    };
    setWellnessEntries(prev => [...prev, newEntry]);
  }, []);

  const handleDeleteWellnessEntry = useCallback((date: string) => {
    setWellnessEntries(prev => prev.filter(entry => entry.date !== date));
  }, []);

  const handlePomodoroSessionComplete = (session: Omit<PomodoroSession, 'id'>) => {
    const newSession: PomodoroSession = {
      ...session,
      id: Date.now().toString(),
    };
    setPomodoroSessions(prev => [...prev, newSession]);
  };

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'current' | 'isCompleted' | 'progress'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      current: 0,
      isCompleted: false,
      progress: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoal = (id: string, current: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, current } : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const handleAddNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('MainApp handleAddNote called', note);
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('Adding note to state', newNote);
    setNotes(prev => [...prev, newNote]);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            stats={stats}
            tasks={tasks}
            habits={habits}
            wellnessEntries={wellnessEntries}
            pomodoroSessions={pomodoroSessions}
            goals={goals}
            notes={notes}
          />
        );
      case 'tasks':
        return (
          <TaskManager
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'pomodoro':
        return (
          <PomodoroTimer onSessionComplete={handlePomodoroSessionComplete} />
        );
      case 'habits':
        return (
          <HabitsTracker
            habits={habits}
            onAddHabit={handleAddHabit}
            onToggleHabit={handleToggleHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        );
      case 'wellness':
        return (
          <WellnessCheck
            entries={wellnessEntries}
            onAddEntry={handleAddWellnessEntry}
            onDeleteEntry={handleDeleteWellnessEntry}
          />
        );
      case 'goals':
        return (
          <GoalSetting
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        );
      case 'stats':
        return (
          <StatsDisplay
            stats={stats}
            tasks={tasks}
            habits={habits}
            wellnessEntries={wellnessEntries}
            pomodoroSessions={pomodoroSessions}
          />
        );
      case 'premium':
        return <PremiumFeatures isPremium={false} onUpgrade={() => {}} />;
      case 'notes':
        return (
          <Notes
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        );
      case 'ai':
        return <AIRecommendations tasks={tasks} habits={habits} wellnessEntries={wellnessEntries} goals={goals} notes={notes} />;
      case 'analytics':
        return <AdvancedAnalytics tasks={tasks} habits={habits} wellnessEntries={wellnessEntries} />;
      default:
        return <div>{t.selectTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header stats={stats} onLogout={onLogout} />
      
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-2">
          <div className="space-y-2 py-2">
            {/* Prvi red - 5 opcija */}
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: 'dashboard', label: t.dashboard, icon: BarChart3, color: '#EA580C' },
                { id: 'tasks', label: t.tasks, icon: CheckSquare, color: '#10B981' },
                { id: 'pomodoro', label: t.timer, icon: Timer, color: '#F59E0B' },
                { id: 'habits', label: t.habits, icon: Target, color: '#8B5CF6' },
                { id: 'wellness', label: t.wellness, icon: Heart, color: '#EC4899' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-2 py-3 text-xs font-medium rounded-lg transition-colors touch-manipulation ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon 
                    className="w-5 h-5" 
                    style={{ 
                      stroke: activeTab === tab.id ? '#2563EB' : tab.color
                    }}
                  />
                  <span className="text-center leading-tight text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Drugi red - 6 opcija */}
            <div className="grid grid-cols-6 gap-1">
              {[
                { id: 'goals', label: t.goals, icon: Flag, color: '#6366F1' },
                { id: 'stats', label: t.stats, icon: TrendingUp, color: '#374151' },
                { id: 'premium', label: t.premium, icon: Star, color: '#EAB308' },
                { id: 'notes', label: t.notes, icon: FileText, color: '#991B1B' },
                { id: 'ai', label: t.ai, icon: Brain, color: '#F87171' },
                { id: 'analytics', label: t.analytics, icon: Activity, color: '#EF4444' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-1 py-3 text-xs font-medium rounded-lg transition-colors touch-manipulation ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon 
                    className="w-5 h-5" 
                    style={{ 
                      color: activeTab === tab.id ? '#2563EB' : tab.color,
                      fill: activeTab === tab.id ? '#2563EB' : tab.color
                    }}
                  />
                  <span className="text-center leading-tight text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="container mx-auto px-2 py-4">
        <Suspense fallback={
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }>
          {renderActiveComponent()}
        </Suspense>
      </main>
    </div>
  );
};
