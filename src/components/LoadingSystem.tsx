import React from 'react';

// Skeleton Components
export const SkeletonCard: React.FC = () => (
  <div className="glass-effect p-4 mb-4 animate-pulse">
    <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg mb-4 loading-shimmer"></div>
    <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2 loading-shimmer"></div>
    <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2 w-3/4 loading-shimmer"></div>
    <div className="flex gap-2 mt-4">
      <div className="h-6 w-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded loading-shimmer"></div>
      <div className="h-6 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded loading-shimmer"></div>
      <div className="h-6 w-14 bg-gradient-to-r from-gray-300 to-gray-400 rounded loading-shimmer"></div>
    </div>
  </div>
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className={`h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded loading-shimmer ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const SkeletonProfile: React.FC = () => (
  <div className="text-center animate-pulse">
    <div className="w-80 h-96 mx-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl mb-6 loading-shimmer"></div>
    <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-4 loading-shimmer"></div>
    <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-6 w-2/3 mx-auto loading-shimmer"></div>
    <div className="flex justify-center gap-4">
      <div className="h-12 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg loading-shimmer"></div>
      <div className="h-12 w-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg loading-shimmer"></div>
    </div>
  </div>
);

// Advanced Loading Spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 border-2 border-gray-300 rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-1 border-2 border-gray-200 rounded-full animate-spin border-t-secondary animation-delay-150"></div>
        <div className="absolute inset-2 border-2 border-gray-100 rounded-full animate-spin border-t-accent animation-delay-300"></div>
      </div>
    </div>
  );
};

// Progress Bar Component
export const ProgressBar: React.FC<{ 
  progress: number; 
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}> = ({ 
  progress, 
  className = '', 
  showPercentage = false,
  animated = true 
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className={`h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${
        animated ? 'animate-pulse' : ''
      }`}
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    >
      {showPercentage && (
        <span className="text-xs text-white font-semibold ml-2">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  </div>
);

// Lazy Loading Wrapper
export const LazyWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, fallback = <LoadingSpinner size="lg" />, className = '' }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-500 ${className}`}>
      {isLoaded ? children : fallback}
    </div>
  );
};

// Page Transition Component
export const PageTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}; 