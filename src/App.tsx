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
import './styles/mobile-responsive.css';
import { Analytics } from '@vercel/analytics/react';

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
        <Navbar 
          expand="lg" 
          fixed="top" 
          className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}
        >
          <style>
            {`
              @media (max-width: 768px) {
                .navbar-custom {
                  padding: 0.75rem 0 !important;
                  background: var(--nav-bg) !important;
                  backdrop-filter: blur(20px) !important;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                }
                
                .navbar-brand {
                  font-size: clamp(1.5rem, 4vw, 2rem) !important;
                  font-weight: 800 !important;
                }
                
                .navbar-toggler {
                  border: none !important;
                  padding: 0.5rem !important;
                  width: 44px !important;
                  height: 44px !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  border-radius: 8px !important;
                  background: var(--glass-bg) !important;
                  transition: all 0.3s ease !important;
                  cursor: pointer !important;
                  position: relative !important;
                  overflow: hidden !important;
                }
                
                .navbar-toggler:focus {
                  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3) !important;
                  outline: none !important;
                }
                
                .navbar-toggler:hover {
                  transform: scale(1.05) !important;
                  background: var(--primary) !important;
                  color: white !important;
                }
                
                .navbar-toggler:active {
                  transform: scale(0.95) !important;
                  transition: all 0.1s ease !important;
                }
                
                .navbar-toggler-icon {
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                  background-repeat: no-repeat !important;
                  background-position: center !important;
                  background-size: 100% !important;
                  width: 1.5em !important;
                  height: 1.5em !important;
                  transition: all 0.3s ease !important;
                }
                
                /* Dark theme hamburger icon */
                [data-theme="dark"] .navbar-toggler-icon {
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                }
                
                /* Hover state hamburger icon */
                .navbar-toggler:hover .navbar-toggler-icon {
                  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                }
                
                .navbar-collapse {
                  background: var(--glass-bg) !important;
                  backdrop-filter: blur(20px) !important;
                  border-radius: 12px !important;
                  margin-top: 1rem !important;
                  padding: 1.5rem !important;
                  border: 1px solid var(--glass-border) !important;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
                  animation: slideDownFade 0.3s ease-out !important;
                }
                
                .navbar-collapse.show {
                  display: block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }
                
                .navbar-nav {
                  width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                
                .navbar-nav .nav-item {
                  width: 100% !important;
                  margin: 0 !important;
                }
                
                .nav-link {
                  color: var(--text-primary) !important;
                  font-weight: 600;
                  padding: 0.75rem 1.25rem !important;
                  margin: 0 0.25rem;
                  border-radius: 8px;
                  transition: all 0.3s ease;
                  position: relative;
                  text-decoration: none;
                  overflow: hidden;
                  display: flex !important;
                  align-items: center !important;
                  gap: 0.5rem !important;
                }
                
                .nav-link .nav-icon {
                  font-size: 1.1rem !important;
                  min-width: 20px !important;
                  text-align: center !important;
                }
                
                .nav-link .nav-text {
                  font-weight: 600 !important;
                  white-space: nowrap !important;
                }
                
                .nav-link:hover,
                .nav-link:focus {
                  background: var(--primary) !important;
                  color: white !important;
                  transform: translateX(5px) !important;
                  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
                }
                
                .nav-link.active {
                  background: var(--primary) !important;
                  color: white !important;
                  font-weight: 600 !important;
                }

                /* Ensure navigation links are visible */
                .navbar-nav .nav-link,
                .navbar-nav .nav-link-mobile {
                  display: flex !important;
                  align-items: center !important;
                  text-decoration: none !important;
                  color: var(--text-primary) !important;
                  background: transparent !important;
                  border: none !important;
                  outline: none !important;
                }
                
                /* Force text visibility */
                .nav-text {
                  display: inline-block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                  color: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                }

                /* Ensure mobile navigation header is visible when menu is open */
                .navbar-collapse.show .mobile-nav-header {
                  display: block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }
                
                .navbar-collapse.show .mobile-nav-indicator {
                  display: flex !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }
                
                .navbar-collapse.show .indicator-dot {
                  display: inline-block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }
                
                .navbar-collapse.show .indicator-text {
                  display: inline-block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }

                /* Mobile navigation enhancements */
                @media (max-width: 768px) {
                  .navbar-collapse {
                    animation: slideDownFade 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                  }
                  
                  .nav-link {
                    animation: slideInFromLeft 0.3s ease forwards !important;
                    opacity: 0 !important;
                    transform: translateX(-20px) !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    padding: 1rem 1.25rem !important;
                    margin: 0.5rem 0 !important;
                    border-radius: 12px !important;
                    background: var(--glass-bg) !important;
                    border: 1px solid var(--glass-border) !important;
                    backdrop-filter: blur(10px) !important;
                    gap: 0.75rem !important;
                    width: 100% !important;
                  }
                  
                  .nav-link .nav-icon {
                    font-size: 1.2rem !important;
                    min-width: 24px !important;
                    text-align: center !important;
                    flex-shrink: 0 !important;
                  }
                  
                  .nav-link .nav-text {
                    font-weight: 600 !important;
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    display: inline-block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                  }
                  
                  .nav-link:nth-child(1) { animation-delay: 0.1s !important; }
                  .nav-link:nth-child(2) { animation-delay: 0.15s !important; }
                  .nav-link:nth-child(3) { animation-delay: 0.2s !important; }
                  .nav-link:nth-child(4) { animation-delay: 0.25s !important; }
                  .nav-link:nth-child(5) { animation-delay: 0.3s !important; }
                  .nav-link:nth-child(6) { animation-delay: 0.35s !important; }
                  
                  /* Touch feedback for mobile */
                  .nav-link:active {
                    transform: translateX(5px) scale(0.96) !important;
                    transition: all 0.1s ease !important;
                  }
                  
                  /* Focus states for accessibility */
                  .nav-link:focus {
                    outline: 2px solid var(--primary) !important;
                    outline-offset: 2px !important;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
                  }
                  
                  /* Reduced motion support */
                  @media (prefers-reduced-motion: reduce) {
                    .nav-link {
                      animation: none !important;
                      opacity: 1 !important;
                      transform: none !important;
                    }
                    
                    .navbar-collapse {
                      animation: none !important;
                    }
                  }
                }
              }
              
              @media (max-width: 480px) {
                .navbar-custom {
                  padding: 0.5rem 0 !important;
                }
                
                .navbar-brand {
                  font-size: clamp(1.3rem, 3.5vw, 1.8rem) !important;
                }
                
                .navbar-toggler {
                  width: 40px !important;
                  height: 40px !important;
                }
                
                .navbar-collapse {
                  padding: 1.25rem !important;
                  margin-top: 0.75rem !important;
                }
                
                .nav-link {
                  padding: 0.6rem 0.8rem !important;
                  font-size: clamp(0.85rem, 2.2vw, 0.95rem) !important;
                }
                
                .navbar-custom .btn {
                  font-size: clamp(0.75rem, 2vw, 0.85rem) !important;
                  padding: 0.4rem 0.6rem !important;
                }
              }
              
              @media (max-width: 768px) {
                .navbar-collapse {
                  animation: slideDownFade 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .nav-link {
                  animation: slideInFromLeft 0.3s ease forwards !important;
                  opacity: 0 !important;
                  transform: translateX(-20px) !important;
                }
                
                .nav-link:nth-child(1) { animation-delay: 0.1s !important; }
                .nav-link:nth-child(2) { animation-delay: 0.15s !important; }
                .nav-link:nth-child(3) { animation-delay: 0.2s !important; }
                .nav-link:nth-child(4) { animation-delay: 0.25s !important; }
                .nav-link:nth-child(5) { animation-delay: 0.3s !important; }
                .nav-link:nth-child(6) { animation-delay: 0.35s !important; }
                
                /* Touch feedback for mobile */
                .nav-link:active {
                  transform: translateX(5px) scale(0.96) !important;
                  transition: all 0.1s ease !important;
                }
                
                /* Focus states for accessibility */
                .nav-link:focus {
                  outline: 2px solid var(--primary) !important;
                  outline-offset: 2px !important;
                  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
                }
                
                /* Reduced motion support */
                @media (prefers-reduced-motion: reduce) {
                  .nav-link {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }
                  
                  .navbar-collapse {
                    animation: none !important;
                  }
                }
              }
              
              @keyframes slideInFromLeft {
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              
              @keyframes slideDownFade {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              .navbar-custom {
                background: var(--nav-bg);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--nav-border);
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              
              .navbar-custom.scrolled {
                padding: 0.75rem 0;
                background: var(--nav-bg);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                border-bottom-color: var(--nav-border);
              }
              
              .navbar-brand {
                font-size: 1.75rem;
                font-weight: 800;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-decoration: none;
                transition: all 0.3s ease;
                position: relative;
              }
              
              .navbar-brand::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                transform: scaleX(0);
                transition: transform 0.3s ease;
              }
              
              .navbar-brand:hover::after {
                transform: scaleX(1);
              }
              
              .nav-link {
                color: var(--text-primary) !important;
                font-weight: 600;
                padding: 0.75rem 1.25rem !important;
                margin: 0 0.25rem;
                border-radius: 8px;
                transition: all 0.3s ease;
                position: relative;
                text-decoration: none;
                overflow: hidden;
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
              }
              
              .nav-link .nav-icon {
                font-size: 1.1rem !important;
                min-width: 20px !important;
                text-align: center !important;
              }
              
              .nav-link .nav-text {
                font-weight: 600 !important;
                white-space: nowrap !important;
              }
              
              .nav-link:hover,
              .nav-link:focus {
                background: var(--primary) !important;
                color: white !important;
                transform: translateX(5px) !important;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
              }
              
              .nav-link.active {
                background: var(--primary) !important;
                color: white !important;
                font-weight: 600 !important;
              }

              /* Ensure navigation links are visible */
              .navbar-nav .nav-link,
              .navbar-nav .nav-link-mobile {
                display: flex !important;
                align-items: center !important;
                text-decoration: none !important;
                color: var(--text-primary) !important;
                background: transparent !important;
                border: none !important;
                outline: none !important;
              }
              
              /* Force text visibility */
              .nav-text {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                color: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
              }

              /* Ensure mobile navigation header is visible when menu is open */
              .navbar-collapse.show .mobile-nav-header {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
              }
              
              .navbar-collapse.show .mobile-nav-indicator {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
              }
              
              .navbar-collapse.show .indicator-dot {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
              }
              
              .navbar-collapse.show .indicator-text {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
              }

              .navbar-custom .btn {
                font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
                padding: 0.5rem 0.75rem !important;
                min-height: 44px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              
              .d-flex.align-items-center {
                gap: 0.5rem !important;
              }

              /* Mobile navigation styles */
              @media (max-width: 991.98px) {
                .navbar-collapse {
                  position: absolute !important;
                  top: 100% !important;
                  left: 0 !important;
                  right: 0 !important;
                  background: var(--glass-bg) !important;
                  backdrop-filter: blur(10px) !important;
                  -webkit-backdrop-filter: blur(10px) !important;
                  border-radius: 12px !important;
                  margin: 0.5rem !important;
                  padding: 1rem !important;
                  border: 1px solid var(--glass-border) !important;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                  max-height: calc(100vh - 100px) !important;
                  overflow-y: auto !important;
                }

                .nav-link {
                  padding: 0.75rem 1rem !important;
                  margin: 0.25rem 0 !important;
                  border-radius: 8px !important;
                  transition: all 0.3s ease !important;
                }

                .nav-content {
                  display: flex !important;
                  align-items: center !important;
                  gap: 0.75rem !important;
                  width: 100% !important;
                }

                .nav-icon {
                  font-size: 1.2rem !important;
                  flex-shrink: 0 !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  width: 24px !important;
                }

                .nav-text {
                  font-size: 1rem !important;
                  font-weight: 500 !important;
                  color: var(--text-primary) !important;
                  flex-grow: 1 !important;
                }

                .nav-link:hover,
                .nav-link:focus {
                  background: var(--primary) !important;
                  color: white !important;
                  transform: translateX(4px) !important;
                }

                .nav-link:hover .nav-text,
                .nav-link:focus .nav-text,
                .nav-link.active .nav-text {
                  color: inherit !important;
                }

                .nav-link.active {
                  background: var(--primary) !important;
                  color: white !important;
                }
              }

              /* Ensure navigation is visible when menu is open */
              .navbar-collapse.show {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
              }

              .navbar-collapse.show .nav-link {
                opacity: 1 !important;
                transform: none !important;
                pointer-events: auto !important;
              }

              /* Animation keyframes */
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              /* Mobile navigation animations */
              @media (max-width: 991.98px) {
                .navbar-collapse {
                  animation: slideIn 0.3s ease-out !important;
                  transform-origin: top !important;
                }

                .nav-link {
                  animation: fadeIn 0.3s ease-out forwards !important;
                  opacity: 0 !important;
                }

                .nav-link:nth-child(1) { animation-delay: 0.1s !important; }
                .nav-link:nth-child(2) { animation-delay: 0.15s !important; }
                .nav-link:nth-child(3) { animation-delay: 0.2s !important; }
                .nav-link:nth-child(4) { animation-delay: 0.25s !important; }
                .nav-link:nth-child(5) { animation-delay: 0.3s !important; }
                .nav-link:nth-child(6) { animation-delay: 0.35s !important; }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                  .navbar-collapse,
                  .nav-link {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }
                }
              }
            `}
          </style>
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
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
              </div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link 
                  href="#hero" 
                  className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to Home section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">🏠</span>
                    <span className="nav-text">Home</span>
                  </div>
                </Nav.Link>
                <Nav.Link 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to About section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">👤</span>
                    <span className="nav-text">About</span>
                  </div>
                </Nav.Link>
                <Nav.Link 
                  href="#experience" 
                  className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to Experience section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">💼</span>
                    <span className="nav-text">Experience</span>
                  </div>
                </Nav.Link>
                <Nav.Link 
                  href="#projects" 
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to Projects section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">🚀</span>
                    <span className="nav-text">Projects</span>
                  </div>
                </Nav.Link>
                <Nav.Link 
                  href="#certifications" 
                  className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to Certifications section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">🏆</span>
                    <span className="nav-text">Certifications</span>
                  </div>
                </Nav.Link>
                <Nav.Link 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if ('vibrate' in navigator) {
                      navigator.vibrate(50);
                    }
                  }}
                  aria-label="Navigate to Contact section"
                >
                  <div className="nav-content">
                    <span className="nav-icon">📧</span>
                    <span className="nav-text">Contact</span>
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <ErrorBoundary fallback={
          <div className="hero-section d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h2>Unable to load hero section</h2>
              <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                Retry
              </button>
            </div>
          </div>
        }>
          <div style={{ position: 'relative' }} id="hero">
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
              <About />
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
          <ScrollToTop />
          <SocialLinks />
        </ErrorBoundary>
        
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
