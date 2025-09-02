import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { GridLoader } from '../components/LoadingSpinner';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'relevance'
  });

  const query = searchParams.get('q') || '';

  const searchProducts = (searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.species && product.species.toLowerCase().includes(query)) ||
      (product.color && product.color.toLowerCase().includes(query)) ||
      (product.colors && product.colors.some(color => color.toLowerCase().includes(query)))
    );
  };

  const getRelevanceScore = (product: Product, query: string): number => {
    let score = 0;
    
    if (product.name.toLowerCase().includes(query)) score += 10;
    if (product.description.toLowerCase().includes(query)) score += 5;
    if (product.category.toLowerCase().includes(query)) score += 3;
    if (product.species && product.species.toLowerCase().includes(query)) score += 7;
    if (product.color && product.color.toLowerCase().includes(query)) score += 4;
    if (product.colors && product.colors.some(color => color.toLowerCase().includes(query))) score += 6;
    
    return score;
  };

  const applyFilters = useCallback((products: Product[]): Product[] => {
    let filtered = [...products];

    // Kategori filtresi
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Fiyat filtresi
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.price;
        
        switch (filters.priceRange) {
          case '0-50':
            return price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100-200':
            return price > 100 && price <= 200;
          case '200+':
            return price > 200;
          default:
            return true;
        }
      });
    }

    // Sıralama
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Relevance - arama terimine göre sıralama
        filtered.sort((a, b) => {
          const queryLower = query.toLowerCase();
          const aScore = getRelevanceScore(a, queryLower);
          const bScore = getRelevanceScore(b, queryLower);
          return bScore - aScore;
        });
    }

    return filtered;
  }, [filters, query]);

  // Arama işlemi
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş arama gecikmesi
    const timeoutId = setTimeout(() => {
      const results = searchProducts(query);
      setSearchResults(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Filtreleme ve sıralama
  useEffect(() => {
    if (!query.trim()) return;

    const filteredResults = applyFilters(searchProducts(query));
    setSearchResults(filteredResults);
  }, [query, filters, applyFilters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // const getCategoryIcon = (category: string): string => {
  //   switch (category) {
  //     case 'shrimp': return '🦐';
  //     case 'fish': return '🐠';
  //     case 'food': return '🍖';
  //     case 'accessories': return '🔧';
  //     default: return '🏷️';
  //   }
  // };

  // const getCategoryName = (category: string): string => {
  //   switch (category) {
  //     case 'shrimp': return 'Karides';
  //     case 'fish': return 'Balık';
  //     case 'food': return 'Yem';
  //     case 'accessories': return 'Aksesuar';
  //     default: return 'Tümü';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Arama başlığı */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Arama Sonuçları
          </h1>
          <SearchBar 
            className="max-w-2xl"
            placeholder={`"${query}" için arama yapın...`}
          />
        </div>

        {/* Sonuç sayısı */}
        {query && (
          <div className="mb-6">
            <p className="text-gray-600">
              "{query}" için <span className="font-semibold">{searchResults.length}</span> sonuç bulundu
            </p>
          </div>
        )}

        {/* Filtreler ve sıralama */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Kategori:</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Tümü</option>
                <option value="shrimp">🦐 Karides</option>
                <option value="fish">🐠 Balık</option>
                <option value="plants">🌿 Bitkiler</option>
                <option value="equipment">🔧 Ekipman</option>
                <option value="accessories">🎣 Aksesuarlar</option>
                <option value="food">🍖 Yem</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Fiyat:</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Tümü</option>
                <option value="0-50">0₺ - 50₺</option>
                <option value="50-100">50₺ - 100₺</option>
                <option value="100-200">100₺ - 200₺</option>
                <option value="200+">200₺+</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sırala:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="relevance">İlgi Sırası</option>
                <option value="name">İsim</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sonuçlar */}
        {isLoading ? (
          <GridLoader count={6} />
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={true} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-gray-500 mb-4">
              "{query}" için aradığınız kriterlere uygun ürün bulunamadı.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Öneriler:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Farklı anahtar kelimeler deneyin</li>
                <li>• Daha genel terimler kullanın</li>
                <li>• Filtreleri temizleyin</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Arama yapın
            </h3>
            <p className="text-gray-500">
              Ürün bulmak için yukarıdaki arama çubuğunu kullanın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
