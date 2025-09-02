import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types/Product';
import { debounce } from '../utils/validation';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showResults?: boolean;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Ürün ara...',
  showResults = true,
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Arama sonuçlarını filtrele (stable reference for hooks)
  const searchProducts = useCallback((searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return [];

    const loweredQuery = searchQuery.toLowerCase();
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(loweredQuery) ||
        product.description.toLowerCase().includes(loweredQuery) ||
        product.category.toLowerCase().includes(loweredQuery) ||
        (product.species && product.species.toLowerCase().includes(loweredQuery)) ||
        (product.color && product.color.toLowerCase().includes(loweredQuery)) ||
        (product.colors && product.colors.some((color) => color.toLowerCase().includes(loweredQuery)))
      )
      .slice(0, 8);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    navigate(`/product/${product.id}`);
    setQuery('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    onSearch?.(product.name);
  }, [navigate, onSearch]);

  // Debounced arama fonksiyonu
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setShowDropdown(false);
        setIsLoading(false);
        return;
      }

      const searchResults = searchProducts(searchQuery);
      setResults(searchResults);
      setShowDropdown(searchResults.length > 0);
      setIsLoading(false);
    },
    [searchProducts]
  );

  // Memoized debounced function
  const debouncedSearchMemo = useMemo(
    () => debounce(debouncedSearch, 300),
    [debouncedSearch]
  );

  // Arama işlemi
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debouncedSearchMemo(query);
  }, [query, debouncedSearchMemo]);

  // Klavye navigasyonu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDropdown) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleProductClick(results[selectedIndex]);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown, results, selectedIndex, handleProductClick]);

  // Dışarı tıklama
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      // Arama sayfasına yönlendir veya sonuçları göster
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div 
      ref={searchRef} 
      className={`relative ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!query.trim()) {
          setIsExpanded(false);
          setShowDropdown(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={isExpanded ? placeholder : ''}
            className={`transition-all duration-300 ease-in-out px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              isExpanded ? 'w-full' : 'w-10'
            }`}
            onFocus={() => {
              setIsExpanded(true);
              query.trim() && setShowDropdown(true);
            }}
            onBlur={() => {
              if (!query.trim()) {
                setTimeout(() => {
                  setIsExpanded(false);
                  setShowDropdown(false);
                }, 200);
              }
            }}
          />
          
          {/* Arama ikonu */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Yükleme göstergesi */}
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Arama butonu */}
          {!isLoading && query.trim() && (
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary-600 hover:text-primary-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Arama sonuçları dropdown */}
      {showResults && showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((product, index) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-primary-50' : ''
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg mr-3"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {product.category} • ₺{product.price.toFixed(2)}
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {product.category === 'shrimp' ? '🦐' : 
                 product.category === 'fish' ? '🐠' : 
                 product.category === 'food' ? '🍖' : '🏷️'}
              </div>
            </div>
          ))}
          
          {/* Tüm sonuçları görüntüle linki */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
              className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              "{query}" için tüm sonuçları görüntüle ({results.length}+)
            </button>
          </div>
        </div>
      )}

      {/* Sonuç bulunamadı */}
      {showResults && showDropdown && query.trim() && !isLoading && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p>"{query}" için sonuç bulunamadı</p>
            <p className="text-sm">Farklı anahtar kelimeler deneyin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
