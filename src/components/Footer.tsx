import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import NotificationButton from './NotificationButton';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-ocean-400 rounded-full mix-blend-multiply filter blur-3xl animate-bounce-gentle"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🦐</div>
              <div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-ocean-300 to-primary-300 bg-clip-text text-transparent">Sedef Akvaryum</span>
                <p className="text-xs text-gray-400">Hediye Evi</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Kaliteli balık ve aksesuarlar için güvenilir adresiniz. Sevgili dostlarınız için en iyi bakım ve ürünleri sağlıyoruz.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
              <NotificationButton variant="icon" className="p-3 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-ocean-300 to-primary-300 bg-clip-text text-transparent">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-ocean-300 to-primary-300 bg-clip-text text-transparent">
              Kategoriler
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <span className="text-lg mr-2 transform group-hover:scale-125 transition-transform">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-ocean-300 to-primary-300 bg-clip-text text-transparent">
              İletişim Bilgileri
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">123 Akvaryum Caddesi</p>
                  <p className="text-gray-400 text-sm">İstanbul, Türkiye</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-300">+90 (212) 123-4567</span>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-ocean-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300">info@sedefakvaryum.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 <span className="font-semibold text-ocean-300">Sedef Akvaryum</span>. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>by Sedef Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
