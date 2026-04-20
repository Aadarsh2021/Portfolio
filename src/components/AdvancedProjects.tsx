import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsGithub, BsArrowRight, BsArrowLeft,
  BsCheckCircle 
} from 'react-icons/bs';
import OptimizedImage from './OptimizedImage';
import MagneticButton from './MagneticButton';

import { portfolioData } from '../data/portfolioData';

const projects = portfolioData.projects;

const AdvancedProjects: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextProject = () => {
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="projects-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Featured Work</h3>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-2">
            {projects.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIdx(i)}
                className="p-0 border-0"
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: i === activeIdx ? 'var(--primary)' : 'var(--border-luminous)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          <div className="d-flex gap-2 ms-2">
            <MagneticButton>
              <button 
                onClick={prevProject}
                className="glass-panel p-2 border-0 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)' }}
              >
                {React.createElement(BsArrowLeft as any, { size: 16 })}
              </button>
            </MagneticButton>
            <MagneticButton>
              <button 
                onClick={nextProject}
                className="glass-panel p-2 border-0 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', borderRadius: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)' }}
              >
                {React.createElement(BsArrowRight as any, { size: 16 })}
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="project-display flex-grow-1 position-relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="h-100 d-flex flex-column"
          >
            <div className="project-preview-container mb-3 glass-panel overflow-hidden" style={{ borderRadius: '12px', minHeight: '160px', maxHeight: '240px', background: 'var(--primary-aura-translucent)', position: 'relative' }}>
              <OptimizedImage 
                src={projects[activeIdx].img} 
                alt={projects[activeIdx].title}
                className="w-100 h-100"
                style={{ objectFit: 'cover', opacity: 0.9 }}
                priority={activeIdx === 0}
              />
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="projects-icon-box p-2 glass-panel shadow-sm">
                {React.createElement(projects[activeIdx].icon as any, { size: 24, className: "text-primary" })}
              </div>
              <div>
                <h4 className="text-primary-theme mb-0" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{projects[activeIdx].title}</h4>
                {projects[activeIdx].featured && <span className="mono-label" style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>FEATURED</span>}
              </div>
            </div>

            <p className="text-secondary mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>{projects[activeIdx].desc}</p>

            <div className="metrics-box mb-4 p-3 glass-panel" style={{ background: 'var(--primary-aura-translucent)', borderRadius: '12px' }}>
              <div className="d-flex flex-column gap-2">
                {projects[activeIdx].metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="d-flex align-items-center gap-2">
                    {React.createElement(BsCheckCircle as any, { size: 12, className: "text-primary" })}
                    <span className="text-dimmed" style={{ fontSize: '0.75rem' }}>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {projects[activeIdx].tags.map(tag => (
                <span key={tag} className="px-2 py-1 glass-panel" style={{ fontSize: '0.65rem', borderRadius: '4px', opacity: 0.8 }}>{tag}</span>
              ))}
            </div>

            <div className="mt-auto d-flex gap-3">
              <a 
                href={projects[activeIdx].links.live} 
                target="_blank" rel="noreferrer" 
                className="primary-aura-btn py-2 px-4 d-flex align-items-center gap-2 no-underline"
                style={{ fontSize: '0.85rem' }}
              >
                Live Demo {React.createElement(BsArrowRight as any)}
              </a>
              <a 
                href={projects[activeIdx].links.github} 
                target="_blank" rel="noreferrer" 
                className="glass-panel p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px', borderRadius: '12px' }}
              >
                {React.createElement(BsGithub as any, { size: 20 })}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedProjects;