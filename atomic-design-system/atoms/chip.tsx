"use client";

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChipProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'soft';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  onDelete?: () => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  className?: string;
}

const colorConfig = {
  filled: {
    default: 'bg-gray-700 text-white hover:bg-gray-600',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700'
  },
  outlined: {
    default: 'border-2 border-gray-600 text-gray-300 hover:bg-gray-800',
    primary: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-950',
    success: 'border-2 border-green-500 text-green-400 hover:bg-green-950',
    warning: 'border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-950',
    error: 'border-2 border-red-500 text-red-400 hover:bg-red-950',
    info: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950'
  },
  soft: {
    default: 'bg-gray-800/50 text-gray-300 hover:bg-gray-800',
    primary: 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30',
    success: 'bg-green-600/20 text-green-400 hover:bg-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30',
    error: 'bg-red-600/20 text-red-400 hover:bg-red-600/30',
    info: 'bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30'
  }
};

const sizeConfig = {
  sm: 'h-6 px-2 text-xs gap-1',
  md: 'h-8 px-3 text-sm gap-1.5',
  lg: 'h-10 px-4 text-base gap-2'
};

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'filled',
  color = 'default',
  size = 'md',
  onDelete,
  onClick,
  icon,
  avatar,
  disabled = false,
  className
}) => {
  const isClickable = !!onClick && !disabled;
  const isDeletable = !!onDelete && !disabled;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-black',
        sizeConfig[size],
        colorConfig[variant][color],
        isClickable && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {avatar && (
        <img
          src={avatar}
          alt=""
          className={cn(
            'rounded-full object-cover -ml-1',
            size === 'sm' && 'w-5 h-5',
            size === 'md' && 'w-6 h-6',
            size === 'lg' && 'w-8 h-8'
          )}
        />
      )}
      {icon && !avatar && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {isDeletable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className={cn(
            'flex-shrink-0 rounded-full hover:bg-black/20 transition-colors focus:outline-none',
            size === 'sm' && 'p-0.5',
            size === 'md' && 'p-1',
            size === 'lg' && 'p-1.5'
          )}
          aria-label="Remove"
        >
          <X
            size={size === 'sm' ? 12 : size === 'md' ? 14 : 16}
            className="opacity-70 hover:opacity-100"
          />
        </button>
      )}
    </div>
  );
};

// Chip Group for managing multiple chips
export interface ChipGroupProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  max?: number;
  className?: string;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  spacing = 'md',
  max,
  className
}) => {
  const spacingConfig = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  };

  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const hiddenCount = max && childrenArray.length > max ? childrenArray.length - max : 0;

  return (
    <div className={cn('flex flex-wrap items-center', spacingConfig[spacing], className)}>
      {visibleChildren}
      {hiddenCount > 0 && (
        <Chip variant="soft" color="default" size="sm">
          +{hiddenCount}
        </Chip>
      )}
    </div>
  );
};
