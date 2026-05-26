import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data/products';
import { categoryConfig } from '../data/categoryConfig';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';
import SEO from '../components/SEO';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const categoryTheme: Record<string, { heroFrom: string; iconBg: string; accentBar: string }> = {
  fish:        { heroFrom: 'from-orange-950',  iconBg: 'bg-orange-400/15',  accentBar: 'bg-orange-400' },
  shrimp:      { heroFrom: 'from-teal-950',    iconBg: 'bg-teal-400/15',    accentBar: 'bg-teal-400' },
  plants:      { heroFrom: 'from-green-950',   iconBg: 'bg-green-400/15',   accentBar: 'bg-green-400' },
  equipment:   { heroFrom: 'from-slate-800',   iconBg: 'bg-slate-400/15',   accentBar: 'bg-slate-400' },
  accessories: { heroFrom: 'from-rose-950',    iconBg: 'bg-rose-400/15',    accentBar: 'bg-rose-400' },
  food:        { heroFrom: 'from-amber-950',   iconBg: 'bg-amber-400/15',   accentBar: 'bg-amber-400' },
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products } = useAdmin();
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = products.filter(product => product.category === categoryId);

  const filteredAndSortedProducts = useMemo(() => {
    const result = [...allProducts];
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest':     result.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1)); break;
      default:           result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)); break;
    }
    return result;
  }, [allProducts, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Kategori Bulunamadı</h1>
          <p className="text-gray-500">Aradığınız kategori mevcut değil.</p>
        </div>
      </div>
    );
  }

  const categoryInfo = categoryConfig[categoryId || ''] || {
    name: category.name,
    description: { short: '', tips: [] },
    seo: { title: '', description: '', keywords: '' },
  };

  const categorySEO = { ...categoryInfo.seo };
  if (!categorySEO.title) {
    categorySEO.title = `${category.name} | Sedef Akvaryum Eskişehir`;
    categorySEO.description = categoryInfo.description.short;
    categorySEO.keywords = `akvaryum, ${category.name.toLowerCase()}, eskişehir akvaryum`;
  }

  const theme = categoryTheme[categoryId || ''] ?? categoryTheme.fish;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={categorySEO.title}
        description={categorySEO.description}
        keywords={categorySEO.keywords}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: category.name,
          description: categoryInfo.description.short,
          url: `https://sedefakvaryum.com.tr/category/${categoryId}`,
          numberOfItems: filteredAndSortedProducts.length,
        }}
      />

      {/* Category Hero */}
      <div className={`bg-gradient-to-b ${theme.heroFrom} to-navy-950`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 md:py-14">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 ${theme.iconBg} rounded-2xl flex items-center justify-center shrink-0 border border-white/10`}>
              <span className="text-4xl">{category.icon}</span>
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-1.5">Kategori</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                {categoryInfo.name || category.name}
              </h1>
            </div>
          </div>

          {categoryInfo.description.short && (
            <p className="text-white/60 text-sm md:text-base mt-5 max-w-xl leading-relaxed">
              {categoryInfo.description.short}
            </p>
          )}
        </div>
      </div>

      {/* Sort / Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-12 gap-4">
            <p className="text-sm text-gray-500 shrink-0">
              <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> ürün
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:block">Sıralama:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm font-medium text-gray-700 bg-transparent border-none focus:ring-0 py-1 pr-6 cursor-pointer outline-none"
              >
                <option value="featured">Önerilen</option>
                <option value="price-asc">En Düşük Fiyat</option>
                <option value="price-desc">En Yüksek Fiyat</option>
                <option value="newest">Yeniler</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 md:py-10">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100">
            <span className="text-6xl mb-4">{category.icon}</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-400 text-sm">Bu kategoride henüz ürün eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
