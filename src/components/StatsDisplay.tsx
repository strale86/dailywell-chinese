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
      title: 'First Task',
      description: 'Complete your first task',
      unlocked: completedTasks.length > 0,
      icon: '✅'
    },
    {
      id: 'habit-starter',
      title: 'Habit Starter',
      description: 'Complete a habit for the first time',
      unlocked: habits.some(habit => habit.completedDates.length > 0),
      icon: '🎯'
    },
    {
      id: 'wellness-warrior',
      title: 'Wellness Warrior',
      description: 'Complete 7 wellness check-ins',
      unlocked: wellnessEntries.length >= 7,
      icon: '💪'
    },
    {
      id: 'focus-master',
      title: 'Focus Master',
      description: 'Complete 10 Pomodoro sessions',
      unlocked: pomodoroSessions.filter(s => s.completed).length >= 10,
      icon: '🧠'
    },
    {
      id: 'streak-keeper',
      title: 'Streak Keeper',
      description: 'Maintain a 7-day habit streak',
      unlocked: habits.some(habit => habit.streak >= 7),
      icon: '🔥'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your daily wellness journey</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">{stats.totalPoints}</span>
          </div>
          <p className="text-sm font-medium text-blue-600">Total Points</p>
          <p className="text-xs text-blue-500">Level {stats.level}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{completedTasks.length}</span>
          </div>
          <p className="text-sm font-medium text-green-600">Tasks Completed</p>
          <p className="text-xs text-green-500">
            {todayTasks.filter(t => t.completed).length} today
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-700">{completedHabitsToday}</span>
          </div>
          <p className="text-sm font-medium text-purple-600">Habits Today</p>
          <p className="text-xs text-purple-500">
            {habits.length > 0 ? Math.round((completedHabitsToday / habits.length) * 100) : 0}% complete
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-700">{todayPomodoroSessions.length}</span>
          </div>
          <p className="text-sm font-medium text-orange-600">Focus Sessions</p>
          <p className="text-xs text-orange-500">
            {todayPomodoroSessions.length * 25}min focused
          </p>
        </div>
      </div>

      {/* Weekly Habit Progress */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Habit Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            {weekDates.map(date => (
              <span key={date} className="text-center">
                {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            {weeklyHabitCompletion.map(({ date, completed, total }) => {
              const percentage = total > 0 ? (completed / total) * 100 : 0;
              return (
                <div key={date} className="text-center">
                  <div className="w-8 h-8 mx-auto rounded border-2 border-gray-200 overflow-hidden">
                    <div 
                      className="bg-green-500 transition-all duration-300"
                      style={{ height: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
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
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Wellness</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-1">😊</div>
              <div className="text-sm font-medium text-gray-700">Mood</div>
              <div className="text-lg font-semibold text-yellow-600">{todayWellness.mood}/5</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-sm font-medium text-gray-700">Stress</div>
              <div className="text-lg font-semibold text-red-600">{todayWellness.stress}/5</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-sm font-medium text-gray-700">Energy</div>
              <div className="text-lg font-semibold text-green-600">{todayWellness.energy}/5</div>
            </div>
          </div>
          {averageMood > 0 && (
            <p className="text-sm text-gray-600 mt-4 text-center">
              Average mood this period: {averageMood}/5
            </p>
          )}
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className={`font-medium ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
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
          <p className="text-sm text-gray-600">
            {unlockedAchievements.length} of {achievements.length} achievements unlocked
          </p>
        </div>
      </div>
    </div>
  );
};