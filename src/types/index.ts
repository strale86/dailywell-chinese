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