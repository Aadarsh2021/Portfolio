import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsLinkedin, BsEnvelopeFill } from 'react-icons/bs';

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
      <motion.div 
        layoutId="mobile-island"
        className="mobile-island-trigger md:hidden"
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ borderRadius: isOpen ? '0px' : '100px' }}
      >
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
        <span className="font-bold text-sm tracking-widest uppercase">
          {isOpen ? 'Close' : 'Menu'}
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="mobile-island"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="mobile-overlay-menu md:hidden"
            style={{ borderRadius: '0px' }}
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

            <motion.div className="mobile-menu-footer" variants={itemVariants}>
              <a href="https://github.com/Aadarsh2021" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                {React.createElement(BsGithub as any, { size: 32 })}
              </a>
              <a href="https://linkedin.com/in/aadarsh-thakur-1bbb29230/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                {React.createElement(BsLinkedin as any, { size: 32 })}
              </a>
              <a href="mailto:thakuraadarsh1@gmail.com" className="social-icon-link">
                {React.createElement(BsEnvelopeFill as any, { size: 32 })}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;