import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.LineSegments>(null);
  const { theme } = useTheme();
  
  const particleColor = theme === 'dark' ? "#8b5cf6" : "#6366f1";
  const lineColor = theme === 'dark' ? "rgba(139, 92, 246, 0.15)" : "rgba(99, 102, 241, 0.15)";
  
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = THREE.MathUtils.randFloatSpread(40);
      pos[i * 3 + 1] = THREE.MathUtils.randFloatSpread(40);
      pos[i * 3 + 2] = THREE.MathUtils.randFloatSpread(40);
    }
    return pos;
  }, []);

  const linePositions = useMemo(() => new Float32Array(count * 6), []);

  useFrame((state) => {
    if (!ref.current || !meshRef.current) return;
    
    // Slow drift
    ref.current.rotation.y += 0.0002;
    ref.current.rotation.x += 0.0001;
    
    // Mouse interaction
    const targetX = state.mouse.x * 5;
    const targetY = state.mouse.y * 5;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.02;

    // Neural connectivity logic
    let lineIdx = 0;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const maxDist = 4;
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < i + 5; j++) { // Only check nearby indices for perf
        const idx1 = i * 3;
        const idx2 = (j % count) * 3;
        
        const dx = pos[idx1] - pos[idx2];
        const dy = pos[idx1 + 1] - pos[idx2 + 1];
        const dz = pos[idx1 + 2] - pos[idx2 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDist * maxDist) {
          linePositions[lineIdx++] = pos[idx1];
          linePositions[lineIdx++] = pos[idx1 + 1];
          linePositions[lineIdx++] = pos[idx1 + 2];
          linePositions[lineIdx++] = pos[idx2];
          linePositions[lineIdx++] = pos[idx2 + 1];
          linePositions[lineIdx++] = pos[idx2 + 2];
        }
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === 'dark' ? 0.3 : 0.5}
        />
      </Points>
      <lineSegments ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
};

const ObsidianBackground: React.FC = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? '#030303' : '#f8fafc';

  return (
    <div 
      className="fixed-top" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        pointerEvents: 'none',
        background: bgColor,
        transition: 'background 0.5s ease'
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
        <ambientLight intensity={theme === 'dark' ? 0.5 : 1.2} />
      </Canvas>
      {/* Subtle overlay to blend 3D with UI */}
      <div 
        className="position-absolute w-100 h-100 top-0 start-0" 
        style={{ 
          background: `radial-gradient(circle at 50% 50%, transparent 20%, ${bgColor} 90%)`,
          opacity: theme === 'dark' ? 0.8 : 0.4,
          transition: 'background 0.5s ease'
        }} 
      />
    </div>
  );
};

export default ObsidianBackground;
