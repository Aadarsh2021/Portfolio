import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ResumeDownload: React.FC = () => {
  const handleDownload = async () => {
    try {
      // First try to fetch the file to ensure it exists
      const response = await fetch('/assets/Aadarsh_new_resume.pdf');
      if (!response.ok) {
        throw new Error('Resume file not found');
      }
      
      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Aadarsh_Thakur_Resume.pdf';
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      console.log('Resume download initiated successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback: open in new tab
      window.open('/assets/Aadarsh_new_resume.pdf', '_blank');
    }
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
        className="resume-download-btn me-3"
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
      
      <Button
        as="a"
        href="/assets/Aadarsh_new_resume.pdf"
        download="Aadarsh_Thakur_Resume.pdf"
        target="_blank"
        variant="outline-primary"
        size="lg"
        style={{
          borderRadius: '50px',
          padding: '12px 30px',
          fontSize: '16px',
          fontWeight: '600',
          borderWidth: '2px'
        }}
      >
        📋 View Resume
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