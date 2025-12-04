"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  minDate,
  maxDate,
  disabled = false,
  error = false,
  helperText,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date | undefined, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg bg-white/5 border text-left transition-colors",
          "flex items-center justify-between",
          error ? "border-red-500" : "border-white/10",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-white/60" />
      </button>

      {helperText && (
        <p className={cn(
          "mt-1 text-sm",
          error ? "text-red-400" : "text-white/60"
        )}>
          {helperText}
        </p>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-gray-900 border border-white/10 rounded-lg shadow-2xl">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            
            <span className="text-sm font-semibold text-white">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center text-xs font-medium text-white/60 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const isDisabled = date ? isDateDisabled(date) : true;
              const isSelected = date ? isSameDay(value, date) : false;
              const isToday = date ? isSameDay(new Date(), date) : false;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => date && handleDateClick(date)}
                  disabled={isDisabled || !date}
                  className={cn(
                    "p-2 text-sm rounded transition-colors",
                    !date && "invisible",
                    isSelected && "bg-blue-600 text-white font-semibold",
                    !isSelected && isToday && "bg-white/10 text-white font-semibold",
                    !isSelected && !isToday && !isDisabled && "text-white hover:bg-white/10",
                    isDisabled && "text-white/20 cursor-not-allowed"
                  )}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Date Range Picker
export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (startDate: Date, endDate?: Date) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  placeholder = 'Select date range',
  className
}) => {
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(startDate);

  const handleDateClick = (date: Date) => {
    if (!tempStartDate || (tempStartDate && endDate)) {
      // Start new range
      setTempStartDate(date);
      onChange?.(date, undefined);
    } else {
      // Complete range
      if (date >= tempStartDate) {
        onChange?.(tempStartDate, date);
        setTempStartDate(undefined);
      } else {
        onChange?.(date, tempStartDate);
        setTempStartDate(undefined);
      }
    }
  };

  const displayValue = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else if (startDate) {
      return `${startDate.toLocaleDateString()} - ...`;
    }
    return placeholder;
  };

  return (
    <div className={className}>
      <div className="text-white/80 text-sm mb-2">{displayValue()}</div>
      <DatePicker
        value={tempStartDate || startDate}
        onChange={handleDateClick}
      />
    </div>
  );
};
