"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  label?: string;
  className?: string;
}

const sizeConfig = {
  xs: 'h-4 w-4 border-2',
  sm: 'h-6 w-6 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4'
};

const colorConfig = {
  primary: 'border-blue-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-400 border-t-transparent'
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label,
  className
}) => {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full animate-spin",
          sizeConfig[size],
          colorConfig[color]
        )}
        role="status"
        aria-label={label || "Loading"}
      >
        <span className="sr-only">{label || "Loading"}</span>
      </div>
      {label && (
        <span className="text-sm text-white/80">{label}</span>
      )}
    </div>
  );
};

// Dots Spinner Variant
export interface DotsSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const dotSizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4'
};

const dotColorConfig = {
  primary: 'bg-blue-600',
  white: 'bg-white',
  gray: 'bg-gray-400'
};

export const DotsSpinner: React.FC<DotsSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  return (
    <div className={cn("inline-flex gap-1", className)} role="status">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full",
            dotSizeConfig[size],
            dotColorConfig[color]
          )}
          style={{
            animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
};

// Pulse Spinner Variant
export interface PulseSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const pulseColorConfig = {
  primary: 'bg-blue-600/20',
  white: 'bg-white/20',
  gray: 'bg-gray-400/20'
};

export const PulseSpinner: React.FC<PulseSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className
}) => {
  return (
    <div className={cn("relative inline-flex", className)} role="status">
      <div className={cn(
        "rounded-full",
        sizeConfig[size],
        dotColorConfig[color]
      )} />
      <div className={cn(
        "absolute inset-0 rounded-full animate-ping",
        sizeConfig[size],
        pulseColorConfig[color]
      )} />
      <span className="sr-only">Loading</span>
    </div>
  );
};

// Full Page Spinner
export interface FullPageSpinnerProps {
  message?: string;
  blur?: boolean;
}

export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  message = "Loading...",
  blur = true
}) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
      blur && "backdrop-blur-sm"
    )}>
      <div className="text-center">
        <Spinner size="xl" color="white" />
        {message && (
          <p className="mt-4 text-lg text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};
