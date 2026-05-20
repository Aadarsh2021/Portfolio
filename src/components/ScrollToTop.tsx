import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowUp } from 'react-icons/bs';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed-bottom-right m-4 p-3 glass-panel"
          style={{
            zIndex: 1000,
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-xl)',
            pointerEvents: 'auto'
          }}
          whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-aura-translucent)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {React.createElement(BsArrowUp as any, { size: 24 })}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;