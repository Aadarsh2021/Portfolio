import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsGithub, BsLinkedin, BsEnvelope, BsFileEarmarkText } from 'react-icons/bs';

interface HeroProps {
  onDownloadResume: () => void;
  onContactMe: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDownloadResume, onContactMe }) => {
  // Advanced motion values for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Advanced text animation with character splitting
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0.01
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "none",
      transition: {
        duration: 0.2,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const renderIcon = (IconComponent: IconType, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ className?: string }>;
    return <Icon className={className} />;
  };

  // Ultra-advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.01
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      filter: "blur(20px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotateY: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotateY: 10,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      rotateY: -5,
      transition: {
        duration: 0.05
      }
    }
  };

  const socialVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateZ: -180
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.2,
      rotateZ: 360,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: -45,
      filter: "blur(20px) brightness(0.5)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.1,
      rotateY: 15,
      filter: "blur(0px) brightness(1.1)",
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 0.95, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -100, 0],
      x: [0, 20, -20, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Split text into characters for advanced animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        style={{
          display: 'inline-block',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          fontWeight: 900
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <section 
      id="hero" 
      className="hero-section position-relative overflow-hidden"
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .hero-section {
              padding: 2rem 0;
              min-height: 100vh;
            }
            .hero-title {
              font-size: clamp(2rem, 8vw, 3.5rem) !important;
              line-height: 1.1 !important;
              margin-bottom: 1rem !important;
            }
            .hero-subtitle {
              font-size: clamp(1.2rem, 4vw, var(--font-size-3xl)) !important;
              margin-bottom: 1.5rem !important;
            }
            .hero-description {
              font-size: clamp(1rem, 3vw, var(--font-size-xl)) !important;
              margin-bottom: 2rem !important;
              line-height: 1.6 !important;
            }
            .hero-buttons {
              flex-direction: column !important;
              gap: 1rem !important;
            }
            .hero-buttons .btn {
              min-width: 100% !important;
              min-height: 48px !important;
              font-size: clamp(0.9rem, 3vw, var(--font-size-lg)) !important;
            }
            .social-links {
              gap: 1rem !important;
              margin-top: 2rem !important;
            }
            .social-link {
              min-height: 48px !important;
              min-width: 48px !important;
            }
            .floating-shape {
              display: none !important;
            }
            .hero-image {
              width: 250px !important;
              height: 250px !important;
              margin: 2rem auto !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-title {
              font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
            }
            .hero-subtitle {
              font-size: clamp(1rem, 3.5vw, 1.5rem) !important;
            }
            .hero-description {
              font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important;
            }
          }
          
          .touch-feedback:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
          }
        `}
      </style>
      {/* Advanced Particle System */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              zIndex: 1
            }}
            transition={{ delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Ultra-Advanced Floating Background Elements */}
      <motion.div
        className="floating-shape shape-1"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.4,
          top: '5%',
          left: '3%',
          zIndex: 1
        }}
      />
      <motion.div
        className="floating-shape shape-2"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'linear-gradient(135deg, var(--secondary), var(--accent), var(--primary))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.3,
          bottom: '15%',
          right: '8%',
          zIndex: 1
        }}
        transition={{ delay: 2 }}
      />
      <motion.div
        className="floating-shape shape-3"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          background: 'linear-gradient(135deg, var(--accent), var(--primary), var(--secondary))',
          borderRadius: '50%',
          filter: 'blur(50px)',
          opacity: 0.2,
          top: '60%',
          left: '70%',
          zIndex: 1
        }}
        transition={{ delay: 4 }}
      />

      {/* Interactive Mouse Tracker */}
      <motion.div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          x: springX,
          y: springY,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

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
                variants={textVariants}
                ref={titleRef}
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                  color: '#ffffff',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                }}
              >
                Hi, I'm {splitText("Aadarsh Thakur")}
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
                I craft exceptional digital experiences with modern technologies. 
                Passionate about creating scalable solutions and bringing innovative ideas to life.
              </motion.p>
              
              <motion.div
                className="hero-buttons d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-4"
                variants={itemVariants}
              >
                <motion.button 
                  className="btn btn-gradient btn-lg touch-feedback"
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
                    boxShadow: 'var(--shadow-2xl), 0 0 30px rgba(99, 102, 241, 0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                      x: '-100%'
                    }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {renderIcon(BsEnvelope, "me-3")}
                  Get In Touch
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline btn-lg touch-feedback"
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
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
                      x: '-100%'
                    }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
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
                  className="social-link touch-feedback"
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
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      scale: 0
                    }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {renderIcon(BsGithub, "fs-4")}
                </motion.a>
                
                <motion.a 
                  href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link touch-feedback"
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
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      scale: 0
                    }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {renderIcon(BsLinkedin, "fs-4")}
                </motion.a>
                
                <motion.a 
                  href="mailto:thakuraadarsh1@gmail.com"
                  className="social-link touch-feedback"
                  aria-label="Email Contact"
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
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      scale: 0
                    }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
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
                perspective: '1200px',
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
              
              {/* Multi-layered glow effects */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  borderRadius: 'var(--radius-3xl)',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))',
                  opacity: 0.4,
                  filter: 'blur(30px)',
                  zIndex: -1
                }}
                variants={glowVariants}
                animate="animate"
              />
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: 'var(--radius-3xl)',
                  background: 'linear-gradient(135deg, var(--secondary), var(--accent), var(--primary))',
                  opacity: 0.3,
                  filter: 'blur(20px)',
                  zIndex: -1
                }}
                variants={glowVariants}
                animate="animate"
                transition={{ delay: 1 }}
              />
              
              {/* Floating elements around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: `hsl(${i * 60}, 70%, 60%)`,
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                    zIndex: -1,
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero; 