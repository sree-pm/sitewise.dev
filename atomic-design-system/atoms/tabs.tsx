"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const variantConfig = {
  default: {
    list: 'bg-gray-900 p-1 rounded-lg',
    tab: 'data-[state=active]:bg-gray-800 data-[state=active]:text-white',
    inactive: 'text-white/60 hover:text-white hover:bg-gray-800/50'
  },
  pills: {
    list: 'gap-2',
    tab: 'data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg',
    inactive: 'text-white/60 hover:text-white hover:bg-white/10 rounded-lg'
  },
  underline: {
    list: 'border-b border-white/10',
    tab: 'data-[state=active]:text-blue-400 data-[state=active]:border-blue-400 border-b-2 border-transparent',
    inactive: 'text-white/60 hover:text-white border-b-2 border-transparent'
  }
};

const sizeConfig = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg'
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        className={cn(
          "flex",
          variantConfig[variant].list,
          fullWidth && "w-full"
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-medium transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeConfig[size],
              fullWidth && "flex-1",
              activeTab === tab.id
                ? variantConfig[variant].tab
                : variantConfig[variant].inactive
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={activeTab !== tab.id}
            className={cn(
              "focus:outline-none",
              activeTab === tab.id && "animate-in fade-in duration-200"
            )}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Vertical Tabs variant
export interface VerticalTabsProps extends Omit<TabsProps, 'fullWidth'> {
  tabWidth?: string;
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  size = 'md',
  tabWidth = '200px',
  className
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Tab List */}
      <div
        className={cn(
          "flex flex-col gap-1",
          variant === 'default' && "bg-gray-900 p-2 rounded-lg"
        )}
        style={{ width: tabWidth }}
        role="tablist"
        aria-orientation="vertical"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 font-medium transition-all text-left",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed rounded-lg",
              sizeConfig[size],
              activeTab === tab.id
                ? "bg-gray-800 text-white"
                : "text-white/60 hover:text-white hover:bg-gray-800/50"
            )}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div className="flex-1 min-w-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={activeTab !== tab.id}
            className={cn(
              "focus:outline-none",
              activeTab === tab.id && "animate-in fade-in duration-200"
            )}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
