import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

const categoryAccentMap: Record<string, string> = {
  fish:        'from-orange-400 to-amber-400',
  shrimp:      'from-teal-500 to-cyan-400',
  plants:      'from-green-500 to-emerald-400',
  equipment:   'from-slate-500 to-blue-500',
  accessories: 'from-rose-400 to-pink-400',
  food:        'from-amber-400 to-orange-400',
};

const categoryLabelMap: Record<string, string> = {
  fish:        'Balık',
  shrimp:      'Karides',
  plants:      'Bitki',
  equipment:   'Ekipman',
  accessories: 'Sağlık & Bakım',
  food:        'Yem',
};

const ProductCard: React.FC<ProductCardProps> = memo(({ product, showDetails = false }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-200/60 transition-all duration-300 overflow-hidden relative hover:-translate-y-0.5"
    >
      {/* Category accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${categoryAccentMap[product.category] || 'from-teal-500 to-cyan-500'}`} />

      {/* Image Section - Premium Interaction */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
          loading="lazy"
        />

        {/* Quick View Overlay (Desktop Only for cleanliness) */}
        <div className="hidden md:flex absolute inset-0 bg-navy-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center z-10">
          <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/95 text-teal-700 font-bold px-6 py-2 rounded-full shadow-lg border border-teal-100/50 flex items-center gap-2 backdrop-blur-md text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            İncele
          </span>
        </div>

        {/* Badges - Top Corners */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
              ⭐ Öne Çıkan
            </span>
          )}
          {product.new && (
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
              🆕 Yeni
            </span>
          )}
        </div>

        {/* Stock Badge - Top Right */}
        {!product.inStock && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
              Stokta Yok
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Category Tag */}
        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md mb-2 bg-gradient-to-r ${categoryAccentMap[product.category] || 'from-teal-500 to-cyan-500'} bg-clip-text text-transparent border border-gray-100`}>
          {categoryLabelMap[product.category] || product.category}
        </span>

        {/* Short Description - Only if showDetails */}
        {showDetails && product.shortDescription && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price and Action Row */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100/50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-0.5">Fiyat</span>
            <span className="text-xl font-black text-teal-700 tracking-tight">
              ₺{product.price.toFixed(2)}
            </span>
          </div>
          {product.inStock ? (
            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-700 font-bold">Stokta</span>
            </div>
          ) : (
            <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded border border-red-100">Tükendi</span>
          )}
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
