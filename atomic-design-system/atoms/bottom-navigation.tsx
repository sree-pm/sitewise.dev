import React, { useState } from 'react';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  showLabels?: boolean;
  variant?: 'default' | 'shifting';
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeId,
  onChange,
  showLabels = true,
  variant = 'default',
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState(activeId || items[0]?.id);
  const currentActiveId = activeId !== undefined ? activeId : internalActiveId;

  const handleItemClick = (item: BottomNavItem) => {
    setInternalActiveId(item.id);
    onChange?.(item.id);
    item.onClick?.();
  };

  const isActive = (itemId: string) => currentActiveId === itemId;

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-white dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-800
        shadow-lg
        ${className}
      `}
    >
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {items.map((item) => {
            const active = isActive(item.id);
            const icon = active && item.activeIcon ? item.activeIcon : item.icon;
            const shouldShowLabel = showLabels || (variant === 'shifting' && active);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  relative flex flex-col items-center justify-center gap-1
                  min-w-0 flex-1 py-2 px-2
                  transition-all duration-200
                  ${
                    active
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }
                  hover:text-blue-600 dark:hover:text-blue-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg
                  ${variant === 'shifting' && active ? 'flex-grow' : ''}
                `}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-1 right-1/2 translate-x-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px]">
                    {item.badge}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`
                    transition-transform duration-200
                    ${active ? 'scale-110' : 'scale-100'}
                  `}
                >
                  {React.isValidElement(icon) ? (
                    React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                      className: 'h-6 w-6',
                    })
                  ) : (
                    icon
                  )}
                </div>

                {/* Label */}
                {shouldShowLabel && (
                  <span
                    className={`
                      text-xs font-medium truncate max-w-full
                      transition-all duration-200
                      ${active ? 'opacity-100' : 'opacity-70'}
                      ${variant === 'shifting' && !active ? 'hidden' : ''}
                    `}
                  >
                    {item.label}
                  </span>
                )}

                {/* Active Indicator */}
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white dark:bg-gray-900" />
    </nav>
  );
};

export default BottomNavigation;
