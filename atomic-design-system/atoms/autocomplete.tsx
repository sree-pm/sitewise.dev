"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string, option: AutocompleteOption | null) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  freeSolo?: boolean;
  clearable?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg'
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value = '',
  onChange,
  placeholder = 'Search...',
  size = 'md',
  disabled = false,
  error = false,
  loading = false,
  freeSolo = false,
  clearable = true,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    option.description?.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Group options
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, AutocompleteOption[]>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(0);

    if (freeSolo) {
      onChange?.(newValue, null);
    }
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    setInputValue(option.label);
    onChange?.(option.value, option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('', null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={cn(
            'w-full rounded-lg border transition-colors pl-10',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeConfig[size],
            error
              ? 'border-red-500 bg-red-500/10 text-white'
              : 'border-white/10 bg-gray-900 text-white',
            clearable && inputValue && 'pr-10'
          )}
        />
        {clearable && inputValue && !disabled && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (filteredOptions.length > 0 || loading) && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-auto"
        >
          {loading ? (
            <li className="px-4 py-3 text-white/60 text-center">Loading...</li>
          ) : (
            Object.entries(groupedOptions).map(([group, groupOptions]) => (
              <React.Fragment key={group}>
                {group !== 'default' && (
                  <li className="px-4 py-2 text-xs font-semibold text-white/40 uppercase bg-gray-900">
                    {group}
                  </li>
                )}
                {groupOptions.map((option, index) => {
                  const globalIndex = filteredOptions.indexOf(option);
                  const isHighlighted = globalIndex === highlightedIndex;

                  return (
                    <li
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      className={cn(
                        'px-4 py-2 cursor-pointer transition-colors',
                        isHighlighted && 'bg-blue-600/20 text-blue-400',
                        !isHighlighted && 'text-white/80 hover:bg-white/5'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-white/60 truncate">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-2xl px-4 py-8 text-center text-white/40">
          No options found
        </div>
      )}
    </div>
  );
};
