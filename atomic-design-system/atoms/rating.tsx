"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly?: boolean;
  allowHalf?: boolean;
  showValue?: boolean;
  color?: 'yellow' | 'red' | 'blue' | 'green';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const sizeConfig = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10'
};

const colorConfig = {
  yellow: 'text-yellow-400',
  red: 'text-red-400',
  blue: 'text-blue-400',
  green: 'text-green-400'
};

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  onChange,
  size = 'md',
  readonly = false,
  allowHalf = false,
  showValue = false,
  color = 'yellow',
  icon: Icon = Star,
  className
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number, isHalf: boolean) => {
    if (readonly) return;
    const newValue = isHalf ? index + 0.5 : index + 1;
    onChange?.(newValue);
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (readonly || !allowHalf) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHoverValue(isHalf ? index + 0.5 : index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  const getStarFill = (index: number) => {
    const currentValue = displayValue;
    
    if (currentValue >= index + 1) {
      return 'full';
    } else if (currentValue > index && currentValue < index + 1) {
      return 'half';
    }
    return 'empty';
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="inline-flex gap-1">
        {Array.from({ length: max }).map((_, index) => {
          const fill = getStarFill(index);

          return (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                if (allowHalf) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const isHalf = e.clientX - rect.left < rect.width / 2;
                  handleClick(index, isHalf);
                } else {
                  handleClick(index, false);
                }
              }}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={cn(
                "relative transition-transform",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              {/* Empty star */}
              <Icon
                className={cn(
                  sizeConfig[size],
                  "text-white/20"
                )}
              />

              {/* Filled star */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: fill === 'full' ? '100%' : fill === 'half' ? '50%' : '0%'
                }}
              >
                <Icon
                  className={cn(
                    sizeConfig[size],
                    colorConfig[color],
                    "fill-current"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-white/80 min-w-[3ch]">
          {displayValue.toFixed(allowHalf ? 1 : 0)} / {max}
        </span>
      )}
    </div>
  );
};

// Star Rating with Labels
export interface LabeledRatingProps extends RatingProps {
  labels?: string[];
}

export const LabeledRating: React.FC<LabeledRatingProps> = ({
  labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  value,
  ...props
}) => {
  const currentLabel = value ? labels[Math.ceil(value) - 1] : null;

  return (
    <div className="space-y-2">
      <Rating value={value} {...props} />
      {currentLabel && (
        <p className="text-sm text-white/60">{currentLabel}</p>
      )}
    </div>
  );
};

// Emoji Rating
export interface EmojiRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  emojis?: string[];
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  className?: string;
}

const emojiSizeConfig = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl'
};

export const EmojiRating: React.FC<EmojiRatingProps> = ({
  value,
  onChange,
  emojis = ['😞', '😕', '😐', '🙂', '😄'],
  size = 'md',
  readonly = false,
  className
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className={cn("inline-flex gap-2", className)}>
      {emojis.map((emoji, index) => {
        const isSelected = value === index + 1;
        const isHovered = hoverIndex === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => !readonly && onChange?.(index + 1)}
            onMouseEnter={() => !readonly && setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            disabled={readonly}
            className={cn(
              emojiSizeConfig[size],
              "transition-all",
              !readonly && "hover:scale-125 cursor-pointer",
              readonly && "cursor-default",
              !isSelected && !isHovered && "opacity-40 grayscale"
            )}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
};
