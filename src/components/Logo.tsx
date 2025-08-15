import React from 'react';
import { Zap, Heart, Target } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          gradient: 'from-white to-gray-100',
          text: 'text-white',
          icons: 'text-white/80'
        };
      case 'dark':
        return {
          gradient: 'from-gray-800 to-gray-900',
          text: 'text-gray-800',
          icons: 'text-gray-600'
        };
      default:
        return {
          gradient: 'from-blue-500 via-purple-500 to-green-500',
          text: 'text-gray-900',
          icons: 'text-white'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        
        {/* Main icon - Zap for energy/wellness */}
        <div className="relative z-10 flex items-center justify-center">
          <Zap className={`${iconSizeClasses[size]} text-yellow-400 drop-shadow-lg animate-pulse`} strokeWidth={2.5} />
        </div>
        
        {/* Small accent icons */}
        <Heart className={`absolute top-1 right-1 w-3 h-3 text-pink-400 opacity-70`} />
        <Target className={`absolute bottom-1 left-1 w-3 h-3 text-blue-400 opacity-70`} />
      </div>
      
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold ${colors.text} tracking-tight`}>
            DailyWell
          </h1>
          {size !== 'sm' && (
            <p className={`text-xs ${variant === 'white' ? 'text-white/70' : 'text-gray-500'} font-medium`}>
              Your wellness companion
            </p>
          )}
        </div>
      )}
    </div>
  );
};