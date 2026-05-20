import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BsStarFill, BsSend, BsPerson, BsChatLeftQuote } from 'react-icons/bs';

import ReactDOM from 'react-dom';

const ReviewGiver: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    impact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        ...formData,
        timestamp: serverTimestamp(),
        approved: formData.rating >= 4 
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setFormData({ name: '', role: '', content: '', rating: 5, impact: '' });
      }, 3000);
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="review-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          />
          <motion.div 
            className="review-modal-content glass-panel p-4"
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, y: 100, x: '-50%' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 10000,
              width: 'min(500px, 95%)',
              borderRadius: '28px',
              background: 'var(--bg-obsidian)',
              border: '1px solid var(--border-luminous)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {submitted ? (
              <div className="text-center py-5">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4 text-success">
                  {React.createElement(BsStarFill as any, { size: 64 })}
                </motion.div>
                <h3 className="aura-text">Thank You!</h3>
                <p className="text-dimmed">Your review has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="aura-text mb-0">Share Feedback</h3>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setIsOpen(false)} />
                </div>

                <div className="mb-3">
                  <label className="mono-label mb-2 d-block">Full Name</label>
                  <div className="input-group-aura">
                    {React.createElement(BsPerson as any, { className: "input-icon" })}
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="mono-label mb-2 d-block">Role / Company</label>
                  <input 
                    required
                    className="input-aura"
                    type="text" 
                    placeholder="CEO at Tech Corp"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>

                <div className="mb-3">
                  <label className="mono-label mb-2 d-block">Rating</label>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} onClick={() => setFormData({...formData, rating: star})} style={{ cursor: 'pointer' }}>
                        {React.createElement(BsStarFill as any, { 
                          size: 24, 
                          style: { color: star <= formData.rating ? '#FFD700' : 'rgba(255,255,255,0.1)', transition: '0.2s' } 
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mono-label mb-2 d-block">Your Experience</label>
                  <div className="input-group-aura align-items-start py-2">
                    {React.createElement(BsChatLeftQuote as any, { className: "input-icon mt-1" })}
                    <textarea 
                      required
                      rows={3}
                      placeholder="Working with Aadarsh was..."
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="primary-aura-btn w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? "Submitting..." : (
                    <>
                      {React.createElement(BsSend as any)} Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="review-giver-container">
      <motion.button 
        className="primary-aura-btn py-2 px-4"
        style={{ fontSize: '0.8rem', background: 'var(--primary-aura-translucent)', border: '1px solid var(--border-luminous)', borderRadius: '12px' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        Leave a Review
      </motion.button>

      {ReactDOM.createPortal(modalContent, document.body)}

      <style>{`
        .input-group-aura {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-luminous);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          transition: 0.3s;
        }
        .input-group-aura:focus-within {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .input-icon {
          color: var(--text-dimmed);
          margin-right: 0.75rem;
        }
        .input-group-aura input, .input-group-aura textarea {
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 0.75rem 0;
          width: 100%;
          outline: none;
          font-size: 0.9rem;
        }
        .input-aura {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-luminous);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          width: 100%;
          color: var(--text-primary);
          outline: none;
          font-size: 0.9rem;
          transition: 0.3s;
        }
        .input-aura:focus {
          border-color: var(--primary);
        }
        .review-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          z-index: 2999;
        }
      `}</style>
    </div>
  );
};

export default ReviewGiver;
