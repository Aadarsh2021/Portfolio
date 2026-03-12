import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ImageLazyLoaderProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const ImageLazyLoader: React.FC<ImageLazyLoaderProps> = ({
  src,
  alt,
  className,
  width,
  height
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={className}
      width={width}
      height={height}
      placeholderSrc="/assets/placeholder.png"
      threshold={100}
      wrapperClassName="lazy-load-image-wrapper"
    />
  );
};

export default ImageLazyLoader;