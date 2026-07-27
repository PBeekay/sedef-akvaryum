import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}


const categoryLabelMap: Record<string, string> = {
  fish:        'Balık',
  shrimp:      'Karides',
  plants:      'Bitki',
  equipment:   'Ekipman',
  accessories: 'Sağlık & Bakım',
  food:        'Yem',
};const ProductCard: React.FC<ProductCardProps> = memo(({ product, showDetails = false }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white border border-slate-200/90 rounded-2xl overflow-hidden relative transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg p-3"
    >
      {/* Image Section - Precise Modern Edge */}
      <div className="relative overflow-hidden bg-slate-50 rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
          loading="lazy"
        />

        {/* Natural Ambient Overlay */}
        <div className="absolute inset-0 bg-emerald-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges - Top Corners */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="liquid-pill text-[9px] uppercase tracking-wider font-extrabold text-amber-800 px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-100/50">
              <span>🍃</span> Öne Çıkan
            </span>
          )}
          {product.new && (
            <span className="liquid-pill text-[9px] uppercase tracking-wider font-extrabold text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100/50">
              <span>🌿</span> Yeni
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-slate-800/80 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
              Tükendi
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex flex-col flex-grow">
        {/* Category Tag */}
        <div className="mb-2">
          <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50/60 text-emerald-800 border border-emerald-100/30`}>
            {categoryLabelMap[product.category] || product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-[#2c3e44] mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Short Description */}
        {showDetails && product.shortDescription && (
          <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Price and Stock status row */}
        <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Fiyat</span>
            <span className="text-base font-black text-slate-800 tracking-tight">
              ₺{product.price.toFixed(2)}
            </span>
          </div>

          {product.inStock ? (
            <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50/60 border border-emerald-100/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              Stokta
            </span>
          ) : (
            <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
              Tükendi
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
