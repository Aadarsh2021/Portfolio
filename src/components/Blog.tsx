import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building FarmEase: From Concept to Production",
      excerpt: "A deep dive into creating a modern e-commerce platform for agricultural products using React, Bootstrap, and responsive design principles.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Web Development",
      image: "/assets/farmease.png",
      tags: ["React", "E-commerce", "Agriculture", "Bootstrap"],
      views: 150
    },
    {
      id: 2,
      title: "AI-Powered Traffic Detection: Computer Vision in Smart Cities",
      excerpt: "Exploring the implementation of YOLOv5 for real-time traffic analysis and how AI can revolutionize urban transportation systems.",
      date: "2023-11-20",
      readTime: "12 min read",
      category: "AI/ML",
      image: "/assets/Smart.png",
      tags: ["Python", "YOLOv5", "Computer Vision", "Smart Cities"],
      views: 230
    },
    {
      id: 3,
      title: "Modern Portfolio Development with React & TypeScript",
      excerpt: "Best practices for building a professional portfolio website with advanced animations, PWA features, and optimal performance.",
      date: "2024-01-10",
      readTime: "10 min read",
      category: "Web Development",
      image: "/assets/portfolio.png",
      tags: ["React", "TypeScript", "Portfolio", "PWA"],
      views: 180
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          Latest Blog Posts
        </motion.h2>
        
        <Row className="g-4">
          {blogPosts.map((post) => (
            <Col key={post.id} lg={4} md={6}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-100 blog-card glass-effect">
                  <div className="blog-image-container">
                    <Card.Img 
                      variant="top" 
                      src={post.image} 
                      alt={post.title}
                      className="blog-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x200/6366f1/ffffff?text=Blog+Post';
                      }}
                    />
                    <div className="blog-category-badge">
                      <Badge bg="primary">{post.category}</Badge>
                    </div>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <div className="blog-meta mb-3">
                      <div className="d-flex align-items-center text-muted small">
                        <span className="me-1">📅</span>
                        <span className="me-3">{formatDate(post.date)}</span>
                        <span className="me-1">⏰</span>
                        <span className="me-3">{post.readTime}</span>
                        <span className="me-1">👁️</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    
                    <Card.Title className="mb-3">{post.title}</Card.Title>
                    <Card.Text className="flex-grow-1 mb-3">
                      {post.excerpt}
                    </Card.Text>
                    
                    <div className="blog-tags mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} bg="outline-secondary" className="me-1 mb-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <button 
                      type="button"
                      className="btn btn-outline-primary mt-auto d-flex align-items-center"
                    >
                      Read More <span className="ms-2">→</span>
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        
        <motion.div variants={itemVariants} className="text-center mt-5">
          <button type="button" className="btn btn-primary btn-lg">
            View All Posts
          </button>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Blog; 