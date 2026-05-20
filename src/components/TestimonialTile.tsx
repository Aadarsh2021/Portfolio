import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChatQuote, BsStarFill } from 'react-icons/bs';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import ReviewGiver from './ReviewGiver';
import { portfolioData } from '../data/portfolioData';

const TestimonialTile: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"), 
          where("approved", "==", true),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map(doc => doc.data());
        
        // Combine with featured ones if needed, or just use real ones
        if (reviews.length > 0) {
          setDynamicTestimonials(reviews);
        } else {
          setDynamicTestimonials(portfolioData.testimonials);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setDynamicTestimonials(portfolioData.testimonials);
      }
    };

    fetchReviews();
  }, []);

  const currentList = dynamicTestimonials.length > 0 ? dynamicTestimonials : portfolioData.testimonials;

  useEffect(() => {
    if (currentList.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentList.length]);

  return (
    <div className="testimonial-tile-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          {React.createElement(BsChatQuote as any, { className: "text-primary", size: 24 })}
          <ReviewGiver />
        </div>
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
              "{currentList[index]?.content}"
            </p>
            
            <div className="mt-auto">
              <h6 className="text-white mb-0" style={{ fontSize: '0.9rem', fontWeight: 700 }}>{currentList[index]?.name}</h6>
              <p className="text-secondary small mb-2">{currentList[index]?.role}</p>
              
              <div className="badge glass-panel px-2 py-1" style={{ fontSize: '0.65rem', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                {currentList[index]?.impact || "Verified Review"}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="d-flex gap-1 mt-3 justify-content-center">
        {currentList.map((_, i) => (
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
