import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsGithub, BsLinkedin, BsEnvelope, BsFileEarmarkText } from 'react-icons/bs';

interface HeroProps {
  onDownloadResume: () => void;
  onContactMe: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDownloadResume, onContactMe }) => {
  const renderIcon = (IconComponent: IconType, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ className?: string }>;
    return <Icon className={className} />;
  };

  return (
    <section id="hero" className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={8} md={12} className="order-2 order-lg-1 text-center text-lg-start">
            <div className="hero-content">
                <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                >
                Hi, I'm <span className="text-gradient">Aadarsh Thakur</span>
                </motion.h1>
              
                <motion.h2
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                >
                Full Stack Developer & Software Engineer
                </motion.h2>
              
                <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.7,
                  maxWidth: '600px'
                }}
              >
                I craft exceptional digital experiences with modern technologies. 
                Passionate about creating scalable solutions and bringing innovative ideas to life.
                </motion.p>
              
                <motion.div
                className="hero-buttons d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                >
                <button 
                  className="btn btn-gradient btn-lg me-sm-4 mb-3 touch-feedback"
                  onClick={onContactMe}
                  style={{ minHeight: '48px', minWidth: '200px' }}
                >
                  {renderIcon(BsEnvelope, "me-2")}
                  Get In Touch
                </button>
                
                <button 
                  className="btn btn-outline btn-lg mb-3 touch-feedback"
                  onClick={onDownloadResume}
                  style={{ minHeight: '48px', minWidth: '200px' }}
                >
                  {renderIcon(BsFileEarmarkText, "me-2")}
                  Download Resume
                </button>
              </motion.div>

              <motion.div
                className="social-links d-flex justify-content-center justify-content-lg-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <a 
                  href="https://github.com/Aadarsh2021" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link touch-feedback"
                  aria-label="GitHub Profile"
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  {renderIcon(BsGithub)}
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link touch-feedback"
                  aria-label="LinkedIn Profile"
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  {renderIcon(BsLinkedin)}
                </a>
                
                <a 
                  href="mailto:thakuraadarsh1@gmail.com"
                  className="social-link touch-feedback"
                  aria-label="Email Contact"
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  {renderIcon(BsEnvelope)}
                </a>
              </motion.div>
            </div>
            </Col>
          
          <Col lg={4} className="order-1 order-lg-2 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="profile-image-container"
            >
              <img 
                src="/assets/profile.jpg" 
                alt="Aadarsh Thakur - Full Stack Developer"
                className="profile-image"
                loading="eager"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'var(--text-muted)',
          fontSize: 'var(--font-size-sm)',
          cursor: 'pointer'
        }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span style={{ marginBottom: 'var(--space-2)' }}>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
            borderRadius: 'var(--radius-full)'
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero; 