import React from 'react';

import { portfolioData } from '../data/portfolioData';

const Experience: React.FC = () => {
  const experiences = portfolioData.experience;

  return (
    <div className="experience-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Experience</h3>
        <span className="mono-label">Professional Path</span>
      </div>

      <div className="experience-list flex-grow-1 overflow-auto custom-scrollbar">
        {experiences.map((exp, index) => (
          <div key={index} className="exp-item mb-4 pb-4" style={{ borderBottom: index !== experiences.length - 1 ? '1px solid var(--border-luminous)' : 'none' }}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                  <h6 className="mb-0" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.role}</h6>
                  {exp.type && (
                    <span 
                      className="mono-label px-2 py-0" 
                      style={{ 
                        fontSize: '0.55rem', 
                        borderRadius: '4px',
                        background: exp.type === 'education' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: exp.type === 'education' ? 'var(--aura-azure)' : 'var(--accent)'
                      }}
                    >
                      {exp.type === 'education' ? 'EDUCATION' : 'EXPERIENCE'}
                    </span>
                  )}
                </div>
                <p className="aura-text mb-0" style={{ fontSize: '0.75rem', opacity: 0.85 }}>{exp.company}</p>
              </div>
              <span className="mono-label text-nowrap" style={{ fontSize: '0.6rem' }}>{exp.period}</span>
            </div>
            {exp.highlights && exp.highlights.length > 0 ? (
              <ul className="mb-0 ps-3 mt-2" style={{ fontSize: '0.78rem', color: 'var(--text-dimmed)', lineHeight: 1.5 }}>
                {exp.highlights.map((pt, pIdx) => (
                  <li key={pIdx} className="mb-1">{pt}</li>
                ))}
              </ul>
            ) : (
              <p className="mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text-dimmed)' }}>
                {exp.details}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;