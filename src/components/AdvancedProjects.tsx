import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsLaptop, 
  BsGear, 
  BsGithub, 
  BsEye, 
  BsSearch, 
  BsCode,
  BsGlobe,
  BsPhone,
  BsLock
} from 'react-icons/bs';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'blockchain' | 'ai' | 'fullstack';
  icon: IconType;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  year: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "FarmEase - Agricultural E-commerce Platform",
    description: "A comprehensive e-commerce platform for agricultural products featuring organic vegetables, fruits, seeds, and farming tools with 24/7 support.",
    longDescription: "FarmEase is a modern agricultural e-commerce platform offering premium organic vegetables, fresh fruits, certified seeds, fertilizers, and farming equipment. Features include category-based shopping, seasonal deals, secure payment processing, free shipping, easy returns, and 24/7 customer support. The platform connects farmers directly with consumers, ensuring fresh, quality products delivered to your doorstep.",
    technologies: ["React", "JavaScript", "CSS", "Bootstrap", "E-commerce", "Responsive Design"],
    category: 'web',
    icon: BsGear,
    image: "/assets/farmease.png",
    githubUrl: "https://github.com/Aadarsh2021/farm",
    liveUrl: "https://farm-phi-jade.vercel.app/",
    status: 'completed',
    featured: true,
    year: 2024
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with React, TypeScript, and advanced animations.",
    longDescription: "A cutting-edge portfolio website showcasing modern web development practices. Features include dark/light theme switching, smooth animations with Framer Motion, responsive design, SEO optimization, and performance monitoring. Built with React 18, TypeScript, and Bootstrap for a professional presentation.",
    technologies: ["React", "TypeScript", "Bootstrap", "Framer Motion", "EmailJS"],
    category: 'web',
    icon: BsLaptop,
    image: "/assets/portfolio.png",
    githubUrl: "https://github.com/Aadarsh2021/portfolio",
    liveUrl: "https://portfolio-khaki-omega-43.vercel.app/",
    status: 'completed',
    featured: true,
    year: 2024
  },
  {
    id: 3,
    title: "Smart City Traffic Detection",
    description: "A deep learning-based computer vision system to detect and analyze urban traffic using YOLOv5.",
    longDescription: "An advanced computer vision system leveraging YOLOv5 for real-time traffic detection and analysis in smart city environments. Features include vehicle counting, traffic flow analysis, congestion detection, and automated reporting. Deployed with real-time inference capabilities for urban traffic management.",
    technologies: ["Python", "YOLOv5", "OpenCV", "PyTorch", "Flask", "TensorFlow"],
    category: 'ai',
    icon: BsGear,
    image: "/assets/Smart.png",
    githubUrl: "https://github.com/Aadarsh2021/traffic-detection",
    status: 'completed',
    featured: false,
    year: 2023
  }
];

const categories = [
  { key: 'all', label: 'All Projects', icon: BsGlobe },
  { key: 'web', label: 'Web Development', icon: BsLaptop },
  { key: 'mobile', label: 'Mobile Apps', icon: BsPhone },
  { key: 'blockchain', label: 'Blockchain', icon: BsLock },
  { key: 'ai', label: 'AI/ML', icon: BsGear },
  { key: 'fullstack', label: 'Full Stack', icon: BsCode }
];

const AdvancedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || project.featured;
      
      return matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [selectedCategory, searchTerm, showFeaturedOnly]);

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'planned': return 'info';
      default: return 'secondary';
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -15 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="projects" className="projects-section section-padding">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-center mb-5"
            variants={itemVariants}
            style={{
              fontSize: 'var(--font-size-4xl)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Featured Projects
          </motion.h2>
          
          {/* Enhanced Search and Filter Controls */}
          <motion.div variants={itemVariants}>
            <Row className="mb-4">
              <Col md={6} xs={12} className="mb-3 mb-md-0">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <InputGroup>
                    <InputGroup.Text style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}>
                      {renderIcon(BsSearch, 16)}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                      style={{ 
                        fontSize: '16px', 
                        minHeight: '48px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </InputGroup>
                </motion.div>
              </Col>
              <Col md={6} xs={12}>
                <motion.div 
                  className="d-flex align-items-center justify-content-center justify-content-md-start gap-3"
                  variants={buttonVariants}
                >
                  <Form.Check
                    type="switch"
                    id="featured-switch"
                    label="Featured Only"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    style={{ minHeight: '44px' }}
                  />
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          {/* Enhanced Category Filter */}
          <motion.div variants={itemVariants}>
            <Row className="mb-4">
              <Col>
                <div className="category-filters d-flex flex-nowrap d-md-flex flex-md-wrap gap-2 justify-content-start justify-content-md-center overflow-auto pb-2 pb-md-0">
                  {categories.map((category, index) => {
                    const isActive = selectedCategory === category.key;
                    return (
                      <motion.button
                        key={category.key}
                        className={`btn btn-${isActive ? "primary" : "outline-primary"} btn-sm category-btn flex-shrink-0 touch-feedback`}
                        onClick={() => setSelectedCategory(category.key)}
                        style={{ 
                          minHeight: '44px', 
                          whiteSpace: 'nowrap',
                          borderRadius: 'var(--radius-lg)',
                          fontWeight: 600
                        }}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        {renderIcon(category.icon, 16, "me-2")}
                        {category.label}
                      </motion.button>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </motion.div>

          {/* Enhanced Projects Grid */}
          <Row className="g-4">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <Col key={project.id} lg={4} md={6} xs={12}>
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    whileHover="hover"
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.6, 0.05, 0.01, 0.99]
                    }}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      style={{ perspective: '1000px' }}
                    >
                      <Card className="h-100 project-card glass-effect touch-feedback">
                        <div className="project-image-container" style={{ position: 'relative', overflow: 'hidden' }}>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Card.Img 
                              variant="top" 
                              src={project.image} 
                              alt={project.title}
                              className="project-image"
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                transition: 'transform 0.6s ease'
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/400x250/6366f1/ffffff?text=Project+Image';
                              }}
                            />
                          </motion.div>
                          <motion.div 
                            className="project-overlay"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(0, 0, 0, 0.8)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backdropFilter: 'blur(5px)'
                            }}
                          >
                            <div className="project-links d-flex flex-column flex-sm-row gap-2">
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-light btn-sm touch-feedback"
                                style={{ minHeight: '44px', minWidth: '100px' }}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                {renderIcon(BsGithub, 16, "me-1")}
                                Code
                              </motion.a>
                              {project.liveUrl && (
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-primary btn-sm touch-feedback"
                                  style={{ minHeight: '44px', minWidth: '100px' }}
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  {renderIcon(BsEye, 16, "me-1")}
                                  Live Demo
                                </motion.a>
                              )}
                            </div>
                          </motion.div>
                        </div>
                        <Card.Body className="d-flex flex-column p-4">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <motion.div 
                              className="project-icon"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              style={{
                                padding: 'var(--space-2)',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)'
                              }}
                            >
                              {renderIcon(project.icon, 24, "text-primary")}
                            </motion.div>
                            <div className="d-flex gap-2">
                              <motion.div variants={badgeVariants} whileHover="hover">
                                <Badge bg={getStatusColor(project.status)}>
                                  {project.status.replace('-', ' ')}
                                </Badge>
                              </motion.div>
                              {project.featured && (
                                <motion.div variants={badgeVariants} whileHover="hover">
                                  <Badge bg="warning" text="dark">Featured</Badge>
                                </motion.div>
                              )}
                            </div>
                          </div>
                          <Card.Title className="mb-3" style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 700,
                            color: 'var(--text-primary)'
                          }}>
                            {project.title}
                          </Card.Title>
                          <Card.Text className="flex-grow-1 mb-4" style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6
                          }}>
                            {project.description}
                          </Card.Text>
                          <div className="mt-auto">
                            <div className="mb-3">
                              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                <motion.span key={techIndex} variants={badgeVariants} whileHover="hover">
                                  <Badge bg="primary" className="me-1 mb-1" style={{
                                    fontSize: 'var(--font-size-xs)',
                                    padding: 'var(--space-1) var(--space-2)'
                                  }}>
                                    {tech}
                                  </Badge>
                                </motion.span>
                              ))}
                              {project.technologies.length > 4 && (
                                <motion.span variants={badgeVariants} whileHover="hover">
                                  <Badge bg="secondary" className="me-1 mb-1" style={{
                                    fontSize: 'var(--font-size-xs)',
                                    padding: 'var(--space-1) var(--space-2)'
                                  }}>
                                    +{project.technologies.length - 4} more
                                  </Badge>
                                </motion.span>
                              )}
                            </div>
                            <small className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
                              {renderIcon(BsGear, 12, "me-1")} {project.year}
                            </small>
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
          </Row>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-5"
            >
              <h4 className="text-muted">No projects found</h4>
              <p className="text-muted">Try adjusting your search terms or filters.</p>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default AdvancedProjects; 