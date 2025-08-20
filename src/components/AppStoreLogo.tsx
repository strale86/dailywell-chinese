import React from 'react';

interface AppStoreLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AppStoreLogo: React.FC<AppStoreLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const lightningSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      rounded-full 
      bg-gradient-to-br from-green-400 via-green-500 to-blue-500 
      shadow-lg 
      flex items-center justify-center
      relative
      ${className}
    `}>
      {/* Subtle shadow overlay for depth */}
      <div className="absolute inset-0 rounded-full bg-black opacity-10"></div>
      
      {/* Lightning bolt - the main icon */}
      <span className={`${lightningSizes[size]} text-white font-bold relative z-10 drop-shadow-sm`}>
        ⚡
      </span>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-white opacity-5 blur-sm"></div>
    </div>
  );
};

// Square version for app stores (without rounded corners)
export const AppStoreIcon: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16', 
    xl: 'w-20 h-20'
  };

  const lightningSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      bg-gradient-to-br from-green-400 via-green-500 to-blue-500 
      shadow-lg 
      flex items-center justify-center
      relative
      ${className}
    `}>
      {/* Subtle shadow overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Lightning bolt */}
      <span className={`${lightningSizes[size]} text-white font-bold relative z-10 drop-shadow-sm`}>
        ⚡
      </span>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-white opacity-5 blur-sm"></div>
    </div>
  );
};

