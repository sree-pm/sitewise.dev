"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  thickness?: 'thin' | 'medium' | 'thick';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string | React.ReactNode;
  labelPosition?: 'left' | 'center' | 'right';
  className?: string;
}

const thicknessConfig = {
  horizontal: {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1'
  },
  vertical: {
    thin: 'w-px',
    medium: 'w-0.5',
    thick: 'w-1'
  }
};

const spacingConfig = {
  horizontal: {
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6'
  },
  vertical: {
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6'
  }
};

const variantConfig = {
  solid: 'bg-white/10',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  gradient: 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  spacing = 'md',
  label,
  labelPosition = 'center',
  className
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div
        className={cn(
          'relative flex items-center',
          spacingConfig.horizontal[spacing],
          className
        )}
      >
        {/* Left line */}
        {(labelPosition === 'center' || labelPosition === 'right') && (
          <div
            className={cn(
              'flex-1',
              thicknessConfig.horizontal[thickness],
              variant === 'dashed' || variant === 'dotted'
                ? cn('border-t border-white/10', variantConfig[variant])
                : variantConfig[variant]
            )}
          />
        )}

        {/* Label */}
        <span
          className={cn(
            'text-sm text-white/60 font-medium',
            labelPosition === 'left' ? 'pr-3' : labelPosition === 'right' ? 'pl-3' : 'px-3'
          )}
        >
          {label}
        </span>

        {/* Right line */}
        {(labelPosition === 'center' || labelPosition === 'left') && (
          <div
            className={cn(
              'flex-1',
              thicknessConfig.horizontal[thickness],
              variant === 'dashed' || variant === 'dotted'
                ? cn('border-t border-white/10', variantConfig[variant])
                : variantConfig[variant]
            )}
          />
        )}
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'inline-block',
          thicknessConfig.vertical[thickness],
          spacingConfig.vertical[spacing],
          variant === 'dashed' || variant === 'dotted'
            ? cn('border-l border-white/10', variantConfig[variant])
            : variantConfig[variant],
          className
        )}
        style={{ minHeight: '1rem' }}
      />
    );
  }

  // Horizontal without label
  return (
    <hr
      className={cn(
        'border-0',
        thicknessConfig.horizontal[thickness],
        spacingConfig.horizontal[spacing],
        variant === 'dashed' || variant === 'dotted'
          ? cn('border-t border-white/10', variantConfig[variant])
          : variantConfig[variant],
        className
      )}
    />
  );
};

// Section Divider with icon
export interface SectionDividerProps extends Omit<DividerProps, 'label'> {
  icon?: React.ReactNode;
  text?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <Divider
      {...props}
      label={
        icon || text ? (
          <span className="inline-flex items-center gap-2">
            {icon}
            {text}
          </span>
        ) : undefined
      }
    />
  );
};
