import React, { useState, useEffect } from 'react';
import { BsClock, BsGeoAlt, BsDot } from 'react-icons/bs';

const LiveStatusTile: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="live-status-content p-4 h-100 d-flex flex-column justify-content-center">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="status-indicator">
          {React.createElement(BsDot as any, { className: "text-success pulse-dot", size: 32 })}
        </div>
        <span className="mono-label text-success" style={{ letterSpacing: '0.1em' }}>AVAILABLE FOR HIRE</span>
      </div>

      <div className="time-display mb-4">
        <div className="d-flex align-items-center gap-2 text-secondary mb-1" style={{ fontSize: '0.7rem' }}>
          {React.createElement(BsClock as any, { size: 12 })}
          <span className="text-uppercase font-mono">India Standard Time</span>
        </div>
        <h2 className="font-mono mb-0" style={{ fontSize: '1.8rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>
          {formatTime(time)}
        </h2>
      </div>

      <div className="location-display mt-auto pt-3" style={{ borderTop: '1px solid var(--border-luminous)' }}>
        <div className="d-flex align-items-center gap-2">
          {React.createElement(BsGeoAlt as any, { className: "text-primary", size: 16 })}
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Noida / Delhi, India</span>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse-dot {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
          .pulse-dot {
            animation: pulse-dot 2s infinite ease-in-out;
          }
          .font-mono {
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
          }
        `}
      </style>
    </div>
  );
};

export default LiveStatusTile;
