import React from 'react';

import { portfolioData } from '../data/portfolioData';

const About: React.FC = () => {
  const { identity } = portfolioData.personalInfo;

  return (
    <div className="about-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">{identity.title}</h3>
        <span className="mono-label">{identity.subtitle}</span>
      </div>

      <div className="about-details flex-grow-1 overflow-auto custom-scrollbar">
        <h4 className="mb-3" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{identity.name}</h4>
        <p className="mb-4" style={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {portfolioData.personalInfo.bio}
        </p>

        <div className="core-values-grid d-flex flex-column gap-4">
          {identity.values.map((val, i) => (
            <div key={i} className="value-item">
              <h6 className="mb-2 aura-text" style={{ fontSize: '0.95rem' }}>{val.title}</h6>
              <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-dimmed)', lineHeight: 1.6 }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-luminous)' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="small mono-label" style={{ color: 'var(--text-secondary)' }}>Current Focus</span>
            <span className="small aura-text">Gaining experience & developing skills</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;