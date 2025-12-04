"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TransferListItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferListProps {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
  onChange: (leftItems: TransferListItem[], rightItems: TransferListItem[]) => void;
  searchable?: boolean;
  height?: number;
  className?: string;
}

export const TransferList: React.FC<TransferListProps> = ({
  leftTitle = 'Available',
  rightTitle = 'Selected',
  leftItems,
  rightItems,
  onChange,
  searchable = true,
  height = 400,
  className
}) => {
  const [leftSearch, setLeftSearch] = React.useState('');
  const [rightSearch, setRightSearch] = React.useState('');
  const [leftSelected, setLeftSelected] = React.useState<Set<string>>(new Set());
  const [rightSelected, setRightSelected] = React.useState<Set<string>>(new Set());

  const filteredLeftItems = leftItems.filter(item =>
    item.label.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRightItems = rightItems.filter(item =>
    item.label.toLowerCase().includes(rightSearch.toLowerCase())
  );

  const handleMoveRight = () => {
    const itemsToMove = leftItems.filter(item => leftSelected.has(item.key) && !item.disabled);
    const newLeftItems = leftItems.filter(item => !leftSelected.has(item.key) || item.disabled);
    const newRightItems = [...rightItems, ...itemsToMove];

    onChange(newLeftItems, newRightItems);
    setLeftSelected(new Set());
  };

  const handleMoveLeft = () => {
    const itemsToMove = rightItems.filter(item => rightSelected.has(item.key) && !item.disabled);
    const newRightItems = rightItems.filter(item => !rightSelected.has(item.key) || item.disabled);
    const newLeftItems = [...leftItems, ...itemsToMove];

    onChange(newLeftItems, newRightItems);
    setRightSelected(new Set());
  };

  const handleMoveAllRight = () => {
    const availableItems = leftItems.filter(item => !item.disabled);
    const disabledItems = leftItems.filter(item => item.disabled);
    onChange(disabledItems, [...rightItems, ...availableItems]);
    setLeftSelected(new Set());
  };

  const handleMoveAllLeft = () => {
    const availableItems = rightItems.filter(item => !item.disabled);
    const disabledItems = rightItems.filter(item => item.disabled);
    onChange([...leftItems, ...availableItems], disabledItems);
    setRightSelected(new Set());
  };

  const toggleLeftItem = (key: string) => {
    const newSelected = new Set(leftSelected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setLeftSelected(newSelected);
  };

  const toggleRightItem = (key: string) => {
    const newSelected = new Set(rightSelected);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setRightSelected(newSelected);
  };

  const renderList = (
    items: TransferListItem[],
    selected: Set<string>,
    onToggle: (key: string) => void,
    search: string,
    onSearchChange: (value: string) => void,
    title: string
  ) => (
    <div className="flex-1 flex flex-col bg-gray-900 border border-white/10 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-gray-950">
        <h3 className="text-sm font-semibold text-white">
          {title} ({items.length})
        </h3>
      </div>

      {/* Search */}
      {searchable && (
        <div className="px-4 py-2 border-b border-white/10">
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Items */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: `${height}px` }}
      >
        {items.length === 0 ? (
          <div className="px-4 py-12 text-center text-white/40 text-sm">
            No items
          </div>
        ) : (
          items.map(item => {
            const isSelected = selected.has(item.key);

            return (
              <button
                key={item.key}
                onClick={() => !item.disabled && onToggle(item.key)}
                disabled={item.disabled}
                className={cn(
                  'w-full px-4 py-3 flex items-start gap-3 transition-colors text-left border-b border-white/5',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  isSelected
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-white hover:bg-white/5'
                )}
              >
                <div
                  className={cn(
                    'mt-0.5 w-4 h-4 flex items-center justify-center flex-shrink-0 border-2 rounded',
                    isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-white/20'
                  )}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-white/60 truncate mt-1">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className={cn('flex gap-4 items-center', className)}>
      {/* Left List */}
      {renderList(
        filteredLeftItems,
        leftSelected,
        toggleLeftItem,
        leftSearch,
        setLeftSearch,
        leftTitle
      )}

      {/* Controls */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleMoveRight}
          disabled={leftSelected.size === 0}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          title="Move selected to right"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 4L13 10L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleMoveAllRight}
          disabled={leftItems.filter(i => !i.disabled).length === 0}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          title="Move all to right"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L10 10L4 16M10 4L16 10L10 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleMoveAllLeft}
          disabled={rightItems.filter(i => !i.disabled).length === 0}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          title="Move all to left"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4L10 10L16 16M10 4L4 10L10 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleMoveLeft}
          disabled={rightSelected.size === 0}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          title="Move selected to left"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 4L7 10L13 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Right List */}
      {renderList(
        filteredRightItems,
        rightSelected,
        toggleRightItem,
        rightSearch,
        setRightSearch,
        rightTitle
      )}
    </div>
  );
};
