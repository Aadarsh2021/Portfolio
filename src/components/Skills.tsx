import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "SQL", level: 85 },
        { name: "MongoDB", level: 80 }
      ]
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 },
        { name: "CI/CD", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section section-padding">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <motion.h2 variants={itemVariants} className="display-4 mb-4 text-gradient">
                Skills & Expertise
              </motion.h2>
              <motion.p variants={itemVariants} className="lead">
                A comprehensive overview of my technical skills and expertise
              </motion.p>
            </Col>
          </Row>

          <Row>
            {skills.map((category, categoryIndex) => (
              <Col lg={4} key={category.category} className="mb-5">
                <motion.div
                  variants={itemVariants}
                  className="skill-category glass-effect p-4 rounded-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="h4 mb-4">{category.category}</h3>
                  <div className="skill-items">
                    {category.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="skill-item mb-4"
                        variants={itemVariants}
                      >
                        <div className="d-flex justify-content-between mb-2">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-progress"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Skills; 