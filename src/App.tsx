import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TaskManager } from './components/TaskManager';
import { HabitsTracker } from './components/HabitsTracker';
import { WellnessCheck } from './components/WellnessCheck';
import { PomodoroTimer } from './components/PomodoroTimer';
import { StatsDisplay } from './components/StatsDisplay';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, Habit, WellnessEntry, PomodoroSession, UserStats } from './types';


function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  
  // Data storage
  const [tasks, setTasks] = useLocalStorage<Task[]>('dailywell-tasks', []);
  const [habits, setHabits] = useLocalStorage<Habit[]>('dailywell-habits', []);
  const [wellnessEntries, setWellnessEntries] = useLocalStorage<WellnessEntry[]>('dailywell-wellness', []);
  const [pomodoroSessions, setPomodoroSessions] = useLocalStorage<PomodoroSession[]>('dailywell-pomodoro', []);
  const [userStats, setUserStats] = useLocalStorage<UserStats>('dailywell-stats', {
    totalPoints: 0,
    level: 1,
    tasksCompleted: 0,
    habitsCompleted: 0,
    pomodoroSessions: 0,
    currentStreak: 0,
  });

  // Calculate and update stats
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed);
    const totalHabitsCompleted = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
    const completedPomodoros = pomodoroSessions.filter(session => session.completed);
    
    const totalPoints = 
      (completedTasks.length * 10) + 
      (totalHabitsCompleted * 15) + 
      (completedPomodoros.length * 5) + 
      (wellnessEntries.length * 5);
    
    const level = Math.floor(totalPoints / 1000) + 1;
    
    const updatedStats: UserStats = {
      totalPoints,
      level,
      tasksCompleted: completedTasks.length,
      habitsCompleted: totalHabitsCompleted,
      pomodoroSessions: completedPomodoros.length,
      currentStreak: Math.max(...habits.map(h => h.streak), 0),
    };
    
    if (JSON.stringify(updatedStats) !== JSON.stringify(userStats)) {
      setUserStats(updatedStats);
    }
  }, [tasks, habits, pomodoroSessions, wellnessEntries, userStats, setUserStats]);

  // Task management
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined
          }
        : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Habit management
  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: crypto.randomUUID(),
      streak: 0,
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleHabit = (id: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(date);
        let newCompletedDates;
        
        if (isCompleted) {
          newCompletedDates = habit.completedDates.filter(d => d !== date);
        } else {
          newCompletedDates = [...habit.completedDates, date].sort();
        }
        
        // Calculate streak
        let streak = 0;
        const sortedDates = newCompletedDates.sort().reverse();
        
        for (let i = 0; i < sortedDates.length; i++) {
          const expectedDate = new Date();
          expectedDate.setDate(expectedDate.getDate() - i);
          
          if (sortedDates[i] === expectedDate.toISOString().split('T')[0]) {
            streak++;
          } else {
            break;
          }
        }
        
        return {
          ...habit,
          completedDates: newCompletedDates,
          streak,
        };
      }
      return habit;
    }));
  };

  // Wellness management
  const handleAddWellnessEntry = (entry: WellnessEntry) => {
    setWellnessEntries(prev => {
      const existingIndex = prev.findIndex(e => e.date === entry.date);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = entry;
        return updated;
      }
      return [...prev, entry];
    });
  };

  // Pomodoro management
  const handlePomodoroComplete = (session: Omit<PomodoroSession, 'id'>) => {
    const newSession: PomodoroSession = {
      ...session,
      id: crypto.randomUUID(),
    };
    setPomodoroSessions([...pomodoroSessions, newSession]);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
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
          />
        );
      case 'wellness':
        return (
          <WellnessCheck
            entries={wellnessEntries}
            onAddEntry={handleAddWellnessEntry}
          />
        );
      case 'focus':
        return (
          <PomodoroTimer
            onSessionComplete={handlePomodoroComplete}
          />
        );
      case 'stats':
        return (
          <StatsDisplay
            stats={userStats}
            tasks={tasks}
            habits={habits}
            wellnessEntries={wellnessEntries}
            pomodoroSessions={pomodoroSessions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header stats={userStats} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;