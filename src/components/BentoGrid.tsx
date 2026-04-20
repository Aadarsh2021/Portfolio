import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => {
  return (
    <div className={`bento-master ${className}`}>
      {children}
    </div>
  );
};

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'wide' | 'tall' | 'full';
  id?: string;
}

export const BentoTile: React.FC<BentoTileProps> = ({ 
  children, 
  className = "", 
  size = 'md',
  id 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a premium "heavy" feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const isLowPerf = document.documentElement.getAttribute('data-perf-mode') === 'low';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isLowPerf) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getGridClass = () => {
    switch (size) {
      case 'sm': return 'bento-sm';
      case 'md': return 'bento-md';
      case 'lg': return 'bento-lg';
      case 'wide': return 'bento-wide';
      case 'tall': return 'bento-tall';
      case 'full': return 'bento-full';
      default: return 'bento-md';
    }
  };

  return (
    <motion.div
      ref={containerRef}
      id={id}
      className={`luminous-tile bento-tile ${getGridClass()} ${className}`}
      style={{
        rotateX,
        rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="tile-content">
        <div className="tile-glow-container">
           <motion.div 
             className="tile-glow-pulse"
             style={{
               left: useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]),
               top: useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]),
             }}
           />
           {/* Real-Glass Reflection Layer */}
           <motion.div 
             className="tile-glass-reflection"
             style={{
               backgroundPosition: useTransform(
                 [mouseXSpring, mouseYSpring],
                 ([x, y]) => `${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%`
               )
             }}
           />
        </div>
        
        {/* Proximity Border Beam */}
        <motion.div 
          className="tile-border-beam"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]) => `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(139, 92, 246, 0.3) 0%, transparent 60%)`
             )
          }}
        />

        <div className="tile-layer-wrapper" style={{ height: '100%', width: '100%' }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
