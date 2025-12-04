"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react';

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  variant?: 'default' | 'bordered' | 'filled' | 'stepper';
  size?: 'sm' | 'md' | 'lg';
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  showControls?: boolean;
  controlsPosition?: 'right' | 'sides';
  prefix?: string;
  suffix?: string;
  error?: boolean;
  helperText?: string;
  precision?: number;
}

const variantConfig = {
  default: 'bg-white/5 border border-white/10 focus:border-blue-500',
  bordered: 'bg-transparent border-2 border-white/20 focus:border-blue-500',
  filled: 'bg-white/10 border-0 focus:bg-white/15',
  stepper: 'bg-white/5 border border-white/10 focus-within:border-blue-500'
};

const sizeConfig = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg'
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  variant = 'default',
  size = 'md',
  min,
  max,
  step = 1,
  value,
  onChange,
  showControls = false,
  controlsPosition = 'right',
  prefix,
  suffix,
  error = false,
  helperText,
  precision,
  className,
  ...props
}, ref) => {
  const handleIncrement = () => {
    const currentValue = value || 0;
    const newValue = currentValue + step;
    
    if (max !== undefined && newValue > max) return;
    
    const finalValue = precision !== undefined 
      ? parseFloat(newValue.toFixed(precision))
      : newValue;
    
    onChange?.(finalValue);
  };

  const handleDecrement = () => {
    const currentValue = value || 0;
    const newValue = currentValue - step;
    
    if (min !== undefined && newValue < min) return;
    
    const finalValue = precision !== undefined 
      ? parseFloat(newValue.toFixed(precision))
      : newValue;
    
    onChange?.(finalValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string for clearing
    if (inputValue === '') {
      onChange?.(0);
      return;
    }

    const numValue = parseFloat(inputValue);
    
    if (isNaN(numValue)) return;
    
    // Apply min/max constraints
    let constrainedValue = numValue;
    if (min !== undefined && numValue < min) constrainedValue = min;
    if (max !== undefined && numValue > max) constrainedValue = max;
    
    const finalValue = precision !== undefined 
      ? parseFloat(constrainedValue.toFixed(precision))
      : constrainedValue;
    
    onChange?.(finalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  if (variant === 'stepper' || showControls) {
    return (
      <div className={className}>
        <div className={cn(
          "flex items-center rounded-lg transition-all overflow-hidden",
          variantConfig[variant],
          error && "border-red-500"
        )}>
          {controlsPosition === 'sides' && (
            <button
              type="button"
              onClick={handleDecrement}
              disabled={min !== undefined && (value || 0) <= min}
              className={cn(
                "px-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                sizeConfig[size]
              )}
            >
              <Minus className="h-4 w-4" />
            </button>
          )}

          <div className="relative flex-1 flex items-center">
            {prefix && (
              <span className="absolute left-3 text-white/60">{prefix}</span>
            )}
            
            <input
              ref={ref}
              type="number"
              value={value ?? ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              min={min}
              max={max}
              step={step}
              className={cn(
                "w-full bg-transparent text-white text-center placeholder:text-white/40 transition-all border-0",
                "focus:outline-none",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                sizeConfig[size],
                prefix && "pl-8",
                suffix && "pr-8"
              )}
              {...props}
            />
            
            {suffix && (
              <span className="absolute right-3 text-white/60">{suffix}</span>
            )}
          </div>

          {controlsPosition === 'sides' ? (
            <button
              type="button"
              onClick={handleIncrement}
              disabled={max !== undefined && (value || 0) >= max}
              className={cn(
                "px-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                sizeConfig[size]
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex flex-col border-l border-white/10">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={max !== undefined && (value || 0) >= max}
                className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-b border-white/10"
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={min !== undefined && (value || 0) <= min}
                className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {helperText && (
          <p className={cn(
            "mt-1 text-sm",
            error ? "text-red-400" : "text-white/60"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // Standard variant without controls
  return (
    <div className={className}>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">{prefix}</span>
        )}
        
        <input
          ref={ref}
          type="number"
          value={value ?? ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-full rounded-lg text-white placeholder:text-white/40 transition-all",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            variantConfig[variant],
            sizeConfig[size],
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            prefix && "pl-8",
            suffix && "pr-8"
          )}
          {...props}
        />
        
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">{suffix}</span>
        )}
      </div>

      {helperText && (
        <p className={cn(
          "mt-1 text-sm",
          error ? "text-red-400" : "text-white/60"
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';

// Currency Input Variant
export interface CurrencyInputProps extends Omit<NumberInputProps, 'prefix' | 'precision'> {
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({
  currency = '$',
  ...props
}, ref) => {
  return (
    <NumberInput
      ref={ref}
      prefix={currency}
      precision={2}
      step={0.01}
      {...props}
    />
  );
});

CurrencyInput.displayName = 'CurrencyInput';

// Percentage Input Variant
export const PercentageInput = forwardRef<HTMLInputElement, Omit<NumberInputProps, 'suffix' | 'min' | 'max'>>((props, ref) => {
  return (
    <NumberInput
      ref={ref}
      suffix="%"
      min={0}
      max={100}
      {...props}
    />
  );
});

PercentageInput.displayName = 'PercentageInput';
