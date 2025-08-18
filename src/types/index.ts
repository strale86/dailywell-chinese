export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  completedDates: string[];
  target: number;
  unit: string;
  category: 'health' | 'productivity' | 'learning' | 'wellness' | 'fitness' | 'personal';
  description?: string;
  reminder?: string; // time for reminder
  challengeDays?: number; // for 30-day challenges
  startDate: string;
  totalCompletions: number;
  bestStreak: number;
  isActive: boolean;
}

export interface HabitCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface HabitChallenge {
  id: string;
  name: string;
  description: string;
  days: number;
  startDate: string;
  endDate: string;
  completedDays: string[];
  isActive: boolean;
}

export interface WellnessEntry {
  date: string;
  mood: number; // 1-5 scale
  stress: number; // 1-5 scale
  energy: number; // 1-5 scale
  notes?: string;
}

export interface PomodoroSession {
  id: string;
  duration: number;
  completed: boolean;
  date: Date;
  task?: string;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  tasksCompleted: number;
  habitsCompleted: number;
  pomodoroSessions: number;
  currentStreak: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'learning' | 'wellness' | 'fitness' | 'personal';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
  progress: number; // percentage
}

export interface AnalyticsData {
  weeklyProgress: {
    date: string;
    tasks: number;
    habits: number;
    focus: number;
  }[];
  monthlyStats: {
    totalTasks: number;
    completedTasks: number;
    totalHabits: number;
    completedHabits: number;
    focusSessions: number;
    totalMinutes: number;
  };
  streaks: {
    currentStreak: number;
    bestStreak: number;
    averageStreak: number;
  };
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isEditing?: boolean;
}