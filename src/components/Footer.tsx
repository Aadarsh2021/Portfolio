import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: BsGithub, url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: BsLinkedin, url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: BsTwitter, url: 'https://twitter.com/yourusername' }
  ];

  return (
    <footer className="footer-section py-5">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="align-items-center">
            <Col lg={4} className="mb-4 mb-lg-0">
              <motion.div variants={itemVariants}>
                <h3 className="h4 mb-3">Your Name</h3>
                <p className="text-muted mb-0">
                  Full-stack developer passionate about creating beautiful and functional web applications.
                </p>
              </motion.div>
            </Col>

            <Col lg={4} className="mb-4 mb-lg-0">
              <motion.div variants={itemVariants} className="text-center">
                <ul className="list-unstyled mb-0">
                  {navigationLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      variants={itemVariants}
                      className="d-inline-block me-3"
                    >
                      <motion.a
                        href={link.href}
                        className="text-decoration-none text-muted"
                        whileHover={{ scale: 1.1, color: 'var(--primary-color)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Col>

            <Col lg={4}>
              <motion.div variants={itemVariants} className="text-lg-end">
                <div className="social-links">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary me-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon({ size: 20, className: "me-2" })}
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <motion.div
                variants={itemVariants}
                className="text-center text-muted"
              >
                <p className="mb-0">
                  © {currentYear} Your Name. All rights reserved.
                </p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer; 