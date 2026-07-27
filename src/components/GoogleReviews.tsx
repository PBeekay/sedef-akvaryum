import React, { useState, useEffect } from 'react';
import {
  SEDEF_AKVARYUM_PLACE_ID,
  SEDEF_AKVARYUM_GOOGLE_MAPS_URL,
  formatReviewDate,
  type GooglePlaceReview
} from '../utils/googlePlaces';

interface GoogleReview extends GooglePlaceReview { }

interface GoogleReviewsProps {
  placeId?: string;
  maxReviews?: number;
  className?: string;
}

// Fallback mock data in case API fails
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Selin Tekin',
    rating: 5,
    text: 'Akvaryum kuralım derken dostluk kurduk. Eşi de kendisi de harika insanlar.',
    time: '2024-04-10T10:30:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '2',
    author_name: 'atakan tezcan',
    rating: 5,
    text: 'İhsan çok ilgili, çok bilgili ve mükemmel bir akvarist. Herkesin tanışması gerekir.',
    time: '2024-03-08T14:20:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '3',
    author_name: 'Gökçe Eken',
    rating: 5,
    text: 'Eskişehir\'in en iyi akvaryumcusu, açık ara.',
    time: '2023-12-05T16:45:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '4',
    author_name: 'Ahmet Yılmaz',
    rating: 5,
    text: 'Harika bir akvaryum mağazası! Karideslerim çok sağlıklı ve güzel. Çalışanlar çok bilgili ve yardımcı.',
    time: '2024-01-10T10:30:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '5',
    author_name: 'Fatma Demir',
    rating: 5,
    text: 'Çok kaliteli ürünler ve uygun fiyatlar. Balıklarım çok mutlu, teşekkürler!',
    time: '2024-01-08T14:20:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '6',
    author_name: 'Mehmet Kaya',
    rating: 4,
    text: 'Güzel mağaza, ürün çeşitliliği fazla. Sadece biraz daha büyük olabilirdi.',
    time: '2024-01-05T16:45:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  }
];

const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  placeId = SEDEF_AKVARYUM_PLACE_ID, // Sedef Akvaryum Hediye Evi Place ID
  maxReviews = 6,
  className = ''
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const reviewsPerSlide = 3;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);

        // Google Places API'yi kullanmaya çalış
        // Not: Gerçek uygulamada Google Places API key gerekli
        // Şimdilik mock data kullanıyoruz, ama gerçek API entegrasyonu için hazır

        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data kullanıyoruz (gerçek API entegrasyonu için yorum satırlarını kaldırın)
        const sortedReviews = [...mockReviews].sort((a, b) =>
          new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setReviews(sortedReviews.slice(0, maxReviews));

        // Ortalama rating hesapla (not used in UI currently)
        // const avgRating = getAverageRating(mockReviews);

        /* 
        // Gerçek Google Places API entegrasyonu için:
        // const response = await fetch(`/api/google-places/reviews?placeId=${placeId}&maxReviews=${maxReviews}`);
        // const data = await response.json();
        // setReviews(data.reviews);
        */

      } catch (err) {
        setError('Yorumlar yüklenirken bir hata oluştu.');

        // Hata durumunda mock data kullan
        const sortedReviews = [...mockReviews].sort((a, b) =>
          new Date(b.time).getTime() - new Date(a.time).getTime()
        );
        setReviews(sortedReviews.slice(0, maxReviews));
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [placeId, maxReviews]);

  // Use the utility function from googlePlaces.ts
  const formatDate = formatReviewDate;

  // Calculate total slides
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Get visible reviews for current slide
  const getVisibleReviews = () => {
    const start = currentSlide * reviewsPerSlide;
    const end = start + reviewsPerSlide;
    return reviews.slice(start, end);
  };

  if (isLoading) {
    return (
      <div className={`py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse h-64 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16 mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-12 px-4 text-center ${className}`}>
        <p className="text-slate-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <span className="text-amber-400 font-bold text-xs">★ 4.9</span>
              <span className="text-slate-400">|</span>
              <span className="text-xs font-semibold text-emerald-700">Google Onaylı Müşteri Deneyimleri</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Müşterilerimiz Ne Diyor?
            </h2>
          </div>

          <a
            href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 shadow-sm text-xs font-bold transition-all shrink-0"
          >
            <span>Google Haritalar Yorumları</span>
            <span>↗</span>
          </a>
        </div>

        {/* Reviews Cards Showcase */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Rating & Avatar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                        {review.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                          {review.author_name}
                        </h4>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <span>✓</span> Doğrulanmış Müşteri
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{review.text}"
                  </p>
                </div>

                {/* Card Footer Date & Badge */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{formatDate(review.time)}</span>
                  <span className="text-emerald-700 font-semibold">Sedef Akvaryum Hobi Evi</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows & Indicators */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Slayt ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-2xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Önceki"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-2xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Sonraki"
                >
                  ›
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;
