import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowUpRight } from 'react-icons/bs';

const Blog: React.FC = () => {
  const posts = [
    { title: "Building FarmEase", category: "AI & Blockchain" },
    { title: "Smart City Traffic", category: "Computer Vision" },
    { title: "Performance at Scale", category: "Optimization" }
  ];

  return (
    <div className="blog-bento-content p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="aura-text mb-0">Insights</h3>
        <span className="mono-label">Blog Posts</span>
      </div>

      <div className="posts-list flex-grow-1">
        {posts.map((post, index) => (
          <motion.div 
            key={index}
            className="post-item mb-3 pb-3"
            style={{ borderBottom: index !== posts.length - 1 ? '1px solid var(--border-luminous)' : 'none' }}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="mb-1" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{post.title}</h6>
                <p className="mb-0" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{post.category}</p>
              </div>
              {React.createElement(BsArrowUpRight as any, { size: 14, className: "mt-1", style: { color: 'var(--text-secondary)' } })}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button 
        className="glass-panel w-100 py-2 mt-auto"
        whileHover={{ backgroundColor: 'var(--border-luminous)' }}
        style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}
      >
        View All Articles
      </motion.button>
    </div>
  );
};

export default Blog;