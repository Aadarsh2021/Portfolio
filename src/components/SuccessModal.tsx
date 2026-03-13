import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import MagneticButton from './MagneticButton';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Message Sent!", 
  message = "Thanks for reaching out! I'll get back to you as soon as possible." 
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setRotateX(-y * 10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Auto-close after 8 seconds (longer for user to appreciate UI)
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="success-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button at optimized position (top right corner of screen area) */}
          <div className="modal-close-high-wrapper">
            <MagneticButton distance={0.4}>
              <button 
                className="success-modal-close-premium" 
                onClick={onClose}
                aria-label="Close"
              >
                {React.createElement(FiX as any, { size: 24 })}
              </button>
            </MagneticButton>
          </div>

          <motion.div 
            className="success-modal-content-premium"
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0, 
              rotateX, 
              rotateY,
              perspective: 1000 
            }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="premium-glow-orb"></div>
            
            <div className="success-icon-section">
              <div className="icon-pulse-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              <div className="icon-main">
                {React.createElement(FiCheck as any, { size: 48 })}
              </div>
            </div>

            <div className="success-info-section">
              <h2 className="success-headline">{title}</h2>
              <p className="success-description">{message}</p>
            </div>

            <div className="success-footer-actions">
              <MagneticButton distance={0.2} className="w-100">
                <button className="premium-action-btn" onClick={onClose}>
                  <span>Return to Home</span>
                </button>
              </MagneticButton>
            </div>

            <div className="success-auto-timer">
              <motion.div 
                className="timer-fill"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
