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
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.04,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      transition: { duration: 0.3 }
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
    <section id="blog" className="blog-section">
      <style>
        {`
          @media (max-width: 768px) {
            .blog-section {
              padding: 3rem 0;
            }
            .section-title {
              font-size: clamp(2rem, 6vw, var(--font-size-4xl)) !important;
              margin-bottom: 2rem !important;
            }
            .blog-card {
              margin-bottom: 1.5rem !important;
            }
            .blog-card .card-title {
              font-size: clamp(1.1rem, 3vw, 1.3rem) !important;
              margin-bottom: 0.75rem !important;
            }
            .blog-card .card-text {
              font-size: clamp(0.85rem, 2.5vw, 0.95rem) !important;
              line-height: 1.5 !important;
              margin-bottom: 1rem !important;
            }
            .blog-meta {
              font-size: clamp(0.75rem, 2vw, 0.8rem) !important;
              margin-bottom: 1rem !important;
            }
            .blog-tags .badge {
              font-size: clamp(0.7rem, 2vw, 0.8rem) !important;
              padding: 0.3rem 0.5rem !important;
              margin: 0.2rem !important;
            }
            .blog-card .btn {
              font-size: clamp(0.8rem, 2.5vw, 0.9rem) !important;
              padding: 0.5rem 1rem !important;
            }
            .blog-image {
              height: 180px !important;
            }
            .btn-lg {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              padding: 0.75rem 1.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .blog-section {
              padding: 2rem 0;
            }
            .section-title {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
            }
            .blog-card .card-title {
              font-size: clamp(1rem, 2.8vw, 1.2rem) !important;
            }
            .blog-card .card-text {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            .blog-meta {
              font-size: clamp(0.7rem, 1.8vw, 0.75rem) !important;
            }
            .blog-tags .badge {
              font-size: clamp(0.65rem, 1.8vw, 0.75rem) !important;
              padding: 0.25rem 0.4rem !important;
            }
            .blog-image {
              height: 160px !important;
            }
          }
          
          .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          
          .blog-card {
            transition: all 0.3s ease;
            border: none;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
          }
          
          .blog-image-container {
            position: relative;
            overflow: hidden;
          }
          
          .blog-image {
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .blog-card:hover .blog-image {
            transform: scale(1.05);
          }
          
          .blog-category-badge {
            position: absolute;
            top: 10px;
            right: 10px;
          }
          
          .blog-tags .badge {
            transition: all 0.3s ease;
          }
          
          .blog-tags .badge:hover {
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={cardVariants} className="section-title text-center mb-5">
            Latest Blog Posts
          </motion.h2>
          
          <Row className="g-4">
            {blogPosts.map((post) => (
              <Col key={post.id} lg={4} md={6}>
                <motion.div 
                  variants={cardVariants}
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
          
          <motion.div variants={cardVariants} className="text-center mt-5">
            <button type="button" className="btn btn-primary btn-lg">
              View All Posts
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Blog; 