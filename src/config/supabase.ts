import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ektajmpzjmgagdwihfmc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdGFqbXB6am1nYWdkd2loZm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0ODkyMjMsImV4cCI6MjA3MTA2NTIyM30.Li24hc7keYnA7o29jCSwXWtD8DPXAiCTztSDJyRlZZA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  display_name?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  streak: number;
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed: boolean;
  date: string;
  created_at: string;
}

export interface WellnessCheck {
  id: string;
  user_id: string;
  mood: number;
  stress: number;
  energy: number;
  sleep?: number;
  exercise?: number;
  notes?: string;
  date: string;
  created_at: string;
}

export interface TimerSession {
  id: string;
  user_id: string;
  duration: number;
  type: 'focus' | 'break';
  completed: boolean;
  created_at: string;
}
