import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { 
  BsEye, 
  BsClockHistory, 
  BsCursor, 
  BsDisplay, 
  BsPhone, 
  BsTablet,
  BsGeoAlt,
  BsSpeedometer2,
  BsDownload,
  BsShare
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

const EnhancedAnalytics: React.FC = () => {
  const renderIcon = (IconComponent: IconType, props?: any) => {
    const Icon = IconComponent as React.ComponentType<any>;
    return <Icon {...props} />;
  };

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 15420,
    uniqueVisitors: 8765,
    avgSessionDuration: "3m 24s",
    bounceRate: 32.5,
    topPages: [
      { page: "/", views: 5420, percentage: 85 },
      { page: "/projects", views: 3210, percentage: 65 },
      { page: "/about", views: 2890, percentage: 55 },
      { page: "/contact", views: 1640, percentage: 35 },
      { page: "/blog", views: 1260, percentage: 25 }
    ],
    deviceBreakdown: [
      { device: "Desktop", percentage: 62, color: "#6366f1" },
      { device: "Mobile", percentage: 32, color: "#8b5cf6" },
      { device: "Tablet", percentage: 6, color: "#06b6d4" }
    ],
    performanceMetrics: {
      loadTime: 1.2,
      fcp: 0.8,
      lcp: 1.4,
      cls: 0.05
    },
    realtimeData: {
      activeUsers: 12,
      currentPage: "/projects",
      referrers: [
        { source: "Google", count: 45 },
        { source: "LinkedIn", count: 23 },
        { source: "GitHub", count: 18 },
        { source: "Direct", count: 34 }
      ]
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        realtimeData: {
          ...prev.realtimeData,
          activeUsers: Math.floor(Math.random() * 20) + 5
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (metric: string, value: number) => {
    switch (metric) {
      case 'loadTime':
      case 'fcp':
      case 'lcp':
        return value < 1.5 ? '#22c55e' : value < 2.5 ? '#f59e0b' : '#ef4444';
      case 'cls':
        return value < 0.1 ? '#22c55e' : value < 0.25 ? '#f59e0b' : '#ef4444';
      default:
        return '#6366f1';
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container fluid className="analytics-dashboard p-4" style={{ color: 'var(--text-primary)' }}>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-gradient mb-0" style={{ color: 'var(--text-primary)' }}>Portfolio Analytics</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={exportData}>
                {renderIcon(BsDownload, { className: "me-2" })}
                Export Data
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                {renderIcon(BsShare, { className: "me-2" })}
                Share Report
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="metric-card glass-effect text-center">
              <Card.Body>
                {renderIcon(BsEye, { size: 32, className: "text-primary mb-2" })}
                <h3 className="display-6 mb-1">{analyticsData.pageViews.toLocaleString()}</h3>
                <p className="text-muted mb-0">Page Views</p>
                <Badge bg="success" className="mt-2">+12.5%</Badge>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="metric-card glass-effect text-center">
              <Card.Body>
                {renderIcon(BsCursor, { size: 32, className: "text-secondary mb-2" })}
                <h3 className="display-6 mb-1">{analyticsData.uniqueVisitors.toLocaleString()}</h3>
                <p className="text-muted mb-0">Unique Visitors</p>
                <Badge bg="success" className="mt-2">+8.3%</Badge>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="metric-card glass-effect text-center">
              <Card.Body>
                {renderIcon(BsClockHistory, { size: 32, className: "text-accent mb-2" })}
                <h3 className="display-6 mb-1">{analyticsData.avgSessionDuration}</h3>
                <p className="text-muted mb-0">Avg. Session</p>
                <Badge bg="warning" className="mt-2">+5.7%</Badge>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="metric-card glass-effect text-center">
              <Card.Body>
                {renderIcon(BsSpeedometer2, { size: 32, className: "text-info mb-2" })}
                <h3 className="display-6 mb-1">{analyticsData.bounceRate}%</h3>
                <p className="text-muted mb-0">Bounce Rate</p>
                <Badge bg="success" className="mt-2">-3.2%</Badge>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row>
        {/* Top Pages */}
        <Col lg={6} className="mb-4">
          <Card className="glass-effect h-100">
            <Card.Header>
              <h5 className="mb-0">Top Pages</h5>
            </Card.Header>
            <Card.Body>
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium">{page.page}</span>
                    <small className="text-muted">{page.views} views</small>
                  </div>
                  <ProgressBar 
                    now={page.percentage} 
                    variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'info'}
                    style={{ height: '8px' }}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Device Breakdown */}
        <Col lg={6} className="mb-4">
          <Card className="glass-effect h-100">
            <Card.Header>
              <h5 className="mb-0">Device Breakdown</h5>
            </Card.Header>
            <Card.Body>
              {analyticsData.deviceBreakdown.map((device, index) => (
                <div key={device.device} className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    {device.device === 'Desktop' && renderIcon(BsDisplay, { size: 24 })}
                    {device.device === 'Mobile' && renderIcon(BsPhone, { size: 24 })}
                    {device.device === 'Tablet' && renderIcon(BsTablet, { size: 24 })}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span>{device.device}</span>
                      <strong>{device.percentage}%</strong>
                    </div>
                    <ProgressBar 
                      now={device.percentage} 
                      style={{ backgroundColor: device.color, height: '6px' }}
                    />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Performance Metrics */}
        <Col lg={6} className="mb-4">
          <Card className="glass-effect h-100">
            <Card.Header>
              <h5 className="mb-0">Performance Metrics</h5>
            </Card.Header>
            <Card.Body>
              <div className="row g-3">
                <div className="col-6">
                  <div className="text-center">
                    <h4 style={{ color: getPerformanceColor('loadTime', analyticsData.performanceMetrics.loadTime) }}>
                      {analyticsData.performanceMetrics.loadTime}s
                    </h4>
                    <small className="text-muted">Load Time</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h4 style={{ color: getPerformanceColor('fcp', analyticsData.performanceMetrics.fcp) }}>
                      {analyticsData.performanceMetrics.fcp}s
                    </h4>
                    <small className="text-muted">FCP</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h4 style={{ color: getPerformanceColor('lcp', analyticsData.performanceMetrics.lcp) }}>
                      {analyticsData.performanceMetrics.lcp}s
                    </h4>
                    <small className="text-muted">LCP</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h4 style={{ color: getPerformanceColor('cls', analyticsData.performanceMetrics.cls) }}>
                      {analyticsData.performanceMetrics.cls}
                    </h4>
                    <small className="text-muted">CLS</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Real-time Data */}
        <Col lg={6} className="mb-4">
          <Card className="glass-effect h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Real-time Activity</h5>
              <Badge bg="success" className="pulse">
                {analyticsData.realtimeData.activeUsers} active
              </Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="text-muted">Current Popular Page</h6>
                <p className="fw-bold">{analyticsData.realtimeData.currentPage}</p>
              </div>
              
              <div>
                <h6 className="text-muted mb-3">Traffic Sources</h6>
                {analyticsData.realtimeData.referrers.map((ref, index) => (
                  <div key={ref.source} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      {renderIcon(BsGeoAlt, { className: "me-2 text-muted" })}
                      <span>{ref.source}</span>
                    </div>
                    <Badge bg="outline-primary">{ref.count}</Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnhancedAnalytics; 