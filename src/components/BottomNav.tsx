import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/products';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/search';

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="md:hidden fixed bottom-1 left-4 right-4 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl z-50 safe-area-bottom mb-2">
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Ana Sayfa */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isHome ? 'text-primary-600 scale-110' : 'text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`p-2 rounded-xl transition-all ${isHome ? 'bg-primary-50' : 'bg-transparent'}`}>
              <svg className="w-6 h-6" fill={isHome ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </Link>

          {/* Menü Butonu - Ortada ve Vurgulu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center -mt-6`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isMenuOpen
                ? 'bg-gray-800 text-white rotate-90'
                : 'bg-gradient-to-tr from-primary-500 to-ocean-500 text-white hover:scale-105 hover:shadow-primary-500/30'
              }`}>
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </div>
          </button>

          {/* Arama */}
          <Link
            to="/search"
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isSearch ? 'text-primary-600 scale-110' : 'text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`p-2 rounded-xl transition-all ${isSearch ? 'bg-primary-50' : 'bg-transparent'}`}>
              <svg className="w-6 h-6" fill="none" stroke={isSearch ? "currentColor" : "currentColor"} strokeWidth={isSearch ? 3 : 2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </Link>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
          }`}
      >
        <div className="h-full overflow-y-auto pb-32">
          {/* Menu Header */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-ocean-600 to-primary-600 bg-clip-text text-transparent">
                Menü
              </h2>
              <p className="text-sm text-gray-500">Kategoriler ve daha fazlası</p>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 space-y-6">
            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/"
                className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-50 transition-colors border border-gray-100"
              >
                <span className="text-2xl">🏠</span>
                <span className="font-semibold text-gray-700">Ana Sayfa</span>
              </Link>
              <Link
                to="/search"
                className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-primary-50 transition-colors border border-gray-100"
              >
                <span className="text-2xl">🔍</span>
                <span className="font-semibold text-gray-700">Arama</span>
              </Link>
            </div>

            {/* Categories List */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Ürün Kategorileri</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className={`flex items-center p-4 rounded-2xl transition-all duration-200 border ${isActive(`/category/${category.id}`)
                        ? 'bg-gradient-to-r from-primary-50 to-ocean-50 border-primary-100 shadow-sm'
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                      }`}
                  >
                    <span className="text-3xl mr-4 filter drop-shadow-sm">{category.icon}</span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base ${isActive(`/category/${category.id}`) ? 'text-primary-700' : 'text-gray-800'}`}>
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">Kategori ürünlerini incele</p>
                    </div>
                    <svg className={`w-5 h-5 ${isActive(`/category/${category.id}`) ? 'text-primary-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-xl font-bold mb-2">Bize Ulaşın</h3>
              <p className="text-gray-300 text-sm mb-4">Sorularınız mı var? WhatsApp üzerinden hemen iletişime geçin.</p>
              <a
                href="https://wa.me/905315073006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp'tan Yaz
              </a>
            </div>

            <div className="h-10"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
