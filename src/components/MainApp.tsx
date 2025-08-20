import React, { useState } from 'react';
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
    ai: "AI",
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
    ai: "AI",
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

  // Mock stats data
  const mockStats: UserStats = {
    totalPoints: 0,
    level: 1,
    tasksCompleted: 0,
    habitsCompleted: 0,
    pomodoroSessions: 0,
    currentStreak: 0
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleAddHabit = (habit: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      streak: 0,
      completedDates: [],
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const handleToggleHabit = (id: string, date: string) => {
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
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const handleAddWellnessEntry = (entry: Omit<WellnessEntry, 'date'>) => {
    const newEntry: WellnessEntry = {
      ...entry,
      date: new Date().toISOString().split('T')[0],
    };
    setWellnessEntries(prev => [...prev, newEntry]);
  };

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
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
            stats={mockStats}
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
            stats={mockStats}
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
      <Header stats={mockStats} onLogout={onLogout} />
      
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-1 sm:px-2 md:px-4">
          <div className="space-y-1 sm:space-y-2 py-1 sm:py-2 md:py-4">
            {/* Prvi red - 5 opcija */}
            <div className="grid grid-cols-5 gap-0.5 sm:gap-1 md:gap-3">
              {[
                { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
                { id: 'tasks', label: t.tasks, icon: CheckSquare },
                { id: 'pomodoro', label: t.timer, icon: Timer },
                { id: 'habits', label: t.habits, icon: Target },
                { id: 'wellness', label: t.wellness, icon: Heart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center space-y-0.5 px-0.5 sm:px-1 md:px-2 py-1 sm:py-2 md:py-3 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="text-center leading-tight text-xs sm:text-xs md:text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Drugi red - 6 opcija */}
            <div className="grid grid-cols-6 gap-0.5 sm:gap-1 md:gap-3">
              {[
                { id: 'goals', label: t.goals, icon: Flag },
                { id: 'stats', label: t.stats, icon: TrendingUp },
                { id: 'premium', label: t.premium, icon: Star },
                { id: 'notes', label: t.notes, icon: FileText },
                { id: 'ai', label: t.ai, icon: Brain },
                { id: 'analytics', label: t.analytics, icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center space-y-0.5 px-0.5 sm:px-1 md:px-2 py-1 sm:py-2 md:py-3 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="text-center leading-tight text-xs sm:text-xs md:text-xs">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="container mx-auto px-1 sm:px-2 md:px-4 py-2 sm:py-4 md:py-6">
        {renderActiveComponent()}
      </main>
    </div>
  );
};
