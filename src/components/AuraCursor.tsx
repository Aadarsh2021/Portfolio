import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './AuraCursor.css';

const AuraCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeElement, setActiveElement] = useState<'default' | 'link' | 'tile'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Heavy, liquid-like spring config
  const springBase = { damping: 40, stiffness: 200, mass: 2 };
  const springInner = { damping: 30, stiffness: 300, mass: 1 };
  
  const auraX = useSpring(mouseX, springBase);
  const auraY = useSpring(mouseY, springBase);
  
  const dotX = useSpring(mouseX, springInner);
  const dotY = useSpring(mouseY, springInner);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Sync mouse position with CSS variables for tile hover effect
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setActiveElement('link');
      } else if (target.closest('.luminous-tile')) {
        setActiveElement('tile');
      } else {
        setActiveElement('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="aura-cursor-wrapper">
      {/* Dynamic Background Glow (Aura) */}
      <motion.div
        className={`aura-glow ${activeElement}`}
        style={{
          left: auraX,
          top: auraY,
        }}
      />

      {/* Primary Tracking Dot */}
      <motion.div
        className="aura-dot"
        style={{
          left: dotX,
          top: dotY,
        }}
        animate={{
          scale: activeElement === 'link' ? 1.5 : activeElement === 'tile' ? 0.8 : 1,
          opacity: activeElement === 'link' ? 1 : 0.6,
        }}
      />
      
      {/* Inner Core Pulse */}
      <motion.div
        className="aura-core"
        style={{
          left: dotX,
          top: dotY,
        }}
        animate={{
          scale: activeElement === 'link' ? 2 : 1,
        }}
      />
    </div>
  );
};

export default AuraCursor;
