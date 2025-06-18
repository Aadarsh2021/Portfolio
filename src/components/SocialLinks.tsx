import React from 'react';
import { motion } from 'framer-motion';

const SocialLinks: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Aadarsh2021',
      icon: '🔗',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/aadarsh-thakur',
      icon: '💼',
      color: '#0077B5'
    },
    {
      name: 'Email',
      url: 'mailto:thakuraadarsh1@gmail.com',
      icon: '📧',
      color: '#EA4335'
    },
    {
      name: 'Portfolio',
      url: 'https://portfolio-khaki-omega-43.vercel.app/',
      icon: '🌐',
      color: '#6366f1'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="d-flex flex-wrap gap-3 justify-content-center"
    >
      {socialLinks.map((link) => (
        <motion.div key={link.name} variants={itemVariants}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary d-flex align-items-center gap-2 social-btn"
            style={{
              borderColor: link.color,
              color: link.color,
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = link.color;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = link.color;
            }}
          >
            <span style={{ fontSize: '18px' }}>{link.icon}</span>
            {link.name}
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialLinks; 