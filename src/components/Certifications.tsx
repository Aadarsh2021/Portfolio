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
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.04,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      transition: { duration: 0.3 }
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
  );
};

export default Certifications; 