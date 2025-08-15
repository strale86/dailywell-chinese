import React, { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { TaskManager } from './TaskManager';
import { PomodoroTimer } from './PomodoroTimer';
import { HabitsTracker } from './HabitsTracker';
import { WellnessCheck } from './WellnessCheck';
import { StatsDisplay } from './StatsDisplay';
import { ProfileModal } from './ProfileModal';
import { UserStats } from '../types';

type ActiveTab = 'tasks' | 'pomodoro' | 'habits' | 'wellness' | 'stats';

interface MainAppProps {
  onLogout: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mock stats data - in real app this would come from context or API
  const mockStats: UserStats = {
    totalPoints: 1250,
    level: 2,
    tasksCompleted: 45,
    habitsCompleted: 12,
    pomodoroSessions: 23,
    currentStreak: 7
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TaskManager />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'habits':
        return <HabitsTracker />;
      case 'wellness':
        return <WellnessCheck />;
      case 'stats':
        return <StatsDisplay />;
      default:
        return <TaskManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header stats={mockStats} />
      
      <div className="container mx-auto px-4 py-6">
        <Navigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <main className="mt-6">
          {renderActiveComponent()}
        </main>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
