import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const frameCount = useRef(0);
  const isReady = useRef(false);
  
  const particles = useMemo(() => {
    const temp = [];
    // Reduced from 2000 to 300 particles for better performance and faster rendering
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      try {
        frameCount.current++;
        // Mark as ready after a few frames
        if (!isReady.current && frameCount.current > 3) {
          isReady.current = true;
          // Dispatch custom event to signal animation is ready
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('particle-animation-ready'));
          }
        }
        
        // Reduced animation intensity for better performance
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
        ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
      } catch (error) {
        // Silently handle any animation errors to prevent crashes
        console.warn('Particle animation error:', error);
      }
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const ParticleBackground: React.FC = () => {
  useEffect(() => {
    // Add a class to body when particle background is mounted for testing
    document.body.classList.add('particle-background-mounted');
    
    return () => {
      document.body.classList.remove('particle-background-mounted');
    };
  }, []);

  return (
    <div 
      className="particle-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          performance={{ min: 0.5 }}
          onCreated={({ gl }) => {
            // Optimize WebGL context
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            // Signal that canvas is ready
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('canvas-ready'));
            }
          }}
        >
          <ParticleField />
          <ambientLight intensity={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ParticleBackground; 