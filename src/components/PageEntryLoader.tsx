import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './PageEntryLoader.css';

interface PageEntryLoaderProps {
  onComplete: () => void;
}

const PageEntryLoader: React.FC<PageEntryLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power4.out"
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: "expo.inOut"
    }, "-=0.3")
    .to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power4.in"
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "expo.inOut"
    }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="entry-loader-container" ref={containerRef}>
      <div className="loader-content">
        <div className="loader-text-wrapper" ref={textRef} style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <span className="loader-brand">Aadarsh Thakur</span>
          <span className="loader-tagline">Elite Digital Experience</span>
        </div>
        <div className="loader-progress-bar">
          <div className="loader-progress-fill" ref={barRef} style={{ transform: 'scaleX(0)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageEntryLoader;
