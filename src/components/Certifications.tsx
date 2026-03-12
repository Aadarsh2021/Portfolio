import React from 'react';
    import { motion } from 'framer-motion';
    import { BsAward, BsTrophy, BsPatchCheck } from 'react-icons/bs';

    const Certifications: React.FC = () => {
      const highlights = [
        {
          title: "Scalability Patent",
          issuer: "Enterprise Systems Innovation",
          icon: BsPatchCheck,
          detail: "Patent for high-availability distributed inventory monitoring."
        },
        {
          title: "Core Engineering Expert",
          issuer: "CutShort Certified",
          icon: BsAward,
          detail: "Advanced certification in full-stack performance and system design."
        },
        {
          title: "IVS Hackathon",
          issuer: "4th Position - Regional",
          icon: BsTrophy,
          detail: "Optimized logistics algorithm for smart-city supply chains."
        },
        {
          title: "Google Cloud Build",
          issuer: "Architecture Specialization",
          icon: BsAward,
          detail: "Comprehensive training in cloud-native scaling and infrastructure."
        }
      ];

      return (
        <div className="certifications-bento-content p-4 h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="aura-text mb-0">Milestones</h3>
            <span className="mono-label">Validated Skills</span>
          </div>
    
          <div className="milestones-grid flex-grow-1 overflow-auto custom-scrollbar" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                className="milestone-item p-3 glass-panel"
                style={{ borderRadius: '16px', background: 'var(--primary-aura-translucent)', border: '1px solid var(--border-luminous)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 glass-panel" style={{ borderRadius: '10px', background: 'var(--primary-aura-translucent)' }}>
                    {React.createElement(item.icon as any, { size: 18, className: "text-primary" })}
                  </div>
                  <div>
                    <h6 className="mb-1" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h6>
                    <p className="aura-text mb-1" style={{ fontSize: '0.7rem', opacity: 0.8 }}>{item.issuer}</p>
                    <p className="mb-0" style={{ fontSize: '0.65rem', lineHeight: 1.4, color: 'var(--text-dimmed)' }}>{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };
    
    export default Certifications;
    