import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories, getFeaturedProducts, getNewProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import PWAInstallButton from '../components/PWAInstallButton';
import ReviewsSlider from '../components/ReviewsSlider';
import { useAdmin } from '../context/AdminContext';
// import shrimpImage from '../assets/shrimp.jpeg';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const { sliderData } = useAdmin();

  // Hero slider data from admin context
  const heroSlides = sliderData;

  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Debug: Log current slide (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Current slide:', currentSlide, heroSlides[currentSlide]?.title);
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
             {/* Hero Section with Slider */}
       <section className="relative bg-gradient-to-br from-ocean-600 via-primary-600 to-secondary-500 text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in relative z-10">
              <div className="transition-all duration-500 ease-in-out">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Hoş Geldiniz{' '}
                  <span className="text-yellow-300">Sedef Akvaryum</span>
                </h1>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-yellow-200">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-lg text-gray-100 mb-4">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <p className="text-xl text-gray-100">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={heroSlides[currentSlide].buttonLink}
                    className="btn-primary text-center"
                  >
                    {heroSlides[currentSlide].buttonText}
                  </Link>
                  <PWAInstallButton className="btn-outline border-white text-white hover:bg-white hover:text-primary-600" />
                </div>
              </div>
            </div>

                                      {/* Image Slider */}
              <div className="animate-slide-up relative w-full">
               <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-96">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                  >
                                                                                          <img
                           src={slide.image}
                           alt={slide.title}
                           className="w-full h-96 object-cover"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             console.error('❌ Image failed to load:', slide.title, slide.image);
                             // Fallback to gradient background
                             target.style.display = 'none';
                             const parent = target.parentElement;
                             if (parent) {
                               parent.innerHTML = `
                                 <div class="w-full h-96 flex items-center justify-center text-white text-4xl font-bold"
                                      style="background: ${slide.id === 1 ? 'linear-gradient(135deg, #1a237e, #3949ab)' :
                                                          slide.id === 2 ? 'linear-gradient(135deg, #4a148c, #8e24aa)' :
                                                          'linear-gradient(135deg, #d84315, #f4511e)'}">
                                   <div class="text-center">
                                     <div class="text-6xl mb-4">${slide.icon}</div>
                                     <div class="text-2xl">${slide.title}</div>
                                   </div>
                                 </div>
                               `;
                             }
                           }}
                           onLoad={() => {
                             console.log('✅ Image loaded successfully:', slide.title);
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
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
                aria-label="Önceki slayt"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
                aria-label="Sonraki slayt"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-yellow-300' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kategorilerimizi Keşfedin
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sevimli balıklardan temel aksesuarlara kadar, dostlarınıza en iyi bakımı 
              sağlamak için ihtiyacınız olan her şeye sahibiz.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
                             <Link
                 key={category.id}
                 to={`/category/${category.id}`}
                 className="group bg-gradient-to-br from-white to-ocean-50 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-ocean-100"
               >
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Müşterilerimizin en çok sevdiği popüler ve yüksek puanlı ürünlerimiz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/category/fish"
              className="btn-primary"
            >
              🐠 Balıkları Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Yeni Gelenler
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ailemize katılan en son üyelerimizi keşfedin.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Neden Sedef Akvaryum?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Kalite Garantisi</h3>
                    <p className="text-gray-600">Tüm balıklarımız ve ürünlerimiz en yüksek kalite standartlarını karşılar.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Uzman Desteği</h3>
                    <p className="text-gray-600">Akvaryum uzmanlarımızdan oluşan ekibimiz en iyi seçimleri yapmanıza yardımcı olur.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Kolay Sipariş</h3>
                    <p className="text-gray-600">Hızlı ve kolay alışveriş deneyimi için WhatsApp üzerinden sipariş verin.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1587764379873-97837921fd44?w=600&h=400&fit=crop"
                alt="Pet care"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

             {/* Google Reviews Section */}
       <section className="py-16 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             <ReviewsSlider />
           </div>
         </div>
       </section>
    </div>
  );
};

export default HomePage;
