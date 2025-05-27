import { useEffect, useCallback, useRef } from 'react';

interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  events: AnalyticsEvent[];
  userAgent: string;
  referrer: string;
  viewport: { width: number; height: number };
}

class AdvancedAnalytics {
  private session: UserSession;
  private eventQueue: AnalyticsEvent[] = [];
  private isOnline = navigator.onLine;
  private observers: IntersectionObserver[] = [];

  constructor() {
    this.session = this.initializeSession();
    this.setupEventListeners();
    this.startHeartbeat();
  }

  private initializeSession(): UserSession {
    const sessionId = this.generateSessionId();
    const now = Date.now();
    
    return {
      sessionId,
      startTime: now,
      lastActivity: now,
      pageViews: 1,
      events: [],
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility', 'engagement', {
        visible: !document.hidden
      });
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', this.throttle(() => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90, 100].includes(scrollDepth)) {
          this.trackEvent('scroll_depth', 'engagement', {
            depth: scrollDepth
          });
        }
      }
    }, 100));

    // Track mouse movement patterns
    let mouseMovements = 0;
    window.addEventListener('mousemove', this.throttle(() => {
      mouseMovements++;
      if (mouseMovements % 100 === 0) {
        this.trackEvent('mouse_activity', 'engagement', {
          movements: mouseMovements
        });
      }
    }, 1000));

    // Track keyboard interactions
    document.addEventListener('keydown', (e) => {
      this.trackEvent('keyboard_interaction', 'engagement', {
        key: e.key,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey
      });
    });

    // Track network status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.trackEvent('network_status', 'technical', { status: 'online' });
      this.flushEventQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.trackEvent('network_status', 'technical', { status: 'offline' });
    });

    // Track viewport changes
    window.addEventListener('resize', this.throttle(() => {
      this.session.viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      this.trackEvent('viewport_change', 'technical', this.session.viewport);
    }, 500));
  }

  private throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  private startHeartbeat(): void {
    setInterval(() => {
      this.trackEvent('heartbeat', 'engagement', {
        sessionDuration: Date.now() - this.session.startTime
      });
    }, 30000); // Every 30 seconds
  }

  public trackEvent(
    event: string, 
    category: string, 
    metadata?: Record<string, any>
  ): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      timestamp: Date.now(),
      sessionId: this.session.sessionId,
      metadata: {
        ...metadata,
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: this.session.viewport
      }
    };

    this.session.events.push(analyticsEvent);
    this.session.lastActivity = Date.now();

    if (this.isOnline) {
      this.sendEvent(analyticsEvent);
    } else {
      this.eventQueue.push(analyticsEvent);
    }
  }

  public trackPageView(page: string): void {
    this.session.pageViews++;
    this.trackEvent('page_view', 'navigation', { page });
  }

  public trackUserInteraction(element: string, action: string, metadata?: Record<string, any>): void {
    this.trackEvent('user_interaction', 'engagement', {
      element,
      action,
      ...metadata
    });
  }

  public trackPerformance(metrics: Record<string, number>): void {
    this.trackEvent('performance_metrics', 'technical', metrics);
  }

  public trackError(error: Error, context?: string): void {
    this.trackEvent('error', 'technical', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  public setupElementTracking(element: HTMLElement, eventName: string): void {
    // Track element visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.trackEvent(`${eventName}_visible`, 'engagement', {
            elementId: element.id,
            elementClass: element.className
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
    this.observers.push(observer);

    // Track element interactions
    element.addEventListener('click', () => {
      this.trackUserInteraction(eventName, 'click');
    });

    element.addEventListener('mouseenter', () => {
      this.trackUserInteraction(eventName, 'hover');
    });
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // In a real application, you would send this to your analytics service
      console.log('Analytics Event:', event);
      
      // Example: Send to Google Analytics, Mixpanel, or custom endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
      this.eventQueue.push(event);
    }
  }

  private async flushEventQueue(): Promise<void> {
    while (this.eventQueue.length > 0 && this.isOnline) {
      const event = this.eventQueue.shift();
      if (event) {
        await this.sendEvent(event);
      }
    }
  }

  public getSessionData(): UserSession {
    return { ...this.session };
  }

  public getEngagementScore(): number {
    const sessionDuration = Date.now() - this.session.startTime;
    const interactionEvents = this.session.events.filter(e => 
      e.category === 'engagement'
    ).length;
    
    // Simple engagement score calculation
    const durationScore = Math.min(sessionDuration / 60000, 10); // Max 10 points for 10+ minutes
    const interactionScore = Math.min(interactionEvents / 10, 10); // Max 10 points for 100+ interactions
    
    return Math.round((durationScore + interactionScore) / 2);
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
const analytics = new AdvancedAnalytics();

export const useAnalytics = () => {
  const trackingRef = useRef<Set<string>>(new Set());

  const trackEvent = useCallback((
    event: string, 
    category: string, 
    metadata?: Record<string, any>
  ) => {
    analytics.trackEvent(event, category, metadata);
  }, []);

  const trackPageView = useCallback((page: string) => {
    analytics.trackPageView(page);
  }, []);

  const trackUserInteraction = useCallback((
    element: string, 
    action: string, 
    metadata?: Record<string, any>
  ) => {
    analytics.trackUserInteraction(element, action, metadata);
  }, []);

  const trackElementVisibility = useCallback((
    elementId: string, 
    threshold: number = 0.5
  ) => {
    if (trackingRef.current.has(elementId)) return;
    
    trackingRef.current.add(elementId);
    
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('element_visible', 'engagement', {
            elementId,
            visibilityRatio: entry.intersectionRatio
          });
        }
      });
    }, { threshold });

    observer.observe(element);

    return () => {
      observer.disconnect();
      trackingRef.current.delete(elementId);
    };
  }, [trackEvent]);

  const trackFormInteraction = useCallback((formName: string, field: string, action: string) => {
    trackEvent('form_interaction', 'engagement', {
      formName,
      field,
      action
    });
  }, [trackEvent]);

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackEvent('file_download', 'conversion', {
      fileName,
      fileType
    });
  }, [trackEvent]);

  const trackExternalLink = useCallback((url: string, linkText: string) => {
    trackEvent('external_link_click', 'engagement', {
      url,
      linkText
    });
  }, [trackEvent]);

  const getSessionData = useCallback(() => {
    return analytics.getSessionData();
  }, []);

  const getEngagementScore = useCallback(() => {
    return analytics.getEngagementScore();
  }, []);

  useEffect(() => {
    return () => {
      analytics.destroy();
    };
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackUserInteraction,
    trackElementVisibility,
    trackFormInteraction,
    trackDownload,
    trackExternalLink,
    getSessionData,
    getEngagementScore
  };
}; 