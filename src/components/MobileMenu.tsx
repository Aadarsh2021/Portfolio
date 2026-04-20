import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import ReviewGiver from './ReviewGiver';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]');
      let current = 'home';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
          current = section.getAttribute('id') || 'home';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <div className="mobile-island-container">
        <motion.div 
          className="mobile-island-trigger"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Theme Toggle Part */}
          <div className="island-part theme-part px-3">
            <ThemeToggle />
          </div>

          <div className="island-divider" />

          <div className="island-part review-part px-3">
            <ReviewGiver />
          </div>

          <div className="island-divider" />

          {/* Menu Trigger Part */}
          <div className="island-part menu-part px-3" onClick={toggleMenu}>
            <div className="hamburger-box">
              <motion.span 
                className="hamburger-line" 
                animate={{ 
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                  width: '100%'
                }}
              />
              <motion.span 
                className="hamburger-line" 
                animate={{ 
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 20 : 0
                }}
              />
              <motion.span 
                className="hamburger-line" 
                animate={{ 
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0
                }}
              />
            </div>
            <span className="menu-text font-bold text-xs tracking-widest uppercase">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="mobile-overlay-menu"
          >
            <nav className="mobile-nav-list">
              {navItems.map((item, idx) => (
                <motion.li 
                  key={item.href} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;