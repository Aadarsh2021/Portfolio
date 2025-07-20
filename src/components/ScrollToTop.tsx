import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowUp } from 'react-icons/bs';
import './LoadingSpinner.css';

const scrollBtnVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      type: 'spring',
      bounce: 0.4,
      y: { repeat: Infinity, repeatType: "loop", repeatDelay: 2 }
    }
  },
  exit: { opacity: 0, scale: 0.7, y: 60, transition: { duration: 0.3 } }
};

const ScrollToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-to-top"
          className="scroll-to-top-btn enhanced-scroll-to-top"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={scrollBtnVariants}
          whileHover={!isMobile ? { scale: 1.15, boxShadow: '0 0 32px 8px var(--primary)' } : {}}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          tabIndex={0}
          style={{
            position: 'fixed',
            right: isMobile ? '1rem' : '2rem',
            bottom: isMobile ? '1.5rem' : '2.5rem',
            zIndex: 9999,
            border: 'none',
            outline: 'none',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            width: isMobile ? '56px' : '64px',
            height: isMobile ? '56px' : '64px',
            boxShadow: isMobile 
              ? '0 4px 16px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.2)' 
              : '0 0 24px 0 var(--primary), 0 4px 24px 0 rgba(99,102,241,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '1.5rem' : '2rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            minHeight: '44px', // iOS touch target minimum
            minWidth: '44px',
          }}
          onClick={handleClick}
        >
          <span className="visually-hidden">Scroll to top</span>
          {BsArrowUp({})}
          <span className="scroll-to-top-ripple" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 