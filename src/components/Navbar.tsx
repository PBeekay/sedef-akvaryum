import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Focus input when opening
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('navbar-search-input')?.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`bg-white/70 backdrop-blur-xl shadow-lg shadow-ocean-100/20 sticky top-0 z-50 border-b border-white/50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-14' : 'h-18'
          }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🦐</div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary-700 to-ocean-600 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-ocean-500 transition-all duration-300">
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
                className={`group relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isActive(`/category/${category.id}`)
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

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            {/* Search Button (Desktop) */}
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-all duration-300 ${isSearchOpen
                ? 'text-primary-600 bg-primary-50 ring-2 ring-primary-100'
                : 'text-gray-600 hover:text-primary-600 hover:bg-ocean-50'
                }`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Search Bar Overlay (Desktop) */}
          <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg transform transition-all duration-300 origin-top ${isSearchOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <input
                  id="navbar-search-input"
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-gray-50 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile menu button removed as requested */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-all duration-300 ${isSearchOpen
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-700 hover:text-primary-600 hover:bg-ocean-50'
                }`}
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar Overlay (Mobile) */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg transform transition-all duration-300 origin-top z-40 ${isSearchOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
          }`}>
          <div className="px-4 py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
