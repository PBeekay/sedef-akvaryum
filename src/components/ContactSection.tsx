import React from 'react';


const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-16 bg-white border-t border-gray-200 relative overflow-hidden">
            {/* Animated Background Elements - Simplified for section */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl animate-bounce-gentle"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold border border-blue-100">
                            📬 Bize Ulaşın
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
                        İletişim
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Sorularınız için bize ulaşın - Size yardımcı olmak için buradayız!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
                    {/* Map - Takes up 2/3 of the space */}
                    <div className="lg:col-span-2 h-full min-h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative group order-2 lg:order-1">
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" id="map-loader"></div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.4590193730246!2d30.51254507640333!3d39.77425309449139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc1733fb62c9ab%3A0x30acbbcc17f8420d!2sSedef%20Akvaryum%20Hediye%20Evi!5e0!3m2!1str!2str!4v1759321097363!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Sedef Akvaryum Hediye Evi Konumu"
                            className="w-full h-full grayscale-0 hover:grayscale-0 transition-all duration-300 relative z-10"
                            onLoad={(e) => {
                                const loader = document.getElementById('map-loader');
                                if (loader) loader.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Contact Information - Takes up 1/3 */}
                    <div className="space-y-6 lg:col-span-1 order-1 lg:order-2">
                        {/* Working Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Çalışma Saatleri</h3>
                            </div>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                    <span className="font-medium">Pazartesi - Cuma:</span>
                                    <span className="text-blue-600 font-bold">10:00 - 20:00</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                    <span className="font-medium">Cumartesi:</span>
                                    <span className="text-blue-600 font-bold">10:00 - 20:00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Pazar:</span>
                                    <span className="text-blue-600 font-bold">14:00 - 18:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Telefon</h3>
                            </div>
                            <a href="tel:+905315073006" className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors block text-center bg-gray-50 rounded-xl p-3">
                                +90 531 507 30 06
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
