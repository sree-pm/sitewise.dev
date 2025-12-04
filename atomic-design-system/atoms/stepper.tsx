"use client";

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'rounded' | 'outlined';
  disabled?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'h-8',
    button: 'w-8 h-8',
    input: 'w-12 text-sm',
    icon: 14
  },
  md: {
    container: 'h-10',
    button: 'w-10 h-10',
    input: 'w-16 text-base',
    icon: 16
  },
  lg: {
    container: 'h-12',
    button: 'w-12 h-12',
    input: 'w-20 text-lg',
    icon: 18
  }
};

const variantConfig = {
  default: {
    button: 'bg-gray-800 hover:bg-gray-700 text-white',
    input: 'bg-gray-900 text-white'
  },
  rounded: {
    button: 'bg-blue-600 hover:bg-blue-700 text-white rounded-full',
    input: 'bg-gray-900 text-white'
  },
  outlined: {
    button: 'border-2 border-white/20 hover:bg-white/5 text-white',
    input: 'border-2 border-white/20 bg-transparent text-white'
  }
};

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  variant = 'default',
  disabled = false,
  label,
  helperText,
  className
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    } else {
      setInputValue(value.toString());
    }
  };

  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-2">
          {label}
        </label>
      )}
      
      <div className={cn('inline-flex items-center', sizeConfig[size].container)}>
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className={cn(
            'flex items-center justify-center transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeConfig[size].button,
            variantConfig[variant].button,
            variant === 'rounded' ? 'rounded-full' : 'rounded-l-lg'
          )}
          aria-label="Decrease value"
        >
          <Minus size={sizeConfig[size].icon} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          className={cn(
            'text-center font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeConfig[size].input,
            variantConfig[variant].input,
            variant !== 'outlined' && 'border-x border-white/10'
          )}
        />

        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className={cn(
            'flex items-center justify-center transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeConfig[size].button,
            variantConfig[variant].button,
            variant === 'rounded' ? 'rounded-full' : 'rounded-r-lg'
          )}
          aria-label="Increase value"
        >
          <Plus size={sizeConfig[size].icon} />
        </button>
      </div>

      {helperText && (
        <p className="mt-1 text-xs text-white/60">{helperText}</p>
      )}
    </div>
  );
};

// Vertical Stepper (for multi-step forms)
export interface VerticalStepperStep {
  label: string;
  description?: string;
  content?: React.ReactNode;
  optional?: boolean;
  error?: boolean;
}

export interface VerticalStepperProps {
  steps: VerticalStepperStep[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  className
}) => {
  return (
    <div className={className}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const isClickable = onStepClick && (isCompleted || index === activeStep);

        return (
          <div key={index} className="relative">
            {/* Step */}
            <div className="flex items-start gap-4">
              {/* Icon/Number */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    isCompleted && 'bg-green-600 text-white',
                    isActive && 'bg-blue-600 text-white',
                    !isActive && !isCompleted && 'bg-gray-800 text-white/60',
                    step.error && 'bg-red-600 text-white',
                    isClickable && 'cursor-pointer hover:opacity-80',
                    !isClickable && 'cursor-default'
                  )}
                >
                  {isCompleted ? '✓' : index + 1}
                </button>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 h-16 my-2',
                      isCompleted ? 'bg-green-600' : 'bg-gray-800'
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <h3 className={cn(
                  'font-medium mb-1',
                  isActive ? 'text-white' : 'text-white/60'
                )}>
                  {step.label}
                  {step.optional && (
                    <span className="ml-2 text-xs text-white/40">(Optional)</span>
                  )}
                </h3>
                {step.description && (
                  <p className="text-sm text-white/60 mb-3">{step.description}</p>
                )}
                {isActive && step.content && (
                  <div className="mt-4">{step.content}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
