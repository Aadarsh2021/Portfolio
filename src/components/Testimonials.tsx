import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Prof. Dr. Rajesh Kumar",
      role: "Project Supervisor, G L Bajaj Group of Institutions",
      content: "Aadarsh demonstrates exceptional problem-solving skills and dedication to web development. His FarmEase project showcases advanced technical abilities and innovative thinking.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      initials: "RK"
    },
    {
      id: 2,
      name: "Internship Studio Team",
      role: "Data Science Training Program",
      content: "Successfully completed comprehensive data science training with excellent performance. Shows strong analytical thinking and technical proficiency in modern web technologies.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      initials: "IS"
    },
    {
      id: 3,
      name: "College Project Team",
      role: "Smart City Traffic Detection",
      content: "Outstanding collaboration on AI/ML project. Aadarsh's technical expertise in Python and computer vision frameworks contributed significantly to project success.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      initials: "CP"
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span 
        key={index} 
        className="star text-warning"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        {index < rating ? "★" : "☆"}
      </motion.span>
    ));
  };

  const renderAvatar = (testimonial: any) => {
    return (
      <motion.div 
        className="testimonial-avatar"
        variants={imageVariants}
        whileHover="hover"
      >
        <div className="avatar-container">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="avatar-image"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="avatar-fallback">
            {testimonial.initials}
          </div>
        </div>
        <div className="avatar-ring"></div>
      </motion.div>
    );
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <style>
        {`
          .testimonials-section {
            background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
            position: relative;
          }
          
          .testimonial-card {
            transition: all 0.3s ease;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border-radius: var(--radius-2xl);
            overflow: hidden;
            height: 100%;
          }
          
          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          
          .quote-icon {
            text-align: center;
            margin-bottom: var(--space-4);
          }
          
          .quote-icon span {
            font-size: 2.5rem;
            color: var(--primary);
            font-weight: bold;
          }
          
          .testimonial-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          
          .testimonial-text {
            font-style: italic;
            line-height: 1.6;
            color: var(--text-primary);
            margin-bottom: var(--space-4);
            flex-grow: 1;
          }
          
          .testimonial-rating {
            margin-bottom: var(--space-4);
            text-align: center;
          }
          
          .star {
            font-size: 1.2rem;
            margin-right: 2px;
            display: inline-block;
          }
          
          .testimonial-author {
            display: flex;
            align-items: center;
            margin-top: auto;
          }
          
          /* Enhanced Avatar Styling */
          .testimonial-avatar {
            position: relative;
            margin-right: var(--space-3);
          }
          
          .avatar-container {
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          
          .avatar-fallback {
            display: none;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.2rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
          }
          
          .avatar-ring {
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border: 2px solid transparent;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary)) border-box;
            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            opacity: 0.3;
            transition: all 0.3s ease;
          }
          
          .testimonial-avatar:hover .avatar-ring {
            opacity: 0.6;
            transform: scale(1.1);
          }
          
          .testimonial-author h6 {
            margin: 0;
            font-weight: 600;
            color: var(--text-primary);
            font-size: var(--font-size-base);
          }
          
          .testimonial-author small {
            color: var(--text-secondary);
            font-size: var(--font-size-sm);
          }
          
          @media (max-width: 768px) {
            .testimonials-section {
              padding: var(--space-10) 0;
            }
            
            .section-title {
              font-size: clamp(2rem, 6vw, var(--font-size-4xl)) !important;
              margin-bottom: var(--space-6) !important;
            }
            
            .testimonial-card {
              margin-bottom: var(--space-4) !important;
              padding: var(--space-4) !important;
            }
            
            .testimonial-text {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              line-height: 1.6 !important;
            }
            
            .testimonial-author h6 {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
            }
            
            .testimonial-author small {
              font-size: clamp(0.75rem, 2vw, 0.8rem) !important;
            }
            
            .avatar-container {
              width: 50px !important;
              height: 50px !important;
            }
            
            .avatar-fallback {
              font-size: 1rem !important;
            }
            
            .quote-icon span {
              font-size: 2rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .testimonials-section {
              padding: var(--space-8) 0;
            }
            
            .section-title {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
            }
            
            .testimonial-card {
              padding: var(--space-3) !important;
            }
            
            .testimonial-text {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            
            .testimonial-author h6 {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            
            .testimonial-author small {
              font-size: clamp(0.7rem, 1.8vw, 0.75rem) !important;
            }
            
            .avatar-container {
              width: 45px !important;
              height: 45px !important;
          }
          
            .avatar-fallback {
              font-size: 0.9rem !important;
            }
            
            .quote-icon span {
              font-size: 1.8rem !important;
            }
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
            What People Say
          </motion.h2>
          
          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col key={testimonial.id} lg={4} md={6}>
                <motion.div variants={cardVariants}>
                  <Card className="h-100 testimonial-card">
                    <Card.Body className="d-flex flex-column">
                      <div className="quote-icon">
                        <span>"</span>
                      </div>
                      
                      <div className="testimonial-content">
                        <p className="testimonial-text mb-0">
                          {testimonial.content}
                        </p>
                      
                        <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                        <div className="testimonial-author">
                          {renderAvatar(testimonial)}
                        <div>
                            <h6 className="mb-0">{testimonial.name}</h6>
                            <small>{testimonial.role}</small>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials; 