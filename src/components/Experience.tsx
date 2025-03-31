import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsBriefcase, BsMortarboard } from 'react-icons/bs';

const Experience: React.FC = () => {
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
      y: 0
    }
  };

  const internships = [
    {
      title: "Data Science Internship",
      company: "Internship Studio",
      period: "10/2024",
      description: "Successfully completed Data Science Internship training, earning a Certificate of Completion.",
      achievements: [
        "Certificate Number: ISDSCT933504",
        "Gained hands-on experience in data analysis and visualization",
        "Completed comprehensive training in data science fundamentals"
      ]
    },
    {
      title: "AI-ML Virtual Internship",
      company: "AICTE",
      period: "04/2024 - 06/2024",
      description: "Successfully completed a 4-week AI and Machine Learning course.",
      achievements: [
        "Earned Course Completion and Internship Certificates from AICTE and EduSkills",
        "Gained hands-on experience with key AI concepts and technologies",
        "Developed practical skills in machine learning applications"
      ]
    },
    {
      title: "Web Development Virtual Internship",
      company: "Bharat Intern",
      period: "10/2023 - 11/2023",
      description: "Successfully completed a virtual internship program in Web Development.",
      achievements: [
        "Demonstrated skills in HTML, CSS, and JavaScript for frontend development",
        "Built responsive and interactive web applications",
        "Learned modern web development practices"
      ]
    }
  ];

  const education = [
    {
      title: "Bachelor of Technology (B.Tech)",
      school: "G L Bajaj Group of Institutions, Mathura",
      period: "2021 - 2025",
      description: "Major: Computer Science Engineering",
      achievements: [
        "CGPA: 6.5/10",
        "Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development, Machine Learning"
      ]
    },
    {
      title: "12th Science (PCM)",
      school: "Dashmesh Public School",
      period: "2021",
      description: "Scored: 75%",
      achievements: [
        "Strong foundation in Physics, Chemistry, and Mathematics",
        "Active participation in technical events and competitions"
      ]
    },
    {
      title: "10th",
      school: "Holy Mary International School",
      period: "2018",
      description: "Scored: 75%",
      achievements: [
        "Excellent academic performance",
        "Participated in various extracurricular activities"
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
          Experience & <span className="text-gradient">Education</span>
        </motion.h2>

        <Row className="g-4">
          <Col lg={6}>
            <motion.div variants={itemVariants}>
              <h3 className="h4 mb-4 text-white">
                {BsBriefcase({ size: 24, className: "me-2" })}
                Internships
              </h3>
              {internships.map((internship, index) => (
                <Card key={index} className="mb-4 glass-effect">
                  <Card.Body>
                    <Card.Title className="text-white">{internship.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-light">{internship.company}</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">{internship.period}</Card.Text>
                    <Card.Text className="text-white">{internship.description}</Card.Text>
                    <ul className="list-unstyled">
                      {internship.achievements.map((achievement, i) => (
                        <li key={i} className="text-light mb-2">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              ))}
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div variants={itemVariants}>
              <h3 className="h4 mb-4 text-white">
                {BsMortarboard({ size: 24, className: "me-2" })}
                Education
              </h3>
              {education.map((edu, index) => (
                <Card key={index} className="mb-4 glass-effect">
                  <Card.Body>
                    <Card.Title className="text-white">{edu.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-light">{edu.school}</Card.Subtitle>
                    <Card.Text className="text-muted mb-3">{edu.period}</Card.Text>
                    <Card.Text className="text-white">{edu.description}</Card.Text>
                    <ul className="list-unstyled">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-light mb-2">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              ))}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Experience; 