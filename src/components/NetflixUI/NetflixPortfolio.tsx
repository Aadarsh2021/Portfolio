import React, { useState } from 'react';
import NetflixNavbar from './NetflixNavbar';
import NetflixHero from './NetflixHero';
import NetflixRow from './NetflixRow';
import NetflixCard from './NetflixCard';
import NetflixModal from './NetflixModal';
import portfolioData from '../../data/portfolioData';
import '../../styles/netflix.css';

interface NetflixPortfolioProps {
  onToggleMode: () => void;
  isNetflixMode: boolean;
}

const NetflixPortfolio: React.FC<NetflixPortfolioProps> = ({ onToggleMode, isNetflixMode }) => {
  const { projects, experience, skills, certifications, blogPosts, testimonials, personalInfo, socialLinks } = portfolioData;

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: any;
    category: string;
  }>({
    isOpen: false,
    item: null,
    category: 'project'
  });

  const openModal = (item: any, category: string) => {
    setModalState({
      isOpen: true,
      item,
      category
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="netflix-root">
      {/* Netflix Top Navigation */}
      <NetflixNavbar onToggleMode={onToggleMode} isNetflixMode={isNetflixMode} />

      {/* Hero Billboard */}
      <NetflixHero
        onPlayFeatured={() => openModal(projects[0], 'project')}
        onMoreInfo={() => openModal({ ...personalInfo, title: personalInfo.name, subtitle: personalInfo.role, img: '/assets/banner.png', desc: personalInfo.bio }, 'experience')}
        onToggleMode={onToggleMode}
      />

      {/* Main Content Rows */}
      <main className="netflix-rows-container">
        {/* Row 1: Featured Projects */}
        <section id="projects">
          <NetflixRow title="Featured Engineering Projects" subtitle="Production Grade">
            {projects.map((project, idx) => (
              <NetflixCard
                key={project.id || idx}
                item={project}
                category="project"
                rank={idx + 1}
                onSelect={openModal}
              />
            ))}
          </NetflixRow>
        </section>

        {/* Row 2: Career & Education */}
        <section id="experience">
          <NetflixRow title="Experience &amp; Academic Timeline" subtitle="Career Journey">
            {experience.map((exp, idx) => (
              <NetflixCard
                key={idx}
                item={exp}
                category="experience"
                onSelect={openModal}
              />
            ))}
          </NetflixRow>
        </section>

        {/* Row 3: Skills & Tech Stack */}
        <section id="skills">
          <NetflixRow title="Technical Expertise &amp; Core Stack" subtitle="Frameworks &amp; Languages">
            {skills.map((skillGroup, idx) => (
              <NetflixCard
                key={idx}
                item={skillGroup}
                category="skill"
                onSelect={openModal}
              />
            ))}
          </NetflixRow>
        </section>

        {/* Row 4: Patents & Certifications */}
        <section id="certifications">
          <NetflixRow title="Patents, Honors &amp; Awards" subtitle="Intellectual Property">
            {certifications.map((cert, idx) => (
              <NetflixCard
                key={idx}
                item={cert}
                category="certification"
                onSelect={openModal}
              />
            ))}
          </NetflixRow>
        </section>

        {/* Row 5: Blog Publications */}
        {blogPosts && blogPosts.length > 0 && (
          <section id="blogs">
            <NetflixRow title="Technical Articles on Medium" subtitle="Engineering Publications">
              {blogPosts.map((blog, idx) => (
                <NetflixCard
                  key={idx}
                  item={blog}
                  category="blog"
                  onSelect={openModal}
                />
              ))}
            </NetflixRow>
          </section>
        )}

        {/* Row 6: Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <section id="reviews">
            <NetflixRow title="Professional Recommendations" subtitle="Verified Endorsements">
              {testimonials.map((test, idx) => (
                <NetflixCard
                  key={idx}
                  item={test}
                  category="testimonial"
                  onSelect={openModal}
                />
              ))}
            </NetflixRow>
          </section>
        )}

        {/* Contact Section in Netflix Aesthetic */}
        <section
          id="contact"
          style={{
            padding: '80px 4% 50px',
            background: 'linear-gradient(180deg, var(--netflix-black) 0%, #050608 100%)',
            borderTop: '1px solid var(--netflix-border)',
            position: 'relative'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <img
              src="/assets/profile.png"
              alt={personalInfo.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--netflix-red)',
                boxShadow: '0 0 24px var(--netflix-red-glow)',
                marginBottom: '16px',
                display: 'inline-block'
              }}
            />
            <div style={{ display: 'block' }}>
              <span className="netflix-spotlight-tag">
                <span className="netflix-n-badge" style={{ background: 'linear-gradient(135deg, #FF2A54 0%, #D80027 100%)', borderRadius: '4px', padding: '2px 7px', fontSize: '11px', fontWeight: 900 }}>AT</span>
                <span>AVAILABLE FOR ROLES</span>
              </span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '14px', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Questions? Connect With The Engineer
            </h2>
            <p style={{ color: 'var(--netflix-text-secondary)', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
              Open for full-time Full-Stack, Backend, and AI Engineering roles. Based in {personalInfo.location}.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '35px' }}>
              <a
                href={`mailto:${personalInfo.email}`}
                className="netflix-btn netflix-btn-play"
              >
                <span>&#9993;</span> Email: {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="netflix-btn netflix-btn-info"
              >
                <span>&#9742;</span> Call: {personalInfo.phone}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="netflix-btn netflix-btn-red"
              >
                LinkedIn Profile
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#e5e5e5',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '8px 18px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    border: '1px solid var(--netflix-border)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--netflix-red)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--netflix-border)';
                    e.currentTarget.style.color = '#e5e5e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Netflix Footer */}
      <footer className="netflix-footer">
        <div className="netflix-footer-links">
          <div>
            <a href="#home" className="netflix-footer-link">Portfolio Home</a><br /><br />
            <a href="#projects" className="netflix-footer-link">Featured Projects</a><br /><br />
            <a href="#experience" className="netflix-footer-link">Work Experience</a>
          </div>
          <div>
            <a href="#skills" className="netflix-footer-link">Technical Skills</a><br /><br />
            <a href="#certifications" className="netflix-footer-link">Patents &amp; Awards</a><br /><br />
            <a href="/assets/Aadarsh Resume.pdf" target="_blank" rel="noopener noreferrer" className="netflix-footer-link">Resume PDF</a>
          </div>
          <div>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="netflix-footer-link">GitHub Projects</a><br /><br />
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="netflix-footer-link">LinkedIn Network</a><br /><br />
            <button
              onClick={onToggleMode}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--netflix-red)',
                cursor: 'pointer',
                padding: 0,
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              &#9889; Switch to Bento Grid Mode
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px' }}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Engineered with React &amp; Modern Web Technologies.
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#666' }}>
            M.Tech in AI &amp; Data Science candidate at IIT Patna.
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      <NetflixModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        item={modalState.item}
        category={modalState.category}
      />
    </div>
  );
};

export default NetflixPortfolio;
