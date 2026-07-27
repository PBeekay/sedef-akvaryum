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

  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = products.filter(product => product.category === categoryId);

  const [stockOnly, setStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubGroup, setActiveSubGroup] = useState<string>('all');
  const [displayCount, setDisplayCount] = useState<number>(12);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  // Reset pagination on filter change
  React.useEffect(() => {
    setDisplayCount(12);
  }, [categoryId, stockOnly, searchQuery, activeSubGroup, sortBy]);

  // Infinite Scroll Trigger via IntersectionObserver
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [displayCount]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    if (stockOnly) {
      result = result.filter(p => p.inStock);
    }

    if (activeSubGroup !== 'all') {
      result = result.filter(p => {
        const name = p.name.toLowerCase();
        const desc = (p.description || '').toLowerCase();
        if (activeSubGroup === 'tetras') return name.includes('tetra') || desc.includes('tetra');
        if (activeSubGroup === 'cichlids') return name.includes('ciklet') || name.includes('cichlid') || desc.includes('ciklet');
        if (activeSubGroup === 'livebearers') return name.includes('lepistes') || name.includes('moli') || name.includes('plati') || name.includes('kılıçkuyruk');
        if (activeSubGroup === 'betta') return name.includes('betta') || name.includes('beta');
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
    }

    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest':     result.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1)); break;
      default:           result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1)); break;
    }
    return result;
  }, [allProducts, sortBy, stockOnly, searchQuery, activeSubGroup]);

  const visibleProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, displayCount);
  }, [filteredAndSortedProducts, displayCount]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Kategori Bulunamadı</h1>
          <p className="text-slate-500">Aradığınız kategori mevcut değil.</p>
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

  return (
    <div className="min-h-screen pb-16">
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

      {/* Dynamic Count Label based on Category */}
      {/* Category Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-3xl">{category.icon}</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {categoryInfo.name || category.name}
                </h1>
                {categoryInfo.description.short && (
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                    {categoryInfo.description.short}
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic Count Pill */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-semibold text-emerald-300 shrink-0">
              <span>
                {filteredAndSortedProducts.length} {
                  categoryId === 'fish' || categoryId === 'shrimp' ? 'Canlı Çeşidi Mevcut' :
                  categoryId === 'plants' ? 'Bitki Çeşidi Mevcut' : 'Ürün Çeşidi Mevcut'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Top Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${categoryInfo.name || category.name} içinde ara...`}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
            {/* Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Sadece Stoktakiler</span>
            </label>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs font-bold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
              >
                <option value="featured">🔥 Öne Çıkanlar</option>
                <option value="price-asc">💰 En Düşük Fiyat</option>
                <option value="price-desc">💎 En Yüksek Fiyat</option>
                <option value="newest">✨ Yeni Gelenler</option>
              </select>
            </div>

            {/* Clear button */}
            {(stockOnly || searchQuery) && (
              <button
                onClick={() => { setStockOnly(false); setSearchQuery(''); }}
                className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                Filtreleri Sıfırla
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Product Grid - Full Width Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <main className="space-y-8">
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showDetails={false} />
                  ))}
                </div>

                {/* Infinite Scroll Trigger Sentinel */}
                {displayCount < filteredAndSortedProducts.length && (
                  <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Daha fazla canlı yükleniyor...</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center p-6">
                <span className="text-4xl mb-3">🔍</span>
                <h3 className="text-base font-bold text-slate-800 mb-1">Aramaya Uygun Canlı Bulunamadı</h3>
                <p className="text-slate-500 text-xs max-w-sm">
                  Filtreleri değiştirerek veya arama terimini temizleyerek tekrar deneyebilirsiniz.
                </p>
              </div>
            )}
          </main>
      </div>
    </div>
  );
};

export default CategoryPage;
