import React, { useEffect, useState } from 'react';
import portfolioData from '../../data/portfolioData';

interface NetflixModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  category: string;
}

const NetflixModal: React.FC<NetflixModalProps> = ({ isOpen, onClose, item, category }) => {
  const [activeItem, setActiveItem] = useState<any>(item);
  const [activeCategory, setActiveCategory] = useState<string>(category);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveItem(item);
    setActiveCategory(category);
  }, [item, category]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !activeItem) return null;

  // Extract core fields
  const current = activeItem;
  const currentCat = activeCategory;

  let title = current.title || current.name || current.role || 'Details';
  let subtitle = current.subtitle || current.company || current.category || current.issuer || '';
  let desc = current.desc || current.details || current.content || current.detail || current.bio || '';
  let image = current.img || '/assets/projects/clothez.png';
  let tags: string[] = current.tags || current.items || [];
  let metrics: string[] = current.metrics || current.highlights || [];
  let liveUrl = current.links?.live || current.link || current.liveUrl || '';
  let githubUrl = current.links?.github || current.githubUrl || '';
  let badgeColor = '#FF2A54';
  let badgeText = currentCat.toUpperCase();
  let statusBadge = 'Production Verified';
  let releaseYear = '2026';
  let durationScale = 'Production Grade';

  // Category specific customizations
  let deepArchitecture = '';
  let relatedItems: any[] = [];

  if (currentCat === 'project') {
    badgeText = 'FEATURED SYSTEM';
    badgeColor = '#FF2A54';
    releaseYear = '2026';
    durationScale = 'Full-Stack Architecture';
    deepArchitecture = current.deepArchitecture || 'Engineered with modular component hierarchy, strict TypeScript type-safety, and optimized state management. RESTful APIs are safeguarded with token authentication, request validation, and indexed database queries for ultra-low latency.';
    relatedItems = portfolioData.projects.filter((p: any) => p.title !== title).slice(0, 3);
  } else if (currentCat === 'experience') {
    if (current.type === 'education' || (current.role && current.role.includes('IIT'))) {
      image = '/assets/netflix/iit_patna.jpg';
      badgeText = 'IIT PATNA • ACADEMIC';
      badgeColor = '#00E5FF';
      releaseYear = '2026 – 2028';
      durationScale = 'M.Tech Research';
      deepArchitecture = 'Specializing in advanced Machine Learning models, deep neural networks, and scalable data-intensive computing systems under the Department of AI & Data Science.';
    } else {
      image = '/assets/netflix/cloud_backend.jpg';
      badgeText = current.period && current.period.includes('PRESENT') ? 'CURRENT ENTERPRISE ROLE' : 'BACKEND INTERNSHIP';
      badgeColor = '#FF2A54';
      releaseYear = current.period || '2026';
      durationScale = 'Enterprise Systems';
      deepArchitecture = 'Developed production web services, engineered cloud backends using Firebase Cloud Functions, Supabase PostgreSQL, and designed RESTful endpoints with input validation and RBAC.';
    }
    relatedItems = portfolioData.experience.filter((e: any) => e.role !== title).slice(0, 3);
  } else if (currentCat === 'skill') {
    badgeText = 'CORE COMPETENCY';
    badgeColor = '#B388FF';
    durationScale = 'Technical Domain';
    desc = `Production-tested expertise in ${title} ecosystem. Aadarsh leverages these tools to architect resilient client-server systems, streamline cloud database transactions, and deploy scalable multi-tier web applications.`;
    if (title === 'AI & ML') {
      image = '/assets/netflix/ai_talent_blog.jpg';
      badgeColor = '#00E5FF';
    } else if (title === 'Databases' || title === 'Cloud & Tools') {
      image = '/assets/netflix/cloud_inventory_blog.jpg';
      badgeColor = '#00E676';
    } else {
      image = '/assets/netflix/skills_tech.jpg';
    }
    relatedItems = portfolioData.skills.filter((s: any) => s.name !== title).slice(0, 3);
  } else if (currentCat === 'certification') {
    badgeColor = '#FFB300';
    badgeText = current.issuer && current.issuer.includes('Patent') ? 'PUBLISHED PATENT' : 'HONOR & AWARD';
    releaseYear = '2024';
    durationScale = 'Intellectual Property';
    if (current.title && current.title.includes('Luggage')) {
      image = '/assets/netflix/gps_patent.jpg';
      deepArchitecture = 'Published Patent (2024): Integrates IoT telemetry, GPS satellite tracking, and biometric verification to secure high-value luggage and eliminate transit loss in travel infrastructure.';
    } else if (current.title && current.title.includes('Agricultural')) {
      image = '/assets/netflix/agri_patent.jpg';
      deepArchitecture = 'Published Patent (2024): Smart IoT agricultural sensing probe capable of reading soil telemetry, micro-climate indicators, and actuating automated precision irrigation.';
    } else if (current.title && current.title.includes('Codeathon')) {
      image = '/assets/netflix/codeathon_award.jpg';
      badgeText = 'COLLEGIATE TROPHY';
      badgeColor = '#FF2A54';
      deepArchitecture = 'Achieved 4th place in competitive collegiate programming and rapid system architecture prototyping among 100+ competing engineering teams.';
    } else {
      image = '/assets/netflix/iit_patna.jpg';
      badgeColor = '#00E676';
    }
    relatedItems = portfolioData.certifications.filter((c: any) => c.title !== title).slice(0, 3);
  } else if (currentCat === 'blog') {
    badgeColor = '#00E676';
    badgeText = 'MEDIUM PUBLICATION';
    releaseYear = current.date || '2026';
    durationScale = 'Architecture Deep Dive';
    if (current.title && current.title.includes('Inventory')) {
      image = '/assets/netflix/cloud_inventory_blog.jpg';
      deepArchitecture = 'Comprehensive analysis of designing sub-second scanning engines for high-throughput cloud warehouses, leveraging optimized relational schemas, Redis-like caching, and streaming QR payloads.';
    } else {
      image = '/assets/netflix/ai_talent_blog.jpg';
      deepArchitecture = 'Exploration of neural semantic vector embeddings and LLM matchmaking heuristics to transform global technical recruitment and candidate evaluation workflows.';
    }
    relatedItems = (portfolioData.blogPosts || []).filter((b: any) => b.title !== title).slice(0, 3);
  } else if (currentCat === 'testimonial') {
    badgeColor = '#FFB300';
    badgeText = 'PROFESSIONAL ENDORSEMENT';
    desc = `"${current.content}"`;
    subtitle = `${current.role} • Impact: ${current.impact || 'Architectural Lead'}`;
    image = '/assets/netflix/recommendation.jpg';
    statusBadge = 'Peer Validated';
    durationScale = 'Verified Review';
    relatedItems = (portfolioData.testimonials || []).filter((t: any) => t.name !== title).slice(0, 3);
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="netflix-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="netflix-modal-box"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          className="netflix-modal-close"
          onClick={onClose}
          aria-label="Close Dialog"
          type="button"
          title="Close (Esc)"
          style={{
            position: 'absolute',
            top: '22px',
            right: '22px',
            left: 'auto',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(11, 14, 23, 0.92)',
            border: '1.5px solid rgba(255, 255, 255, 0.32)',
            color: '#FFFFFF',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.75)',
            padding: 0,
            margin: 0,
            lineHeight: 1
          }}
        >
          &#10005;
        </button>

        {/* Modal Header with Backdrop */}
        <div
          className="netflix-modal-header"
          style={{ backgroundImage: `url("${image}")` }}
        >
          <div className="netflix-modal-header-gradient" />
          <div className="netflix-modal-header-content">
            <span
              className="netflix-card-top-badge"
              style={{
                position: 'static',
                marginBottom: '8px',
                display: 'inline-block',
                background: badgeColor,
                boxShadow: `0 0 14px ${badgeColor}66`
              }}
            >
              {badgeText}
            </span>

            <h2 className="netflix-modal-title">
              {title}
            </h2>

            {subtitle && (
              <div className="netflix-modal-subtitle" style={{ color: badgeColor }}>
                <span>&#9656;</span>
                <span>{subtitle}</span>
              </div>
            )}

            <div className="netflix-modal-actions">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="netflix-btn netflix-btn-play"
                  style={{ padding: '10px 22px', fontSize: '14px' }}
                >
                  &#9658; {currentCat === 'blog' ? 'Read on Medium' : 'Launch Live Demo'}
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="netflix-btn netflix-btn-info"
                  style={{ padding: '10px 22px', fontSize: '14px' }}
                >
                  GitHub Source
                </a>
              )}

              <button
                className="netflix-btn netflix-btn-info"
                onClick={handleShare}
                style={{ padding: '10px 18px', fontSize: '14px' }}
                type="button"
              >
                <span>&#128279;</span> {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body with Two-Column Detailing */}
        <div className="netflix-modal-body">
          <div className="netflix-modal-grid">
            {/* Left Column: Narrative, Architecture & Benchmarks */}
            <div className="netflix-modal-main">
              {/* Meta row */}
              <div className="netflix-modal-meta-row">
                <span className="netflix-badge-pill" style={{ color: '#00E676', borderColor: 'rgba(0,230,118,0.4)', background: 'rgba(0,230,118,0.1)', fontWeight: 700 }}>
                  {statusBadge}
                </span>
                <span className="netflix-badge-pill">{releaseYear}</span>
                <span className="netflix-badge-pill" style={{ color: '#00E5FF', borderColor: 'rgba(0,229,255,0.3)' }}>
                  {durationScale}
                </span>
                <span className="netflix-badge-pill" style={{ color: '#FFB300', borderColor: 'rgba(255,179,0,0.4)', background: 'rgba(255,179,0,0.1)' }}>
                  ENTERPRISE READY
                </span>
              </div>

              {/* In-depth Overview */}
              <p className="netflix-modal-desc">
                {desc}
              </p>

              {/* Deep Architecture Breakdown if available */}
              {deepArchitecture && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    System Architecture &amp; Methodology:
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#BCC2D2', margin: 0 }}>
                    {deepArchitecture}
                  </p>
                </div>
              )}

              {/* Key Metrics & Highlights */}
              {metrics.length > 0 && (
                <div className="netflix-modal-metrics" style={{ borderLeftColor: badgeColor }}>
                  <strong style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '4px' }}>
                    Key Engineering Highlights &amp; Metrics:
                  </strong>
                  {metrics.map((m, idx) => (
                    <div key={idx} className="netflix-metric-item">
                      <span className="netflix-metric-bullet" style={{ color: badgeColor }}>&#10003;</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Metadata Sidebar */}
            <div className="netflix-modal-sidebar">
              <div className="netflix-sidebar-item">
                <span className="netflix-sidebar-label">Engineer / Creator</span>
                <span className="netflix-sidebar-value">{portfolioData.personalInfo.name}</span>
              </div>

              <div className="netflix-sidebar-item">
                <span className="netflix-sidebar-label">Domain</span>
                <span className="netflix-sidebar-value" style={{ color: badgeColor }}>{currentCat.toUpperCase()}</span>
              </div>

              <div className="netflix-sidebar-item">
                <span className="netflix-sidebar-label">Production Status</span>
                <span className="netflix-sidebar-value" style={{ color: '#00E676' }}>
                  &#9679; Verified &amp; Active
                </span>
              </div>

              {tags.length > 0 && (
                <div className="netflix-sidebar-item">
                  <span className="netflix-sidebar-label">Tech Stack &amp; Tags</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="netflix-card-tag"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="netflix-sidebar-item" style={{ paddingTop: '10px', borderTop: '1px solid var(--netflix-border)' }}>
                <a
                  href="/assets/Aadarsh Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="netflix-btn netflix-btn-red"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 14px', fontSize: '13px' }}
                >
                  Download Full CV
                </a>
              </div>
            </div>
          </div>

          {/* Related Highlights Section */}
          {relatedItems.length > 0 && (
            <div className="netflix-more-like-this">
              <h3 className="netflix-more-title">
                <span style={{ color: 'var(--netflix-red)' }}>&#9646;</span> Related Work &amp; Highlights
              </h3>
              <div className="netflix-more-grid">
                {relatedItems.map((rel, idx) => {
                  const relTitle = rel.title || rel.name || rel.role;
                  const relDesc = rel.desc || rel.details || rel.content || rel.detail || '';
                  const relImg = rel.img || (currentCat === 'experience' ? '/assets/netflix/cloud_backend.jpg' : currentCat === 'certification' ? '/assets/netflix/gps_patent.jpg' : '/assets/projects/clothez.png');

                  return (
                    <div
                      key={idx}
                      className="netflix-mini-card"
                      onClick={() => {
                        setActiveItem(rel);
                        const box = document.querySelector('.netflix-modal-box');
                        if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div
                        className="netflix-mini-card-img"
                        style={{ backgroundImage: `url("${relImg}")` }}
                      >
                        <span className="netflix-card-rating" style={{ top: '6px', right: '6px', fontSize: '10px' }}>
                          EXPLORE
                        </span>
                      </div>
                      <div className="netflix-mini-card-body">
                        <h4 className="netflix-mini-card-title">{relTitle}</h4>
                        <p className="netflix-mini-card-desc">{relDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetflixModal;