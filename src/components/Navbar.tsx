import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      style={{
        backgroundColor,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      className="navbar-wrapper fixed-top"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <Navbar
          expand="lg"
          className={`py-3 ${isScrolled ? 'scrolled' : ''}`}
        >
          <motion.div
            variants={itemVariants}
            className="navbar-brand"
          >
            <a href="#home" className="text-decoration-none">
              <h3 className="text-primary fw-bold mb-0">Your Name</h3>
            </a>
          </motion.div>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-0"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="hamburger"
            >
              <span></span>
              <span></span>
              <span></span>
            </motion.div>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Nav.Link
                    href={link.href}
                    className={`nav-link ${isScrolled ? 'scrolled' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </motion.div>
  );
};

export default Navigation; 