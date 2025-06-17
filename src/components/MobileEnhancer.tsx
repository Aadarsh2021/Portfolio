import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileEnhancerProps {
  children: React.ReactNode;
}

interface TouchState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  duration: number;
  isSwipe: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

const MobileEnhancer: React.FC<MobileEnhancerProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [touchState, setTouchState] = useState<TouchState | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkSpeed, setNetworkSpeed] = useState<'slow' | 'fast'>('fast');
  const [showMobileOptimizations, setShowMobileOptimizations] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Network speed detection
  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const updateNetworkSpeed = () => {
        const effectiveType = connection.effectiveType;
        setNetworkSpeed(effectiveType === 'slow-2g' || effectiveType === '2g' ? 'slow' : 'fast');
      };
      
      updateNetworkSpeed();
      connection.addEventListener('change', updateNetworkSpeed);
      
      return () => connection.removeEventListener('change', updateNetworkSpeed);
    }
  }, []);

  // Touch gesture handling
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      duration: Date.now(),
      isSwipe: false,
      direction: null
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchState) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    
    setTouchState(prev => prev ? {
      ...prev,
      endX: touch.clientX,
      endY: touch.clientY,
      deltaX,
      deltaY
    } : null);
  }, [touchState]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchState) return;
    
    const duration = Date.now() - touchState.duration;
    const absDeltaX = Math.abs(touchState.deltaX);
    const absDeltaY = Math.abs(touchState.deltaY);
    const isSwipe = duration < 300 && (absDeltaX > 50 || absDeltaY > 50);
    
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    
    if (isSwipe) {
      if (absDeltaX > absDeltaY) {
        direction = touchState.deltaX > 0 ? 'right' : 'left';
      } else {
        direction = touchState.deltaY > 0 ? 'down' : 'up';
      }
    }
    
    setTouchState(prev => prev ? {
      ...prev,
      duration,
      isSwipe,
      direction
    } : null);

    // Handle swipe actions
    if (isSwipe && direction) {
      handleSwipeAction(direction);
    }
  }, [touchState]);

  const handleSwipeAction = (direction: string) => {
    switch (direction) {
      case 'left':
        // Navigate to next section
        const sections = ['hero', 'about', 'projects', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          return element && window.scrollY >= element.offsetTop - 100;
        });
        const currentIndex = sections.indexOf(currentSection || 'hero');
        const nextIndex = (currentIndex + 1) % sections.length;
        document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
        break;
        
      case 'right':
        // Navigate to previous section
        const sectionsBack = ['hero', 'about', 'projects', 'contact'];
        const currentSectionBack = sectionsBack.find(section => {
          const element = document.getElementById(section);
          return element && window.scrollY >= element.offsetTop - 100;
        });
        const currentIndexBack = sectionsBack.indexOf(currentSectionBack || 'hero');
        const prevIndex = currentIndexBack > 0 ? currentIndexBack - 1 : sectionsBack.length - 1;
        document.getElementById(sectionsBack[prevIndex])?.scrollIntoView({ behavior: 'smooth' });
        break;
        
      case 'up':
        // Show mobile optimizations panel
        setShowMobileOptimizations(true);
        break;
        
      case 'down':
        // Hide mobile optimizations panel
        setShowMobileOptimizations(false);
        break;
    }
  };

  // Add touch event listeners
  useEffect(() => {
    if (!isMobile) return;
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Add mobile-specific CSS classes
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-device');
      document.body.classList.add(`orientation-${orientation}`);
      document.body.classList.add(`network-${networkSpeed}`);
      
      if (!isOnline) {
        document.body.classList.add('offline');
      }
    }
    
    return () => {
      document.body.classList.remove('mobile-device', 'orientation-portrait', 'orientation-landscape', 'network-slow', 'network-fast', 'offline');
    };
  }, [isMobile, orientation, networkSpeed, isOnline]);

  // Haptic feedback for supported devices
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Performance optimization for mobile
  useEffect(() => {
    if (isMobile && networkSpeed === 'slow') {
      // Reduce animations and effects for slow networks
      document.body.classList.add('reduced-motion');
      
      // Lazy load non-critical images
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
      
      return () => {
        images.forEach(img => imageObserver.unobserve(img));
      };
    }
  }, [isMobile, networkSpeed]);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-enhanced">
      {children}
      
      {/* Mobile Status Indicators */}
      <div className="mobile-status-bar">
        {!isOnline && (
          <div className="offline-indicator">
            <span>📶</span>
            <span>Offline Mode</span>
          </div>
        )}
        
        {networkSpeed === 'slow' && (
          <div className="slow-network-indicator">
            <span>🐌</span>
            <span>Optimizing for slow connection</span>
          </div>
        )}
      </div>

      {/* Swipe Gesture Indicator */}
      <AnimatePresence>
        {touchState?.isSwipe && (
          <motion.div
            className="swipe-indicator"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--primary)',
              color: 'white',
              padding: '1rem',
              borderRadius: '50%',
              zIndex: 9999,
              fontSize: '1.5rem'
            }}
          >
            {touchState.direction === 'left' && '👈'}
            {touchState.direction === 'right' && '👉'}
            {touchState.direction === 'up' && '👆'}
            {touchState.direction === 'down' && '👇'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Optimization Panel */}
      <AnimatePresence>
        {showMobileOptimizations && (
          <motion.div
            className="mobile-optimization-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '1rem 1rem 0 0',
              padding: '1.5rem',
              zIndex: 1000
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>Mobile Optimizations</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              <button
                className="optimization-btn"
                onClick={() => {
                  document.body.classList.toggle('high-contrast');
                  triggerHapticFeedback('light');
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                🎨 High Contrast
              </button>
              
              <button
                className="optimization-btn"
                onClick={() => {
                  document.body.classList.toggle('large-text');
                  triggerHapticFeedback('light');
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                🔍 Large Text
              </button>
              
              <button
                className="optimization-btn"
                onClick={() => {
                  document.body.classList.toggle('reduced-motion');
                  triggerHapticFeedback('light');
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                ⚡ Reduce Motion
              </button>
              
              <button
                className="optimization-btn"
                onClick={() => {
                  setShowMobileOptimizations(false);
                  triggerHapticFeedback('medium');
                }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                ✖️ Close
              </button>
            </div>
            
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Swipe up to show • Swipe down to hide • Swipe left/right to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Help Tooltip */}
      <div 
        className="mobile-help-button"
        onClick={() => setShowMobileOptimizations(!showMobileOptimizations)}
        style={{
          position: 'fixed',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%) translateX(50%)',
          background: 'var(--primary)',
          color: 'white',
          width: '40px',
          height: '60px',
          borderRadius: '1rem 0 0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          cursor: 'pointer',
          fontSize: '1rem',
          border: 'none',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        ⚙️
      </div>

      <style>{`
        .mobile-enhanced {
          touch-action: manipulation;
        }
        
        .mobile-status-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          font-size: 0.75rem;
        }
        
        .offline-indicator,
        .slow-network-indicator {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          border: 1px solid var(--border-primary);
        }
        
        .swipe-indicator {
          pointer-events: none;
        }
        
        /* Mobile-specific optimizations */
        .mobile-device.reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        .mobile-device.high-contrast {
          --primary: #0066cc;
          --secondary: #ff6600;
          --accent: #009900;
          --text-primary: #000000;
          --text-secondary: #333333;
          --bg-primary: #ffffff;
          --bg-secondary: #f5f5f5;
        }
        
        .mobile-device.large-text {
          font-size: 18px !important;
        }
        
        .mobile-device.large-text .hero-title {
          font-size: 3rem !important;
        }
        
        .mobile-device.large-text .section-title {
          font-size: 2.5rem !important;
        }
        
        .mobile-device.network-slow .particle-background,
        .mobile-device.network-slow .glass-effect::before {
          display: none !important;
        }
        
        .mobile-device.offline::before {
          content: '⚠️ You are currently offline. Some features may be limited.';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--warning);
          color: white;
          padding: 0.5rem;
          text-align: center;
          z-index: 9999;
          font-size: 0.875rem;
        }
        
        .mobile-device.orientation-landscape .hero-section {
          padding: 2rem 0 !important;
        }
        
        .mobile-device.orientation-landscape .profile-image-container {
          width: 180px !important;
          height: 180px !important;
        }
        
        /* Touch-specific enhancements */
        .mobile-device button,
        .mobile-device .btn,
        .mobile-device a[role="button"] {
          min-height: 44px;
          min-width: 44px;
        }
        
        .mobile-device .form-control {
          font-size: 16px !important;
        }
        
        /* Performance optimizations */
        .mobile-device .particle-background {
          opacity: 0.3;
        }
        
        .mobile-device img {
          image-rendering: optimizeSpeed;
        }
        
        .mobile-device.network-slow img {
          filter: blur(1px);
          transition: filter 0.3s;
        }
        
        .mobile-device.network-slow img:hover {
          filter: none;
        }
      `}</style>
    </div>
  );
};

export default MobileEnhancer; 