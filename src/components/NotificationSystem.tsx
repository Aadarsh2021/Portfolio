import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { FiCheck, FiX, FiAlertTriangle, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { IconType } from 'react-icons';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
  timestamp: number;
}

interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

interface NotificationState {
  notifications: Notification[];
  maxNotifications: number;
  defaultDuration: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

type NotificationActionType =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'UPDATE_NOTIFICATION'; payload: { id: string; updates: Partial<Notification> } }
  | { type: 'SET_POSITION'; payload: NotificationState['position'] }
  | { type: 'SET_MAX_NOTIFICATIONS'; payload: number };

const initialState: NotificationState = {
  notifications: [],
  maxNotifications: 5,
  defaultDuration: 5000,
  position: 'top-right'
};

const notificationReducer = (
  state: NotificationState,
  action: NotificationActionType
): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: newNotifications.slice(0, state.maxNotifications)
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };

    case 'UPDATE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload.id ? { ...n, ...action.payload.updates } : n
        )
      };

    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload
      };

    case 'SET_MAX_NOTIFICATIONS':
      return {
        ...state,
        maxNotifications: action.payload,
        notifications: state.notifications.slice(0, action.payload)
      };

    default:
      return state;
  }
};

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  setPosition: (position: NotificationState['position']) => void;
  setMaxNotifications: (max: number) => void;
  success: (title: string, message?: string, options?: Partial<Notification>) => string;
  error: (title: string, message?: string, options?: Partial<Notification>) => string;
  warning: (title: string, message?: string, options?: Partial<Notification>) => string;
  info: (title: string, message?: string, options?: Partial<Notification>) => string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const generateId = useCallback(() => {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = generateId();
    const fullNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      duration: notification.duration ?? state.defaultDuration
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: fullNotification });

    // Auto-remove notification if not persistent
    if (!fullNotification.persistent && fullNotification.duration && fullNotification.duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, fullNotification.duration);
    }

    return id;
  }, [generateId, state.defaultDuration]);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const updateNotification = useCallback((id: string, updates: Partial<Notification>) => {
    dispatch({ type: 'UPDATE_NOTIFICATION', payload: { id, updates } });
  }, []);

  const setPosition = useCallback((position: NotificationState['position']) => {
    dispatch({ type: 'SET_POSITION', payload: position });
  }, []);

  const setMaxNotifications = useCallback((max: number) => {
    dispatch({ type: 'SET_MAX_NOTIFICATIONS', payload: max });
  }, []);

  // Helper methods for different notification types
  const success = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ ...options, type: 'success', title, message });
  }, [addNotification]);

  const error = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ ...options, type: 'error', title, message, persistent: true });
  }, [addNotification]);

  const warning = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ ...options, type: 'warning', title, message });
  }, [addNotification]);

  const info = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ ...options, type: 'info', title, message });
  }, [addNotification]);

  const value: NotificationContextType = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAll,
    updateNotification,
    setPosition,
    setMaxNotifications,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer position={state.position} notifications={state.notifications} />
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Container Component
interface NotificationContainerProps {
  position: NotificationState['position'];
  notifications: Notification[];
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ position, notifications }) => {
  const getPositionClasses = () => {
    const baseClasses = 'fixed z-50 pointer-events-none';
    
    switch (position) {
      case 'top-right':
        return `${baseClasses} top-4 right-4`;
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`;
      case 'top-center':
        return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom-center':
        return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
      default:
        return `${baseClasses} top-4 right-4`;
    }
  };

  return (
    <div className={getPositionClasses()}>
      <div className="space-y-3 w-80">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

// Individual Notification Component
interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { removeNotification } = useNotifications();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      removeNotification(notification.id);
    }, 300);
  }, [notification.id, removeNotification]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return renderIcon(FiCheck, 20, "w-5 h-5");
      case 'error':
        return renderIcon(FiAlertCircle, 20, "w-5 h-5");
      case 'warning':
        return renderIcon(FiAlertTriangle, 20, "w-5 h-5");
      case 'info':
        return renderIcon(FiInfo, 20, "w-5 h-5");
      default:
        return renderIcon(FiInfo, 20, "w-5 h-5");
    }
  };

  const getTypeClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div
      className={`
        pointer-events-auto transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${isExiting ? 'translate-x-full opacity-0 scale-95' : ''}
      `}
    >
      <div className={`
        rounded-lg border shadow-lg p-4 backdrop-blur-sm
        ${getTypeClasses()}
        glass-effect
      `}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${getIconClasses()}`}>
            {getIcon()}
          </div>
          
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-semibold mb-1">
              {notification.title}
            </h4>
            
            {notification.message && (
              <p className="text-sm opacity-90 mb-2">
                {notification.message}
              </p>
            )}
            
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`
                      px-3 py-1 text-xs font-medium rounded transition-colors
                      ${action.style === 'primary' ? 'bg-primary text-white hover:bg-primary-hover' :
                        action.style === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
                        'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            {renderIcon(FiX, 16, "w-4 h-4")}
          </button>
        </div>
        
        {/* Progress bar for timed notifications */}
        {!notification.persistent && notification.duration && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all ease-linear ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}
              style={{
                width: '100%',
                animation: `shrink ${notification.duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// CSS for progress bar animation (add to your CSS file)
const progressBarStyles = `
  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = progressBarStyles;
  document.head.appendChild(style);
} 