import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsGithub, BsLinkedin, BsEnvelope, BsFileEarmarkText } from 'react-icons/bs';

interface HeroProps {
  onDownloadResume: () => void;
  onContactMe: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDownloadResume, onContactMe }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const renderIcon = (IconComponent: IconType, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ className?: string }>;
    return <Icon className={className} />;
  };

  return (
    <div 
      className="hero-content position-relative overflow-hidden w-100"
      ref={containerRef}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)
        `,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Simple animated background elements */}
      <div className="hero-bg-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-square square-1"></div>
        <div className="floating-square square-2"></div>
      </div>

      <style>
        {`
          .hero-bg-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }

          .floating-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
            animation: float 6s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
          }

          .floating-square {
            position: absolute;
            background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
            animation: float 8s ease-in-out infinite reverse;
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.2);
          }

          .circle-1 {
            width: 200px;
            height: 200px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }

          .circle-2 {
            width: 150px;
            height: 150px;
            top: 60%;
            right: 15%;
            animation-delay: 2s;
          }

          .circle-3 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
          }

          .square-1 {
            width: 80px;
            height: 80px;
            top: 30%;
            right: 30%;
            transform: rotate(45deg);
            animation-delay: 1s;
          }

          .square-2 {
            width: 120px;
            height: 120px;
            bottom: 30%;
            right: 10%;
            transform: rotate(30deg);
            animation-delay: 3s;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }

          /* Glass morphism effect for content */
          .hero-content > .container {
            position: relative;
            z-index: 2;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          [data-theme="dark"] .hero-content > .container {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          @media (max-width: 768px) {
            .hero-section {
              padding: 2rem 0;
              min-height: 100vh;
              touch-action: manipulation;
            }
            .hero-content > .container {
              padding: 2rem 1.5rem;
              margin: 0 1rem;
            }
            .floating-circle, .floating-square {
              display: none;
            }
            .hero-title {
              font-size: clamp(2rem, 8vw, 3.5rem) !important;
              line-height: 1.1 !important;
              margin-bottom: 1rem !important;
              text-align: center !important;
            }
            .hero-subtitle {
              font-size: clamp(1.2rem, 4vw, var(--font-size-3xl)) !important;
              margin-bottom: 1.5rem !important;
              text-align: center !important;
            }
            .hero-description {
              font-size: clamp(1rem, 3vw, var(--font-size-xl)) !important;
              margin-bottom: 2rem !important;
              line-height: 1.6 !important;
              text-align: center !important;
            }
            .hero-buttons {
              flex-direction: column !important;
              gap: 1rem !important;
              align-items: center !important;
            }
            .hero-buttons .btn {
              min-width: 200px !important;
              min-height: 52px !important;
              font-size: clamp(0.9rem, 3vw, var(--font-size-lg)) !important;
              border-radius: 12px !important;
              font-weight: 600 !important;
              transition: all 0.2s ease !important;
            }
            .hero-buttons .btn:active {
              transform: scale(0.95) !important;
              transition: transform 0.1s ease !important;
            }
            .social-links {
              gap: 1rem !important;
              margin-top: 2rem !important;
              justify-content: center !important;
            }
            .social-link {
              min-height: 52px !important;
              min-width: 52px !important;
              border-radius: 12px !important;
              font-size: 1.2rem !important;
              transition: all 0.2s ease !important;
            }
            .social-link:active {
              transform: scale(0.9) !important;
              transition: transform 0.1s ease !important;
            }
            .hero-image {
              width: 250px !important;
              height: 250px !important;
              margin: 2rem auto !important;
              border-radius: 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section {
              padding: 1.5rem 0 !important;
            }
            .hero-content > .container {
              padding: 1.5rem 1rem;
              margin: 0 0.5rem;
            }
            .hero-title {
              font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
              margin-bottom: 0.75rem !important;
            }
            .hero-subtitle {
              font-size: clamp(1rem, 3.5vw, 1.5rem) !important;
              margin-bottom: 1rem !important;
            }
            .hero-description {
              font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important;
              margin-bottom: 1.5rem !important;
            }
            .hero-buttons .btn {
              min-width: 180px !important;
              min-height: 48px !important;
              font-size: clamp(0.85rem, 2.8vw, 1rem) !important;
            }
            .social-link {
              min-height: 48px !important;
              min-width: 48px !important;
              font-size: 1.1rem !important;
            }
            .hero-image {
              width: 200px !important;
              height: 200px !important;
              margin: 1.5rem auto !important;
            }
          }
        `}
      </style>

      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={8} md={12} className="order-2 order-lg-1 text-center text-lg-start">
            <motion.div 
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <motion.h1
                className="hero-title"
                variants={itemVariants}
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  color: '#ffffff',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                Hi, I'm{" "}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Aadarsh Thakur
                </span>
              </motion.h1>
              
              <motion.h2
                className="hero-subtitle"
                variants={itemVariants}
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-6)',
                  fontWeight: 600,
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}
              >
                Full Stack Developer & Software Engineer
              </motion.h2>
              
              <motion.p
                className="hero-description"
                variants={itemVariants}
                style={{
                  fontSize: 'var(--font-size-xl)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.8,
                  maxWidth: '700px',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
                }}
              >
                I craft exceptional digital experiences with modern technologies.{" "}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 600
                  }}
                >
                  Passionate about creating scalable solutions and bringing innovative ideas to life.
                </span>
              </motion.p>
              
              <motion.div
                className="hero-buttons d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-4"
                variants={itemVariants}
              >
                <motion.button 
                  className="btn btn-gradient btn-lg"
                  onClick={onContactMe}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ 
                    minHeight: '56px', 
                    minWidth: '220px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    border: 'none',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-lg)',
                    boxShadow: 'var(--shadow-2xl), 0 0 30px rgba(99, 102, 241, 0.5)'
                  }}
                >
                  {renderIcon(BsEnvelope, "me-3")}
                  Get In Touch
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline btn-lg"
                  onClick={onDownloadResume}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ 
                    minHeight: '56px', 
                    minWidth: '220px',
                    border: '3px solid var(--primary)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: 'var(--font-size-lg)',
                    background: 'transparent',
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  {renderIcon(BsFileEarmarkText, "me-3")}
                  Download Resume
                </motion.button>
              </motion.div>

              <motion.div
                className="social-links d-flex justify-content-center justify-content-lg-start gap-4 mt-5"
                variants={itemVariants}
              >
                <motion.a 
                  href="https://github.com/Aadarsh2021" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                  variants={socialVariants}
                  whileHover="hover"
                  style={{ 
                    minHeight: '56px', 
                    minWidth: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-2xl)',
                    background: 'var(--glass-bg)',
                    border: '2px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {renderIcon(BsGithub, "fs-4")}
                </motion.a>
                
                <motion.a 
                  href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                  variants={socialVariants}
                  whileHover="hover"
                  style={{ 
                    minHeight: '56px', 
                    minWidth: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-2xl)',
                    background: 'var(--glass-bg)',
                    border: '2px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {renderIcon(BsLinkedin, "fs-4")}
                </motion.a>
                
                <motion.a 
                  href="mailto:aadarshthakur2021@gmail.com" 
                  className="social-link"
                  aria-label="Email"
                  variants={socialVariants}
                  whileHover="hover"
                  style={{ 
                    minHeight: '56px', 
                    minWidth: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-2xl)',
                    background: 'var(--glass-bg)',
                    border: '2px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {renderIcon(BsEnvelope, "fs-4")}
                </motion.a>
              </motion.div>
            </motion.div>
          </Col>
          
          <Col lg={4} className="order-1 order-lg-2 text-center">
            <motion.div
              className="profile-image-container"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                maxWidth: '350px',
                aspectRatio: '1',
                margin: '0 auto'
              }}
            >
              <motion.img 
                src="/assets/profile.jpg" 
                alt="Aadarsh Thakur - Full Stack Developer"
                className="profile-image"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-3xl)',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  boxShadow: 'var(--shadow-2xl), 0 0 50px rgba(99, 102, 241, 0.5)',
                  border: '6px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(20px)'
                }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero; 