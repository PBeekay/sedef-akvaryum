import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
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
      setRandomFeatured(shuffle(featuredProducts).slice(0, 10)); // 5x2 = 10 items
      setRandomNew(shuffle(newProducts).slice(0, 10)); // 5x2 = 10 items
    }
  }, [products, featuredProducts, newProducts]);

  const visibleFeatured = showAllFeatured ? featuredProducts : (randomFeatured.length > 0 ? randomFeatured : featuredProducts.slice(0, 10));
  const visibleNew = showAllNew ? newProducts : (randomNew.length > 0 ? randomNew : newProducts.slice(0, 10));

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
      {/* Hero Section with Slider */}
      <section className="relative bg-gradient-to-br from-navy-900 via-teal-900 to-navy-800 py-20 md:py-28 overflow-hidden">
        {/* Decorative Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-[8%] w-4 h-4 rounded-full bg-teal-400/30 animate-float-bubble" />
          <div className="absolute top-32 left-[20%] w-2 h-2 rounded-full bg-cyan-300/40 animate-float-bubble" style={{ animationDelay: '1s' }} />
          <div className="absolute top-24 right-[15%] w-6 h-6 rounded-full bg-teal-300/20 animate-float-bubble" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-24 left-[35%] w-3 h-3 rounded-full bg-ocean-400/30 animate-float-bubble" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 right-[8%] w-5 h-5 rounded-full bg-teal-500/25 animate-float-bubble" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-16 right-[25%] w-2 h-2 rounded-full bg-cyan-400/35 animate-float-bubble" style={{ animationDelay: '3s' }} />
          {/* Large soft glow blobs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-ocean-600/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <div className="transition-all duration-500 ease-in-out">
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-semibold backdrop-blur-sm">
                  <span>✦</span>
                  <span>Akvaryum Uzmanları — Eskişehir</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white">
                  Hoş Geldiniz{' '}
                  <span className="block text-gradient-hero">Sedef Akvaryum</span>
                </h1>
                <div className="mb-8 space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white/95">
                    {heroSlides[currentSlide]?.title || heroSlides[0]?.title || 'Sedef Akvaryum'}
                  </h2>
                  <p className="text-lg text-teal-200 mb-3 font-medium">
                    {heroSlides[currentSlide]?.subtitle || heroSlides[0]?.subtitle || ''}
                  </p>
                  <p className="text-base text-white/70 leading-relaxed">
                    {heroSlides[currentSlide]?.description || heroSlides[0]?.description || ''}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    to="/category/shrimp"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-teal-900/40 hover:shadow-teal-500/30 hover:scale-105"
                  >
                    <span>🦐</span>
                    Karidesleri Keşfet
                  </Link>
                  <Link
                    to="/category/fish"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>🐠</span>
                    Tüm Balıklar
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Slider */}
            <div className="animate-slide-up relative w-full">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/60 ring-1 ring-white/10 w-full h-80 md:h-96">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id || `slide-${index}`}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl filter drop-shadow-md">{slide.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg leading-tight shadow-black drop-shadow-sm">{slide.title}</h3>
                            <p className="text-xs text-white/80 font-medium">Büyük İndirimler Sizi Bekliyor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 hover:scale-110 shadow-lg z-20 border border-white/20"
                aria-label="Önceki slayt"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 hover:scale-110 shadow-lg z-20 border border-white/20"
                aria-label="Sonraki slayt"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-10 space-x-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id || `slide-${index}`}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-6 h-2.5 bg-teal-400 shadow-md shadow-teal-400/50'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60 hover:scale-110'
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
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-semibold">
              <span>🏪</span>
              <span>Ürün Kategorileri</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Kategorilerimizi <span className="text-gradient">Keşfedin</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sevimli balıklardan temel aksesuarlara kadar, dostlarınıza en iyi bakımı
              sağlamak için ihtiyacınız olan her şeye sahibiz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const categoryColorMap: Record<string, { gradient: string; hoverGlow: string; iconBg: string }> = {
                fish:        { gradient: 'from-orange-400 to-amber-500',   hoverGlow: 'from-orange-400 to-amber-400',   iconBg: 'bg-orange-50' },
                shrimp:      { gradient: 'from-teal-500 to-cyan-500',      hoverGlow: 'from-teal-400 to-cyan-400',      iconBg: 'bg-teal-50' },
                plants:      { gradient: 'from-green-500 to-emerald-500',  hoverGlow: 'from-green-400 to-emerald-400',  iconBg: 'bg-green-50' },
                equipment:   { gradient: 'from-slate-500 to-blue-600',     hoverGlow: 'from-slate-400 to-blue-500',     iconBg: 'bg-slate-50' },
                accessories: { gradient: 'from-rose-400 to-pink-500',      hoverGlow: 'from-rose-400 to-pink-400',      iconBg: 'bg-rose-50' },
                food:        { gradient: 'from-amber-400 to-orange-400',   hoverGlow: 'from-amber-400 to-orange-400',   iconBg: 'bg-amber-50' },
              };
              const config = categoryColorMap[category.id] || { gradient: 'from-teal-500 to-cyan-500', hoverGlow: 'from-teal-400 to-cyan-400', iconBg: 'bg-teal-50' };

              return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-2xl"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Glow halo on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.hoverGlow} rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition-all duration-500`} />

                {/* Card body */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 border border-gray-100/80 z-10 h-full flex flex-col">
                  {/* Top gradient bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`} />

                  <div className="p-6 flex flex-col items-center justify-center flex-1 text-center">
                    {/* Icon container with category-tinted background */}
                    <div className={`w-16 h-16 ${config.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                      <span className="text-4xl">{category.icon}</span>
                    </div>

                    <h3 className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors text-base leading-tight">
                      {category.name}
                    </h3>

                    <div className="mt-2.5 overflow-hidden h-5">
                      <span className={`text-xs font-semibold flex items-center justify-center gap-1 transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                        İncele
                        <svg className="w-3 h-3 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-teal-50/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-accent-50 to-accent-100 border border-accent-200 rounded-full text-accent-700 text-sm font-semibold">
                ⭐ En Popüler
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Öne Çıkan <span className="text-gradient">Ürünler</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Müşterilerimizin en çok sevdiği popüler ve yüksek puanlı ürünlerimiz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {visibleFeatured.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>

          <div className="flex flex-col items-center mt-12 gap-4">
            {featuredProducts.length > 8 && (
              <button
                type="button"
                onClick={() => setShowAllFeatured((prev) => !prev)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-teal-200 text-teal-700 font-semibold bg-white hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 shadow-sm"
              >
                {showAllFeatured ? 'Daha Az Göster' : 'Tüm Öne Çıkan Ürünleri Görüntüle'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllFeatured ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                </svg>
              </button>
            )}
            <Link
              to="/category/fish"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-500 to-ocean-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-ocean-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
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
        <section className="py-16 bg-white relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
                Yeni <span className="text-gradient">Gelenler</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ailemize katılan en son üyelerimizi keşfedin.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {visibleNew.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))}
            </div>

            {newProducts.length > 8 && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => setShowAllNew((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-teal-200 text-teal-700 font-semibold bg-white hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 shadow-sm"
                >
                  {showAllNew ? 'Daha Az Göster' : 'Tüm Yeni Ürünleri Görüntüle'}
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
