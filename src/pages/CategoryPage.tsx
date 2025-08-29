import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');


  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = getProductsByCategory(categoryId || '');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by stock status
    if (filterInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Filter by difficulty (for shrimp and fish categories)
    if (filterDifficulty && (categoryId === 'shrimp' || categoryId === 'fish')) {
      filtered = filtered.filter(product => product.difficulty === filterDifficulty);
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
  }, [allProducts, sortBy, filterInStock, filterDifficulty, categoryId]);

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
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
                <p className="text-gray-600">
                  {filteredAndSortedProducts.length} ürün bulundu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col gap-4">
            {/* Basic Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                             <label className="flex items-center space-x-2">
                 <input
                   type="checkbox"
                   checked={filterInStock}
                   onChange={(e) => setFilterInStock(e.target.checked)}
                   className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                 />
                 <span className="text-sm text-gray-700">Sadece Stokta Olanlar</span>
               </label>
              </div>

                         <div className="flex items-center space-x-2">
               <label className="text-sm text-gray-700">Sırala:</label>
               <select
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')}
                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
               >
                 <option value="name">İsim</option>
                 <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                 <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
               </select>
             </div>
            </div>

            {/* Karides Özel Filtreleri */}
            {categoryId === 'shrimp' && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Karides Filtreleri</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Zorluk:</label>
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Tümü</option>
                      <option value="Kolay">Kolay</option>
                      <option value="Orta">Orta</option>
                      <option value="Zor">Zor</option>
                    </select>
                  </div>
                  

                </div>
              </div>
            )}

            {/* Balık Özel Filtreleri */}
            {categoryId === 'fish' && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Balık Filtreleri</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Zorluk:</label>
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Tümü</option>
                      <option value="Çok Kolay">Çok Kolay</option>
                      <option value="Kolay">Kolay</option>
                      <option value="Orta">Orta</option>
                      <option value="Zor">Zor</option>
                    </select>
                  </div>
                  

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={true} />
            ))}
          </div>
        ) : (
                     <div className="text-center py-12">
             <div className="text-6xl mb-4">😔</div>
             <h3 className="text-xl font-semibold text-gray-800 mb-2">Ürün Bulunamadı</h3>
             <p className="text-gray-600">
               {filterInStock 
                 ? "Bu kategoride şu anda stokta ürün bulunmuyor." 
                 : "Bu kategoride ürün bulunamadı."
               }
             </p>
             {filterInStock && (
               <button
                 onClick={() => setFilterInStock(false)}
                 className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
               >
                 Tüm ürünleri göster
               </button>
             )}
           </div>
        )}

        {/* Category Description */}
                 <div className="mt-16 bg-gray-50 rounded-xl p-8">
           <h2 className="text-2xl font-bold text-gray-800 mb-4">
             {category.name} Hakkında
           </h2>
           <div className="prose text-gray-600">
             {category.id === 'fish' && (
               <p>
                 Renkli tropikal türlerden dayanıklı japon balıklarına kadar güzel balık koleksiyonumuzu keşfedin. 
                 Her balık sağlık ve canlılık için dikkatle seçilir. Hem yeni başlayanlar hem de 
                 deneyimli akvaryumcular için mükemmel.
               </p>
             )}
             {category.id === 'shrimp' && (
               <div>
                 <p className="mb-4">
                   Neocaridina Davidi türlerinin geniş koleksiyonumuzu keşfedin. Bu güzel karidesler 
                   akvaryumunuzu canlandıracak ve temizlik konusunda uzman olacaklar.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div className="bg-white p-4 rounded-lg border">
                     <h4 className="font-semibold text-gray-800 mb-2">Neocaridina Davidi Özellikleri</h4>
                                           <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Boyut: 2-3 cm</li>
                        <li>• Yaşam Süresi: 1-2 yıl</li>
                        <li>• Su Sıcaklığı: 18-28°C</li>
                        <li>• pH: 7.0-7.6</li>
                        <li>• GH: 9-11 dGH</li>
                        <li>• Beslenme: Omnivor</li>
                      </ul>
                   </div>
                   <div className="bg-white p-4 rounded-lg border">
                     <h4 className="font-semibold text-gray-800 mb-2">Bakım İpuçları</h4>
                     <ul className="text-sm text-gray-600 space-y-1">
                       <li>• Minimum 20L tank boyutu</li>
                       <li>• Stabil su parametreleri</li>
                       <li>• Yeterli saklanma yeri</li>
                       <li>• Düzenli su değişimi</li>
                       <li>• Kaliteli yem</li>
                     </ul>
                   </div>
                 </div>
               </div>
             )}
             {category.id === 'plants' && (
               <p>
                 Akvaryumunuzda doğal bir görünüm sağlayacak çeşitli bitki türlerimizi keşfedin. 
                 Düşük ışık koşullarında bile gelişen dayanıklı bitkiler.
               </p>
             )}
             {category.id === 'equipment' && (
               <p>
                 Akvaryumunuz için gerekli tüm ekipmanları bulun. Filtreler, ısıtıcılar, 
                 aydınlatma sistemleri ve daha fazlası.
               </p>
             )}
             {category.id === 'accessories' && (
               <p>
                 Akvaryum bakımınızı tamamlayacak premium aksesuarlarımızla tanışın. Dekorasyonlardan 
                 temizlik araçlarına kadar, balıklarınızı mutlu ve sağlıklı tutmak için ihtiyacınız olan her şeye sahibiz.
               </p>
             )}
             {category.id === 'food' && (
               <p>
                 Balıklarınız için en iyi beslenmeyi sağlayın. Tüm balık türleri için yüksek kaliteli yemler sunuyoruz, 
                 sağlıklı ve mutlu bir yaşam için ihtiyaç duydukları besinleri aldıklarından emin oluyoruz.
               </p>
             )}
           </div>
         </div>
      </div>
    </div>
  );
};

export default CategoryPage;
