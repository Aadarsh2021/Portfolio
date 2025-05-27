import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsExclamationTriangle, BsArrowClockwise, BsHouse } from 'react-icons/bs';
import { IconType } from 'react-icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // This would typically send to a service like Sentry, LogRocket, etc.
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Example: Send to analytics or error reporting service
    console.log('Error logged:', errorData);
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportError = () => {
    const subject = encodeURIComponent(`Portfolio Error Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Error Message: ${this.state.error?.message}
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}

Additional Details:
${this.state.error?.stack}
    `);
    
    window.open(`mailto:thakuraadarsh1@gmail.com?subject=${subject}&body=${body}`);
  };

  private renderIcon = (IconComponent: IconType, size: number) => {
    const Icon = IconComponent as React.ComponentType<{ size: number; style?: React.CSSProperties }>;
    return <Icon size={size} style={{ color: 'var(--secondary)' }} />;
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="error-boundary-container" style={{ 
          minHeight: '100vh', 
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-8)'
        }}>
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} xl={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="error-icon mb-4">
                    {this.renderIcon(BsExclamationTriangle, 80)}
                  </div>

                  <h1 className="display-4 mb-4" style={{ color: 'var(--text-primary)' }}>
                    Oops! Something went wrong
                  </h1>

                  <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                    We encountered an unexpected error. Don't worry, this has been logged 
                    and we'll look into it.
                  </p>

                  <Alert variant="danger" className="text-start mb-4 glass-effect">
                    <Alert.Heading className="h6">Error Details</Alert.Heading>
                    <p className="mb-2">
                      <strong>Error ID:</strong> {this.state.errorId}
                    </p>
                    <p className="mb-0">
                      <strong>Message:</strong> {this.state.error?.message}
                    </p>
                  </Alert>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={this.handleRetry}
                      className="btn-gradient d-flex align-items-center gap-2"
                    >
                      {this.renderIcon(BsArrowClockwise, 20)}
                      Try Again
                    </Button>

                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={this.handleGoHome}
                      className="btn-outline d-flex align-items-center gap-2"
                    >
                      {this.renderIcon(BsHouse, 20)}
                      Go Home
                    </Button>

                    <Button
                      variant="outline-secondary"
                      size="lg"
                      onClick={this.handleReportError}
                      className="btn-outline d-flex align-items-center gap-2"
                    >
                      Report Issue
                    </Button>
                  </div>

                  {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                    <details className="mt-5 text-start">
                      <summary className="mb-3 cursor-pointer">
                        <strong>Development Details (Click to expand)</strong>
                      </summary>
                      <pre className="bg-dark text-light p-3 rounded overflow-auto" style={{ fontSize: '0.8rem' }}>
                        {this.state.error?.stack}
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;