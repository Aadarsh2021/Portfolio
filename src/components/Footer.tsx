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
              width: 48px !important;
              height: 48px !important;
              font-size: clamp(1.1rem, 3vw, var(--font-size-lg)) !important;
              margin: 0 0.5rem !important;
              border-radius: 12px !important;
            }
            .social-links-container {
              padding: 1.5rem 0 !important;
              gap: 1rem !important;
            }
            .social-links-container::before {
              width: 150px !important;
              height: 150px !important;
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
              width: 44px !important;
              height: 44px !important;
              font-size: clamp(1rem, 2.8vw, 1.1rem) !important;
              margin: 0 0.25rem !important;
              border-radius: 10px !important;
            }
            .social-links-container {
              padding: 1rem 0 !important;
              gap: 0.75rem !important;
            }
            .social-links-container::before {
              width: 120px !important;
              height: 120px !important;
            }
          }
          
          @media (max-width: 360px) {
            .social-link {
              width: 40px !important;
              height: 40px !important;
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              margin: 0 0.2rem !important;
            }
            .social-links-container {
              gap: 0.5rem !important;
            }
          }
          
          .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            padding: 3rem 0;
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
          }
          
          .footer::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--secondary), transparent);
          }
          
          .social-links-container {
            position: relative;
            padding: 1rem 0;
          }
          
          .social-links-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, var(--primary)10 0%, transparent 70%);
            border-radius: 50%;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .social-links-container:hover::before {
            opacity: 1;
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
            position: relative;
            overflow: hidden;
          }
          
          .social-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .social-link:hover::before {
            left: 100%;
          }
          
          .social-link:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
            transform: translateY(-3px);
          }
          
          .social-link:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          }
          
          /* Mobile-specific enhancements */
          @media (hover: none) and (pointer: coarse) {
            .social-link {
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }
            
            .social-link:active {
              transform: scale(0.95);
              transition: transform 0.1s ease;
            }
            
            .social-link:hover {
              transform: none;
            }
            
            .social-link:hover::before {
              left: -100%;
            }
          }
          
          /* Enhanced touch feedback for mobile */
          @media (max-width: 768px) {
            .social-link {
              transition: all 0.2s ease;
            }
            
            .social-link:active {
              transform: scale(0.9);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            
            .social-link.github:active {
              box-shadow: 0 2px 8px rgba(51, 51, 51, 0.3);
            }
            
            .social-link.linkedin:active {
              box-shadow: 0 2px 8px rgba(0, 119, 181, 0.3);
            }
            
            .social-link.email:active {
              box-shadow: 0 2px 8px rgba(234, 67, 53, 0.3);
            }
          }
          
          .social-link.github:hover {
            background: #333;
            border-color: #333;
            box-shadow: 0 8px 25px rgba(51, 51, 51, 0.4);
          }
          
          .social-link.linkedin:hover {
            background: #0077B5;
            border-color: #0077B5;
            box-shadow: 0 8px 25px rgba(0, 119, 181, 0.4);
          }
          
          .social-link.email:hover {
            background: #EA4335;
            border-color: #EA4335;
            box-shadow: 0 8px 25px rgba(234, 67, 53, 0.4);
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
              className="d-flex justify-content-center justify-content-lg-end align-items-center gap-4 mb-3 social-links-container"
                    >
                      <motion.a
                href="https://github.com/Aadarsh2021"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
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
                className="social-link linkedin"
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
                className="social-link email"
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
      </Container>
    </footer>
  );
};

export default Footer; 