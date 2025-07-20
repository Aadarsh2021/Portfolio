import React, { useState, useEffect, Suspense } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
// import Projects from './components/Projects';
import AdvancedProjects from './components/AdvancedProjects';
import Certifications from './components/Certifications';
import EnhancedContact from './components/EnhancedContact';
import EnhancedSkills from './components/EnhancedSkills';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import ParticleBackground from './components/ParticleBackground';
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
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
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
      
      setIsLowPerformance(isSlowConnection || hasLowMemory || isMobileDevice);
      
      // Add performance class to body
      if (isLowPerformance) {
        document.body.classList.add('reduced-motion');
        document.body.classList.add('performance-mode');
      }
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    
    return () => {
      window.removeEventListener('resize', checkPerformance);
    };
  }, [isLowPerformance]);

  useEffect(() => {
    // Track initial page view
    trackPageView('portfolio-home');
    announce('Portfolio loaded successfully');
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'testimonials', 'contact'];
      
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

  // Effect to handle menu state changes
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.navbar-custom') && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

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
              <div className="app" id="main-content">
        {/* Left Sidebar Navigation */}
        <motion.nav 
          className={`sidebar-navigation ${isMenuOpen ? 'open' : ''}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

        {/* Sidebar Toggle Button for Mobile */}
        <motion.button
          className="sidebar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          aria-label="Toggle sidebar navigation"
        >
          {isMenuOpen ? '✕' : '☰'}
        </motion.button>

        {/* Main Content */}
        <div className="main-content" style={{ marginLeft: '280px' }}>
                     {/* Header - Only AT, Analytics, and Theme Toggle */}
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
               left: '280px',
               right: 0
             }}
           >
            <style>
              {`
              .navbar-custom {
                  padding: 1rem 0;
                transition: all 0.3s ease;
              }
              
              .navbar-custom.scrolled {
                  padding: 0.5rem 0;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .brand-text {
                  font-size: 1.5rem;
                  font-weight: 700;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-decoration: none;
                }

                .header-controls {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                }

                .analytics-btn {
                  background: linear-gradient(135deg, var(--primary), var(--secondary));
                  border: none;
                  color: white;
                  padding: 0.5rem 1rem;
                border-radius: 8px;
                  font-weight: 600;
                transition: all 0.3s ease;
                  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
                }

                .analytics-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
                }

                                 .header-name {
                   position: relative;
                   overflow: hidden;
                 }
                 
                 .header-name::after {
                   content: '';
                   position: absolute;
                   bottom: -2px;
                   left: 0;
                   width: 0;
                   height: 2px;
                   background: linear-gradient(135deg, var(--primary), var(--secondary));
                   transition: width 0.3s ease;
                 }
                 
                 .header-name:hover::after {
                   width: 100%;
                 }
                 
                 @media (max-width: 1200px) {
                   .navbar-custom {
                     margin-left: 0;
                  left: 0 !important;
                  right: 0 !important;
                   }
                   
                   .header-name {
                  font-size: 1rem !important;
                   }
                 }
                 
                 @media (max-width: 768px) {
                   .header-name {
                     display: none;
                }
              }
            `}
          </style>
          <Container>
               <div className="d-flex justify-content-between align-items-center w-100">
                 <div className="d-flex align-items-center">
                   <Navbar.Brand href="#hero" className="brand-text me-3">
              AT
            </Navbar.Brand>
                   <a 
                     href="#hero" 
                     className="header-name"
                     style={{
                       textDecoration: 'none',
                       color: 'var(--text-primary)',
                       fontWeight: 600,
                       fontSize: '1.1rem',
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'var(--primary)';
                       e.currentTarget.style.transform = 'translateY(-2px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'var(--text-primary)';
                       e.currentTarget.style.transform = 'translateY(0)';
                     }}
                   >
                     Aadarsh Thakur
                   </a>
                 </div>
                 <div className="header-controls">
                <button
                  onClick={() => setIsAnalyticsModalOpen(true)}
                     className="analytics-btn d-none d-md-block"
                  title="View Analytics Dashboard"
                >
                  📊 Analytics
                </button>
                <ThemeToggle />
              </div>
                  </div>
          </Container>
          </motion.nav>

        <AnimatePresence mode="wait">
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
              style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                paddingTop: '80px' // Account for fixed navbar
              }}
            >
              <Suspense fallback={<div className="loading-placeholder" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
                <Hero onDownloadResume={handleDownloadResume} onContactMe={handleContactMe} />
              </Suspense>
              {!isLowPerformance && <ParticleBackground />}
            </motion.section>
        </ErrorBoundary>

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
              transition={{ duration: isLowPerformance ? 0.3 : 0.8 }}
            >
              <Suspense fallback={<div className="loading-placeholder" style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
              <About />
              </Suspense>
            </motion.section>
          </ErrorBoundary>

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
              <EnhancedSkills />
            </motion.section>
          </ErrorBoundary>

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
              <AdvancedProjects />
            </motion.section>
          </ErrorBoundary>





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
              <Certifications />
            </motion.section>
          </ErrorBoundary>

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
              <Blog />
            </motion.section>
          </ErrorBoundary>

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
              <Testimonials />
            </motion.section>
          </ErrorBoundary>

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
        </ErrorBoundary>
        
        <ScrollToTop />
          
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
