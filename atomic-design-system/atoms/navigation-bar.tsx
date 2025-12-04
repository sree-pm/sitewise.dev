import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavigationBarProps {
  items: NavItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
  onItemClick?: (item: NavItem) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  logo,
  actions,
  sticky = false,
  transparent = false,
  variant = 'light',
  className = '',
  onItemClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (sticky || transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky, transparent]);

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
    } else {
      setMobileMenuOpen(false);
      setActiveSubmenu(null);
      onItemClick?.(item);
    }
  };

  const bgClass = transparent && !scrolled
    ? 'bg-transparent'
    : variant === 'dark'
    ? 'bg-gray-900 border-gray-800'
    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800';

  const textClass = variant === 'dark'
    ? 'text-white'
    : 'text-gray-900 dark:text-gray-100';

  const linkHoverClass = variant === 'dark'
    ? 'hover:text-blue-400'
    : 'hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <nav
      className={`
        ${sticky ? 'sticky top-0 z-50' : ''}
        ${bgClass}
        ${scrolled ? 'shadow-md' : ''}
        border-b transition-all duration-300
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo || (
              <a href="/" className={`text-xl font-bold ${textClass}`}>
                Logo
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {items.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => handleItemClick(item, e)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    flex items-center gap-2
                    ${textClass} ${linkHoverClass}
                  `}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.badge}
                    </span>
                  )}
                </a>

                {/* Dropdown */}
                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemClick?.(child);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          {child.icon}
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {actions}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${textClass} ${linkHoverClass}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleItemClick(item, e)}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${textClass} ${linkHoverClass}
                    flex items-center justify-between
                  `}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </a>

                {/* Mobile Submenu */}
                {item.children && activeSubmenu === item.label && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => {
                          onItemClick?.(child);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                      >
                        {child.icon}
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Actions */}
          {actions && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              {actions}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
