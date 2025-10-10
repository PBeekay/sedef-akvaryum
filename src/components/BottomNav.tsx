import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/products';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Ana sayfa için özel kontrol
  const isHome = location.pathname === '/';
  
  // İlk 3 kategori + Ana Sayfa + İletişim
  const mainCategories = categories.slice(0, 3);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {/* Ana Sayfa */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            isHome
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-600 active:bg-gray-100'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs font-medium">Ana Sayfa</span>
          {isHome && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-t-full"></div>
          )}
        </Link>

        {/* İlk 3 Kategori */}
        {mainCategories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${
              isActive(`/category/${category.id}`)
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 active:bg-gray-100'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-xs font-medium truncate max-w-[60px]">
              {category.name}
            </span>
            {isActive(`/category/${category.id}`) && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-t-full"></div>
            )}
          </Link>
        ))}

        {/* İletişim */}
        <Link
          to="/contact"
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${
            isActive('/contact')
              ? 'text-primary-600 bg-primary-50'
              : 'text-gray-600 active:bg-gray-100'
          }`}
        >
          <span className="text-xl">📞</span>
          <span className="text-xs font-medium">İletişim</span>
          {isActive('/contact') && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-t-full"></div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;

