import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, showDetails = false }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg active:scale-98 transition-all duration-200 overflow-hidden touch-manipulation"
    >
      {/* Image Section - Compact */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges - Top Corners */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
              ⭐ Öne Çıkan
            </span>
          )}
          {product.new && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              🆕 Yeni
            </span>
          )}
        </div>
        
        {/* Stock Badge - Top Right */}
        {!product.inStock && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              Stokta Yok
            </span>
          </div>
        )}
      </div>

      {/* Content Section - Compact */}
      <div className="p-3">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Short Description - Only if showDetails */}
        {showDetails && product.shortDescription && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        
        {/* Price and Action Row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary-600">
              ₺{product.price.toFixed(2)}
            </span>
            {product.inStock && (
              <span className="text-xs text-green-600 font-medium">
                ✓ Stokta
              </span>
            )}
          </div>
          
          {/* View Button - Compact */}
          <div className="flex items-center text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
            Görüntüle
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
