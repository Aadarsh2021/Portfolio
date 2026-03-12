import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './MagneticCursor.css';

const MagneticCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor "follower"
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON') {
        setCursorType('pointer');
      } else if (target.closest('.project-card')) {
        setCursorType('project');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile) return null;

  return (
    <div className="magnetic-cursor-container" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      {/* Main Cursor Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />

      {/* Outer Follower Ring */}
      <motion.div
        className={`cursor-follower ${cursorType}`}
        style={{
          left: cursorX,
          top: cursorY,
        }}
        animate={{
          scale: cursorType === 'pointer' ? 1.5 : cursorType === 'project' ? 2.5 : 1,
          backgroundColor: cursorType === 'pointer' ? 'rgba(var(--primary-rgb), 0.15)' : 'transparent',
          borderColor: cursorType === 'pointer' ? 'var(--primary)' : 'var(--text-primary)',
        }}
      />
      
      {cursorType === 'project' && (
        <motion.div
          className="cursor-text"
          style={{
            left: cursorX,
            top: cursorY,
            x: '50%',
            y: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          View
        </motion.div>
      )}
    </div>
  );
};

export default MagneticCursor;
