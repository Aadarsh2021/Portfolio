import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsCode, BsBook, BsGear } from 'react-icons/bs';

const About: React.FC = () => {
  const skills = {
    technical: [
      "Python", "Machine Learning", "Deep Learning", "Data Science",
      "React", "TypeScript", "Node.js", "Web Development",
      "SQL", "MongoDB", "Git", "Docker"
    ],
    languages: ["Hindi", "English"],
    tools: ["VS Code", "PyCharm", "Jupyter Notebook", "Git", "GitHub"]
  };

  const education = [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science Engineering",
      institution: "G L Bajaj Group of Institutions",
      period: "2021-2025"
    },
    {
      degree: "12th Science (PCM)",
      institution: "Dashmesh Public School",
      period: "2021"
    },
    {
      degree: "10th",
      institution: "Holy Mary International School",
      period: "2018"
    }
  ];

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="about-content"
      >
        <h2 className="section-title">About Me</h2>
        
        <p className="about-intro">
          I am a passionate Computer Science Engineering student with a strong focus on Machine Learning, 
          Web Development, and emerging technologies. My goal is to create innovative solutions that make 
          a positive impact on society.
        </p>

        <Row className="g-4">
          <Col lg={4}>
            <div className="about-card">
              <h3 className="about-card-title">
                {BsCode({ size: 24 })} Technical Skills
              </h3>
              <div className="skill-list">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="about-card">
              <h3 className="about-card-title">
                {BsGear({ size: 24 })} Core Competencies
              </h3>
              <div className="about-card-content">
                <ul className="list-unstyled mb-0">
                  <li>• Full Stack Development</li>
                  <li>• Machine Learning & AI</li>
                  <li>• Data Analysis</li>
                  <li>• Problem Solving</li>
                  <li>• Project Management</li>
                </ul>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="about-card">
              <h3 className="about-card-title">
                {BsBook({ size: 24 })} Education
              </h3>
              <div className="about-card-content">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-title">{edu.degree}</div>
                    <div className="education-subtitle">{edu.institution}</div>
                    <div className="education-period">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default About; 