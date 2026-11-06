import React, { useState, useEffect } from 'react';

interface NetflixNavbarProps {
  onToggleMode: () => void;
  isNetflixMode: boolean;
  onOpenCommandPalette?: () => void;
}

const NetflixNavbar: React.FC<NetflixNavbarProps> = ({ onToggleMode, isNetflixMode, onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`netflix-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="netflix-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="netflix-brand-logo">AADARSH</span>
        <span className="netflix-brand-badge">PORTFOLIO</span>
      </div>

      <ul className="netflix-nav-links">
        <li>
          <a href="#home" className="netflix-nav-link active">Home</a>
        </li>
        <li>
          <a href="#projects" className="netflix-nav-link">Projects</a>
        </li>
        <li>
          <a href="#experience" className="netflix-nav-link">Timeline</a>
        </li>
        <li>
          <a href="#skills" className="netflix-nav-link">Skills</a>
        </li>
        <li>
          <a href="#certifications" className="netflix-nav-link">Patents &amp; Awards</a>
        </li>
        <li>
          <a href="#contact" className="netflix-nav-link">Contact</a>
        </li>
      </ul>

      <div className="netflix-nav-actions">
        {onOpenCommandPalette && (
          <button
            className="netflix-search-trigger"
            onClick={onOpenCommandPalette}
            title="Search projects, skills & patents (Ctrl + K / ⌘K)"
            type="button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="netflix-search-kbd">⌘K</span>
          </button>
        )}

        <button
          className="netflix-mode-toggle"
          onClick={onToggleMode}
          title="Switch between Cinematic OTT & Bento Grid view"
          type="button"
        >
          <span>&#9889;</span>
          <span className="netflix-toggle-label-full">{isNetflixMode ? 'Switch to Bento Grid' : 'Switch to Cinematic UI'}</span>
          <span className="netflix-toggle-label-short">{isNetflixMode ? 'Bento' : 'Cinematic'}</span>
        </button>

        <a
          href="https://github.com/Aadarsh2021"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          title="Aadarsh Thakur - GitHub Profile"
        >
          <img
            src="/assets/profile.webp"
            alt="Aadarsh Thakur"
            width={38}
            height={38}
            loading="eager"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: '2px solid var(--netflix-red)',
              boxShadow: '0 2px 10px var(--netflix-red-glow)',
              transition: 'transform 0.2s ease',
              display: 'block'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>
      </div>
    </nav>
  );
};

export default NetflixNavbar;