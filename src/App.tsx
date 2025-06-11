import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
// import Projects from './components/Projects';
import AdvancedProjects from './components/AdvancedProjects';
import Certifications from './components/Certifications';
import EnhancedContact from './components/EnhancedContact';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import EnhancedSkills from './components/EnhancedSkills';
import ScrollToTop from './components/ScrollToTop';
import SocialLinks from './components/SocialLinks';
import ResumeDownload from './components/ResumeDownload';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SEOHead from './components/SEOHead';
import AdvancedDashboard from './components/AdvancedDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { NotificationProvider } from './components/NotificationSystem';
import { PageTransition } from './components/LoadingSystem';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAnalytics } from './hooks/useAnalytics';
import { useAccessibility } from './hooks/useAccessibility';
import './styles/animations.css';
import './styles/themes.css';
import './styles/perfect-portfolio.css';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  
  // Advanced hooks
  const { trackPageView, trackUserInteraction } = useAnalytics();
  const { announce } = useAccessibility();

  useEffect(() => {
    // Track initial page view
    trackPageView('portfolio-home');
    announce('Portfolio loaded successfully');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'projects', 'certifications', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            if (activeSection !== section) {
            setActiveSection(section);
              trackPageView(`section-${section}`);
              announce(`Navigated to ${section} section`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackPageView, announce, activeSection]);

  const handleDownloadResume = () => {
    trackUserInteraction('resume-download', 'click');
    announce('Downloading resume');
    
    const link = document.createElement('a');
    link.href = '/assets/Aadarsh_Thakur_Resume.pdf';
    link.download = 'Aadarsh_Thakur_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactMe = () => {
    trackUserInteraction('contact-button', 'click');
    announce('Navigating to contact section');
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <SEOHead />
          <PageTransition>
            <div className="app" id="main-content">
        <Navbar 
          expand="lg" 
          fixed="top" 
          className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}
        >
          <Container>
            <Navbar.Brand href="#hero" className="brand-text">
              AT
            </Navbar.Brand>
              <div className="d-flex align-items-center">
                <button
                  onClick={() => setIsDashboardOpen(true)}
                  className="btn btn-outline-primary me-2 d-none d-md-block"
                  title="Open Analytics Dashboard"
                >
                  📊
                </button>
                <ThemeToggle />
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="border-0 ms-2"
            >
              <div className={`navbar-toggler-icon ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Navbar.Toggle>
              </div>
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

        <ErrorBoundary fallback={
          <div className="hero-section d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h2>Unable to load hero section</h2>
              <p>Please refresh the page</p>
            </div>
          </div>
        }>
          <Hero 
            onDownloadResume={handleDownloadResume}
            onContactMe={handleContactMe}
          />
        </ErrorBoundary>

        <AnimatePresence>
          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load about section</h3>
            </div>
          }>
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
              <div className="mt-5">
                <ResumeDownload />
              </div>
            </motion.section>
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load experience section</h3>
            </div>
          }>
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
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load skills section</h3>
            </div>
          }>
            <motion.section 
              key="skills"
              id="skills" 
              className="skills-section section-padding"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EnhancedSkills />
            </motion.section>
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load projects section</h3>
            </div>
          }>
            <motion.section 
              key="projects"
              id="projects" 
              className="projects-section section-padding"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AdvancedProjects />
            </motion.section>
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load testimonials section</h3>
            </div>
          }>
            <motion.section 
              key="testimonials"
              id="testimonials" 
              className="testimonials-section section-padding"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Testimonials />
            </motion.section>
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load blog section</h3>
            </div>
          }>
            <motion.section 
              key="blog"
              id="blog" 
              className="blog-section section-padding"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Blog />
            </motion.section>
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load certifications section</h3>
            </div>
          }>
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
          </ErrorBoundary>

          <ErrorBoundary fallback={
            <div className="section-padding text-center">
              <h3>Unable to load contact section</h3>
            </div>
          }>
            <motion.section 
              key="contact"
              id="contact" 
              className="contact-section section-padding"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <EnhancedContact />
            </motion.section>
          </ErrorBoundary>
        </AnimatePresence>
        
        <ErrorBoundary fallback={
          <div className="text-center p-4">
            <small>Footer unavailable</small>
          </div>
        }>
          <Footer />
          <div className="py-4">
            <SocialLinks />
          </div>
        </ErrorBoundary>
        
        <ScrollToTop />
        </div>
          </PageTransition>
          
          <ErrorBoundary fallback={null}>
            <AdvancedDashboard 
              isVisible={isDashboardOpen}
              onClose={() => setIsDashboardOpen(false)}
            />
          </ErrorBoundary>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
