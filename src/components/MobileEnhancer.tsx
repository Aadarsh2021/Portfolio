import React, { useEffect, useState } from 'react';

interface MobileEnhancerProps {
  children: React.ReactNode;
}

const MobileEnhancer: React.FC<MobileEnhancerProps> = ({ children }) => {
  // Remove unused isMobile state since we're using classes directly
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [orientation, setOrientation] = useState(window.screen.orientation.type);

  useEffect(() => {
    // Device detection
    const checkDevice = () => {
      setOrientation(window.screen.orientation.type);
    };
      
      // Performance detection
    const checkPerformance = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                              (navigator as any).connection?.effectiveType === '2g';
      const hasLowMemory = (navigator as any).deviceMemory < 4;
      
      setIsLowPerformance(isSlowConnection || hasLowMemory || isMobileDevice);
    };

    // Accessibility preferences
    const checkAccessibility = () => {
      setIsHighContrast(window.matchMedia('(prefers-contrast: high)').matches);
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    // Network status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial checks
    checkDevice();
    checkPerformance();
    checkAccessibility();

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Apply mobile-specific classes
  const mobileClasses = [
    'mobile-device',
    isLowPerformance && 'performance-mode',
    isHighContrast && 'high-contrast',
    isReducedMotion && 'reduced-motion',
    isOffline && 'offline',
    `orientation-${orientation.split('-')[0]}`
  ].filter(Boolean).join(' ');

  return (
    <div className={mobileClasses}>
      <style>
        {`
          .mobile-device {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            touch-action: manipulation;
          }

          .performance-mode {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            }
            
          .high-contrast {
            --primary: #0066cc !important;
            --secondary: #ff6600 !important;
            --text-primary: #000000 !important;
            --text-secondary: #333333 !important;
            --bg-primary: #ffffff !important;
            --bg-secondary: #f5f5f5 !important;
            }
            
            .reduced-motion * {
              animation: none !important;
              transition: none !important;
            }
            
          .offline::before {
            content: '⚠️ You are currently offline';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f59e0b;
            color: white;
            padding: 0.5rem;
            text-align: center;
            z-index: 9999;
            font-size: 0.875rem;
          }

          .orientation-landscape .hero-section {
            min-height: auto;
            padding: 2rem 0;
          }

          .orientation-landscape .profile-image-container {
            width: 180px !important;
            height: 180px !important;
          }

          @media (max-width: 991.98px) {
            .mobile-device button,
            .mobile-device .btn,
            .mobile-device a[role="button"],
            .mobile-device input[type="submit"] {
              min-height: 44px;
              min-width: 44px;
            }

            .mobile-device input[type="text"],
            .mobile-device input[type="email"],
            .mobile-device input[type="tel"],
            .mobile-device input[type="password"],
            .mobile-device textarea,
            .mobile-device select {
              font-size: 16px !important;
            }
          }

          @supports (-webkit-touch-callout: none) {
            .mobile-device {
              min-height: -webkit-fill-available;
            }
          }

          @supports (padding: max(0px)) {
            .mobile-device {
              padding-left: max(0px, env(safe-area-inset-left));
              padding-right: max(0px, env(safe-area-inset-right));
              padding-bottom: max(0px, env(safe-area-inset-bottom));
            }
          }
        `}
      </style>
      {children}
    </div>
  );
};

export default MobileEnhancer; 