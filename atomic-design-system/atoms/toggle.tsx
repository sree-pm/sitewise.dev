"use client";

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ios';
  onLabel?: string;
  offLabel?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ 
    label, 
    description, 
    size = 'md', 
    variant = 'default',
    onLabel,
    offLabel,
    className,
    disabled,
    checked,
    onChange,
    ...props 
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      } else {
        setInternalChecked(e.target.checked);
      }
    };

    const sizeClasses = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4'
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5'
      },
      lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7'
      }
    };

    const sizes = sizeClasses[size];

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            checked={isChecked}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            sizes.track,
            "rounded-full transition-colors",
            variant === 'default' && "bg-neutral-700 peer-checked:bg-blue-600",
            variant === 'ios' && "bg-neutral-600 peer-checked:bg-green-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            "relative"
          )}>
            <div className={cn(
              sizes.thumb,
              "absolute top-0.5 left-0.5 rounded-full bg-white transition-transform",
              isChecked && sizes.translate,
              variant === 'ios' && "shadow-sm"
            )} />
            
            {(onLabel || offLabel) && (
              <span className={cn(
                "absolute inset-0 flex items-center justify-between px-2 text-xs font-medium text-white",
                size === 'sm' && "text-[10px]"
              )}>
                {isChecked ? (
                  <span className="ml-1">{onLabel}</span>
                ) : (
                  <span className="mr-1">{offLabel}</span>
                )}
              </span>
            )}
          </div>
        </label>

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
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// Toggle Group (for multiple toggles)
export interface ToggleGroupProps {
  options: Array<{
    id: string;
    label: string;
    description?: string;
    defaultChecked?: boolean;
  }>;
  onChange?: (checkedItems: string[]) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  onChange,
  label,
  description,
  size = 'md'
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(
    options.filter(opt => opt.defaultChecked).map(opt => opt.id)
  );

  const handleToggle = (id: string, checked: boolean) => {
    const newChecked = checked
      ? [...checkedItems, id]
      : checkedItems.filter(item => item !== id);
    
    setCheckedItems(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className="space-y-3">
      {label && (
        <div>
          <label className="block font-medium text-white mb-1">{label}</label>
          {description && <p className="text-sm text-neutral-400">{description}</p>}
        </div>
      )}
      
      <div className="space-y-3">
        {options.map((option) => (
          <Toggle
            key={option.id}
            label={option.label}
            description={option.description}
            checked={checkedItems.includes(option.id)}
            onChange={(e) => handleToggle(option.id, e.target.checked)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};
