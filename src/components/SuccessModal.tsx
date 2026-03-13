import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
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
  // Auto-close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
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
          <motion.div 
            className="success-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="success-modal-glow"></div>
            
            <button className="success-modal-close" onClick={onClose}>
              {React.createElement(FiX as any, { size: 20 })}
            </button>

            <div className="success-icon-wrapper">
              <motion.div 
                className="success-icon-ring"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              />
              <motion.div 
                className="success-icon-check"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {React.createElement(FiCheck as any, { size: 40 })}
              </motion.div>
            </div>

            <div className="success-text-content">
              <h2 className="success-title">{title}</h2>
              <p className="success-message">{message}</p>
            </div>

            <motion.button 
              className="success-modal-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Great!
            </motion.button>

            <div className="success-modal-pbar">
              <motion.div 
                className="success-modal-pbar-fill"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
