import React, { useState, useRef, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  BsEnvelope, 
  BsLinkedin, 
  BsGithub,
  BsCheckCircle,
  BsExclamationCircle,
  BsPerson,
  BsChatText,
  BsShield
} from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import { useNotifications } from './NotificationSystem';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam field
}

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SubmitButton = ({ isSubmitting, renderIcon }: { isSubmitting: boolean; renderIcon: (icon: IconType, size: number) => JSX.Element }): React.ReactElement => {
  return (
    <button
      type="submit"
      className="w-100 btn-gradient btn btn-primary btn-lg"
      disabled={isSubmitting}
    >
      <div className="d-flex align-items-center justify-content-center">
        {isSubmitting && (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
        )}
        <span className="d-flex align-items-center">
          {!isSubmitting && renderIcon(BsEnvelope, 18)}
          <span className="ms-2">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </span>
      </div>
    </button>
  );
};

const EnhancedContact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const { success, error: showError } = useNotifications();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const renderIcon = useCallback((IconComponent: IconType, size: number) => {
    const Icon = IconComponent as React.ComponentType<{ size: number }>;
    return <Icon size={size} />;
  }, []);

  // Real-time validation
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return 'Name contains invalid characters';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return undefined;

      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        if (value.trim().length > 100) return 'Subject must be less than 100 characters';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return undefined;

      default:
        return undefined;
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'honeypot') {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          errors[key as keyof ValidationErrors] = error;
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateField]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation for touched fields
    if (touchedFields.has(name) || submitAttempted) {
      const error = validateField(name, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touchedFields, submitAttempted, validateField]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => new Set(prev).add(name));
    
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Check for spam (honeypot)
    if (formData.honeypot) {
      showError('Spam detected', 'Your submission was blocked.');
      return;
    }

    if (!validateForm()) {
      showError('Validation Error', 'Please fix the errors below and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!form.current) {
        throw new Error('Form reference not found');
      }

      const result = await emailjs.sendForm(
        'Portfolio',
        'template_14lpbcb',
        form.current,
        'XbrOlxZukaholZWbl'
      );

      if (result.text === 'OK') {
        success(
          'Message Sent Successfully!',
          'Thank you for reaching out. I\'ll get back to you soon.',
          {
            duration: 5000,
            actions: [
              {
                label: 'Send Another',
                action: () => {
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    honeypot: ''
                  });
                  setValidationErrors({});
                  setTouchedFields(new Set());
                  setSubmitAttempted(false);
                },
                style: 'primary'
              }
            ]
          }
        );

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: ''
        });
        setValidationErrors({});
        setTouchedFields(new Set());
        setSubmitAttempted(false);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showError(
        'Failed to Send Message',
        'There was an error sending your message. Please try again or contact me directly.',
        {
          duration: 7000,
          actions: [
            {
              label: 'Try Again',
              action: () => handleSubmit(e),
              style: 'primary'
            },
            {
              label: 'Email Directly',
              action: () => window.open('mailto:thakuraadarsh1@gmail.com'),
              style: 'secondary'
            }
          ]
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    const hasError = validationErrors[fieldName as keyof ValidationErrors];
    const isTouched = touchedFields.has(fieldName) || submitAttempted;
    
    if (!isTouched) return '';
    return hasError ? 'is-invalid' : 'is-valid';
  };

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

  return (
    <section id="contact" className="contact-section">
      <style>
        {`
          @media (max-width: 768px) {
            .contact-section {
              padding: 3rem 0;
              touch-action: manipulation;
            }
            .section-title {
              font-size: clamp(2rem, 6vw, var(--font-size-4xl)) !important;
              margin-bottom: 2rem !important;
              text-align: center !important;
            }
            .contact-info {
              margin-bottom: 2rem !important;
            }
            .contact-card {
              padding: 1.5rem !important;
              margin-bottom: 1rem !important;
              border-radius: 16px !important;
              transition: all 0.2s ease !important;
            }
            .contact-card:active {
              transform: scale(0.98) !important;
              transition: transform 0.1s ease !important;
            }
            .contact-card .card-title {
              font-size: clamp(1.1rem, 3vw, 1.3rem) !important;
              margin-bottom: 0.75rem !important;
              font-weight: 600 !important;
            }
            .contact-card .card-text {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              line-height: 1.5 !important;
            }
            .form-label {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              margin-bottom: 0.5rem !important;
              font-weight: 500 !important;
            }
            .form-control, .form-select {
              font-size: 16px !important; /* Prevents zoom on iOS */
              padding: 0.75rem !important;
              margin-bottom: 1rem !important;
              border-radius: 12px !important;
              border: 2px solid var(--glass-border) !important;
              transition: all 0.2s ease !important;
            }
            .form-control:focus, .form-select:focus {
              border-color: var(--primary) !important;
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
              transform: translateY(-1px) !important;
            }
            .form-textarea {
              min-height: 120px !important;
              resize: vertical !important;
            }
            .btn-gradient {
              font-size: clamp(0.9rem, 2.5vw, 1rem) !important;
              padding: 0.75rem !important;
              min-height: 52px !important;
              border-radius: 12px !important;
              font-weight: 600 !important;
              transition: all 0.2s ease !important;
            }
            .btn-gradient:active {
              transform: scale(0.95) !important;
              transition: transform 0.1s ease !important;
            }
            .social-links {
              gap: 1rem !important;
              margin-top: 2rem !important;
              justify-content: center !important;
            }
            .social-link {
              min-height: 52px !important;
              min-width: 52px !important;
              border-radius: 12px !important;
              font-size: 1.2rem !important;
              transition: all 0.2s ease !important;
            }
            .social-link:active {
              transform: scale(0.9) !important;
              transition: transform 0.1s ease !important;
            }
            .contact-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 1.5rem !important;
              border-radius: 12px !important;
            }
          }
          
          @media (max-width: 480px) {
            .contact-section {
              padding: 2rem 0;
            }
            .section-title {
              font-size: clamp(1.8rem, 5vw, 2.5rem) !important;
              margin-bottom: 1.5rem !important;
            }
            .contact-card {
              padding: 1.25rem !important;
              margin-bottom: 0.75rem !important;
            }
            .contact-card .card-title {
              font-size: clamp(1rem, 2.8vw, 1.2rem) !important;
            }
            .contact-card .card-text {
              font-size: clamp(0.8rem, 2.2vw, 0.9rem) !important;
            }
            .form-control, .form-select {
              font-size: 16px !important;
              padding: 0.6rem !important;
              margin-bottom: 0.75rem !important;
            }
            .btn-gradient {
              font-size: clamp(0.85rem, 2.2vw, 0.95rem) !important;
              padding: 0.6rem !important;
              min-height: 48px !important;
            }
            .social-link {
              min-height: 48px !important;
              min-width: 48px !important;
              font-size: 1.1rem !important;
            }
            .contact-icon {
              width: 50px !important;
              height: 50px !important;
              font-size: 1.25rem !important;
            }
          }
          
          @media (max-width: 360px) {
            .section-title {
              font-size: clamp(1.6rem, 4.5vw, 2.2rem) !important;
            }
            .contact-card {
              padding: 1rem !important;
            }
            .form-control, .form-select {
              padding: 0.5rem !important;
            }
            .btn-gradient {
              min-height: 44px !important;
            }
            .social-link {
              min-height: 44px !important;
              min-width: 44px !important;
              font-size: 1rem !important;
            }
            .contact-icon {
              width: 45px !important;
              height: 45px !important;
              font-size: 1.1rem !important;
            }
          }
          
          .contact-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .social-link:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          
          .form-control:focus, .form-select:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
          }
          
          .btn-gradient {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border: none;
            transition: all 0.3s ease;
          }
          
          /* Mobile-specific touch optimizations */
          @media (hover: none) and (pointer: coarse) {
            .contact-card:hover {
              transform: none !important;
            }
            .social-link:hover {
              transform: none !important;
            }
            .btn-gradient:hover {
              transform: none !important;
            }
          }
        `}
      </style>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-5">Get in Touch</h2>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="contact-card glass-effect">
                <Form ref={form} onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field for spam protection */}
                  <div style={{ display: 'none' }}>
                    <Form.Control
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="d-flex align-items-center gap-2">
                          {renderIcon(BsPerson, 16)}
                          Name *
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Your full name"
                            required
                            className={getFieldStatus('name')}
                            aria-describedby="name-feedback"
                          />
                          <AnimatePresence>
                            {getFieldStatus('name') === 'is-valid' && (
                              <motion.div
                                key="name-success-icon"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="input-group-text bg-success text-white"
                              >
                                {renderIcon(BsCheckCircle, 16)}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </InputGroup>
                        <AnimatePresence>
                          {validationErrors.name && (touchedFields.has('name') || submitAttempted) && (
                            <motion.div
                              key="name-error-message"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="invalid-feedback d-block"
                              id="name-feedback"
                            >
                              {renderIcon(BsExclamationCircle, 14)} {validationErrors.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="d-flex align-items-center gap-2">
                          {renderIcon(BsEnvelope, 16)}
                          Email *
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="your.email@example.com"
                            required
                            className={getFieldStatus('email')}
                            aria-describedby="email-feedback"
                          />
                          <AnimatePresence>
                            {getFieldStatus('email') === 'is-valid' && (
                              <motion.div
                                key="email-success-icon"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="input-group-text bg-success text-white"
                              >
                                {renderIcon(BsCheckCircle, 16)}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </InputGroup>
                        <AnimatePresence>
                          {validationErrors.email && (touchedFields.has('email') || submitAttempted) && (
                            <motion.div
                              key="email-error-message"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="invalid-feedback d-block"
                              id="email-feedback"
                            >
                              {renderIcon(BsExclamationCircle, 14)} {validationErrors.email}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center gap-2">
                      {renderIcon(BsChatText, 16)}
                      Subject *
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="What's this about?"
                        required
                        className={getFieldStatus('subject')}
                        aria-describedby="subject-feedback"
                      />
                      <AnimatePresence>
                        {getFieldStatus('subject') === 'is-valid' && (
                          <motion.div
                            key="subject-success-icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="input-group-text bg-success text-white"
                          >
                            {renderIcon(BsCheckCircle, 16)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </InputGroup>
                    <AnimatePresence>
                      {validationErrors.subject && (touchedFields.has('subject') || submitAttempted) && (
                        <motion.div
                          key="subject-error-message"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="invalid-feedback d-block"
                          id="subject-feedback"
                        >
                          {renderIcon(BsExclamationCircle, 14)} {validationErrors.subject}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center gap-2">
                      {renderIcon(BsChatText, 16)}
                      Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      placeholder="Tell me about your project, question, or just say hello..."
                      required
                      className={getFieldStatus('message')}
                      aria-describedby="message-feedback"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <AnimatePresence>
                        {validationErrors.message && (touchedFields.has('message') || submitAttempted) && (
                          <motion.div
                            key="message-error-message"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="invalid-feedback d-block"
                            id="message-feedback"
                          >
                            {renderIcon(BsExclamationCircle, 14)} {validationErrors.message}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <small className="text-muted">
                        {formData.message.length}/1000 characters
                      </small>
                    </div>
                  </Form.Group>

                  <div className="d-flex align-items-center mb-4">
                    {renderIcon(BsShield, 16)}
                    <small className="text-muted ms-2">
                      Your information is secure and will never be shared.
                    </small>
                  </div>

                  <SubmitButton isSubmitting={isSubmitting} renderIcon={renderIcon} />
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
                      aria-label="GitHub Profile"
                    >
                      {renderIcon(BsGithub, 24)}
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="social-link"
                      aria-label="LinkedIn Profile"
                    >
                      {renderIcon(BsLinkedin, 24)}
                    </motion.a>
                    <motion.a
                      onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=thakuraadarsh1@gmail.com&su=Contact%20from%20Portfolio&body=Hello%20Aadarsh%2C%0A%0AI%20am%20reaching%20out%20regarding%20', '_blank')}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ scale: 1.1 }}
                      className="social-link"
                      aria-label="Send Email"
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
    </section>
  );
};

export default EnhancedContact; 