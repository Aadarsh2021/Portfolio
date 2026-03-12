import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
        transformOrigin: '0%',
        zIndex: 10001,
        boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.5)'
      }}
    />
  );
};

export default ScrollProgress;
