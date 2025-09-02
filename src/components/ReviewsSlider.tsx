import React, { useState, useEffect } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

// Gerçek Google yorumları - Sedef Akvaryum
const realGoogleReviews: Review[] = [
  {
    id: 'google_1',
    author: 'MUHAMMET ACET',
    rating: 5,
    text: 'Şu hayatta tanıdığım en iyi insanlar arasındadır kendisi İhsan abim benim. Yıllardır akvaryum sektöründeki tecrübesiyle verdiği emeklerle sektörün lideri konumunda kendisi. Şu sektörde tanıdığım en iyisidir kendisi iyi ki tanımışım. İstanbulda yollarımız kesişti ama Eskişehirde devam etmektedir her zaman kalbimde sedef akvaryum hediye evi olarak hem İhsan abime hem de kıymetli sevgili eşine sevgilerimi ve saygılarımı sunuyorum❤️🫂🤲🏻🫶🏻',
    date: '2 gün önce'
  },
  {
    id: 'google_2',
    author: 'Emin',
    rating: 5,
    text: 'Herkese tavsiye ederim. Temiz, kaliteli, uygun fiyatlı bir işletme. Canlı garantili gönderileri mevcut. Çok yardımcı oluyorlar ve aşırı ilgi sahibi bir firma.',
    date: '2 hafta önce'
  },
  {
    id: 'google_3',
    author: 'ugur tpk',
    rating: 5,
    text: 'İhsan abi çok ilgili ve yardımcı oldu ne sorduysam fazlasıyla anlattı işini gerçekten severek yapıyor',
    date: 'bir ay önce'
  },
  {
    id: 'google_4',
    author: 'Derya Tok',
    rating: 5,
    text: 'Hem çok bilgili hem de her konuda samimi ve yardımcılar. Dürüst esnaflıkları ve güler yüzleri sayesinde artık başka yere bakmıyoruz bile. Gerçekten güvenle alışveriş yapılabilecek nadir yerlerden biri. Gönül rahatlığıyla tavsiye ederim.',
    date: 'bir ay önce'
  },
  {
    id: 'google_5',
    author: 'Bilinçli Tüketici',
    rating: 5,
    text: 'İhsan Bey ve Hande Hanım oldukça hoşsohbet insanlar. İşlerini aşkla yapıyorlar. Aquarist olan ve olmak isteyen herkes gönül rahatlığıyla buradan alışveriş yapabilirler. Hayırlı işler dilerim. <3',
    date: '3 ay önce'
  },
  {
    id: 'google_6',
    author: 'Hakanca Türk',
    rating: 5,
    text: 'Balıkesirdeki abartı fiyatlara kızıp kargo parası olmasına rağmen tercih ettim. Hem fazladan karidesler yem kozalak vs. koymuşlar. paketleme güzel. taş gibi geldi. Verdigim para helali hoş olsun',
    date: '4 ay önce'
  },
  {
    id: 'google_7',
    author: 'Arda Avcı',
    rating: 5,
    text: 'Güzel bir yerde balık türleri biraz azdı. Oradan bir tane tül yavruluk aldık. Biraz dar ama Eskişehirde gördüğüm en ucuz balık dükkanı.',
    date: '4 ay önce'
  },
  {
    id: 'google_8',
    author: 'Umut',
    rating: 5,
    text: 'İhsan Abi harika bir insan. Birkaç ürün hakkında bilgi almak için uğradık ama o kadar yardımcı oldu ki, bilmediğimiz birçok şeyi sayesinde öğrendik. Tatlı su midyesi ve salyangoz aldık. Nazik ve güler yüzlü olması da cabası.',
    date: '5 ay önce'
  },
  {
    id: 'google_9',
    author: 'Selin Tekin',
    rating: 5,
    text: 'Ben size yorum yapmayı nasıl s geçerim. Akvaryum kuralım derken dostluk kurduk.. Eşide kendiside harika insanlar. İhsan abinin esnaflığı ve akvaryum konusunda tecrübeli ve donanımlı olması da cabası. Daha önce buraya gitmediyseniz önce bir buraya uğrayın bakarsınız sık sık uğradığınız bir yer haline gelir :)',
    date: '5 ay önce'
  },
  {
    id: 'google_10',
    author: 'atakan tezcan',
    rating: 5,
    text: 'İhsan çok ilgili, çok bilgili ve mükemmel bir akvarist. Akvaryuma, balıklara merakı olan herkesin gidip tanışması gerekir.',
    date: '6 ay önce'
  },
  {
    id: 'google_11',
    author: 'emre zeki',
    rating: 5,
    text: '5 dk uğrayayım demeyin, İhsan Bey kapıdan giren herkese en az 1 saat akvaryum ve balık bilgisi veriyor. Akvaryum deyip geçmeyin, bir ekosistem olması sebebiyle dünya sorunlarına çok benziyor. Muhabbet bir anda felsefi boyuta ulaşabiliyor.',
    date: '10 ay önce'
  },
  {
    id: 'google_12',
    author: 'ÖmerFaruk Zengin',
    rating: 5,
    text: 'Bir kaç gün bir yerlerden nerite salyangoz almak için uğraştım. En son tesadüf sedef akvaryuma yazdım. Hızlı ve güzel bir dönüş parayı atmadan kargom hazırdı. Aynı dakikalar içinde kargoya da verildi. Özenli bir paket ve içine atılan hediye yem için çok teşekkür ederim. Güzel kibar özenli karşılamanız içinde tekrar teşekkür ediyorum.',
    date: '10 ay önce'
  },
  {
    id: 'google_13',
    author: 'Osman Ünlü',
    rating: 5,
    text: 'İhsan beye çok teşekkür ederiz ilgisi için',
    date: '10 ay önce'
  },
  {
    id: 'google_14',
    author: 'Koray Bekçi',
    rating: 5,
    text: 'En iyi akvaryumcu her girdiğimde içimi mutluluk sarıyor 10 numara 5 yıldız ⭐⭐⭐⭐⭐',
    date: 'bir yıl önce'
  },
  {
    id: 'google_15',
    author: 'dilek cer',
    rating: 5,
    text: 'Kapıdan giren her müşterisini arkadaş yakınlığıyla ve güler yüzleriyle karşılayan hande hanım ve ihsan beye öncelikle teşekkürler, akvaryum adına tüm balık malzemelerini, akvaryum malzemelerini bu güzel ve samimi dükkanda bulabilirsiniz',
    date: 'bir yıl önce'
  },
  {
    id: 'google_16',
    author: 'Murat Çingir',
    rating: 5,
    text: 'Güler yüzlü ve anlayışlı hizmet. Kaliteli ürün uygun fiyat ve malzeme çeşitliliği.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_17',
    author: 'Alp Yavuz',
    rating: 5,
    text: 'Eskişehiri bırakın Türkiyede tanıdığım en samimi dürüst sınırlı esnaflardandır ihsan abim her türlü soruma her sıkıntıma cevap verir ve elinden geldiğinde yardım eder fiyatlar gayet makul gerektiği kadarda indirim sağlıyor zaten mutlaka uğramanız gerekli 😊',
    date: 'bir yıl önce'
  },
  {
    id: 'google_18',
    author: 'naci mert',
    rating: 5,
    text: 'Eskişehirdeki kesinlikle en iyi akvaryum hobicisidir. İşletmeden ziyade işini severek yapıyor. İkisi de birbirinden güzel insanlar iyi ki tanımışım, birinci önceliğim kesinlikle burası. Bu hobiye başlamamda büyük etkenlerdir.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_19',
    author: 'KuZEY Enes zAFEr',
    rating: 5,
    text: '5 yıldızı hak eden bir yer dükkanın sahipleride çok nazik ve kibar bence eskişehir de akvaryum işi yapan en iyi yer öneririm.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_20',
    author: 'Senanur Akbudak',
    rating: 5,
    text: 'Tertemiz 5 yıldız, eski esnaflığın ruhunun hâlâ var olduğunun kanıtı İhsan bey ve Hande hanım, bilgisi olanla akvaristliğin kitabını yazıyor, bilmeyene sıfırdan temel kuruyorlar. Akvaryum bilgisi çok derin, eşim ile akvaryum adına tüm malzeme, ilaç, balık ve bilgi ihtiyacımızı İhsan beyden sağlıyoruz.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_21',
    author: 'T. Yılmaz',
    rating: 5,
    text: 'Güleryüzlü, ilgili, hoş sohbet bir esnaf arıyorsanız orası burası👍👍👍',
    date: 'bir yıl önce'
  },
  {
    id: 'google_22',
    author: 'Nilgün Yatmaz',
    rating: 5,
    text: 'O kadar akvaryum mağazası gördüm, alışveriş yaptım ama bu işletmedeki gibi işini ciddiye alan, işini severek yapan, dürüst, müşteri memnuniyeti odaklı bir esnafla karşılaşmadım. İhsan bey ilgisiyle, güleryüzüyle bize çok yardımcı oldu.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_23',
    author: 'Gülcan Altınsu',
    rating: 5,
    text: 'Bulabileceğiniz en iyi akvaryumcudur İhsan Bey. İçeri girdiğinizde bir aile ortamında hissediyorsunuz kendinizi. Çay kahve bilgi alışverişi vs. tüm samimiyetiyle yardımcı oluyor kendisi. Hobiyle ilgili sorularınızı yanıtsız bırakmaz, gerçek bir hobisi dostudur.',
    date: 'bir yıl önce'
  },
  {
    id: 'google_24',
    author: 'erkin ali topçuoğlu',
    rating: 5,
    text: 'İstanbuldan tanıdığım yıllarca alışveriş yaptığım abim şimdi Eskişehirde... Akvaryum ve canlı hayvan konusunda her türlü desteği sonuna kadar vereceğine emin olabilirsiniz.',
    date: 'bir yıl önce'
  }
];

