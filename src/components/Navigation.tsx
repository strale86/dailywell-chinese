import React from 'react';
import { Home, CheckSquare, Target, Heart, Timer, BarChart3, Flag, TrendingUp, Crown, FileText, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  // Navigation component with colored icons - updated version
  const tabs = [
    { id: 'dashboard', label: t('navigation.dashboard'), icon: Home, color: 'text-indigo-400' },
    { id: 'tasks', label: t('navigation.tasks'), icon: CheckSquare, color: 'text-green-400' },
    { id: 'habits', label: t('navigation.habits'), icon: Target, color: 'text-purple-400' },
    { id: 'wellness', label: t('navigation.wellness'), icon: Heart, color: 'text-pink-400' },
    { id: 'notes', label: t('navigation.notes'), icon: FileText, color: 'text-teal-400' },
    { id: 'ai', label: t('navigation.ai'), icon: Brain, color: 'text-purple-400' },
    { id: 'focus', label: t('navigation.focus'), icon: Timer, color: 'text-yellow-400' },
    { id: 'goals', label: t('navigation.goals'), icon: Flag, color: 'text-orange-400' },
    { id: 'stats', label: t('navigation.stats'), icon: BarChart3, color: 'text-blue-400' },
    { id: 'analytics', label: t('navigation.analytics'), icon: TrendingUp, color: 'text-purple-400' },
    { id: 'premium', label: t('premium.title'), icon: Crown, color: 'text-yellow-400' },
  ];
  // Podeli tabove u 2 reda
  const firstRow = tabs.slice(0, 6); // Dashboard, Tasks, Habits, Wellness, Notes, AI
  const secondRow = tabs.slice(6); // Focus, Goals, Stats, Analytics, Premium

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prvi red - 6 taba */}
        <div className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-1">
          {firstRow.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors min-w-0 ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-blue-600' : tab.color}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Drugi red - 4 taba */}
        <div className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-2">
          {secondRow.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-2 sm:py-3 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors min-w-0 ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : tab.color}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};