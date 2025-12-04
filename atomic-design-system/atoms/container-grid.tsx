"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1440px]',
  full: 'max-w-full'
};

const paddingConfig = {
  none: 'px-0',
  sm: 'px-4 sm:px-6',
  md: 'px-6 sm:px-8',
  lg: 'px-8 sm:px-12'
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  padding = 'md',
  centered = true,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full',
        sizeConfig[size],
        paddingConfig[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

// Grid System
export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6;
    md?: 1 | 2 | 3 | 4 | 6 | 8;
    lg?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  };
  className?: string;
}

const colsConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  12: 'grid-cols-12'
};

const gapConfig = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
};

const responsiveConfig = {
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    6: 'sm:grid-cols-6'
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-6',
    8: 'md:grid-cols-8'
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    6: 'lg:grid-cols-6',
    8: 'lg:grid-cols-8',
    12: 'lg:grid-cols-12'
  }
};

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = 'md',
  responsive,
  className
}) => {
  return (
    <div
      className={cn(
        'grid',
        colsConfig[cols],
        gapConfig[gap],
        responsive?.sm && responsiveConfig.sm[responsive.sm],
        responsive?.md && responsiveConfig.md[responsive.md],
        responsive?.lg && responsiveConfig.lg[responsive.lg],
        className
      )}
    >
      {children}
    </div>
  );
};

// Grid Item
export interface GridItemProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  spanSm?: 1 | 2 | 3 | 4 | 6;
  spanMd?: 1 | 2 | 3 | 4 | 6 | 8;
  spanLg?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  className?: string;
}

const spanConfig = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  8: 'col-span-8',
  12: 'col-span-12'
};

const spanSmConfig = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  6: 'sm:col-span-6'
};

const spanMdConfig = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
  8: 'md:col-span-8'
};

const spanLgConfig = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
  8: 'lg:col-span-8',
  12: 'lg:col-span-12'
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span,
  spanSm,
  spanMd,
  spanLg,
  className
}) => {
  return (
    <div
      className={cn(
        span && spanConfig[span],
        spanSm && spanSmConfig[spanSm],
        spanMd && spanMdConfig[spanMd],
        spanLg && spanLgConfig[spanLg],
        className
      )}
    >
      {children}
    </div>
  );
};

// Section Component (combines Container + spacing)
export interface SectionProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  spacingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'muted' | 'dark';
  className?: string;
}

const spacingYConfig = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32'
};

const backgroundConfig = {
  transparent: 'bg-transparent',
  muted: 'bg-white/5',
  dark: 'bg-gray-950'
};

export const Section: React.FC<SectionProps> = ({
  children,
  size = 'lg',
  padding = 'md',
  spacingY = 'md',
  background = 'transparent',
  className
}) => {
  return (
    <section
      className={cn(
        'w-full',
        spacingYConfig[spacingY],
        backgroundConfig[background],
        className
      )}
    >
      <Container size={size} padding={padding}>
        {children}
      </Container>
    </section>
  );
};
