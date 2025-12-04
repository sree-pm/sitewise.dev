"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'striped' | 'animated';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeConfig = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const colorConfig = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  yellow: 'bg-yellow-600',
  red: 'bg-red-600',
  purple: 'bg-purple-600'
};

const gradientConfig = {
  blue: 'bg-gradient-to-r from-blue-500 to-blue-700',
  green: 'bg-gradient-to-r from-green-500 to-green-700',
  yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-700',
  red: 'bg-gradient-to-r from-red-500 to-red-700',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-700'
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  color = 'blue',
  showLabel = false,
  label,
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getBarClasses = () => {
    const baseClasses = "h-full transition-all duration-300 ease-out rounded-full";
    
    switch (variant) {
      case 'gradient':
        return cn(baseClasses, gradientConfig[color]);
      case 'striped':
        return cn(
          baseClasses,
          colorConfig[color],
          "bg-[length:1rem_1rem]",
          "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]"
        );
      case 'animated':
        return cn(
          baseClasses,
          colorConfig[color],
          "bg-[length:1rem_1rem]",
          "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]",
          "animate-[progress_1s_linear_infinite]"
        );
      default:
        return cn(baseClasses, colorConfig[color]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/80">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium text-white/60">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div
        className={cn(
          "w-full bg-white/10 rounded-full overflow-hidden",
          sizeConfig[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={getBarClasses()}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular Progress
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'blue',
  showLabel = true,
  label,
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const strokeColor = {
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
    purple: '#a855f7'
  }[color];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-white/10"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-sm text-white/60 mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Status Dot (for indicating progress states)
export interface StatusDotProps {
  status: 'idle' | 'loading' | 'success' | 'error' | 'warning';
  label?: string;
  pulse?: boolean;
  className?: string;
}

const statusDotConfig = {
  idle: 'bg-gray-500',
  loading: 'bg-blue-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500'
};

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  label,
  pulse = false,
  className
}) => {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="relative">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            statusDotConfig[status]
          )}
        />
        {pulse && (
          <div
            className={cn(
              "absolute inset-0 h-2 w-2 rounded-full animate-ping opacity-75",
              statusDotConfig[status]
            )}
          />
        )}
      </div>
      {label && (
        <span className="text-sm text-white/80">{label}</span>
      )}
    </div>
  );
};
