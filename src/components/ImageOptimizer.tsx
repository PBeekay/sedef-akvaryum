import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
  sizes = '100vw',
  priority = false,
  quality = 80
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URL with quality and format
  const getOptimizedImageUrl = useCallback((originalSrc: string) => {
    if (!originalSrc || originalSrc.startsWith('data:')) return originalSrc;
    
    // Check if it's an external image that supports optimization
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}?w=800&q=${quality}&fm=webp`;
    }
    
    if (originalSrc.includes('cdn.myikas.com')) {
      return `${originalSrc}?quality=${quality}`;
    }
    
    return originalSrc;
  }, [quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip observer for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(getOptimizedImageUrl(src));
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    img.src = getOptimizedImageUrl(src);
  }, [src, isInView, onLoad, onError, getOptimizedImageUrl]);

  // Preload priority images
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedImageUrl(src);
      document.head.appendChild(link);
    }
  }, [src, priority, getOptimizedImageUrl]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'animate-pulse bg-gray-200' : ''} ${hasError ? 'opacity-50' : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      onError={() => {
        setHasError(true);
        setIsLoading(false);
        onError?.();
      }}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoading ? 0.6 : 1
      }}
    />
  );
};

export default ImageOptimizer;

