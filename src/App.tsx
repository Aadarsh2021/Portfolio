import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsGithub, 
  BsLinkedin, 
  BsEnvelope, 
  BsFileEarmarkText
} from 'react-icons/bs';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import './styles/animations.css';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'projects', 'certifications', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Aadarsh_Thakur_Resume.pdf';
    link.download = 'Aadarsh_Thakur_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  return (
    <div className="app">
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}
      >
        <Container>
          <Navbar.Brand href="#hero" className="brand-text">
            AT
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-0"
          >
            <div className={`navbar-toggler-icon ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                href="#hero" 
                className={activeSection === 'hero' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Nav.Link>
              <Nav.Link 
                href="#experience" 
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Nav.Link>
              <Nav.Link 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Nav.Link>
              <Nav.Link 
                href="#certifications" 
                className={activeSection === 'certifications' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Certifications
              </Nav.Link>
              <Nav.Link 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <Row className="align-items-center">
            <Col lg={8}>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Aadarsh Thakur
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Final Year Computer Science Engineering Student
              </motion.p>
              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button 
                  variant="gradient" 
                  className="btn-gradient"
                  onClick={handleDownloadResume}
                >
                  {renderIcon(BsFileEarmarkText, 20, "me-2")}
                  Download Resume
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-outline"
                  onClick={handleContactMe}
                >
                  {renderIcon(BsEnvelope, 20, "me-2")}
                  Contact Me
                </Button>
              </motion.div>
              <motion.div 
                className="social-links mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a 
                  href="https://github.com/Aadarsh2021" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {renderIcon(BsGithub, 24)}
                </a>
                <a 
                  href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {renderIcon(BsLinkedin, 24)}
                </a>
              </motion.div>
            </Col>
            <Col lg={4}>
              <motion.div 
                className="profile-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <img 
                  src="/assets/profile.jpg" 
                  alt="Aadarsh Thakur" 
                  className="profile-image"
                  loading="lazy"
                  width="380"
                  height="480"
                />
              </motion.div>
            </Col>
          </Row>
      </div>
      </section>

      <AnimatePresence>
        <motion.section 
          key="about"
          id="about" 
          className="about-section section-padding"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <About />
        </motion.section>

        <motion.section 
          key="experience"
          id="experience" 
          className="experience-section section-padding"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Experience />
        </motion.section>

        <motion.section 
          key="projects"
          id="projects" 
          className="projects-section section-padding"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Projects />
        </motion.section>

        <motion.section 
          key="certifications"
          id="certifications" 
          className="certifications-section section-padding"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Certifications />
        </motion.section>

        <motion.section 
          key="contact"
          id="contact" 
          className="contact-section section-padding"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Contact />
        </motion.section>
      </AnimatePresence>
      </div>
  );
};

export default App;
