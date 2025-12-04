"use client";

import React from 'react';
import { cn } from '@/lib/utils';

// Heading component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'gradient' | 'underline' | 'default';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  variant = 'default',
  align = 'left',
  className,
  children,
  ...props
}) => {
  const baseStyles = "font-bold text-white";
  
  const sizeStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl'
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const variantStyles = {
    default: '',
    gradient: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
    underline: 'relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-blue-500 after:rounded-full'
  };

  return (
    <Component
      className={cn(
        baseStyles,
        sizeStyles[Component],
        alignStyles[align],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Paragraph component
export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted' | 'subtle';
  children: React.ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const variantStyles = {
    default: 'text-white/80',
    muted: 'text-white/60',
    subtle: 'text-white/40'
  };

  return (
    <p
      className={cn(
        'leading-relaxed',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// Blockquote component
export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  cite?: string;
  author?: string;
  variant?: 'default' | 'bordered' | 'highlighted';
  children: React.ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = ({
  cite,
  author,
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'border-l-4 border-blue-500 pl-4 italic',
    bordered: 'border-l-4 border-white/20 pl-6 py-2',
    highlighted: 'bg-white/5 border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg'
  };

  return (
    <blockquote
      cite={cite}
      className={cn(
        'text-white/80 text-lg',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div>{children}</div>
      {author && (
        <footer className="mt-2 text-sm text-white/60 not-italic">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

// Caption component
export interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted';
  children: React.ReactNode;
}

export const Caption: React.FC<CaptionProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'text-white/60',
    muted: 'text-white/40'
  };

  return (
    <span
      className={cn(
        'text-xs',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Label component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  required,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={cn(
        'text-sm font-medium text-white/90',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

// Code inline component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ className, children, ...props }) => {
  return (
    <code
      className={cn(
        'px-1.5 py-0.5 bg-gray-800 text-blue-400 rounded text-sm font-mono',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};

// Strong/Bold component
export interface StrongProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Strong: React.FC<StrongProps> = ({ className, children, ...props }) => {
  return (
    <strong
      className={cn('font-semibold text-white', className)}
      {...props}
    >
      {children}
    </strong>
  );
};

// Emphasis/Italic component
export interface EmProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Em: React.FC<EmProps> = ({ className, children, ...props }) => {
  return (
    <em
      className={cn('italic text-white/90', className)}
      {...props}
    >
      {children}
    </em>
  );
};

// Small text component
export interface SmallProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Small: React.FC<SmallProps> = ({ className, children, ...props }) => {
  return (
    <small
      className={cn('text-xs text-white/60', className)}
      {...props}
    >
      {children}
    </small>
  );
};

// Mark/Highlight component
export interface MarkProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Mark: React.FC<MarkProps> = ({ className, children, ...props }) => {
  return (
    <mark
      className={cn('bg-yellow-500/20 text-yellow-300 px-1 rounded', className)}
      {...props}
    >
      {children}
    </mark>
  );
};
