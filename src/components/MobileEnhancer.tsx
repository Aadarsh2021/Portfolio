import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileNavigation from './MobileNavigation';

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen);
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

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update current section
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    switch (direction) {
      case 'left':
        // Navigate to next section
        const nextIndex = (currentIndex + 1) % sections.length;
        document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
        break;
        
      case 'right':
        // Navigate to previous section
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        document.getElementById(sections[prevIndex])?.scrollIntoView({ behavior: 'smooth' });
        break;
        
      case 'up':
        // Show quick actions
        setShowQuickActions(true);
        break;
        
      case 'down':
        // Hide quick actions
        setShowQuickActions(false);
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
    }
    
    return () => {
      document.body.classList.remove('mobile-device', 'orientation-portrait', 'orientation-landscape');
    };
  }, [isMobile, orientation]);

  // Haptic feedback
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

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-enhanced">
      {children}
      
      {/* Progress Bar */}
      <motion.div
        className="mobile-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          zIndex: 1001,
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Floating Action Button */}
      <motion.button
        className="mobile-fab"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          cursor: 'pointer'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setShowQuickActions(!showQuickActions);
          triggerHapticFeedback('light');
        }}
      >
        ⚡
      </motion.button>

      {/* Quick Actions Panel */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            className="mobile-quick-actions"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{
              position: 'fixed',
              bottom: '5rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              zIndex: 999,
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['hero', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  className={`quick-action-btn ${currentSection === section ? 'active' : ''}`}
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                    triggerHapticFeedback('light');
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: currentSection === section 
                      ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                      : 'rgba(255, 255, 255, 0.8)',
                    color: currentSection === section ? 'white' : 'var(--text-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Indicator */}
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
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white',
              padding: '1rem',
              borderRadius: '50%',
              zIndex: 9999,
              fontSize: '1.5rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {touchState.direction === 'left' && '👈'}
            {touchState.direction === 'right' && '👉'}
            {touchState.direction === 'up' && '👆'}
            {touchState.direction === 'down' && '👇'}
          </motion.div>
        )}
      </AnimatePresence>

             {/* Bottom Navigation */}
       <MobileNavigation 
         currentSection={currentSection}
         onSectionChange={setCurrentSection}
       />

       {/* Mobile Menu Overlay */}
       <AnimatePresence>
         {showMobileMenu && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1002,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '90vw',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Mobile Menu</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                  <motion.button
                    key={item}
                    className="mobile-menu-item"
                    onClick={() => {
                      const section = item.toLowerCase();
                      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                      setShowMobileMenu(false);
                      triggerHapticFeedback('light');
                    }}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-enhanced {
          touch-action: manipulation;
        }
        
        .mobile-progress-bar {
          will-change: transform;
        }
        
        .mobile-fab {
          will-change: transform;
        }
        
        .quick-action-btn:hover {
          transform: scale(1.05);
        }
        
        .mobile-menu-item:hover {
          transform: scale(1.05);
        }
        
        /* Mobile-specific optimizations */
        .mobile-device .particle-background {
          opacity: 0.3;
        }
        
        .mobile-device img {
          image-rendering: optimizeSpeed;
        }
        
        /* Touch feedback */
        .mobile-device button:active,
        .mobile-device .btn:active,
        .mobile-device a:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default MobileEnhancer; 