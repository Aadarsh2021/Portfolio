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
  );
};

export default EnhancedContact; 