import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Target, Activity, Heart } from 'lucide-react';
import { Task, Habit, WellnessEntry } from '../types';
import { useTranslation } from 'react-i18next';

// Registruj Chart.js komponente
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AdvancedAnalyticsProps {
  tasks: Task[];
  habits: Habit[];
  wellnessEntries: WellnessEntry[];
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({
  tasks,
  habits,
  wellnessEntries,
}) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Generisi podatke za grafove
  const generateTaskData = () => {
    const days = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365;
    const labels = [];
    const completedData = [];
    const totalData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const dayTasks = tasks.filter(task => 
        task.createdAt.toISOString().split('T')[0] === dateStr
      );
      const completedTasks = dayTasks.filter(task => task.completed);
      
      completedData.push(completedTasks.length);
      totalData.push(dayTasks.length);
    }

    return { labels, completedData, totalData };
  };

  const taskData = generateTaskData();

  // Generisi podatke za habits graf
  const generateHabitsData = () => {
    const habitCategories = ['health', 'productivity', 'learning', 'wellness', 'fitness', 'personal'];
    const categoryData = habitCategories.map(category => {
      const categoryHabits = habits.filter(habit => habit.category === category);
      const totalStreak = categoryHabits.reduce((sum, habit) => sum + habit.streak, 0);
      return totalStreak;
    });

    return {
      labels: habitCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
      data: categoryData,
    };
  };

  const habitsData = generateHabitsData();

  // Generisi podatke za wellness graf
  const generateWellnessData = () => {
    const wellnessCategories = ['Mood', 'Stress', 'Energy'];
    const categoryData = wellnessCategories.map(category => {
      const categoryEntries = wellnessEntries.filter(entry => {
        switch(category) {
          case 'Mood': return entry.mood;
          case 'Stress': return entry.stress;
          case 'Energy': return entry.energy;
          default: return 0;
        }
      });
      const average = categoryEntries.length > 0 
        ? categoryEntries.reduce((sum, entry) => {
            switch(category) {
              case 'Mood': return sum + entry.mood;
              case 'Stress': return sum + entry.stress;
              case 'Energy': return sum + entry.energy;
              default: return sum;
            }
          }, 0) / categoryEntries.length
        : 0;
      return Math.round(average * 10) / 10;
    });

    return {
      labels: wellnessCategories,
      data: categoryData,
    };
  };

  const wellnessData = generateWellnessData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('advancedAnalytics.advancedAnalytics')}</h2>
        <p className="text-gray-600">{t('advancedAnalytics.detailedInsights')}</p>
        </div>
      </div>
      
      {/* Period selector */}
      <div className="flex space-x-2">
        {(['week', 'month', 'year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period === 'week' ? t('advancedAnalytics.week') : 
             period === 'month' ? t('advancedAnalytics.month') : 
             t('advancedAnalytics.year')}
          </button>
        ))}
      </div>

      {/* Task Completion Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          {t('advancedAnalytics.taskCompletionTrend')}
        </h3>
        <div className="h-64">
          <Line
            data={{
              labels: taskData.labels,
              datasets: [
                {
                  label: t('advancedAnalytics.completedTasks'),
                  data: taskData.completedData,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.4,
                },
                {
                  label: t('advancedAnalytics.totalTasks'),
                  data: taskData.totalData,
                  borderColor: 'rgb(156, 163, 175)',
                  backgroundColor: 'rgba(156, 163, 175, 0.1)',
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Habits by Category Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          {t('advancedAnalytics.habitsByCategory')}
        </h3>
        <div className="h-64">
          <Bar
            data={{
              labels: habitsData.labels,
              datasets: [
                {
                  label: t('advancedAnalytics.totalStreaks'),
                  data: habitsData.data,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Wellness Overview Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          {t('advancedAnalytics.wellnessOverview')}
        </h3>
        <div className="h-64">
          <Bar
            data={{
              labels: wellnessData.labels,
              datasets: [
                {
                  label: t('advancedAnalytics.averageScore'),
                  data: wellnessData.data,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
