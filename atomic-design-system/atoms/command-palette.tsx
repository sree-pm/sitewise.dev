"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  category?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found',
  className
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
    if (!value) {
      setSearch('');
      setSelectedIndex(0);
    }
  };

  // Filter items
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Group by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const handleSelect = (item: CommandItem) => {
    item.onSelect();
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
    }
  };

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        <div
          className={cn(
            'w-full max-w-2xl bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden',
            className
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <Search size={20} className="text-white/40 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedIndex(0);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <kbd className="hidden sm:block px-2 py-1 text-xs text-white/60 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-12 text-center text-white/40">
                {emptyMessage}
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase bg-gray-950">
                    {category}
                  </div>
                  {categoryItems.map(item => {
                    const index = filteredItems.indexOf(item);
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          'w-full px-4 py-3 flex items-center gap-3 transition-colors text-left',
                          isSelected
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'text-white hover:bg-white/5'
                        )}
                      >
                        {item.icon && (
                          <span className="flex-shrink-0 text-white/60">
                            {item.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{item.label}</div>
                          {item.description && (
                            <div className="text-sm text-white/60 truncate">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.shortcut && (
                          <div className="flex gap-1">
                            {item.shortcut.map((key, i) => (
                              <kbd
                                key={i}
                                className="px-2 py-1 text-xs text-white/60 bg-white/5 border border-white/10 rounded"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer Hint */}
          <div className="px-4 py-2 flex items-center gap-4 text-xs text-white/40 border-t border-white/10 bg-gray-950">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">ESC</kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
