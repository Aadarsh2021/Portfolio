import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface BentoNavbarProps {
  onToggleMode: () => void;
}

const BentoNavbar: React.FC<BentoNavbarProps> = ({ onToggleMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bento-navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Brand Identity */}
      <a href="#home" className="bento-brand">
        <img
          src="/assets/profile.png"
          alt="Aadarsh Thakur"
          className="bento-brand-avatar"
        />
        <div className="bento-brand-text">
          <span className="bento-brand-name">
            Aadarsh <span style={{ color: '#60a5fa' }}>Thakur</span>
          </span>
          <span className="bento-brand-role">
            Full Stack Developer
          </span>
        </div>
      </a>

      {/* Nav Links (Desktop) */}
      <nav className="bento-nav-links">
        <a href="#about" className="bento-nav-link">About</a>
        <a href="#projects" className="bento-nav-link">Projects</a>
        <a href="#skills" className="bento-nav-link">Skills</a>
        <a href="#experience" className="bento-nav-link">Experience</a>
        <a href="#blog" className="bento-nav-link">Blog</a>
        <a href="#contact" className="bento-nav-link">Contact</a>
      </nav>

      {/* Actions: Netflix Toggle & Theme Toggle */}
      <div className="bento-nav-actions">
        <button
          onClick={onToggleMode}
          type="button"
          className="bento-netflix-toggle"
          title="Switch to Cinematic OTT View"
        >
          <span>🍿</span>
          <span className="bento-netflix-toggle-text-full">Switch to Cinematic UI</span>
          <span className="bento-netflix-toggle-text-short">Cinematic</span>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default BentoNavbar;
