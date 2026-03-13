import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    style,
    width,
    height,
    priority = false
}) => {
    // For personal projects, we'll just use the provided src 
    // but keep the lazy loading and blur effects for performance.
    const imageSrc = src;
    const srcSet = '';

    if (priority) {
        return (
            <img
                src={imageSrc}
                srcSet={srcSet}
                sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
                alt={alt}
                className={className}
                style={style}
                width={width}
                height={height}
                loading="eager"
                decoding="async"
            />
        );
    }

    return (
        <LazyLoadImage
            src={imageSrc}
            srcSet={srcSet}
            sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
            alt={alt}
            className={className}
            style={style}
            width={width}
            height={height}
            effect="blur"
            loading="lazy"
            decoding="async"
        />
    );
};

export default OptimizedImage;