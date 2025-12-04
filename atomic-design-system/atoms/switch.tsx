"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  labelPlacement?: 'left' | 'right';
  color?: 'primary' | 'success' | 'warning' | 'error';
  icon?: {
    checked?: React.ReactNode;
    unchecked?: React.ReactNode;
  };
  className?: string;
}

const sizeConfig = {
  sm: {
    track: 'w-8 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-3'
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5'
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 'translate-x-7'
  }
};

const colorConfig = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600'
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  size = 'md',
  disabled = false,
  loading = false,
  label,
  labelPlacement = 'right',
  color = 'primary',
  icon,
  className
}) => {
  const handleToggle = () => {
    if (!disabled && !loading) {
      onChange(!checked);
    }
  };

  const switchElement = (
    <button
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeConfig[size].track,
        checked ? colorConfig[color] : 'bg-gray-700',
        !disabled && !loading && 'cursor-pointer'
      )}
    >
      {/* Thumb */}
      <span
        className={cn(
          'inline-block rounded-full bg-white transition-transform duration-200',
          'flex items-center justify-center',
          sizeConfig[size].thumb,
          checked ? sizeConfig[size].translate : 'translate-x-0.5',
          loading && 'animate-pulse'
        )}
      >
        {icon && (
          <span className="text-gray-900 text-xs">
            {checked ? icon.checked : icon.unchecked}
          </span>
        )}
      </span>
    </button>
  );

  if (!label) {
    return <div className={className}>{switchElement}</div>;
  }

  return (
    <label
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {labelPlacement === 'left' && (
        <span className="text-sm font-medium text-white/90">{label}</span>
      )}
      {switchElement}
      {labelPlacement === 'right' && (
        <span className="text-sm font-medium text-white/90">{label}</span>
      )}
    </label>
  );
};

// Switch Group for multiple switches
export interface SwitchGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SwitchGroupProps {
  options: SwitchGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const SwitchGroup: React.FC<SwitchGroupProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  orientation = 'vertical',
  className
}) => {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-3' : 'flex-wrap gap-4',
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-3">
          <Switch
            checked={value.includes(option.value)}
            onChange={() => handleToggle(option.value)}
            size={size}
            disabled={option.disabled}
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-white/90">{option.label}</div>
            {option.description && (
              <div className="text-xs text-white/60 mt-0.5">{option.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
