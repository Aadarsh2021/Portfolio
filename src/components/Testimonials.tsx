import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
// import { BsQuote } from 'react-icons/bs';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Prof. Dr. Rajesh Kumar",
      role: "Project Supervisor, G L Bajaj Group of Institutions",
      content: "Aadarsh demonstrates exceptional problem-solving skills and dedication to web development. His FarmEase project showcases advanced technical abilities and innovative thinking.",
      rating: 5,
      image: "https://via.placeholder.com/80x80/6366f1/ffffff?text=RK"
    },
    {
      id: 2,
      name: "Internship Studio Team",
      role: "Data Science Training Program",
      content: "Successfully completed comprehensive data science training with excellent performance. Shows strong analytical thinking and technical proficiency in modern web technologies.",
      rating: 5,
      image: "https://via.placeholder.com/80x80/8b5cf6/ffffff?text=IS"
    },
    {
      id: 3,
      name: "College Project Team",
      role: "Smart City Traffic Detection",
      content: "Outstanding collaboration on AI/ML project. Aadarsh's technical expertise in Python and computer vision frameworks contributed significantly to project success.",
      rating: 5,
      image: "https://via.placeholder.com/80x80/06b6d4/ffffff?text=CP"
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star text-warning">
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <style>
        {`
          @media (max-width: 768px) {
            .testimonials-section {
              padding: 3rem 0;
            }
            .section-title {
              font-size: clamp(2rem, 6vw, var(--font-size-4xl)) !important;
              margin-bottom: 2rem !important;
            }
            .testimonial-card {
              margin-bottom: 1.5rem !important;
              padding: 1.5rem !important;
            }
            .testimonial-card blockquote p {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              line-height: 1.6 !important;
            }
            .testimonial-author h6 {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
            }
            .testimonial-author small {
              font-size: clamp(0.75rem, 2vw, 0.8rem) !important;
            }
            .testimonial-author img {
              width: 40px !important;
              height: 40px !important;
            }
            .quote-icon span {
              font-size: clamp(24px, 6vw, 30px) !important;
            }
            .star {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
            }
          }
          
          @media (max-width: 480px) {
            .testimonials-section {
              padding: 2rem 0;
            }
            .section-title {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
            }
            .testimonial-card {
              padding: 1.25rem !important;
            }
            .testimonial-card blockquote p {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            .testimonial-author h6 {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            .testimonial-author small {
              font-size: clamp(0.7rem, 1.8vw, 0.75rem) !important;
            }
            .testimonial-author img {
              width: 35px !important;
              height: 35px !important;
            }
          }
          
          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          
          .testimonial-card {
            transition: all 0.3s ease;
            border: none;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
          }
          
          .star {
            font-size: 1.1rem;
            margin-right: 2px;
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
                  <Card className="h-100 testimonial-card glass-effect">
                    <Card.Body className="d-flex flex-column">
                      <div className="quote-icon mb-3">
                        <span className="text-primary" style={{ fontSize: '30px' }}>"</span>
                      </div>
                      
                      <blockquote className="flex-grow-1 mb-4">
                        <p className="mb-0 fst-italic">"{testimonial.content}"</p>
                      </blockquote>
                      
                      <div className="testimonial-rating mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <div className="testimonial-author d-flex align-items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                          <small className="text-muted">{testimonial.role}</small>
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