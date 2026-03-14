import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowUpRight } from 'react-icons/bs';

const Blog: React.FC = () => {
  const posts = [
    { 
      title: "Scaling Cloud Inventory", 
      category: "System Architecture",
      date: "Mar 2024"
    },
    { 
      title: "AI & Talent Matching", 
      category: "Groq Intelligence",
      date: "Feb 2024"
    },
    { 
      title: "Modern Billing Architecture", 
      category: "Enterprise SaaS",
      date: "Jan 2024"
    }
  ];

  return (
    <div className="blog-bento-content p-4 h-100 d-flex flex-column" style={{ minHeight: '100%' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="aura-text mb-1" style={{ fontSize: '1.4rem' }}>Insights</h3>
          <p className="mono-label mb-0" style={{ fontSize: '0.6rem', color: 'var(--text-dimmed)' }}>Thought Leadership</p>
        </div>
        <div className="glass-panel px-3 py-1 d-none d-sm-block">
          <span className="mono-label" style={{ fontSize: '0.6rem' }}>Blog Posts</span>
        </div>
      </div>

      <div className="posts-list flex-grow-1 d-flex flex-column gap-2 overflow-hidden">
        {posts.map((post, index) => (
          <motion.div 
            key={index}
            className="post-card-mini p-3 glass-effect"
            style={{ 
              borderRadius: '16px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, backgroundColor: 'var(--bg-surface-elevated)' }}
            transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="d-flex justify-content-between align-items-center gap-2">
              <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge-category px-2 py-0.5" style={{ 
                    fontSize: '0.55rem', 
                    background: 'var(--primary-aura-translucent)', 
                    color: 'var(--aura-violet)',
                    borderRadius: '4px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>
                    {post.category}
                  </span>
                  <span className="d-none d-md-inline" style={{ fontSize: '0.6rem', color: 'var(--text-dimmed)' }}>• {post.date}</span>
                </div>
                <h6 className="mb-0 text-truncate" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {post.title}
                </h6>
              </div>
              <div className="arrow-container glass-panel p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px', borderRadius: '8px' }}>
                {React.createElement(BsArrowUpRight as any, { size: 12, style: { color: 'var(--text-primary)' } })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <a 
        href="https://medium.com/@thakuraadarsh1" 
        target="_blank" 
        rel="noreferrer" 
        className="no-underline w-100"
      >
        <motion.button 
          className="primary-aura-btn w-100 py-3 mt-4 flex-shrink-0"
          style={{ 
            fontSize: '0.85rem', 
            height: '48px',
            background: 'var(--text-primary)',
            color: 'var(--bg-obsidian)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Articles
        </motion.button>
      </a>
    </div>
  );
};

export default Blog;