import React from 'react';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { UserStats, Task, Habit, WellnessEntry, PomodoroSession } from '../types';
import { getTodayString, getWeekDates } from '../utils/dateUtils';


interface StatsDisplayProps {
  stats: UserStats;
  tasks: Task[];
  habits: Habit[];
  wellnessEntries: WellnessEntry[];
  pomodoroSessions: PomodoroSession[];
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  tasks,
  habits,
  wellnessEntries,
  pomodoroSessions,
}) => {
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Vaš napredak",
          subtitle: "Pratite svoje putovanje dobrobiti",
          totalTasks: "Ukupno zadataka",
          completionRate: "Stopa završavanja",
          focusSessions: "Sesije fokusa",
          avgMood: "Prosečno raspoloženje",
          totalPoints: "Ukupno poena",
          level: "Nivo",
          tasksCompleted: "Završeni zadaci",
          today: "danas",
          habitsToday: "Navike danas",
          complete: "završeno",
          focusSessionsLabel: "Sesije fokusa",
          minutesFocused: "minuta fokusiranih",
          weeklyHabitProgress: "Nedeljni napredak navika",
          todaysWellness: "Današnja dobrobit",
          mood: "Raspoloženje",
          stress: "Stres",
          energy: "Energija",
          averageMood: "Prosečno raspoloženje",
          achievements: "Dostignuća",
          firstTask: "Prvi zadatak",
          firstTaskDesc: "Završite svoj prvi zadatak",
          habitStarter: "Početnik navika",
          habitStarterDesc: "Završite naviku po prvi put",
          wellnessWarrior: "Ratnik dobrobiti",
          wellnessWarriorDesc: "Završite 7 provera dobrobiti",
          focusMaster: "Majstor fokusa",
          focusMasterDesc: "Završite 10 Pomodoro sesija",
          streakKeeper: "Čuvar serije",
          streakKeeperDesc: "Održite 7-dnevnu seriju navika",
          achievementsUnlocked: "Otključana dostignuća",
          // Days of the week
          mon: "Pon",
          tue: "Uto",
          wed: "Sre",
          thu: "Čet",
          fri: "Pet",
          sat: "Sub",
          sun: "Ned"
        };
      case 'zh':
        return {
          title: "您的进度",
          subtitle: "跟踪您的健康之旅",
          totalTasks: "总任务数",
          completionRate: "完成率",
          focusSessions: "专注会话",
          avgMood: "平均心情",
          totalPoints: "总积分",
          level: "等级",
          tasksCompleted: "已完成任务",
          today: "今天",
          habitsToday: "今日习惯",
          complete: "已完成",
          focusSessionsLabel: "专注会话",
          minutesFocused: "专注分钟",
          weeklyHabitProgress: "每周习惯进度",
          todaysWellness: "今日健康",
          mood: "心情",
          stress: "压力",
          energy: "能量",
          averageMood: "平均心情",
          achievements: "成就",
          firstTask: "第一个任务",
          firstTaskDesc: "完成您的第一个任务",
          habitStarter: "习惯初学者",
          habitStarterDesc: "首次完成一个习惯",
          wellnessWarrior: "健康战士",
          wellnessWarriorDesc: "完成7次健康检查",
          focusMaster: "专注大师",
          focusMasterDesc: "完成10次番茄工作法会话",
          streakKeeper: "连续保持者",
          streakKeeperDesc: "保持7天习惯连续",
          achievementsUnlocked: "已解锁成就",
          // Days of the week
          mon: "周一",
          tue: "周二",
          wed: "周三",
          thu: "周四",
          fri: "周五",
          sat: "周六",
          sun: "周日"
        };
      default: // English
        return {
          title: "Your Progress",
          subtitle: "Track your wellness journey",
          totalTasks: "Total Tasks",
          completionRate: "Completion Rate",
          focusSessions: "Focus Sessions",
          avgMood: "Avg Mood",
          totalPoints: "Total Points",
          level: "Level",
          tasksCompleted: "Tasks Completed",
          today: "today",
          habitsToday: "Habits Today",
          complete: "complete",
          focusSessionsLabel: "Focus Sessions",
          minutesFocused: "minutes focused",
          weeklyHabitProgress: "Weekly Habit Progress",
          todaysWellness: "Today's Wellness",
          mood: "Mood",
          stress: "Stress",
          energy: "Energy",
          averageMood: "Average Mood",
          achievements: "Achievements",
          firstTask: "First Task",
          firstTaskDesc: "Complete your first task",
          habitStarter: "Habit Starter",
          habitStarterDesc: "Complete a habit for the first time",
          wellnessWarrior: "Wellness Warrior",
          wellnessWarriorDesc: "Complete 7 wellness check-ins",
          focusMaster: "Focus Master",
          focusMasterDesc: "Complete 10 Pomodoro sessions",
          streakKeeper: "Streak Keeper",
          streakKeeperDesc: "Maintain a 7-day habit streak",
          achievementsUnlocked: "Achievements Unlocked",
          // Days of the week
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat",
          sun: "Sun"
        };
    }
  };

  const text = getText();

  const today = getTodayString();
  const weekDates = getWeekDates();
  
  const completedTasks = tasks.filter(task => task.completed);
  const todayTasks = tasks.filter(task => 
    new Date(task.createdAt).toDateString() === new Date().toDateString()
  );
  
  const completedHabitsToday = habits.filter(habit => 
    habit.completedDates.includes(today)
  ).length;
  
  const todayWellness = wellnessEntries.find(entry => entry.date === today);
  const averageMood = wellnessEntries.length > 0 
    ? Math.round(wellnessEntries.reduce((sum, entry) => sum + entry.mood, 0) / wellnessEntries.length * 10) / 10
    : 0;
  
  const todayPomodoroSessions = pomodoroSessions.filter(session =>
    new Date(session.date).toDateString() === new Date().toDateString()
  );

  const weeklyHabitCompletion = weekDates.map(date => {
    const completedHabits = habits.filter(habit => 
      habit.completedDates.includes(date)
    ).length;
    return {
      date,
      completed: completedHabits,
      total: habits.length
    };
  });

  const achievements = [
    {
      id: 'first-task',
      title: text.firstTask,
      description: text.firstTaskDesc,
      unlocked: completedTasks.length > 0,
      icon: '✅'
    },
    {
      id: 'habit-starter',
      title: text.habitStarter,
      description: text.habitStarterDesc,
      unlocked: habits.some(habit => habit.completedDates.length > 0),
      icon: '🎯'
    },
    {
      id: 'wellness-warrior',
      title: text.wellnessWarrior,
      description: text.wellnessWarriorDesc,
      unlocked: wellnessEntries.length >= 7,
      icon: '💪'
    },
    {
      id: 'focus-master',
      title: text.focusMaster,
      description: text.focusMasterDesc,
      unlocked: pomodoroSessions.filter(s => s.completed).length >= 10,
      icon: '🧠'
    },
    {
      id: 'streak-keeper',
      title: text.streakKeeper,
      description: text.streakKeeperDesc,
      unlocked: habits.some(habit => habit.streak >= 7),
      icon: '🔥'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{text.title}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.totalTasks}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
            </div>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.completionRate}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
              </p>
            </div>
            <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.focusSessions}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{pomodoroSessions.length}</p>
            </div>
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.avgMood}</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{averageMood}/5</p>
            </div>
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-500" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-3 sm:p-4 md:p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalPoints}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">{text.totalPoints}</p>
          <p className="text-xs text-blue-500 dark:text-blue-500">{text.level} {stats.level}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-3 sm:p-4 md:p-6 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 dark:text-green-300">{completedTasks.length}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">{text.tasksCompleted}</p>
          <p className="text-xs text-green-500 dark:text-green-500">
            {todayTasks.filter(t => t.completed).length} {text.today}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-3 sm:p-4 md:p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300">{completedHabitsToday}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">{text.habitsToday}</p>
          <p className="text-xs text-purple-500 dark:text-purple-500">
            {habits.length > 0 ? Math.round((completedHabitsToday / habits.length) * 100) : 0}% {text.complete}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 p-3 sm:p-4 md:p-6 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-orange-700 dark:text-orange-300">{todayPomodoroSessions.length}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400">{text.focusSessionsLabel}</p>
          <p className="text-xs text-orange-500 dark:text-orange-500">
            {todayPomodoroSessions.length * 25} {text.minutesFocused}
          </p>
        </div>
      </div>

      {/* Weekly Habit Progress */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{text.weeklyHabitProgress}</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            {weekDates.map(date => {
              const dayOfWeek = new Date(date).getDay();
              const dayNames = [text.sun, text.mon, text.tue, text.wed, text.thu, text.fri, text.sat];
              return (
                <span key={date} className="text-center">
                  {dayNames[dayOfWeek]}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between">
            {weeklyHabitCompletion.map(({ date, completed, total }) => {
              const percentage = total > 0 ? (completed / total) * 100 : 0;
              return (
                <div key={date} className="text-center">
                  <div className="w-8 h-8 mx-auto rounded border-2 border-gray-200 dark:border-gray-600 overflow-hidden">
                    <div 
                      className="bg-green-500 transition-all duration-300"
                      style={{ height: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {completed}/{total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wellness Summary */}
      {todayWellness && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{text.todaysWellness}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl mb-1">😊</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{text.mood}</div>
              <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{todayWellness.mood}/5</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{text.stress}</div>
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">{todayWellness.stress}/5</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{text.energy}</div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">{todayWellness.energy}/5</div>
            </div>
          </div>
          {averageMood > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
              {text.averageMood}: {averageMood}/5
            </p>
          )}
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{text.achievements}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                  : 'border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="ml-auto">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {text.achievementsUnlocked}: {unlockedAchievements.length} of {achievements.length}
          </p>
        </div>
      </div>
    </div>
  );
};