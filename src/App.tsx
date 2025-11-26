import React, { useState, useEffect, Suspense } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import AnalyticsModal from './components/AnalyticsModal';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SEOHead from './components/SEOHead';
import AdvancedDashboard from './components/AdvancedDashboard';
import { NotificationProvider } from './components/NotificationSystem';
import { PageTransition } from './components/LoadingSystem';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAnalytics } from './hooks/useAnalytics';
import MobileEnhancer from './components/MobileEnhancer';
import { useAccessibility } from './hooks/useAccessibility';
import './styles/animations.css';
import './styles/themes.css';
import './styles/perfect-portfolio.css';
import './styles/mobile-menu.css';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';
import MobileMenu from './components/MobileMenu';

const AdvancedProjects = React.lazy(() => import('./components/AdvancedProjects'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const EnhancedContact = React.lazy(() => import('./components/EnhancedContact'));
const EnhancedSkills = React.lazy(() => import('./components/EnhancedSkills'));
const Blog = React.lazy(() => import('./components/Blog'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'));

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991.98);
  
  // Advanced hooks
  const { trackPageView, trackUserInteraction } = useAnalytics();
  const { announce } = useAccessibility();

  // Performance detection
  useEffect(() => {
    const checkPerformance = () => {
      const isMobileDevice = window.innerWidth <= 768;
      const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                              (navigator as any).connection?.effectiveType === '2g';
      const hasLowMemory = (navigator as any).deviceMemory < 4;
      
      const shouldBeLowPerformance = isSlowConnection || hasLowMemory || isMobileDevice;
      setIsLowPerformance(shouldBeLowPerformance);
      
      // Add performance class to body
      if (shouldBeLowPerformance) {
        document.body.classList.add('reduced-motion');
        document.body.classList.add('performance-mode');
      } else {
        document.body.classList.remove('reduced-motion');
        document.body.classList.remove('performance-mode');
      }
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    
    return () => {
      window.removeEventListener('resize', checkPerformance);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991.98);
      if (window.innerWidth > 991.98) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update the click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const sidebarNav = document.querySelector('.sidebar-navigation');
      const menuButton = document.querySelector('.sidebar-toggle');

      // Check if click is outside both sidebar and menu button
      if (
        isMobile && 
        isMenuOpen && 
        !sidebarNav?.contains(target) && 
        !menuButton?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add click event listener to document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key handler
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobile, isMenuOpen]);

  // Handle body scroll lock when menu is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMenuOpen]);

  useEffect(() => {
    // Track initial page view
    trackPageView('portfolio-home');
    announce('Portfolio loaded successfully');
  }, [trackPageView, announce]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the detection area to be more accurate
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(prevSection => {
              if (prevSection !== section) {
                trackPageView(`section-${section}`);
                announce(`Navigated to ${section} section`);
                return section;
              }
              return prevSection;
            });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackPageView, announce]);

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

  // Add click handler to sidebar links
  const handleSidebarLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <ErrorBoundary fallback={
      <div className="error-boundary-root">
        <h2>Something went wrong with the application</h2>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    }>
      <ThemeProvider>
        <NotificationProvider>
          <SEOHead />
          <MobileEnhancer>
            <PageTransition>
              <div className="app">
                {/* Sidebar Navigation */}
                <motion.nav 
                  className={`sidebar-navigation ${isMenuOpen ? 'open' : ''}`}
                  initial={false}
                  animate={{
                    x: isMobile ? (isMenuOpen ? 0 : -280) : 0,
                    opacity: 1
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    width: '280px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid var(--glass-border)',
                    zIndex: 1000,
                    padding: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <style>
                    {`
                      .sidebar-navigation {
                        transition: all 0.3s ease;
                      }
                      
                      .sidebar-nav-link {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        color: var(--text-primary);
                        text-decoration: none;
                        font-weight: 500;
                          transition: all 0.3s ease;
                        border: 1px solid transparent;
                        background: transparent;
                          position: relative;
                          overflow: hidden;
                      }
                      
                      .sidebar-nav-link:hover {
                        background: var(--primary);
                        color: white;
                        transform: translateX(8px);
                        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
                      }
                      
                      .sidebar-nav-link.active {
                        background: var(--primary);
                        color: white;
                        border-color: var(--secondary);
                        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
                      }
                      
                      .sidebar-nav-link::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 4px;
                        background: var(--primary);
                        transform: scaleY(0);
                        transition: transform 0.3s ease;
                      }
                      
                      .sidebar-nav-link:hover::before,
                      .sidebar-nav-link.active::before {
                        transform: scaleY(1);
                      }
                      
                      .sidebar-nav-icon {
                        font-size: 1.5rem;
                        min-width: 24px;
                        text-align: center;
                      }
                      
                      .sidebar-nav-text {
                        font-size: 1rem;
                        font-weight: 600;
                      }
                      
                      .sidebar-toggle {
                        position: fixed;
                        left: 20px;
                        top: 20px;
                        z-index: 1001;
                        background: var(--glass-bg);
                        border: 1px solid var(--glass-border);
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        backdrop-filter: blur(20px);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        transition: all 0.3s ease;
                      }
                      
                      .sidebar-toggle:hover {
                        background: var(--primary);
                        color: white;
                        transform: scale(1.1);
                      }
                      
                      @media (max-width: 1200px) {
                        .sidebar-navigation {
                          transform: translateX(-100%);
                          transition: transform 0.3s ease;
                        }
                        
                        .sidebar-navigation.open {
                          transform: translateX(0);
                        }
                        
                        .sidebar-toggle {
                          display: flex;
                        }
                        
                        .main-content {
                          margin-left: 0 !important;
                        }
                      }
                      
                      @media (min-width: 1201px) {
                        .main-content {
                          margin-left: 280px !important;
                        }
                      }
                      
                      .sidebar-header {
                        text-align: center;
                        padding-bottom: 2rem;
                        border-bottom: 1px solid var(--glass-border);
                        margin-bottom: 2rem;
                      }
                      
                      .sidebar-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 0.5rem;
                      }
                      
                      .sidebar-subtitle {
                        font-size: 0.875rem;
                        color: var(--text-secondary);
                        opacity: 0.8;
                      }
                    `}
                  </style>
                  
                  <div className="sidebar-header">
                    <div className="sidebar-title">Portfolio</div>
                    <div className="sidebar-subtitle">Navigation Menu</div>
                  </div>
                  
                  <a 
                    href="#hero" 
                    className={`sidebar-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Home section"
                  >
                    <span className="sidebar-nav-icon">🏠</span>
                    <span className="sidebar-nav-text">Home</span>
                  </a>
                  
                  <a 
                    href="#about" 
                    className={`sidebar-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to About section"
                  >
                    <span className="sidebar-nav-icon">👤</span>
                    <span className="sidebar-nav-text">About</span>
                  </a>
                  
                  <a 
                    href="#experience" 
                    className={`sidebar-nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Experience section"
                  >
                    <span className="sidebar-nav-icon">💼</span>
                    <span className="sidebar-nav-text">Experience</span>
                  </a>
                  
                  <a 
                    href="#skills" 
                    className={`sidebar-nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Skills section"
                  >
                    <span className="sidebar-nav-icon">⚡</span>
                    <span className="sidebar-nav-text">Skills</span>
                  </a>
                  
                  <a 
                    href="#projects" 
                    className={`sidebar-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Projects section"
                  >
                    <span className="sidebar-nav-icon">🚀</span>
                    <span className="sidebar-nav-text">Projects</span>
                  </a>
                  
                  <a 
                    href="#certifications" 
                    className={`sidebar-nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Certifications section"
                  >
                    <span className="sidebar-nav-icon">🏆</span>
                    <span className="sidebar-nav-text">Certifications</span>
                  </a>
                  
                  <a 
                    href="#blog" 
                    className={`sidebar-nav-link ${activeSection === 'blog' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Blog section"
                  >
                    <span className="sidebar-nav-icon">📝</span>
                    <span className="sidebar-nav-text">Blog</span>
                  </a>
                  
                  <a 
                    href="#testimonials" 
                    className={`sidebar-nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Testimonials section"
                  >
                    <span className="sidebar-nav-icon">💬</span>
                    <span className="sidebar-nav-text">Testimonials</span>
                  </a>
                  
                  
                  <a 
                    href="#contact" 
                    className={`sidebar-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                    onClick={() => {
                      handleSidebarLinkClick();
                      if ('vibrate' in navigator) {
                        navigator.vibrate(50);
                      }
                    }}
                    aria-label="Navigate to Contact section"
                  >
                    <span className="sidebar-nav-icon">📧</span>
                    <span className="sidebar-nav-text">Contact</span>
                  </a>
                </motion.nav>

                {/* Main Content */}
                <div className={`main-content ${isMobile ? 'mobile' : ''}`}>
                  {/* Header */}
                  <motion.nav 
                    className="navbar navbar-expand-lg navbar-custom fixed-top"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: isScrolled ? 'var(--glass-bg)' : 'transparent',
                      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                      borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
                      transition: 'all 0.3s ease',
                      zIndex: 999,
                      left: isMobile ? '0' : '280px',
                      right: 0,
                      padding: '1rem',
                      width: isMobile ? '100%' : 'calc(100% - 280px)'
                    }}
                  >
                    <Container className="d-flex align-items-center justify-content-between px-3 position-relative">
                      {/* Left Section - Hamburger Menu */}
                      {isMobile && (
                        <button
                          className="sidebar-toggle"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                          {isMenuOpen ? '✕' : '☰'}
                        </button>
                      )}

                      {/* Center Logo */}
                      <div className={`header-center position-absolute start-50 translate-middle-x ${isMobile ? 'mobile-center' : ''}`}>
                        <Navbar.Brand href="#hero" className="brand-text d-flex align-items-center">
                          <div className="brand-logo-container">
                            <span className="brand-logo">AT</span>
                          </div>
                        </Navbar.Brand>
                      </div>

                      {/* Right Section */}
                      <div className="header-right d-flex align-items-center">
                        <button
                          onClick={() => setIsAnalyticsModalOpen(true)}
                          className="analytics-btn d-none d-md-flex align-items-center me-3"
                          title="View Analytics Dashboard"
                        >
                          <span className="analytics-icon me-2">📊</span>
                          <span className="analytics-text">Analytics</span>
                        </button>
                        <ThemeToggle />
                      </div>
                    </Container>
                  </motion.nav>

                  {/* Main Content Sections */}
                  <AnimatePresence>
                    {/* Hero Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load hero section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
                      </div>
                    }>
                      <motion.section 
                        key="hero"
                        id="hero" 
                        className="hero-section section-padding"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: isLowPerformance ? 0.3 : 0.8 }}
                      >
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <Hero onDownloadResume={handleDownloadResume} onContactMe={handleContactMe} />
                        </Suspense>
                        {!isLowPerformance && (
                          <Suspense fallback={null}>
                            <ParticleBackground />
                          </Suspense>
                        )}
                      </motion.section>
                    </ErrorBoundary>

                    {/* About Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load about section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder" style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
                        <About />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>

                    {/* Experience Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load experience section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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

                    {/* Skills Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load skills section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <EnhancedSkills />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>

                    {/* Projects Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load projects section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <AdvancedProjects />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>





                    {/* Certifications Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load certifications section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <Certifications />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>

                    {/* Blog Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load blog section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <Blog />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>

                    {/* Testimonials Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load testimonials section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <Testimonials />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>


                    {/* Contact Section */}
                    <ErrorBoundary fallback={
                      <div className="section-padding text-center">
                        <h3>Unable to load contact section</h3>
                        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                          Retry
                        </button>
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
                        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
                          <EnhancedContact />
                        </Suspense>
                      </motion.section>
                    </ErrorBoundary>
                  </AnimatePresence>
                </div>
                
                <ErrorBoundary fallback={
                  <div className="text-center p-4">
                    <small>Footer unavailable</small>
                  </div>
                }>
                  <Footer />
                </ErrorBoundary>
                
                <ScrollToTop />
                  
                  {isMobile && <MobileMenu />}
                  
                  <ErrorBoundary fallback={null}>
                    <AdvancedDashboard 
                      isVisible={isDashboardOpen}
                      onClose={() => setIsDashboardOpen(false)}
                    />
                  </ErrorBoundary>

                  <ErrorBoundary fallback={null}>
                    <AnalyticsModal
                    show={isAnalyticsModalOpen}
                    onHide={() => setIsAnalyticsModalOpen(false)}
                    />
                  </ErrorBoundary>
                </div>
              </PageTransition>
            </MobileEnhancer>
            <Analytics />
          </NotificationProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  };

  export default App;
