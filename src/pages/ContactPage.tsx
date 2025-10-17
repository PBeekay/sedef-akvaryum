import React from 'react';
import { SEDEF_AKVARYUM_GOOGLE_MAPS_URL } from '../utils/googlePlaces';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-ocean-50 via-white to-primary-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-bounce-gentle inline-block">📬</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
              İletişim
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Sorularınız için bize ulaşın - Size yardımcı olmak için buradayız! 💬
          </p>
         </div>

        {/* Side by Side Layout - Contact Info (Left) and Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start animate-slide-up">
          
          {/* Left Side - Contact Information */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center bg-gradient-to-r from-ocean-600 to-primary-600 bg-clip-text text-transparent">
                İletişim Bilgileri
              </h2>
            
            {/* Working Hours */}
            <div className="mb-8 group/item hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-50 to-ocean-50 rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/item:rotate-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Çalışma Saatleri</h3>
                </div>
                <div className="ml-2 space-y-3 text-gray-700">
                  <div className="flex justify-between items-center bg-white/60 rounded-lg p-2 px-3">
                    <span className="font-semibold">Pazartesi - Cuma:</span>
                    <span className="text-blue-600 font-bold">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 rounded-lg p-2 px-3">
                    <span className="font-semibold">Cumartesi:</span>
                    <span className="text-blue-600 font-bold">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/60 rounded-lg p-2 px-3">
                    <span className="font-semibold">Pazar:</span>
                    <span className="text-blue-600 font-bold">12:00 - 18:00</span>
                  </div>
                </div>
              </div>
            </div>

               {/* Phone */}
            <div className="mb-8 group/item hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/item:rotate-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Telefon</h3>
                </div>
                <a href="tel:+905555555555" className="ml-2 text-lg font-semibold text-green-700 hover:text-green-600 transition-colors block bg-white/60 rounded-lg p-3 hover:bg-white/80">
                  📞 +90 531 507 30 06
                </a>
              </div>
            </div>

               {/* Email */}
            <div className="mb-8 group/item hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/item:rotate-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">E-posta</h3>
                </div>
                <a href="mailto:info@sedefakvaryum.com" className="ml-2 text-lg font-semibold text-purple-700 hover:text-purple-600 transition-colors block bg-white/60 rounded-lg p-3 hover:bg-white/80">
                  ✉️ info@sedefakvaryum.com
                </a>
              </div>
            </div>

            {/* Website */}
            <div className="mb-8 group/item hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-500 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/item:rotate-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Harita</h3>
                </div>
                <a 
                  href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-lg font-semibold text-orange-700 hover:text-orange-600 transition-colors block bg-white/60 rounded-lg p-3 hover:bg-white/80"
                >
                  🗺️ Haritada Görüntüle
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="mt-4 group/item hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-l-4 border-red-500 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/item:rotate-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Adres</h3>
                </div>
                <div className="ml-2 bg-white/60 rounded-lg p-4 text-gray-800">
                  <p className="font-semibold text-lg">📍 Sedef Akvaryum Hediye Evi</p>
                  <p className="text-gray-600 mt-1">Eskişehir, Türkiye</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-ocean-600 to-primary-600 bg-clip-text text-transparent">
                  Konumumuz
                </h2>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  <span>Bizi ziyaret edin!</span>
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 hover:border-primary-300 transition-all duration-300 transform hover:scale-[1.02]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.4590193730246!2d30.51254507640333!3d39.77425309449139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc1733fb62c9ab%3A0x30acbbcc17f8420d!2sSedef%20Akvaryum%20Hediye%20Evi!5e0!3m2!1str!2str!4v1759321097363!5m2!1str!2str" 
                  width="100%" 
                  height="700" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sedef Akvaryum Hediye Evi Konumu"
                  className="grayscale-0 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
