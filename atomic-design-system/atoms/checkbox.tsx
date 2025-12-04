"use client";

import React from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  variant?: 'default' | 'bordered' | 'circle';
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    description, 
    error, 
    indeterminate = false,
    variant = 'default',
    size = 'md',
    className,
    disabled,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    const iconSizes = {
      sm: 12,
      md: 14,
      lg: 16
    };

    const variantClasses = {
      default: 'rounded',
      bordered: 'rounded border-2',
      circle: 'rounded-full'
    };

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            sizeClasses[size],
            variantClasses[variant],
            "border-2 border-neutral-700 bg-neutral-900 transition-all cursor-pointer",
            "peer-checked:bg-blue-600 peer-checked:border-blue-600",
            "peer-indeterminate:bg-blue-600 peer-indeterminate:border-blue-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            "hover:border-neutral-600 peer-checked:hover:bg-blue-700",
            error && "border-red-500 peer-checked:border-red-500 peer-checked:bg-red-600"
          )}>
            {indeterminate ? (
              <Minus className="text-white" size={iconSizes[size]} />
            ) : (
              <Check className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={iconSizes[size]} />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label className={cn(
                "block font-medium text-white cursor-pointer",
                size === 'sm' && "text-sm",
                size === 'md' && "text-base",
                size === 'lg' && "text-lg",
                disabled && "opacity-50 cursor-not-allowed"
              )}>
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                "text-neutral-400 mt-1",
                size === 'sm' && "text-xs",
                size === 'md' && "text-sm",
                size === 'lg' && "text-base"
              )}>
                {description}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-1">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Checkbox Group Component
export interface CheckboxGroupProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  description?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  label,
  description,
  error,
  orientation = 'vertical',
  size = 'md'
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;
    
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <div>
          <label className="block font-medium text-white mb-1">{label}</label>
          {description && <p className="text-sm text-neutral-400">{description}</p>}
        </div>
      )}
      
      <div className={cn(
        "flex gap-4",
        orientation === 'vertical' ? 'flex-col' : 'flex-wrap'
      )}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            description={option.description}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            disabled={option.disabled}
            size={size}
          />
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
