import React, { useEffect } from 'react';

/**
 * PerformanceOptimizer handles global resource optimization
 * - Preloads critical assets
 * - Controls adaptive quality for heavy components
 * - Manages memory-intensive background tasks
 */
const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // 1. Preload critical fonts
    const preloadFonts = () => {
      const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
      ];
      
      fonts.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // 2. Clear prefetch cache on idle
    const clearPrefetchOnIdle = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          // Future-proofing for custom cache management
        });
      }
    };

    // 3. Set global quality based on device
    const setAdaptiveQuality = () => {
      const isLowPower = (navigator as any).hardwareConcurrency <= 4;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isLowPower || isMobile) {
        document.documentElement.setAttribute('data-perf-mode', 'low');
      } else {
        document.documentElement.setAttribute('data-perf-mode', 'high');
      }
    };

    preloadFonts();
    clearPrefetchOnIdle();
    setAdaptiveQuality();
  }, []);

  return null;
};

export default PerformanceOptimizer;
