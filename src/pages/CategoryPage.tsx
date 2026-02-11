import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data/products';
import { categoryConfig } from '../data/categoryConfig';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';
import SEO from '../components/SEO';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products } = useAdmin();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Products are already loaded via AdminContext
  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = products.filter(product => product.category === categoryId);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newest are added last or have a 'new' flag
        // For now sorting by 'new' flag first, then id
        result.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1));
        break;
      case 'featured':
      default:
        // Featured first, then default order
        result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }

    return result;
  }, [allProducts, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kategori Bulunamadı</h1>
          <p className="text-gray-600">Aradığınız kategori mevcut değil.</p>
        </div>
      </div>
    );
  }

  // Get category info from config
  const categoryInfo = categoryConfig[categoryId || ''] || {
    name: category?.name || '',
    description: { short: '', tips: [] },
    seo: { title: '', description: '', keywords: '' }
  };

  const categorySEO = categoryInfo.seo;

  // Fallback dynamic SEO if not in config (though config covers all known categories)
  if (!categorySEO.title && category) {
    categorySEO.title = `${category.name} | Sedef Akvaryum Eskişehir`;
    categorySEO.description = categoryInfo.description.short;
    categorySEO.keywords = `akvaryum, ${category.name.toLowerCase()}, eskişehir akvaryum`;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title={categorySEO.title}
        description={categorySEO.description}
        keywords={categorySEO.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": category.name,
          "description": categoryInfo.description.short,
          "url": `https://sedefakvaryum.com.tr/category/${categoryId}`,
          "numberOfItems": filteredAndSortedProducts.length
        }}
      />

      {/* Compact Header & Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Title & Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-2xl">
                {category.icon}
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-none mb-1">
                  {category.name}
                </h1>
                <p className="text-xs text-gray-500">
                  {filteredAndSortedProducts.length} ürün listeleniyor
                </p>
              </div>
            </div>

            {/* Right: Actions/Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                <span className="text-xs font-medium text-gray-500 px-2 hidden sm:block">Sıralama:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 py-1 pl-2 pr-8 cursor-pointer"
                >
                  <option value="featured">Önerilen</option>
                  <option value="price-asc">En Düşük Fiyat</option>
                  <option value="price-desc">En Yüksek Fiyat</option>
                  <option value="newest">Yeniler</option>
                </select>
              </div>

              {/* Example Filter Checkbox (Visual only for now as requested) */}
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in bg-gray-50 rounded-3xl">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500 mb-6">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
