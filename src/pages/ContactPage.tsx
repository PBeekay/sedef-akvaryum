import React, { useState } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { SEDEF_AKVARYUM_GOOGLE_MAPS_URL } from '../utils/googlePlaces';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
         alert('Mesajınız için teşekkürler! En kısa sürede size geri döneceğiz.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
                 <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-gray-800 mb-4">İletişim</h1>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             Sorularınız mı var veya yardıma mı ihtiyacınız var? Size yardımcı olmak için buradayız! Aşağıdaki yöntemlerden herhangi biriyle bize ulaşın.
           </p>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
                         <div>
               <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
               
               {/* Address */}
               <div className="flex items-start space-x-4 mb-6">
                 <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                   <p className="text-gray-600">
                     Sedef Akvaryum Hediye Evi<br />
                     Eskişehir, Türkiye<br />
                     <a 
                       href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-primary-600 hover:text-primary-700 text-sm mt-1 inline-block"
                     >
                       Haritada Görüntüle →
                     </a>
                   </p>
                 </div>
               </div>

               {/* Phone */}
               <div className="flex items-start space-x-4 mb-6">
                 <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                   <p className="text-gray-600">
                     <a href="tel:+905555555555" className="hover:text-primary-600">
                       +90 555 555 55 55
                     </a>
                   </p>
                 </div>
               </div>

               {/* Email */}
               <div className="flex items-start space-x-4 mb-6">
                 <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                   <p className="text-gray-600">info@sedefakvaryum.com</p>
                 </div>
               </div>
             </div>

                         {/* Business Hours */}
             <div>
               <h3 className="text-xl font-bold text-gray-800 mb-4">Çalışma Saatleri</h3>
               <div className="bg-gray-50 rounded-lg p-6">
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-600">Pazartesi - Cuma</span>
                     <span className="font-medium text-gray-800">09:00 - 20:00</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Cumartesi</span>
                     <span className="font-medium text-gray-800">10:00 - 18:00</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Pazar</span>
                     <span className="font-medium text-gray-800">11:00 - 17:00</span>
                   </div>
                 </div>
               </div>
             </div>

                         {/* WhatsApp Contact */}
             <div className="bg-green-50 rounded-lg p-6">
               <h3 className="text-xl font-bold text-gray-800 mb-4">WhatsApp ile Hızlı İletişim</h3>
               <p className="text-gray-600 mb-4">
                 Acil yardım veya hızlı sorular için WhatsApp üzerinden bize ulaşın!
               </p>
               <WhatsAppButton
                 message="Merhaba! Akvaryum mağazanızın hizmetleri hakkında sorum var."
                 className="w-full"
               >
                 WhatsApp'ta Sohbet Et
               </WhatsAppButton>
             </div>
          </div>

                     {/* Contact Form */}
           <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                     Ad Soyad *
                   </label>
                   <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     required
                     className="input-field"
                     placeholder="Adınız ve soyadınız"
                   />
                 </div>
                 
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                     E-posta Adresi *
                   </label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
                     className="input-field"
                     placeholder="ornek@email.com"
                   />
                 </div>
              </div>

                             <div>
                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                   Telefon Numarası
                 </label>
                 <input
                   type="tel"
                   id="phone"
                   name="phone"
                   value={formData.phone}
                   onChange={handleInputChange}
                   className="input-field"
                   placeholder="+90 (212) 123-4567"
                 />
               </div>

                             <div>
                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                   Konu *
                 </label>
                 <select
                   id="subject"
                   name="subject"
                   value={formData.subject}
                   onChange={handleInputChange}
                   required
                   className="input-field"
                 >
                   <option value="">Bir konu seçin</option>
                   <option value="general">Genel Sorgu</option>
                   <option value="product">Ürün Bilgisi</option>
                   <option value="order">Sipariş Durumu</option>
                   <option value="support">Müşteri Desteği</option>
                   <option value="feedback">Geri Bildirim</option>
                 </select>
               </div>

                             <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                   Mesaj *
                 </label>
                 <textarea
                   id="message"
                   name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                   required
                   rows={6}
                   className="input-field resize-none"
                   placeholder="Size nasıl yardımcı olabileceğimizi anlatın..."
                 />
               </div>

                             <button
                 type="submit"
                 className="btn-primary w-full text-lg py-3"
               >
                 Mesaj Gönder
               </button>
            </form>
          </div>
        </div>

                 {/* Map Section */}
         <div className="mt-16">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bizi Bulun</h2>
           <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
             <div className="text-center">
               <div className="text-4xl mb-2">🗺️</div>
               <p className="text-gray-600">Google Haritalar'da konumumuzu görüntüleyin</p>
               <p className="text-sm text-gray-500 mb-4">Sedef Akvaryum Hediye Evi, Eskişehir</p>
               <a 
                 href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
               >
                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                 </svg>
                 Haritada Aç
               </a>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ContactPage;
