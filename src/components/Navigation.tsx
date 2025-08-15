import React from 'react';
import { CheckSquare, Target, Heart, Timer, BarChart3, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Navigation component with colored icons - updated version
const tabs = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'text-green-500' },
  { id: 'habits', label: 'Habits', icon: Target, color: 'text-purple-500' },
  { id: 'wellness', label: 'Wellness', icon: Heart, color: 'text-red-500' },
  { id: 'focus', label: 'Focus', icon: Timer, color: 'text-yellow-500' },
  { id: 'stats', label: 'Stats', icon: BarChart3, color: 'text-blue-500' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  console.log('Navigation rendered with colored icons'); // Force update
  
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors min-w-0 ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-blue-600' : tab.color}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};