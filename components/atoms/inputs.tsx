'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============ INPUT ============

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, variant = 'default', size = 'md', className, ...props }, ref) => {
    const sizeClass = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    }[size];

    const variantClass = {
      default: 'bg-neutral-900 border border-neutral-700 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30',
      outline: 'bg-transparent border-2 border-neutral-600 focus:border-brand-purple',
      filled: 'bg-neutral-800 border border-neutral-700 focus:bg-neutral-900',
    }[variant];

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-white mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-lg focus:outline-none transition-all duration-200 text-white placeholder-neutral-500',
              sizeClass,
              variantClass,
              icon && 'pl-10',
              error && 'border-red-500 focus:ring-red-500/30',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        {hint && <p className="text-neutral-400 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============ TEXTAREA ============

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, variant = 'default', size = 'md', className, ...props }, ref) => {
    const sizeClass = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    }[size];

    const variantClass = {
      default: 'bg-neutral-900 border border-neutral-700 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30',
      outline: 'bg-transparent border-2 border-neutral-600 focus:border-brand-purple',
      filled: 'bg-neutral-800 border border-neutral-700 focus:bg-neutral-900',
    }[variant];

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-white mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full rounded-lg focus:outline-none transition-all duration-200 text-white placeholder-neutral-500 resize-none',
            sizeClass,
            variantClass,
            error && 'border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        {hint && <p className="text-neutral-400 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============ SELECT ============

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ label: string; value: string }>;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, variant = 'default', size = 'md', className, ...props }, ref) => {
    const sizeClass = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
    }[size];

    const variantClass = {
      default: 'bg-neutral-900 border border-neutral-700 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/30',
      outline: 'bg-transparent border-2 border-neutral-600 focus:border-brand-purple',
      filled: 'bg-neutral-800 border border-neutral-700 focus:bg-neutral-900',
    }[variant];

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-white mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full rounded-lg focus:outline-none transition-all duration-200 text-white appearance-none cursor-pointer',
            sizeClass,
            variantClass,
            error && 'border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        {hint && <p className="text-neutral-400 text-sm mt-1">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ============ CHECKBOX ============

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              'w-4 h-4 rounded border-neutral-600 border-2 accent-brand-purple focus:accent-brand-purple cursor-pointer',
              className
            )}
            {...props}
          />
          {label && (
            <label className="ml-2 text-sm text-white cursor-pointer select-none">
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ============ RADIO ============

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="radio"
          className={cn(
            'w-4 h-4 border-neutral-600 border-2 accent-brand-purple focus:accent-brand-purple cursor-pointer',
            className
          )}
          {...props}
        />
        {label && (
          <label className="ml-2 text-sm text-white cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// ============ TOGGLE ============

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked = false, onChange, label, disabled = false }: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange?.(!checked)}
        disabled={disabled}
        className={cn(
          'w-12 h-6 rounded-full transition-colors duration-300 relative',
          checked ? 'bg-brand-purple' : 'bg-neutral-700',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300',
            checked ? 'translate-x-6' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && <span className="text-sm text-white">{label}</span>}
    </div>
  );
}

// ============ LOADER ============

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'dots';
  color?: 'primary' | 'white';
}

export function Loader({ size = 'md', variant = 'spinner', color = 'primary' }: LoaderProps) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  const colorClass = color === 'primary' ? 'text-brand-purple' : 'text-white';

  if (variant === 'spinner') {
    return (
      <div className={cn('animate-spin', sizeClass, colorClass)}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (variant === 'pulse') {
    return <div className={cn('animate-pulse bg-brand-purple rounded-full', sizeClass)} />;
  }

  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn('w-2 h-2 bg-brand-purple rounded-full animate-bounce', colorClass)}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

// ============ PROGRESS BAR ============

export interface ProgressBarProps {
  value?: number;
  max?: number;
  showLabel?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value = 0, max = 100, showLabel = false, color = 'primary', size = 'md' }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  const colorClass = {
    primary: 'bg-brand-purple',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }[color];

  const sizeClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }[size];

  return (
    <div className="w-full">
      <div className={cn('w-full bg-neutral-700 rounded-full overflow-hidden', sizeClass)}>
        <div
          className={cn('h-full transition-all duration-300 ease-out', colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-neutral-400 mt-1 text-right">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}
