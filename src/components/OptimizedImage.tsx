import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className,
    width,
    height,
    priority = false
}) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [srcSet, setSrcSet] = useState<string>('');

    useEffect(() => {
        // Generate responsive image sources
        const ext = src.split('.').pop()?.toLowerCase();
        if (ext && ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
            const basePath = src.substring(0, src.lastIndexOf('.'));
            const sizes = [320, 640, 1024, 1920];
            const srcSet = sizes
                .map(size => `${basePath}_${size}.webp ${size}w`)
                .join(', ');
            setSrcSet(srcSet);
            
            // Update main image source to WebP if available
            setImageSrc(`${basePath}.webp`);
        }
    }, [src]);

    if (priority) {
        return (
            <img
                src={imageSrc}
                srcSet={srcSet}
                sizes="(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
                alt={alt}
                className={className}
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
            width={width}
            height={height}
            effect="blur"
            loading="lazy"
            decoding="async"
        />
    );
};

export default OptimizedImage;