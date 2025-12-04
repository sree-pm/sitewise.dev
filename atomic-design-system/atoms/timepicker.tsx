"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

export interface TimePickerProps {
  value?: string; // Format: "HH:MM" or "HH:MM:SS"
  onChange?: (time: string) => void;
  format?: '12' | '24';
  showSeconds?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  format = '12',
  showSeconds = false,
  placeholder = 'Select time',
  disabled = false,
  error = false,
  helperText,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      let h = parseInt(parts[0]);
      const m = parts[1];
      const s = parts[2] || '00';

      if (format === '12') {
        const p = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        setHours(h.toString().padStart(2, '0'));
        setPeriod(p);
      } else {
        setHours(h.toString().padStart(2, '0'));
      }
      
      setMinutes(m);
      setSeconds(s);
    }
  }, [value, format]);

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

  const handleApply = () => {
    let h = parseInt(hours);
    
    if (format === '12') {
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
    }

    const timeString = showSeconds
      ? `${h.toString().padStart(2, '0')}:${minutes}:${seconds}`
      : `${h.toString().padStart(2, '0')}:${minutes}`;

    onChange?.(timeString);
    setIsOpen(false);
  };

  const formatDisplayTime = () => {
    if (!value) return placeholder;
    
    const parts = value.split(':');
    let h = parseInt(parts[0]);
    const m = parts[1];
    const s = parts[2];

    if (format === '12') {
      const p = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return showSeconds 
        ? `${h}:${m}:${s} ${p}`
        : `${h}:${m} ${p}`;
    }

    return showSeconds ? `${parts[0]}:${m}:${s}` : `${parts[0]}:${m}`;
  };

  const hourOptions = format === '12'
    ? Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const secondOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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
          {formatDisplayTime()}
        </span>
        <Clock className="h-5 w-5 text-white/60" />
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
          <div className="flex gap-2 mb-4">
            {/* Hours */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-white/60 mb-2">Hours</label>
              <div className="h-32 overflow-y-auto border border-white/10 rounded-lg">
                {hourOptions.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setHours(hour)}
                    className={cn(
                      "w-full px-3 py-2 text-sm text-left transition-colors",
                      hours === hour
                        ? "bg-blue-600 text-white"
                        : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-white/60 mb-2">Minutes</label>
              <div className="h-32 overflow-y-auto border border-white/10 rounded-lg">
                {minuteOptions.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => setMinutes(minute)}
                    className={cn(
                      "w-full px-3 py-2 text-sm text-left transition-colors",
                      minutes === minute
                        ? "bg-blue-600 text-white"
                        : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>

            {/* Seconds */}
            {showSeconds && (
              <div className="flex-1">
                <label className="block text-xs font-medium text-white/60 mb-2">Seconds</label>
                <div className="h-32 overflow-y-auto border border-white/10 rounded-lg">
                  {secondOptions.map((second) => (
                    <button
                      key={second}
                      type="button"
                      onClick={() => setSeconds(second)}
                      className={cn(
                        "w-full px-3 py-2 text-sm text-left transition-colors",
                        seconds === second
                          ? "bg-blue-600 text-white"
                          : "text-white/80 hover:bg-white/10"
                      )}
                    >
                      {second}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AM/PM */}
            {format === '12' && (
              <div className="w-16">
                <label className="block text-xs font-medium text-white/60 mb-2">Period</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPeriod('AM')}
                    className={cn(
                      "w-full px-3 py-2 text-sm rounded transition-colors",
                      period === 'AM'
                        ? "bg-blue-600 text-white"
                        : "text-white/80 hover:bg-white/10 border border-white/10"
                    )}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod('PM')}
                    className={cn(
                      "w-full px-3 py-2 text-sm rounded transition-colors",
                      period === 'PM'
                        ? "bg-blue-600 text-white"
                        : "text-white/80 hover:bg-white/10 border border-white/10"
                    )}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
