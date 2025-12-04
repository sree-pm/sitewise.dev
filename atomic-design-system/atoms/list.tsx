"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ListItem {
  id: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

export interface ListProps {
  items: ListItem[];
  variant?: 'default' | 'bordered' | 'separated';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: (item: ListItem, index: number) => void;
  emptyMessage?: string;
  className?: string;
}

const sizeConfig = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg'
};

export const List: React.FC<ListProps> = ({
  items,
  variant = 'default',
  size = 'md',
  hoverable = true,
  clickable = false,
  onClick,
  emptyMessage = 'No items',
  className
}) => {
  return (
    <ul
      className={cn(
        'w-full',
        variant === 'bordered' && 'border border-white/10 rounded-lg overflow-hidden',
        className
      )}
    >
      {items.length === 0 ? (
        <li
          className={cn(
            'text-center text-white/40',
            sizeConfig[size],
            variant === 'bordered' && 'border-b border-white/10'
          )}
        >
          {emptyMessage}
        </li>
      ) : (
        items.map((item, index) => (
          <li
            key={item.id}
            onClick={() => !item.disabled && onClick?.(item, index)}
            className={cn(
              'flex items-center gap-3 text-white/80 transition-colors',
              sizeConfig[size],
              variant === 'default' && 'border-b border-white/10 last:border-b-0',
              variant === 'bordered' && 'border-b border-white/10 last:border-b-0',
              variant === 'separated' && 'mb-2 last:mb-0 border border-white/10 rounded-lg',
              hoverable && !item.disabled && 'hover:bg-white/5',
              (clickable || onClick) && !item.disabled && 'cursor-pointer',
              item.active && 'bg-blue-600/20 text-blue-400 border-blue-600/30',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span className="flex-1 min-w-0">{item.content}</span>
          </li>
        ))
      )}
    </ul>
  );
};

// Ordered List component
export interface OrderedListProps {
  items: React.ReactNode[];
  variant?: 'decimal' | 'alpha' | 'roman';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OrderedList: React.FC<OrderedListProps> = ({
  items,
  variant = 'decimal',
  size = 'md',
  className
}) => {
  const listStyleMap = {
    decimal: 'list-decimal',
    alpha: 'list-[lower-alpha]',
    roman: 'list-[lower-roman]'
  };

  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <ol
      className={cn(
        'list-inside space-y-2 text-white/80',
        listStyleMap[variant],
        sizeMap[size],
        className
      )}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

// Unordered List component
export interface UnorderedListProps {
  items: React.ReactNode[];
  variant?: 'disc' | 'circle' | 'check';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UnorderedList: React.FC<UnorderedListProps> = ({
  items,
  variant = 'disc',
  size = 'md',
  className
}) => {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'check') {
    return (
      <ul className={cn('space-y-2 text-white/80', sizeMap[size], className)}>
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check size={20} className="flex-shrink-0 text-green-500 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  const listStyleMap = {
    disc: 'list-disc',
    circle: 'list-[circle]'
  };

  return (
    <ul
      className={cn(
        'list-inside space-y-2 text-white/80',
        listStyleMap[variant],
        sizeMap[size],
        className
      )}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// Description List component
export interface DescriptionItem {
  term: string;
  description: React.ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  variant?: 'stacked' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  variant = 'stacked',
  size = 'md',
  className
}) => {
  const sizeMap = {
    sm: { term: 'text-sm', desc: 'text-xs' },
    md: { term: 'text-base', desc: 'text-sm' },
    lg: { term: 'text-lg', desc: 'text-base' }
  };

  if (variant === 'inline') {
    return (
      <dl className={cn('grid grid-cols-[auto_1fr] gap-x-4 gap-y-2', className)}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <dt className={cn('font-medium text-white', sizeMap[size].term)}>
              {item.term}
            </dt>
            <dd className={cn('text-white/70', sizeMap[size].desc)}>
              {item.description}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }

  return (
    <dl className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <dt className={cn('font-medium text-white mb-1', sizeMap[size].term)}>
            {item.term}
          </dt>
          <dd className={cn('text-white/70', sizeMap[size].desc)}>
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
};
