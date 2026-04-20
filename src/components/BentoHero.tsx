import React from 'react';
import { motion } from 'framer-motion';
import { BentoTile } from './BentoGrid';
import { 
  BsArrowRight, BsGithub, BsLinkedin, BsEnvelopeFill 
} from 'react-icons/bs';
import MagneticButton from './MagneticButton';

const BentoHero: React.FC = () => {
  return (
    <BentoTile size="wide" className="hero-tile">
      <div className="hero-content">
        <motion.div 
          className="mono-label mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Available for new opportunities
        </motion.div>
        
        <motion.h1 
          className="display-title mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Aadarsh <span className="aura-text">Thakur</span>
          <span className="visually-hidden"> | Full Stack Developer</span>
        </motion.h1>
        
        <motion.p 
          className="hero-description mb-5 mx-auto"
          style={{ maxWidth: '600px', color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Full Stack Developer crafting production-grade web applications. 
          Expert in designing scalable REST APIs and secure cloud-native 
          architectures with Node.js, Firebase, and Supabase.
        </motion.p>
        
        <motion.div 
          className="hero-actions d-flex flex-wrap gap-3 align-items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton distance={0.3}>
            <a href="#contact" className="primary-aura-btn no-underline">
              Let's Collaborate {React.createElement(BsArrowRight as any, { className: "ms-2" })}
            </a>
          </MagneticButton>
          
          <MagneticButton distance={0.3}>
            <a 
              id="resume-download-btn"
              href="/assets/Aadarsh Resume.pdf" 
              target="_blank" 
              rel="noreferrer" 
              className="secondary-aura-btn no-underline px-4 py-2"
              style={{ borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            >
              Download CV
            </a>
          </MagneticButton>
          
          <div className="social-pill d-flex gap-4 px-4 py-2 glass-panel">
            <MagneticButton distance={0.5}>
              <a href="https://github.com/Aadarsh2021" target="_blank" rel="noreferrer" className="social-icon-link">
                {React.createElement(BsGithub as any, { size: 20 })}
              </a>
            </MagneticButton>
            <MagneticButton distance={0.5}>
              <a href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" target="_blank" rel="noreferrer" className="social-icon-link">
                {React.createElement(BsLinkedin as any, { size: 20 })}
              </a>
            </MagneticButton>
            <MagneticButton distance={0.5}>
              <a href="mailto:thakuraadarsh1@gmail.com" className="social-icon-link">
                {React.createElement(BsEnvelopeFill as any, { size: 20 })}
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative element (Ambient Glow) */}
      <div className="hero-ambient-glow" />
    </BentoTile>
  );
};

export default BentoHero;
