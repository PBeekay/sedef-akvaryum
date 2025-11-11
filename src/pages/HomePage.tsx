import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import GoogleReviews from '../components/GoogleReviews';
import { useAdmin } from '../context/AdminContext';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import LogoLoop from '../components/LogoLoop';
import PullToRefresh from '../components/PullToRefresh';
import { usePullToRefresh } from '../hooks/useSwipe';

const HomePage: React.FC = () => {
  const { sliderData, products } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  // Pull to refresh
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const { pullDistance, isRefreshing, refreshThreshold } = usePullToRefresh(handleRefresh);
  
  // Get featured and new products from admin context
  const featuredProducts = products.filter(product => product.featured);
  const newProducts = products.filter(product => product.new);

  // Hero slider data from admin context
  const heroSlides = sliderData;

  type HeroSlide = typeof heroSlides extends Array<infer T> ? T : never;

  const fallbackSlide: HeroSlide = {
    id: 'fallback-slide',
    title: 'Sedef Akvaryum Mağazası',
    subtitle: 'Admin panelinden slider içeriği ekleyin.',
    description: 'Gerçek zamanlı yönetim paneliyle slider içeriklerinizi ekleyin; yeni slaytlar eklediğinizde burada görüntülenecek.',
    image: '/shrimp.png',
    icon: '🦐',
    buttonText: 'Ürünleri İncele',
    buttonLink: '/category/fish',
    category: 'fish',
  };

  const normalizedSlides: HeroSlide[] = heroSlides
    .map((slide, index) => {
      if (!slide) return null;

      const safeTitle =
        typeof slide.title === 'string' && slide.title.trim().length > 0
          ? slide.title
          : `Sedef Akvaryum Slider ${index + 1}`;

      const safeSubtitle =
        typeof slide.subtitle === 'string' && slide.subtitle.trim().length > 0
          ? slide.subtitle
          : 'Slider içeriğini admin panelinden düzenleyin.';

      const safeDescription =
        typeof slide.description === 'string' && slide.description.trim().length > 0
          ? slide.description
          : 'Başlık, açıklama ve bağlantı alanlarını doldurarak ziyaretçileriniz için dikkat çekici bir slider oluşturun.';

      const safeImage =
        typeof slide.image === 'string' && slide.image.trim().length > 0
          ? slide.image
          : '/shrimp.png';

      const safeIcon =
        typeof slide.icon === 'string' && slide.icon.trim().length > 0
          ? slide.icon
          : '🐠';

      const safeButtonText =
        typeof slide.buttonText === 'string' && slide.buttonText.trim().length > 0
          ? slide.buttonText
          : 'Ürünleri İncele';

      const safeButtonLink =
        typeof slide.buttonLink === 'string' && slide.buttonLink.trim().length > 0
          ? slide.buttonLink
          : '/category/fish';

      const safeCategory =
        typeof slide.category === 'string' && slide.category.trim().length > 0
          ? slide.category
          : 'fish';

      return {
        ...slide,
        id: typeof slide.id === 'string' && slide.id.trim().length > 0 ? slide.id : `slide-${index}`,
        title: safeTitle,
        subtitle: safeSubtitle,
        description: safeDescription,
        image: safeImage,
        icon: safeIcon,
        buttonText: safeButtonText,
        buttonLink: safeButtonLink,
        category: safeCategory,
      } as HeroSlide;
    })
    .filter((slide): slide is HeroSlide => slide !== null);

  // Guard for empty hero slider data
  const hasSlides = normalizedSlides.length > 0;

  const [currentSlide, setCurrentSlide] = useState(0);
  
  const displaySlides = hasSlides ? normalizedSlides : [fallbackSlide];
  const currentSlideData = displaySlides[Math.min(currentSlide, displaySlides.length - 1)];

  const normalizedSlidesLength = normalizedSlides.length;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  

  // Auto-slide functionality
  useEffect(() => {
    if (!hasSlides || normalizedSlidesLength === 0) {
      setCurrentSlide(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % normalizedSlidesLength);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [hasSlides, normalizedSlidesLength]);

  useEffect(() => {
    if (hasSlides) {
      setCurrentSlide((prev) => Math.min(prev, normalizedSlidesLength - 1));
    } else {
      setCurrentSlide(0);
    }
  }, [hasSlides, normalizedSlidesLength]);

  const goToSlide = (index: number) => {
    if (!hasSlides) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev + 1) % normalizedSlidesLength);
  };

  const prevSlide = () => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev - 1 + normalizedSlidesLength) % normalizedSlidesLength);
  };

  return (
    <div className="min-h-screen">
      {/* Pull to Refresh Indicator */}
      <PullToRefresh
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        refreshThreshold={refreshThreshold}
      />
      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-ocean-600 via-primary-600 to-secondary-500 text-white py-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            src="/videos/133871-758336534_small.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => console.error('Video error:', e)}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-bounce-gentle"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in relative z-20">
              <div className="transition-all duration-500 ease-in-out">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-200 text-sm font-semibold border border-yellow-300/30">
                    ✨ Akvaryum Uzmanları
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
                  Hoş Geldiniz{' '}
                  <span className="block text-yellow-300 drop-shadow-lg">Sedef Akvaryum</span>
                </h1>
                <div className="mb-8 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-200 drop-shadow-md">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-lg text-white/90 mb-3 font-medium">
                    {currentSlideData.subtitle}
                  </p>
                  <p className="text-base text-white/80 leading-relaxed">
                    {currentSlideData.description}
                  </p>
                </div>
              </div>
            </div>

                                      {/* Image Slider */}
            <div className="animate-slide-up relative w-full z-20">
             <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-80">
              {displaySlides.map((slide, index) => (
                  <div
                  key={slide.id ?? `fallback-${index}`}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    hasSlides
                      ? index === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-full'
                      : 'opacity-100 translate-x-0'
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white text-gray-800 p-4 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold">{slide.icon}</div>
                      <p className="text-sm font-medium">{slide.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
            {hasSlides && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg z-20"
                  aria-label="Önceki slayt"
                  type="button"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg z-20"
                  aria-label="Sonraki slayt"
                  type="button"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            </div>
          </div>

          {/* Slide Indicators */}
        {hasSlides && (
          <div className="flex justify-center mt-10 space-x-3">
            {normalizedSlides.map((_, index) => (
              <button
                key={index}
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
        )}
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
          
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))}
            </div>
          )}
          
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
