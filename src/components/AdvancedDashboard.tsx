import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FiTrendingUp, FiUsers, FiSettings, FiDownload, FiTrash2, FiX } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePerformance } from '../hooks/usePerformance';
import { useAccessibility } from '../hooks/useAccessibility';


interface AdvancedDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const getAccessibilityInfo = () => {
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    screenReader: !!(
      document.querySelector('[aria-live]') ||
      document.querySelector('[role="alert"]') ||
      document.querySelector('[aria-atomic]')
    )
  };
};

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({ isVisible, onClose }) => {
  const { getSessionData } = useAnalytics();
  const { metrics } = usePerformance();
  const { announce } = useAccessibility();
  
  const [sessionData, setSessionData] = useState(getSessionData());
  const [activeTab, setActiveTab] = useState('overview');
  const [accessibilityInfo] = useState(getAccessibilityInfo());

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSessionData(getSessionData());
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isVisible, getSessionData]);

  const handleExportData = () => {
    const data = {
      session: sessionData,
      performance: metrics,
      accessibility: {}, // Removed preferences as it's no longer available
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Analytics data exported successfully!');
  };

  const handleClearData = () => {
    localStorage.clear();
    console.log('All data cleared successfully!');
  };

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="dashboard-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={onClose}
        >
          <motion.div
            key="dashboard-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-2xl)',
              width: '100%',
              maxWidth: '1200px',
              height: '90vh',
              maxHeight: '800px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              style={{
                padding: 'var(--space-6)',
                borderBottom: '1px solid var(--border-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 
                  style={{
                    margin: 0,
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  Advanced Dashboard
                </h3>
                <p 
                  style={{
                    margin: 'var(--space-2) 0 0 0',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Real-time analytics and performance monitoring
                </p>
              </div>
              
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-outline-primary btn-sm d-flex align-items-center"
                  onClick={handleExportData}
                >
                  {renderIcon(FiDownload, 16)}
                  <span style={{ marginLeft: '0.5rem' }}>Export</span>
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm d-flex align-items-center"
                  onClick={handleClearData}
                >
                  {renderIcon(FiTrash2, 16)}
                  <span style={{ marginLeft: '0.5rem' }}>Clear</span>
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                  onClick={onClose}
                >
                  {renderIcon(FiX, 16)}
                  <span style={{ marginLeft: '0.5rem' }}>Close</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div 
              style={{
                padding: 'var(--space-6)',
                overflowY: 'auto',
                flex: 1
              }}
            >
              <Container fluid>
                {/* Performance Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-5"
                >
                  <Card className="glass-effect">
                    <Card.Body className="p-4">
                      <h4 
                        className="mb-4 d-flex align-items-center gap-2"
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {renderIcon(FiTrendingUp, 20)}
                        Performance Metrics
                      </h4>
                      <Row className="g-3">
                        {Object.entries(metrics).map(([key, value]) => (
                          <Col lg={4} md={6} key={key}>
                            <Card className="h-100" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
                              <Card.Body className="p-3">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <span 
                                    style={{
                                      fontSize: 'var(--font-size-sm)',
                                      fontWeight: 500,
                                      color: 'var(--text-secondary)',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span 
                                    style={{
                                      fontSize: 'var(--font-size-lg)',
                                      fontWeight: 700,
                                      color: 'var(--text-primary)'
                                    }}
                                  >
                                    {typeof value === 'number' ? Math.round(value) : value}
                                    {key.includes('Time') ? 'ms' : ''}
                                  </span>
                                </div>
                                <div 
                                  style={{
                                    height: '4px',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-sm)',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <div 
                                    style={{
                                      height: '100%',
                                      background: 'var(--primary)',
                                      width: `${Math.min(100, (value / 1000) * 100)}%`,
                                      transition: 'width 0.3s ease'
                                    }}
                                  />
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Session Data */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-5"
                >
                  <Card className="glass-effect">
                    <Card.Body className="p-4">
                      <h4 
                        className="mb-4 d-flex align-items-center gap-2"
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {renderIcon(FiUsers, 20)}
                        Session Analytics
                      </h4>
                      <Row className="g-3">
                        <Col md={6}>
                          <Card className="h-100" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
                            <Card.Body className="p-3">
                              <h6 style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>Current Session</h6>
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Duration</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {Math.floor((Date.now() - sessionData.startTime) / 60000)}m {Math.floor(((Date.now() - sessionData.startTime) % 60000) / 1000)}s
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Page Views</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{Object.keys(sessionData.pageViews).length}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Interactions</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sessionData.interactions.length}</span>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card className="h-100" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
                            <Card.Body className="p-3">
                              <h6 style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>Device Info</h6>
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Session ID</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--font-size-xs)' }}>{sessionData.sessionId.slice(0, 8)}...</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Start Time</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{new Date(sessionData.startTime).toLocaleTimeString()}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Viewport</span>
                                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sessionData.viewport.width}×{sessionData.viewport.height}</span>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Accessibility Preferences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Card className="glass-effect">
                    <Card.Body className="p-4">
                      <h4 
                        className="mb-4 d-flex align-items-center gap-2"
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {renderIcon(FiSettings, 20)}
                        Accessibility Settings
                      </h4>
                      <Row className="g-3">
                        {Object.entries(accessibilityInfo).map(([key, value]) => (
                          <Col lg={4} md={6} key={key}>
                            <Card className="h-100" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)' }}>
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <span className="text-capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <Badge bg={value ? 'success' : 'secondary'}>
                                    {value ? 'Enabled' : 'Disabled'}
                                  </Badge>
                                </div>
                                <small className="text-muted d-block">
                                  {value ? 'Currently active' : 'Not currently active'}
                                </small>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedDashboard; 