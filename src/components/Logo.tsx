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
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "DailyWell",
          subtitle: "Vaš dnevni wellness pratilac"
        };
      case 'zh':
        return {
          title: "DailyWell",
          subtitle: "您的日常健康伴侣"
        };
      default: // English
        return {
          title: "DailyWell",
          subtitle: "Your daily wellness companion"
        };
    }
  };

  const text = getText();
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
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
          gradient: 'from-purple-500 to-purple-600',
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
          text: 'text-gray-900 dark:text-white',
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
            {text.title}
          </h1>
          {size !== 'sm' && (
            <p className={`text-xs ${variant === 'white' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'} font-medium`}>
              {text.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Simple logo without text (for icons, etc.)
export const LogoIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const lightningSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      rounded-full 
      bg-gradient-to-br from-green-400 to-blue-500 
      shadow-lg 
      flex items-center justify-center
      relative
      ${className}
    `}>
      {/* Subtle shadow overlay */}
      <div className="absolute inset-0 rounded-full bg-black opacity-10"></div>
      
      {/* Lightning bolt */}
      <span className={`${lightningSizes[size]} text-white font-bold relative z-10`}>
        ⚡
      </span>
    </div>
  );
};