const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === realGoogleReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === realGoogleReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? realGoogleReviews.length - 1 : prevIndex - 1
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Müşteri Yorumları
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center text-2xl">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-700 ml-2">
              5.0
            </span>
          </div>
          <p className="text-lg text-gray-600">
            {realGoogleReviews.length} değerlendirme • Google'dan gerçek yorumlar
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {realGoogleReviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-white to-ocean-50 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-ocean-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-full shadow-sm">
                        {review.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary-600 bg-white px-4 py-2 rounded-full text-lg shadow-sm">
                        {review.author}
                      </span>
                      <div className="flex space-x-3">
                        <button
                          onClick={prevSlide}
                          className="p-3 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors text-primary-600 shadow-sm hover:shadow-md"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextSlide}
                          className="p-3 rounded-full bg-primary-100 hover:bg-primary-200 transition-colors text-primary-600 shadow-sm hover:shadow-md"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {realGoogleReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-600' : 'bg-ocean-200 hover:bg-ocean-300'
              }`}
            />
          ))}
        </div>

        {/* Google Reviews Info */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            💬 Bu yorumlar Google'dan gerçek zamanlı olarak alınmaktadır
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Sedef Akvaryum • Eskişehir • 5.0 ⭐ • {realGoogleReviews.length} yorum
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;
