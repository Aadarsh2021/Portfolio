import { useCallback } from 'react';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

interface SessionData {
  pageViews: Record<string, number>;
  interactions: Array<{
    action: string;
    category: string;
    timestamp: string;
  }>;
  events: Array<{
    type: string;
    timestamp: string;
    data?: any;
  }>;
  startTime: number;
  lastActivity: number;
  sessionId: string;
  viewport: {
    width: number;
    height: number;
  };
}

export const useAnalytics = () => {
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const trackPageView = useCallback((page: string) => {
    try {
      // Store in local analytics
      const analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{}');
      const pageViews = analytics.pageViews || {};
      pageViews[page] = (pageViews[page] || 0) + 1;
      
      // Update session data
      const now = Date.now();
      localStorage.setItem('portfolio_analytics', JSON.stringify({
        ...analytics,
        pageViews,
        startTime: analytics.startTime || now,
        lastActivity: now,
        sessionId: analytics.sessionId || generateSessionId(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }));
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, []);

  const trackUserInteraction = useCallback((action: string, category: string) => {
    try {
      // Store in local analytics
      const analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{}');
      const interactions = analytics.interactions || [];
      const events = analytics.events || [];
      const now = Date.now();
      
      interactions.push({
        action,
        category,
        timestamp: new Date().toISOString()
      });

      events.push({
        type: 'interaction',
        timestamp: new Date().toISOString(),
        data: { action, category }
      });
      
      localStorage.setItem('portfolio_analytics', JSON.stringify({
        ...analytics,
        interactions,
        events,
        startTime: analytics.startTime || now,
        lastActivity: now,
        sessionId: analytics.sessionId || generateSessionId(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }));
    } catch (error) {
      console.error('Error tracking user interaction:', error);
    }
  }, []);

  const getSessionData = useCallback((): SessionData => {
    try {
      const analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{}');
      const now = Date.now();
      
      // Initialize if not exists
      if (!analytics.startTime) {
        const initialData: SessionData = {
          pageViews: {},
          interactions: [],
          events: [],
          startTime: now,
          lastActivity: now,
          sessionId: generateSessionId(),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        };
        localStorage.setItem('portfolio_analytics', JSON.stringify(initialData));
        return initialData;
      }

      return {
        pageViews: analytics.pageViews || {},
        interactions: analytics.interactions || [],
        events: analytics.events || [],
        startTime: analytics.startTime,
        lastActivity: analytics.lastActivity || now,
        sessionId: analytics.sessionId || generateSessionId(),
        viewport: analytics.viewport || {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
    } catch (error) {
      console.error('Error getting session data:', error);
      return {
        pageViews: {},
        interactions: [],
        events: [],
        startTime: Date.now(),
        lastActivity: Date.now(),
        sessionId: generateSessionId(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
    }
  }, []);

  return {
    trackPageView,
    trackUserInteraction,
    getSessionData
  };
}; 