import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import SEO from '../components/SEO';
import ProductVisuals from '../components/product/ProductVisuals';
import ProductInformation from '../components/product/ProductInformation';
import MobileStickyAction from '../components/product/MobileStickyAction';
import { getCategoryName } from '../data/categoryConfig';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdmin();

  // Find product directly from context
  const product = products.find(p => p.id === id);

  // If products are not loaded yet or product not found, we might want to show loading or not found
  // However, AdminContext usually initializes with empty array. 
  // If we really want to check "loading" vs "not found", we might need a loading state from context.
  // For now, if products array is empty, it might be loading.
  if (products.length === 0) {
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

  const whatsappMessage = `Merhaba, Sedef Akvaryum web sitenizden yazıyorum. Şu ürün için sipariş oluşturmak istiyorum:

Ürün: ${product.name}
Fiyat: ${product.price.toFixed(2)}₺
Link: https://sedefakvaryum.com.tr/product/${product.id}

Stok durumu ve teslimat hakkında bilgi alabilir miyim?`;

  // Prepare images array (use images if available, fallback to single image)
  const productImages = product.images && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [];

  // Get category name in Turkish
  const categoryName = getCategoryName(product.category);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
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

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-slide-up">
          {/* Left Column: Visuals & Actions */}
          <ProductVisuals
            product={product}
            productImages={productImages}
            whatsappMessage={whatsappMessage}
          />

          {/* Right Column: Information & Specs */}
          <ProductInformation product={product} />
        </div>

        {/* Mobile Sticky Action Bar */}
        <MobileStickyAction product={product} whatsappMessage={whatsappMessage} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
