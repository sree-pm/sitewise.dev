"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  label?: string;
  description?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  marks?: { value: number; label: string }[];
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    label, 
    description, 
    error, 
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 50,
    onChange,
    showValue = false,
    size = 'md',
    marks,
    className,
    disabled,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    };

    const thumbSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    return (
      <div className={cn("space-y-2", className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="block text-sm font-medium text-white">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-medium text-blue-400">
                {currentValue}
              </span>
            )}
          </div>
        )}
        
        {description && (
          <p className="text-sm text-neutral-400">{description}</p>
        )}

        <div className="relative pt-1 pb-6">
          {/* Track background */}
          <div className={cn(
            "w-full rounded-full bg-neutral-800 relative",
            sizeClasses[size]
          )}>
            {/* Filled track */}
            <div 
              className={cn(
                "absolute top-0 left-0 rounded-full bg-blue-600 transition-all",
                sizeClasses[size]
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "absolute top-0 w-full h-2 opacity-0 cursor-pointer",
              "disabled:cursor-not-allowed"
            )}
            {...props}
          />

          {/* Custom thumb */}
          <div 
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-blue-600 shadow-lg transition-all pointer-events-none",
              "disabled:opacity-50",
              thumbSizes[size]
            )}
            style={{ left: `calc(${percentage}% - ${size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'})` }}
          />

          {/* Marks */}
          {marks && (
            <div className="absolute top-full w-full mt-2">
              {marks.map((mark) => {
                const markPercentage = ((mark.value - min) / (max - min)) * 100;
                return (
                  <div
                    key={mark.value}
                    className="absolute text-xs text-neutral-400 -translate-x-1/2"
                    style={{ left: `${markPercentage}%` }}
                  >
                    {mark.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

// Range Slider (dual handles)
export interface RangeSliderProps {
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [25, 75],
  onChange,
  size = 'md'
}) => {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const [minValue, maxValue] = value || internalValue;

  const handleMinChange = (newMin: number) => {
    const newValue: [number, number] = [Math.min(newMin, maxValue - step), maxValue];
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMaxChange = (newMax: number) => {
    const newValue: [number, number] = [minValue, Math.max(newMax, minValue + step)];
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium text-white">{label}</label>
        )}
        <span className="text-sm font-medium text-blue-400">
          {minValue} - {maxValue}
        </span>
      </div>
      
      {description && (
        <p className="text-sm text-neutral-400">{description}</p>
      )}

      <div className="relative pt-1 pb-2">
        <div className="w-full h-2 rounded-full bg-neutral-800 relative">
          <div 
            className="absolute top-0 h-2 rounded-full bg-blue-600"
            style={{ 
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
        </div>

        <Slider
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          size={size}
          className="absolute top-0"
        />
        
        <Slider
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          size={size}
          className="absolute top-0"
        />
      </div>
    </div>
  );
};
