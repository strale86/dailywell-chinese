import React, { useState, lazy, Suspense } from 'react';
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
import { UserStats, Task, Habit, WellnessEntry, PomodoroSession, Goal, Note } from '../types';
import { useTranslation } from 'react-i18next';

// Lazy load teške komponente
const AdvancedAnalytics = lazy(() => import('./AdvancedAnalytics').then(module => ({ default: module.AdvancedAnalytics })));

type ActiveTab = 'dashboard' | 'tasks' | 'habits' | 'wellness' | 'notes' | 'ai' | 'focus' | 'goals' | 'stats' | 'analytics' | 'premium';

interface MainAppProps {
  onLogout: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
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
         
         // State for premium
         const [isPremium, setIsPremium] = useState(false);

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

  // Task handlers
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
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

  // Habit handlers
  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completedDates: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const handleToggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      const today = new Date().toISOString().split('T')[0];
      const isCompletedToday = habit.completedDates.includes(today);
      
      if (habit.id === id) {
        if (isCompletedToday) {
          // Remove today from completed dates
          return {
            ...habit,
            completedDates: habit.completedDates.filter(date => date !== today),
            streak: Math.max(0, habit.streak - 1)
          };
        } else {
          // Add today to completed dates
          return {
            ...habit,
            completedDates: [...habit.completedDates, today],
            streak: habit.streak + 1
          };
        }
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  // Wellness handlers
  const handleAddWellnessEntry = (entry: Omit<WellnessEntry, 'date'>) => {
    const newEntry: WellnessEntry = {
      ...entry,
      date: new Date().toISOString().split('T')[0]
    };
    setWellnessEntries(prev => [...prev, newEntry]);
  };

  // Pomodoro handlers
  const handleSessionComplete = (sessionData: Omit<PomodoroSession, 'id' | 'date'>) => {
    const newSession: PomodoroSession = {
      ...sessionData,
      id: Date.now().toString(),
      date: new Date()
    };
    setPomodoroSessions(prev => [...prev, newSession]);
  };

  // Goal handlers
  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'current' | 'isCompleted' | 'createdAt' | 'progress'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      current: 0,
      isCompleted: false,
      createdAt: new Date().toISOString().split('T')[0],
      progress: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoal = (id: string, current: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const progress = Math.round((current / goal.target) * 100);
        return {
          ...goal,
          current,
          progress,
          isCompleted: progress >= 100
        };
      }
      return goal;
    }));
  };

           const handleDeleteGoal = (id: string) => {
           setGoals(prev => prev.filter(goal => goal.id !== id));
         };

         // Note handlers
         const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
           const newNote: Note = {
             ...noteData,
             id: Date.now().toString(),
             createdAt: new Date(),
             updatedAt: new Date(),
           };
           setNotes([...notes, newNote]);
         };

         const handleUpdateNote = (id: string, noteData: Partial<Note>) => {
           setNotes(notes.map(note => 
             note.id === id 
               ? { ...note, ...noteData, updatedAt: new Date() }
               : note
           ));
         };

         const handleDeleteNote = (id: string) => {
           setNotes(notes.filter(note => note.id !== id));
         };

           const renderActiveComponent = () => {
           switch (activeTab as ActiveTab) {
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
               return (
                 <AIRecommendations 
                   tasks={tasks}
                   habits={habits}
                   wellnessEntries={wellnessEntries}
                   goals={goals}
                   notes={notes}
                 />
               );
      case 'focus':
        return (
          <PomodoroTimer 
            onSessionComplete={handleSessionComplete}
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
      case 'analytics':
        return (
                     <Suspense fallback={<div>Loading Analytics...</div>}>
             <AdvancedAnalytics 
               tasks={tasks}
               habits={habits}
               wellnessEntries={wellnessEntries}
             />
           </Suspense>
        );
                   case 'premium':
               return (
                 <PremiumFeatures 
                   isPremium={isPremium}
                   onUpgrade={() => setIsPremium(true)}
                 />
               );
                   default:
               return (
                         <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('mainApp.pageNotFound')}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('mainApp.pageNotFoundDesc')}</p>
        </div>
               );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header stats={mockStats} onLogout={onLogout} />
      
      {/* Main content */}
             <main className="container mx-auto px-4 py-6">
               {renderActiveComponent()}
             </main>
           </div>
         );
       };
