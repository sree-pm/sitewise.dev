"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MenuItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  className
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const handleTriggerClick = () => {
    setOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    if (item.children && item.children.length > 0) {
      setSubmenuOpen(submenuOpen === item.value ? null : item.value);
    } else {
      item.onClick?.();
      setOpen(false);
      setSubmenuOpen(null);
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSubmenuOpen(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setSubmenuOpen(null);
    }
  };

  const placementStyles = {
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2'
  };

  return (
    <div className={cn('relative inline-block', className)} onKeyDown={handleKeyDown}>
      {trigger && (
        <div ref={triggerRef} onClick={handleTriggerClick}>
          {trigger}
        </div>
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute z-50 min-w-[200px] bg-gray-800 border border-white/10 rounded-lg shadow-2xl py-1',
            placementStyles[placement]
          )}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.value}>
              {item.divider ? (
                <div className="my-1 border-t border-white/10" />
              ) : (
                <div className="relative">
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={cn(
                      'w-full px-4 py-2 flex items-center justify-between transition-colors text-left',
                      'disabled:opacity-40 disabled:cursor-not-allowed',
                      item.danger
                        ? 'text-red-400 hover:bg-red-500/10'
                        : 'text-white hover:bg-white/5',
                      item.children && 'pr-2'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                      <span>{item.label}</span>
                    </div>
                    {item.children && item.children.length > 0 && (
                      <ChevronRight size={16} className="text-white/40" />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.children && item.children.length > 0 && submenuOpen === item.value && (
                    <div className="absolute left-full top-0 ml-1 min-w-[200px] bg-gray-800 border border-white/10 rounded-lg shadow-2xl py-1">
                      {item.children.map(child => (
                        <button
                          key={child.value}
                          onClick={() => {
                            if (!child.disabled) {
                              child.onClick?.();
                              setOpen(false);
                              setSubmenuOpen(null);
                            }
                          }}
                          disabled={child.disabled}
                          className={cn(
                            'w-full px-4 py-2 flex items-center gap-3 transition-colors text-left',
                            'disabled:opacity-40 disabled:cursor-not-allowed',
                            child.danger
                              ? 'text-red-400 hover:bg-red-500/10'
                              : 'text-white hover:bg-white/5'
                          )}
                        >
                          {child.icon && <span className="flex-shrink-0">{child.icon}</span>}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

// Context Menu (Right-click menu)
export interface ContextMenuProps {
  items: MenuItem[];
  children: React.ReactNode;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    const handleScroll = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-[100] min-w-[200px] bg-gray-800 border border-white/10 rounded-lg shadow-2xl py-1"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.value}>
              {item.divider ? (
                <div className="my-1 border-t border-white/10" />
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full px-4 py-2 flex items-center gap-3 transition-colors text-left',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                    item.danger
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-white hover:bg-white/5'
                  )}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
