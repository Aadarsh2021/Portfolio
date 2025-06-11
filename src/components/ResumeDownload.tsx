import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ResumeDownload: React.FC = () => {
      const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/assets/Aadarsh_new_resume.pdf';
      link.download = 'Aadarsh_Thakur_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Button
        onClick={handleDownload}
        size="lg"
        className="resume-download-btn"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 30px',
          fontSize: '18px',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
        }}
      >
        📄 Download Resume
      </Button>
      
      <motion.p 
        className="mt-3 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Get my complete professional profile
      </motion.p>
    </motion.div>
  );
};

export default ResumeDownload; 