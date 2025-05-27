import { useEffect, useCallback, useRef, useState } from 'react';

interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReader: boolean;
  keyboardNavigation: boolean;
}

interface FocusableElement {
  element: HTMLElement;
  tabIndex: number;
  originalTabIndex: string;
}

class AccessibilityManager {
  private preferences: AccessibilityPreferences;
  private focusableElements: FocusableElement[] = [];
  private currentFocusIndex = -1;
  private skipLinks: HTMLElement[] = [];
  private announcements: string[] = [];

  constructor() {
    this.preferences = this.detectPreferences();
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupSkipLinks();
  }

  private detectPreferences(): AccessibilityPreferences {
    return {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      fontSize: this.getFontSizePreference(),
      screenReader: this.detectScreenReader(),
      keyboardNavigation: false
    };
  }

  private getFontSizePreference(): AccessibilityPreferences['fontSize'] {
    const stored = localStorage.getItem('accessibility-font-size');
    if (stored && ['small', 'medium', 'large', 'extra-large'].includes(stored)) {
      return stored as AccessibilityPreferences['fontSize'];
    }
    return 'medium';
  }

  private detectScreenReader(): boolean {
    // Check for common screen reader indicators
    return !!(
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver') ||
      window.speechSynthesis ||
      document.querySelector('[aria-live]')
    );
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      // Enable keyboard navigation mode on first tab
      if (e.key === 'Tab') {
        this.preferences.keyboardNavigation = true;
        document.body.classList.add('keyboard-navigation');
      }

      // Handle escape key to close modals/dropdowns
      if (e.key === 'Escape') {
        this.handleEscape();
      }

      // Handle arrow keys for custom navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowNavigation(e);
      }

      // Handle Enter and Space for activation
      if (e.key === 'Enter' || e.key === ' ') {
        this.handleActivation(e);
      }
    });

    // Disable keyboard navigation mode on mouse use
    document.addEventListener('mousedown', () => {
      this.preferences.keyboardNavigation = false;
      document.body.classList.remove('keyboard-navigation');
    });
  }

  private setupScreenReaderSupport(): void {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'accessibility-announcements';
    document.body.appendChild(liveRegion);

    // Create assertive live region for urgent announcements
    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.className = 'sr-only';
    assertiveRegion.id = 'accessibility-announcements-assertive';
    document.body.appendChild(assertiveRegion);
  }

  private setupSkipLinks(): void {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView();
      }
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  private handleEscape(): void {
    // Close any open modals, dropdowns, or overlays
    const openElements = document.querySelectorAll('[aria-expanded="true"]');
    openElements.forEach(element => {
      element.setAttribute('aria-expanded', 'false');
      (element as HTMLElement).click();
    });

    // Return focus to trigger element if available
    const lastFocused = document.querySelector('[data-last-focused]') as HTMLElement;
    if (lastFocused) {
      lastFocused.focus();
      lastFocused.removeAttribute('data-last-focused');
    }
  }

  private handleArrowNavigation(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    
    // Handle menu navigation
    if (target.closest('[role="menu"]') || target.closest('[role="menubar"]')) {
      e.preventDefault();
      this.navigateMenu(e);
    }

    // Handle tab navigation
    if (target.closest('[role="tablist"]')) {
      e.preventDefault();
      this.navigateTabs(e);
    }

    // Handle grid navigation
    if (target.closest('[role="grid"]')) {
      e.preventDefault();
      this.navigateGrid(e);
    }
  }

  private navigateMenu(e: KeyboardEvent): void {
    const menu = (e.target as HTMLElement).closest('[role="menu"], [role="menubar"]');
    if (!menu) return;

    const items = Array.from(menu.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
    const currentIndex = items.indexOf(e.target as HTMLElement);

    let nextIndex = currentIndex;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    }

    if (nextIndex !== currentIndex && items[nextIndex]) {
      items[nextIndex].focus();
    }
  }

  private navigateTabs(e: KeyboardEvent): void {
    const tablist = (e.target as HTMLElement).closest('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const currentIndex = tabs.indexOf(e.target as HTMLElement);

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    }

    if (nextIndex !== currentIndex && tabs[nextIndex]) {
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  }

  private navigateGrid(e: KeyboardEvent): void {
    const grid = (e.target as HTMLElement).closest('[role="grid"]');
    if (!grid) return;

    const cells = Array.from(grid.querySelectorAll('[role="gridcell"]')) as HTMLElement[];
    const currentIndex = cells.indexOf(e.target as HTMLElement);
    const columns = parseInt(grid.getAttribute('data-columns') || '1');

    let nextIndex = currentIndex;
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex + columns;
        break;
      case 'ArrowUp':
        nextIndex = currentIndex - columns;
        break;
    }

    if (nextIndex >= 0 && nextIndex < cells.length && cells[nextIndex]) {
      cells[nextIndex].focus();
    }
  }

  private handleActivation(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    
    // Handle button-like elements
    if (target.role === 'button' || target.tagName === 'BUTTON') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        target.click();
      }
    }

    // Handle links
    if (target.tagName === 'A' && e.key === 'Enter') {
      target.click();
    }
  }

  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const regionId = priority === 'assertive' 
      ? 'accessibility-announcements-assertive'
      : 'accessibility-announcements';
    
    const region = document.getElementById(regionId);
    if (region) {
      region.textContent = message;
      
      // Clear after announcement to allow repeated announcements
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }

    this.announcements.push(message);
  }

  public setFontSize(size: AccessibilityPreferences['fontSize']): void {
    this.preferences.fontSize = size;
    localStorage.setItem('accessibility-font-size', size);
    
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+/g, '');
    document.documentElement.classList.add(`font-size-${size}`);
    
    this.announce(`Font size changed to ${size}`);
  }

  public toggleHighContrast(): void {
    this.preferences.highContrast = !this.preferences.highContrast;
    document.documentElement.classList.toggle('high-contrast', this.preferences.highContrast);
    
    this.announce(
      this.preferences.highContrast ? 'High contrast enabled' : 'High contrast disabled'
    );
  }

  public manageFocus(element: HTMLElement, options?: { 
    preventScroll?: boolean;
    restoreFocus?: boolean;
  }): void {
    if (options?.restoreFocus) {
      const currentFocus = document.activeElement as HTMLElement;
      if (currentFocus) {
        currentFocus.setAttribute('data-last-focused', 'true');
      }
    }

    element.focus({ preventScroll: options?.preventScroll });
  }

  public trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }

  public getPreferences(): AccessibilityPreferences {
    return { ...this.preferences };
  }

  public updatePreferences(updates: Partial<AccessibilityPreferences>): void {
    this.preferences = { ...this.preferences, ...updates };
  }
}

