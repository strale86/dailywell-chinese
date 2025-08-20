import { Task, Habit, WellnessEntry, Goal, Note } from '../types';

// Get current language from localStorage or default to English
const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedLanguage') || 'en';
  }
  return 'en';
};

// Static translations for AI recommendations
const getRecommendationTexts = (language: string) => {
  switch (language) {
    case 'sr':
      return {
        improveTaskCompletion: "Poboljšaj stopu završavanja zadataka",
        taskCompletionRate: "Vaša stopa završavanja zadataka je",
        tryBreakingDown: "Pokušajte da razbijete veće zadatke na manje, upravljivije korake",
        tryPomodoro: "Pokušajte Pomodoro tehniku za poboljšanje fokusa",
        trackWellness: "Pratite svoje zdravlje",
        startTracking: "Počnite da pratite svoje dnevno zdravlje da biste dobili personalizovane uvide i preporuke",
        completeFirstCheckin: "Završite svoju prvu proveru zdravlja",
        setMoreGoals: "Postavite više ciljeva",
        roomForGoals: "Imate prostora za postavljanje više ciljeva. Razmislite o postavljanju ciljeva u različitim životnim oblastima",
        addNewGoals: "Dodajte nove ciljeve u različitim kategorijama",
        tryNewHabits: "Pokušajte nove navike",
        basedOnHabits: "Na osnovu vaših trenutnih navika, možda će vam se svideti",
        addSuggestedHabit: "Dodajte jednu od predloženih navika",
        productivity: "Produktivnost",
        wellness: "Zdravlje",
        goals: "Ciljevi",
        habits: "Navike"
      };
    case 'zh':
      return {
        improveTaskCompletion: "提高任务完成率",
        taskCompletionRate: "您的任务完成率是",
        tryBreakingDown: "尝试将较大的任务分解为更小、更易管理的步骤",
        tryPomodoro: "尝试番茄工作法来提高专注力",
        trackWellness: "跟踪您的健康",
        startTracking: "开始跟踪您的日常健康以获得个性化洞察和建议",
        completeFirstCheckin: "完成您的第一次健康检查",
        setMoreGoals: "设定更多目标",
        roomForGoals: "您有设定更多目标的空间。考虑在不同生活领域设定目标",
        addNewGoals: "在不同类别中添加新目标",
        tryNewHabits: "尝试新习惯",
        basedOnHabits: "根据您当前的习惯，您可能会喜欢",
        addSuggestedHabit: "添加建议的习惯之一",
        productivity: "生产力",
        wellness: "健康",
        goals: "目标",
        habits: "习惯"
      };
    default: // English
      return {
        improveTaskCompletion: "Improve Task Completion Rate",
        taskCompletionRate: "Your task completion rate is",
        tryBreakingDown: "Try breaking down larger tasks into smaller, more manageable steps",
        tryPomodoro: "Try the Pomodoro technique to improve focus",
        trackWellness: "Track Your Wellness",
        startTracking: "Start tracking your daily wellness to get personalized insights and recommendations",
        completeFirstCheckin: "Complete your first wellness check-in",
        setMoreGoals: "Set More Goals",
        roomForGoals: "You have room to set more goals. Consider setting goals in different life areas",
        addNewGoals: "Add new goals in different categories",
        tryNewHabits: "Try New Habits",
        basedOnHabits: "Based on your current habits, you might enjoy",
        addSuggestedHabit: "Add one of the suggested habits",
        productivity: "Productivity",
        wellness: "Wellness",
        goals: "Goals",
        habits: "Habits"
      };
  }
};

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
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: Date.now().toString(),
        type: 'productivity',
        title: texts.improveTaskCompletion,
        description: `${texts.taskCompletionRate} ${Math.round(completionRate * 100)}%. ${texts.tryBreakingDown}`,
        priority: 'high',
        confidence: 85,
        category: texts.productivity,
        action: texts.tryPomodoro,
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
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 3).toString(),
        type: 'wellness',
        title: texts.trackWellness,
        description: texts.startTracking,
        priority: 'medium',
        confidence: 80,
        category: texts.wellness,
        action: texts.completeFirstCheckin,
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
        description: `Your average mood is ${avgMood.toFixed(1)}/5. Try activities that usually improve your mood.`,
        priority: 'high',
        confidence: 85,
        category: 'wellness',
        action: 'Try 10 minutes of meditation or a walk',
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
        title: 'Revitalize Your Goals',
        description: `You have ${lowProgressGoals.length} goals with slow progress. Break them down into smaller milestones.`,
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
        description: 'You show great productivity patterns! Consider sharing your techniques with others.',
        priority: 'low',
        confidence: 95,
        category: 'motivation',
        action: 'Document your productivity techniques in notes',
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
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 8).toString(),
        type: 'habit',
        title: texts.tryNewHabits,
        description: `${texts.basedOnHabits}: ${suggestedHabits.join(', ')}`,
        priority: 'low',
        confidence: 65,
        category: texts.habits,
        action: texts.addSuggestedHabit,
        createdAt: new Date()
      });
    }

    // Suggest goals based on current progress
    if (goals.length < 3) {
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 9).toString(),
        type: 'goal',
        title: texts.setMoreGoals,
        description: texts.roomForGoals,
        priority: 'medium',
        confidence: 75,
        category: texts.goals,
        action: texts.addNewGoals,
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





