import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
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
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'GraphQL'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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

  return (
    <section className="about-section">
    <Container>
      <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Row className="justify-content-center">
            <Col lg={8} className="text-center mb-5">
              <motion.h2 
                className="section-title"
                variants={cardVariants}
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
                <motion.div variants={cardVariants}>
                  <Card className="about-card h-100">
                    <Card.Body className="p-4">
                      <div className="about-card-title">
                        {renderIcon(card.icon, 28, { color: card.color })}
                        <h4>{card.title}</h4>
                      </div>
                      <div className="about-card-content">
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
              >
                <Row className="align-items-center">
                  <Col lg={6}>
                    <h3 
                      className="mb-4"
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
              </h3>
                    <p 
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
                    </p>
                    <p 
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7
                      }}
                    >
                      When I'm not coding, you'll find me exploring new technologies, contributing 
                      to open-source projects, or sharing knowledge with the developer community.
                    </p>
                  </Col>
                  <Col lg={6}>
                    <div>
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
              <div className="skill-list">
                        {skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            className="skill-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                          >
                    {skill}
                          </motion.span>
                ))}
              </div>
            </div>
          </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>

          {/* Stats Section */}
          <Row className="mt-5">
            <Col lg={12}>
              <motion.div 
                variants={cardVariants}
                className="glass-effect p-4"
              >
                <Row className="text-center">
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <div>
                      <h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800
                        }}
                      >
                        50+
              </h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Projects Completed
                      </p>
              </div>
                  </Col>
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <div>
                      <h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800
                        }}
                      >
                        3+
                      </h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Years Experience
                      </p>
            </div>
          </Col>
                  <Col md={3} sm={6} className="mb-4 mb-md-0">
                    <div>
                      <h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800
                        }}
                      >
                        15+
              </h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Technologies
                      </p>
                  </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div>
                      <h3 
                        className="text-gradient mb-2"
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 800
                        }}
                      >
                        100%
                      </h3>
                      <p 
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        Client Satisfaction
                      </p>
            </div>
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