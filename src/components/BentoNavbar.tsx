import React, { useState, useEffect } from 'react';

interface BentoNavbarProps {
  onToggleMode: () => void;
  onOpenCommandPalette?: () => void;
}

const BentoNavbar: React.FC<BentoNavbarProps> = ({ onToggleMode, onOpenCommandPalette }) => {
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
          src="/assets/profile.webp"
          alt="Aadarsh Thakur"
          width={36}
          height={36}
          className="bento-brand-avatar"
        />
        <div className="bento-brand-text">
          <span className="bento-brand-name">
            Aadarsh <span style={{ color: 'var(--primary, #4f46e5)' }}>Thakur</span>
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

      {/* Actions: Command Palette & Dark Mode Toggle */}
      <div className="bento-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="bento-search-btn"
            title="Search commands (Ctrl+K)"
            aria-label="Open Command Menu"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '6px 12px',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: '10px', background: 'var(--border-luminous)', padding: '1px 5px', borderRadius: '3px' }}>⌘K</span>
          </button>
        )}

        <button
          onClick={onToggleMode}
          type="button"
          className="bento-theme-toggle-btn"
          title="Switch to Dark Mode (Cinematic View)"
          aria-label="Switch to Dark Mode"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '7px 16px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-premium)',
            transition: 'all 0.25s ease'
          }}
        >
          <span>🌙</span>
          <span className="bento-toggle-label-full">Dark Mode</span>
          <span className="bento-toggle-label-short" style={{ display: 'none' }}>Dark</span>
        </button>
      </div>
    </header>
  );
};

export default BentoNavbar;
