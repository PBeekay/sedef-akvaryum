import React, { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';
import { ProductGridSkeleton, CategoryHeaderSkeleton } from '../components/SkeletonLoader';
import SEO from '../components/SEO';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for skeleton
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [categoryId]);

  const category = categories.find(cat => cat.id === categoryId);
  const allProducts = products.filter(product => product.category === categoryId);

  const filteredAndSortedProducts = useMemo(() => {
    return allProducts;
  }, [allProducts]);

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

  if (isLoading) {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <CategoryHeaderSkeleton />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  // Get category description
  const getCategoryDescription = (catId: string) => {
    const descriptions: Record<string, { short: string; tips: string[] }> = {
      fish: {
        short: 'Renkli tropikal balıklardan dayanıklı japon balıklarına kadar geniş koleksiyonumuz. Yeni başlayanlar ve deneyimli akvaryumcular için ideal.',
        tips: ['Grup halinde yaşayan türler için en az 5-6 adet alın', 'Su parametrelerine dikkat edin', 'Yeni balıkları karantinaya alın']
      },
      shrimp: {
        short: 'Neocaridina türleri ile akvaryumunuzu renklendirin. Hem güzel hem de tankınızı temiz tutan bu dostlar bakımı kolay türlerdir.',
        tips: ['Stabil su parametreleri çok önemli', 'Yeterli saklanma yeri sağlayın', 'Kaliteli karides yemi kullanın']
      },
      plants: {
        short: 'Akvaryumunuzda doğal bir görünüm sağlayacak bitki türleri. Düşük ışıkta bile gelişen dayanıklı bitkiler.',
        tips: ['Düzenli gübreleme yapın', 'Işık ihtiyacına dikkat edin', 'Kök yapısına uygun substrat kullanın']
      },
      equipment: {
        short: 'Akvaryumunuz için gerekli tüm ekipmanlar. Filtreler, ısıtıcılar, aydınlatma ve daha fazlası.',
        tips: ['Tank boyutuna uygun filtre seçin', 'Yedek ekipman bulundurun', 'Düzenli bakım yapın']
      },
      accessories: {
        short: 'Balık ve karideslerinizin sağlığı için gerekli bakım ürünleri. Su testleri, ilaçlar ve sağlık malzemeleri.',
        tips: ['Düzenli su testleri yapın', 'Hastalık belirtilerini takip edin', 'Veteriner tavsiyesi alın']
      },
      food: {
        short: 'Balık ve karidesleriniz için yüksek kaliteli yemler. Dengeli beslenme için özel formüller.',
        tips: ['Günde 2-3 kez az miktarda yem verin', 'Çeşitli yem türleri kullanın', 'Fazla yem vermeyin']
      }
    };
    return descriptions[catId] || { short: '', tips: [] };
  };

  const categoryInfo = getCategoryDescription(categoryId || '');

  // SEO optimization for each category
  const getCategorySEO = () => {
    const seoData: Record<string, { title: string; description: string; keywords: string }> = {
      fish: {
        title: 'Süs Balığı - Akvaryum Balıkları | Sedef Akvaryum Eskişehir',
        description: 'Eskişehir\'de süs balığı satışı. Guppy, platy, betta, discus, tetra ve daha fazla akvaryum balığı çeşidi. Akvaryum balığı fiyatları ve bakım bilgileri. Kaliteli süs balıkları için akvaryum mağazamızı ziyaret edin.',
        keywords: 'akvaryum balığı, süs balığı, akvaryum balıkları, guppy, platy, betta, discus, tetra, eskişehir balık, akvaryum balığı satışı, akvaryum balığı fiyatları'
      },
      shrimp: {
        title: 'Akvaryum Karidesi - Neocaridina, Caridina | Sedef Akvaryum',
        description: 'Eskişehir\'de akvaryum karidesi satışı. Neocaridina, Caridina ve diğer akvaryum karidesı türleri. Akvaryum karides bakımı ve fiyatları. Sağlıklı akvaryum karideslerini mağazamızdan temin edin.',
        keywords: 'akvaryum karidesi, neocaridina, caridina, akvaryum karides, karides satışı, eskişehir karides, akvaryum karides bakımı, akvaryum karides fiyatları'
      },
      plants: {
        title: 'Akvaryum Bitkisi - Akvaryum Bitkileri | Sedef Akvaryum',
        description: 'Eskişehir\'de akvaryum bitkisi satışı. Tatlı su akvaryum bitkileri, bitki bakımı ve akvaryum bitki fiyatları. Akvaryumunuz için kaliteli bitkiler ve akvaryum bitki gübresi.',
        keywords: 'akvaryum bitkisi, akvaryum bitkileri, akvaryum bitki satışı, tatlı su bitkileri, eskişehir akvaryum bitkisi, akvaryum bitki bakımı, akvaryum bitki gübresi'
      },
      equipment: {
        title: 'Akvaryum Ekipmanları - Akvaryum Filtresi, Işık | Sedef Akvaryum',
        description: 'Eskişehir\'de akvaryum ekipmanları. Akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı, hava pompası ve tüm akvaryum malzemeleri. Akvaryum kurulumu için gerekli ekipmanlar.',
        keywords: 'akvaryum ekipmanları, akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı, akvaryum pompası, eskişehir akvaryum ekipman, akvaryum kurulumu, akvaryum malzemeleri'
      },
      accessories: {
        title: 'Akvaryum Aksesuarları - Dekorasyon ve Aksesuar | Sedef Akvaryum',
        description: 'Eskişehir\'de akvaryum aksesuarları. Akvaryum dekorasyon, akvaryum süsleri, akvaryum taşları, kökleri ve tüm akvaryum aksesuar çeşitleri. Akvaryumunuzu güzelleştirin.',
        keywords: 'akvaryum aksesuarları, akvaryum dekorasyon, akvaryum süsleri, akvaryum taşları, akvaryum kökü, eskişehir akvaryum aksesuar, akvaryum malzemeleri'
      },
      food: {
        title: 'Akvaryum Yemi - Balık Yemi, Karides Yemi | Sedef Akvaryum',
        description: 'Eskişehir\'de akvaryum yemi satışı. Balık yemi, karides yemi, toz yem ve tablet yem çeşitleri. Kaliteli akvaryum yemleri ile sağlıklı beslenme. Akvaryum yem fiyatları.',
        keywords: 'akvaryum yemi, balık yemi, karides yemi, akvaryum yem satışı, toz yem, tablet yem, eskişehir akvaryum yemi, akvaryum yem fiyatları'
      }
    };
    return seoData[categoryId || ''] || {
      title: `${category.name} | Sedef Akvaryum Eskişehir`,
      description: categoryInfo.short,
      keywords: `akvaryum, ${category.name.toLowerCase()}, eskişehir akvaryum`
    };
  };

  const categorySEO = getCategorySEO();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <SEO
        title={categorySEO.title}
        description={categorySEO.description}
        keywords={categorySEO.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": category.name,
          "description": categoryInfo.short,
          "url": `https://sedefakvaryum.com.tr/category/${categoryId}`,
          "numberOfItems": filteredAndSortedProducts.length
        }}
      />
      {/* Category Banner */}
      <div className="relative bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500 text-white py-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Icon */}
            <div className="text-8xl animate-bounce-gentle">
                {category.icon}
              </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                    {category.name}
                </h1>
              <p className="text-lg text-white/90 mb-4 leading-relaxed max-w-2xl">
                {categoryInfo.short}
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                <span className="font-bold text-xl">{filteredAndSortedProducts.length}</span>
                <span>ürün mevcut</span>
              </div>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-white mb-2">Ürün Bulunamadı</h3>
            <p className="text-white/80 mb-6">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default CategoryPage;
