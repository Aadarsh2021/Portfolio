import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsAward, BsCalendar, BsBuilding, BsTrophy, BsLightbulb, BsCheckCircle, BsFileEarmarkPdf } from 'react-icons/bs';

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
      title: "Data Science Certification",
      issuer: "Google Developers Launchpad",
      period: "2023",
      description: "Comprehensive Data Science certification covering data analysis, visualization, and machine learning concepts.",
      certificateFile: "/assets/certificates/google ds.jpg",
      skills: [
        "Data Analysis",
        "Data Visualization",
        "Statistical Methods",
        "Machine Learning Basics"
      ]
    },
    {
      title: "Machine Learning Internship",
      issuer: "Bharat Intern",
      period: "2023",
      description: "Completed intensive machine learning internship with hands-on projects and real-world applications.",
      certificateFile: "/assets/certificates/Bharat ML.pdf",
      skills: [
        "Machine Learning Algorithms",
        "Data Preprocessing",
        "Model Development",
        "Python Programming"
      ]
    },
    {
      title: "Web Development Internship",
      issuer: "Bharat Intern",
      period: "2023",
      description: "Virtual internship focused on modern web development technologies and best practices.",
      certificateFile: "/assets/certificates/Bharat WD.pdf",
      skills: [
        "HTML5/CSS3",
        "JavaScript",
        "React.js",
        "Responsive Design"
      ]
    },
    {
      title: "Python Programming",
      issuer: "Programming Hub",
      period: "2023",
      description: "Advanced Python programming certification covering core concepts and practical applications.",
      certificateFile: "/assets/certificates/Python Prgramming hub.pdf",
      skills: [
        "Python Core Concepts",
        "Object-Oriented Programming",
        "Data Structures",
        "Algorithm Design"
      ]
    },
    {
      title: "Data Science Internship",
      issuer: "Training and Internship Program",
      period: "2023",
      description: "Comprehensive data science program combining theoretical knowledge with practical applications.",
      certificateFile: "/assets/certificates/Aadarsh Thakur - Data Science Internship - Training.pdf",
      skills: [
        "Data Analysis",
        "Machine Learning",
        "Statistical Analysis",
        "Data Visualization"
      ]
    },
    {
      title: "SQL Basics Certification",
      issuer: "HackerRank",
      period: "2023",
      description: "Certification in SQL fundamentals and database management.",
      certificateFile: "/assets/certificates/sql_basic certificate.pdf",
      skills: [
        "SQL Queries",
        "Database Design",
        "Data Manipulation",
        "Database Management"
      ]
    },
    {
      title: "CSS Certification",
      issuer: "HackerRank",
      period: "2023",
      description: "Advanced CSS styling and modern web design techniques certification.",
      certificateFile: "/assets/certificates/css certificate.pdf",
      skills: [
        "Advanced CSS",
        "Flexbox/Grid",
        "Responsive Design",
        "CSS Animations"
      ]
    },
    {
      title: "AI/ML Specialization",
      issuer: "Professional Certification",
      period: "2023",
      description: "Specialized certification in Artificial Intelligence and Machine Learning applications.",
      certificateFile: "/assets/certificates/aiml.pdf",
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Neural Networks",
        "Deep Learning"
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

  const handleCertificateClick = (certificateFile: string) => {
    // Remove the leading slash if present
    const cleanPath = certificateFile.startsWith('/') ? certificateFile.slice(1) : certificateFile;
    // Get the base URL from the current window location
    const baseUrl = window.location.origin;
    // Combine the base URL with the certificate path
    const fullUrl = `${baseUrl}/${cleanPath}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <section id="certifications" className="certifications-section">
      <style>
        {`
          .certifications-section {
            padding: 5rem 0;
            background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
          }

          .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            transition: all 0.4s ease;
          }

          .certificate-card {
            cursor: pointer;
            overflow: hidden;
            position: relative;
          }
          
          .certificate-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
          }
          
          .certificate-card:hover::before {
            transform: translateX(100%);
          }
          
          .certificate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            background: rgba(255, 255, 255, 0.08);
          }

          .card-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .card-subtitle {
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 1rem;
          }

          .badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 500;
            letter-spacing: 0.5px;
            background: rgba(var(--primary-rgb), 0.1);
            color: var(--primary);
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            transition: all 0.3s ease;
          }

          .badge:hover {
            transform: scale(1.05);
            background: rgba(var(--primary-rgb), 0.15);
            border-color: rgba(var(--primary-rgb), 0.3);
          }

          .view-certificate {
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .view-certificate:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(var(--primary-rgb), 0.3);
          }

          .cert-icon, .achievement-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(var(--primary-rgb), 0.1);
            border-radius: 12px;
            margin-right: 1rem;
          }

          .text-gradient {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
          }

          .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
          }

          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          @media (max-width: 768px) {
            .certifications-section {
              padding: 3rem 0;
            }
            .section-title {
              font-size: 2rem;
              margin-bottom: 2rem;
            }
            .card-title {
              font-size: 1.2rem;
            }
            .badge {
              padding: 0.4rem 0.8rem;
              font-size: 0.9rem;
            }
            .view-certificate {
              padding: 0.6rem 1.2rem;
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .certifications-section {
              padding: 2rem 0;
            }
            .section-title {
              font-size: 1.8rem;
            }
            .card-title {
              font-size: 1.1rem;
            }
            .badge {
              padding: 0.3rem 0.7rem;
              font-size: 0.8rem;
            }
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
          <motion.h2 variants={itemVariants} className="section-title text-white">
            Certifications & <span className="text-gradient">Achievements</span>
          </motion.h2>

          <Row className="g-4">
            <Col lg={8}>
              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white d-flex align-items-center">
                {BsAward({ size: 24, className: "text-primary me-2" })}
                Certifications
              </motion.h3>
              {certifications.map((cert, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card 
                    className="mb-4 glass-effect certificate-card"
                    onClick={() => handleCertificateClick(cert.certificateFile)}
                  >
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="cert-icon">
                          {BsAward({ size: 24, className: "text-primary" })}
                        </div>
                        <div>
                          <Card.Title>{cert.title}</Card.Title>
                          <Card.Subtitle className="text-light d-flex align-items-center">
                            {BsBuilding({ size: 16, className: "me-2" })}
                            {cert.issuer}
                          </Card.Subtitle>
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center text-muted">
                        {BsCalendar({ size: 16, className: "me-2" })}
                        <span>{cert.period}</span>
                      </div>
                      <Card.Text className="text-white">{cert.description}</Card.Text>
                      <div className="skills-container">
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <button className="view-certificate">
                        {BsFileEarmarkPdf({ size: 16 })}
                        View Certificate
                      </button>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </Col>

            <Col lg={4}>
              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white d-flex align-items-center">
                {BsTrophy({ size: 24, className: "text-primary me-2" })}
                Achievements
              </motion.h3>
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="mb-4 glass-effect">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="achievement-icon">
                          {BsTrophy({ size: 24, className: "text-primary" })}
                        </div>
                        <div>
                          <Card.Title>{achievement.title}</Card.Title>
                          <Card.Subtitle className="text-primary">
                            {achievement.position}
                          </Card.Subtitle>
                        </div>
                      </div>
                      <Card.Text className="text-white">{achievement.description}</Card.Text>
                      <ul className="list-unstyled mb-0">
                        {achievement.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-light mb-2 d-flex align-items-center">
                            {BsCheckCircle({ size: 16, className: "text-primary me-2" })}
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}

              <motion.h3 variants={itemVariants} className="h4 mb-4 text-white mt-4 d-flex align-items-center">
                {BsLightbulb({ size: 24, className: "text-primary me-2" })}
                Patents
              </motion.h3>
              {patents.map((patent, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="mb-4 glass-effect">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="achievement-icon">
                          {BsLightbulb({ size: 24, className: "text-primary" })}
                        </div>
                        <Card.Title>{patent.title}</Card.Title>
                      </div>
                      <Card.Text className="text-white">{patent.description}</Card.Text>
                      <ul className="list-unstyled mb-0">
                        {patent.features.map((feature, idx) => (
                          <li key={idx} className="text-light mb-2 d-flex align-items-center">
                            {BsCheckCircle({ size: 16, className: "text-primary me-2" })}
                            {feature}
                          </li>
                        ))}
                      </ul>
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