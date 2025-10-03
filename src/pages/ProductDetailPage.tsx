import React from 'react';
import { useParams, Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdmin();
  const product = products.find(p => p.id === id);
  // Removed selectedImageIndex since we're using single image now

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

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-white">
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
            {/* Main Image - Enhanced */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-ocean-400 via-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {product.new && (
                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                      <span>✨</span> Yeni
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <span>⭐</span> Öne Çıkan
                    </span>
                  )}
                </div>
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                    <div className="text-center">
                      <span className="text-white text-2xl font-bold block mb-2">Stokta Yok</span>
                      <span className="text-gray-300 text-sm">Yakında Stokta</span>
                    </div>
                  </div>
                )}
                
                {/* Zoom Hint */}
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🔍 Yakınlaştır
                </div>
              </div>
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price Section */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-ocean-100 via-primary-100 to-secondary-100 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-primary-100">
                <h1 className="text-4xl font-extrabold mb-4">
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
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-primary-500 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Açıklama
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
            </div>

                         {/* Karides Özellikleri */}
                         {product.category === 'shrimp' && (
                           <div className="space-y-6">
                             <h3 className="text-lg font-semibold text-gray-800">Karides Özellikleri</h3>
                             
                             {/* Renkler */}
                             {product.colors && (
                               <div className="bg-gradient-to-br from-secondary-50 to-accent-50 p-4 rounded-lg border border-secondary-200">
                                 <h4 className="font-medium text-secondary-800 mb-2">Renkler</h4>
                                 <div className="flex flex-wrap gap-2">
                                   {product.colors.map((color, index) => (
                                     <span key={index} className="bg-white text-secondary-700 px-3 py-1 rounded-full text-sm border border-secondary-200">
                                       {color}
                                     </span>
                                   ))}
                                 </div>
                               </div>
                             )}
                             
                             {/* Su Parametreleri */}
                             {product.waterParameters && (
                               <div className="bg-gradient-to-br from-ocean-50 to-primary-50 p-4 rounded-lg border border-ocean-200">
                                 <h4 className="font-medium text-ocean-800 mb-3">Su Parametreleri</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">Sıcaklık</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.temperature}</p>
                                   </div>
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">pH</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.pH}</p>
                                   </div>
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">Sertlik</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.hardness}</p>
                                   </div>
                                 </div>
                               </div>
                             )}
                             
                             {/* Diğer Özellikler */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {product.size && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Boyut</p>
                                   <p className="font-medium text-gray-800">{product.size}</p>
                                 </div>
                               )}
                               {product.difficulty && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Bakım Zorluğu</p>
                                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                     product.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                                     product.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                                     'bg-red-100 text-red-700'
                                   }`}>
                                     {product.difficulty}
                                   </span>
                                 </div>
                               )}
                               {product.socialBehavior && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Sosyal Davranış</p>
                                   <p className="font-medium text-gray-800">{product.socialBehavior}</p>
                                 </div>
                               )}
                               {product.breeding && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Üretim</p>
                                   <p className="font-medium text-gray-800">{product.breeding}</p>
                                 </div>
                               )}
                               {product.diet && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Beslenme</p>
                                   <p className="font-medium text-gray-800">{product.diet}</p>
                                 </div>
                               )}
                               {product.lifespan && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Yaşam Süresi</p>
                                   <p className="font-medium text-gray-800">{product.lifespan}</p>
                                 </div>
                               )}
                               {product.tankSize && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Minimum Tank Boyutu</p>
                                   <p className="font-medium text-gray-800">{product.tankSize}</p>
                                 </div>
                               )}
                             </div>
                           </div>
                         )}

                         {/* Balık Özellikleri */}
                         {product.category === 'fish' && (
                           <div className="space-y-6">
                             <h3 className="text-lg font-semibold text-gray-800">Balık Özellikleri</h3>
                             
                             {/* Renk */}
                             {product.color && (
                               <div className="bg-gradient-to-br from-primary-50 to-ocean-50 p-4 rounded-lg border border-primary-200">
                                 <h4 className="font-medium text-primary-800 mb-2">Renk</h4>
                                 <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-sm border border-primary-200">
                                   {product.color}
                                 </span>
                               </div>
                             )}
                             
                             {/* Su Parametreleri */}
                             {product.waterParameters && (
                               <div className="bg-gradient-to-br from-ocean-50 to-primary-50 p-4 rounded-lg border border-ocean-200">
                                 <h4 className="font-medium text-ocean-800 mb-3">Su Parametreleri</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">Sıcaklık</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.temperature}</p>
                                   </div>
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">pH</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.pH}</p>
                                   </div>
                                   <div className="text-center">
                                     <p className="text-sm text-ocean-600">Sertlik</p>
                                     <p className="font-medium text-ocean-800">{product.waterParameters.hardness}</p>
                                   </div>
                                 </div>
                               </div>
                             )}
                             
                             {/* Diğer Özellikler */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {product.size && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Boyut</p>
                                   <p className="font-medium text-gray-800">{product.size}</p>
                                 </div>
                               )}
                               {product.difficulty && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Bakım Zorluğu</p>
                                   <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                     product.difficulty === 'Çok Kolay' || product.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                                     product.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                                     'bg-red-100 text-red-700'
                                   }`}>
                                     {product.difficulty}
                                   </span>
                                 </div>
                               )}
                               {product.socialBehavior && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Sosyal Davranış</p>
                                   <p className="font-medium text-gray-800">{product.socialBehavior}</p>
                                 </div>
                               )}
                               {product.breeding && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Üretim</p>
                                   <p className="font-medium text-gray-800">{product.breeding}</p>
                                 </div>
                               )}
                               {product.diet && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Beslenme</p>
                                   <p className="font-medium text-gray-800">{product.diet}</p>
                                 </div>
                               )}
                               {product.lifespan && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Yaşam Süresi</p>
                                   <p className="font-medium text-gray-800">{product.lifespan}</p>
                                 </div>
                               )}
                               {product.tankSize && (
                                 <div className="bg-gray-50 p-4 rounded-lg">
                                   <p className="text-sm text-gray-600">Minimum Tank Boyutu</p>
                                   <p className="font-medium text-gray-800">{product.tankSize}</p>
                                 </div>
                               )}
                             </div>
                           </div>
                         )}

                         <div className="space-y-4">
               <h3 className="text-lg font-semibold text-gray-800">Ürün Detayları</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-sm text-gray-600">Kategori</p>
                   <p className="font-medium text-gray-800 capitalize">{product.category}</p>
                 </div>
                                   <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Fiyat</p>
                    <p className="font-medium text-gray-800">{product.price.toFixed(2)}₺</p>
                  </div>
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-sm text-gray-600">Stok Durumu</p>
                   <p className="font-medium text-gray-800">
                     {product.inStock ? 'Mevcut' : 'Stokta Yok'}
                   </p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-sm text-gray-600">Ürün Kodu</p>
                   <p className="font-medium text-gray-800">{product.id}</p>
                 </div>
               </div>
             </div>

            {/* WhatsApp Order Button - Enhanced */}
            <div className="pt-6">
              {product.inStock ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                  <WhatsAppButton
                    message={whatsappMessage}
                    className="relative py-4 px-8 text-lg w-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-2xl">💬</span>
                      WhatsApp ile Sipariş Ver
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </WhatsAppButton>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border-2 border-red-200">
                  <p className="text-red-700 font-semibold mb-4 text-center">⚠️ Bu ürün şu anda stokta bulunmuyor.</p>
                  <WhatsAppButton
                    message="Merhaba! Bu ürünün ne zaman stokta olacağını öğrenmek istiyorum."
                    className="w-full text-lg py-4 font-bold"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>🔔</span>
                      Stok Durumu Sorgula
                    </span>
                  </WhatsAppButton>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-ocean-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-primary-50 to-ocean-50 p-6 rounded-xl border border-primary-200 shadow-md">
                <h4 className="font-bold text-xl text-primary-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Yardıma mı ihtiyacınız var?
                </h4>
                <p className="text-primary-700 mb-4 leading-relaxed">
                  Bu ürün hakkında sorularınız mı var? Akvaryum uzmanlarımız size yardımcı olmak için burada!
                </p>
                <WhatsAppButton
                  message="Merhaba! Ürünlerinizden biri hakkında sorum var. Yardımcı olabilir misiniz?"
                  variant="inline"
                  className="text-base font-semibold hover:underline"
                >
                  👨‍💼 Uzmanla Sohbet Et →
                </WhatsAppButton>
              </div>
            </div>
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
