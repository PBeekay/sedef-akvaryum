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
    <div className="card group overflow-hidden h-full ">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Stock Status Badge */}
          <div className="absolute top-2 right-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${stockStatus.color}`}>
              {stockStatus.text}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
              ₺{product.price.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>
            {showDetails && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.shortDescription}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
