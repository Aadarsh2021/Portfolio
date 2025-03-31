import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="home" className="hero-section min-vh-100 d-flex align-items-center">
      <Container>
        <motion.div
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="display-4 fw-bold mb-4 text-gradient"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Hi, I'm <span className="text-primary">Aadarsh Thakur</span>
                </motion.h1>
                <motion.h2
                  className="display-6 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Full-Stack Developer
                </motion.h2>
                <motion.p
                  className="lead mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  I create beautiful and functional web applications with modern technologies
                  and best practices. Let's work together to bring your ideas to life.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.a
                    href="#contact"
                    className="btn btn-primary btn-lg me-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                    {BsArrowRight({ size: 20, className: "ms-2" })}
                  </motion.a>
                  <motion.a
                    href="#projects"
                    className="btn btn-outline-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects
                  </motion.a>
                </motion.div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                variants={itemVariants}
                className="position-relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-image-wrapper">
                  <div className="hero-image-container">
                    <img
                      src="/hero-image.jpg"
                      alt="Hero"
                      className="img-fluid rounded-3 shadow-lg"
                    />
                    <div className="hero-image-overlay"></div>
                  </div>
                  <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <motion.div
            className="scroll-indicator position-absolute bottom-0 start-50 translate-middle-x mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="scroll-text mb-2">Scroll Down</div>
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="scroll-arrow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero; 