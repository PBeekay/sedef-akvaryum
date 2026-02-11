import React from 'react';
import { Product } from '../../types/Product';
import ImageGallery from '../ImageGallery';
import WhatsAppButton from '../WhatsAppButton';

interface ProductVisualsProps {
    product: Product;
    productImages: string[];
    whatsappMessage: string;
}

const ProductVisuals: React.FC<ProductVisualsProps> = ({ product, productImages, whatsappMessage }) => {
    return (
        <div className="space-y-4">
            {/* Image Gallery Component with Real Picture Badge */}
            <div className="relative overflow-hidden rounded-2xl">
                <ImageGallery images={productImages} productName={product.name} />

                {['fish', 'shrimp', 'plants'].includes(product.category) && (
                    <div className="absolute top-4 left-0 z-20">
                        <div className="bg-red-600 text-white text-[10px] font-bold py-1 px-8 -rotate-45 transform -translate-x-[28px] shadow-sm uppercase tracking-wider border border-white/20">
                            Gerçek Resim
                        </div>
                    </div>
                )}
            </div>

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
                            message={`Merhaba, şu ürün stoklara gelince haber verebilir misiniz: ${product.name} (ID: ${product.id})`}
                            className="w-full text-sm py-2 font-bold"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span>🔔</span>
                                Gelince Haber Ver
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
                        message={`Merhaba, ${product.name} ürünü hakkında teknik destek almak istiyorum.`}
                        variant="inline"
                        className="text-sm font-semibold hover:underline"
                    >
                        👨‍💼 Uzmanla Sohbet Et →
                    </WhatsAppButton>
                </div>
            </div>
        </div>
    );
};

export default ProductVisuals;
