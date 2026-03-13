import React, { useRef, useState } from 'react';
import { BsEnvelopeFill, BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

const EnhancedContact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setIsSending(true);
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'Portfolio';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_14lpbcb';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'XbrOlxZukaholZWbl';

      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setShowSuccess(true);
      form.current.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      alert('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-bento-content p-4 h-100 d-flex flex-column flex-md-row gap-4">
      <div className="contact-info-side flex-grow-1">
        <h3 className="aura-text mb-3">Let's Connect</h3>
        <p className="text-secondary small mb-4" style={{ maxWidth: '300px' }}>
          Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
        </p>
        
        <div className="social-grid d-flex gap-3 mb-4">
          <a href="https://github.com/Aadarsh2021" target="_blank" rel="noreferrer" className="glass-panel p-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '16px' }}>
            {React.createElement(BsGithub as any, { size: 20 })}
          </a>
          <a href="https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/" target="_blank" rel="noreferrer" className="glass-panel p-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '16px' }}>
            {React.createElement(BsLinkedin as any, { size: 20 })}
          </a>
          <a href="mailto:thakuraadarsh1@gmail.com" className="glass-panel p-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '16px' }}>
            {React.createElement(BsEnvelopeFill as any, { size: 20 })}
          </a>
        </div>
      </div>

      <div className="contact-form-side flex-grow-1">
        <form ref={form} onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input 
            type="text" name="name" placeholder="Name" required 
            className="glass-panel p-3 w-100 border-0" 
            style={{ borderRadius: '12px', background: 'var(--bg-surface-elevated)', fontSize: '0.9rem', color: 'var(--text-primary)', pointerEvents: 'auto', position: 'relative', zIndex: 100 }} 
          />
          <input 
            type="email" name="email" placeholder="Email" required 
            className="glass-panel p-3 w-100 border-0" 
            style={{ borderRadius: '12px', background: 'var(--bg-surface-elevated)', fontSize: '0.9rem', color: 'var(--text-primary)', pointerEvents: 'auto', position: 'relative', zIndex: 100 }} 
          />
          <textarea 
            name="message" placeholder="Your Message" required rows={3}
            className="glass-panel p-3 w-100 border-0" 
            style={{ borderRadius: '12px', background: 'var(--bg-surface-elevated)', fontSize: '0.9rem', resize: 'none', color: 'var(--text-primary)', pointerEvents: 'auto', position: 'relative', zIndex: 100 }} 
          />
          <button 
            type="submit" disabled={isSending}
            className="primary-aura-btn py-3 d-flex align-items-center justify-content-center gap-2"
            style={{ border: 'none', borderRadius: '12px', cursor: isSending ? 'not-allowed' : 'pointer' }}
          >
            {isSending ? 'Sending...' : 'Send Message'} {React.createElement(BsArrowRight as any)}
          </button>
        </form>
      </div>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
};

export default EnhancedContact;