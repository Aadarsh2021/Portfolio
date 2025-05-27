import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsEnvelope, 
  BsLinkedin, 
  BsGithub,
  BsCheckCircle
} from 'react-icons/bs';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: ''
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({
        ...status,
        error: true,
        message: 'Please enter your name'
      });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({
        ...status,
        error: true,
        message: 'Please enter a valid email address'
      });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({
        ...status,
        error: true,
        message: 'Please enter your message'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ ...status, submitting: true, error: false, message: '' });

    try {
      if (!form.current) return;

      const result = await emailjs.sendForm(
        'Portfolio', // Your EmailJS service ID
        'template_14lpbcb', // Your EmailJS template ID
        form.current,
        'XbrOlxZukaholZWbl' // Your EmailJS public key
      );

      if (result.text === 'OK') {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: 'Message sent successfully!'
        });

        // Clear form after successful submission
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, submitted: false, message: '' }));
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error message when user starts typing
    if (status.error) {
      setStatus(prev => ({ ...prev, error: false, message: '' }));
    }
  };

  const renderIcon = (IconComponent: IconType, size: number) => {
    const Icon = IconComponent as React.ComponentType<{ size: number }>;
    return <Icon size={size} />;
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title text-center mb-5">Get in Touch</h2>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="contact-card">
              {(status.error || status.submitted) && status.message && (
                <Alert 
                  variant={status.error ? "danger" : "success"} 
                  className="mb-4"
                  style={{
                    background: status.error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(25, 135, 84, 0.1)',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                >
                  {status.submitted && !status.error && (
                    <span className="me-2">
                      {renderIcon(BsCheckCircle, 18)}
                    </span>
                  )}
                  {status.message}
                </Alert>
              )}

              <Form ref={form} onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={status.error && !formData.name ? 'is-invalid' : ''}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className={status.error && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'is-invalid' : ''}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your message here..."
                    required
                    className={status.error && !formData.message ? 'is-invalid' : ''}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 contact-submit-btn"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>

              <motion.div variants={itemVariants} className="text-center mt-5">
                <p className="mb-3">Or connect with me directly:</p>
                <div className="d-flex justify-content-center gap-4">
                  <motion.a
                    href="https://github.com/Aadarsh2021"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="social-link"
                  >
                    {renderIcon(BsGithub, 24)}
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="social-link"
                  >
                    {renderIcon(BsLinkedin, 24)}
                  </motion.a>
                  <motion.a
                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=thakuraadarsh1@gmail.com&su=Contact%20from%20Portfolio&body=Hello%20Aadarsh%2C%0A%0AI%20am%20reaching%20out%20regarding%20', '_blank')}
                    style={{ cursor: 'pointer' }}
                    whileHover={{ scale: 1.1 }}
                    className="social-link"
                  >
                    {renderIcon(BsEnvelope, 24)}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Contact; 