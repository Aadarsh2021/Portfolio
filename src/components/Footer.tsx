import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsEnvelopeFill, BsFillHeartFill } from 'react-icons/bs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const renderIcon = (IconComponent: any, size: number = 20, style?: React.CSSProperties) => {
    return React.createElement(IconComponent, { size, style });
  };

  return (
    <footer className="footer py-5">
      <style>
        {`
          .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--glass-border);
            position: relative;
            overflow: hidden;
          }
          
          .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            opacity: 0.3;
          }
          
          .social-links-container {
            display: flex;
            gap: var(--space-4);
          }
          
          .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            transition: all 0.4s var(--ease-expo);
            position: relative;
          }
          
          .social-link:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
            transform: translateY(-5px);
            box-shadow: var(--shadow-premium);
          }
          
          .social-link.github:hover { background: #333; border-color: #333; }
          .social-link.linkedin:hover { background: #0077B5; border-color: #0077B5; }
          .social-link.email:hover { background: #EA4335; border-color: #EA4335; }

          @media (max-width: 768px) {
            .footer { padding: 3rem 0; }
            .social-links-container { justify-content: center; margin-top: 1.5rem; }
          }
        `}
      </style>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="gradient-text mb-2" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800 }}>
                Aadarsh Thakur
              </h5>
              <p className="text-secondary mb-0" style={{ fontSize: 'var(--font-size-base)', opacity: 0.8 }}>
                Building high-performance digital experiences.
              </p>
            </motion.div>
          </Col>

          <Col lg={6}>
            <div className="d-flex flex-column align-items-center align-items-lg-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="social-links-container mb-4"
              >
                <motion.a
                  href="https://github.com/Aadarsh2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {renderIcon(BsGithub, 28)}
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {renderIcon(BsLinkedin, 28)}
                </motion.a>
              
                <motion.a
                  href="mailto:thakuraadarsh1@gmail.com"
                  className="social-link email"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {renderIcon(BsEnvelopeFill, 28)}
                </motion.a>
              </motion.div>
            
            <motion.p 
              className="footer-content mb-0 justify-content-lg-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)'
              }}
            >
              © {currentYear} Made with {renderIcon(BsFillHeartFill, 14, { 
                color: 'var(--accent)'
              })} by Aadarsh Thakur
            </motion.p>
            </div>
          </Col>
          </Row>
      </Container>
    </footer>
  );
};

export default Footer; 