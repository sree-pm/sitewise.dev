"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NotificationProps {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

interface NotificationContextValue {
  notifications: NotificationProps[];
  addNotification: (notification: Omit<NotificationProps, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// Notification Provider
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationProps, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </NotificationContext.Provider>
  );
};

// Notification Container (renders all notifications)
const NotificationContainer: React.FC<{
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-md">
      {notifications.map(notification => (
        <Notification key={notification.id} {...notification} onClose={() => onClose(notification.id)} />
      ))}
    </div>
  );
};

// Single Notification Component
const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  message,
  action,
  onClose
}) => {
  const icons = {
    success: <CheckCircle2 size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    warning: <AlertTriangle size={20} className="text-yellow-500" />,
    info: <Info size={20} className="text-blue-500" />
  };

  const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500'
  };

  return (
    <div
      className={cn(
        'bg-gray-900 border border-white/10 border-l-4 rounded-lg shadow-2xl p-4 animate-in slide-in-from-right',
        borderColors[type]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          {message && <p className="text-sm text-white/70">{message}</p>}
          
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Snackbar (simpler, bottom notification)
export interface SnackbarProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

interface SnackbarContextValue {
  showSnackbar: (props: SnackbarProps) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

  const showSnackbar = useCallback((props: SnackbarProps) => {
    setSnackbar(props);

    if (props.duration !== 0) {
      setTimeout(() => {
        setSnackbar(null);
      }, props.duration || 3000);
    }
  }, []);

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <div
          className={cn(
            'fixed z-[100] bg-gray-900 border border-white/10 rounded-lg shadow-2xl px-4 py-3 animate-in slide-in-from-bottom',
            positionClasses[snackbar.position || 'bottom-center']
          )}
        >
          <div className="flex items-center gap-4">
            <span className="text-white">{snackbar.message}</span>
            {snackbar.action && (
              <button
                onClick={() => {
                  snackbar.action?.onClick();
                  setSnackbar(null);
                }}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {snackbar.action.label}
              </button>
            )}
            <button
              onClick={() => setSnackbar(null)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
