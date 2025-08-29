import React, { useState, useEffect } from 'react';
import { 
  SEDEF_AKVARYUM_PLACE_ID, 
  SEDEF_AKVARYUM_GOOGLE_MAPS_URL,
  getAverageRating,
  formatReviewDate,
  type GooglePlaceReview
} from '../utils/googlePlaces';

interface GoogleReview extends GooglePlaceReview {}

interface GoogleReviewsProps {
  placeId?: string;
  maxReviews?: number;
  className?: string;
}

// Fallback mock data in case API fails
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Ahmet Yılmaz',
    rating: 5,
    text: 'Harika bir akvaryum mağazası! Karideslerim çok sağlıklı ve güzel. Çalışanlar çok bilgili ve yardımcı.',
    time: '2024-01-10T10:30:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '2',
    author_name: 'Fatma Demir',
    rating: 5,
    text: 'Çok kaliteli ürünler ve uygun fiyatlar. Balıklarım çok mutlu, teşekkürler!',
    time: '2024-01-08T14:20:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '3',
    author_name: 'Mehmet Kaya',
    rating: 4,
    text: 'Güzel mağaza, ürün çeşitliliği fazla. Sadece biraz daha büyük olabilirdi.',
    time: '2024-01-05T16:45:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '4',
    author_name: 'Ayşe Özkan',
    rating: 5,
    text: 'İlk kez akvaryum kuruyorum ve çok yardımcı oldular. Her şeyi detaylıca açıkladılar.',
    time: '2024-01-03T11:15:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '5',
    author_name: 'Can Arslan',
    rating: 5,
    text: 'Karideslerim çok güzel renkli! Hızlı teslimat ve kaliteli hizmet.',
    time: '2023-12-28T09:30:00Z',
    profile_photo_url: 'https://via.placeholder.com/40'
  },
  {
    id: '6',
    author_name: 'Zeynep Çelik',
    rating: 4,
    text: 'Fiyatlar uygun ve ürünler kaliteli. Tavsiye ederim.',
    time: '2023-12-25T13:20:00Z',
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
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

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
        
        // Ortalama rating hesapla
        const avgRating = getAverageRating(mockReviews);
        setAverageRating(avgRating);
        setTotalReviews(mockReviews.length);
        
        /* 
        // Gerçek Google Places API entegrasyonu için:
        // const response = await fetch(`/api/google-places/reviews?placeId=${placeId}&maxReviews=${maxReviews}`);
        // const data = await response.json();
        // setReviews(data.reviews);
        // setAverageRating(data.averageRating);
        // setTotalReviews(data.totalReviews);
        */
        
      } catch (err) {
        setError('Yorumlar yüklenirken bir hata oluştu.');
        console.error('Error loading reviews:', err);
        
        // Hata durumunda mock data kullan
        const sortedReviews = [...mockReviews].sort((a, b) => 
          new Date(b.time).getTime() - new Date(a.time).getTime()
        );
        setReviews(sortedReviews.slice(0, maxReviews));
        const avgRating = getAverageRating(mockReviews);
        setAverageRating(avgRating);
        setTotalReviews(mockReviews.length);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [placeId, maxReviews]);

  // Use the utility function from googlePlaces.ts
  const formatDate = formatReviewDate;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Müşteri Yorumları
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({totalReviews} yorum)
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">Ortalama Puan</div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => (
          <div key={review.id} className="p-6">
            <div className="flex items-start space-x-3">
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/40';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {review.author_name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDate(review.time)}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="text-center">
          <a
            href={SEDEF_AKVARYUM_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
