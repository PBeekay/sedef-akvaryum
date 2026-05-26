import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-16'
        }`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl">🦐</span>
            <div>
              <span className="block text-base font-bold text-gray-900 group-hover:text-teal-700 transition-colors tracking-tight leading-none">
                Sedef Akvaryum
              </span>
              <span className="block text-[10px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">
                Hediye Evi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`relative px-3.5 py-[22px] text-sm font-medium transition-colors duration-200 ${
                  isActive(`/category/${category.id}`)
                    ? 'text-teal-700'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category.name}
                {isActive(`/category/${category.id}`) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
                )}
              </Link>
            ))}

            <div className="w-px h-5 bg-gray-200 mx-3" />

            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-colors ${
                isSearchOpen
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Ara"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Search Overlay (Desktop) */}
          <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm transition-all duration-200 origin-top ${
            isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
              <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="navbar-search-input"
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 bg-gray-50 focus:bg-white text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-colors ${
                isSearchOpen ? 'text-teal-600 bg-teal-50' : 'text-gray-400 hover:text-gray-700'
              }`}
              aria-label="Ara"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Overlay (Mobile) */}
        <div className={`md:hidden border-t border-gray-100 overflow-hidden transition-all duration-200 ${
          isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <form onSubmit={handleSearch} className="relative py-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Ürün ara..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
