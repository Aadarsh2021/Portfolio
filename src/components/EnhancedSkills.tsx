import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiFramer, 
  SiPython, SiTensorflow, SiPandas, SiNumpy, SiScikitlearn,
  SiMysql, SiGit, SiGithub, SiVercel, SiPostman,
  SiJupyter, SiGooglecolab
} from 'react-icons/si';
import { BsCpu, BsCodeSlash, BsDatabase, BsGlobe, BsEye, BsGraphUp } from 'react-icons/bs';

interface Skill {
  name: string;
  level: number;
  icon: IconType;
  category: string;
  color: string;
}

const EnhancedSkills: React.FC = () => {
  const skills: Skill[] = [
    // Programming Languages
    { name: 'Python', level: 95, icon: SiPython, category: 'Programming Languages', color: '#3776AB' },
    { name: 'JavaScript', level: 90, icon: SiJavascript, category: 'Programming Languages', color: '#F7DF1E' },
    
    // Web Development
    { name: 'HTML5', level: 95, icon: SiHtml5, category: 'Web Development', color: '#E34F26' },
    { name: 'CSS3', level: 90, icon: SiCss3, category: 'Web Development', color: '#1572B6' },
    { name: 'React.js', level: 88, icon: SiReact, category: 'Web Development', color: '#61DAFB' },
    { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss, category: 'Web Development', color: '#06B6D4' },
    { name: 'Framer Motion', level: 80, icon: SiFramer, category: 'Web Development', color: '#0055FF' },
    { name: 'Node.js', level: 75, icon: BsCodeSlash, category: 'Web Development', color: '#339933' },
    { name: 'Express.js', level: 70, icon: BsCodeSlash, category: 'Web Development', color: '#000000' },
    { name: 'Flask', level: 80, icon: SiPython, category: 'Web Development', color: '#000000' },
    { name: 'Flask-SocketIO', level: 75, icon: BsCodeSlash, category: 'Web Development', color: '#000000' },
    
    // Frontend Tools
    { name: 'Responsive Design', level: 90, icon: BsGlobe, category: 'Frontend Tools', color: '#4ECDC4' },
    { name: 'Progressive Web Apps (PWA)', level: 80, icon: BsGlobe, category: 'Frontend Tools', color: '#FF6B6B' },
    { name: 'UI/UX with animations', level: 85, icon: SiFramer, category: 'Frontend Tools', color: '#A78BFA' },
    { name: 'Mapbox (geospatial mapping)', level: 75, icon: BsGlobe, category: 'Frontend Tools', color: '#4264EB' },
    
    // Backend & APIs
    { name: 'RESTful APIs', level: 85, icon: BsCodeSlash, category: 'Backend & APIs', color: '#FF6C37' },
    { name: 'MongoDB', level: 80, icon: BsDatabase, category: 'Backend & APIs', color: '#47A248' },
    { name: 'SQLite', level: 75, icon: BsDatabase, category: 'Backend & APIs', color: '#003B57' },
    { name: 'MySQL', level: 80, icon: SiMysql, category: 'Backend & APIs', color: '#4479A1' },
    
    // AI / Machine Learning / Deep Learning
    { name: 'Machine Learning (Supervised, Unsupervised)', level: 85, icon: BsCpu, category: 'AI / Machine Learning / Deep Learning', color: '#4ECDC4' },
    { name: 'Deep Learning', level: 80, icon: BsCpu, category: 'AI / Machine Learning / Deep Learning', color: '#FF6F00' },
    { name: 'Scikit-learn', level: 82, icon: SiScikitlearn, category: 'AI / Machine Learning / Deep Learning', color: '#F7931E' },
    { name: 'TensorFlow', level: 78, icon: SiTensorflow, category: 'AI / Machine Learning / Deep Learning', color: '#FF6F00' },
    { name: 'PyTorch', level: 75, icon: SiPython, category: 'AI / Machine Learning / Deep Learning', color: '#EE4C2C' },
    { name: 'Model Training & Evaluation', level: 80, icon: BsGraphUp, category: 'AI / Machine Learning / Deep Learning', color: '#4ECDC4' },
    
    // Computer Vision
    { name: 'OpenCV', level: 85, icon: BsEye, category: 'Computer Vision', color: '#5C3EE8' },
    { name: 'YOLOv7', level: 80, icon: BsEye, category: 'Computer Vision', color: '#FF6B6B' },
    { name: 'ByteTrack', level: 75, icon: BsEye, category: 'Computer Vision', color: '#4ECDC4' },
    { name: 'Real-time Object Detection & Tracking', level: 80, icon: BsEye, category: 'Computer Vision', color: '#FF6F00' },
    { name: 'Video Feed Analysis', level: 75, icon: BsEye, category: 'Computer Vision', color: '#A78BFA' },
    
    // Data Science & Analytics
    { name: 'Pandas', level: 88, icon: SiPandas, category: 'Data Science & Analytics', color: '#130654' },
    { name: 'NumPy', level: 85, icon: SiNumpy, category: 'Data Science & Analytics', color: '#4DABCF' },
    { name: 'Matplotlib', level: 80, icon: BsGraphUp, category: 'Data Science & Analytics', color: '#11557C' },
    { name: 'Real-time Data Analytics', level: 75, icon: BsGraphUp, category: 'Data Science & Analytics', color: '#4ECDC4' },
    
    // Tools & Platforms
    { name: 'Git', level: 90, icon: SiGit, category: 'Tools & Platforms', color: '#F05032' },
    { name: 'GitHub', level: 88, icon: SiGithub, category: 'Tools & Platforms', color: '#181717' },
    { name: 'Vercel', level: 85, icon: SiVercel, category: 'Tools & Platforms', color: '#000000' },
    { name: 'VS Code', level: 92, icon: BsCodeSlash, category: 'Tools & Platforms', color: '#007ACC' },
    { name: 'Postman', level: 85, icon: SiPostman, category: 'Tools & Platforms', color: '#FF6C37' },
    { name: 'Google Colab', level: 90, icon: SiGooglecolab, category: 'Tools & Platforms', color: '#F9AB00' },
    { name: 'Jupyter Notebook', level: 88, icon: SiJupyter, category: 'Tools & Platforms', color: '#F37626' }
  ];

  const categories = [
    'Programming Languages',
    'Web Development', 
    'Frontend Tools',
    'Backend & APIs',
    'AI / Machine Learning / Deep Learning',
    'Computer Vision',
    'Data Science & Analytics',
    'Tools & Platforms'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.02,
        delayChildren: 0.01
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
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
        delay: 0.5
      }
    })
  };

  const renderIcon = (IconComponent: IconType, className?: string) => {
    const Icon = IconComponent as any;
    return <Icon className={className} />;
  };

  return (
    <section id="skills" className="skills-section">
      <style>
        {`
          @media (max-width: 768px) {
            .skills-section {
              padding: 2rem 0;
            }
            
            .skill-card {
              margin-bottom: 1rem !important;
              padding: 1rem !important;
            }
            
            .skill-icon {
              width: 40px !important;
              height: 40px !important;
              font-size: 1rem !important;
            }
            
            .skill-name {
              font-size: 1rem !important;
              line-height: 1.3 !important;
            }
            
            .category-title {
              font-size: 1.5rem !important;
              margin-bottom: 1rem !important;
            }
            
            .section-title {
              font-size: 2rem !important;
              margin-bottom: 1rem !important;
            }
            
            .section-subtitle {
              font-size: 1rem !important;
              margin-bottom: 2rem !important;
            }
            
            .progress-bar {
              height: 8px !important;
            }
            
            .skill-level span {
              font-size: 0.75rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .skills-section {
              padding: 1.5rem 0;
            }
            
            .skill-card {
              padding: 0.75rem !important;
            }
            
            .skill-icon {
              width: 35px !important;
              height: 35px !important;
              font-size: 0.875rem !important;
            }
            
            .skill-name {
              font-size: 0.9rem !important;
            }
            
            .category-title {
              font-size: 1.25rem !important;
            }
            
            .section-title {
              font-size: 1.75rem !important;
            }
            
            .section-subtitle {
              font-size: 0.9rem !important;
            }
          }
        `}
      </style>
      <Container>
        <motion.div
          className="text-center mb-5"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title mb-3" style={{
            fontSize: 'clamp(2rem, 5vw, var(--font-size-4xl))',
            fontWeight: 800,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2
          }}>
            Skills & Expertise
          </h2>
          <p className="section-subtitle" style={{
            fontSize: 'clamp(1rem, 3vw, var(--font-size-lg))',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            A comprehensive collection of my technical skills and expertise across various domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              className="category-section mb-5"
              variants={itemVariants}
            >
              <motion.h3 
                className="category-title mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, var(--font-size-2xl))',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  borderBottom: '3px solid var(--primary)',
                  paddingBottom: 'var(--space-3)',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                {category}
              </motion.h3>
              
              <Row className="g-3 g-md-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <Col key={skill.name} lg={6} md={6} sm={12} xs={12}>
                      <motion.div
                        className="skill-card"
                        variants={skillVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: 'var(--glass-bg)',
                          border: '2px solid var(--glass-border)',
                          borderRadius: 'var(--radius-xl)',
                          padding: 'clamp(1rem, 4vw, var(--space-6))',
                          backdropFilter: 'blur(20px)',
                          boxShadow: 'var(--shadow-lg)',
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                          minWidth: 'auto',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                            transformOrigin: 'left'
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        
                        <div className="d-flex align-items-start mb-3">
                          <div 
                            className="skill-icon me-3"
                            style={{
                              width: 'clamp(40px, 8vw, 50px)',
                              height: 'clamp(40px, 8vw, 50px)',
                              borderRadius: 'var(--radius-lg)',
                              background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 'clamp(1rem, 4vw, var(--font-size-xl))',
                              boxShadow: `0 0 20px ${skill.color}40`,
                              flexShrink: 0
                            }}
                          >
                            {renderIcon(skill.icon)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 
                              className="skill-name mb-2"
                              style={{
                                fontSize: 'clamp(1rem, 3vw, var(--font-size-lg))',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                margin: 0,
                                lineHeight: 1.3
                              }}
                            >
                              {skill.name}
                            </h4>
                            <div className="skill-level">
                              <div className="d-flex justify-content-between align-items-center mb-2" style={{ 
                                gap: 'clamp(0.5rem, 2vw, var(--space-3))',
                                flexWrap: 'wrap'
                              }}>
                                <span style={{
                                  fontSize: 'clamp(0.75rem, 2.5vw, var(--font-size-sm))',
                                  color: 'var(--text-secondary)',
                                  fontWeight: 500,
                                  letterSpacing: '0.5px',
                                  textTransform: 'uppercase',
                                  padding: '4px 0',
                                  whiteSpace: 'nowrap'
                                }}>
                                  Proficiency
                                </span>
                                <span style={{
                                  fontSize: 'clamp(0.75rem, 2.5vw, var(--font-size-sm))',
                                  color: skill.color,
                                  fontWeight: 700,
                                  padding: 'clamp(4px, 1.5vw, 6px) clamp(8px, 2.5vw, 12px)',
                                  borderRadius: 'var(--radius-sm)',
                                  background: `${skill.color}15`,
                                  border: `1px solid ${skill.color}30`,
                                  minWidth: 'clamp(40px, 8vw, 50px)',
                                  textAlign: 'center',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {skill.level}%
                                </span>
                              </div>
                              <div 
                                className="progress-bar"
                                style={{
                                  height: 'clamp(8px, 2vw, 10px)',
                                  background: 'var(--glass-border)',
                                  borderRadius: 'var(--radius-full)',
                                  overflow: 'hidden',
                                  marginTop: 'var(--space-2)'
                                }}
                              >
                                <motion.div
                                  className="progress-fill"
                                  style={{
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                                    borderRadius: 'var(--radius-full)',
                                    boxShadow: `0 0 10px ${skill.color}40`
                                  }}
                                  variants={progressVariants}
                                  custom={skill.level}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <motion.div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${skill.color}10 0%, transparent 50%)`,
                            opacity: 0,
                            pointerEvents: 'none'
                          }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Col>
                  ))}
              </Row>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default EnhancedSkills;