import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');

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

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = `Merhaba! Sipariş vermek istiyorum: ${product.name} - ${product.price.toFixed(2)}₺. Stok durumu ve teslimat hakkında bilgi verebilir misiniz?`;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-primary-600 transition-colors duration-200">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link 
                to={`/category/${product.category}`} 
                className="hover:text-primary-600 transition-colors duration-200 capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              {product.new && (
                <span className="absolute top-4 left-4 bg-secondary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  New
                </span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  ₺{product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                                       <span className="text-green-600 font-medium flex items-center gap-1">
                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                     Stokta
                   </span>
                  ) : (
                                       <span className="text-red-600 font-medium flex items-center gap-1">
                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                     Stokta Yok
                   </span>
                  )}
                </div>
              </div>
            </div>

                         <div>
               <h3 className="text-lg font-semibold text-gray-800 mb-2">Açıklama</h3>
               <p className="text-gray-600 leading-relaxed">{product.description}</p>
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

            {/* WhatsApp Order Button */}
            <div className="pt-6">
              {product.inStock ? (
                <WhatsAppButton
                  message={whatsappMessage}
                  className="py-3 px-6 text-lg w-full"
                >
                  WhatsApp ile Sipariş Ver
                </WhatsAppButton>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Bu ürün şu anda stokta bulunmuyor.</p>
                  <WhatsAppButton
                    message="Merhaba! Bu ürünün ne zaman stokta olacağını öğrenmek istiyorum."
                    className="w-full text-lg py-4"
                  >
                    Stok Durumu Sorgula
                  </WhatsAppButton>
                </div>
              )}
            </div>

            {/* Additional Info */}
                         <div className="bg-primary-50 p-6 rounded-xl">
               <h4 className="font-semibold text-primary-800 mb-2">Yardıma mı ihtiyacınız var?</h4>
               <p className="text-primary-700 text-sm mb-3">
                 Bu ürün hakkında sorularınız mı var? Akvaryum uzmanlarımız size yardımcı olmak için burada!
               </p>
               <WhatsAppButton
                 message="Merhaba! Ürünlerinizden biri hakkında sorum var. Yardımcı olabilir misiniz?"
                 variant="inline"
                 className="text-sm"
               >
                 Uzmanla Sohbet Et
               </WhatsAppButton>
             </div>
          </div>
        </div>

        {/* Related Products */}
                 {relatedProducts.length > 0 && (
           <section className="border-t border-gray-200 pt-12">
             <h2 className="text-2xl font-bold text-gray-800 mb-8">İlgili Ürünler</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
