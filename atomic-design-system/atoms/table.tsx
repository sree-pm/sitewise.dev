"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TableColumn<T extends Record<string, any> = any> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableProps<T extends Record<string, any> = any> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

const sizeConfig = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg'
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  variant = 'default',
  size = 'md',
  hoverable = true,
  sortable: tableSortable = true,
  onRowClick,
  emptyMessage = 'No data available',
  className
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (!tableSortable) return;

    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn("overflow-x-auto rounded-lg", className)}>
      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="bg-gray-800">
          <tr>
            {columns.map((column) => {
              const isSortable = column.sortable !== false && tableSortable;
              const isSorted = sortKey === column.key;

              return (
                <th
                  key={column.key}
                  onClick={() => isSortable && handleSort(column.key)}
                  className={cn(
                    'font-semibold text-white/90 border-b border-white/10',
                    sizeConfig[size],
                    alignStyles[column.align || 'left'],
                    isSortable && 'cursor-pointer select-none hover:bg-gray-700/50',
                    variant === 'bordered' && 'border-r border-white/10 last:border-r-0'
                  )}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2 justify-between">
                    <span>{column.header}</span>
                    {isSortable && (
                      <span className="flex-shrink-0">
                        {!isSorted && <ChevronsUpDown size={14} className="opacity-40" />}
                        {isSorted && sortDirection === 'asc' && <ChevronUp size={14} />}
                        {isSorted && sortDirection === 'desc' && <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(
                  'text-center text-white/40 border-b border-white/10',
                  sizeConfig[size]
                )}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={cn(
                  'border-b border-white/10 last:border-b-0',
                  variant === 'striped' && rowIndex % 2 === 1 && 'bg-white/5',
                  hoverable && 'hover:bg-white/10 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((column) => {
                  const value = row[column.key];
                  const content = column.render ? column.render(value, row, rowIndex) : value;

                  return (
                    <td
                      key={column.key}
                      className={cn(
                        'text-white/80',
                        sizeConfig[size],
                        alignStyles[column.align || 'left'],
                        variant === 'bordered' && 'border-r border-white/10 last:border-r-0'
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Simple Table (no sorting)
export interface SimpleTableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  className?: string;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ headers, rows, className }) => {
  const columns: TableColumn[] = headers.map((header, index) => ({
    key: `col-${index}`,
    header,
    sortable: false
  }));

  const data = rows.map((row, rowIndex) => {
    const rowData: Record<string, any> = {};
    row.forEach((cell, cellIndex) => {
      rowData[`col-${cellIndex}`] = cell;
    });
    return rowData;
  });

  return <Table columns={columns} data={data} sortable={false} className={className} />;
};
