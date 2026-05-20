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
    <div className="projects-bento-content p-3 p-md-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="gradient-text mb-0">Featured Work</h3>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-2 d-none d-sm-flex">
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
                  transition: 'all 0.3s var(--ease-expo)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          <div className="d-flex gap-2">
            <MagneticButton>
              <button 
                onClick={prevProject}
                className="glass-panel p-2 border-0 d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px', borderRadius: '12px', cursor: 'pointer', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
              >
                {React.createElement(BsArrowLeft as any, { size: 18 })}
              </button>
            </MagneticButton>
            <MagneticButton>
              <button 
                onClick={nextProject}
                className="glass-panel p-2 border-0 d-flex align-items-center justify-content-center"
                style={{ width: '42px', height: '42px', borderRadius: '12px', cursor: 'pointer', background: 'var(--glass-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
              >
                {React.createElement(BsArrowRight as any, { size: 18 })}
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="project-display flex-grow-1 position-relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="h-100 d-flex flex-column"
          >
            <div className="project-preview-container mb-4 glass-panel overflow-hidden" style={{ borderRadius: '16px', minHeight: '160px', maxHeight: '280px', position: 'relative', border: '1px solid var(--glass-border)' }}>
              <OptimizedImage 
                src={projects[activeIdx].img} 
                alt={projects[activeIdx].title}
                className="w-100 h-100"
                style={{ objectFit: 'cover', opacity: 0.95 }}
                priority={activeIdx === 0}
              />
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="projects-icon-box p-3 glass-panel shadow-sm" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                {React.createElement(projects[activeIdx].icon as any, { size: 28, className: "text-primary" })}
              </div>
              <div>
                <h4 className="text-primary-theme mb-0" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>{projects[activeIdx].title}</h4>
                {projects[activeIdx].featured && <span className="mono-label" style={{ color: 'var(--aura-azure)', fontSize: '0.65rem' }}>FEATURED SYSTEM</span>}
              </div>
            </div>

            <p className="text-secondary mb-4" style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{projects[activeIdx].desc}</p>

            <div className="metrics-box mb-4 p-3 glass-panel" style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '16px' }}>
              <div className="d-flex flex-column gap-3">
                {projects[activeIdx].metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="d-flex align-items-center gap-2">
                    {React.createElement(BsCheckCircle as any, { size: 14, className: "text-primary" })}
                    <span className="text-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>{metric}</span>
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