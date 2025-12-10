import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface VirtualProductListProps {
  products: Product[];
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
  className?: string;
  columns?: number; // Grid columns support
  showScrollIndicator?: boolean; // Show/hide scroll indicator
  showProductCount?: boolean; // Show product count
}

const VirtualProductList: React.FC<VirtualProductListProps> = ({
  products,
  itemHeight = 400,
  containerHeight = 800,
  overscan = 5,
  className = '',
  columns = 1,
  showScrollIndicator = true,
  showProductCount = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeightState, setContainerHeight] = useState(containerHeight);
  const rafRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Responsive item height based on columns
  const actualItemHeight = useMemo(() => {
    if (columns > 1) {
      // For grid layout, adjust height slightly
      return itemHeight;
    }
    return itemHeight;
  }, [itemHeight, columns]);

  // Calculate virtual scrolling parameters
  const totalHeight = products.length * actualItemHeight;
  const visibleItemCount = Math.ceil(containerHeightState / actualItemHeight);
  
  // Calculate start and end indices with overscan
  const startIndex = Math.max(0, Math.floor(scrollTop / actualItemHeight) - overscan);
  const endIndex = Math.min(
    products.length - 1,
    Math.floor(scrollTop / actualItemHeight) + visibleItemCount + overscan
  );

  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(startIndex, endIndex + 1);
  }, [products, startIndex, endIndex]);

  // Calculate offset for positioning
  const offsetY = startIndex * actualItemHeight;

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setScrollTop(target.scrollTop);
      setIsScrolling(true);
      
      // Hide scroll indicator after scrolling stops
      setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    });
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate scroll percentage
  const scrollPercentage = useMemo(() => {
    if (totalHeight <= containerHeightState) return 100;
    return Math.min(100, Math.round((scrollTop / (totalHeight - containerHeightState)) * 100));
  }, [scrollTop, totalHeight, containerHeightState]);

  // Grid layout classes (must be before conditional returns)
  const gridClasses = useMemo(() => {
    if (columns === 1) return 'grid-cols-1';
    if (columns === 2) return 'grid-cols-1 md:grid-cols-2';
    if (columns === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    if (columns === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    return 'grid-cols-1';
  }, [columns]);

  // Empty state
  if (products.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`} style={{ minHeight: containerHeightState }}>
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h3>
          <p className="text-gray-600">Aradığınız kriterlere uygun ürün bulunmuyor.</p>
        </div>
      </div>
    );
  }

  // Loading state (if products are being loaded)
  if (visibleProducts.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height: containerHeightState }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Product Count Display */}
      {showProductCount && (
        <div className="mb-4 flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-700">
            <span className="font-bold text-primary-600">{products.length}</span> ürün gösteriliyor
          </span>
          {scrollPercentage < 100 && (
            <span className="text-xs text-gray-500">
              {startIndex + 1}-{Math.min(endIndex + 1, products.length)} / {products.length}
            </span>
          )}
        </div>
      )}

      {/* Virtual scrolling container */}
      <div
        ref={containerRef}
        className="overflow-auto scroll-smooth"
        style={{ height: containerHeightState }}
        onScroll={handleScroll}
      >
        {/* Spacer for total height */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Visible products container */}
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: 0,
              right: 0,
              padding: columns > 1 ? '0 0.5rem' : '0'
            }}
            className={columns > 1 ? `grid ${gridClasses} gap-4` : ''}
          >
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${startIndex + index}`}
                style={columns === 1 ? { height: actualItemHeight, marginBottom: '1rem' } : {}}
                className={columns > 1 ? '' : 'mb-4'}
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

      {/* Modern Scroll Position Indicator */}
      {showScrollIndicator && scrollPercentage < 100 && (
        <div 
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            isScrolling ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-gray-200 px-4 py-2 flex items-center gap-3">
            {/* Progress Circle */}
            <div className="relative w-10 h-10">
              <svg className="transform -rotate-90 w-10 h-10">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollPercentage / 100)}`}
                  className="text-primary-600 transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-600">{scrollPercentage}%</span>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-700">
              <div className="font-semibold">Kaydırılıyor</div>
              <div className="text-gray-500">{scrollPercentage}% tamamlandı</div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button (when scrolled down) */}
      {scrollTop > 200 && (
        <button
          onClick={() => {
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 left-6 z-50 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Yukarı çık"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VirtualProductList;
