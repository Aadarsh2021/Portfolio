import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsAward, BsCalendar, BsBuilding, BsTrophy, BsLightbulb, BsCheckCircle } from 'react-icons/bs';

const Certifications: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.02,
        delayChildren: 0.01
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const certifications = [
    {
      title: "Machine Learning Certification",
      issuer: "Bharat Intern",
      period: "05/2023 - 06/2023",
      description: "Successfully completed a Machine Learning Certification Course, mastering regression, decision trees, and clustering with hands-on experience in Python.",
      skills: [
        "Regression Analysis",
        "Decision Trees",
        "Clustering Techniques",
        "Python Programming"
      ]
    },
    {
      title: "Data Science Certification",
      issuer: "Google Developers Launchpad/Programming Hub",
      period: "07/2023 - 08/2023",
      description: "Successfully completed the Data Science Certification Course, gaining knowledge in Data Science concepts and applications.",
      certificateId: "1724688187259",
      skills: [
        "Data Analysis",
        "Data Visualization",
        "Statistical Methods",
        "Data Science Fundamentals"
      ]
    },
    {
      title: "Virtual Internship in Web Development",
      issuer: "Bharat Intern",
      period: "10/2023 - 11/2023",
      description: "Successfully completed a virtual internship program in web development, demonstrating skills in front-end development.",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Frontend Development"
      ]
    }
  ];

  const achievements = [
    {
      title: "IVS Hackathon",
      position: "4th Position",
      description: "Secured 4th place by presenting FarmEase, a patented platform for enhancing agricultural productivity. Demonstrated innovative solutions and strong problem-solving skills.",
      highlights: [
        "Led a team of 4 developers",
        "Implemented AI-powered solutions",
        "Received positive feedback from judges",
        "Won prize money of ₹10,000"
      ]
    }
  ];

  const patents = [
    {
      title: "Knapsack Security",
      description: "A patented security system implementing advanced encryption algorithms for secure data transmission.",
      features: [
        "Advanced encryption protocols",
        "Secure key management",
        "Real-time threat detection"
      ]
    },
    {
      title: "FarmEase",
      description: "A patented blockchain-based e-commerce platform revolutionizing agricultural product transactions with smart contracts.",
      features: [
        "Smart contract-based payment system",
        "Automated order fulfillment",
        "Transparent transaction tracking",
        "Decentralized marketplace"
      ]
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <style>
        {`
          @media (max-width: 768px) {
            .certifications-section {
              padding: 3rem 0;
            }
            .display-4 {
              font-size: clamp(2rem, 6vw, 3.5rem) !important;
              margin-bottom: 2rem !important;
            }
            .h4 {
              font-size: clamp(1.3rem, 4vw, 1.5rem) !important;
              margin-bottom: 1.5rem !important;
            }
            .glass-effect {
              margin-bottom: 1.5rem !important;
              padding: 1.5rem !important;
            }
            .card-title {
              font-size: clamp(1.1rem, 3vw, 1.25rem) !important;
              margin-bottom: 0.5rem !important;
            }
            .card-subtitle {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              margin-bottom: 0.5rem !important;
            }
            .card-text {
              font-size: clamp(0.85rem, 2.5vw, 0.95rem) !important;
              line-height: 1.5 !important;
              margin-bottom: 1rem !important;
            }
            .badge {
              font-size: clamp(0.7rem, 2vw, 0.8rem) !important;
              padding: 0.3rem 0.5rem !important;
              margin: 0.2rem !important;
            }
            .list-unstyled li {
              font-size: clamp(0.8rem, 2.5vw, 0.9rem) !important;
              line-height: 1.4 !important;
              margin-bottom: 0.5rem !important;
            }
            .cert-icon, .achievement-icon {
              min-width: 40px !important;
            }
          }
          
          @media (max-width: 480px) {
            .certifications-section {
              padding: 2rem 0;
            }
            .display-4 {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
            }
            .h4 {
              font-size: clamp(1.2rem, 3.5vw, 1.4rem) !important;
            }
            .glass-effect {
              padding: 1.25rem !important;
            }
            .card-title {
              font-size: clamp(1rem, 2.8vw, 1.2rem) !important;
            }
            .card-text {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            .badge {
              font-size: clamp(0.65rem, 1.8vw, 0.75rem) !important;
              padding: 0.25rem 0.4rem !important;
            }
            .list-unstyled li {
              font-size: clamp(0.75rem, 2.2vw, 0.85rem) !important;
            }
            .cert-icon, .achievement-icon {
              min-width: 35px !important;
            }
          }
          
          .glass-effect:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .text-gradient {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .badge:hover {
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
          
          .cert-icon, .achievement-icon {
            min-width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="display-4 mb-4 text-white">
            Certifications & <span className="text-gradient">Achievements</span>
          </motion.h2>

          <Row className="g-4">
            <Col lg={6}>
              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white">
                {BsAward({ size: 24, className: "me-2" })}
                Certifications
              </motion.h3>
              {certifications.map((cert, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="mb-4 glass-effect">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="cert-icon me-3">
                          {BsAward({ size: 24, className: "text-primary" })}
                        </div>
                        <div>
                          <Card.Title className="text-white mb-1">{cert.title}</Card.Title>
                          <Card.Subtitle className="text-light">
                            {BsBuilding({ size: 16, className: "me-2" })}
                            {cert.issuer}
                          </Card.Subtitle>
                        </div>
                      </div>
                      <div className="mb-3">
                        {BsCalendar({ size: 16, className: "me-2 text-muted" })}
                        <span className="text-muted">{cert.period}</span>
                      </div>
                      <Card.Text className="text-white mb-3">{cert.description}</Card.Text>
                      {cert.certificateId && (
                        <div className="mb-3">
                          <strong className="text-light">Certificate ID:</strong>{" "}
                          <span className="text-muted">{cert.certificateId}</span>
                        </div>
                      )}
                      <div className="skills-container">
                        <h6 className="text-light mb-2">Key Skills:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {cert.skills.map((skill, i) => (
                            <span key={i} className="badge bg-primary">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </Col>

            <Col lg={6}>
              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white">
                {BsTrophy({ size: 24, className: "me-2" })}
                Achievements & Patents
              </motion.h3>
              
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="mb-4 glass-effect">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="achievement-icon me-3">
                          {BsTrophy({ size: 24, className: "text-primary" })}
                        </div>
                        <div>
                          <Card.Title className="text-white mb-1">{achievement.title}</Card.Title>
                          <Card.Subtitle className="text-light">{achievement.position}</Card.Subtitle>
                        </div>
                      </div>
                      <Card.Text className="text-white mb-3">{achievement.description}</Card.Text>
                      <div className="highlights-list">
                        <h6 className="text-light mb-2">Highlights:</h6>
                        <ul className="list-unstyled mb-0">
                          {achievement.highlights.map((highlight, i) => (
                            <li key={i} className="d-flex align-items-center mb-2">
                              {BsCheckCircle({ size: 16, className: "text-primary me-2" })}
                              <span className="text-light">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}

              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white">
                {BsLightbulb({ size: 24, className: "me-2" })}
                Patents
              </motion.h3>
              
              {patents.map((patent, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="mb-4 glass-effect">
                    <Card.Body>
                      <Card.Title className="text-white mb-3">{patent.title}</Card.Title>
                      <Card.Text className="text-white mb-3">{patent.description}</Card.Text>
                      <div className="features-list">
                        <h6 className="text-light mb-2">Key Features:</h6>
                        <ul className="list-unstyled mb-0">
                          {patent.features.map((feature, i) => (
                            <li key={i} className="d-flex align-items-center mb-2">
                              {BsLightbulb({ size: 16, className: "text-primary me-2" })}
                              <span className="text-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Certifications; 