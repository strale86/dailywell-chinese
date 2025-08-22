import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  return (
    <div 
      className={`${width} ${height} bg-gray-300 dark:bg-gray-600 rounded animate-pulse ${className}`}
    />
  );
};

export const SkeletonButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse ${className}`} />
  );
};

export const SkeletonInput: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-12 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse ${className}`} />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 ${className}`}>
      <div className="space-y-4">
        <Skeleton width="w-3/4" height="h-6" />
        <Skeleton width="w-1/2" height="h-4" />
        <Skeleton width="w-full" height="h-12" />
        <Skeleton width="w-full" height="h-12" />
        <Skeleton width="w-full" height="h-12" />
      </div>
    </div>
  );
};









