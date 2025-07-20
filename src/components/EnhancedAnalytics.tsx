import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  BsEye, 
  BsClockHistory, 
  BsDisplay, 
  BsSpeedometer2,
  BsGeoAlt,
  BsBarChart,
  BsArrowUp
} from 'react-icons/bs';
import { IconType } from 'react-icons';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; percentage: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number; color: string }>;
  performanceMetrics: {
    loadTime: number;
    fcp: number;
    lcp: number;
    cls: number;
  };
  realtimeData: {
    activeUsers: number;
    currentPage: string;
    referrers: Array<{ source: string; count: number }>;
  };
}

interface PageViews {
  [key: string]: number;
}

const EnhancedAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderIcon = (IconComponent: IconType, props?: any) => {
    const Icon = IconComponent as React.ComponentType<any>;
    return <Icon {...props} />;
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getLoadTimeColor = (time: number): string => {
    if (time <= 2) return 'success';
    if (time <= 5) return 'warning';
    return 'danger';
  };

  useEffect(() => {
    const fetchLocalAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get performance metrics
        const performanceMetrics = {
          loadTime: Math.min(performance.now() / 1000, 10), // Cap at 10 seconds
          fcp: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          lcp: 0,
          cls: 0
        };

        // Get device type
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent);
        const isDesktop = !isMobile && !isTablet;

        // Get session data from localStorage with proper type assertion
        const sessionData = JSON.parse(localStorage.getItem('portfolio_analytics') || '{"pageViews":{}}');
        const currentTime = new Date().getTime();
        const sessionStart = sessionData.startTime || currentTime;
        
        // Calculate total page views with proper typing
        const pageViews: PageViews = sessionData.pageViews || {};
        const totalPageViews: number = Object.values(pageViews).reduce((sum, count) => sum + (count || 0), 0);

        // Calculate session duration
        const sessionDuration = Math.floor((currentTime - sessionStart) / 1000);

        const mockAnalyticsData: AnalyticsData = {
          pageViews: Math.max(totalPageViews, 1),
          uniqueVisitors: 1,
          avgSessionDuration: formatDuration(sessionDuration),
          bounceRate: totalPageViews <= 1 ? 100 : 0,
          topPages: Object.entries(pageViews).map(([page, views]) => ({
            page,
            views: views || 0,
            percentage: totalPageViews > 0 ? Math.round((views || 0) / totalPageViews * 100) : 0
          })),
          deviceBreakdown: [
            { device: 'Desktop', percentage: isDesktop ? 100 : 0, color: '#6366f1' },
            { device: 'Mobile', percentage: isMobile ? 100 : 0, color: '#8b5cf6' },
            { device: 'Tablet', percentage: isTablet ? 100 : 0, color: '#06b6d4' }
          ].filter(device => device.percentage > 0),
          performanceMetrics,
          realtimeData: {
            activeUsers: 1,
            currentPage: window.location.pathname,
            referrers: [
              { source: document.referrer || 'Direct', count: 1 }
            ]
          }
        };

        setAnalyticsData(mockAnalyticsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Unable to load analytics data');
        setLoading(false);
      }
    };

    fetchLocalAnalytics();

    // Update analytics every minute
    const interval = setInterval(fetchLocalAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">⚠️ Analytics Unavailable</h4>
          <p>{error}</p>
          <p>Using local session data instead.</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center p-5">
        <div className="alert alert-info" role="alert">
          No analytics data available
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="analytics-dashboard p-4">
      <div className="mb-4">
        <h2 className="text-primary mb-2">Analytics Dashboard</h2>
        <p className="text-muted">Real-time session analytics and performance metrics</p>
      </div>

      <Row className="g-4">
        {/* Page Views Card */}
        <Col xs={12} md={6} xl={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {renderIcon(BsEye, { className: "text-primary", size: 24 })}
                  <h6 className="mb-0 ms-2">Page Views</h6>
                </div>
                <div className="d-flex align-items-baseline">
                  <h3 className="mb-0">{analyticsData.pageViews.toLocaleString()}</h3>
                  <Badge bg="success" className="ms-2 d-flex align-items-center">
                    {renderIcon(BsArrowUp, { size: 12, className: "me-1" })}
                    New
                  </Badge>
                </div>
                <small className="text-muted">Total views this session</small>
                <ProgressBar 
                  now={100} 
                  variant="primary" 
                  className="mt-3" 
                  style={{ height: '4px' }} 
                />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Session Duration Card */}
        <Col xs={12} md={6} xl={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {renderIcon(BsClockHistory, { className: "text-success", size: 24 })}
                  <h6 className="mb-0 ms-2">Session Duration</h6>
                </div>
                <div className="d-flex align-items-baseline">
                  <h3 className="mb-0">{analyticsData.avgSessionDuration}</h3>
                  <Badge bg="info" className="ms-2">Active</Badge>
                </div>
                <small className="text-muted">Time on site</small>
                <ProgressBar 
                  now={100} 
                  variant="success" 
                  animated
                  className="mt-3" 
                  style={{ height: '4px' }} 
                />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Load Time Card */}
        <Col xs={12} md={6} xl={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {renderIcon(BsSpeedometer2, { className: "text-info", size: 24 })}
                  <h6 className="mb-0 ms-2">Load Time</h6>
                </div>
                <div className="d-flex align-items-baseline">
                  <h3 className="mb-0">{analyticsData.performanceMetrics.loadTime.toFixed(1)}s</h3>
                  <Badge 
                    bg={getLoadTimeColor(analyticsData.performanceMetrics.loadTime)} 
                    className="ms-2"
                  >
                    {analyticsData.performanceMetrics.loadTime <= 2 ? 'Fast' : 
                     analyticsData.performanceMetrics.loadTime <= 5 ? 'Average' : 'Slow'}
                  </Badge>
                </div>
                <small className="text-muted">Initial page load</small>
                <ProgressBar 
                  now={Math.min((analyticsData.performanceMetrics.loadTime / 10) * 100, 100)} 
                  variant={getLoadTimeColor(analyticsData.performanceMetrics.loadTime)}
                  className="mt-3" 
                  style={{ height: '4px' }} 
                />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Device Card */}
        <Col xs={12} md={6} xl={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {renderIcon(BsDisplay, { className: "text-warning", size: 24 })}
                  <h6 className="mb-0 ms-2">Device</h6>
                </div>
                <div className="d-flex align-items-baseline">
                  <h3 className="mb-0">
                    {analyticsData.deviceBreakdown[0]?.device || 'Unknown'}
                  </h3>
                  <Badge bg="warning" className="ms-2">
                    {window.innerWidth}×{window.innerHeight}
                  </Badge>
                </div>
                <small className="text-muted">Current device type</small>
                <ProgressBar 
                  now={100} 
                  variant="warning" 
                  className="mt-3" 
                  style={{ height: '4px' }} 
                />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Additional Metrics Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Session Overview</h5>
              <Row>
                <Col md={4}>
                  <div className="d-flex align-items-center mb-3">
                    {renderIcon(BsBarChart, { className: "text-primary me-2", size: 20 })}
                    <div>
                      <div className="text-muted small">Bounce Rate</div>
                      <div className="fw-bold">{analyticsData.bounceRate}%</div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center mb-3">
                    {renderIcon(BsGeoAlt, { className: "text-success me-2", size: 20 })}
                    <div>
                      <div className="text-muted small">Source</div>
                      <div className="fw-bold">{analyticsData.realtimeData.referrers[0].source}</div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center mb-3">
                    {renderIcon(BsEye, { className: "text-info me-2", size: 20 })}
                    <div>
                      <div className="text-muted small">Current Page</div>
                      <div className="fw-bold">{analyticsData.realtimeData.currentPage}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnhancedAnalytics; 