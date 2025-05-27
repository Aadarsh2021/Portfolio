import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
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
    title: "FarmEase",
    description: "A blockchain-based e-commerce platform for agricultural products featuring smart contract payments.",
    longDescription: "FarmEase is a comprehensive blockchain-based e-commerce platform designed specifically for agricultural products. It features smart contract payments, transparent transactions, automated order fulfillment, and direct farmer-to-consumer connections. The platform ensures fair pricing, reduces intermediaries, and provides supply chain transparency.",
    technologies: ["React", "Solidity", "Web3.js", "Node.js", "MongoDB", "Ethereum"],
    category: 'blockchain',
    icon: BsGear,
    image: "/images/farmease.jpg",
    githubUrl: "https://github.com/Aadarsh2021/farmease",
    liveUrl: "https://major-devanshsrivastava0205s-projects.vercel.app/",
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
    image: "/images/portfolio.jpg",
    githubUrl: "https://github.com/Aadarsh2021/portfolio",
    liveUrl: "http://portfolio-khaki-omega-43.vercel.app",
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
    image: "/images/traffic.jpg",
    githubUrl: "https://github.com/Aadarsh2021/traffic-detection",
    status: 'completed',
    featured: false,
    year: 2023
  },
  {
    id: 4,
    title: "E-Commerce Mobile App",
    description: "React Native mobile application with real-time chat, push notifications, and payment integration.",
    longDescription: "A comprehensive e-commerce mobile application built with React Native, featuring user authentication, product catalog, shopping cart, payment integration with Stripe, real-time chat support, push notifications, and offline functionality. Includes admin panel for inventory management.",
    technologies: ["React Native", "Firebase", "Stripe", "Redux", "Node.js"],
    category: 'mobile',
    icon: BsPhone,
    image: "/images/ecommerce-mobile.jpg",
    githubUrl: "https://github.com/Aadarsh2021/ecommerce-mobile",
    status: 'in-progress',
    featured: true,
    year: 2024
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
        <h2 className="section-title text-center mb-5">Featured Projects</h2>
        
        {/* Search and Filter Controls */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                {renderIcon(BsSearch, 16)}
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center gap-3">
              <Form.Check
                type="switch"
                id="featured-switch"
                label="Featured Only"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              />
            </div>
          </Col>
        </Row>

        {/* Category Filter */}
        <Row className="mb-4">
          <Col>
            <div className="category-filters d-flex flex-wrap gap-2 justify-content-center">
              {categories.map((category) => {
                const isActive = selectedCategory === category.key;
                return (
                  <Button
                    key={category.key}
                    variant={isActive ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.key)}
                    className="category-btn"
                  >
                    {renderIcon(category.icon, 16, "me-2")}
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row className="g-4">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <Col key={project.id} lg={4} md={6}>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-100 project-card glass-effect">
                    <div className="project-image-container">
                      <Card.Img 
                        variant="top" 
                        src={project.image} 
                        alt={project.title}
                        className="project-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x250/6366f1/ffffff?text=Project+Image';
                        }}
                      />
                      <div className="project-overlay">
                        <div className="project-links">
                          <Button
                            variant="light"
                            size="sm"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2"
                          >
                            {renderIcon(BsGithub, 16, "me-1")}
                            Code
                          </Button>
                          {project.liveUrl && (
                            <Button
                              variant="primary"
                              size="sm"
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {renderIcon(BsEye, 16, "me-1")}
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="project-icon">
                          {renderIcon(project.icon, 24)}
                        </div>
                        <div className="d-flex gap-2">
                          <Badge bg={getStatusColor(project.status)}>
                            {project.status.replace('-', ' ')}
                          </Badge>
                          {project.featured && (
                            <Badge bg="warning" text="dark">Featured</Badge>
                          )}
                        </div>
                      </div>
                      <Card.Title className="mb-2">{project.title}</Card.Title>
                      <Card.Text className="flex-grow-1 mb-3">
                        {project.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="mb-3">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <Badge key={techIndex} bg="primary" className="me-1 mb-1">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge bg="secondary" className="me-1 mb-1">
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                        <small className="text-muted">
                          {renderIcon(BsGear, 12, "me-1")} {project.year}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-5"
          >
            <h4 className="text-muted">No projects found</h4>
            <p className="text-muted">Try adjusting your search terms or filters.</p>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default AdvancedProjects; 