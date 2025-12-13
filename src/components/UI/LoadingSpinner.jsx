 
import { motion } from 'framer-motion';
import { memo } from 'react';

const LoadingSpinner = memo(({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-4'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        {/* Optimized spinner with reduced GPU usage */}
        <div
          className={`${sizeClasses[size]} border-neutral-700/50 border-t-amber-400 rounded-full mx-auto animate-spin`}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading</span>
        </div>
        
        {/* Loading message with reduced animation */}
        {message && (
          <p className="mt-4 text-neutral-300 text-sm opacity-75">
            {message}
          </p>
        )}
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

// Optimized skeleton loader for content
export const SkeletonLoader = memo(({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-neutral-700/50 rounded h-4 mb-3 relative overflow-hidden ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
        </div>
      ))}
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

// Enhanced card skeleton with shimmer effect
export const CardSkeleton = memo(({ className = '' }) => {
  return (
    <div className={`glass-effect rounded-2xl overflow-hidden border border-neutral-700/50 animate-pulse ${className}`}>
      {/* Image placeholder with shimmer */}
      <div className="bg-gradient-to-br from-neutral-700/50 to-neutral-800/50 h-48 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="p-6">
        {/* Title placeholder */}
        <div className="bg-neutral-700/50 rounded h-6 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Description placeholder */}
        <div className="space-y-2 mb-4">
          <div className="bg-neutral-700/50 rounded h-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="bg-neutral-700/50 rounded h-4 w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Tags placeholder */}
        <div className="flex gap-2">
          <div className="bg-neutral-700/50 rounded-full h-6 w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="bg-neutral-700/50 rounded-full h-6 w-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="bg-neutral-700/50 rounded-full h-6 w-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

CardSkeleton.displayName = 'CardSkeleton';

export default LoadingSpinner;
