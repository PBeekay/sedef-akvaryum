import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';


interface VirtualProductListProps {
  products: Product[];
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
  className?: string;
}

const VirtualProductList: React.FC<VirtualProductListProps> = ({
  products,
  itemHeight = 400, // Height of each product card
  containerHeight = 800,
  overscan = 5, // Number of items to render outside viewport
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeightState, setContainerHeight] = useState(containerHeight);
  


  // Calculate virtual scrolling parameters
  const totalHeight = products.length * itemHeight;
  const visibleItemCount = Math.ceil(containerHeightState / itemHeight);
  
  // Calculate start and end indices with overscan
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    products.length - 1,
    Math.floor(scrollTop / itemHeight) + visibleItemCount + overscan
  );

  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(startIndex, endIndex + 1);
  }, [products, startIndex, endIndex]);

  // Calculate offset for positioning
  const offsetY = startIndex * itemHeight;

  // Handle scroll events
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Resize observer for dynamic container height
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Memoized scroll handler
  const memoizedScrollHandler = useMemo(() => handleScroll, [handleScroll]);

  // Performance optimization: Only re-render when necessary
  const shouldUpdate = useMemo(() => {
    return visibleProducts.length > 0;
  }, [visibleProducts.length]);

  if (!shouldUpdate) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height: containerHeightState }}>
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>


      {/* Virtual scrolling container */}
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeightState }}
        onScroll={memoizedScrollHandler}
      >
        {/* Spacer for total height */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Visible products container */}
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: 0,
              right: 0
            }}
          >
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${startIndex + index}`}
                style={{ height: itemHeight }}
                className="mb-4"
              >
                <ProductCard 
                  product={product} 
                  showDetails={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll position indicator */}
      <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
        {Math.round((scrollTop / (totalHeight - containerHeightState)) * 100)}%
      </div>
    </div>
  );
};

export default VirtualProductList;
