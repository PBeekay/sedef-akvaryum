import React from 'react';
import { usePWA } from '../hooks/usePWA';

const OfflinePage: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-4">📶</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          İnternet Bağlantısı Yok
        </h2>
        <p className="text-gray-600 mb-6">
          Şu anda çevrimdışı moddasınız. Bazı özellikler kullanılamayabilir.
        </p>
        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Ürün kataloğu görüntülenebilir
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Rehber içerikleri erişilebilir
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            WhatsApp siparişi gönderilemez
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 btn-primary"
        >
          Yenile
        </button>
      </div>
    </div>
  );
};

export default OfflinePage;
