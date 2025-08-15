import React from 'react';
import { Zap, Heart, Target } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
      
      {/* Header with logo */}
      <div className="relative z-10 flex flex-col items-center pt-20 pb-12">
        <div className="relative mb-6">
          <Zap size={40} className="text-yellow-500 drop-shadow-lg" />
          <Heart size={20} className="absolute -top-2 -right-2 text-pink-500" />
          <Target size={20} className="absolute -bottom-2 -left-2 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">DailyWell</h1>
        <p className="text-lg text-gray-600 text-center">Your daily wellness companion</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Your Daily Routine</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Build healthy habits, track your progress, and achieve your wellness goals with our comprehensive daily companion app.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mb-12">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-medium">Task Management & Productivity</span>
          </div>
          
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-600 font-bold">🔄</span>
            </div>
            <span className="text-gray-700 font-medium">Habit Tracking & Streaks</span>
          </div>
          
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-red-600 font-bold">❤️</span>
            </div>
            <span className="text-gray-700 font-medium">Wellness Check-ins</span>
          </div>
          
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-600 font-bold">⏱️</span>
            </div>
            <span className="text-gray-700 font-medium">Focus Timer (Pomodoro)</span>
          </div>
          
          <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 font-bold">📊</span>
            </div>
            <span className="text-gray-700 font-medium">Progress Analytics</span>
          </div>
        </div>

        {/* Get Started button */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </button>
          
          <p className="text-gray-500 mt-4">
            Join thousands of users improving their daily wellness
          </p>
        </div>
      </div>
    </div>
  );
};
