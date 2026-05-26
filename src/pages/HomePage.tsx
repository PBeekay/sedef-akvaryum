import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import GoogleReviews from '../components/GoogleReviews';
import { useAdmin } from '../context/AdminContext';
import LogoLoop from '../components/LogoLoop';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  const { sliderData, products } = useAdmin();

  // Get featured and new products from admin context (Memoized to prevent re-renders)
  const featuredProducts = React.useMemo(() => products.filter(product => product.featured), [products]);
  const newProducts = React.useMemo(() => products.filter(product => product.new), [products]);

  // Limit initially visible items for performance
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);

  // Randomization State
  const [randomFeatured, setRandomFeatured] = useState<typeof products>([]);
  const [randomNew, setRandomNew] = useState<typeof products>([]);

  useEffect(() => {
    const shuffle = (array: typeof products) => {
      return [...array].sort(() => Math.random() - 0.5);
    };

    if (products.length > 0) {
      setRandomFeatured(shuffle(featuredProducts).slice(0, 12));
      setRandomNew(shuffle(newProducts).slice(0, 12));
    }
  }, [products, featuredProducts, newProducts]);

  const visibleFeatured = showAllFeatured ? featuredProducts : (randomFeatured.length > 0 ? randomFeatured : featuredProducts.slice(0, 12));
  const visibleNew = showAllNew ? newProducts : (randomNew.length > 0 ? randomNew : newProducts.slice(0, 12));

  // Hero slider data from admin context
  const fallbackSlide = React.useMemo(() => ({
    id: 'fallback-slide',
    title: 'Sedef Akvaryum',
    subtitle: 'Eskişehir\'in en geniş akvaryum koleksiyonu. Karides, balık, bitki ve ekipmanlar tek çatı altında.',
    description: 'Kaliteli akvaryum ürünleri ve uzman danışmanlık hizmeti.',
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
    <div className="min-h-screen bg-transparent">
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
      {/* Hero Section — Full-bleed cinematic slider */}
      <section className="relative min-h-[520px] md:min-h-[680px] bg-navy-950 overflow-hidden flex flex-col">

        {/* Slide backgrounds */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id || `slide-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Text overlay */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-16 pt-20 md:pt-40">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight">
              {heroSlides[currentSlide]?.title || 'Sedef Akvaryum'}
            </h1>
            <p className="text-white/70 text-base mb-8 max-w-sm leading-relaxed">
              {heroSlides[currentSlide]?.subtitle || 'Kaliteli balık ve akvaryum ürünleri için güvenilir adresiniz.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/category/shrimp"
                className="inline-flex items-center justify-center px-7 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 text-sm"
              >
                Karidesleri Keşfet
              </Link>
              <Link
                to="/category/fish"
                className="inline-flex items-center justify-center px-7 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-200 text-sm"
              >
                Tüm Balıklar
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar: indicators left, arrows right */}
        <div className="relative flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="flex gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id || `dot-${index}`}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/35 hover:bg-white/60'
                }`}
                aria-label={`Slayt ${index + 1}`}
                type="button"
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Önceki slayt"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Sonraki slayt"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Logo Loop - Trust Indicators */}
      <LogoLoop />

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-teal-600 tracking-widest uppercase mb-2">Öne Çıkan Ürünler</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">En Popüler</h2>
            </div>
            <Link
              to="/category/fish"
              className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors shrink-0 ml-4"
            >
              Tümünü Gör
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            {visibleFeatured.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>

          {featuredProducts.length > 12 && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setShowAllFeatured((prev) => !prev)}
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200"
              >
                {showAllFeatured ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllFeatured ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-teal-600 tracking-widest uppercase mb-2">Yeni Gelenler</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Yeni Ürünler</h2>
              </div>
              <Link
                to="/category/fish"
                className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors shrink-0 ml-4"
              >
                Tümünü Gör
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {visibleNew.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))}
            </div>

            {newProducts.length > 12 && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => setShowAllNew((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  {showAllNew ? 'Daha Az Göster' : 'Daha Fazla Göster'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllNew ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}



      <ContactSection />
      {/* Google Reviews Section */}
      <GoogleReviews />
    </div>
  );
};

export default HomePage;
