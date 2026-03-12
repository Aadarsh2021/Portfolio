import React, { useEffect, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { useAnalytics } from './hooks/useAnalytics';
import { useAccessibility } from './hooks/useAccessibility';
import './styles/animations.css';
import './styles/themes.css';
import './styles/perfect-portfolio.css';
import './styles/mobile-menu.css';
import PageEntryLoader from './components/PageEntryLoader';
import ObsidianBackground from './components/ObsidianBackground';
import LiveStatusTile from './components/LiveStatusTile';
import TestimonialTile from './components/TestimonialTile';
import EnhancedSkills from './components/EnhancedSkills';
import EnhancedContact from './components/EnhancedContact';
import { gsap } from 'gsap';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import AuraCursor from './components/AuraCursor';
import CommandPalette from './components/CommandPalette';
import { useTheme } from './contexts/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollSpy } from './hooks/useScrollspy';
import { BentoGrid, BentoTile } from './components/BentoGrid';
import BentoHero from './components/BentoHero';
import ThemeToggle from './components/ThemeToggle';
import MobileMenu from './components/MobileMenu';
import RadialWipe from './components/RadialWipe';

// Lazy load larger or secondary components
const About = React.lazy(() => import('./components/About'));
const Experience = React.lazy(() => import('./components/Experience'));
const AdvancedProjects = React.lazy(() => import('./components/AdvancedProjects'));
const Blog = React.lazy(() => import('./components/Blog'));
const Certifications = React.lazy(() => import('./components/Certifications'));

const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [wipePos, setWipePos] = React.useState({ x: '50%', y: '50%' });
  const [isWiping, setIsWiping] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);
  
  const { trackPageView } = useAnalytics();
  const { announce } = useAccessibility();
  const themeContext = useTheme();
  
  const handleThemeToggle = (e?: React.MouseEvent) => {
    if (e) {
      setWipePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    }
    setIsWiping(true);
    setTimeout(() => {
      themeContext?.toggleTheme();
      setTimeout(() => setIsWiping(false), 800);
    }, 50);
  };

  const toggleTheme = themeContext ? handleThemeToggle : () => {};

  useSmoothScroll();

  const { activeSection } = useScrollSpy({ 
    sectionIds: ['home', 'about', 'projects', 'skills', 'experience', 'blog', 'contact'],
    offset: 200 
  });

  useEffect(() => {
    if (activeSection && !isLoading) {
      window.history.replaceState(null, '', `#${activeSection}`);
    }
  }, [activeSection, isLoading]);

  useEffect(() => {
    if (!isLoading && gridRef.current) {
      const tiles = gridRef.current.querySelectorAll('.luminous-tile');
      gsap.fromTo(tiles, 
        { opacity: 0, y: 40, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    trackPageView('portfolio-home');
    announce('Portfolio loaded successfully');
  }, [trackPageView, announce]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ErrorBoundary fallback={
      <div className="error-boundary-root text-center p-5">
        <h2 className="text-white">Something went wrong</h2>
        <button className="primary-aura-btn mt-3" onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    }>
      <>
        <SEOHead />
        <ObsidianBackground />
        <AnimatePresence>
          {isLoading && <PageEntryLoader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
        <AuraCursor />
        <CommandPalette 
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onThemeToggle={toggleTheme}
        />
        
        {/* Floating Theme Toggle */}
        <div className="fixed-top-right p-4" style={{ zIndex: 100, pointerEvents: 'auto' }}>
          <ThemeToggle />
        </div>

        <main className="portfolio-main" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <div ref={gridRef}>
            <BentoGrid>
              {/* Row 1: Hero */}
              <BentoTile size="full" id="home">
                <BentoHero />
              </BentoTile>

              {/* Row 2: Identity & Status */}
              <BentoTile size="tall" id="about">
                <Suspense fallback={<div>...</div>}>
                  <About />
                </Suspense>
              </BentoTile>

              <BentoTile size="sm">
                <LiveStatusTile />
              </BentoTile>

              <BentoTile size="sm">
                <TestimonialTile />
              </BentoTile>

              <BentoTile size="sm">
                <Suspense fallback={<div>...</div>}>
                  <Certifications />
                </Suspense>
              </BentoTile>

              {/* Row 3: Projects & Skills */}
              <BentoTile size="lg" id="projects">
                <Suspense fallback={<div>...</div>}>
                  <AdvancedProjects />
                </Suspense>
              </BentoTile>

              <BentoTile size="md" id="skills">
                <EnhancedSkills />
              </BentoTile>

              {/* Row 4: Experience & Blog */}
              <BentoTile size="md" id="experience">
                <Suspense fallback={<div>...</div>}>
                  <Experience />
                </Suspense>
              </BentoTile>

              <BentoTile size="md" id="blog">
                <Suspense fallback={<div>...</div>}>
                  <Blog />
                </Suspense>
              </BentoTile>

              {/* Row 5: Contact */}
              <BentoTile size="wide" id="contact">
                <EnhancedContact />
              </BentoTile>
            </BentoGrid>
          </div>
        </main>

        <MobileMenu />
        <Footer />
        <RadialWipe active={isWiping} x={wipePos.x} y={wipePos.y} />
        <Analytics />
      </>
    </ErrorBoundary>
  );
};

export default App;
