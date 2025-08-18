import React, { useState, useEffect } from 'react';
import { User, Award, Wifi, WifiOff } from 'lucide-react';
import { UserStats } from '../types';
import { Logo } from './Logo';
import { ProfileModal } from './ProfileModal';
import { OfflineManager } from '../utils/offlineManager';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  stats: UserStats;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, onLogout }) => {
  const { t } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('dailywell-profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState(0);
  
  const progressToNextLevel = ((stats.totalPoints % 1000) / 1000) * 100;
  const offlineManager = OfflineManager.getInstance();

  // Listen for profile changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('dailywell-profile');
      setProfile(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      setPendingActions(offlineManager.getPendingActionsCount());
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // Initial check
    handleOnlineStatus();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [offlineManager]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo size="md" showText={true} />
          
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Offline Indicator */}
            {!isOnline && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                <WifiOff className="w-3 h-3" />
                <span>{t('common.offline')}</span>
                {pendingActions > 0 && (
                  <span className="bg-yellow-600 text-white px-1 rounded-full text-xs">
                    {pendingActions}
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stats.totalPoints}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('common.points')}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{stats.level}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('common.level')} {stats.level}</span>
                </div>
                <div className="w-16 sm:w-20 h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
              </div>
            </div>
            

            
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : profile?.firstName && profile?.lastName ? (
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {`${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()}
                </span>
              ) : (
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={onLogout}
        stats={stats}
      />
    </header>
  );
};