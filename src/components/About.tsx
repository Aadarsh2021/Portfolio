import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Identity</h3>
        <span className="mono-label">Who I Am</span>
      </div>

      <div className="about-details flex-grow-1 overflow-auto custom-scrollbar">
        <h4 className="mb-3" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Aadarsh Thakur</h4>
        <p className="mb-4" style={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          I am a <strong>Full Stack Architect</strong> at **Ash-tech Solutions**, where I architect mission-critical enterprise systems. 
          My expertise spans the entire development lifecycle—from crafting fluid UIs with <strong>React & Next.js</strong> to engineering robust backends using <strong>Node.js, Firebase, and Supabase</strong>.
        </p>

        <div className="core-values-grid d-flex flex-column gap-4">
          <div className="value-item">
            <h6 className="mb-2 aura-text" style={{ fontSize: '0.95rem' }}>Full-Stack Ecosystem</h6>
            <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-dimmed)', lineHeight: 1.6 }}>
              Fluent in <strong>TypeScript, JavaScript, and Python</strong>. I've delivered high-impact solutions like <strong>Escrow Inventory</strong> (real-time stock sync with Supabase) and <strong>Taliwo.com</strong> (intelligent recruitment via Firebase).
            </p>
          </div>
          <div className="value-item">
            <h6 className="mb-2 aura-text" style={{ fontSize: '0.95rem' }}>Scalable Architecture</h6>
            <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--text-dimmed)', lineHeight: 1.6 }}>
              Specialize in <strong>PostgreSQL</strong> optimization and <strong>Cloud APIs</strong> (Google Drive, Razorpay). Orchestrated a 300% scale improvement for enterprise billing systems, ensuring zero-latency performance.
            </p>
          </div>
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