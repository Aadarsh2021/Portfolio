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
  );
};

export default Testimonials; 