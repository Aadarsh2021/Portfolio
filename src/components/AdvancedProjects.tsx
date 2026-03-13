import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsGithub, BsArrowRight, 
  BsLaptop, BsGlobe, BsGear, BsCheckCircle 
} from 'react-icons/bs';
import OptimizedImage from './OptimizedImage';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  links: { github: string; live: string };
  icon: any;
  img: string;
  featured?: boolean;
  metrics: string[];
}

const projects: Project[] = [
  {
    title: "Escrow Inventory",
    desc: "Enterprise stock management system with sub-second QR/Barcode scanning and real-time inventory synchronization.",
    tags: ["React", "TypeScript", "Supabase", "Vite"],
    links: { github: "https://github.com/Ghuge01-Cover/escrow-inventory", live: "https://escrow-inventory.web.app/" },
    icon: BsLaptop,
    img: "/assets/projects/inventory.png",
    featured: true,
    metrics: ["Sub-second QR Scanning", "99.9% Stock Accuracy", "Automated Low-Stock Alerts"]
  },
  {
    title: "Taliwo.com",
    desc: "Global recruitment & career platform featuring Groq-powered intelligent resume analysis and seamless LinkedIn integration.",
    tags: ["React", "Groq AI", "Firebase", "Razorpay"],
    links: { github: "https://github.com/ChinmayShringi/career-compass-launchpad", live: "https://taliwo.com" },
    icon: BsGlobe,
    img: "/assets/projects/taliwo.png",
    featured: true,
    metrics: ["AI-Powered Career Matching", "2k+ active candidates", "Razorpay Payment Integration"]
  },
  {
    title: "Escrow Bill",
    desc: "Professional GST-compliant cloud billing software with zero-latency PDF generation and secure cloud backup.",
    tags: ["React", "PostgreSQL", "Google Drive API"],
    links: { github: "https://github.com/escrowbms/escrow-invoice", live: "https://escrow-bill.web.app/" },
    icon: BsGear,
    img: "/assets/projects/escrowbill.png",
    metrics: ["GST/VAT Compliant Reporting", "Zero-Latency Cloud Backup", "One-Click Invoicing"]
  },
  {
    title: "Escrow Daily Hisab",
    desc: "Advanced personal finance ledger for precise daily transaction tracking and automated expense analytics.",
    tags: ["React Native", "Firebase", "Apex Charts"],
    links: { github: "https://github.com/escrowbms/daily-hisab-calc", live: "https://escrow-daily-hisab.web.app/" },
    icon: BsCheckCircle,
    img: "/assets/projects/escrowcalc.png",
    metrics: ["Automated Expense Analytics", "Interactive Data Viz", "Secure Multi-Device Sync"]
  },
  {
    title: "Premium Portfolio",
    desc: "Hyper-premium developer portfolio featuring Bento Grid 2.0 layout, 3D Obsidian particles, and proximity lighting.",
    tags: ["React", "Three.js", "Framer Motion", "GSAP"],
    links: { github: "https://github.com/Aadarsh2021/Portfolio", live: "https://aadarsh-portfolio-49ac6.web.app/" },
    icon: BsGlobe,
    img: "/logo512.png",
    metrics: ["98/100 Lighthouse Performance", "Custom 3D Physics Engine", "Accessibility Compliant Design"]
  }
];

const AdvancedProjects: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="projects-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Featured Work</h3>
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
                transition: 'all 0.3s ease'
              }}
            />
          ))}
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
            <div className="project-preview-container mb-3 glass-panel overflow-hidden" style={{ borderRadius: '12px', height: '120px', background: 'var(--primary-aura-translucent)', position: 'relative' }}>
              <OptimizedImage 
                src={projects[activeIdx].img} 
                alt={projects[activeIdx].title}
                className="w-100 h-100"
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