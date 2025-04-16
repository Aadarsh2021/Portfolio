import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { BsLaptop, BsGear } from 'react-icons/bs';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: IconType;
}

const projects: Project[] = [
  {
    title: "FarmEase",
    description: "A blockchain-based e-commerce platform for agricultural products featuring smart contract payments, transparent transactions, and automated order fulfillment.",
    technologies: ["React", "Solidity", "Web3.js", "Node.js", "MongoDB"],
    icon: BsGear
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and a clean design.",
    technologies: ["React", "TypeScript", "Bootstrap", "Framer Motion"],
    icon: BsLaptop
  },
  {
    title: "Smart City Traffic Detection",
    description: "A deep learning-based computer vision system to detect and analyze urban traffic using YOLOv5. Deployed for smart city automation with real-time inference.",
    technologies: ["Python", "YOLOv5", "OpenCV", "PyTorch", "Flask"],
    icon: BsGear
  }
];


const Projects: React.FC = () => {
  const renderIcon = (IconComponent: IconType, size: number) => {
    const Icon = IconComponent as React.ComponentType<{ size: number }>;
    return <Icon size={size} />;
  };

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
        duration: 0.5
      }
    }
  };

  return (
    <Container>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 className="section-title text-center mb-5">Projects</h2>
        <Row className="g-4">
          {projects.map((project, index) => (
            <Col key={index} md={4}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 glass-effect">
                  <Card.Body className="d-flex flex-column">
                    <div className="project-icon mb-3">
                      {renderIcon(project.icon, 40)}
                    </div>
                    <Card.Title className="mb-3">{project.title}</Card.Title>
                    <Card.Text className="flex-grow-1">{project.description}</Card.Text>
                    <div className="mt-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="badge bg-primary me-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default Projects; 