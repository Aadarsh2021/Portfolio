import React from 'react';
import { Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedAnalytics from './EnhancedAnalytics';

interface AnalyticsModalProps {
  show: boolean;
  onHide: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ show, onHide }) => {
  return (
    <AnimatePresence>
      {show && (
        <Modal
          show={show}
          onHide={onHide}
          size="xl"
          centered
          backdrop="static"
          keyboard={true}
          className="analytics-modal"
        >
          <motion.div
            key="analytics-modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Modal.Header className="glass-effect border-0 d-flex justify-content-between align-items-center">
              <Modal.Title className="text-gradient">
                📊 Portfolio Analytics Dashboard
              </Modal.Title>
              <button
                type="button"
                className="custom-close-btn"
                onClick={onHide}
                aria-label="Close"
              >
                ✕
              </button>
            </Modal.Header>
            
            <Modal.Body className="p-0" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <div className="analytics-modal-content">
                <EnhancedAnalytics />
              </div>
            </Modal.Body>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsModal; 