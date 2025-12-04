"use client";

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'filled';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    description, 
    error, 
    options, 
    placeholder = 'Select an option',
    size = 'md',
    variant = 'default',
    className,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-13 text-lg'
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
        
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full rounded-lg px-4 text-white appearance-none pr-10 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[size],
              variantClasses[variant],
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Custom Select with better UX (dropdown list)
export interface CustomSelectProps {
  label?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  description,
  error,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  size = 'md',
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find(opt => opt.value === value);
  
  const filteredOptions = searchable
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base',
    lg: 'h-13 text-lg'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      {description && (
        <p className="text-sm text-neutral-400">{description}</p>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full rounded-lg px-4 text-white flex items-center justify-between",
            "bg-neutral-900 border border-neutral-700",
            "hover:border-neutral-600 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            sizeClasses[size],
            error && "border-red-500"
          )}
        >
          <span className={cn(
            "flex items-center gap-2",
            !selectedOption && "text-neutral-400"
          )}>
            {selectedOption?.icon}
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={cn(
            "h-5 w-5 text-neutral-400 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-2 py-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl max-h-60 overflow-auto">
              {searchable && (
                <div className="px-2 pb-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
              
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  disabled={option.disabled}
                  className={cn(
                    "w-full px-4 py-2 text-left flex items-center justify-between gap-2",
                    "hover:bg-neutral-800 transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    value === option.value && "bg-blue-600/10 text-blue-400"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    <span>
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-neutral-400">{option.description}</div>
                      )}
                    </span>
                  </span>
                  {value === option.value && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}

              {filteredOptions.length === 0 && (
                <div className="px-4 py-6 text-center text-neutral-400 text-sm">
                  No options found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
