import React from 'react';

/**
 * Skeleton Loader Components
 * Provides better perceived performance than spinners
 */

// Base skeleton with shimmer effect
const SkeletonBase: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
    <div className="shimmer"></div>
  </div>
);

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    {/* Image skeleton */}
    <div className="w-full h-48 bg-gray-200 animate-pulse" />
    
    {/* Content skeleton */}
    <div className="p-3 space-y-3">
      {/* Title */}
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      
      {/* Price and button row */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
      </div>
    </div>
  </div>
);

// Product Grid Skeleton
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// Category Header Skeleton
export const CategoryHeaderSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    </div>
  </div>
);

// Product Detail Skeleton
export const ProductDetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
    {/* Image skeleton */}
    <div className="space-y-4">
      <div className="w-full h-96 bg-gray-200 rounded-2xl" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-20 bg-gray-200 rounded-xl" />
        <div className="h-20 bg-gray-200 rounded-xl" />
        <div className="h-20 bg-gray-200 rounded-xl" />
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
        <div className="h-10 bg-gray-200 rounded w-3/4" />
        <div className="h-8 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl space-y-3">
        <div className="h-6 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
      
      <div className="h-14 bg-gray-200 rounded-xl w-full" />
    </div>
  </div>
);

// Search Results Skeleton
export const SearchResultsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Search bar skeleton */}
    <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-full max-w-2xl mx-auto" />
    
    {/* Results count skeleton */}
    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-64 mx-auto" />
    
    {/* Filters skeleton */}
    <div className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
      <div className="flex gap-4">
        <div className="h-10 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
    </div>
    
    {/* Products grid */}
    <ProductGridSkeleton count={6} />
  </div>
);

// Slider Skeleton
export const SliderSkeleton: React.FC = () => (
  <div className="relative h-96 bg-gray-200 rounded-2xl animate-pulse overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="h-12 bg-gray-300 rounded w-64 mx-auto" />
        <div className="h-6 bg-gray-300 rounded w-48 mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto" />
      </div>
    </div>
  </div>
);

// Text Block Skeleton
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div 
        key={index}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width: `${100 - (index * 10)}%` }}
      />
    ))}
  </div>
);

// Category Card Skeleton
export const CategoryCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-16 h-16 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
  </div>
);

// Category Grid Skeleton
export const CategoryGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
);

export default SkeletonBase;

