import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
}

const SimpleBlog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt: "Learn the best practices for building React applications that scale with your team and user base.",
      author: "Aadarsh Kumar",
      date: "2024-01-15",
      readTime: 8,
      tags: ["React", "JavaScript", "Frontend"],
      category: "Frontend",
      featured: true
    },
    {
      id: 2,
      title: "Modern CSS Techniques for 2024",
      excerpt: "Explore the latest CSS features and techniques that will transform your web designs.",
      author: "Aadarsh Kumar",
      date: "2024-01-10",
      readTime: 6,
      tags: ["CSS", "Design", "Web"],
      category: "Design"
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      excerpt: "Master TypeScript with these essential patterns and practices for safer, more maintainable code.",
      author: "Aadarsh Kumar",
      date: "2024-01-05",
      readTime: 10,
      tags: ["TypeScript", "JavaScript", "Development"],
      category: "Backend"
    }
  ];

  const categories = ['all', 'Frontend', 'Backend', 'Design'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogPosts]);

  return (
    <section id="blog" className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="display-4 fw-bold text-gradient mb-4">Latest Articles</h2>
          <p className="lead text-muted">Thoughts, tutorials, and insights on web development</p>
        </motion.div>

        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"} btn-sm rounded-pill`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </Col>
        </Row>

        <Row>
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Col lg={4} md={6} key={post.id} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-100"
                  >
                    <Card className={`glass-effect h-100 ${post.featured ? 'border-primary' : ''}`}>
                      {post.featured && (
                        <Badge bg="primary" className="position-absolute top-0 start-0 m-3">
                          Featured
                        </Badge>
                      )}
                      <Card.Body className="p-4">
                        <div className="d-flex align-items-center mb-3 text-muted">
                          <small>{new Date(post.date).toLocaleDateString()}</small>
                          <span className="mx-2">•</span>
                          <small>{post.readTime} min read</small>
                        </div>

                        <h5 className="card-title mb-3">{post.title}</h5>
                        <p className="card-text text-muted mb-4">{post.excerpt}</p>

                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {post.tags.map(tag => (
                            <Badge key={tag} bg="secondary" className="rounded-pill">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">By {post.author}</small>
                          <button className="btn btn-outline-primary btn-sm">
                            Read More →
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-5"
                >
                  <h4>No articles found</h4>
                  <p className="text-muted">Try adjusting your search or filter criteria</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </button>
                </motion.div>
              </Col>
            )}
          </AnimatePresence>
        </Row>
      </Container>
    </section>
  );
};

export default SimpleBlog; 