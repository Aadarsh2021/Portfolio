import React from 'react';
import ThemeToggle from './ThemeToggle';

interface MobileNavbarProps {
  onMenuClick: () => void;
  isScrolled: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onMenuClick, isScrolled }) => {
  return (
    <nav className={`navbar-mobile ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <button 
          className="menu-button" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <a href="#hero" className="brand">
          <div className="brand-logo">AT</div>
        </a>

        <div className="actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;