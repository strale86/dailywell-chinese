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
        title: '提高任务完成率',
        description: `您的任务完成率是 ${Math.round(completionRate * 100)}%。尝试将较大的任务分解为更小、更易管理的步骤。`,
        priority: 'high',
        confidence: 85,
        category: 'productivity',
        action: '尝试番茄工作法以提高专注力',
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
        title: '建立一致的习惯',
        description: `您有 ${lowStreakHabits.length} 个连续天数较低的习惯。一次专注于一个习惯以建立一致性。`,
        priority: 'medium',
        confidence: 75,
        category: 'habits',
        action: '为您最重要的习惯设置每日提醒',
        createdAt: new Date()
      });
    }

    const highStreakHabits = habits.filter(habit => habit.streak > 7);
    if (highStreakHabits.length > 0) {
      this.recommendations.push({
        id: (Date.now() + 2).toString(),
        type: 'habit',
        title: '进展很好！',
        description: `您在 ${highStreakHabits.length} 个习惯方面做得很好！考虑添加一个新的具有挑战性的习惯。`,
        priority: 'low',
        confidence: 90,
        category: 'motivation',
        action: '添加一个与您当前习惯互补的新习惯',
        createdAt: new Date()
      });
    }
  }

  private analyzeWellnessTrends(wellnessEntries: WellnessEntry[]) {
    if (wellnessEntries.length < 3) {
      this.recommendations.push({
        id: (Date.now() + 3).toString(),
        type: 'wellness',
        title: '跟踪您的健康',
        description: '开始跟踪您的日常健康状态，以获得个性化的洞察和建议。',
        priority: 'medium',
        confidence: 80,
        category: 'wellness',
        action: '完成您的第一次健康检查',
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
        title: '提升您的心情',
        description: `您的平均心情是 ${avgMood.toFixed(1)}/5。尝试通常能改善您心情的活动。`,
        priority: 'high',
        confidence: 85,
        category: 'wellness',
        action: '尝试10分钟冥想或散步',
        createdAt: new Date()
      });
    }

    if (avgStress > 3.5) {
      this.recommendations.push({
        id: (Date.now() + 5).toString(),
        type: 'wellness',
        title: '减轻压力',
        description: `您的压力水平很高 (${avgStress.toFixed(1)}/5)。考虑减压技巧。`,
        priority: 'high',
        confidence: 90,
        category: 'wellness',
        action: '练习深呼吸或休息一下',
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
        title: '重振您的目标',
        description: `您有 ${lowProgressGoals.length} 个进展缓慢的目标。将它们分解为更小的里程碑。`,
        priority: 'medium',
        confidence: 70,
        category: 'goals',
        action: '审查并更新您的目标里程碑',
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
        title: '生产力大师',
        description: '您表现出很好的生产力模式！考虑与他人分享您的技巧。',
        priority: 'low',
        confidence: 95,
        category: 'motivation',
        action: '在笔记中记录您的生产力技巧',
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
        title: '尝试新习惯',
        description: `基于您当前的习惯，您可能会喜欢：${suggestedHabits.join(', ')}`,
        priority: 'low',
        confidence: 65,
        category: 'habits',
        action: '添加其中一个建议的习惯',
        createdAt: new Date()
      });
    }

    // Suggest goals based on current progress
    if (goals.length < 3) {
      this.recommendations.push({
        id: (Date.now() + 9).toString(),
        type: 'goal',
        title: '设定更多目标',
        description: '您还有设定更多目标的空间。考虑在不同生活领域设定目标。',
        priority: 'medium',
        confidence: 75,
        category: 'goals',
        action: '在不同类别中添加新目标',
        createdAt: new Date()
      });
    }
  }

  private getSuggestedHabits(existingCategories: string[]): string[] {
    const allCategories = ['health', 'productivity', 'learning', 'wellness', 'fitness', 'personal'];
    const missingCategories = allCategories.filter(cat => !existingCategories.includes(cat));
    
    const suggestions: string[] = [];
    
    if (missingCategories.includes('fitness')) {
      suggestions.push('每日运动');
    }
    if (missingCategories.includes('learning')) {
      suggestions.push('阅读习惯');
    }
    if (missingCategories.includes('wellness')) {
      suggestions.push('正念练习');
    }
    if (missingCategories.includes('productivity')) {
      suggestions.push('时间块管理');
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





