'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============ SPACER ============

export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  axis?: 'horizontal' | 'vertical';
}

export function Spacer({ size = 'md', axis = 'vertical' }: SpacerProps) {
  const sizeMap = {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
  };

  if (axis === 'horizontal') {
    return <span style={{ display: 'inline-block', width: sizeMap[size] }} />;
  }

  return <div style={{ height: sizeMap[size] }} />;
}

// ============ DIVIDER ============

export interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'light' | 'medium' | 'heavy';
  vertical?: boolean;
}

export function Divider({ variant = 'solid', color = 'light', vertical = false }: DividerProps) {
  const colorClass = {
    light: 'border-neutral-800',
    medium: 'border-neutral-700',
    heavy: 'border-neutral-600',
  }[color];

  const variantClass = {
    solid: '',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  }[variant];

  if (vertical) {
    return <div className={cn('border-l h-full', colorClass, variantClass)} />;
  }

  return <div className={cn('border-t w-full', colorClass, variantClass)} />;
}

// ============ CONTAINER ============

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  centerContent?: boolean;
}

export function Container({ size = 'lg', padding = 'md', centerContent = false, className, children, ...props }: ContainerProps) {
  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'w-full',
  }[size];

  const paddingClass = {
    sm: 'px-4',
    md: 'px-6 md:px-8',
    lg: 'px-8 md:px-12',
  }[padding];

  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizeClass,
        paddingClass,
        centerContent && 'flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============ FLEX BOX ============

export interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export function FlexBox({
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false,
  fullHeight = false,
  fullWidth = false,
  className,
  children,
  ...props
}: FlexBoxProps) {
  const directionClass = {
    row: 'flex-row',
    col: 'flex-col',
  }[direction];

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];

  const gapClass = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }[gap];

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        alignClass,
        justifyClass,
        gapClass,
        wrap && 'flex-wrap',
        fullHeight && 'h-full',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============ GRID ============

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  autoRows?: 'auto' | 'min' | 'max';
}

export function Grid({ cols = 3, gap = 'md', autoRows = 'auto', className, children, ...props }: GridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }[cols];

  const gapClass = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }[gap];

  const autoRowsClass = {
    auto: 'auto-rows-auto',
    min: 'auto-rows-min',
    max: 'auto-rows-max',
  }[autoRows];

  return (
    <div
      className={cn('grid', colsClass, gapClass, autoRowsClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ============ ASPECT RATIO ============

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: '1/1' | '4/3' | '16/9' | '21/9' | '3/2' | '2/3';
  children: React.ReactNode;
}

export function AspectRatio({ ratio = '16/9', className, children, ...props }: AspectRatioProps) {
  const ratioMap = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-video',
    '16/9': 'aspect-video',
    '21/9': 'aspect-auto',
    '3/2': 'aspect-auto',
    '2/3': 'aspect-auto',
  };

  return (
    <div className={cn(ratioMap[ratio] || 'aspect-video', className)} {...props}>
      {children}
    </div>
  );
}

// ============ STACK ============

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  axis?: 'vertical' | 'horizontal';
}

export function Stack({ spacing = 'md', axis = 'vertical', className, children, ...props }: StackProps) {
  const spacingClass = {
    xs: axis === 'vertical' ? 'space-y-2' : 'space-x-2',
    sm: axis === 'vertical' ? 'space-y-4' : 'space-x-4',
    md: axis === 'vertical' ? 'space-y-6' : 'space-x-6',
    lg: axis === 'vertical' ? 'space-y-8' : 'space-x-8',
    xl: axis === 'vertical' ? 'space-y-12' : 'space-x-12',
  }[spacing];

  const directionClass = axis === 'vertical' ? 'flex flex-col' : 'flex flex-row';

  return (
    <div className={cn(directionClass, spacingClass, className)} {...props}>
      {children}
    </div>
  );
}

// ============ SURFACE ============

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline' | 'elevated';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  hover?: boolean;
  interactive?: boolean;
}

export function Surface({
  variant = 'glass',
  padding = 'md',
  rounded = 'lg',
  hover = false,
  interactive = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  const variantClass = {
    glass: 'bg-white/5 backdrop-blur-md border border-white/10',
    solid: 'bg-neutral-900 border border-neutral-800',
    outline: 'border-2 border-neutral-700 bg-transparent',
    elevated: 'bg-neutral-800 shadow-lg',
  }[variant];

  const paddingClass = {
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-12',
  }[padding];

  const roundedClass = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-3xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      className={cn(
        variantClass,
        paddingClass,
        roundedClass,
        hover && 'hover:shadow-lg hover:border-white/20 transition-all duration-200',
        interactive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============ SKELETON ============

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  circle?: boolean;
}

export function Skeleton({ height = '1rem', width = '100%', circle = false, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-neutral-800 to-neutral-700 animate-pulse',
        circle && 'rounded-full',
        !circle && 'rounded-md',
        className
      )}
      style={{ height, width }}
      {...props}
    />
  );
}
