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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Napredna analitika",
          subtitle: "Detaljni uvid i trendovi",
          week: "Nedelja",
          month: "Mesec",
          year: "Godina",
          taskCompletionTrend: "Trend završavanja zadataka",
          completedTasks: "Završeni zadaci",
          totalTasks: "Ukupno zadataka",
          habitsByCategory: "Navike po kategoriji",
          totalStreaks: "Ukupno serija",
          wellnessOverview: "Pregled dobrobiti",
          averageScore: "Prosečan rezultat",
          health: "Zdravlje",
          productivity: "Produktivnost",
          learning: "Učenje",
          wellness: "Dobrobit",
          fitness: "Fitness",
          personal: "Lično",
          mood: "Raspoloženje",
          stress: "Stres",
          energy: "Energija"
        };
      case 'zh':
        return {
          title: "高级分析",
          subtitle: "详细洞察和趋势",
          week: "周",
          month: "月",
          year: "年",
          taskCompletionTrend: "任务完成趋势",
          completedTasks: "已完成任务",
          totalTasks: "总任务",
          habitsByCategory: "按类别分类的习惯",
          totalStreaks: "总连续",
          wellnessOverview: "健康概览",
          averageScore: "平均分数",
          health: "健康",
          productivity: "生产力",
          learning: "学习",
          wellness: "健康",
          fitness: "健身",
          personal: "个人",
          mood: "心情",
          stress: "压力",
          energy: "能量"
        };
      default: // English
        return {
          title: "Advanced Analytics",
          subtitle: "Detailed insights and trends",
          week: "Week",
          month: "Month",
          year: "Year",
          taskCompletionTrend: "Task Completion Trend",
          completedTasks: "Completed Tasks",
          totalTasks: "Total Tasks",
          habitsByCategory: "Habits by Category",
          totalStreaks: "Total Streaks",
          wellnessOverview: "Wellness Overview",
          averageScore: "Average Score",
          health: "Health",
          productivity: "Productivity",
          learning: "Learning",
          wellness: "Wellness",
          fitness: "Fitness",
          personal: "Personal",
          mood: "Mood",
          stress: "Stress",
          energy: "Energy"
        };
    }
  };

  const text = getText();

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
      
      // Format date based on current language
      let locale = 'en-US';
      if (currentLanguage === 'sr') {
        locale = 'sr-RS';
      } else if (currentLanguage === 'zh') {
        locale = 'zh-CN';
      }
      labels.push(date.toLocaleDateString(locale, { month: 'short', day: 'numeric' }));
      
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
      labels: habitCategories.map(cat => {
        switch(cat) {
          case 'health': return text.health;
          case 'productivity': return text.productivity;
          case 'learning': return text.learning;
          case 'wellness': return text.wellness;
          case 'fitness': return text.fitness;
          case 'personal': return text.personal;
          default: return cat.charAt(0).toUpperCase() + cat.slice(1);
        }
      }),
      data: categoryData,
    };
  };

  const habitsData = generateHabitsData();

  // Generisi podatke za wellness graf
  const generateWellnessData = () => {
    const wellnessCategories = [text.mood, text.stress, text.energy];
    const categoryData = wellnessCategories.map(category => {
      const categoryEntries = wellnessEntries.filter(entry => {
        switch(category) {
          case text.mood: return entry.mood;
          case text.stress: return entry.stress;
          case text.energy: return entry.energy;
          default: return 0;
        }
      });
      const average = categoryEntries.length > 0 
        ? categoryEntries.reduce((sum, entry) => {
            switch(category) {
              case text.mood: return sum + entry.mood;
              case text.stress: return sum + entry.stress;
              case text.energy: return sum + entry.energy;
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
        </div>
      </div>
      
      {/* Period selector */}
      <div className="flex space-x-1 sm:space-x-2">
        {(['week', 'month', 'year'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {period === 'week' ? text.week : 
             period === 'month' ? text.month : 
             text.year}
          </button>
        ))}
      </div>

      {/* Task Completion Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          {text.taskCompletionTrend}
        </h3>
        <div className="h-48 sm:h-64">
          <Line
            data={{
              labels: taskData.labels,
              datasets: [
                {
                  label: text.completedTasks,
                  data: taskData.completedData,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.4,
                },
                {
                  label: text.totalTasks,
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
                  labels: {
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  }
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                }
              },
            }}
          />
        </div>
      </div>

      {/* Habits by Category Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          {text.habitsByCategory}
        </h3>
        <div className="h-48 sm:h-64">
          <Bar
            data={{
              labels: habitsData.labels,
              datasets: [
                {
                  label: text.totalStreaks,
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
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                }
              },
            }}
          />
        </div>
      </div>

      {/* Wellness Overview Chart */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
          {text.wellnessOverview}
        </h3>
        <div className="h-48 sm:h-64">
          <Bar
            data={{
              labels: wellnessData.labels,
              datasets: [
                {
                  label: text.averageScore,
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
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: window.innerWidth < 640 ? 10 : 12
                    },
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#374151'
                  },
                  grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
                  }
                }
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
