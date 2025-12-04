"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  showHome?: boolean;
  homeIcon?: React.ReactNode;
  className?: string;
}

const sizeConfig = {
  sm: {
    text: 'text-xs',
    separator: 14,
    icon: 14
  },
  md: {
    text: 'text-sm',
    separator: 16,
    icon: 16
  },
  lg: {
    text: 'text-base',
    separator: 18,
    icon: 18
  }
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  size = 'md',
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  showHome = false,
  homeIcon,
  className
}) => {
  // Add home item if requested
  const allItems = showHome
    ? [{ label: 'Home', href: '/', icon: homeIcon }, ...items]
    : items;

  // Handle collapsed breadcrumbs
  let displayItems = allItems;
  let hasCollapsed = false;

  if (maxItems && allItems.length > maxItems) {
    hasCollapsed = true;
    const beforeItems = allItems.slice(0, itemsBeforeCollapse);
    const afterItems = allItems.slice(-itemsAfterCollapse);
    displayItems = [...beforeItems, { label: '...', href: undefined }, ...afterItems];
  }

  const separatorElement = separator || <ChevronRight size={sizeConfig[size].separator} />;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isCollapsed = item.label === '...';

          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2",
                sizeConfig[size].text
              )}
            >
              {/* Breadcrumb Item */}
              {isCollapsed ? (
                <span className="text-white/40 cursor-default">...</span>
              ) : item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors",
                    "focus:outline-none focus:text-white focus:underline"
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className="truncate max-w-[200px]">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    isLast ? "text-white font-medium" : "text-white/60"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className="truncate max-w-[200px]">{item.label}</span>
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="text-white/30 flex-shrink-0" aria-hidden="true">
                  {separatorElement}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Simple Breadcrumbs variant (string paths)
export interface SimpleBreadcrumbsProps {
  paths: string[];
  baseHref?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SimpleBreadcrumbs: React.FC<SimpleBreadcrumbsProps> = ({
  paths,
  baseHref = '',
  size = 'md',
  className
}) => {
  const items: BreadcrumbItem[] = paths.map((path, index) => ({
    label: path,
    href: index < paths.length - 1 ? `${baseHref}/${paths.slice(0, index + 1).join('/')}` : undefined
  }));

  return <Breadcrumbs items={items} size={size} className={className} />;
};
