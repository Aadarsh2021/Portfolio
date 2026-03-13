import React, { useEffect, useState } from 'react';

interface RadialWipeProps {
  active: boolean;
  x: string;
  y: string;
}

const RadialWipe: React.FC<RadialWipeProps> = ({ active, x, y }) => {
  const [shouldRender, setShouldRender] = useState(active);

  useEffect(() => {
    if (active) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`theme-wipe-overlay ${active ? 'active' : ''}`}
      style={{ 
        '--wipe-x': x, 
        '--wipe-y': y 
      } as React.CSSProperties}
    />
  );
};

export default RadialWipe;

