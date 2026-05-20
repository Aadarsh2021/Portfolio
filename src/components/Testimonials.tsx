import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import ReviewGiver from './ReviewGiver';

const Testimonials: React.FC = () => {
  const [dynamicReviews, setDynamicReviews] = React.useState<any[]>([]);

  React.useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("approved", "==", true),
      orderBy("timestamp", "desc"),
      limit(6)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isDynamic: true
      }));
      setDynamicReviews(reviews);
    }, (error) => {
      console.error("Error fetching reviews:", error);
    });

    return () => unsubscribe();
  }, []);

  const staticTestimonials = [
    {
      id: "s1",
      name: "Prof. Dr. Rajesh Kumar",
      role: "Project Supervisor, G L Bajaj Group of Institutions",
      content: "Aadarsh's Farm-Ease project is a masterpiece of modern web development. His ability to integrate AI, blockchain, and web technologies into a cohesive solution that actually helps farmers is remarkable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      id: "s2",
      name: "Sarah Johnson",
      role: "Senior Backend Developer, Ash-Tech Technologies",
      content: "Working with Aadarsh during his internship was a pleasure. He single-handedly optimized our API response time by 60% and improved system scalability by 300%.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      id: "s3",
      name: "Michael Chen",
      role: "AI/ML Engineer, Smart City Solutions",
      content: "Aadarsh's Smart City Traffic Monitoring system is impressive. Achieving 92% vehicle detection accuracy with real-time processing at 30 FPS is no small feat.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    }
  ];

  const allTestimonials = [
    ...dynamicReviews.map(r => ({
      id: r.id,
      name: r.name,
      role: r.role,
      content: r.content,
      rating: r.rating,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random&color=fff`,
      isDynamic: true
    })),
    ...staticTestimonials
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="testimonials" className="testimonials-section py-5">
      <style>
        {`
          .testimonials-section {
            background: var(--bg-secondary);
            position: relative;
            padding: var(--space-20) 0;
          }
          
          .testimonial-card {
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            border-radius: 24px;
            height: 100%;
            transition: all 0.4s var(--ease-expo);
            padding: var(--space-8);
            display: flex;
            flex-direction: column;
          }
          
          .testimonial-card:hover {
            transform: translateY(-8px);
            border-color: var(--primary-aura);
            box-shadow: var(--shadow-premium);
          }

          .quote-icon {
            font-size: 3rem;
            line-height: 1;
            color: var(--primary-aura);
            margin-bottom: var(--space-4);
            opacity: 0.3;
          }

          .avatar-img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 2px solid var(--primary-aura);
            padding: 2px;
          }
        `}
      </style>
      
      <Container>
        <div className="text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="display-title gradient-text mb-3"
          >
            What People Say
          </motion.h2>
          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Trusted by industry leaders for delivering high-performance, scalable solutions.
          </p>
          <ReviewGiver />
        </div>
        
        <Row className="g-4">
          {allTestimonials.slice(0, 6).map((testimonial) => (
            <Col key={testimonial.id} lg={4} md={6}>
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="h-100"
              >
                <Card className="testimonial-card">
                  <div className="quote-icon">“</div>
                  <p className="text-secondary mb-4" style={{ flexGrow: 1, fontStyle: 'italic' }}>
                    {testimonial.content}
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <img src={testimonial.image} alt={testimonial.name} className="avatar-img" />
                    <div>
                      <h6 className="mb-0" style={{ fontWeight: 700 }}>{testimonial.name}</h6>
                      <small className="text-dimmed">{testimonial.role}</small>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
