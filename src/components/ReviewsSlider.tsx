import React, { useState, useEffect } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'A.Y.',
    rating: 5,
    text: 'Harika bir yer! Balıklarım çok sağlıklı ve güzel. Kesinlikle tavsiye ederim. Çok ilgili ve bilgili kişiler.',
    date: '2025-01-15'
  },
  {
    id: '2',
    author: 'M.K.',
    rating: 5,
    text: 'Çok profesyonel hizmet. Karideslerim mükemmel durumda. Teşekkürler! Fiyatlar da çok uygun.',
    date: '2025-01-12'
  },
  {
    id: '3',
    author: 'F.D.',
    rating: 5,
    text: 'Akvaryum ekipmanları kaliteli ve fiyatları uygun. Memnun kaldım. Herkese tavsiye ederim.',
    date: '2025-01-10'
  },
  {
    id: '4',
    author: 'A.Ç.',
    rating: 5,
    text: 'Balık yemleri çok kaliteli. Balıklarım çok seviyor. Teşekkürler! Çok güvenilir bir yer.',
    date: '2025-01-08'
  },
  {
    id: '5',
    author: 'Z.A.',
    rating: 5,
    text: 'Mükemmel hizmet! Akvaryum kurulumunda çok yardımcı oldular. Çok teşekkürler.',
    date: '2025-01-05'
  },
  {
    id: '6',
    author: 'B.Y.',
    rating: 5,
    text: 'Bitkilerim çok güzel büyüyor. Kaliteli ürünler ve hızlı teslimat. Çok memnunum.',
    date: '2025-01-03'
  },
  {
    id: '7',
    author: 'E.K.',
    rating: 5,
    text: 'Çok güzel bir yer. Balıklarım çok sağlıklı. Fiyatlar da çok uygun. Teşekkürler!',
    date: '2025-01-01'
  },
  {
    id: '8',
    author: 'S.D.',
    rating: 5,
    text: 'Harika hizmet! Akvaryum malzemeleri çok kaliteli. Kesinlikle tavsiye ederim.',
    date: '2024-12-30'
  },
  {
    id: '9',
    author: 'H.A.',
    rating: 5,
    text: 'Çok memnunum. Balıklarım çok güzel ve sağlıklı. Fiyatlar da çok uygun.',
    date: '2024-12-28'
  },
  {
    id: '10',
    author: 'N.Y.',
    rating: 5,
    text: 'Mükemmel bir yer! Çok ilgili ve bilgili kişiler. Herkese tavsiye ederim.',
    date: '2024-12-25'
  },
  {
    id: '11',
    author: 'K.M.',
    rating: 5,
    text: 'Çok güzel bir yer. Balıklarım çok sağlıklı. Fiyatlar da çok uygun. Teşekkürler!',
    date: '2024-12-22'
  },
  {
    id: '12',
    author: 'L.B.',
    rating: 5,
    text: 'Harika hizmet! Akvaryum malzemeleri çok kaliteli. Kesinlikle tavsiye ederim.',
    date: '2024-12-20'
  },
  {
    id: '13',
    author: 'R.S.',
    rating: 5,
    text: 'Çok memnunum. Balıklarım çok güzel ve sağlıklı. Fiyatlar da çok uygun.',
    date: '2024-12-18'
  },
  {
    id: '14',
    author: 'T.Ö.',
    rating: 5,
    text: 'Mükemmel bir yer! Çok ilgili ve bilgili kişiler. Herkese tavsiye ederim.',
    date: '2024-12-15'
  },
  {
    id: '15',
    author: 'U.Z.',
    rating: 5,
    text: 'Harika bir yer! Balıklarım çok sağlıklı ve güzel. Kesinlikle tavsiye ederim.',
    date: '2024-12-12'
  }
];

const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mockReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockReviews.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mockReviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-white to-ocean-50 rounded-xl shadow-lg p-6 max-w-md mx-auto border border-ocean-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-lg">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                        {new Date(review.date).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary-600 bg-white px-3 py-1 rounded-full text-sm">
                        {review.author}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={prevSlide}
                          className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors text-primary-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextSlide}
                          className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors text-primary-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {mockReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-ocean-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;
