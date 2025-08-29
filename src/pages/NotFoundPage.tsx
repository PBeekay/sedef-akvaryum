import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h1>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          
          <div className="text-sm text-gray-500">
            Veya şu sayfaları ziyaret edebilirsiniz:
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/category/shrimp"
              className="block bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              🦐 Karidesler
            </Link>
            <Link
              to="/category/fish"
              className="block bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              🐠 Balıklar
            </Link>
            <Link
              to="/category/food"
              className="block bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              🍖 Yemler
            </Link>
            <Link
              to="/contact"
              className="block bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              📞 İletişim
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sorun devam ederse{' '}
            <a
              href="https://wa.me/905555555555"
              className="text-primary-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>{' '}
            üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
