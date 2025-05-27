import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: string;
  lazy?: boolean;
  webpSupport?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  placeholder,
  lazy = true,
  webpSupport = true,
  onLoad,
  onError,
  style,
  sizes,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check WebP support
  useEffect(() => {
    if (!webpSupport) return;

    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, [webpSupport]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, isInView]);

  // Generate optimized image sources
  const generateSources = () => {
    const sources = [];
    const baseUrl = src.split('.').slice(0, -1).join('.');
    const extension = src.split('.').pop();

    // WebP source
    if (supportsWebP && webpSupport) {
      sources.push({
        srcSet: `${baseUrl}.webp`,
        type: 'image/webp'
      });
    }

    // Original format fallback
    sources.push({
      srcSet: src,
      type: `image/${extension}`
    });

    return sources;
  };

  // Generate responsive srcSet
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return baseSrc;

    const breakpoints = [0.5, 1, 1.5, 2];
    return breakpoints
      .map(multiplier => {
        const scaledWidth = Math.round(width * multiplier);
        return `${baseSrc}?w=${scaledWidth}&q=${quality} ${scaledWidth}w`;
      })
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const getPlaceholderSrc = () => {
    if (placeholder) return placeholder;
    
    // Generate a low-quality placeholder
    const canvas = document.createElement('canvas');
    canvas.width = width || 400;
    canvas.height = height || 300;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  };

  const imageStyle: React.CSSProperties = {
    ...style,
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
    filter: isLoaded ? 'none' : 'blur(5px)',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    filter: 'blur(10px)',
    transform: 'scale(1.1)',
  };

  const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '3px solid var(--bg-tertiary)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  if (hasError) {
    return (
      <div 
        className={`image-error ${className}`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-secondary)',
          color: 'var(--text-muted)',
          minHeight: height || 200,
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div className="text-center">
          <div className="mb-2">📷</div>
          <small>Image failed to load</small>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`image-optimizer-container ${className}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        ...style 
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={getPlaceholderSrc()}
          alt=""
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      {isInView && (
        <picture>
          {generateSources().map((source, index) => (
            <source
              key={index}
              srcSet={generateSrcSet(source.srcSet)}
              type={source.type}
              sizes={sizes}
            />
          ))}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy && !priority ? 'lazy' : 'eager'}
            decoding="async"
            className="optimized-image"
          />
        </picture>
      )}

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        >
          <div className="loading-spinner" style={spinnerStyle} />
        </div>
      )}
    </motion.div>
  );
};

export default ImageOptimizer; 