// Singleton instance
const accessibilityManager = new AccessibilityManager();

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState(accessibilityManager.getPreferences());
  const focusTrapRef = useRef<(() => void) | null>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    accessibilityManager.announce(message, priority);
  }, []);

  const setFontSize = useCallback((size: AccessibilityPreferences['fontSize']) => {
    accessibilityManager.setFontSize(size);
    setPreferences(accessibilityManager.getPreferences());
  }, []);

  const toggleHighContrast = useCallback(() => {
    accessibilityManager.toggleHighContrast();
    setPreferences(accessibilityManager.getPreferences());
  }, []);

  const manageFocus = useCallback((element: HTMLElement, options?: {
    preventScroll?: boolean;
    restoreFocus?: boolean;
  }) => {
    accessibilityManager.manageFocus(element, options);
  }, []);

  const trapFocus = useCallback((container: HTMLElement) => {
    // Clear any existing focus trap
    if (focusTrapRef.current) {
      focusTrapRef.current();
    }
    
    focusTrapRef.current = accessibilityManager.trapFocus(container);
    return focusTrapRef.current;
  }, []);

  const releaseFocusTrap = useCallback(() => {
    if (focusTrapRef.current) {
      focusTrapRef.current();
      focusTrapRef.current = null;
    }
  }, []);

  const addAriaLabel = useCallback((element: HTMLElement, label: string) => {
    element.setAttribute('aria-label', label);
  }, []);

  const addAriaDescription = useCallback((element: HTMLElement, description: string) => {
    const descId = `desc-${Math.random().toString(36).substr(2, 9)}`;
    const descElement = document.createElement('div');
    descElement.id = descId;
    descElement.className = 'sr-only';
    descElement.textContent = description;
    
    document.body.appendChild(descElement);
    element.setAttribute('aria-describedby', descId);
    
    return () => {
      document.body.removeChild(descElement);
      element.removeAttribute('aria-describedby');
    };
  }, []);

  const makeElementAccessible = useCallback((element: HTMLElement, options: {
    role?: string;
    label?: string;
    description?: string;
    expanded?: boolean;
    selected?: boolean;
    disabled?: boolean;
  }) => {
    if (options.role) element.setAttribute('role', options.role);
    if (options.label) element.setAttribute('aria-label', options.label);
    if (options.expanded !== undefined) element.setAttribute('aria-expanded', String(options.expanded));
    if (options.selected !== undefined) element.setAttribute('aria-selected', String(options.selected));
    if (options.disabled !== undefined) element.setAttribute('aria-disabled', String(options.disabled));
    
    if (options.description) {
      return addAriaDescription(element, options.description);
    }
  }, [addAriaDescription]);

  useEffect(() => {
    // Apply font size preference on mount
    if (preferences.fontSize !== 'medium') {
      document.documentElement.classList.add(`font-size-${preferences.fontSize}`);
    }

    // Apply high contrast preference on mount
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }

    return () => {
      releaseFocusTrap();
    };
  }, [preferences.fontSize, preferences.highContrast, releaseFocusTrap]);

  return {
    preferences,
    announce,
    setFontSize,
    toggleHighContrast,
    manageFocus,
    trapFocus,
    releaseFocusTrap,
    addAriaLabel,
    addAriaDescription,
    makeElementAccessible
  };
}; 