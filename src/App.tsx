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


import EnhancedSkills from './components/EnhancedSkills';
import ParticleBackground from './components/ParticleBackground';
import AnalyticsModal from './components/AnalyticsModal';
import ScrollToTop from './components/ScrollToTop';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SEOHead from './components/SEOHead';
import AdvancedDashboard from './components/AdvancedDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { NotificationProvider } from './components/NotificationSystem';
import { PageTransition } from './components/LoadingSystem';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAnalytics } from './hooks/useAnalytics';
import MobileEnhancer from './components/MobileEnhancer';
import { useAccessibility } from './hooks/useAccessibility';
import './styles/animations.css';
import './styles/themes.css';
import './styles/perfect-portfolio.css';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  
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

  const handleDownloadResume = async () => {
    trackUserInteraction('resume-download', 'click');
    announce('Downloading resume');
    
    try {
      // First try to fetch the file to ensure it exists
      const response = await fetch('/assets/Aadarsh_new_resume.pdf');
      if (!response.ok) {
        throw new Error('Resume file not found');
      }
      
      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Aadarsh_Thakur_Resume.pdf';
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      console.log('Resume download initiated successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback: open in new tab
      window.open('/assets/Aadarsh_new_resume.pdf', '_blank');
    }
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
          <MobileEnhancer>
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
                  onClick={() => setIsAnalyticsModalOpen(true)}
                  className="btn btn-outline-primary me-2 d-none d-md-block"
                  title="View Analytics Dashboard"
                >
                  📊 Analytics
                </button>
                <ThemeToggle />
                {/* <button
                  onClick={() => setIsDashboardOpen(true)}
                  className="btn btn-outline-primary me-2 d-none d-md-block"
                  title="Open Analytics Dashboard"
                >
                  📊
                </button> */}
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
          <div style={{ position: 'relative' }}>
            <ParticleBackground />
            <Hero 
              onDownloadResume={handleDownloadResume}
              onContactMe={handleContactMe}
            />
          </div>
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
        
        {/* Mobile Analytics Button */}
        <button
          className="mobile-analytics-btn d-md-none"
          onClick={() => setIsAnalyticsModalOpen(true)}
          title="View Analytics"
        >
          📊
        </button>
        </div>
            </PageTransition>
          </MobileEnhancer>
          
          <ErrorBoundary fallback={null}>
            <AdvancedDashboard 
              isVisible={isDashboardOpen}
              onClose={() => setIsDashboardOpen(false)}
            />
          </ErrorBoundary>

          <ErrorBoundary fallback={null}>
            <AnalyticsModal
              isOpen={isAnalyticsModalOpen}
              onClose={() => setIsAnalyticsModalOpen(false)}
            />
          </ErrorBoundary>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
