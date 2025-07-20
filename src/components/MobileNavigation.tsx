import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentSection, onSectionChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide/show navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '📈' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="mobile-bottom-nav"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.5rem',
            zIndex: 1000
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: '100%',
            overflowX: 'auto'
          }}>
            {sections.map((section) => (
              <motion.button
                key={section.id}
                className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
                onClick={() => {
                  onSectionChange(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: currentSection === section.id 
                    ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                    : 'transparent',
                  color: currentSection === section.id ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  minWidth: '60px',
                  transition: 'all 0.3s'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  {section.icon}
                </span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: currentSection === section.id ? '600' : '400',
                  textAlign: 'center'
                }}>
                  {section.label}
                </span>
                {currentSection === section.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '0.25rem',
                      width: '4px',
                      height: '4px',
                      background: 'white',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation; 