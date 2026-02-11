import React from 'react';
import { Product } from '../../types/Product';

interface ProductSpecsProps {
    product: Product;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
    return (
        <div className="space-y-6">
            {/* Quick Info - For Fish */}
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

            {/* Care Info - For Fish */}
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

            {/* Quick Info - For Shrimp */}
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

            {/* Care Info - For Shrimp */}
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

            {/* Plant Quick Info */}
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

            {/* Plant Care Info */}
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

            {/* Legacy Fallbacks (Backward Compatibility) */}
            {/* (Skipping full legacy duplication to encourage moving to new data format, 
          but keeping core ones if necessary, though 'quickInfo' check handles most) 
      */}

            {/* Water Parameters - Common */}
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

            {/* Colors (Shrimp) */}
            {product.colors && product.colors.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🎨</span>
                        Renk Çeşitleri
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {/* Note: Colors logic to be passed from parent or rendered here if full object available */}
                        {product.colors.map((color, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
                                {color}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductSpecs;
