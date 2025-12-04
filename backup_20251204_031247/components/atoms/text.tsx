'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============ TYPOGRAPHY ATOMS ============

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodyLarge' | 'bodySmall' | 'caption' | 'code';
  color?: 'primary' | 'secondary' | 'tertiary' | 'white' | 'error' | 'success' | 'warning';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5;
}

export const textVariants = {
  h1: 'text-5xl md:text-6xl lg:text-7xl font-black',
  h2: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h3: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  h4: 'text-2xl md:text-3xl font-bold',
  h5: 'text-xl md:text-2xl font-semibold',
  h6: 'text-lg md:text-xl font-semibold',
  body: 'text-base leading-relaxed',
  bodyLarge: 'text-lg leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  caption: 'text-xs md:text-sm font-medium uppercase tracking-wider',
  code: 'text-sm font-mono bg-neutral-900 px-2 py-1 rounded',
};

export const colorVariants = {
  primary: 'text-white',
  secondary: 'text-neutral-300',
  tertiary: 'text-neutral-500',
  white: 'text-white',
  error: 'text-red-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
};

export const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ variant = 'body', color = 'primary', weight, align = 'left', truncate, lineClamp, className, ...props }, ref) => {
    const weightClass = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-black',
    }[weight || 'normal'];

    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    }[align];

    const lineClampClass = lineClamp ? {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
    }[lineClamp] : '';

    return (
      <div
        ref={ref}
        className={cn(
          textVariants[variant],
          colorVariants[color],
          weightClass,
          alignClass,
          truncate && 'truncate',
          lineClampClass,
          className
        )}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

// ============ GRADIENT TEXT ============

export interface GradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: 'purple-blue' | 'pink-purple' | 'blue-pink' | 'vibrant';
}

export function GradientText({ children, gradient = 'purple-blue', className }: GradientTextProps) {
  const gradients = {
    'purple-blue': 'bg-gradient-to-r from-brand-purple via-brand-blue to-brand-pink bg-clip-text text-transparent',
    'pink-purple': 'bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent',
    'blue-pink': 'bg-gradient-to-r from-brand-blue to-brand-pink bg-clip-text text-transparent',
    vibrant: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent',
  };

  return (
    <div className={cn(gradients[gradient], className)}>
      {children}
    </div>
  );
}

// ============ BADGE TEXT ============

export interface BadgeTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeText({ children, variant = 'default', size = 'md' }: BadgeTextProps) {
  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size];

  const variantClass = {
    default: 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30',
    outline: 'border border-neutral-500 text-neutral-300',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    error: 'bg-red-500/20 text-red-300 border border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  }[variant];

  return (
    <span className={cn('inline-block rounded-full font-semibold', sizeClass, variantClass)}>
      {children}
    </span>
  );
}
