import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  SiReact, SiTypescript, SiJavascript, SiPython, SiNodedotjs,
  SiMongodb, SiPostgresql, SiDocker, SiGit,
  SiBootstrap, SiFramer
} from 'react-icons/si';
import { BsCloud } from 'react-icons/bs';

interface Skill {
  name: string;
  level: number;
  icon: IconType;
  category: string;
  color: string;
}

const EnhancedSkills: React.FC = () => {
  const skills: Skill[] = [
    { name: 'React', level: 90, icon: SiReact, category: 'Frontend', color: '#61DAFB' },
    { name: 'TypeScript', level: 85, icon: SiTypescript, category: 'Frontend', color: '#3178C6' },
    { name: 'JavaScript', level: 88, icon: SiJavascript, category: 'Frontend', color: '#F7DF1E' },
    { name: 'Python', level: 82, icon: SiPython, category: 'Backend', color: '#3776AB' },
    { name: 'Node.js', level: 80, icon: SiNodedotjs, category: 'Backend', color: '#339933' },
    { name: 'MongoDB', level: 78, icon: SiMongodb, category: 'Database', color: '#47A248' },
    { name: 'PostgreSQL', level: 75, icon: SiPostgresql, category: 'Database', color: '#336791' },
    { name: 'AWS', level: 70, icon: BsCloud, category: 'Cloud', color: '#FF9900' },
    { name: 'Docker', level: 72, icon: SiDocker, category: 'DevOps', color: '#2496ED' },
    { name: 'Git', level: 85, icon: SiGit, category: 'Tools', color: '#F05032' },
    { name: 'Bootstrap', level: 90, icon: SiBootstrap, category: 'Frontend', color: '#7952B3' },
    { name: 'Framer Motion', level: 88, icon: SiFramer, category: 'Animation', color: '#0055FF' }
  ];

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools', 'Animation'];

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2
      }
    })
  };

  const renderIcon = (IconComponent: IconType, color: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; color: string }>;
    return <Icon size={24} color={color} />;
  };

  return (
    <Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="section-title text-center mb-5">
          Skills & Expertise
        </motion.h2>
        
        {categories.map((category) => {
          const categorySkills = skills.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;
          
          return (
            <motion.div key={category} variants={itemVariants} className="mb-5">
              <h4 className="mb-4 text-primary">{category}</h4>
              <Row className="g-4">
                {categorySkills.map((skill) => (
                  <Col key={skill.name} md={6}>
                    <motion.div 
                      className="skill-item p-3 glass-effect"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div className="skill-icon me-3">
                          {renderIcon(skill.icon, skill.color)}
                        </div>
                        <div className="skill-info flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{skill.name}</h6>
                            <small className="text-muted">{skill.level}%</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="skill-progress">
                        <ProgressBar 
                          now={0}
                          className="custom-progress"
                          style={{ height: '8px' }}
                        >
                          <motion.div
                            className="progress-bar"
                            variants={progressVariants}
                            custom={skill.level}
                            style={{
                              backgroundColor: skill.color,
                              height: '100%',
                              borderRadius: '4px'
                            }}
                          />
                        </ProgressBar>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
};

export default EnhancedSkills; 