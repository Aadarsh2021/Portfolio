import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building FarmEase: Integrating AI, Blockchain, and Modern Web Technologies",
      excerpt: "A comprehensive case study on developing a full-stack agricultural platform that achieved 30% increase in crop yield for 200+ farmers through AI-powered recommendations and blockchain-based supply chain transparency.",
      date: "2024-01-15",
      readTime: "15 min read",
      category: "Full-Stack Development",
      image: "/assets/farmease.png",
      tags: ["React", "Node.js", "TensorFlow", "Solidity", "Web3.js", "MongoDB"],
      views: 1250,
      likes: 89,
      featured: true,
      difficulty: "Advanced",
      githubUrl: "https://github.com/Aadarsh2021/farm-ease",
      liveUrl: "https://farm-phi-jade.vercel.app/"
    },
    {
      id: 2,
      title: "Achieving 92% Accuracy in Real-Time Vehicle Detection: A Deep Dive into YOLOv7 and ByteTrack",
      excerpt: "Technical deep-dive into implementing computer vision for smart city traffic monitoring, achieving 25% reduction in traffic congestion through real-time processing at 30 FPS.",
      date: "2023-11-20",
      readTime: "18 min read",
      category: "AI/ML",
      image: "/assets/Smart.png",
      tags: ["Python", "YOLOv7", "ByteTrack", "OpenCV", "Computer Vision", "Flask"],
      views: 2100,
      likes: 156,
      featured: true,
      difficulty: "Advanced",
      githubUrl: "https://github.com/Aadarsh2021/smart-traffic",
      liveUrl: "https://smart-traffic-demo.vercel.app/"
    },
    {
      id: 3,
      title: "Portfolio Performance Optimization: From 60 to 98 Lighthouse Score",
      excerpt: "Complete guide to building a high-performance portfolio website with PWA capabilities, achieving 98/100 Lighthouse score and 40% increase in interview calls.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Web Development",
      image: "/assets/portfolio.png",
      tags: ["React", "TypeScript", "Framer Motion", "PWA", "Performance", "SEO"],
      views: 890,
      likes: 67,
      featured: false,
      difficulty: "Intermediate",
      githubUrl: "https://github.com/Aadarsh2021/portfolio",
      liveUrl: "https://portfolio-khaki-omega-43.vercel.app/"
    },
    {
      id: 4,
      title: "Backend Optimization: Reducing API Response Time by 60%",
      excerpt: "Case study on optimizing Node.js backend systems during my internship at Ash-Tech Technologies, improving scalability by 300% through strategic caching and database optimization.",
      date: "2023-12-05",
      readTime: "10 min read",
      category: "Backend Development",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["Node.js", "MongoDB", "Redis", "Performance", "Caching", "Optimization"],
      views: 750,
      likes: 45,
      featured: false,
      difficulty: "Intermediate",
      githubUrl: "https://github.com/Aadarsh2021/backend-optimization",
      liveUrl: null
    },
    {
      id: 5,
      title: "Data Science in Agriculture: Predicting Crop Yield with Machine Learning",
      excerpt: "Exploring how machine learning algorithms can predict agricultural yield with 95% accuracy, helping farmers make informed decisions about crop selection and timing.",
      date: "2023-10-15",
      readTime: "14 min read",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Agriculture", "Predictive Analytics"],
      views: 1100,
      likes: 78,
      featured: false,
      difficulty: "Advanced",
      githubUrl: "https://github.com/Aadarsh2021/crop-yield-prediction",
      liveUrl: null
    },
    {
      id: 6,
      title: "Building Accessible Web Applications: A Developer's Guide to WCAG 2.1",
      excerpt: "Comprehensive guide to implementing accessibility best practices in modern web applications, ensuring inclusive design for all users.",
      date: "2023-09-20",
      readTime: "8 min read",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      tags: ["Accessibility", "WCAG", "React", "A11y", "Inclusive Design", "UX"],
      views: 650,
      likes: 34,
      featured: false,
      difficulty: "Beginner",
      githubUrl: "https://github.com/Aadarsh2021/accessibility-guide",
      liveUrl: null
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