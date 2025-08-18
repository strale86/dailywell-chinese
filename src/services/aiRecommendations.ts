import { Task, Habit, WellnessEntry, Goal, Note } from '../types';

export interface AIRecommendation {
  id: string;
  type: 'habit' | 'task' | 'goal' | 'wellness' | 'productivity';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
  category: string;
  action?: string;
  createdAt: Date;
}

export class AIRecommendationService {
  private static instance: AIRecommendationService;
  private recommendations: AIRecommendation[] = [];

  private constructor() {}

  static getInstance(): AIRecommendationService {
    if (!AIRecommendationService.instance) {
      AIRecommendationService.instance = new AIRecommendationService();
    }
    return AIRecommendationService.instance;
  }

  public generateRecommendations(
    tasks: Task[],
    habits: Habit[],
    wellnessEntries: WellnessEntry[],
    goals: Goal[],
    notes: Note[]
  ): AIRecommendation[] {
    this.recommendations = [];

    // Analyze user data
    this.analyzeTaskCompletion(tasks);
    this.analyzeHabitStreaks(habits);
    this.analyzeWellnessTrends(wellnessEntries);
    this.analyzeGoalProgress(goals);
    this.analyzeProductivityPatterns(tasks, habits, wellnessEntries);
    this.generatePersonalizedSuggestions(tasks, habits, goals, notes);

    return this.recommendations.sort((a, b) => b.confidence - a.confidence);
  }

