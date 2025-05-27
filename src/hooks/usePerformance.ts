import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  loadTime: number | null;
  domContentLoaded: number | null;
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  performanceScore: number;
  recommendations: string[];
}

export const usePerformance = (): UsePerformanceReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    loadTime: null,
    domContentLoaded: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const measurePerformance = () => {
      // Basic navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        }));
      }

      // Web Vitals (simplified version)
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const fidEntry = entry as any; // Type assertion for FID specific properties
            if (fidEntry.processingStart) {
              setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - entry.startTime }));
            }
          }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            const clsEntry = entry as any; // Type assertion for CLS specific properties
            if (!clsEntry.hadRecentInput && clsEntry.value) {
              clsValue += clsEntry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }).observe({ entryTypes: ['layout-shift'] });
      }

      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  const performanceScore = (() => {
    let score = 100;
    
    if (metrics.fcp && metrics.fcp > 2000) score -= 15;
    if (metrics.lcp && metrics.lcp > 2500) score -= 20;
    if (metrics.fid && metrics.fid > 100) score -= 15;
    if (metrics.cls && metrics.cls > 0.1) score -= 20;
    if (metrics.ttfb && metrics.ttfb > 600) score -= 10;
    
    return Math.max(0, score);
  })();

  const recommendations = (() => {
    const recs: string[] = [];
    
    if (metrics.fcp && metrics.fcp > 2000) {
      recs.push('Optimize First Contentful Paint - consider reducing critical resources');
    }
    if (metrics.lcp && metrics.lcp > 2500) {
      recs.push('Improve Largest Contentful Paint - optimize images and critical resources');
    }
    if (metrics.fid && metrics.fid > 100) {
      recs.push('Reduce First Input Delay - minimize JavaScript execution time');
    }
    if (metrics.cls && metrics.cls > 0.1) {
      recs.push('Fix Cumulative Layout Shift - ensure stable layouts');
    }
    if (metrics.ttfb && metrics.ttfb > 600) {
      recs.push('Optimize Time to First Byte - improve server response time');
    }
    
    if (recs.length === 0) {
      recs.push('Performance looks good! 🎉');
    }
    
    return recs;
  })();

  return {
    metrics,
    isLoading,
    performanceScore,
    recommendations,
  };
}; 