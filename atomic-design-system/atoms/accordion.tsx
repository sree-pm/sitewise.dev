"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  variant?: 'default' | 'separated' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  collapsible?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    trigger: 'px-4 py-2 text-sm',
    content: 'px-4 py-2 text-sm'
  },
  md: {
    trigger: 'px-5 py-3 text-base',
    content: 'px-5 py-3 text-base'
  },
  lg: {
    trigger: 'px-6 py-4 text-lg',
    content: 'px-6 py-4 text-lg'
  }
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultOpen,
  value: controlledValue,
  onChange,
  variant = 'default',
  size = 'md',
  collapsible = true,
  className
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultOpen !== undefined) return defaultOpen;
    return type === 'multiple' ? [] : '';
  });

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const isOpen = (itemId: string): boolean => {
    if (type === 'multiple') {
      return Array.isArray(value) && value.includes(itemId);
    }
    return value === itemId;
  };

  const handleToggle = (itemId: string) => {
    let newValue: string | string[];

    if (type === 'multiple') {
      const currentValue = Array.isArray(value) ? value : [];
      newValue = currentValue.includes(itemId)
        ? currentValue.filter(id => id !== itemId)
        : [...currentValue, itemId];
    } else {
      // For single type, allow closing if collapsible is true
      newValue = (value === itemId && collapsible) ? '' : itemId;
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      className={cn(
        "w-full",
        variant === 'bordered' && "border border-white/10 rounded-lg overflow-hidden",
        variant === 'separated' && "space-y-2",
        className
      )}
    >
      {items.map((item, index) => {
        const open = isOpen(item.id);

        return (
          <div
            key={item.id}
            className={cn(
              variant === 'default' && index !== 0 && "border-t border-white/10",
              variant === 'separated' && "border border-white/10 rounded-lg overflow-hidden",
              variant === 'bordered' && index !== 0 && "border-t border-white/10"
            )}
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => !item.disabled && handleToggle(item.id)}
              disabled={item.disabled}
              aria-expanded={open}
              aria-controls={`content-${item.id}`}
              className={cn(
                "w-full flex items-center justify-between gap-3 text-left font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                sizeConfig[size].trigger,
                open ? "text-white bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              <span className="flex items-center gap-3 flex-1 min-w-0">
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="truncate">{item.title}</span>
              </span>
              <ChevronDown
                className={cn(
                  "flex-shrink-0 transition-transform duration-200",
                  open && "rotate-180"
                )}
                size={20}
              />
            </button>

            {/* Accordion Content */}
            <div
              id={`content-${item.id}`}
              role="region"
              aria-labelledby={item.id}
              className={cn(
                "overflow-hidden transition-all duration-200",
                open ? "animate-in slide-in-from-top-2" : "hidden"
              )}
            >
              <div
                className={cn(
                  "text-white/70 border-t border-white/5",
                  sizeConfig[size].content
                )}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// FAQ Accordion variant (with better semantic HTML)
export interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

export interface FAQAccordionProps extends Omit<AccordionProps, 'items'> {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, ...props }) => {
  const accordionItems: AccordionItem[] = items.map(item => ({
    id: item.id,
    title: item.question,
    content: item.answer
  }));

  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      <Accordion {...props} items={accordionItems} />
    </div>
  );
};
