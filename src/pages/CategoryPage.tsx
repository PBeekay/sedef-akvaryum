import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [filterInStock, setFilterInStock] = useState(false);
  const { products } = useAdmin();

  // Debug: Log products when they change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
    }
  }, [products, categoryId]);

  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = products.filter(product => product.category === categoryId);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by stock status
    if (filterInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name':
      default:
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [allProducts, sortBy, filterInStock]);

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

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-7xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                {category.icon}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                  <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {category.name}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  <span className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-primary-700 font-bold">{filteredAndSortedProducts.length}</span>
                    <span className="text-gray-600">ürün bulundu</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="relative group mb-10">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Filter Section */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                  <input
                    type="checkbox"
                    checked={filterInStock}
                    onChange={(e) => setFilterInStock(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="flex items-center gap-2 text-base font-semibold text-gray-700 group-hover/checkbox:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sadece Stokta Olanlar
                  </span>
                </label>
              </div>

              {/* Sort Section */}
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <label className="text-base font-semibold text-gray-700">Sırala:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-xl text-base font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white hover:border-primary-300 transition-colors cursor-pointer shadow-sm"
                >
                  <option value="name">📝 İsim</option>
                  <option value="price-low">💰 Fiyat: Düşükten Yükseğe</option>
                  <option value="price-high">💎 Fiyat: Yüksekten Düşüğe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-50"></div>
                <div className="relative text-8xl animate-bounce-gentle">😔</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {filterInStock 
                ? "Bu kategoride şu anda stokta ürün bulunmuyor." 
                : "Bu kategoride ürün bulunamadı."
              }
            </p>
            {filterInStock && (
              <button
                onClick={() => setFilterInStock(false)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ocean-500 to-primary-500 text-white font-bold text-lg rounded-xl hover:from-ocean-600 hover:to-primary-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Tüm ürünleri göster
              </button>
            )}
          </div>
        )}

        {/* Category Description */}
        <div className="mt-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-primary-100">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {category.name} Hakkında
              </span>
            </h2>
           <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
             {category.id === 'fish' && (
               <p className="bg-ocean-50/50 p-6 rounded-xl border-l-4 border-ocean-500">
                 Renkli tropikal türlerden dayanıklı japon balıklarına kadar güzel balık koleksiyonumuzu keşfedin. 
                 Her balık sağlık ve canlılık için dikkatle seçilir. Hem yeni başlayanlar hem de 
                 deneyimli akvaryumcular için mükemmel.
               </p>
             )}
             {category.id === 'shrimp' && (
               <div>
                 <p className="mb-6 bg-primary-50/50 p-6 rounded-xl border-l-4 border-primary-500">
                   Neocaridina Davidi türlerinin geniş koleksiyonumuzu keşfedin. Bu güzel karidesler 
                   akvaryumunuzu canlandıracak ve temizlik konusunda uzman olacaklar.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                   <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                     <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                       <span className="text-2xl">🦐</span>
                       Neocaridina Davidi Özellikleri
                     </h4>
                     <ul className="text-base text-gray-700 space-y-2">
                       <li className="flex items-center gap-2">✓ Boyut: 2-3 cm</li>
                       <li className="flex items-center gap-2">✓ Yaşam Süresi: 1-2 yıl</li>
                       <li className="flex items-center gap-2">✓ Su Sıcaklığı: 18-28°C</li>
                       <li className="flex items-center gap-2">✓ pH: 7.0-7.6</li>
                       <li className="flex items-center gap-2">✓ GH: 9-11 dGH</li>
                       <li className="flex items-center gap-2">✓ Beslenme: Omnivor</li>
                     </ul>
                   </div>
                   <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                     <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                       <span className="text-2xl">💡</span>
                       Bakım İpuçları
                     </h4>
                     <ul className="text-base text-gray-700 space-y-2">
                       <li className="flex items-center gap-2">✓ Minimum 20L tank boyutu</li>
                       <li className="flex items-center gap-2">✓ Stabil su parametreleri</li>
                       <li className="flex items-center gap-2">✓ Yeterli saklanma yeri</li>
                       <li className="flex items-center gap-2">✓ Düzenli su değişimi</li>
                       <li className="flex items-center gap-2">✓ Kaliteli yem</li>
                     </ul>
                   </div>
                 </div>
               </div>
             )}
             {category.id === 'plants' && (
               <p className="bg-green-50/50 p-6 rounded-xl border-l-4 border-green-500">
                 Akvaryumunuzda doğal bir görünüm sağlayacak çeşitli bitki türlerimizi keşfedin. 
                 Düşük ışık koşullarında bile gelişen dayanıklı bitkiler.
               </p>
             )}
             {category.id === 'equipment' && (
               <p className="bg-purple-50/50 p-6 rounded-xl border-l-4 border-purple-500">
                 Akvaryumunuz için gerekli tüm ekipmanları bulun. Filtreler, ısıtıcılar, 
                 aydınlatma sistemleri ve daha fazlası.
               </p>
             )}
             {category.id === 'accessories' && (
               <p className="bg-pink-50/50 p-6 rounded-xl border-l-4 border-pink-500">
                 Akvaryum bakımınızı tamamlayacak premium aksesuarlarımızla tanışın. Dekorasyonlardan 
                 temizlik araçlarına kadar, balıklarınızı mutlu ve sağlıklı tutmak için ihtiyacınız olan her şeye sahibiz.
               </p>
             )}
             {category.id === 'food' && (
               <p className="bg-amber-50/50 p-6 rounded-xl border-l-4 border-amber-500">
                 Balıklarınız için en iyi beslenmeyi sağlayın. Tüm balık türleri için yüksek kaliteli yemler sunuyoruz, 
                 sağlıklı ve mutlu bir yaşam için ihtiyaç duydukları besinleri aldıklarından emin oluyoruz.
               </p>
             )}
           </div>
          </div>
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;
