import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import ImageGallery from '../components/ImageGallery';
import SEO from '../components/SEO';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);
  const product = products.find(p => p.id === id);
  
  // Debug: Bitki ürünleri için console log (sadece development)
  if (process.env.NODE_ENV === 'development' && product && product.category === 'plants') {
    console.log('Plant product data:', {
      id: product.id,
      name: product.name,
      lightRequirement: product.lightRequirement,
      co2Requirement: product.co2Requirement,
      growthRate: product.growthRate,
      careInfo: product.careInfo,
      quickInfo: product.quickInfo,
      hasLightReq: !!product.lightRequirement,
      hasCo2Req: !!product.co2Requirement,
      hasGrowthRate: !!product.growthRate
    });
  }

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 h-10 bg-gray-200 rounded animate-pulse w-64" />
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız ürün mevcut değil.</p>
          <Link to="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = `Merhaba! Sipariş vermek istiyorum: ${product.name} - ${product.price.toFixed(2)}₺. Stok durumu ve teslimat hakkında bilgi verebilir misiniz?`;
  
  // Prepare images array (use images if available, fallback to single image)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image ? [product.image] : [];

  // Get category name in Turkish
  const categoryNames: Record<string, string> = {
    fish: 'Süs Balığı',
    shrimp: 'Akvaryum Karidesi',
    plants: 'Akvaryum Bitkisi',
    equipment: 'Akvaryum Ekipmanı',
    accessories: 'Akvaryum Aksesuarı',
    food: 'Akvaryum Yemi'
  };
  const categoryName = categoryNames[product.category] || 'Akvaryum Ürünü';

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <SEO
        title={`${product.name} - ${categoryName} | Sedef Akvaryum Eskişehir`}
        description={`${product.name} - ${product.description || `${categoryName} satışı`}. Akvaryum ürünleri ve malzemeleri Eskişehir'de. Fiyat: ${product.price.toFixed(2)}₺. Hızlı teslimat ve uzman danışmanlık.`}
        keywords={`${product.name}, ${categoryName.toLowerCase()}, akvaryum, akvaryum malzemeleri, eskişehir akvaryum, ${product.category}, akvaryum ürünleri`}
        image={productImages[0] || 'https://sedefakvaryum.com.tr/shrimp.png'}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description || `${categoryName} - ${product.name}`,
          "image": productImages,
          "brand": {
            "@type": "Brand",
            "name": "Sedef Akvaryum"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://sedefakvaryum.com.tr/product/${product.id}`,
            "priceCurrency": "TRY",
            "price": product.price.toFixed(2),
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "Sedef Akvaryum"
            }
          },
          "category": categoryName,
          "sku": product.id
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb - Enhanced */}
        <nav className="mb-8 animate-fade-in">
          <ol className="flex items-center space-x-2 text-sm bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-gray-100">
            <li>
              <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Ana Sayfa
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link 
                to={`/category/${product.category}`} 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200 capitalize font-medium"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-800 font-semibold truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-slide-up">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Image Gallery Component */}
            <ImageGallery images={productImages} productName={product.name} />
            
            {/* Badges Below Gallery */}
            <div className="flex gap-2">
              {product.new && (
                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                  <span>✨</span> Yeni
                </span>
              )}
              {product.featured && (
                <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                  <span>⭐</span> Öne Çıkan
                </span>
              )}
              {!product.inStock && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                  Stokta Yok
                </span>
              )}
            </div>
            
            {/* Product Info Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-200">
                <div className="text-2xl mb-1">✓</div>
                <div className="text-xs font-semibold text-green-700">Kalite Garantisi</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center border border-blue-200">
                <div className="text-2xl mb-1">🚚</div>
                <div className="text-xs font-semibold text-blue-700">Hızlı Teslimat</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center border border-purple-200">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs font-semibold text-purple-700">Uzman Desteği</div>
              </div>
            </div>

            {/* WhatsApp Buttons */}
            <div className="space-y-4">
              {/* WhatsApp Order Button */}
              {product.inStock ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                  <WhatsAppButton
                    message={whatsappMessage}
                    className="relative py-3 px-6 text-base w-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">💬</span>
                      WhatsApp ile Sipariş Ver
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </WhatsAppButton>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border-2 border-red-200">
                  <p className="text-red-700 font-semibold mb-3 text-center text-sm">⚠️ Bu ürün şu anda stokta bulunmuyor.</p>
                  <WhatsAppButton
                    message="Merhaba! Bu ürünün ne zaman stokta olacağını öğrenmek istiyorum."
                    className="w-full text-sm py-2 font-bold"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>🔔</span>
                      Stok Durumu Sorgula
                    </span>
                  </WhatsAppButton>
                </div>
              )}

              {/* WhatsApp Expert Chat Button */}
              <div className="bg-gradient-to-br from-primary-50 to-ocean-50 p-4 rounded-xl border border-primary-200">
                <h4 className="font-bold text-sm text-primary-800 mb-2 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  Yardıma mı ihtiyacınız var?
                </h4>
                <p className="text-primary-700 mb-3 text-xs leading-relaxed">
                  Bu ürün hakkında sorularınız mı var? Akvaryum uzmanlarımız size yardımcı olmak için burada!
                </p>
                <WhatsAppButton
                  message="Merhaba! Ürünlerinizden biri hakkında sorum var. Yardımcı olabilir misiniz?"
                  variant="inline"
                  className="text-sm font-semibold hover:underline"
                >
                  👨‍💼 Uzmanla Sohbet Et →
                </WhatsAppButton>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price Section */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-ocean-100 via-primary-100 to-secondary-100 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-primary-100">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {product.name}
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-accent-500 to-accent-600 bg-clip-text text-transparent">
                      ₺{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">₺{(product.price * 1.2).toFixed(2)}</span>
                  </div>
                  
                  {/* Stock Badge */}
                  <div>
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-bold rounded-full border-2 border-green-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        Stokta Var
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 font-bold rounded-full border-2 border-red-300">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        Stokta Yok
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Rating Stars (Mock) */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="text-xl">{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(24 değerlendirme)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ürün Açıklaması
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Quick Info - For Fish (New Firebase Structure) */}
            {product.quickInfo && product.category === 'fish' && (
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.quickInfo.size && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">📏</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Boyut</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.size}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.temperament && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">😊</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Mizaç</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.temperament}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.careLevel && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">⭐</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Bakım</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.careLevel}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Care Info - For Fish (New Firebase Structure) */}
            {product.careInfo && product.category === 'fish' && (
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Bakım Bilgileri
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.careInfo.diet && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🍽️</span>
                      <div>
                        <p className="text-xs text-gray-600">Beslenme</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.diet}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.family && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🐟</span>
                      <div>
                        <p className="text-xs text-gray-600">Aile</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.family}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.origin && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🌍</span>
                      <div>
                        <p className="text-xs text-gray-600">Menşei</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.origin}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.aquariumSize && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🏠</span>
                      <div>
                        <p className="text-xs text-gray-600">Akvaryum</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.aquariumSize}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.lifespan && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">⏳</span>
                      <div>
                        <p className="text-xs text-gray-600">Yaşam Süresi</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.lifespan}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Info - For Shrimp (New Firebase Structure) */}
            {product.quickInfo && product.category === 'shrimp' && (
              <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.quickInfo.size && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">📏</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Boyut</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.size}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.temperament && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">😊</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Mizaç</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.temperament}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.careLevel && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">⭐</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Bakım</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.careLevel}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Care Info - For Shrimp (New Firebase Structure) */}
            {product.careInfo && product.category === 'shrimp' && (
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Bakım Bilgileri
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.careInfo.diet && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🍽️</span>
                      <div>
                        <p className="text-xs text-gray-600">Beslenme</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.diet}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.family && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🦐</span>
                      <div>
                        <p className="text-xs text-gray-600">Aile</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.family}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.origin && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🌍</span>
                      <div>
                        <p className="text-xs text-gray-600">Menşei</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.origin}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.aquariumSize && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🏠</span>
                      <div>
                        <p className="text-xs text-gray-600">Akvaryum</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.aquariumSize}</p>
                      </div>
                    </div>
                  )}
                  {product.careInfo.lifespan && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">⏳</span>
                      <div>
                        <p className="text-xs text-gray-600">Yaşam Süresi</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.lifespan}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Plant Quick Info - For Plants (New Firebase Structure) */}
            {product.quickInfo && product.category === 'plants' && (
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 border-2 border-emerald-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.79-3 4s1.343 4 3 4 3-1.79 3-4-1.343-4-3-4z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.quickInfo.size && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">📏</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Boyut</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.size}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.temperament && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">🌿</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Tip</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.temperament}</p>
                      </div>
                    </div>
                  )}
                  {product.quickInfo.careLevel && (
                    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">⭐</span>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Bakım</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.quickInfo.careLevel}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Plant Care Info - For Plants (New Firebase Structure) */}
            {product.careInfo && product.category === 'plants' && (
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Bakım Bilgileri
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.careInfo.origin && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">🌍</span>
                      <div>
                        <p className="text-xs text-gray-600">Menşei</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.careInfo.origin}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Plant Quick Info - For Plants (Old Structure - Backward Compatibility) */}
            {!product.quickInfo && product.category === 'plants' && (product.difficulty || product.species) && (
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 border-2 border-emerald-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.79-3 4s1.343 4 3 4 3-1.79 3-4-1.343-4-3-4z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.difficulty && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="text-xs text-gray-600">Zorluk</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.difficulty === 'Çok Kolay' || product.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                          product.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.difficulty}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.species && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">🧬</span>
                      <div>
                        <p className="text-xs text-gray-600">Tür</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.species}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Plant Care Info - For Plants (Old Structure - Backward Compatibility) */}
            {product.category === 'plants' && (product.lightRequirement || product.co2Requirement || product.growthRate) && (
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Bakım Bilgileri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.lightRequirement && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="text-xs text-gray-600">Işık İhtiyacı</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.lightRequirement === 'Düşük' || product.lightRequirement === 'Düşük-Orta' ? 'bg-green-100 text-green-700' :
                          product.lightRequirement === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.lightRequirement}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.co2Requirement && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">🫧</span>
                      <div>
                        <p className="text-xs text-gray-600">CO2 İhtiyacı</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.co2Requirement === 'Gerekli değil' || product.co2Requirement === 'Opsiyonel' ? 'bg-green-100 text-green-700' :
                          product.co2Requirement === 'Düşük' || product.co2Requirement === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.co2Requirement}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.growthRate && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-2xl">🌱</span>
                      <div>
                        <p className="text-xs text-gray-600">Büyüme Hızı</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.growthRate === 'Çok Yavaş' || product.growthRate === 'Yavaş' ? 'bg-green-100 text-green-700' :
                          product.growthRate === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.growthRate}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Specs - For Fish (Old Structure - Backward Compatibility) */}
            {!product.quickInfo && product.category === 'fish' && (product.size || product.difficulty || product.tankSize) && (
              <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.size && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                      <span className="text-xl">📏</span>
                      <div>
                        <p className="text-xs text-gray-600">Boyut</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.size}</p>
                      </div>
                    </div>
                  )}
                  {product.difficulty && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                      <span className="text-xl">⭐</span>
                      <div>
                        <p className="text-xs text-gray-600">Bakım</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.difficulty === 'Çok Kolay' || product.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                          product.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.difficulty}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.tankSize && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg col-span-2">
                      <span className="text-xl">🏠</span>
                      <div>
                        <p className="text-xs text-gray-600">Tank Boyutu</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.tankSize}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Specs - For Shrimp (Old Structure - Backward Compatibility) */}
            {!product.quickInfo && product.category === 'shrimp' && (product.size || product.difficulty || product.tankSize) && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Hızlı Bilgiler
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.size && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                      <span className="text-xl">📏</span>
                      <div>
                        <p className="text-xs text-gray-600">Boyut</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.size}</p>
                      </div>
                    </div>
                  )}
                  {product.difficulty && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                      <span className="text-xl">⭐</span>
                      <div>
                        <p className="text-xs text-gray-600">Bakım</p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          product.difficulty === 'Çok Kolay' || product.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                          product.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.difficulty}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.tankSize && (
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg col-span-2">
                      <span className="text-xl">🏠</span>
                      <div>
                        <p className="text-xs text-gray-600">Tank Boyutu</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.tankSize}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

                         {/* Su Parametreleri - Only for fish and shrimp */}
                         {product.waterParameters && (product.category === 'fish' || product.category === 'shrimp') && (
                           <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl shadow-lg text-white">
                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                               </svg>
                               Su Parametreleri
                             </h3>
                             <div className="grid grid-cols-3 gap-4">
                               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                                 <div className="text-2xl mb-2">🌡️</div>
                                 <p className="text-xs text-white/80 mb-1">Sıcaklık</p>
                                 <p className="font-bold text-lg">{product.waterParameters.temperature}</p>
                               </div>
                               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                                 <div className="text-2xl mb-2">⚗️</div>
                                 <p className="text-xs text-white/80 mb-1">pH Seviyesi</p>
                                 <p className="font-bold text-lg">{product.waterParameters.pH}</p>
                               </div>
                               <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                                 <div className="text-2xl mb-2">💧</div>
                                 <p className="text-xs text-white/80 mb-1">Sertlik</p>
                                 <p className="font-bold text-lg">{product.waterParameters.hardness}</p>
                               </div>
                             </div>
                           </div>
                         )}

                         {/* Renkler - Karides için */}
                         {product.colors && product.colors.length > 0 && (
                           <div className="bg-white p-5 rounded-xl border border-gray-200">
                             <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                               <span className="text-xl">🎨</span>
                               Renk Çeşitleri
                             </h4>
                             <div className="flex flex-wrap gap-2">
                               {product.colors.map((color, index) => (
                                 <span key={index} className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-primary-200">
                                   {color}
                                 </span>
                               ))}
                             </div>
                           </div>
                         )}

                         {/* Bakım ve Davranış Bilgileri */}
                         {(product.socialBehavior || product.diet || product.breeding || product.lifespan) && (
                           <div className="bg-white p-5 rounded-xl border border-gray-200">
                             <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                               <span className="text-xl">🐠</span>
                               Bakım Bilgileri
                             </h3>
                             <div className="space-y-3">
                               {product.socialBehavior && (
                                 <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                   <span className="text-2xl">👥</span>
                                   <div>
                                     <p className="text-xs text-gray-600 mb-1">Sosyal Davranış</p>
                                     <p className="font-medium text-gray-900 text-sm">{product.socialBehavior}</p>
                                   </div>
                                 </div>
                               )}
                               {product.diet && (
                                 <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                   <span className="text-2xl">🍽️</span>
                                   <div>
                                     <p className="text-xs text-gray-600 mb-1">Beslenme</p>
                                     <p className="font-medium text-gray-900 text-sm">{product.diet}</p>
                                   </div>
                                 </div>
                               )}
                               {product.breeding && (
                                 <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                   <span className="text-2xl">🥚</span>
                                   <div>
                                     <p className="text-xs text-gray-600 mb-1">Üretim</p>
                                     <p className="font-medium text-gray-900 text-sm">{product.breeding}</p>
                                   </div>
                                 </div>
                               )}
                               {product.lifespan && (
                                 <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                   <span className="text-2xl">⏳</span>
                                   <div>
                                     <p className="text-xs text-gray-600 mb-1">Yaşam Süresi</p>
                                     <p className="font-medium text-gray-900 text-sm">{product.lifespan}</p>
                                   </div>
                                 </div>
                               )}
                             </div>
                           </div>
                         )}

                         {/* Bakım İpuçları */}
                         {(product.category === 'shrimp' || product.category === 'fish') && (
                           <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                             <h3 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2">
                               <span className="text-xl">💡</span>
                               Bakım İpuçları
                             </h3>
                             <ul className="space-y-2">
                               <li className="flex items-start gap-2 text-sm text-gray-700">
                                 <span className="text-green-600 font-bold mt-0.5">✓</span>
                                 <span>Düzenli su değişimi yapın (haftada %20-30)</span>
                               </li>
                               <li className="flex items-start gap-2 text-sm text-gray-700">
                                 <span className="text-green-600 font-bold mt-0.5">✓</span>
                                 <span>Su parametrelerini düzenli kontrol edin</span>
                               </li>
                               <li className="flex items-start gap-2 text-sm text-gray-700">
                                 <span className="text-green-600 font-bold mt-0.5">✓</span>
                                 <span>Yeterli saklanma yeri sağlayın</span>
                               </li>
                               <li className="flex items-start gap-2 text-sm text-gray-700">
                                 <span className="text-green-600 font-bold mt-0.5">✓</span>
                                 <span>Kaliteli yem ve dengeli beslenme</span>
                               </li>
                               {product.tankSize && (
                                 <li className="flex items-start gap-2 text-sm text-gray-700">
                                   <span className="text-green-600 font-bold mt-0.5">✓</span>
                                   <span>Minimum tank boyutu: {product.tankSize}</span>
                                 </li>
                               )}
                             </ul>
                           </div>
                         )}

                         {/* Renk - Balıklar için */}
                         {product.color && product.category === 'fish' && (
                           <div className="bg-white p-5 rounded-xl border border-gray-200">
                             <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                               <span className="text-xl">🎨</span>
                               Renk
                             </h4>
                             <span className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-primary-200">
                               {product.color}
                             </span>
                           </div>
                         )}

          </div>
        </div>

        {/* Related Products - Enhanced */}
        {relatedProducts.length > 0 && (
          <section className="relative mt-20 pt-12 border-t-2 border-gray-200">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-semibold">
                  🔗 Benzer Ürünler
                </span>
              </div>
              <h2 className="text-4xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  İlgili Ürünler
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bu ürünü beğendiniz mi? İşte sizin için seçtiğimiz benzer ürünler.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
