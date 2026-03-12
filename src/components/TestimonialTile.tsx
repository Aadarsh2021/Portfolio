import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChatQuote, BsStarFill } from 'react-icons/bs';

const testimonials = [
  {
    name: "Prof. Dr. Rajesh Kumar",
    role: "Project Supervisor, G L Bajaj",
    content: "Aadarsh is a problem-solver who thinks about the bigger picture. His ability to engineer scalable enterprise architectures is remarkable.",
    impact: "Architectural Lead"
  },
  {
    name: "Sarah Johnson",
    role: "Senior Backend Lead",
    content: "He single-handedly optimized our API response time by 60% and improved system scalability by 300%.",
    impact: "60% API Boost"
  },
  {
    name: "Michael Chen",
    role: "Senior Software Architect",
    content: "Orchestrating real-time inventory synchronization across global cloud nodes is no small feat. Exceptional performance mindset.",
    impact: "Zero-Latency Expert"
  }
];

const TestimonialTile: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-tile-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {React.createElement(BsChatQuote as any, { className: "text-primary", size: 24 })}
        <div className="d-flex gap-1">
          {[1, 2, 3, 4, 5].map(s => React.createElement(BsStarFill as any, { key: s, className: "text-warning", size: 10 }))}
        </div>
      </div>

      <div className="testimonial-display flex-grow-1 position-relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="h-100 d-flex flex-column"
          >
            <p className="text-dimmed mb-3" style={{ fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{testimonials[index].content}"
            </p>
            
            <div className="mt-auto">
              <h6 className="text-white mb-0" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{testimonials[index].name}</h6>
              <p className="text-secondary small mb-2">{testimonials[index].role}</p>
              
              <div className="badge glass-panel px-2 py-1" style={{ fontSize: '0.65rem', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                {testimonials[index].impact}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="d-flex gap-1 mt-3 justify-content-center">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: '4px', 
              height: '4px', 
              borderRadius: '50%', 
              background: i === index ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              transition: '0.3s'
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialTile;
