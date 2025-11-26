import { useEffect, useCallback } from 'react';

export const useAccessibility = () => {
  // Focus management
  const handleFocusRing = useCallback(() => {
    document.body.classList.remove('no-focus-ring');
    
    const handleMouseDown = () => {
      document.body.classList.add('no-focus-ring');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.body.classList.remove('no-focus-ring');
      }
    };
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Screen reader announcements
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 3000);
  }, []);

  // Keyboard navigation
  const handleKeyboardNav = useCallback(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Escape key
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement !== document.body) {
          activeElement.blur();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize accessibility features
  useEffect(() => {
    const cleanupFocusRing = handleFocusRing();
    const cleanupKeyboardNav = handleKeyboardNav();
    
    // Add necessary ARIA landmarks
    document.body.setAttribute('role', 'application');
    
    // Add high contrast detection
    const highContrastQuery = window.matchMedia('(forced-colors: active)');
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      cleanupFocusRing();
      cleanupKeyboardNav();
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      document.body.removeAttribute('role');
    };
  }, [handleFocusRing, handleKeyboardNav]);

  return {
    announce
  };
}; 