"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, size = 'md', className, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    const dotSizes = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3'
    };

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            ref={ref}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            sizeClasses[size],
            "rounded-full border-2 border-neutral-700 bg-neutral-900 transition-all cursor-pointer",
            "flex items-center justify-center",
            "peer-checked:border-blue-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            "hover:border-neutral-600",
            error && "border-red-500 peer-checked:border-red-500"
          )}>
            <div className={cn(
              dotSizes[size],
              "rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity"
            )} />
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

Radio.displayName = 'Radio';

// Radio Group Component
export interface RadioGroupProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  description?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  description,
  error,
  orientation = 'vertical',
  size = 'md'
}) => {
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
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            disabled={option.disabled}
            size={size}
          />
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

// Radio Card (Premium variant)
export interface RadioCardProps extends RadioProps {
  icon?: React.ReactNode;
  badge?: string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ label, description, icon, badge, className, size, error, ...props }, ref) => {
    return (
      <label className={cn(
        "relative flex items-start gap-4 p-4 rounded-lg border-2 border-neutral-800 bg-neutral-900/50 cursor-pointer transition-all",
        "hover:border-neutral-700 hover:bg-neutral-900",
        "has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/10",
        "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed",
        className
      )}>
        <input
          type="radio"
          ref={ref}
          className="peer sr-only"
          {...props}
        />
        
        {icon && (
          <div className="flex-shrink-0 text-neutral-400 peer-checked:text-blue-500">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{label}</span>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-neutral-400 mt-1">{description}</p>
          )}
        </div>

        <div className="h-5 w-5 rounded-full border-2 border-neutral-700 bg-neutral-900 flex items-center justify-center peer-checked:border-blue-600">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100" />
        </div>
      </label>
    );
  }
);

RadioCard.displayName = 'RadioCard';
