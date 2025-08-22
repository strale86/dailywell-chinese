import React from 'react';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Activity, 
  CheckCircle, 
  Clock,
  Droplets,
  Bed,
  Heart,
  Zap,
  Plus,
  FileText,
  Users,
  Bell,
  Sparkles
} from 'lucide-react';
import { UserStats, Task, Habit, WellnessEntry, PomodoroSession, Goal, Note } from '../types';

interface DashboardProps {
  stats: UserStats;
  tasks: Task[];
  habits: Habit[];
  wellnessEntries: WellnessEntry[];
  pomodoroSessions: PomodoroSession[];
  goals: Goal[];
  notes: Note[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  tasks,
  habits,
  wellnessEntries,
  pomodoroSessions,
  goals,
  notes
}) => {
  const today = new Date().toISOString().split('T')[0];

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          welcomeBack: "Dobrodošli nazad! 👋",
          dailyProgress: "Pregled vašeg dnevnog napretka",
          todaysTasks: "Današnji zadaci",
          todaysHabits: "Današnje navike",
          focusSessions: "Sesije fokusa",
          activeGoals: "Aktivni ciljevi",
          totalPoints: "Ukupno bodova",
          wellnessScore: "Wellness skor",
          totalNotes: "Ukupno beleški",
          social: "Društveno",
          friendsChallenges: "Izazovi prijatelja",
          viewAll: "Pogledaj sve",
          addTask: "Dodaj zadatak",
          addHabit: "Dodaj naviku",
          recentActivity: "Skorašnja aktivnost",
          noActivity: "Još nema aktivnosti",
          completed: "Završeno",
          pending: "Na čekanju",
          notifications: "Obaveštenja",
          newAlerts: "Nova upozorenja",
          mood: "Raspoloženje",
          stress: "Stres",
          energy: "Energija",
          date: "Datum",
          todaysStatus: "Današnji status",
          streak: "Serija",
          level: "Nivo",
          points: "Bodovi",
          days: "dana"
        };
      case 'zh':
        return {
          welcomeBack: "欢迎回来！👋",
          dailyProgress: "您的日常进度概览",
          todaysTasks: "今日任务",
          todaysHabits: "今日习惯",
          focusSessions: "专注会话",
          activeGoals: "活跃目标",
          totalPoints: "总积分",
          wellnessScore: "健康评分",
          totalNotes: "总笔记",
          social: "社交",
          friendsChallenges: "朋友挑战",
          viewAll: "查看全部",
          addTask: "添加任务",
          addHabit: "添加习惯",
          recentActivity: "最近活动",
          noActivity: "暂无活动",
          completed: "已完成",
          pending: "待处理",
          notifications: "通知",
          newAlerts: "新提醒",
          mood: "心情",
          stress: "压力",
          energy: "能量",
          date: "日期",
          todaysStatus: "今日状态",
          streak: "连续",
          level: "等级",
          points: "积分",
          days: "天"
        };
      default: // English
        return {
          welcomeBack: "Welcome back! 👋",
          dailyProgress: "Your daily progress overview",
          todaysTasks: "Today's Tasks",
          todaysHabits: "Today's Habits",
          focusSessions: "Focus Sessions",
          activeGoals: "Active Goals",
          totalPoints: "Total Points",
          wellnessScore: "Wellness Score",
          totalNotes: "Total Notes",
          social: "Social",
          friendsChallenges: "Friends Challenges",
          viewAll: "View All",
          addTask: "Add Task",
          addHabit: "Add Habit",
          recentActivity: "Recent Activity",
          noActivity: "No activity yet",
          completed: "Completed",
          pending: "Pending",
          notifications: "Notifications",
          newAlerts: "New Alerts",
          mood: "Mood",
          stress: "Stress",
          energy: "Energy",
          date: "Date",
          todaysStatus: "Today's Status",
          streak: "Streak",
          level: "Level",
          points: "Points",
          days: "days"
        };
    }
  };

  const text = getText();
  const todayTasks = tasks.filter(task => 
    task.createdAt.toISOString().split('T')[0] === today
  );
  const completedTodayTasks = todayTasks.filter(task => task.completed);
  const todayHabits = habits.filter(habit => 
    habit.completedDates.includes(today)
  );
  
  const latestWellness = wellnessEntries[wellnessEntries.length - 1];

  // Calculate completion percentages
  const taskCompletionRate = todayTasks.length > 0 ? (completedTodayTasks.length / todayTasks.length) * 100 : 0;
  const habitCompletionRate = habits.length > 0 ? (todayHabits.length / habits.length) * 100 : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header with Animation */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-4 sm:p-6 text-white fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
              {text.welcomeBack}
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </h1>
            <p className="text-purple-100 text-sm sm:text-base">{text.dailyProgress}</p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <div className="text-2xl font-bold">{stats.level}</div>
              <div className="text-sm opacity-80">{text.level}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Hover Effects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-4">
        {/* Tasks Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.todaysTasks}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {completedTodayTasks.length}/{todayTasks.length}
              </p>
              {taskCompletionRate > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                  <div 
                    className="bg-green-500 h-1 rounded-full progress-bar" 
                    style={{ width: `${taskCompletionRate}%` }}
                  ></div>
                </div>
              )}
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        {/* Habits Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.todaysHabits}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {todayHabits.length}/{habits.length}
              </p>
              {habitCompletionRate > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full progress-bar" 
                    style={{ width: `${habitCompletionRate}%` }}
                  ></div>
                </div>
              )}
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        {/* Focus Sessions Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.focusSessions}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {pomodoroSessions.filter(s => 
                  s.date.toISOString().split('T')[0] === today
                ).length}
              </p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        {/* Active Goals Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.activeGoals}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {goals.filter(g => !g.isCompleted).length}
              </p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
        </div>

        {/* Total Notes Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.totalNotes}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {notes.length}
              </p>
            </div>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" />
          </div>
        </div>

        {/* Social Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.social}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                3
              </p>
              <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-300">
                {text.friendsChallenges}
              </div>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.notifications}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                2
              </p>
              <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-300">
                {text.newAlerts}
              </div>
            </div>
            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Points and Streak Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{text.points}</p>
              <p className="text-2xl font-bold">{stats.totalPoints}</p>
            </div>
            <Zap className="w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-4 text-white card-hover hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{text.streak}</p>
              <p className="text-2xl font-bold">{stats.currentStreak} {text.days}</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Wellness Status with Animation */}
      {latestWellness && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 slide-in-right">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            {text.todaysStatus}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <div className="text-center scale-in">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.mood}</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{latestWellness.mood}/5</p>
            </div>
            <div className="text-center scale-in">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.stress}</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{latestWellness.stress}/5</p>
            </div>
            <div className="text-center scale-in">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.energy}</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{latestWellness.energy}/5</p>
            </div>
            <div className="text-center scale-in">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.date}</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">{new Date(latestWellness.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
