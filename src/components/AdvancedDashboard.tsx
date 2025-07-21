import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePerformance } from '../hooks/usePerformance';
import { useAccessibility } from '../hooks/useAccessibility';

interface AdvancedDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({ isVisible, onClose }) => {
  const { getSessionData } = useAnalytics();
  const { metrics } = usePerformance();
  const { announce } = useAccessibility();
  
  const [sessionData, setSessionData] = useState(getSessionData());

  useEffect(() => {
    if (isVisible) {
      // Announce when dashboard is opened
      announce('Analytics dashboard opened');
      
      // Update session data
      const updatedData = getSessionData();
      setSessionData(updatedData);
    }
  }, [isVisible, announce, getSessionData]);

  // Prepare dashboard data
  const dashboardData = {
    session: sessionData,
    performance: metrics,
    accessibility: {}, // Removed preferences as it's no longer available
    timestamp: new Date().toISOString()
  };

  return (
    <Modal
      show={isVisible}
      onHide={onClose}
      size="xl"
      centered
      className="analytics-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Analytics Dashboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="analytics-dashboard p-4">
          {/* Dashboard Content */}
          <Row className="g-4">
            {/* Session Metrics */}
            <Col lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Session Data</h5>
                  <pre className="mt-3">
                    {JSON.stringify(dashboardData.session, null, 2)}
                  </pre>
                </Card.Body>
              </Card>
            </Col>

            {/* Performance Metrics */}
            <Col lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Performance Metrics</h5>
                  <pre className="mt-3">
                    {JSON.stringify(dashboardData.performance, null, 2)}
                  </pre>
                </Card.Body>
              </Card>
            </Col>

            {/* Accessibility Info */}
            <Col lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5>Accessibility Info</h5>
                  <pre className="mt-3">
                    {JSON.stringify(dashboardData.accessibility, null, 2)}
                  </pre>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AdvancedDashboard; 