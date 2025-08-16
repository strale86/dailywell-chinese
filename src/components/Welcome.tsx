import React from 'react';
import { Zap, Heart, Target } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Header with logo */}
      <div className="relative z-10 flex flex-col items-center pt-20 pb-12">
        <div className="relative mb-6">
          <Zap size={40} className="text-yellow-500 drop-shadow-lg" />
          <Heart size={20} className="absolute -top-2 -right-2 text-pink-500" />
          <Target size={20} className="absolute -bottom-2 -left-2 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">DailyWell</h1>
        <p className="text-lg text-white/90 text-center">Your daily wellness companion</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Transform Your Daily Routine</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Build healthy habits, track your progress, and achieve your wellness goals with our comprehensive daily companion app.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 mb-12">
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-300 font-bold">✓</span>
            </div>
            <span className="text-white font-medium">Task Management & Productivity</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-300 font-bold">🔄</span>
            </div>
            <span className="text-white font-medium">Habit Tracking & Streaks</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-red-300 font-bold">❤️</span>
            </div>
            <span className="text-white font-medium">Wellness Check-ins</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-300 font-bold">⏱️</span>
            </div>
            <span className="text-white font-medium">Focus Timer (Pomodoro)</span>
          </div>
          
          <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-300 font-bold">📊</span>
            </div>
            <span className="text-white font-medium">Progress Analytics</span>
          </div>
        </div>

        {/* Get Started button */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Get Started
          </button>
          
          <p className="text-white/80 mt-4">
            Join thousands of users improving their daily wellness
          </p>
        </div>
      </div>
    </div>
  );
};
