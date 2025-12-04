"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  offset?: number;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  showArrow?: boolean;
  className?: string;
  contentClassName?: string;
}

const placementConfig = {
  'top': { origin: 'bottom center', transform: 'translateX(-50%) translateY(-8px)' },
  'bottom': { origin: 'top center', transform: 'translateX(-50%) translateY(8px)' },
  'left': { origin: 'right center', transform: 'translateX(-8px) translateY(-50%)' },
  'right': { origin: 'left center', transform: 'translateX(8px) translateY(-50%)' },
  'top-start': { origin: 'bottom left', transform: 'translateY(-8px)' },
  'top-end': { origin: 'bottom right', transform: 'translateY(-8px)' },
  'bottom-start': { origin: 'top left', transform: 'translateY(8px)' },
  'bottom-end': { origin: 'top right', transform: 'translateY(8px)' }
};

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  isOpen: controlledIsOpen,
  onOpenChange,
  placement = 'bottom',
  offset = 8,
  closeOnClickOutside = true,
  closeOnEsc = true,
  showArrow = true,
  className,
  contentClassName
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    const newState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    onOpenChange?.(newState);
  };

  // Calculate position
  useEffect(() => {
    if (!isOpen || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - contentRect.height - offset;
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.left - contentRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.right + offset;
          break;
        case 'top-start':
          top = triggerRect.top - contentRect.height - offset;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - contentRect.height - offset;
          left = triggerRect.right - contentRect.width;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + offset;
          left = triggerRect.right - contentRect.width;
          break;
      }

      setPosition({ top, left });
    };

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, placement, offset]);

  // Click outside handler
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, controlledIsOpen, onOpenChange]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, controlledIsOpen, onOpenChange]);

  const popoverContent = isOpen && (
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="false"
      className={cn(
        "fixed z-50 bg-gray-800 border border-white/10 rounded-lg shadow-2xl",
        "animate-in fade-in zoom-in-95 duration-200",
        contentClassName
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      {showArrow && (
        <div
          className={cn(
            "absolute w-3 h-3 bg-gray-800 border-white/10 rotate-45",
            placement.startsWith('top') && "bottom-[-6px] border-r border-b",
            placement.startsWith('bottom') && "top-[-6px] border-l border-t",
            placement.startsWith('left') && "right-[-6px] border-r border-t",
            placement.startsWith('right') && "left-[-6px] border-l border-b",
            placement === 'top' && "left-1/2 -translate-x-1/2",
            placement === 'bottom' && "left-1/2 -translate-x-1/2",
            placement === 'left' && "top-1/2 -translate-y-1/2",
            placement === 'right' && "top-1/2 -translate-y-1/2",
            placement === 'top-start' && "left-4",
            placement === 'top-end' && "right-4",
            placement === 'bottom-start' && "left-4",
            placement === 'bottom-end' && "right-4"
          )}
        />
      )}
      {content}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleToggle}
        className={className}
      >
        {trigger}
      </div>
      {typeof window !== 'undefined' && createPortal(popoverContent, document.body)}
    </>
  );
};

// Menu Popover variant (common use case)
export interface MenuPopoverProps extends Omit<PopoverProps, 'content'> {
  items: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    danger?: boolean;
  }>;
}

export const MenuPopover: React.FC<MenuPopoverProps> = ({ items, ...props }) => {
  const content = (
    <div className="py-1 min-w-[160px]">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            props.onOpenChange?.(false);
          }}
          disabled={item.disabled}
          className={cn(
            "w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:bg-white/10",
            item.danger
              ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
              : "text-white/80 hover:text-white hover:bg-white/10"
          )}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );

  return <Popover {...props} content={content} />;
};
