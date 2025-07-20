import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsCode, 
  BsLightbulb, 
  BsRocket, 
  BsPeople,
  BsGear,
  BsHeart
} from 'react-icons/bs';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const skills = [
    // Languages
    'Python',
    // Web Development
    'HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Framer Motion',
    // AI / Machine Learning
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
    // Data Tools
    'Pandas', 'NumPy', 'Matplotlib',
    // Databases
    'MySQL',
    // Other Tools
    'Git', 'GitHub', 'Vercel'
  ];

  const renderIcon = (IconComponent: IconType, size: number, style?: React.CSSProperties) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; style?: React.CSSProperties }>;
    return <Icon size={size} style={style} />;
  };

  const aboutCards = [
    {
      icon: BsCode,
      title: 'Full Stack Development',
      description: 'Experienced in building end-to-end web applications using modern technologies like React, Node.js, and cloud platforms.',
      color: 'var(--primary)'
    },
    {
      icon: BsLightbulb,
      title: 'Problem Solving',
      description: 'Passionate about solving complex problems with clean, efficient code and innovative solutions that make a difference.',
      color: 'var(--secondary)'
    },
    {
      icon: BsRocket,
      title: 'Performance Optimization',
      description: 'Focused on creating fast, scalable applications with optimal user experience and cutting-edge performance.',
      color: 'var(--accent)'
    },
    {
      icon: BsPeople,
      title: 'Team Collaboration',
      description: 'Strong believer in agile methodologies and collaborative development with excellent communication skills.',
      color: 'var(--primary)'
    },
    {
      icon: BsGear,
      title: 'DevOps & Automation',
      description: 'Experienced with CI/CD pipelines, containerization, and cloud infrastructure for seamless deployment.',
      color: 'var(--secondary)'
    },
    {
      icon: BsHeart,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and best practices to stay current with the rapidly evolving tech landscape.',
      color: 'var(--accent)'
    }
  ];

  // Enhanced animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
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
      rotateY: 5,
      y: -5,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="about-section">
      <style>
        {`
          @media (max-width: 768px) {
            .about-section {
              padding: 3rem 0;
            }
            .section-title {
              font-size: clamp(2rem, 6vw, var(--font-size-4xl)) !important;
              margin-bottom: 1.5rem !important;
            }
            .lead {
              font-size: clamp(1rem, 3vw, var(--font-size-lg)) !important;
              line-height: 1.6 !important;
              margin-bottom: 2rem !important;
            }
            .about-card {
              margin-bottom: 1.5rem !important;
              padding: 1.5rem !important;
            }
            .about-card .card-title {
              font-size: clamp(1.1rem, 3vw, 1.3rem) !important;
              margin-bottom: 0.75rem !important;
            }
            .about-card .card-text {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              line-height: 1.5 !important;
            }
            .skill-tag {
              font-size: clamp(0.8rem, 2vw, 0.9rem) !important;
              padding: 0.5rem 0.75rem !important;
              margin: 0.25rem !important;
            }
            .stats-card {
              padding: 1.5rem !important;
              margin-bottom: 1rem !important;
            }
            .stats-number {
              font-size: clamp(2rem, 6vw, 3rem) !important;
            }
            .stats-label {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
            }
          }
          
          @media (max-width: 480px) {
            .about-section {
              padding: 2rem 0;
            }
            .section-title {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
            }
            .lead {
              font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important;
            }
            .about-card {
              padding: 1.25rem !important;
            }
            .skill-tag {
              font-size: clamp(0.75rem, 1.8vw, 0.85rem) !important;
              padding: 0.4rem 0.6rem !important;
            }
          }
          
          .about-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          
          .skill-tag:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          style={{ y }}
        >
          <Row className="justify-content-center">
            <Col lg={8} className="text-center mb-5">
              <motion.h2 
                className="section-title gradient-text"
                variants={cardVariants}
                data-text="About Me"
                style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: 800,
                  marginBottom: 'var(--space-6)',
                }}
              >
                About Me
              </motion.h2>
              <motion.p 
                className="lead"
                variants={cardVariants}
                style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  maxWidth: '700px',
                  margin: '0 auto'
                }}
              >
                I'm a passionate Full Stack Developer with a strong foundation in computer science 
                and a love for creating innovative digital solutions. Currently pursuing my final year 
                in Computer Science Engineering, I combine academic knowledge with practical experience 
                to build exceptional web applications.
              </motion.p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {aboutCards.map((card, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div 
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="about-card h-100 glass-effect">
                    <Card.Body className="p-4">
                      <motion.div 
                        className="about-card-title"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          marginBottom: 'var(--space-4)'
                        }}
                      >
                        <motion.div
                          style={{
                            padding: 'var(--space-2)',
                            borderRadius: 'var(--radius-lg)',
                            background: `${card.color}20`,
                            border: `1px solid ${card.color}40`
                          }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {renderIcon(card.icon, 28, { color: card.color })}
                        </motion.div>
                        <h4 style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0
                        }}>
                          {card.title}
                        </h4>
                      </motion.div>
                      <div className="about-card-content" style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7
                      }}>
                        {card.description}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center">
            <Col lg={10}>
              <motion.div 
                variants={cardVariants}
                className="glass-effect p-5"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-2xl)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Row className="align-items-center">
                  <Col lg={6}>
                    <motion.h3 
                      className="mb-4"
                      variants={cardVariants}
                      style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      My Journey
                    </motion.h3>
                    <motion.p 
                      variants={cardVariants}
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        marginBottom: 'var(--space-6)'
                      }}
                    >
                      My journey in technology began with curiosity and has evolved into a passion 
                      for creating meaningful digital experiences. I believe in writing clean, 
                      maintainable code and staying updated with the latest industry trends.
                    </motion.p>
                    <motion.p 
                      variants={cardVariants}
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7
                      }}
                    >
                      When I'm not coding, you'll find me exploring new technologies, contributing 
                      to open-source projects, or sharing knowledge with the developer community.
                    </motion.p>
                  </Col>
                  <Col lg={6}>
                    <motion.div variants={cardVariants}>
                      <h4 
                        className="mb-4"
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        Technical Skills
                      </h4>
                      <div className="skill-list" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-2)'
                      }}>
                        {skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            className="skill-badge"
                            variants={skillVariants}
                            whileHover="hover"
                            style={{
                              padding: 'var(--space-2) var(--space-3)',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--glass-bg)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--text-primary)',
                              fontSize: 'var(--font-size-sm)',
                              fontWeight: 500,
                              cursor: 'pointer',
                              backdropFilter: 'blur(10px)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>

          {/* Enhanced Stats Section */}
          <Row className="mt-5">
            <Col lg={12}>
              <motion.div 
                variants={statsVariants}
                className="glass-effect p-5"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-2xl)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Row className="text-center">
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <motion.div
                      variants={numberVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        50+
                      </motion.h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Projects Completed
                      </p>
                    </motion.div>
                  </Col>
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <motion.div
                      variants={numberVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        3+
                      </motion.h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Years Experience
                      </p>
                    </motion.div>
                  </Col>
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <motion.div
                      variants={numberVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        15+
                      </motion.h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Technologies
                      </p>
                    </motion.div>
                  </Col>
                  <Col md={3} sm={6}>
                    <motion.div
                      variants={numberVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        100%
                      </motion.h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Client Satisfaction
                      </p>
                    </motion.div>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default About; 