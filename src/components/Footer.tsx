import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsGithub, BsLinkedin, BsEnvelope, BsHeart } from 'react-icons/bs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const renderIcon = (IconComponent: IconType, style?: React.CSSProperties) => {
    const Icon = IconComponent as React.ComponentType<{ style?: React.CSSProperties }>;
    return <Icon style={style} />;
  };

  return (
    <footer className="footer">
      <style>
        {`
          @media (max-width: 768px) {
            .footer {
              padding: 2rem 0 !important;
            }
            .footer h5 {
              font-size: clamp(1.2rem, 4vw, var(--font-size-lg)) !important;
              margin-bottom: 0.75rem !important;
            }
            .footer-content {
              font-size: clamp(0.8rem, 2.5vw, var(--font-size-sm)) !important;
              line-height: 1.5 !important;
            }
            .social-link {
              width: 36px !important;
              height: 36px !important;
              font-size: clamp(0.9rem, 2.5vw, var(--font-size-base)) !important;
            }
            .footer .row {
              text-align: center !important;
            }
            .footer .col-lg-6:first-child {
              margin-bottom: 1.5rem !important;
            }
            .footer .d-flex {
              justify-content: center !important;
              margin-bottom: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .footer {
              padding: 1.5rem 0 !important;
            }
            .footer h5 {
              font-size: clamp(1.1rem, 3.5vw, 1.3rem) !important;
            }
            .footer-content {
              font-size: clamp(0.75rem, 2.2vw, 0.85rem) !important;
            }
            .social-link {
              width: 32px !important;
              height: 32px !important;
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
          }
          
          .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            padding: 3rem 0;
          }
          
          .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-lg);
            background: var(--glass-bg);
            border: 2px solid var(--glass-border);
            color: var(--text-primary);
            text-decoration: none;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
          }
          
          .social-link:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          }
        `}
      </style>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start mb-3 mb-lg-0">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
        >
              <h5 
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 'var(--space-3)'
                }}
              >
                Aadarsh Thakur
              </h5>
              <p 
                className="footer-content mb-0"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}
              >
                Building the future, one line of code at a time.
                </p>
              </motion.div>
            </Col>

          <Col lg={6} className="text-center text-lg-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="d-flex justify-content-center justify-content-lg-end align-items-center gap-4 mb-3"
                    >
                      <motion.a
                href="https://github.com/Aadarsh2021"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: 'var(--font-size-base)'
                }}
                      >
                {renderIcon(BsGithub)}
                      </motion.a>

                    <motion.a
                href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/"
                      target="_blank"
                      rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                {renderIcon(BsLinkedin)}
                    </motion.a>
              
              <motion.a
                href="mailto:thakuraadarsh1@gmail.com"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                {renderIcon(BsEnvelope)}
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
              © {currentYear} Made with {renderIcon(BsHeart, { 
                color: 'var(--accent)', 
                fontSize: '14px' 
              })} by Aadarsh Thakur
            </motion.p>
            </Col>
          </Row>
        
        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
            borderRadius: 'var(--radius-full)',
            marginTop: 'var(--space-6)',
            transformOrigin: 'left'
          }}
        />
      </Container>
    </footer>
  );
};

export default Footer; 