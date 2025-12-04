"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'bordered' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
  characterCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    description, 
    error, 
    resize = 'vertical',
    variant = 'default',
    helperText,
    characterCount = false,
    maxLength,
    className,
    value,
    ...props 
  }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };

    const variantClasses = {
      default: 'bg-neutral-900 border border-neutral-700 focus:border-blue-500',
      bordered: 'bg-transparent border-2 border-neutral-700 focus:border-blue-500',
      filled: 'bg-neutral-800 border border-transparent focus:border-blue-500'
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="block text-sm font-medium text-white">
            {label}
          </label>
        )}
        
        {description && (
          <p className="text-sm text-neutral-400">{description}</p>
        )}

        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            "w-full rounded-lg px-4 py-3 text-white min-h-[100px] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-neutral-500",
            resizeClasses[resize],
            variantClasses[variant],
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          {...props}
        />

        <div className="flex items-center justify-between">
          <div className="flex-1">
            {helperText && !error && (
              <p className="text-sm text-neutral-400">{helperText}</p>
            )}
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </div>
          
          {(characterCount || maxLength) && (
            <p className={cn(
              "text-sm tabular-nums",
              maxLength && currentLength > maxLength * 0.9 
                ? "text-yellow-400" 
                : "text-neutral-500"
            )}>
              {currentLength}{maxLength && ` / ${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Auto-resizing Textarea
export interface AutoResizeTextareaProps extends TextareaProps {
  minRows?: number;
  maxRows?: number;
}

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ minRows = 3, maxRows = 10, className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = lineHeight * minRows;
        const maxHeight = lineHeight * maxRows;
        
        textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
      };

      adjustHeight();
      textarea.addEventListener('input', adjustHeight);
      return () => textarea.removeEventListener('input', adjustHeight);
    }, [minRows, maxRows, props.value]);

    return (
      <Textarea
        ref={textareaRef}
        resize="none"
        className={className}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
