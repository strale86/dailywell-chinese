import React, { useState } from 'react';
import { User, Award } from 'lucide-react';
import { UserStats } from '../types';
import { Logo } from './Logo';
import { ProfileModal } from './ProfileModal';

interface HeaderProps {
  stats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const progressToNextLevel = ((stats.totalPoints % 1000) / 1000) * 100;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo size="md" showText={true} />
          
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">{stats.totalPoints}</span>
                </div>
                <p className="text-xs text-gray-500">Points</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{stats.level}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Level {stats.level}</span>
                </div>
                <div className="w-16 sm:w-20 h-1 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
      
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
      />
    </header>
  );
};