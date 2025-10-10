import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
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

  return (
    <nav className={`bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-ocean-100/50 transition-all duration-300 ${
      isScrolled ? 'py-1' : 'py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-18'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🦐</div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:from-ocean-500 group-hover:via-primary-500 group-hover:to-secondary-500 transition-all duration-300">
                Sedef Akvaryum
              </span>
              <span className="text-xs text-gray-500 font-medium">Hediye Evi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`group relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive(`/category/${category.id}`) 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-ocean-50'
                }`}
              >
                <span className="text-lg transform group-hover:scale-125 transition-transform duration-300">{category.icon}</span>
                <span>{category.name}</span>
                {isActive(`/category/${category.id}`) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500"></div>
                )}
              </Link>
            ))}
            
            <Link
              to="/contact"
              className={`group relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1 ${
                isActive('/contact') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-ocean-50'
              }`}
            >
              <span className="text-lg">📞</span>
              <span>İletişim</span>
              {isActive('/contact') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500"></div>
              )}
            </Link>
        

          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-ocean-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <div className={`md:hidden fixed inset-0 top-[72px] bg-white z-40 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="h-full overflow-y-auto">
            <div className="px-4 pt-4 pb-20 space-y-2 bg-gradient-to-b from-ocean-50/30 to-white">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center gap-3 ${
                    isActive(`/category/${category.id}`) 
                      ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-ocean-100 shadow-md' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-ocean-100/70 hover:shadow'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                  {isActive(`/category/${category.id}`) && <span className="ml-auto">✓</span>}
                </Link>
              ))}
              
              <Link
                to="/contact"
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center gap-3 ${
                  isActive('/contact') 
                    ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-ocean-100 shadow-md' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-ocean-100/70 hover:shadow'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">📞</span>
                <span>İletişim</span>
                {isActive('/contact') && <span className="ml-auto">✓</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
