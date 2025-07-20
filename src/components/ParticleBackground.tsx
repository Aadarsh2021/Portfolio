import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    // Reduced from 2000 to 500 particles for better performance
    for (let i = 0; i < 500; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Reduced animation intensity for better performance
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
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
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground; 