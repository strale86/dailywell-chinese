import { supabase } from '../config/supabase';
import type { User, Task, Habit, HabitLog, WellnessCheck, TimerSession } from '../config/supabase';

// Auth service
export const authService = {
  // Sign up with email
  async signUp(email: string, password: string, displayName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });
    
    if (error) throw error;
    
    // Create user profile
    if (data.user) {
      await this.createUserProfile(data.user.id, email, displayName);
    }
    
    return data.user;
  },

  // Sign in with email
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Create user profile
  async createUserProfile(userId: string, email: string, displayName?: string) {
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        display_name: displayName
      });
    
    if (error) throw error;
  }
};

// Tasks service
export const tasksService = {
  // Get all tasks for user
  async getTasks(userId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Task[];
  },

  // Create new task
  async createTask(userId: string, task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        ...task
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  // Update task
  async updateTask(taskId: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  // Delete task
  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    
    if (error) throw error;
  }
};

// Habits service
export const habitsService = {
  // Get all habits for user
  async getHabits(userId: string) {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Habit[];
  },

  // Create new habit
  async createHabit(userId: string, habit: Omit<Habit, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: userId,
        ...habit
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Habit;
  },

  // Update habit
  async updateHabit(habitId: string, updates: Partial<Habit>) {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', habitId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Habit;
  },

  // Delete habit
  async deleteHabit(habitId: string) {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId);
    
    if (error) throw error;
  },

  // Log habit completion
  async logHabit(habitId: string, userId: string, date: string, completed: boolean) {
    const { data, error } = await supabase
      .from('habit_logs')
      .upsert({
        habit_id: habitId,
        user_id: userId,
        date,
        completed
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as HabitLog;
  },

  // Get habit logs
  async getHabitLogs(habitId: string) {
    const { data, error } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('habit_id', habitId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as HabitLog[];
  }
};

// Wellness service
export const wellnessService = {
  // Get wellness checks for user
  async getWellnessChecks(userId: string) {
    const { data, error } = await supabase
      .from('wellness_checks')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as WellnessCheck[];
  },

  // Create wellness check
  async createWellnessCheck(userId: string, check: Omit<WellnessCheck, 'id' | 'user_id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('wellness_checks')
      .upsert({
        user_id: userId,
        ...check
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as WellnessCheck;
  }
};

// Timer service
export const timerService = {
  // Log timer session
  async logSession(userId: string, session: Omit<TimerSession, 'id' | 'user_id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('timer_sessions')
      .insert({
        user_id: userId,
        ...session
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as TimerSession;
  },

  // Get timer sessions for user
  async getSessions(userId: string) {
    const { data, error } = await supabase
      .from('timer_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as TimerSession[];
  }
};
