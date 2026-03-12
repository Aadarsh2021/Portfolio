import React from 'react';

const Experience: React.FC = () => {
  const experiences = [
    {
      role: "Full Stack Web Developer",
      company: "Ash-Tech Technologies",
      period: "SEP 2025 - PRESENT",
      details: "Leading modernization of inventory and billing systems. Orchestrated a 300% improvement in system scalability and standardized high-performance React architectures."
    },
    {
      role: "Backend Developer Intern",
      company: "Ash-Tech Technologies",
      period: "JUL 2025 - SEP 2025",
      details: "Optimized server-side workflows, achieving a 60% reduction in API response times. Integrated Groq AI for automated intelligent matching systems."
    },
    {
      role: "B.Tech in CS Engineering",
      company: "G L Bajaj Group of Institutions",
      period: "2021 - 2025",
      details: "Honors graduate specialization in Scalable Computing and Distributed Systems. Developed deep technical foundations in Computer Architecture and Scalable Software Design."
    }
  ];

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
                <h6 className="mb-0" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.role}</h6>
                <p className="aura-text mb-0" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{exp.company}</p>
              </div>
              <span className="mono-label" style={{ fontSize: '0.6rem' }}>{exp.period}</span>
            </div>
            <p className="mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text-dimmed)' }}>
              {exp.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;