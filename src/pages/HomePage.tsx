import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import GoogleReviews from '../components/GoogleReviews';
import { useAdmin } from '../context/AdminContext';
import LogoLoop from '../components/LogoLoop';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const { sliderData, products } = useAdmin();
  
  // Get featured and new products from admin context
  const featuredProducts = products.filter(product => product.featured);
  const newProducts = products.filter(product => product.new);

  // Hero slider data from admin context
  const fallbackSlide = React.useMemo(() => ({
    id: 'fallback-slide',
    title: 'Sedef Akvaryum Mağazası',
    subtitle: 'Admin panelinden slider içeriği ekleyin.',
    description: 'Slider içerikleriniz henüz hazır değil. Admin panelinden slayt eklediğinizde burada görünecek.',
    image: '/shrimp.png',
    category: 'fish',
    icon: '🦐',
    buttonText: 'Ürünleri İncele',
    buttonLink: '/category/fish',
  }), []);
  
  // Use sliderData if available, otherwise use fallback
  // Firebase document IDs are already unique, so we just use them directly
  const heroSlides = React.useMemo(() => {
    if (sliderData.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Slider data boş, fallback kullanılıyor');
      }
      return [fallbackSlide];
    }
    
    // Debug: Log slider data
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Slider data:', sliderData);
      console.log('📊 Slider sayısı:', sliderData.length);
      sliderData.forEach((slide, index) => {
        console.log(`  Slider ${index}:`, { id: slide.id, title: slide.title });
      });
    }
    
    // Filter out any slides without IDs (shouldn't happen with Firebase, but just in case)
    const validSlides = sliderData.filter(slide => {
      if (!slide || !slide.id) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Geçersiz slider bulundu (ID yok):', slide);
        }
        return false;
      }
      return true;
    });
    
    // If no valid slides after filtering, use fallback
    if (validSlides.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Geçerli slider bulunamadı, fallback kullanılıyor');
      }
      return [fallbackSlide];
    }
    
    // Use valid slides from database
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Kullanılacak slider sayısı:', validSlides.length);
    }
    return validSlides;
  }, [sliderData, fallbackSlide]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (heroSlides.length === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    if (heroSlides.length === 0) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Reset currentSlide when heroSlides changes
  useEffect(() => {
    if (heroSlides.length === 0) {
      setCurrentSlide(0);
      return;
    }
    // If currentSlide is out of bounds, reset to 0
    if (currentSlide >= heroSlides.length || currentSlide < 0) {
      setCurrentSlide(0);
    }
  }, [heroSlides.length, currentSlide]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Sedef Akvaryum | Eskişehir'in En İyi Akvaryum Mağazası - Süs Balığı, Karides ve Akvaryum Malzemeleri"
        description="Eskişehir'de akvaryum mağazası arıyorsanız Sedef Akvaryum tam size göre! Süs balığı, akvaryum karidesi, akvaryum bitkileri, akvaryum yemi, akvaryum filtresi ve tüm akvaryum malzemeleri. Uzman akvaryum danışmanlığı, akvaryum kurulumu ve hızlı teslimat. Akvaryum hobiniz için güvenilir adres."
        keywords="akvaryum, akvaryum mağazası, akvaryum malzemeleri, süs balığı, akvaryum karidesi, akvaryum bitkileri, akvaryum yemi, akvaryum filtresi, akvaryum ekipmanları, eskişehir akvaryum, akvaryum kurulumu, akvaryum bakımı, akvaryum hobisi, neocaridina, caridina, guppy, platy, betta, discus, tetra"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Sedef Akvaryum Ana Sayfa",
          "description": "Eskişehir'in en güvenilir akvaryum mağazası. Süs balığı, akvaryum karidesi ve tüm akvaryum malzemeleri.",
          "url": "https://sedefakvaryum.com.tr/",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Akvaryum Karidesleri"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Süs Balıkları"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Akvaryum Bitkileri"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Akvaryum Ekipmanları"
              }
            ]
          }
        }}
      />
      {/* Hero Section with Slider (video kaldırıldı, sade beyaz arka plan) */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="transition-all duration-500 ease-in-out">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-ocean-50 rounded-full text-ocean-600 text-sm font-semibold border border-ocean-100">
                    ✨ Akvaryum Uzmanları
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight text-gray-900">
                  Hoş Geldiniz{' '}
                  <span className="block text-ocean-600">Sedef Akvaryum</span>
                </h1>
                <div className="mb-8 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
                    {heroSlides[currentSlide]?.title || heroSlides[0]?.title || 'Sedef Akvaryum'}
                  </h2>
                  <p className="text-lg text-gray-700 mb-3 font-medium">
                    {heroSlides[currentSlide]?.subtitle || heroSlides[0]?.subtitle || ''}
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {heroSlides[currentSlide]?.description || heroSlides[0]?.description || ''}
                  </p>
                </div>
              </div>
            </div>

                                      {/* Image Slider */}
            <div className="animate-slide-up relative w-full">
             <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-80 bg-gray-50">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id || `slide-${index}`}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                                                                                          <img
                           src={slide.image}
                           alt={slide.title}
                           className="w-full h-80 object-cover"
                           loading="lazy"
                           decoding="async"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             if (process.env.NODE_ENV === 'development') {
                             }
                             // Fallback to gradient background
                             target.style.display = 'none';
                             const parent = target.parentElement;
                             if (parent) {
                               // Clear existing content safely
                               parent.textContent = '';
                               
                               // Create elements safely without innerHTML
                               const slideDiv = document.createElement('div');
                               slideDiv.className = 'w-full h-80 flex items-center justify-center text-white text-4xl font-bold';
                               
                               const gradientPalette = [
                                 'linear-gradient(135deg, #1a237e, #3949ab)',
                                 'linear-gradient(135deg, #4a148c, #8e24aa)',
                                 'linear-gradient(135deg, #d84315, #f4511e)'
                               ];
                               const backgroundStyle = gradientPalette[index % gradientPalette.length];
                               slideDiv.style.background = backgroundStyle;
                               
                               const centerDiv = document.createElement('div');
                               centerDiv.className = 'text-center';
                               
                               const iconDiv = document.createElement('div');
                               iconDiv.className = 'text-6xl mb-4';
                               iconDiv.textContent = slide.icon;
                               
                               const titleDiv = document.createElement('div');
                               titleDiv.className = 'text-2xl';
                               titleDiv.textContent = slide.title;
                               
                               centerDiv.appendChild(iconDiv);
                               centerDiv.appendChild(titleDiv);
                               slideDiv.appendChild(centerDiv);
                               parent.appendChild(slideDiv);
                             }
                           }}
                           onLoad={() => {
                             if (process.env.NODE_ENV === 'development') {
                             }
                           }}
                         />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white text-gray-800 p-4 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold">{slide.icon}</div>
                      <p className="text-sm font-medium">{slide.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg z-20"
              aria-label="Önceki slayt"
              type="button"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg z-20"
              aria-label="Sonraki slayt"
              type="button"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>

          {/* Slide Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id || `slide-${index}`}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-10 h-3 bg-yellow-300 shadow-lg shadow-yellow-300/50' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-125'
              }`}
              aria-label={`Slayt ${index + 1}`}
              type="button"
            />
          ))}
        </div>
        </div>
      </section>

      {/* Logo Loop - Trust Indicators */}
      <LogoLoop />

      {/* Categories Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-semibold">
                🏪 Ürün Kategorileri
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Kategorilerimizi Keşfedin
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sevimli balıklardan temel aksesuarlara kadar, dostlarınıza en iyi bakımı 
              sağlamak için ihtiyacınız olan her şeye sahibiz.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-transparent group-hover:border-primary-200">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200 text-sm">
                      {category.name}
                    </h3>
                  </div>
                  
                  {/* Decorative shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-orange-600 text-sm font-semibold border border-orange-200">
                ⭐ En Popüler
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Öne Çıkan Ürünler
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Müşterilerimizin en çok sevdiği popüler ve yüksek puanlı ürünlerimiz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/category/fish"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-ocean-500 to-primary-500 text-white font-bold text-lg rounded-xl hover:from-ocean-600 hover:to-primary-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="text-2xl">🐠</span>
              Balıkları Keşfet
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 right-20 w-72 h-72 bg-green-400 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-600 text-sm font-semibold border border-green-200">
                  🆕 Yeni Geldiler
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Yeni Gelenler
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ailemize katılan en son üyelerimizi keşfedin.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      

             {/* Google Reviews Section */}
      <GoogleReviews />
    </div>
  );
};

export default HomePage;
