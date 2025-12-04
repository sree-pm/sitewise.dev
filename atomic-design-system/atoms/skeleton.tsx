"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  animate = true
}) => {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const defaultHeight = {
    text: '1rem',
    circular: '3rem',
    rectangular: '8rem',
    rounded: '8rem'
  };

  return (
    <div
      className={cn(
        "bg-white/10",
        animate && "animate-pulse",
        variantStyles[variant],
        className
      )}
      style={{
        width: width || (variant === 'circular' ? defaultHeight[variant] : '100%'),
        height: height || defaultHeight[variant]
      }}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

// Skeleton Variants for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className
}) => {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("border border-white/10 rounded-lg p-4", className)}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar size={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="40%" height="1rem" className="mb-2" />
          <Skeleton variant="text" width="60%" height="0.875rem" />
        </div>
      </div>
      <Skeleton variant="rounded" height="12rem" className="mb-3" />
      <SkeletonText lines={2} />
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
  rows = 5,
  columns = 4,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" height="1.25rem" className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" height="1rem" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const SkeletonList: React.FC<{ items?: number; className?: string }> = ({
  items = 5,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonAvatar size={32} />
          <div className="flex-1">
            <Skeleton variant="text" width="30%" height="1rem" className="mb-2" />
            <Skeleton variant="text" width="60%" height="0.875rem" />
          </div>
          <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
        </div>
      ))}
    </div>
  );
};
