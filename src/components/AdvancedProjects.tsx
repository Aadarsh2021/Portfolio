import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsLaptop, 
  BsGear, 
  BsGithub, 
  BsEye, 
  BsCode,
  BsGlobe,
  BsPhone,
  BsLock,
  BsFilter,
  BsGrid,
  BsStar,
  BsClock,
  BsCheckCircle
} from 'react-icons/bs';
import './AdvancedProjects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  categories: ('web' | 'mobile' | 'blockchain' | 'ai' | 'fullstack' | 'desktop' | 'api')[];
  icon: IconType;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  year: number;
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

const categories = [
  { key: 'all', label: 'All Projects', icon: BsGrid },
  { key: 'web', label: 'Web Apps', icon: BsGlobe },
  { key: 'mobile', label: 'Mobile Apps', icon: BsPhone },
  { key: 'fullstack', label: 'Full Stack', icon: BsLaptop },
  { key: 'ai', label: 'AI/ML', icon: BsGear },
  { key: 'blockchain', label: 'Blockchain', icon: BsLock },
  { key: 'desktop', label: 'Desktop Apps', icon: BsCode },
  { key: 'api', label: 'APIs', icon: BsGear }
];

const statusOptions = [
  { value: 'all', label: 'All Status', icon: BsGrid },
  { value: 'completed', label: 'Completed', icon: BsCheckCircle },
  { value: 'in-progress', label: 'In Progress', icon: BsClock },
  { value: 'planned', label: 'Planned', icon: BsStar }
];

const complexityOptions = [
  { value: 'all', label: 'All Levels', icon: BsGrid },
  { value: 'beginner', label: 'Beginner', icon: BsStar },
  { value: 'intermediate', label: 'Intermediate', icon: BsStar },
  { value: 'advanced', label: 'Advanced', icon: BsStar }
];

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern portfolio website with React, Tailwind CSS, and Framer Motion animations.",
    longDescription: "A responsive portfolio website showcasing my projects and skills with modern design principles.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Bootstrap"],
    categories: ["web"],
    icon: BsGlobe,
    image: "/assets/portfolio.png",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
    status: "completed",
    featured: true,
    year: 2024,
    complexity: "intermediate"
  },
  {
    id: 2,
    title: "Farm-Ease",
    description: "Full-stack AgriTech platform with AI-powered crop recommendations and blockchain-based supply chain.",
    longDescription: "Comprehensive agricultural technology platform integrating AI, blockchain, and e-commerce solutions.",
    technologies: ["React", "Node.js", "MongoDB", "Solidity", "Python", "TensorFlow", "Web3.js"],
    categories: ["fullstack", "blockchain"],
    icon: BsLaptop,
    image: "/assets/farmease.png",
    githubUrl: "https://github.com/yourusername/farm-ease",
    liveUrl: "https://farm-ease.com",
    status: "completed",
    featured: true,
    year: 2024,
    complexity: "advanced"
  },
  {
    id: 3,
    title: "Smart City Traffic Monitoring",
    description: "Real-time traffic monitoring system using computer vision and AI for smart city management.",
    longDescription: "Advanced traffic monitoring system with YOLOv7 object detection and ByteTrack integration.",
    technologies: ["Python", "Flask", "React", "OpenCV", "YOLOv7", "ByteTrack", "Mapbox"],
    categories: ["ai"],
    icon: BsGear,
    image: "/assets/Smart.png",
    githubUrl: "https://github.com/yourusername/smart-traffic",
    liveUrl: "https://smart-traffic-demo.com",
    status: "completed",
    featured: true,
    year: 2025,
    complexity: "advanced"
  }
];

const AdvancedProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('year');

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.categories.includes(selectedCategory as 'web' | 'mobile' | 'blockchain' | 'ai' | 'fullstack' | 'desktop' | 'api');
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesComplexity = selectedComplexity === 'all' || project.complexity === selectedComplexity;
      const matchesFeatured = !showFeaturedOnly || project.featured;
      
      return matchesCategory && matchesStatus && matchesComplexity && matchesFeatured;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'complexity':
          const complexityOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return complexityOrder[b.complexity] - complexityOrder[a.complexity];
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedStatus, selectedComplexity, showFeaturedOnly, sortBy]);

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'planned':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const getComplexityColor = (complexity: string): string => {
    switch (complexity.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'secondary';
    }
  };

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
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section id="projects" className="projects-section">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="projects-container"
        >
          <Row className="mb-4">
            <Col>
              <h2 className="text-center mb-4">Projects</h2>
              <p className="text-center text-muted mb-5">
                Explore my latest projects and technical work
              </p>
            </Col>
          </Row>

          {/* Enhanced Filter Controls */}
          <Row className="mb-4">
            <Col>
              <div className="filter-controls">
                <div className="filter-section mb-3">
                  <h6 className="filter-title">
                    {renderIcon(BsFilter, 16, 'me-2')}
                    Filter by Category
                  </h6>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    {categories.map(({ key, label, icon }) => (
                      <motion.button
                        key={key}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(key)}
                      >
                        {renderIcon(icon, 16, 'me-2')}
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Row className="mb-3">
                  <Col md={3} sm={6} className="mb-2">
                    <Form.Group>
                      <Form.Label className="filter-label">Status</Form.Label>
                      <Form.Select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3} sm={6} className="mb-2">
                    <Form.Group>
                      <Form.Label className="filter-label">Complexity</Form.Label>
                      <Form.Select 
                        value={selectedComplexity}
                        onChange={(e) => setSelectedComplexity(e.target.value)}
                        className="filter-select"
                      >
                        {complexityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3} sm={6} className="mb-2">
                    <Form.Group>
                      <Form.Label className="filter-label">Sort By</Form.Label>
                      <Form.Select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                      >
                        <option value="year">Year (Newest)</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="complexity">Complexity</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3} sm={6} className="mb-2">
                    <Form.Group className="d-flex align-items-end h-100">
                      <Form.Check
                        type="switch"
                        id="featured-switch"
                        label="Featured Only"
                        checked={showFeaturedOnly}
                        onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                        className="featured-switch"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          {/* Results Summary */}
          <Row className="mb-4">
            <Col>
              <div className="results-summary">
                <span className="results-count">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                {(selectedCategory !== 'all' || selectedStatus !== 'all' || selectedComplexity !== 'all' || showFeaturedOnly) && (
                  <button 
                    className="clear-filters-btn"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                      setSelectedComplexity('all');
                      setShowFeaturedOnly(false);
                      setSortBy('year');
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${selectedStatus}-${selectedComplexity}-${showFeaturedOnly}-${sortBy}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="row g-4"
                >
                  {filteredProjects.map((project) => (
                    <Col key={project.id} xs={12} md={6} lg={4}>
                      <motion.div
                        variants={itemVariants}
                        whileHover="hover"
                        className="h-100"
                      >
                        <Card className="project-card h-100 border-0">
                          <div className="project-image-container">
                            <Card.Img 
                              variant="top" 
                              src={project.image} 
                              alt={project.title}
                              className="project-image"
                            />
                            <div className="project-overlay">
                              <div className="project-links">
                                {project.githubUrl && (
                                  <a 
                                    href={project.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="project-link"
                                  >
                                    {renderIcon(BsGithub, 24)}
                                  </a>
                                )}
                                {project.liveUrl && (
                                  <a 
                                    href={project.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="project-link"
                                  >
                                    {renderIcon(BsEye, 24)}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Card.Title className="mb-0">{project.title}</Card.Title>
                              {renderIcon(project.icon, 20, 'project-icon')}
                            </div>
                            <Card.Text className="text-muted mb-3">
                              {project.description}
                            </Card.Text>
                            <div className="tech-stack">
                              {project.technologies.map((tech, index) => (
                                <Badge 
                                  key={index}
                                  bg="primary"
                                  className="me-2 mb-2 tech-badge"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </Card.Body>
                          <Card.Footer className="bg-transparent border-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <Badge 
                                  bg={getStatusColor(project.status)}
                                  className="me-2"
                                >
                                  {project.status}
                                </Badge>
                                <Badge 
                                  bg={getComplexityColor(project.complexity)}
                                  className="me-2"
                                >
                                  {project.complexity}
                                </Badge>
                              </div>
                              <small className="text-muted">
                                {project.year}
                              </small>
                            </div>
                          </Card.Footer>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default AdvancedProjects; 