  private analyzeTaskCompletion(tasks: Task[]) {
    const recentTasks = tasks.filter(task => 
      new Date(task.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    
    const completionRate = recentTasks.length > 0 
      ? recentTasks.filter(task => task.completed).length / recentTasks.length 
      : 0;

    if (completionRate < 0.6) {
      this.recommendations.push({
        id: Date.now().toString(),
        type: 'productivity',
        title: 'Improve Task Completion',
        description: `Your task completion rate is ${Math.round(completionRate * 100)}%. Try breaking down larger tasks into smaller, manageable steps.`,
        priority: 'high',
        confidence: 85,
        category: 'productivity',
        action: 'Try the Pomodoro technique for better focus',
        createdAt: new Date()
      });
    }
  }

  private analyzeHabitStreaks(habits: Habit[]) {
    const lowStreakHabits = habits.filter(habit => habit.streak < 3);
    
    if (lowStreakHabits.length > 0) {
      this.recommendations.push({
        id: (Date.now() + 1).toString(),
        type: 'habit',
        title: 'Build Consistent Habits',
        description: `You have ${lowStreakHabits.length} habits with low streaks. Focus on one habit at a time to build consistency.`,
        priority: 'medium',
        confidence: 75,
        category: 'habits',
        action: 'Set daily reminders for your most important habit',
        createdAt: new Date()
      });
    }

    const highStreakHabits = habits.filter(habit => habit.streak > 7);
    if (highStreakHabits.length > 0) {
      this.recommendations.push({
        id: (Date.now() + 2).toString(),
        type: 'habit',
        title: 'Great Progress!',
        description: `You're doing great with ${highStreakHabits.length} habits! Consider adding a new challenging habit.`,
        priority: 'low',
        confidence: 90,
        category: 'motivation',
        action: 'Add a new habit that complements your current ones',
        createdAt: new Date()
      });
    }
  }

  private analyzeWellnessTrends(wellnessEntries: WellnessEntry[]) {
    if (wellnessEntries.length < 3) {
      this.recommendations.push({
        id: (Date.now() + 3).toString(),
        type: 'wellness',
        title: 'Track Your Wellness',
        description: 'Start tracking your daily wellness to get personalized insights and recommendations.',
        priority: 'medium',
        confidence: 80,
        category: 'wellness',
        action: 'Complete your first wellness check-in',
        createdAt: new Date()
      });
      return;
    }

    const recentEntries = wellnessEntries.slice(-7);
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
    const avgStress = recentEntries.reduce((sum, entry) => sum + entry.stress, 0) / recentEntries.length;

    if (avgMood < 3) {
      this.recommendations.push({
        id: (Date.now() + 4).toString(),
        type: 'wellness',
        title: 'Boost Your Mood',
        description: `Your average mood is ${avgMood.toFixed(1)}/5. Try activities that typically improve your mood.`,
        priority: 'high',
        confidence: 85,
        category: 'wellness',
        action: 'Try a 10-minute meditation or go for a walk',
        createdAt: new Date()
      });
    }

    if (avgStress > 3.5) {
      this.recommendations.push({
        id: (Date.now() + 5).toString(),
        type: 'wellness',
        title: 'Reduce Stress',
        description: `Your stress level is high (${avgStress.toFixed(1)}/5). Consider stress-reduction techniques.`,
        priority: 'high',
        confidence: 90,
        category: 'wellness',
        action: 'Practice deep breathing or take a break',
        createdAt: new Date()
      });
    }
  }

  private analyzeGoalProgress(goals: Goal[]) {
    const activeGoals = goals.filter(goal => !goal.isCompleted);
    const lowProgressGoals = activeGoals.filter(goal => goal.progress < 30);

    if (lowProgressGoals.length > 0) {
      this.recommendations.push({
        id: (Date.now() + 6).toString(),
        type: 'goal',
        title: 'Revive Your Goals',
        description: `You have ${lowProgressGoals.length} goals with low progress. Break them down into smaller milestones.`,
        priority: 'medium',
        confidence: 70,
        category: 'goals',
        action: 'Review and update your goal milestones',
        createdAt: new Date()
      });
    }
  }

  private analyzeProductivityPatterns(tasks: Task[], habits: Habit[], wellnessEntries: WellnessEntry[]) {
    const completedTasks = tasks.filter(task => task.completed);
    const completedHabits = habits.filter(habit => habit.completedDates.length > 0);
    
    if (completedTasks.length > 10 && completedHabits.length > 3) {
      this.recommendations.push({
        id: (Date.now() + 7).toString(),
        type: 'productivity',
        title: 'Productivity Master',
        description: 'You\'re showing great productivity patterns! Consider sharing your techniques with others.',
        priority: 'low',
        confidence: 95,
        category: 'motivation',
        action: 'Document your productivity tips in Notes',
        createdAt: new Date()
      });
    }
  }

  private generatePersonalizedSuggestions(tasks: Task[], habits: Habit[], goals: Goal[], notes: Note[]) {
    // Generate personalized suggestions based on user patterns
    const taskCategories = tasks.map(task => task.priority);
    const habitCategories = habits.map(habit => habit.category);
    
    // Suggest new habits based on existing ones
    const suggestedHabits = this.getSuggestedHabits(habitCategories);
    if (suggestedHabits.length > 0) {
      this.recommendations.push({
        id: (Date.now() + 8).toString(),
        type: 'habit',
        title: 'Try New Habits',
        description: `Based on your current habits, you might enjoy: ${suggestedHabits.join(', ')}`,
        priority: 'low',
        confidence: 65,
        category: 'habits',
        action: 'Add one of these suggested habits',
        createdAt: new Date()
      });
    }

    // Suggest goals based on current progress
    if (goals.length < 3) {
      this.recommendations.push({
        id: (Date.now() + 9).toString(),
        type: 'goal',
        title: 'Set More Goals',
        description: 'You have room for more goals. Consider setting goals in different life areas.',
        priority: 'medium',
        confidence: 75,
        category: 'goals',
        action: 'Add a new goal in a different category',
        createdAt: new Date()
      });
    }
  }

  private getSuggestedHabits(existingCategories: string[]): string[] {
    const allCategories = ['health', 'productivity', 'learning', 'wellness', 'fitness', 'personal'];
    const missingCategories = allCategories.filter(cat => !existingCategories.includes(cat));
    
    const suggestions: string[] = [];
    
    if (missingCategories.includes('fitness')) {
      suggestions.push('Daily Exercise');
    }
    if (missingCategories.includes('learning')) {
      suggestions.push('Reading Habit');
    }
    if (missingCategories.includes('wellness')) {
      suggestions.push('Mindfulness Practice');
    }
    if (missingCategories.includes('productivity')) {
      suggestions.push('Time Blocking');
    }
    
    return suggestions.slice(0, 2); // Return max 2 suggestions
  }

  public getRecommendations(): AIRecommendation[] {
    return this.recommendations;
  }

  public clearRecommendations(): void {
    this.recommendations = [];
  }
}


