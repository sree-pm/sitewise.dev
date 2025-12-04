"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  arrow?: boolean;
  className?: string;
}

const positionStyles = {
  top: {
    tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-white/90 border-x-transparent border-b-transparent'
  },
  bottom: {
    tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-white/90 border-x-transparent border-t-transparent'
  },
  left: {
    tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-white/90 border-y-transparent border-r-transparent'
  },
  right: {
    tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-white/90 border-y-transparent border-l-transparent'
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  arrow = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top,
          left: rect.left
        });
      }
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible && typeof window !== 'undefined' ? (
    <div
      className={cn(
        "fixed z-[100] px-3 py-2 text-sm text-black bg-white/90 backdrop-blur-sm rounded-md shadow-lg whitespace-nowrap pointer-events-none",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left
      }}
      role="tooltip"
    >
      <div className={cn("relative", positionStyles[position].tooltip)}>
        {content}
        {arrow && (
          <div
            className={cn(
              "absolute w-0 h-0 border-4",
              positionStyles[position].arrow
            )}
          />
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

// Simple Tooltip (CSS-only, no portal)
export interface SimpleTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  content,
  children,
  position = 'top',
  className
}) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      {children}
      <div
        className={cn(
          "absolute z-50 px-3 py-2 text-sm text-black bg-white/90 backdrop-blur-sm rounded-md shadow-lg whitespace-nowrap",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
          positionStyles[position].tooltip
        )}
        role="tooltip"
      >
        {content}
        <div
          className={cn(
            "absolute w-0 h-0 border-4",
            positionStyles[position].arrow
          )}
        />
      </div>
    </div>
  );
};
