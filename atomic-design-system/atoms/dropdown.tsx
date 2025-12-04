"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  search?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    trigger: 'px-3 py-1.5 text-sm',
    item: 'px-3 py-1.5 text-sm'
  },
  md: {
    trigger: 'px-4 py-2 text-base',
    item: 'px-4 py-2 text-base'
  },
  lg: {
    trigger: 'px-5 py-2.5 text-lg',
    item: 'px-5 py-2.5 text-lg'
  }
};

const variantConfig = {
  default: 'bg-gray-800 border-white/10 hover:bg-gray-750',
  outline: 'bg-transparent border-white/20 hover:border-white/30',
  ghost: 'bg-transparent border-transparent hover:bg-white/5'
};

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select option',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
  error = false,
  search = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = items.find(item => item.value === value);

  const filteredItems = search
    ? items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && search && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, search]);

  const handleSelect = (itemValue: string) => {
    onChange?.(itemValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "relative",
        fullWidth && "w-full",
        className
      )}
    >
      {/* Trigger */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-between gap-2 border rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeConfig[size].trigger,
          variantConfig[variant],
          error && "border-red-500 focus:ring-red-500",
          fullWidth && "w-full"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "flex items-center gap-2 flex-1 min-w-0",
          !selectedItem && "text-white/40"
        )}>
          {selectedItem?.icon && <span className="flex-shrink-0">{selectedItem.icon}</span>}
          <span className="truncate">{selectedItem?.label || placeholder}</span>
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-2xl",
            "animate-in fade-in zoom-in-95 duration-150",
            fullWidth ? "w-full" : "min-w-[200px]"
          )}
          role="listbox"
        >
          {/* Search Input */}
          {search && (
            <div className="p-2 border-b border-white/10">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 bg-gray-900 border border-white/10 rounded-md text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Items */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-white/40">
                No results found
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <React.Fragment key={item.value}>
                  {item.divider && index > 0 && (
                    <div className="my-1 border-t border-white/10" />
                  )}
                  <button
                    onClick={() => !item.disabled && handleSelect(item.value)}
                    disabled={item.disabled}
                    role="option"
                    aria-selected={value === item.value}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "focus:outline-none focus:bg-white/10",
                      sizeConfig[size].item,
                      value === item.value
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                      <span className="truncate">{item.label}</span>
                    </span>
                    {value === item.value && (
                      <Check size={16} className="flex-shrink-0 text-blue-400" />
                    )}
                  </button>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-select Dropdown variant
export interface MultiDropdownProps extends Omit<DropdownProps, 'value' | 'onChange'> {
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelection?: number;
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  items,
  value = [],
  onChange,
  placeholder = 'Select options',
  maxSelection,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItems = items.filter(item => value.includes(item.value));
  const displayText = selectedItems.length > 0
    ? `${selectedItems.length} selected`
    : placeholder;

  const handleToggle = (itemValue: string) => {
    let newValue: string[];

    if (value.includes(itemValue)) {
      newValue = value.filter(v => v !== itemValue);
    } else {
      if (maxSelection && value.length >= maxSelection) {
        return; // Max selection reached
      }
      newValue = [...value, itemValue];
    }

    onChange?.(newValue);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative", props.fullWidth && "w-full")}>
      <button
        onClick={() => !props.disabled && setIsOpen(!isOpen)}
        disabled={props.disabled}
        className={cn(
          "inline-flex items-center justify-between gap-2 border rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          sizeConfig[props.size || 'md'].trigger,
          variantConfig[props.variant || 'default'],
          props.fullWidth && "w-full"
        )}
      >
        <span className={cn(!selectedItems.length && "text-white/40")}>
          {displayText}
        </span>
        <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-gray-800 border border-white/10 rounded-lg shadow-2xl py-1 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => !item.disabled && handleToggle(item.value)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center justify-between gap-3 transition-colors",
                sizeConfig[props.size || 'md'].item,
                value.includes(item.value)
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-white/80 hover:bg-white/5"
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {value.includes(item.value) && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
