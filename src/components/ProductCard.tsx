import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, showDetails = false }) => {
  const getStockStatus = () => {
    if (!product.inStock) return { text: 'Stokta Yok', color: 'bg-red-500' };
    return { text: 'Stokta', color: 'bg-green-500' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="group relative h-full">
      {/* Glowing border effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      
      <div className="relative card overflow-hidden h-full transform group-hover:-translate-y-2 transition-all duration-300">
        <Link to={`/product/${product.id}`} className="block h-full">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Stock Status Badge */}
            <div className="absolute top-3 right-3 z-20 transform group-hover:scale-110 transition-transform duration-300">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-lg backdrop-blur-sm ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>

            {/* Price Badge - Enhanced */}
            <div className="absolute bottom-3 left-3 z-20 transform group-hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl blur-sm"></div>
                <span className="relative block bg-gradient-to-r from-accent-500 to-accent-600 text-white text-base font-extrabold px-4 py-2.5 rounded-xl shadow-2xl">
                  ₺{product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* New/Featured Badges */}
            {(product.featured || product.new) && (
              <div className="absolute top-3 left-3 z-20 flex gap-2">
                {product.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                    ⭐ Öne Çıkan
                  </span>
                )}
                {product.new && (
                  <span className="bg-gradient-to-r from-green-400 to-green-500 text-green-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    🆕 Yeni
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="p-5 flex flex-col h-full bg-gradient-to-b from-white to-gray-50 group-hover:from-ocean-50 group-hover:to-primary-50 transition-colors duration-300">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                {product.name}
              </h3>
              {showDetails && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 group-hover:text-gray-700">
                  {product.shortDescription}
                </p>
              )}
            </div>
            
            {/* View Details Button - appears on hover */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="btn-primary text-center text-sm py-2">
                Detayları Gör →
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
