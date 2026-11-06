import React from 'react';
import portfolioData from '../../data/portfolioData';

interface NetflixHeroProps {
  onPlayFeatured: () => void;
  onMoreInfo: () => void;
  onToggleMode?: () => void;
  onOpenCommandPalette?: () => void;
}

const NetflixHero: React.FC<NetflixHeroProps> = ({ 
  onPlayFeatured, 
  onMoreInfo, 
  onToggleMode,
  onOpenCommandPalette 
}) => {
  const { personalInfo } = portfolioData;

  return (
    <section
      id="home"
      className="netflix-hero"
      style={{
        backgroundImage: 'url("/assets/banner.webp")',
        backgroundPosition: 'center 35%',
        backgroundSize: 'cover'
      }}
    >
      <div className="netflix-hero-overlay" />
      <div className="netflix-hero-bottom-fade" />

      <div className="netflix-hero-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <img
            src="/assets/profile.webp"
            alt={personalInfo.name}
            width={74}
            height={74}
            loading="eager"
            fetchPriority="high"
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--netflix-red)',
              boxShadow: '0 0 20px var(--netflix-red-glow)',
              flexShrink: 0
            }}
          />
          <div>
            <div className="netflix-spotlight-tag" style={{ marginBottom: '4px' }}>
              <span className="netflix-n-badge" style={{ background: 'linear-gradient(135deg, #FF2A54 0%, #D80027 100%)', borderRadius: '4px', padding: '2px 7px', fontSize: '11px', fontWeight: 900 }}>AT</span>
              <span>FULL-STACK ENGINEER &amp; CLOUD ARCHITECT</span>
            </div>
            <h1 className="netflix-hero-title" style={{ margin: 0 }}>
              {personalInfo.name}
            </h1>
          </div>
        </div>

        <div className="netflix-hero-meta">
          <span className="netflix-badge-pill" style={{ borderColor: 'rgba(0, 229, 255, 0.5)', color: '#00e5ff', background: 'rgba(0, 229, 255, 0.1)', fontWeight: 700 }}>
            IIT PATNA M.TECH
          </span>
          <span className="netflix-badge-pill" style={{ borderColor: 'rgba(255, 42, 84, 0.5)', color: '#FF2A54', background: 'rgba(255, 42, 84, 0.1)', fontWeight: 700 }}>
            FULL-STACK &amp; CLOUD
          </span>
          <span className="netflix-badge-pill" style={{ borderColor: 'rgba(0, 230, 118, 0.5)', color: '#00e676', background: 'rgba(0, 230, 118, 0.1)', fontWeight: 700 }}>
            ● AVAILABLE FOR HIRE
          </span>
          <span className="netflix-badge-pill" style={{ borderColor: 'rgba(255, 215, 0, 0.5)', color: '#FFD700', background: 'rgba(255, 215, 0, 0.1)', fontWeight: 700 }}>
            2 PUBLISHED PATENTS
          </span>
        </div>

        <p className="netflix-hero-desc">
          {personalInfo.bio}
        </p>

        {/* Engineering Proof-of-Work Stats Strip */}
        <div className="netflix-hero-stats">
          <div className="netflix-stat-item">
            <span className="netflix-stat-val">9+</span>
            <span className="netflix-stat-lbl">Production Apps</span>
          </div>
          <div className="netflix-stat-divider" />
          <div className="netflix-stat-item">
            <span className="netflix-stat-val">2</span>
            <span className="netflix-stat-lbl">Published Patents</span>
          </div>
          <div className="netflix-stat-divider" />
          <div className="netflix-stat-item">
            <span className="netflix-stat-val">20–30%</span>
            <span className="netflix-stat-lbl">DB Latency Reduced</span>
          </div>
          <div className="netflix-stat-divider" />
          <div className="netflix-stat-item">
            <span className="netflix-stat-val">IIT Patna</span>
            <span className="netflix-stat-lbl">M.Tech AI &amp; DS</span>
          </div>
        </div>

        <div className="netflix-hero-buttons">
          <button
            className="netflix-btn netflix-btn-play"
            onClick={onPlayFeatured}
            type="button"
          >
            <span style={{ fontSize: '18px' }}>&#9658;</span> Play Featured Project
          </button>

          <button
            className="netflix-btn netflix-btn-info"
            onClick={onMoreInfo}
            type="button"
          >
            <span style={{ fontSize: '18px' }}>&#9432;</span> More Info &amp; Bio
          </button>

          <a
            href="/assets/Aadarsh Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="netflix-btn netflix-btn-red"
          >
            <span>&#128196;</span> View Resume
          </a>

          {onOpenCommandPalette && (
            <button
              className="netflix-btn netflix-btn-palette"
              onClick={onOpenCommandPalette}
              type="button"
              title="Open Command Palette (Ctrl+K / ⌘K)"
            >
              <span>⌨</span>
              <span>Search / Menu <kbd className="netflix-hero-kbd">Ctrl+K</kbd></span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NetflixHero;
