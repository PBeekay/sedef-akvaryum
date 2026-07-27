import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
      <nav className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 border ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] py-2.5 px-4 sm:px-6'
          : 'bg-white/85 backdrop-blur-xl border-slate-200/60 shadow-lg py-3.5 px-4 sm:px-6'
      }`}>
        <div className="flex items-center justify-between gap-4">

          {/* Logo Section — Unboxed & Elegant */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 filter drop-shadow-sm">
              🦐
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                Sedef<span className="text-emerald-600 font-extrabold">.</span>Akvaryum
              </span>
              <span className="text-[9px] text-emerald-700 font-bold tracking-widest uppercase -mt-0.5">
                Doğal Hobi Evi
              </span>
            </div>
          </Link>

          {/* Center Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Balık, karides veya ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-2xl bg-slate-100/80 border border-slate-200 focus:border-emerald-500 focus:bg-white text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </form>
          </div>

          {/* Desktop Categories & Quick Links — Clean & Refined Typography */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive(`/category/${category.id}`)
                    ? 'text-emerald-700 font-bold bg-emerald-50 border border-emerald-200'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100/70'
                }`}
              >
                {category.name}
              </Link>
            ))}

            {/* Direct WhatsApp Callout Button */}
            <a
              href="https://wa.me/905374492626"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.03]"
            >
              <span>💬</span>
              <span>İletişim</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Menü"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Ürün veya canlı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between"
                >
                  <span>{category.name}</span>
                  <span className="text-emerald-600 text-xs">→</span>
                </Link>
              ))}
            </div>

            <a
              href="https://wa.me/905374492626"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs uppercase"
            >
              <span>💬</span>
              <span>WhatsApp İletişim</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
