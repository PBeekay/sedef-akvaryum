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

  // Get avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-yellow-200',
      'bg-teal-200',
      'bg-purple-200',
      'bg-pink-200',
      'bg-blue-200',
      'bg-green-200'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
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
      <div className={`py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white ${className}`}>
        <div className="max-w-7xl mx-auto text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Premium balık ve neocaridina karides kalitemiz hakkında müşterilerimizin ne söylediğini görün.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {totalSlides > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
              aria-label="Previous reviews"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-64"
              >
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${getAvatarColor(review.author_name)} flex items-center justify-center mr-3`}>
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.author_name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow italic mb-3 line-clamp-4 overflow-hidden">
                  "{review.text}"
                </p>

                {/* Date */}
                <p className="text-xs text-gray-400">
                  {formatDate(review.time)}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {totalSlides > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors hidden md:block"
              aria-label="Next reviews"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Footer - Google Maps Link */}
        <div className="text-center">
          <a
            href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Google Haritalar'da Tüm Yorumları Gör
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviews;
