import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiUsers, FiTrendingUp, FiSettings, FiX, FiDownload, FiTrash2 } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePerformance } from '../hooks/usePerformance';
import { useAccessibility } from '../hooks/useAccessibility';
import { useNotifications } from './NotificationSystem';

interface DashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const PLAUSIBLE_API_KEY = 'sXafqhh5CqZ_-SM8kpNrZOa4Z_8USejgILIHLOz2Qzed0vyPXGR-IFQWOduLuydp';
const PLAUSIBLE_SITE_ID = 'portfolio-khaki-omega-43.vercel.app';

const AdvancedDashboard: React.FC<DashboardProps> = ({ isVisible, onClose }) => {
  const { getSessionData, getEngagementScore } = useAnalytics();
  const { metrics } = usePerformance();
  const { preferences } = useAccessibility();
  const { success, info } = useNotifications();
  
  const [sessionData, setSessionData] = useState(getSessionData());
  const [plausibleStats, setPlausibleStats] = useState<{ visitors: number; pageviews: number } | null>(null);
  const [plausibleLoading, setPlausibleLoading] = useState(false);
  const [plausibleError, setPlausibleError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const fetchPlausibleStats = () => {
      setPlausibleLoading(true);
      fetch(
        `https://plausible.io/api/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=7d&metrics=visitors,pageviews`,
        {
          headers: {
            Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPlausibleStats({
            visitors: data.results.visitors.value,
            pageviews: data.results.pageviews.value,
          });
          setPlausibleLoading(false);
        })
        .catch((err) => {
          setPlausibleError('Failed to fetch real analytics');
          setPlausibleLoading(false);
        });
    };

    if (isVisible) {
      fetchPlausibleStats();
      interval = setInterval(fetchPlausibleStats, 2000); // 2 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);

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
      accessibility: preferences,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-analytics-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    success('Analytics data exported successfully');
  };

  const handleClearData = () => {
    localStorage.clear();
    info('Analytics data cleared');
  };

  const renderIcon = (IconComponent: IconType, size: number, className?: string) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; className?: string }>;
    return <Icon size={size} className={className} />;
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="dashboard-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-4)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={onClose}
      >
        <motion.div 
          className="dashboard-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-2xl)',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            style={{
              padding: 'var(--space-6)',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {renderIcon(FiActivity, 24)}
              <h2 
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Advanced Analytics Dashboard
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-secondary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {renderIcon(FiX, 20)}
            </button>
          </div>

          {/* Vercel Analytics Button and Note */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 0 0.5rem 0'
          }}>
            <a
              href="https://vercel.com/aadarsh2021s-projects/portfolio/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: '2rem',
                boxShadow: '0 4px 16px rgba(99,102,241,0.12)',
                marginBottom: '0.5rem',
                padding: '0.75rem 2.5rem',
                letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                border: 'none',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              View Real Analytics
            </a>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', opacity: 0.85 }}>
              Real-time analytics powered by <a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Vercel</a>.
            </div>
          </div>

          {/* Real Plausible Analytics Stats */}
          <div style={{ textAlign: 'center', margin: '1.5rem 0 2.5rem 0' }}>
            {plausibleLoading ? (
              <span style={{ color: 'var(--text-secondary)' }}>Loading real analytics…</span>
            ) : plausibleError ? (
              <span style={{ color: 'red' }}>{plausibleError}</span>
            ) : plausibleStats ? (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
                <div>
                  <span role="img" aria-label="visitors">👥</span> Visitors (7d): <span style={{ color: 'var(--primary)' }}>{plausibleStats.visitors}</span>
                </div>
                <div>
                  <span role="img" aria-label="pageviews">👁️</span> Page Views (7d): <span style={{ color: 'var(--primary)' }}>{plausibleStats.pageviews}</span>
                </div>
              </div>
            ) : null}
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
              {/* Overview Cards REMOVED: Session Duration, Engagement Score, Page Views */}
              {/* You can keep Performance Metrics and Accessibility if you want */}
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
                              <ProgressBar 
                                now={typeof value === 'number' ? Math.min(100, (value / 3000) * 100) : 0}
                                style={{ height: '6px' }}
                                variant="primary"
                              />
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Accessibility Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
                      {renderIcon(FiSettings, 20)}
                      Accessibility Preferences
                    </h4>
                    <Row>
                      <Col md={6}>
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              Reduced Motion
                            </span>
                            <Badge 
                              bg={preferences.reducedMotion ? 'success' : 'secondary'}
                              style={{ fontSize: 'var(--font-size-xs)' }}
                            >
                              {preferences.reducedMotion ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              High Contrast
                            </span>
                            <Badge 
                              bg={preferences.highContrast ? 'success' : 'secondary'}
                              style={{ fontSize: 'var(--font-size-xs)' }}
                            >
                              {preferences.highContrast ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              Font Size
                            </span>
                            <Badge 
                              bg="primary"
                              style={{ fontSize: 'var(--font-size-xs)', textTransform: 'capitalize' }}
                            >
                              {preferences.fontSize}
                            </Badge>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              Screen Reader
                            </span>
                            <Badge 
                              bg={preferences.screenReader ? 'success' : 'secondary'}
                              style={{ fontSize: 'var(--font-size-xs)' }}
                            >
                              {preferences.screenReader ? 'Detected' : 'Not Detected'}
                            </Badge>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                              Keyboard Navigation
                            </span>
                            <Badge 
                              bg={preferences.keyboardNavigation ? 'success' : 'secondary'}
                              style={{ fontSize: 'var(--font-size-xs)' }}
                            >
                              {preferences.keyboardNavigation ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Session Information */}
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
                      Session Information
                    </h4>
                    <Row className="g-4">
                      <Col md={6}>
                        <div>
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                            Session ID
                          </p>
                          <p 
                            style={{ 
                              fontFamily: 'monospace', 
                              color: 'var(--text-primary)', 
                              wordBreak: 'break-all',
                              fontSize: 'var(--font-size-sm)',
                              margin: 0
                            }}
                          >
                            {sessionData.sessionId}
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                            Start Time
                          </p>
                          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                            {new Date(sessionData.startTime).toLocaleString()}
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                            Viewport
                          </p>
                          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                            {sessionData.viewport.width} × {sessionData.viewport.height}
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                            Events Tracked
                          </p>
                          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                            {sessionData.events.length}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="d-flex flex-wrap gap-3"
              >
                <button
                  className="btn-gradient d-flex align-items-center gap-2"
                  onClick={handleExportData}
                >
                  {renderIcon(FiDownload, 16)}
                  Export Data
                </button>
                <button
                  className="btn btn-outline-danger d-flex align-items-center gap-2"
                  onClick={handleClearData}
                >
                  {renderIcon(FiTrash2, 16)}
                  Clear Data
                </button>
              </motion.div>
            </Container>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvancedDashboard; 