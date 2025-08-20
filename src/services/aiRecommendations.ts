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
    case 'es':
      return {
        improveTaskCompletion: "Mejorar tasa de finalización de tareas",
        taskCompletionRate: "Tu tasa de finalización de tareas es",
        tryBreakingDown: "Intenta dividir tareas más grandes en pasos más pequeños y manejables",
        tryPomodoro: "Prueba la técnica Pomodoro para mejorar el enfoque",
        trackWellness: "Rastrea tu bienestar",
        startTracking: "Comienza a rastrear tu bienestar diario para obtener insights personalizados y recomendaciones",
        completeFirstCheckin: "Completa tu primera verificación de bienestar",
        setMoreGoals: "Establece más objetivos",
        roomForGoals: "Tienes espacio para establecer más objetivos. Considera establecer objetivos en diferentes áreas de la vida",
        addNewGoals: "Agrega nuevos objetivos en diferentes categorías",
        tryNewHabits: "Prueba nuevos hábitos",
        basedOnHabits: "Basado en tus hábitos actuales, podrías disfrutar",
        addSuggestedHabit: "Agrega uno de los hábitos sugeridos",
        productivity: "Productividad",
        wellness: "Bienestar",
        goals: "Objetivos",
        habits: "Hábitos"
      };
    case 'fr':
      return {
        improveTaskCompletion: "Améliorer le taux de finalisation des tâches",
        taskCompletionRate: "Votre taux de finalisation des tâches est",
        tryBreakingDown: "Essayez de diviser les tâches plus importantes en étapes plus petites et gérables",
        tryPomodoro: "Essayez la technique Pomodoro pour améliorer la concentration",
        trackWellness: "Suivez votre bien-être",
        startTracking: "Commencez à suivre votre bien-être quotidien pour obtenir des insights personnalisés et des recommandations",
        completeFirstCheckin: "Terminez votre première vérification de bien-être",
        setMoreGoals: "Définissez plus d'objectifs",
        roomForGoals: "Vous avez de la place pour définir plus d'objectifs. Considérez définir des objectifs dans différents domaines de la vie",
        addNewGoals: "Ajoutez de nouveaux objectifs dans différentes catégories",
        tryNewHabits: "Essayez de nouvelles habitudes",
        basedOnHabits: "Basé sur vos habitudes actuelles, vous pourriez apprécier",
        addSuggestedHabit: "Ajoutez l'une des habitudes suggérées",
        productivity: "Productivité",
        wellness: "Bien-être",
        goals: "Objectifs",
        habits: "Habitudes"
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
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 1).toString(),
        type: 'habit',
        title: 'Build Consistent Habits',
        description: `You have ${lowStreakHabits.length} habits with low streaks. Focus on one habit at a time to build consistency.`,
        priority: 'medium',
        confidence: 75,
        category: texts.habits,
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
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 4).toString(),
        type: 'wellness',
        title: 'Boost Your Mood',
        description: `Your average mood is ${avgMood.toFixed(1)}/5. Try activities that usually improve your mood.`,
        priority: 'high',
        confidence: 85,
        category: texts.wellness,
        action: 'Try 10 minutes of meditation or a walk',
        createdAt: new Date()
      });
    }

    if (avgStress > 3.5) {
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 5).toString(),
        type: 'wellness',
        title: 'Reduce Stress',
        description: `Your stress level is high (${avgStress.toFixed(1)}/5). Consider stress-reduction techniques.`,
        priority: 'high',
        confidence: 90,
        category: texts.wellness,
        action: 'Practice deep breathing or take a break',
        createdAt: new Date()
      });
    }
  }

  private analyzeGoalProgress(goals: Goal[]) {
    const activeGoals = goals.filter(goal => !goal.isCompleted);
    const lowProgressGoals = activeGoals.filter(goal => goal.progress < 30);

    if (lowProgressGoals.length > 0) {
      const currentLanguage = getCurrentLanguage();
      const texts = getRecommendationTexts(currentLanguage);
      
      this.recommendations.push({
        id: (Date.now() + 6).toString(),
        type: 'goal',
        title: 'Revitalize Your Goals',
        description: `You have ${lowProgressGoals.length} goals with slow progress. Break them down into smaller milestones.`,
        priority: 'medium',
        confidence: 70,
        category: texts.goals,
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





