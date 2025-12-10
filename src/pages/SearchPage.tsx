import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import { useAdmin } from '../context/AdminContext';
import SEO from '../components/SEO';
import VirtualProductList from '../components/VirtualProductList';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all'
  });
  const { products } = useAdmin();

  const query = searchParams.get('q') || '';

  const searchProducts = useCallback((searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      (product.species && product.species.toLowerCase().includes(query)) ||
      (product.color && product.color.toLowerCase().includes(query)) ||
      (product.colors && product.colors.some(color => color.toLowerCase().includes(query)))
    );
  }, [products]);

  // Relevance scoring function - kept for potential future use
  // const getRelevanceScore = (product: Product, query: string): number => {
  //   let score = 0;
  //   
  //   if (product.name.toLowerCase().includes(query)) score += 10;
  //   if (product.description.toLowerCase().includes(query)) score += 5;
  //   if (product.category.toLowerCase().includes(query)) score += 3;
  //   if (product.species && product.species.toLowerCase().includes(query)) score += 7;
  //   if (product.color && product.color.toLowerCase().includes(query)) score += 4;
  //   if (product.colors && product.colors.some(color => color.toLowerCase().includes(query))) score += 6;
  //   
  //   return score;
  // };

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

    // Sıralama kaldırıldı

    return filtered;
  }, [filters]);

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
  }, [query, searchProducts]);

  // Filtreleme ve sıralama
  useEffect(() => {
    if (!query.trim()) return;

    const filteredResults = applyFilters(searchProducts(query));
    setSearchResults(filteredResults);
  }, [query, filters, applyFilters, searchProducts]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title={query ? `"${query}" Arama Sonuçları - Sedef Akvaryum` : 'Akvaryum Ürünleri Ara - Sedef Akvaryum Eskişehir'}
        description={query ? `"${query}" için akvaryum ürünleri arama sonuçları. Süs balığı, karides, akvaryum bitkileri ve tüm akvaryum malzemelerinde arama yapın.` : 'Sedef Akvaryum\'da akvaryum ürünleri arayın. Süs balığı, karides, bitki, yem ve tüm akvaryum malzemelerini bulun.'}
        keywords={`akvaryum arama, ${query ? query + ', ' : ''}akvaryum ürünleri, süs balığı, karides, akvaryum malzemeleri, eskişehir akvaryum`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Arama başlığı - Enhanced */}
        <div className="mb-12 animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-semibold">
                🔍 Arama
              </span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Arama Sonuçları
              </span>
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative">
                <SearchBar 
                  className="w-full"
                  placeholder={query ? `"${query}" için arama yapın...` : "Arama yapın..."}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sonuç sayısı - Enhanced */}
        {query && (
          <div className="mb-8 text-center animate-slide-up">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md border border-primary-100">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 font-medium">
                "<span className="font-bold text-primary-600">{query}</span>" için <span className="font-bold text-accent-600">{searchResults.length}</span> sonuç bulundu
              </p>
            </div>
          </div>
        )}

        {/* Filtreler ve sıralama - Enhanced */}
        <div className="relative group mb-10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <label className="text-base font-semibold text-gray-700">Kategori:</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-xl text-base font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:border-primary-300 transition-colors cursor-pointer shadow-sm"
                >
                  <option value="all">🌟 Tümü</option>
                  <option value="shrimp">🦐 Karides</option>
                  <option value="fish">🐠 Balık</option>
                  <option value="plants">🌿 Bitkiler</option>
                  <option value="equipment">🔧 Ekipman</option>
                  <option value="accessories">🩹 Sağlık & Bakım</option>
                  <option value="food">🍖 Yem</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <label className="text-base font-semibold text-gray-700">Fiyat:</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-xl text-base font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:border-primary-300 transition-colors cursor-pointer shadow-sm"
                >
                  <option value="all">💰 Tümü</option>
                  <option value="0-50">0₺ - 50₺</option>
                  <option value="50-100">50₺ - 100₺</option>
                  <option value="100-200">100₺ - 200₺</option>
                  <option value="200+">200₺+</option>
                </select>
              </div>

              
            </div>
          </div>
        </div>

        {/* Sonuçlar */}
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : searchResults.length > 0 ? (
          searchResults.length > 40 ? (
            <VirtualProductList
              products={searchResults}
              containerHeight={800}
              itemHeight={420}
              columns={4}
              showScrollIndicator={true}
              showProductCount={true}
              className="animate-fade-in"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={true} />
              ))}
            </div>
          )
        ) : query ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-50"></div>
                <div className="relative text-8xl animate-bounce-gentle">🔍</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Sonuç Bulunamadı
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              "<span className="font-bold text-primary-600">{query}</span>" için aradığınız kriterlere uygun ürün bulunamadı.
            </p>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 max-w-2xl mx-auto shadow-lg">
              <p className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span>
                Öneriler
              </p>
              <ul className="text-left text-base text-gray-600 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Farklı anahtar kelimeler deneyin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Daha genel terimler kullanın</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Filtreleri temizleyin veya değiştirin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span>Yazım hatası olup olmadığını kontrol edin</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative text-9xl animate-bounce-gentle">🔎</div>
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Arama Yapın
            </h3>
            <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
              Ürün bulmak için yukarıdaki arama çubuğunu kullanın. Binlerce ürün arasından aradığınızı bulun!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
