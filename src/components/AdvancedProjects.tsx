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
  // Enhanced fields for best-in-class portfolio
  metrics: {
    performance?: string;
    users?: string;
    impact?: string;
    efficiency?: string;
  };
  challenges: string[];
  solutions: string[];
  keyFeatures: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    tools: string[];
  };
  duration: string;
  teamSize: string;
  role: string;
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
    longDescription: "A responsive portfolio website showcasing my projects and skills with modern design principles, featuring advanced performance optimizations, PWA capabilities, and accessibility compliance.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Bootstrap"],
    categories: ["web"],
    icon: BsGlobe,
    image: "/assets/portfolio.png",
    githubUrl: "https://github.com/Aadarsh2021/portfolio",
    liveUrl: "https://portfolio-khaki-omega-43.vercel.app/",
    status: "completed",
    featured: true,
    year: 2024,
    complexity: "intermediate",
    metrics: {
      performance: "98/100 Lighthouse Score",
      users: "500+ Monthly Visitors",
      impact: "40% Increase in Interview Calls",
      efficiency: "2.1s Load Time"
    },
    challenges: [
      "Achieving perfect performance scores across all devices",
      "Implementing complex animations without affecting performance",
      "Creating responsive design that works on all screen sizes",
      "Ensuring accessibility compliance for all users"
    ],
    solutions: [
      "Implemented lazy loading and code splitting for optimal performance",
      "Used Framer Motion with performance optimizations and reduced motion support",
      "Created mobile-first responsive design with CSS Grid and Flexbox",
      "Added comprehensive ARIA labels and keyboard navigation support"
    ],
    keyFeatures: [
      "Progressive Web App (PWA) with offline functionality",
      "Advanced animations with Framer Motion",
      "Dark/Light theme with system preference detection",
      "Real-time analytics dashboard",
      "Accessibility compliant (WCAG 2.1 AA)",
      "SEO optimized with structured data"
    ],
    techStack: {
      frontend: ["React 18", "TypeScript", "Framer Motion", "Bootstrap 5"],
      backend: ["Vercel", "EmailJS"],
      database: ["Local Storage", "IndexedDB"],
      deployment: ["Vercel", "GitHub Actions"],
      tools: ["ESLint", "Prettier", "Lighthouse CI", "Webpack Bundle Analyzer"]
    },
    duration: "3 months",
    teamSize: "Solo Project",
    role: "Full-Stack Developer & UI/UX Designer"
  },
  {
    id: 2,
    title: "Farm-Ease",
    description: "Full-stack AgriTech platform with AI-powered crop recommendations and blockchain-based supply chain.",
    longDescription: "Comprehensive agricultural technology platform integrating AI, blockchain, and e-commerce solutions to revolutionize farming practices and supply chain transparency.",
    technologies: ["React", "Node.js", "MongoDB", "Solidity", "Python", "TensorFlow", "Web3.js"],
    categories: ["fullstack", "blockchain"],
    icon: BsLaptop,
    image: "/assets/farmease.png",
    githubUrl: "https://github.com/Aadarsh2021/farm-ease",
    liveUrl: "https://farm-phi-jade.vercel.app/",
    status: "completed",
    featured: true,
    year: 2024,
    complexity: "advanced",
    metrics: {
      performance: "95% Crop Prediction Accuracy",
      users: "200+ Active Farmers",
      impact: "30% Increase in Crop Yield",
      efficiency: "50% Reduction in Supply Chain Costs"
    },
    challenges: [
      "Integrating AI models with real-time weather data for accurate predictions",
      "Implementing blockchain for supply chain transparency and traceability",
      "Creating user-friendly interface for non-technical farmers",
      "Handling large-scale data processing for multiple farms simultaneously"
    ],
    solutions: [
      "Developed custom ML pipeline with TensorFlow for crop recommendation engine",
      "Implemented smart contracts on Ethereum for immutable supply chain records",
      "Created intuitive dashboard with data visualization using Chart.js",
      "Used MongoDB with sharding for scalable data storage and retrieval"
    ],
    keyFeatures: [
      "AI-powered crop recommendation system with 95% accuracy",
      "Blockchain-based supply chain tracking and verification",
      "Real-time weather integration and alerts",
      "E-commerce platform for agricultural products",
      "Mobile-responsive design for field use",
      "Multi-language support for diverse farming communities"
    ],
    techStack: {
      frontend: ["React", "Redux", "Chart.js", "Material-UI", "Web3.js"],
      backend: ["Node.js", "Express", "Socket.io", "JWT Authentication"],
      database: ["MongoDB", "Redis", "IPFS"],
      deployment: ["AWS EC2", "Docker", "Nginx"],
      tools: ["TensorFlow", "Solidity", "Truffle", "Ganache", "Postman"]
    },
    duration: "6 months",
    teamSize: "4 developers",
    role: "Lead Full-Stack Developer & AI Engineer"
  },
  {
    id: 3,
    title: "Smart City Traffic Monitoring",
    description: "Real-time traffic monitoring system using computer vision and AI for smart city management.",
    longDescription: "Advanced traffic monitoring system with YOLOv7 object detection and ByteTrack integration for real-time traffic analysis and optimization.",
    technologies: ["Python", "Flask", "React", "OpenCV", "YOLOv7", "ByteTrack", "Mapbox"],
    categories: ["ai"],
    icon: BsGear,
    image: "/assets/Smart.png",
    githubUrl: "https://github.com/Aadarsh2021/smart-traffic",
    liveUrl: "https://smart-traffic-demo.vercel.app/",
    status: "completed",
    featured: true,
    year: 2025,
    complexity: "advanced",
    metrics: {
      performance: "92% Vehicle Detection Accuracy",
      users: "City Traffic Management",
      impact: "25% Reduction in Traffic Congestion",
      efficiency: "Real-time Processing (30 FPS)"
    },
    challenges: [
      "Achieving real-time object detection with high accuracy in varying lighting conditions",
      "Implementing multi-object tracking across multiple camera feeds",
      "Creating scalable architecture for city-wide deployment",
      "Integrating with existing traffic management systems"
    ],
    solutions: [
      "Fine-tuned YOLOv7 model on custom traffic dataset for improved accuracy",
      "Implemented ByteTrack algorithm for robust multi-object tracking",
      "Used microservices architecture with Docker for scalable deployment",
      "Created RESTful API for seamless integration with existing systems"
    ],
    keyFeatures: [
      "Real-time vehicle detection and tracking with 92% accuracy",
      "Traffic flow analysis and congestion prediction",
      "Interactive dashboard with live camera feeds",
      "Automated traffic signal optimization",
      "Historical data analysis and reporting",
      "Mobile app for traffic alerts and route optimization"
    ],
    techStack: {
      frontend: ["React", "Mapbox GL JS", "Chart.js", "Socket.io Client"],
      backend: ["Python Flask", "OpenCV", "NumPy", "Pandas"],
      database: ["PostgreSQL", "Redis", "InfluxDB"],
      deployment: ["Docker", "Kubernetes", "AWS", "Nginx"],
      tools: ["YOLOv7", "ByteTrack", "TensorRT", "Grafana", "Prometheus"]
    },
    duration: "4 months",
    teamSize: "3 developers",
    role: "AI/ML Engineer & Backend Developer"
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
              <h2 className="text-center mb-4 gradient-text" data-text="Projects">Projects</h2>
              <p className="text-center mb-5" style={{ color: 'var(--text-primary)' }}>
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
              <AnimatePresence>
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
                                    title="View Source Code"
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
                                    title="View Live Demo"
                                  >
                                    {renderIcon(BsEye, 24)}
                                  </a>
                                )}
                              </div>
                            </div>
                            {project.featured && (
                              <div className="featured-badge">
                                {renderIcon(BsStar, 16)}
                                <span>Featured</span>
                              </div>
                            )}
                          </div>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Card.Title className="mb-0">{project.title}</Card.Title>
                              {renderIcon(project.icon, 20, 'project-icon')}
                            </div>
                            <Card.Text className="text-muted mb-3">
                              {project.description}
                            </Card.Text>
                            
                            {/* Metrics Section */}
                            {project.metrics && (
                              <div className="metrics-section mb-3">
                                <h6 className="metrics-title">Key Metrics</h6>
                                <div className="metrics-grid">
                                  {project.metrics.performance && (
                                    <div className="metric-item">
                                      <span className="metric-label">Performance</span>
                                      <span className="metric-value">{project.metrics.performance}</span>
                                    </div>
                                  )}
                                  {project.metrics.users && (
                                    <div className="metric-item">
                                      <span className="metric-label">Users</span>
                                      <span className="metric-value">{project.metrics.users}</span>
                                    </div>
                                  )}
                                  {project.metrics.impact && (
                                    <div className="metric-item">
                                      <span className="metric-label">Impact</span>
                                      <span className="metric-value">{project.metrics.impact}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Key Features */}
                            {project.keyFeatures && (
                              <div className="key-features mb-3">
                                <h6 className="features-title">Key Features</h6>
                                <ul className="features-list">
                                  {project.keyFeatures.slice(0, 3).map((feature, index) => (
                                    <li key={index} className="feature-item">
                                      {renderIcon(BsCheckCircle, 12, 'me-2')}
                                      {feature}
                                    </li>
                                  ))}
                                  {project.keyFeatures.length > 3 && (
                                    <li className="feature-item text-muted">
                                      +{project.keyFeatures.length - 3} more features
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Tech Stack */}
                            <div className="tech-stack">
                              {project.technologies.slice(0, 6).map((tech, index) => (
                                <Badge 
                                  key={index}
                                  bg="primary"
                                  className="me-2 mb-2 tech-badge"
                                >
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 6 && (
                                <Badge bg="secondary" className="me-2 mb-2 tech-badge">
                                  +{project.technologies.length - 6}
                                </Badge>
                              )}
                            </div>
                          </Card.Body>
                          <Card.Footer className="bg-transparent border-0">
                            <div className="d-flex justify-content-between align-items-center mb-2">
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
                            
                            {/* Project Details */}
                            <div className="project-details">
                              <div className="detail-row">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value">{project.duration}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Team:</span>
                                <span className="detail-value">{project.teamSize}</span>
                              </div>
                              <div className="detail-row">
                                <span className="detail-label">Role:</span>
                                <span className="detail-value">{project.role}</span>
                              </div>
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