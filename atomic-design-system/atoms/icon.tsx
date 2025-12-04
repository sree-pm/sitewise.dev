"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface IconProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white' | 'gray';
  className?: string;
  strokeWidth?: number;
}

const sizeConfig = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10'
};

const colorConfig = {
  primary: 'text-blue-500',
  secondary: 'text-purple-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  white: 'text-white',
  gray: 'text-gray-400'
};

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'white',
  className,
  strokeWidth = 2
}) => {
  const sizeClass = typeof size === 'number' 
    ? undefined 
    : sizeConfig[size];
  
  const style = typeof size === 'number' 
    ? { width: size, height: size } 
    : undefined;

  return (
    <IconComponent
      className={cn(
        sizeClass,
        colorConfig[color],
        className
      )}
      style={style}
      strokeWidth={strokeWidth}
    />
  );
};

// Icon Button variant
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ghost' | 'filled' | 'outlined';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  isLoading?: boolean;
  'aria-label': string;
}

const buttonSizeConfig = {
  xs: 'h-6 w-6 p-1',
  sm: 'h-8 w-8 p-1.5',
  md: 'h-10 w-10 p-2',
  lg: 'h-12 w-12 p-2.5',
  xl: 'h-14 w-14 p-3'
};

const iconButtonSizeConfig = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
  xl: 'h-8 w-8'
};

const buttonVariantConfig = {
  ghost: {
    primary: 'text-blue-400 hover:bg-blue-500/20',
    secondary: 'text-purple-400 hover:bg-purple-500/20',
    success: 'text-green-400 hover:bg-green-500/20',
    warning: 'text-yellow-400 hover:bg-yellow-500/20',
    error: 'text-red-400 hover:bg-red-500/20'
  },
  filled: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    error: 'bg-red-600 text-white hover:bg-red-700'
  },
  outlined: {
    primary: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20',
    secondary: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20',
    success: 'border-2 border-green-500 text-green-400 hover:bg-green-500/20',
    warning: 'border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/20',
    error: 'border-2 border-red-500 text-red-400 hover:bg-red-500/20'
  }
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon: IconComponent,
  size = 'md',
  variant = 'ghost',
  color = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        buttonSizeConfig[size],
        buttonVariantConfig[variant][color],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconButtonSizeConfig[size])} />
      ) : (
        <IconComponent className={iconButtonSizeConfig[size]} />
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';

// Close Button (common use case)
export interface CloseButtonProps extends Omit<IconButtonProps, 'icon' | 'aria-label'> {
  onClose?: () => void;
}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(({
  onClose,
  size = 'md',
  ...props
}, ref) => {
  const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <IconButton
      ref={ref}
      icon={XIcon}
      size={size}
      onClick={onClose}
      {...props}
      aria-label="Close"
    />
  );
});

CloseButton.displayName = 'CloseButton';
