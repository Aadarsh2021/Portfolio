import React, { useRef, useState, useEffect } from 'react';

interface NetflixRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const NetflixRow: React.FC<NetflixRowProps> = ({ title, subtitle, children }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (track) track.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = direction === 'left' ? -680 : 680;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="netflix-row">
      <div className="netflix-row-header">
        <h3 className="netflix-row-title">{title}</h3>
        {subtitle && <span className="netflix-explore-all">{subtitle}</span>}
      </div>

      <div className="netflix-slider-wrapper">
        {canScrollLeft && (
          <button
            className="netflix-slider-arrow left"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            type="button"
            title="Scroll Left"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className="netflix-slider-track" ref={trackRef}>
          {children}
        </div>

        {canScrollRight && (
          <button
            className="netflix-slider-arrow right"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            type="button"
            title="Scroll Right"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NetflixRow;