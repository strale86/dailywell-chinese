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
  Bell
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
  const todayTasks = tasks.filter(task => 
    task.createdAt.toISOString().split('T')[0] === today
  );
  const completedTodayTasks = todayTasks.filter(task => task.completed);
  const todayHabits = habits.filter(habit => 
    habit.completedDates.includes(today)
  );
  
  const latestWellness = wellnessEntries[wellnessEntries.length - 1];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-purple-100">Here's your daily progress overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
                         <div>
               <p className="text-sm text-gray-600">Today's Tasks</p>
               <p className="text-2xl font-bold text-gray-900">
                 {completedTodayTasks.length}/{todayTasks.length}
               </p>
             </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
                         <div>
               <p className="text-sm text-gray-600">Today's Habits</p>
               <p className="text-2xl font-bold text-gray-900">
                 {todayHabits.length}/{habits.length}
               </p>
             </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
                         <div>
               <p className="text-sm text-gray-600">Focus Sessions</p>
               <p className="text-2xl font-bold text-gray-900">
                 {pomodoroSessions.filter(s => 
                   s.date.toISOString().split('T')[0] === today
                 ).length}
               </p>
             </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">
                {goals.filter(g => !g.isCompleted).length}
              </p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900">
                {notes.length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-teal-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Social</p>
              <p className="text-2xl font-bold text-gray-900">
                3
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Friends & Challenges
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Notifications</p>
              <p className="text-2xl font-bold text-gray-900">
                2
              </p>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            New alerts
          </div>
        </div>
      </div>

      {latestWellness && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
                     <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
             <Heart className="w-5 h-5 text-red-500" />
             Today's Status
           </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Mood</p>
              <p className="text-lg font-semibold">{latestWellness.mood}/5</p>
            </div>
            <div className="text-center">
              <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Stress</p>
              <p className="text-lg font-semibold">{latestWellness.stress}/5</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                             <p className="text-sm text-gray-600">Energy</p>
              <p className="text-lg font-semibold">{latestWellness.energy}/5</p>
            </div>
            <div className="text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                             <p className="text-sm text-gray-600">Date</p>
              <p className="text-lg font-semibold">{new Date(latestWellness.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
