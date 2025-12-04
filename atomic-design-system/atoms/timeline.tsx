"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  title: string;
  description?: React.ReactNode;
  timestamp?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'active' | 'pending';
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  alternating?: boolean;
  className?: string;
}

const statusColors = {
  completed: 'bg-green-600 border-green-600',
  active: 'bg-blue-600 border-blue-600',
  pending: 'bg-gray-600 border-gray-600'
};

const variantColors = {
  success: 'bg-green-600 border-green-600',
  error: 'bg-red-600 border-red-600',
  warning: 'bg-yellow-600 border-yellow-600',
  info: 'bg-blue-600 border-blue-600'
};

const sizeConfig = {
  sm: {
    dot: 'w-2 h-2',
    icon: 'w-6 h-6 text-xs',
    line: 'w-0.5',
    title: 'text-sm',
    description: 'text-xs'
  },
  md: {
    dot: 'w-3 h-3',
    icon: 'w-8 h-8 text-sm',
    line: 'w-0.5',
    title: 'text-base',
    description: 'text-sm'
  },
  lg: {
    dot: 'w-4 h-4',
    icon: 'w-10 h-10 text-base',
    line: 'w-1',
    title: 'text-lg',
    description: 'text-base'
  }
};

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  variant = 'default',
  size = 'md',
  alternating = false,
  className
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={cn("overflow-x-auto pb-4", className)}>
        <div className="flex items-start gap-0 min-w-max">
          {items.map((item, index) => {
            const color = item.variant
              ? variantColors[item.variant]
              : item.status
              ? statusColors[item.status]
              : statusColors.active;

            return (
              <div key={item.id} className="flex items-center">
                {/* Item */}
                <div className="flex flex-col items-center gap-2 min-w-[200px]">
                  {/* Icon/Dot */}
                  <div className="relative">
                    {item.icon ? (
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full text-white",
                          sizeConfig[size].icon,
                          color
                        )}
                      >
                        {item.icon}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "rounded-full",
                          sizeConfig[size].dot,
                          color
                        )}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center px-4">
                    {item.timestamp && (
                      <div className="text-xs text-white/60 mb-1">{item.timestamp}</div>
                    )}
                    {item.date && (
                      <div className="text-xs text-white/60 mb-1">{item.date}</div>
                    )}
                    <div className={cn("font-medium text-white mb-1", sizeConfig[size].title)}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={cn("text-white/70", sizeConfig[size].description)}>
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {index < items.length - 1 && (
                  <div className={cn("h-0.5 w-12 bg-white/20 flex-shrink-0")} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={className}>
      {items.map((item, index) => {
        const color = item.variant
          ? variantColors[item.variant]
          : item.status
          ? statusColors[item.status]
          : statusColors.active;

        const isLeft = alternating && index % 2 === 0;
        const isLast = index === items.length - 1;

        if (alternating) {
          return (
            <div key={item.id} className="relative flex items-center gap-8">
              {/* Left Content */}
              <div className={cn("flex-1", isLeft ? "text-right" : "opacity-0")}>
                {isLeft && (
                  <>
                    {item.timestamp && (
                      <div className="text-xs text-white/60 mb-1">{item.timestamp}</div>
                    )}
                    {item.date && (
                      <div className="text-xs text-white/60 mb-1">{item.date}</div>
                    )}
                    <div className={cn("font-medium text-white mb-1", sizeConfig[size].title)}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={cn("text-white/70", sizeConfig[size].description)}>
                        {item.description}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Center Line with Icon */}
              <div className="flex flex-col items-center relative">
                {/* Icon/Dot */}
                {item.icon ? (
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full text-white z-10",
                      sizeConfig[size].icon,
                      color,
                      variant === 'outlined' && "bg-gray-900 border-2"
                    )}
                  >
                    {item.icon}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "rounded-full z-10",
                      sizeConfig[size].dot,
                      color,
                      variant === 'outlined' && "bg-gray-900 border-2",
                      variant === 'minimal' && "border-2 bg-transparent"
                    )}
                  />
                )}

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute top-full bg-white/20",
                      sizeConfig[size].line,
                      "h-full min-h-[60px]"
                    )}
                  />
                )}
              </div>

              {/* Right Content */}
              <div className={cn("flex-1", !isLeft ? "text-left" : "opacity-0")}>
                {!isLeft && (
                  <>
                    {item.timestamp && (
                      <div className="text-xs text-white/60 mb-1">{item.timestamp}</div>
                    )}
                    {item.date && (
                      <div className="text-xs text-white/60 mb-1">{item.date}</div>
                    )}
                    <div className={cn("font-medium text-white mb-1", sizeConfig[size].title)}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={cn("text-white/70", sizeConfig[size].description)}>
                        {item.description}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        }

        // Standard vertical layout
        return (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Icon/Dot with line */}
            <div className="flex flex-col items-center relative">
              {item.icon ? (
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full text-white z-10",
                    sizeConfig[size].icon,
                    color,
                    variant === 'outlined' && "bg-gray-900 border-2"
                  )}
                >
                  {item.icon}
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-full z-10 flex-shrink-0",
                    sizeConfig[size].dot,
                    color,
                    variant === 'outlined' && "bg-gray-900 border-2",
                    variant === 'minimal' && "border-2 bg-transparent"
                  )}
                />
              )}

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-full bg-white/20",
                    sizeConfig[size].line,
                    "h-full"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              {item.timestamp && (
                <div className="text-xs text-white/60 mb-1">{item.timestamp}</div>
              )}
              {item.date && (
                <div className="text-xs text-white/60 mb-1">{item.date}</div>
              )}
              <div className={cn("font-medium text-white mb-1", sizeConfig[size].title)}>
                {item.title}
              </div>
              {item.description && (
                <div className={cn("text-white/70", sizeConfig[size].description)}>
                  {item.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Process Timeline (with completion status)
export interface ProcessTimelineProps extends Omit<TimelineProps, 'items'> {
  items: Array<{
    id: string;
    title: string;
    description?: React.ReactNode;
    completed?: boolean;
  }>;
  currentStep?: number;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  items,
  currentStep = 0,
  ...props
}) => {
  const timelineItems: TimelineItem[] = items.map((item, index) => ({
    ...item,
    status: item.completed || index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending',
    icon: item.completed || index < currentStep ? <Check size={16} /> : undefined
  }));

  return <Timeline {...props} items={timelineItems} />;
};
