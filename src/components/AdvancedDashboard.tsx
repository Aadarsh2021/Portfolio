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
  const { getSessionData } = useAnalytics();
  const { metrics } = usePerformance();
  const { preferences } = useAccessibility();
  const { success, info } = useNotifications();
  
  const [sessionData, setSessionData] = useState(getSessionData());
  const [plausibleStats, setPlausibleStats] = useState<{
    visitors: number;
    pageviews: number;
    sessionDuration: number;
    bounceRate: number;
    topPages: Array<{ page: string; views: number }>;
    deviceBreakdown: Array<{ device: string; percentage: number }>;
    trafficSources: Array<{ source: string; visitors: number }>;
  } | null>(null);
  const [plausibleLoading, setPlausibleLoading] = useState(false);
  const [plausibleError, setPlausibleError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    const fetchPlausibleStats = async () => {
      try {
        // Only show loading on first fetch
        if (!plausibleStats) {
          setPlausibleLoading(true);
        }
        setPlausibleError(null);
        
        console.log('Fetching Plausible data for site:', PLAUSIBLE_SITE_ID);
        
        // Fetch aggregate stats (visitors, pageviews, session duration, bounce rate)
        const aggregateResponse = await fetch(
          `https://plausible.io/api/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=day&metrics=visitors,pageviews,bounce_rate,visit_duration`,
          {
            headers: {
              Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
            },
          }
        );
        
        console.log('Aggregate response status:', aggregateResponse.status);
        
        if (!aggregateResponse.ok) {
          const errorText = await aggregateResponse.text();
          console.error('API Error Response:', errorText);
          throw new Error(`HTTP error! status: ${aggregateResponse.status} - ${errorText}`);
        }
        
        const aggregateData = await aggregateResponse.json();
        console.log('Aggregate data received:', aggregateData);
        
        // Check if we have valid data structure
        if (!aggregateData.results) {
          throw new Error('Invalid API response format');
        }
        
        // Handle case where there's no data yet (new site)
        if (!aggregateData.results.visitors || aggregateData.results.visitors.value === 0) {
          // Try 7-day period as fallback
          const fallbackResponse = await fetch(
            `https://plausible.io/api/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=7d&metrics=visitors,pageviews,bounce_rate,visit_duration`,
            {
              headers: {
                Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
              },
            }
          );
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.results && fallbackData.results.visitors && fallbackData.results.visitors.value > 0) {
              // Use 7-day data if available
              aggregateData.results = fallbackData.results;
            } else {
              setPlausibleStats({
                visitors: 0,
                pageviews: 0,
                sessionDuration: 0,
                bounceRate: 0,
                topPages: [],
                deviceBreakdown: [],
                trafficSources: []
              });
              setPlausibleLoading(false);
              return;
            }
          } else {
            setPlausibleStats({
              visitors: 0,
              pageviews: 0,
              sessionDuration: 0,
              bounceRate: 0,
              topPages: [],
              deviceBreakdown: [],
              trafficSources: []
            });
            setPlausibleLoading(false);
            return;
          }
        }
        
        // Fetch top pages (try day first, then 7d)
        const pagesResponse = await fetch(
          `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=day&property=event:page&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
            },
          }
        );
        
        let pagesData = pagesResponse.ok ? await pagesResponse.json() : { results: [] };
        
        // If no day data, try 7d
        if (!pagesData.results || pagesData.results.length === 0) {
          const fallbackPagesResponse = await fetch(
            `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=7d&property=event:page&limit=5`,
            {
              headers: {
                Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
              },
            }
          );
          pagesData = fallbackPagesResponse.ok ? await fallbackPagesResponse.json() : { results: [] };
        }
        
        // Fetch device breakdown (try day first, then 7d)
        const devicesResponse = await fetch(
          `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=day&property=visit:device`,
          {
            headers: {
              Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
            },
          }
        );
        
        let devicesData = devicesResponse.ok ? await devicesResponse.json() : { results: [] };
        
        // If no day data, try 7d
        if (!devicesData.results || devicesData.results.length === 0) {
          const fallbackDevicesResponse = await fetch(
            `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=7d&property=visit:device`,
            {
              headers: {
                Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
              },
            }
          );
          devicesData = fallbackDevicesResponse.ok ? await fallbackDevicesResponse.json() : { results: [] };
        }
        
        // Fetch traffic sources (try day first, then 7d)
        const sourcesResponse = await fetch(
          `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=day&property=visit:source`,
          {
            headers: {
              Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
            },
          }
        );
        
        let sourcesData = sourcesResponse.ok ? await sourcesResponse.json() : { results: [] };
        
        // If no day data, try 7d
        if (!sourcesData.results || sourcesData.results.length === 0) {
          const fallbackSourcesResponse = await fetch(
            `https://plausible.io/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=7d&property=visit:source`,
            {
              headers: {
                Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
              },
            }
          );
          sourcesData = fallbackSourcesResponse.ok ? await fallbackSourcesResponse.json() : { results: [] };
        }
        
        // Calculate total visitors for percentage calculations
        const totalVisitors = aggregateData.results.visitors.value;
        
        setPlausibleStats({
          visitors: aggregateData.results.visitors.value,
          pageviews: aggregateData.results.pageviews.value,
          sessionDuration: Math.round(aggregateData.results.visit_duration.value / 60), // Convert to minutes
          bounceRate: Math.round(aggregateData.results.bounce_rate.value * 100), // Convert to percentage
          topPages: pagesData.results.map((item: any) => ({
            page: item.page,
            views: item.visitors
          })),
          deviceBreakdown: devicesData.results.map((item: any) => ({
            device: item.device,
            percentage: Math.round((item.visitors / totalVisitors) * 100)
          })),
          trafficSources: sourcesData.results.map((item: any) => ({
            source: item.source,
            visitors: item.visitors
          }))
        });
        setPlausibleLoading(false);
      } catch (err) {
        console.error('Error fetching Plausible stats:', err);
        setPlausibleError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
        setPlausibleLoading(false);
      }
    };

    if (isVisible) {
      // Initial fetch
      fetchPlausibleStats();
      
      // Set up real-time updates every 5 seconds (to avoid rate limiting)
      interval = setInterval(fetchPlausibleStats, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, plausibleStats]);

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
    <>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .dashboard-overlay {
              padding: 0 !important;
            }
            .dashboard-container {
              max-width: 100vw !important;
              border-radius: var(--radius-lg) !important;
              padding: 0 !important;
            }
            .dashboard-container h2 {
              font-size: 1.3rem !important;
            }
            .dashboard-container .btn {
              min-width: 36px;
              min-height: 36px;
              font-size: 1rem;
            }
            .dashboard-container .glass-effect {
              padding: 1rem !important;
            }
            .dashboard-container .progress-bar {
              height: 8px !important;
            }
            .dashboard-container .category-title {
              font-size: 1.1rem !important;
            }
          }
        `}
      </style>
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

            {/* Real Vercel Analytics Stats */}
            <div style={{ textAlign: 'center', margin: '1.5rem 0 2.5rem 0' }}>
              {plausibleLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--primary)',
                    borderTop: '2px solid transparent',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Loading analytics data...</span>
                </div>
              ) : plausibleError ? (
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(220, 53, 69, 0.1)', 
                  border: '1px solid rgba(220, 53, 69, 0.3)', 
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--danger)',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span role="img" aria-label="error">⚠️</span>
                    <span style={{ fontWeight: 600 }}>Analytics Error</span>
                  </div>
                  <div>{plausibleError}</div>
                </div>
              ) : (
              <div>
                  {plausibleStats ? (
                    <>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  <div>
                          <span role="img" aria-label="pageviews">📊</span> Page Views: <span style={{ color: 'var(--primary)' }}>{plausibleStats.pageviews.toLocaleString()}</span>
                        </div>
                        <div>
                          <span role="img" aria-label="visitors">👥</span> Visitors: <span style={{ color: 'var(--primary)' }}>{plausibleStats.visitors.toLocaleString()}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <div>
                          <span role="img" aria-label="session">⏱️</span> Avg Session: <span style={{ color: 'var(--info)' }}>{plausibleStats.sessionDuration}m {Math.round((plausibleStats.sessionDuration % 1) * 60)}s</span>
                  </div>
                  <div>
                          <span role="img" aria-label="bounce">📈</span> Bounce Rate: <span style={{ color: 'var(--warning)' }}>{plausibleStats.bounceRate}%</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--success)',
                    animation: 'pulse 2s infinite'
                  }}></div>
                        <span>Real Plausible Analytics Data</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ 
                      padding: '1rem', 
                      background: 'rgba(220, 53, 69, 0.1)', 
                      border: '1px solid rgba(220, 53, 69, 0.3)', 
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--danger)',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span role="img" aria-label="error">⚠️</span>
                        <span style={{ fontWeight: 600 }}>No Analytics Data</span>
                      </div>
                      <div>Analytics data is not available</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Real Analytics Data */}
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              {plausibleError ? (
                <div style={{ 
                  padding: '2rem', 
                  background: 'rgba(220, 53, 69, 0.1)', 
                  border: '1px solid rgba(220, 53, 69, 0.3)', 
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--danger)',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span role="img" aria-label="error">⚠️</span>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Analytics Unavailable</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{plausibleError}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Please check your Plausible configuration or try again later.
                  </div>
                </div>
              ) : !plausibleStats || (plausibleStats.visitors === 0 && plausibleStats.pageviews === 0) ? (
                <div style={{ 
                  padding: '2rem', 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.3)', 
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--info)',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span role="img" aria-label="info">📊</span>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>No Analytics Data Yet</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Your Plausible analytics are set up correctly, but there's no data yet.
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    Analytics will appear here once visitors start coming to your site.
                  </div>
                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
                    Site ID: {PLAUSIBLE_SITE_ID}
                  </div>
                </div>
              ) : (
                <>
              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Card className="glass-effect h-100">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center gap-2">
                        <span role="img" aria-label="traffic">🚦</span>
                        Traffic Sources
                      </h5>
                      <div className="d-flex flex-column gap-2">
                            {plausibleStats?.trafficSources && plausibleStats.trafficSources.length > 0 ? (
                              plausibleStats.trafficSources.map((source, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center">
                                  <span>{source.source}</span>
                                  <Badge bg={index === 0 ? "primary" : "secondary"}>{source.visitors} visitors</Badge>
                        </div>
                              ))
                            ) : (
                              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem' }}>
                                No traffic data available
                        </div>
                            )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="glass-effect h-100">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center gap-2">
                        <span role="img" aria-label="devices">💻</span>
                        Device Breakdown
                      </h5>
                      <div className="d-flex flex-column gap-2">
                            {plausibleStats?.deviceBreakdown && plausibleStats.deviceBreakdown.length > 0 ? (
                              plausibleStats.deviceBreakdown.map((device, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center">
                                  <span>{device.device}</span>
                                  <Badge bg={index === 0 ? "success" : "secondary"}>{device.percentage}%</Badge>
                        </div>
                              ))
                            ) : (
                              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem' }}>
                                No device data available
                        </div>
                            )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Card className="glass-effect h-100">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center gap-2">
                        <span role="img" aria-label="pages">📄</span>
                        Top Pages
                      </h5>
                      <div className="d-flex flex-column gap-2">
                            {plausibleStats?.topPages && plausibleStats.topPages.length > 0 ? (
                              plausibleStats.topPages.map((page, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center">
                                  <span>{page.page}</span>
                                  <Badge bg={index === 0 ? "primary" : "secondary"}>{page.views} views</Badge>
                        </div>
                              ))
                            ) : (
                              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem' }}>
                                No page data available
                        </div>
                            )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="glass-effect h-100">
                    <Card.Body className="p-4">
                      <h5 className="mb-3 d-flex align-items-center gap-2">
                        <span role="img" aria-label="bounce">📊</span>
                        Engagement Metrics
                      </h5>
                      <div className="d-flex flex-column gap-2">
                            {plausibleStats ? (
                              <>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Bounce Rate</span>
                                  <Badge bg="warning">{plausibleStats.bounceRate}%</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Avg. Session</span>
                                  <Badge bg="info">~{plausibleStats.sessionDuration}m {Math.round((plausibleStats.sessionDuration % 1) * 60)}s</Badge>
                                </div>
                              </>
                            ) : (
                              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem' }}>
                                No engagement data available
                        </div>
                            )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
                </>
              )}
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
    </>
  );
};

export default AdvancedDashboard; 