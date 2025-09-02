import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
         <nav className="bg-gradient-to-r from-white to-ocean-50 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl">🦐</div>
                         <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Sedef Akvaryum & Hediye Evi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  isActive(`/category/${category.id}`) ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
            

            
                    <Link
          to="/contact"
          className={`text-sm font-medium transition-colors duration-200 ${
            isActive('/contact') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
          }`}
        >
          İletişim
        </Link>
        

          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
               {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2 ${
                    isActive(`/category/${category.id}`) ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
              

                
                                      <Link
          to="/contact"
          className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
            isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          İletişim
        </Link>
        

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
