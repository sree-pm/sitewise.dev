"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  siblingCount?: number;
  disabled?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'h-8 min-w-[2rem] text-xs px-2',
  md: 'h-10 min-w-[2.5rem] text-sm px-3',
  lg: 'h-12 min-w-[3rem] text-base px-4'
};

const variantConfig = {
  default: {
    button: 'bg-gray-800 hover:bg-gray-700 border border-white/10',
    active: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
  },
  outline: {
    button: 'bg-transparent hover:bg-white/5 border border-white/20',
    active: 'bg-transparent text-blue-400 border-blue-400 hover:bg-blue-600/10'
  },
  minimal: {
    button: 'bg-transparent hover:bg-white/5',
    active: 'bg-blue-600/20 text-blue-400'
  }
};

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] => {
  const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
    );
    return [1, '...', ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
  }

  return [];
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  disabled = false,
  className
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages, siblingCount);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || disabled) return;
    onPageChange(page);
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      {/* First Page */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || disabled}
          aria-label="Go to first page"
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeConfig[size],
            variantConfig[variant].button
          )}
        >
          <ChevronsLeft size={16} />
        </button>
      )}

      {/* Previous Page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          aria-label="Go to previous page"
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeConfig[size],
            variantConfig[variant].button
          )}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                "inline-flex items-center justify-center text-white/40",
                sizeConfig[size]
              )}
            >
              ⋯
            </span>
          );
        }

        const page = pageNumber as number;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeConfig[size],
              isActive
                ? variantConfig[variant].active
                : variantConfig[variant].button
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          aria-label="Go to next page"
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeConfig[size],
            variantConfig[variant].button
          )}
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Last Page */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || disabled}
          aria-label="Go to last page"
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeConfig[size],
            variantConfig[variant].button
          )}
        >
          <ChevronsRight size={16} />
        </button>
      )}
    </nav>
  );
};

// Simple Pagination (with page info)
export interface SimplePaginationProps extends PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  showInfo?: boolean;
}

export const SimplePagination: React.FC<SimplePaginationProps> = ({
  totalItems,
  itemsPerPage,
  showInfo = true,
  currentPage,
  totalPages,
  className,
  ...props
}) => {
  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {showInfo && totalItems && itemsPerPage && (
        <p className="text-sm text-white/60">
          Showing <span className="font-medium text-white">{startItem}</span> to{' '}
          <span className="font-medium text-white">{endItem}</span> of{' '}
          <span className="font-medium text-white">{totalItems}</span> results
        </p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        {...props}
      />
    </div>
  );
};
