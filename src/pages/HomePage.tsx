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

  // Showcase Tab State
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'featured' | 'new' | 'all'>('featured');

  // Randomization State
  const [randomFeatured, setRandomFeatured] = useState<typeof products>([]);
  const [randomNew, setRandomNew] = useState<typeof products>([]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffle = (array: typeof products) => [...array].sort(() => Math.random() - 0.5);
      setRandomFeatured(shuffle(featuredProducts).slice(0, 12));
      setRandomNew(shuffle(newProducts).slice(0, 12));
    }
  }, [products, featuredProducts, newProducts]);

  const visibleFeatured = randomFeatured.length > 0 ? randomFeatured : featuredProducts.slice(0, 12);
  const visibleNew = randomNew.length > 0 ? randomNew : newProducts.slice(0, 12);

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
    badge: 'Eskişehir\'in Akvaryum Mağazası',
    discountTag: '',
    price: '',
    oldPrice: ''
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

      {/* Hero Section — Panoramic Background Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-6">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-emerald-500/20 group">
          
          {/* Panoramic Full-Width Images Layer */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id || `showcase-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out filter brightness-[0.88]"
              />
              {/* Dark Cinematic Vignette & Side Gradients for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
            </div>
          ))}

          {/* Ambient Background Glowing Lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full filter blur-[120px] pointer-events-none" />

          {/* Floating Hero Content Glass Box */}
          <div className="relative z-10 h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between max-w-2xl">
            
            {/* Top Badges & Discount Pill */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  {heroSlides[currentSlide]?.badge || 'Eskişehir\'in Akvaryum Mağazası'}
                </span>
              </span>

              {heroSlides[currentSlide]?.discountTag && (
                <span className="text-[11px] sm:text-xs font-bold text-amber-300 bg-amber-500/25 px-3 py-1.5 rounded-full border border-amber-400/50 backdrop-blur-xl animate-bounce">
                  🔥 {heroSlides[currentSlide].discountTag}
                </span>
              )}

              <span className="text-[11px] sm:text-xs font-semibold text-slate-300 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-1">
                <span className="text-amber-400">★ 4.9</span> (Google Değerlendirme)
              </span>
            </div>

            {/* Middle Main Slogan & Price */}
            <div className="my-auto py-6 space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
                {heroSlides[currentSlide]?.title || 'Sedef Akvaryum'}
              </h1>

              {/* Price Tag if Specified in Admin */}
              {heroSlides[currentSlide]?.price && (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-4xl font-black text-emerald-400 drop-shadow">
                    {heroSlides[currentSlide].price}
                  </span>
                  {heroSlides[currentSlide]?.oldPrice && (
                    <span className="text-base sm:text-lg text-slate-300 line-through font-semibold">
                      {heroSlides[currentSlide].oldPrice}
                    </span>
                  )}
                </div>
              )}

              <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-xl drop-shadow-sm">
                {heroSlides[currentSlide]?.subtitle || 'Akvaryum balıkları, nadir karides türleri, su altı bitkileri ve yüksek kaliteli ekipmanlar.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {heroSlides[currentSlide]?.buttonText && (
                  <Link
                    to={heroSlides[currentSlide]?.buttonLink || '/category/shrimp'}
                    className="btn-zen text-xs sm:text-sm uppercase tracking-wider font-black py-4 px-8 shadow-2xl shadow-emerald-950/80 hover:scale-[1.03] transition-all flex items-center gap-2"
                  >
                    <span>{heroSlides[currentSlide]?.buttonText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
                <Link
                  to="/category/fish"
                  className="bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-xl text-xs sm:text-sm uppercase tracking-wider font-bold py-4 px-7 rounded-xl transition-all shadow-lg"
                >
                  Tüm Canlılar
                </Link>
              </div>
            </div>

            {/* Bottom Controls & Dots Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === currentSlide ? 'w-10 bg-emerald-400' : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slayt ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-slate-950/80 hover:bg-emerald-600 text-white border border-white/20 flex items-center justify-center backdrop-blur-xl transition-all shadow-lg hover:scale-105"
                  aria-label="Önceki"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-slate-950/80 hover:bg-emerald-600 text-white border border-white/20 flex items-center justify-center backdrop-blur-xl transition-all shadow-lg hover:scale-105"
                  aria-label="Sonraki"
                >
                  ›
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Logo Loop - Trust Indicators */}
      <div className="my-6">
        <LogoLoop />
      </div>

      {/* Category Pill Tags Navigation */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
          {[
            { id: 'fish', name: 'Balıklar', icon: '🐠', count: 'Canlı Türleri' },
            { id: 'shrimp', name: 'Karidesler', icon: '🦐', count: 'Nadir 50+ Tür' },
            { id: 'plants', name: 'Bitkiler', icon: '🌿', count: 'Canlı Akvaryum' },
            { id: 'equipment', name: 'Ekipmanlar', icon: '⚙️', count: 'Filtre & Isıtıcı' },
            { id: 'accessories', name: 'Sağlık & Bakım', icon: '🧪', count: 'Su Düzenleyici' },
            { id: 'food', name: 'Yemler', icon: '🍂', count: 'Kaliteli Yemler' }
          ].map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 hover:bg-slate-900 border border-slate-200/80 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 shrink-0 transform hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 group-hover:text-white transition-colors tracking-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-emerald-300 font-medium transition-colors">
                  {cat.count}
                </span>
              </div>
              <span className="text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all text-xs ml-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Premium Tabbed Filter Product Showcase */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-[36px] p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          
          {/* Header & Interactive Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-600 tracking-widest uppercase mb-1 block">
                Özel Koleksiyonlarımız
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Keşfedin & Seçin
              </h2>
            </div>

            {/* Tab Pill Buttons */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveShowcaseTab('featured')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeShowcaseTab === 'featured'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                🔥 Öne Çıkanlar ({featuredProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveShowcaseTab('new')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeShowcaseTab === 'new'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                ✨ Yeni Gelenler ({newProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveShowcaseTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeShowcaseTab === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                🐟 Tüm Canlılar ({products.length})
              </button>
            </div>
          </div>

          {/* Product Grid Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {activeShowcaseTab === 'featured' && (
              visibleFeatured.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))
            )}

            {activeShowcaseTab === 'new' && (
              visibleNew.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))
            )}

            {activeShowcaseTab === 'all' && (
              products.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))
            )}
          </div>

          {/* Bottom All Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/category/fish"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-900/20 hover:scale-[1.02] transition-all"
            >
              <span>Tüm Mağaza Kataloğunu İncele</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      <ContactSection />
      {/* Google Reviews Section */}
      <GoogleReviews />
    </div>
  );
};

export default HomePage;
