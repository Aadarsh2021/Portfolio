import React from 'react';

import { portfolioData } from '../data/portfolioData';

const About: React.FC = () => {
  const { identity } = portfolioData.personalInfo;

  return (
    <div className="about-bento-content p-3 p-md-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="gradient-text mb-0">{identity.title}</h3>
        <span className="mono-label" style={{ fontSize: 'var(--font-size-xs)' }}>{identity.subtitle}</span>
      </div>

      <div className="about-details flex-grow-1 overflow-auto custom-scrollbar pe-2">
        <h4 className="mb-3" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--text-primary)' }}>{identity.name}</h4>
        <p className="mb-4" style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {portfolioData.personalInfo.bio}
        </p>

        <div className="core-values-grid d-flex flex-column gap-4">
          {identity.values.map((val, i) => (
            <div key={i} className="value-item p-3 glass-panel" style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
              <h6 className="mb-2 gradient-text" style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>{val.title}</h6>
              <p className="mb-0" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-dimmed)', lineHeight: 1.6 }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="mono-label" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Current Focus</span>
            <span className="small gradient-text" style={{ fontWeight: 600 }}>Building Scalable Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;