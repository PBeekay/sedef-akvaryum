import React from 'react';
import { Product } from '../../types/Product';
import ProductSpecs from './ProductSpecs';

interface ProductInformationProps {
    product: Product;
}

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
    return (
        <div className="space-y-6">
            {/* Title & Price Section */}
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-ocean-100 via-primary-100 to-secondary-100 rounded-2xl blur-xl opacity-30"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-primary-100">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
                        {product.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-primary-700">
                                ₺{product.price.toFixed(2)}
                            </span>
                            <span className="text-lg text-gray-400 line-through font-medium">₺{(product.price * 1.2).toFixed(2)}</span>
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

            {/* Detailed Specs and Care Info */}
            <ProductSpecs product={product} />

        </div>
    );
};

export default ProductInformation;
