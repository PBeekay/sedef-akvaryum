import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-600 via-primary-600 to-secondary-500 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-bounce-gentle" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main 404 Content */}
        <div className="text-center mb-12 animate-fade-in">
          {/* Animated Fish/404 */}
          <div className="mb-8 relative inline-block">
            <div className="text-9xl md:text-[12rem] font-black text-white/20 select-none absolute inset-0 blur-sm">
              404
            </div>
            <div className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent relative animate-bounce-gentle">
              404
            </div>
            {/* Floating Fish */}
            <div className="absolute -right-20 top-10 text-6xl animate-bounce-gentle" style={{ animationDelay: '1s' }}>
              🐠
            </div>
            <div className="absolute -left-20 bottom-10 text-6xl animate-bounce-gentle" style={{ animationDelay: '2s' }}>
              🦐
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Oops! Sayfa Bulunamadı
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
            Aradığınız sayfa sular altında kaybolmuş gibi görünüyor... 🌊
          </p>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Belki de bu balıklar onu götürmüştür? Endişelenmeyin, sizi güvenli sulara geri götürelim!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6 animate-slide-up">
          <Link
            to="/"
            className="group relative block w-full max-w-md mx-auto overflow-hidden"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white px-8 py-5 rounded-2xl font-bold text-xl text-gray-800 hover:text-primary-600 transition-colors duration-300 flex items-center justify-center gap-3 shadow-2xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfaya Dön
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
          
          <div className="text-center">
            <p className="text-white/90 text-lg font-semibold mb-6">
              Veya popüler kategorilerimize göz atın:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Link
                to="/category/shrimp"
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:border-white/60 shadow-lg"
              >
                <span className="text-3xl block mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🦐</span>
                Karidesler
              </Link>
              <Link
                to="/category/fish"
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:border-white/60 shadow-lg"
              >
                <span className="text-3xl block mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🐠</span>
                Balıklar
              </Link>
              <Link
                to="/category/food"
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:border-white/60 shadow-lg"
              >
                <span className="text-3xl block mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🍖</span>
                Yemler
              </Link>
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:border-white/60 shadow-lg"
              >
                <span className="text-3xl block mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">📞</span>
                İletişim
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in">
          <p className="text-white/90 mb-3 text-lg">
            <span className="text-2xl mr-2">💡</span>
            Hala yardıma mı ihtiyacınız var?
          </p>
          <p className="text-white/80 text-sm mb-4">
            Sorun devam ederse{' '}
            <a
              href="https://wa.me/905555555555"
              className="font-bold text-yellow-300 hover:text-yellow-200 underline transition-colors"
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
