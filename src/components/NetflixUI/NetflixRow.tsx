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

  const handleScrollClick = (e: React.MouseEvent, direction: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
    scroll(direction);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="netflix-row">
      <div className="netflix-row-header">
        <h2 className="netflix-row-title">{title}</h2>
        {subtitle && <span className="netflix-explore-all">{subtitle}</span>}
      </div>

      <div className="netflix-slider-wrapper">
        <div className="netflix-slider-track" ref={trackRef}>
          {children}
        </div>

        <button
          className={`netflix-slider-arrow left ${canScrollLeft ? 'visible' : 'disabled'}`}
          onClick={(e) => handleScrollClick(e, 'left')}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onPointerDown={handlePointerDown}
          aria-label="Scroll Left"
          type="button"
          title="Scroll Left"
          tabIndex={canScrollLeft ? 0 : -1}
          disabled={!canScrollLeft}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className={`netflix-slider-arrow right ${canScrollRight ? 'visible' : 'disabled'}`}
          onClick={(e) => handleScrollClick(e, 'right')}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onPointerDown={handlePointerDown}
          aria-label="Scroll Right"
          type="button"
          title="Scroll Right"
          tabIndex={canScrollRight ? 0 : -1}
          disabled={!canScrollRight}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NetflixRow;