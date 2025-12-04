"use client";

import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  variant?: 'default' | 'bordered' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  debounceMs?: number;
  showClearButton?: boolean;
}

const variantConfig = {
  default: 'bg-white/5 border border-white/10 focus:border-blue-500',
  bordered: 'bg-transparent border-2 border-white/20 focus:border-blue-500',
  filled: 'bg-white/10 border-0 focus:bg-white/15'
};

const sizeConfig = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg'
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  variant = 'default',
  size = 'md',
  onSearch,
  onChange,
  onClear,
  loading = false,
  debounceMs = 300,
  showClearButton = true,
  className,
  value: controlledValue,
  ...props
}, ref) => {
  const [value, setValue] = useState(controlledValue || '');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);

    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout for search
    if (onSearch) {
      const timeout = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
      setDebounceTimeout(timeout);
    }
  };

  const handleClear = () => {
    setValue('');
    onChange?.('');
    onClear?.();
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      onSearch?.(value as string);
    }
    
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const displayValue = controlledValue !== undefined ? controlledValue : value;
  const hasValue = displayValue && (displayValue as string).length > 0;

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none",
        size === 'sm' && "h-4 w-4",
        size === 'md' && "h-5 w-5",
        size === 'lg' && "h-6 w-6"
      )} />

      <input
        ref={ref}
        type="search"
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full rounded-lg text-white placeholder:text-white/40 transition-all",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          variantConfig[variant],
          sizeConfig[size],
          size === 'sm' && "pl-9 pr-9",
          size === 'md' && "pl-11 pr-11",
          size === 'lg' && "pl-14 pr-14"
        )}
        {...props}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {loading && (
          <Loader2 className={cn(
            "text-white/60 animate-spin",
            size === 'sm' && "h-4 w-4",
            size === 'md' && "h-5 w-5",
            size === 'lg' && "h-6 w-6"
          )} />
        )}

        {!loading && showClearButton && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className={cn(
              size === 'sm' && "h-4 w-4",
              size === 'md' && "h-5 w-5",
              size === 'lg' && "h-6 w-6"
            )} />
          </button>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

// Search with Suggestions
export interface SearchWithSuggestionsProps extends SearchInputProps {
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const SearchWithSuggestions = forwardRef<HTMLInputElement, SearchWithSuggestionsProps>(({
  suggestions = [],
  onSuggestionClick,
  ...props
}, ref) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      onSuggestionClick?.(suggestions[highlightedIndex]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <SearchInput
        ref={ref}
        {...props}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-gray-900 border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors",
                index === highlightedIndex && "bg-white/10"
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

SearchWithSuggestions.displayName = 'SearchWithSuggestions';
