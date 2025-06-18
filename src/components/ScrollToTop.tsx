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

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          whileHover={{ scale: 1.15, boxShadow: '0 0 32px 8px var(--primary)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
          tabIndex={0}
          style={{
            position: 'fixed',
            right: '2rem',
            bottom: '2.5rem',
            zIndex: 9999,
            border: 'none',
            outline: 'none',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            width: '64px',
            height: '64px',
            boxShadow: '0 0 24px 0 var(--primary), 0 4px 24px 0 rgba(99,102,241,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s, background 0.3s',
            overflow: 'hidden',
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