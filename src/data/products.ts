import { fishData } from './fishData';
import { Product } from '../types/Product';

export const categories = [
  { id: 'fish', name: 'Balık', icon: '🐠' },
  { id: 'shrimp', name: 'Karides', icon: '🦐' },
  { id: 'plants', name: 'Bitkiler', icon: '🌿' },
  { id: 'equipment', name: 'Ekipman', icon: '🔧' },
  { id: 'accessories', name: 'Aksesuarlar', icon: '🎣' },
  { id: 'food', name: 'Yem', icon: '🍖' },
];



export const products: Product[] = [
  // Fish Category - Integrated from fishData
  ...fishData,
  
  // Additional Fish Products
  {
    id: 'fish-japanese',
    name: 'Japon Balığı',
    category: 'fish',
    price: 15.99,
    description: 'Güzel ve dayanıklı japon balığı, yeni başlayanlar için mükemmel. Bu balıklar parlak turuncu renkleri ve huzurlu doğalarıyla bilinir. Uygun bakımla uzun yıllar yaşayabilirler.',
    shortDescription: 'Güzel ve dayanıklı japon balığı, yeni başlayanlar için mükemmel.',
    image: 'https://cdn.balikturleri.com/wp-content/uploads/2023/08/Oranda-Sus-Baligi.jpg',
    inStock: true,
    featured: true,
  },
  {
    id: 'fish-betta',
    name: 'Beta Balığı',
    category: 'fish',
    price: 12.99,
    description: 'Canlı renkleri ve akıcı yüzgeçleriyle etkileyici beta balığı. Bu balıklar benzersiz kişilikleri ve güzel görünümleriyle bilinir. Küçük akvaryumlar için mükemmel.',
    shortDescription: 'Canlı renkleri ve akıcı yüzgeçleriyle etkileyici beta balığı.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2JeMrKz-T2IPzxuO9upiRpRmg-UFoKasOjf5jabiiHMLUu6lKrLs6lzmCqBAKoeOUzo&usqp=CAU',
    inStock: true,
    new: true,
  },

  // Frenatus Balıkları
  {
    id: 'fish-frenatus-albino',
    name: 'Albino Frenatus',
    category: 'fish',
    price: 28.99,
    description: 'Benzersiz albino renklenmesiyle dikkat çeken Frenatus balığı. Bu özel varyant, beyaz-pembe tonları ve kırmızı gözleriyle herhangi bir akvaryuma egzotik bir görünüm katar. Barışçıl doğası ve dayanıklılığı ile topluluk tankları için mükemmel.',
    shortDescription: 'Benzersiz albino renklenmesiyle dikkat çeken Frenatus balığı.',
    image: 'https://www.akvaryum.market/wp-content/uploads/2017/06/albino-frenatus.jpg',
    inStock: true,
    new: true,
    colors: ['Albino', 'Beyaz-Pembe', 'Kırmızı Göz'],
    socialBehavior: 'Barışçıl, topluluk tankları için uygun',
    waterParameters: {
      temperature: '24-28°C',
      pH: '6.5-7.5',
      hardness: '5-12 dGH'
    },
    size: '4-6 cm',
    difficulty: 'Orta',
    breeding: 'Orta zorlukta üretim',
    diet: 'Omnivor, canlı yem, dondurulmuş yem, kaliteli peletler',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 75L (20 galon)'
  },
  {
    id: 'fish-frenatus-normal',
    name: 'Frenatus',
    category: 'fish',
    price: 24.99,
    description: 'Klasik renklenmesiyle güzel Frenatus balığı. Doğal kahverengi tonları ve zarif yüzgeçleriyle geleneksel akvaryum tasarımlarına mükemmel uyum sağlar. Dayanıklı yapısı ve uyumlu doğası ile yeni başlayanlar için ideal.',
    shortDescription: 'Klasik renklenmesiyle güzel ve dayanıklı Frenatus balığı.',
    image: 'https://www.akvaryum.market/wp-content/uploads/2017/06/frenatus-baligi-1.jpg',
    inStock: true,
    colors: ['Doğal Kahverengi', 'Altın Tonları', 'Koyu Desenler'],
    socialBehavior: 'Barışçıl, yeni başlayanlar için ideal',
    waterParameters: {
      temperature: '24-28°C',
      pH: '6.5-7.5',
      hardness: '5-12 dGH'
    },
    size: '4-6 cm',
    difficulty: 'Kolay',
    breeding: 'Orta zorlukta üretim',
    diet: 'Omnivor, canlı yem, dondurulmuş yem, kaliteli peletler',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 75L (20 galon)'
  },

  // Shrimp Category - Neocaridinia Türleri
  {
    id: 'shrimp-1',
    name: 'Kırmızı Sakura Neocaridina Tatlı Su Karidesi',
    category: 'shrimp',
    price: 40.00,
    description: 'Kırmızı Sakura Karidesi, bilimsel adıyla Neocaridina davidi, canlı kırmızı renklenmesiyle herhangi bir tatlı su akvaryumuna canlı bir renk patlaması getirir. Tayvan\'dan köken alan bu yaygın olarak sevilen tür, hem estetik çekicilik hem de yosun ve kalıntı besleme alışkanlıkları sayesinde su ortamını temiz tutmaya yardımcı olan pratik faydalar için mükemmel bir eklemedir. Bakım kolaylığı ve dayanıklılığı ile ünlü olan Kırmızı Sakura Karidesi, akvaristlik dünyasına giren yeni başlayanlar için ideal seçim olarak durur ve minimal zahmetle ödüllendirici bir deneyim sunar.',
    shortDescription: 'Canlı kırmızı renklenmesiyle tatlı su akvaryumlarına canlı renk patlaması getiren Kırmızı Sakura karidesi.',
    image: 'https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/9365ebfb-b0a9-48b4-9a70-f8da6a90dcf0/image_1080.jpg',
    inStock: true,
    featured: true,
    colors: ['Canlı Kırmızı', 'Parlak Kırmızı', 'Vibrant Kırmızı'],
    socialBehavior: 'Barışçıl, yeni başlayanlar için ideal',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-10 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-2',
    name: 'Mavi Rüya Neocaridina Karidesi',
    category: 'shrimp',
    price: 40.00,
    description: 'Mavi Rüya Karidesi, bilimsel adıyla Neocaridina davidi, büyüleyici derin mavi rengiyle herhangi bir tatlı su akvaryumuna huzur verici bir varlık getirir. Tayvan\'dan köken alan bu tür, hem güzelliği hem de yosun ve kalıntıları tüketerek temiz bir ortamı koruma rolü nedeniyle sevilir. Hem yeni başlayan hem de deneyimli akvaristler için mükemmel olan dayanıklı bir çeşittir.',
    shortDescription: 'Büyüleyici derin mavi rengiyle huzur verici varlık sağlayan Mavi Rüya karidesi.',
    image: 'https://blog.tetra.net/tr-tr/wp-content/uploads/2022/02/mavi-melek-karides.jpg',
    inStock: true,
    colors: ['Derin Mavi', 'Huzur Verici Mavi', 'Parlak Mavi'],
    socialBehavior: 'Barışçıl, huzurlu',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-10 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-3',
    name: 'Altın Neocaridina Karidesi',
    category: 'shrimp',
    price: 40.00,
    description: 'Altın Neocaridina Karidesi, bilimsel adıyla Neocaridina davidi, tatlı su akvaryumlarına canlı altın-sarı rengiyle parlak bir parıltı katan, parlak altın-sarı rengiyle takdir edilen bir karidestir. Tayvan\'ın temiz akarsularından köken alan bu karides sadece güzel bir ekleme değil, aynı zamanda yosun ve kalıntıları tüketerek tankın temizliğini korumada önemli bir rol oynar. Dayanıklı bir türdür ve hem yeni başlayan hem de ileri düzey akvaryum meraklıları için mükemmel bir seçimdir.',
    shortDescription: 'Parlak altın-sarı rengiyle tatlı su akvaryumlarına canlı parıltı katan Altın Neocaridina karidesi.',
    image: 'https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/ba6ced5c-5cc7-4b52-972c-c1fcc83f3019/image_1080.jpg',
    inStock: true,
    colors: ['Altın Sarı', 'Parlak Altın', 'Canlı Sarı'],
    socialBehavior: 'Barışçıl, dayanıklı',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '4-8 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-4',
    name: 'Turuncu Sakura Karidesi',
    category: 'shrimp',
    price: 45.00,
    description: 'Turuncu Sakura Neocaridina Karidesi, akvaryumunuzda yüzen küçük bir sonbahar parçası gibidir, sıcak, zengin turuncu tonuyla balkabağı baharatı latte\'lerini ve çıtır çıtır sonbahar yapraklarını hatırlatır. Bu küçük karidesler tankınıza sıcak, davetkar bir parıltı eklemenin mükemmel yoludur ve onu rahat, sualtı bir sığınağa dönüştürür. Bakımları kolaydır ve canlı bir renk kıvılcımı eklerler, küçük güneş ışığı damlaları gibi etrafta hareket ederler. Onları izlemek bir zevktir ve akvaryumunuzu rahatlatıcı sonbahar tonlarıyla dolu canlı bir sahneye dönüştürür, her günü biraz daha rahat, şenlikli bir sezon gibi hissettirir.',
    shortDescription: 'Sıcak, zengin turuncu tonuyla sonbahar havası veren Turuncu Sakura karidesi.',
    image: 'https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/6b3e720f-d060-4ba2-a657-3e5ddcb9d1fe/image_1080.jpg',
    inStock: true,
    colors: ['Zengin Turuncu', 'Balkabağı Turuncu', 'Sonbahar Turuncu'],
    socialBehavior: 'Barışçıl, rahat',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '4-8 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-5',
    name: 'Yeşil Jade Karidesi',
    category: 'shrimp',
    price: 80.00,
    description: 'Yeşil Jade Neocaridina Karidesi, akvaryumun su yeşillikleri arasında yuvalanmış, canlı, hareket eden bir mücevherdir, canlı zümrüt vücudu ışıkla dans ediyormuş gibi görünen bir yaşam sıçramasıdır. Vahşi doğanın bir dokunuşunu, yağmurla öpülen, gür ormanların yankısını evinize getirirler ve huzurlu ama canlı bir manzara yaratırlar. Yapraklar ve taşlar üzerinde zarifçe kayarken sadece gözler için bir ziyafet değil; yüzeyin altındaki gizli dünyaların hikayelerini fısıldarlar ve her gözlemciyi durdurup hayrete düşürürler. Nazik ve düşük bakım gerektiren bu yeşil harikalar, huzur büyüsü örer ve tankınızı doğal güzelliğin sığınağına dönüştürür.',
    shortDescription: 'Canlı zümrüt vücuduyla ışıkla dans eden Yeşil Jade Neocaridina karidesi.',
    image: 'https://static.ticimax.cloud/69843/uploads/urunresimleri/green-jade-karides-2-cm-10-adet-kargo--8-a0d0.jpg',
    inStock: true,
    colors: ['Canlı Zümrüt', 'Parlak Yeşil', 'Doğal Yeşil'],
    socialBehavior: 'Barışçıl, nazik',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '4-8 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-6',
    name: 'Siyah Gül Karidesi',
    category: 'shrimp',
    price: 18.99,
    description: 'Siyah renkli Neocaridina Davidi varyantı. Zarif siyah renkleri ve kontrast oluşturan görünümleriyle dikkat çeker.',
    shortDescription: 'Siyah renkli Neocaridina Davidi varyantı.',
    image: 'https://static.ticimax.cloud/55269/uploads/urunresimleri/buyuk/siyah-gul-karides-9da9-c.jpg',
    inStock: true,
    colors: ['Siyah', 'Koyu Siyah', 'Gri-Siyah'],
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '18-28°C',
      pH: '6.5-8.0',
      hardness: '6-15 dGH'
    },
    size: '2-3 cm',
    difficulty: 'Orta',
    breeding: 'Kolay üretim',
    diet: 'Omnivor, yosun, artık yemler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 20L'
  },
  {
    id: 'shrimp-7',
    name: 'Yeşil Rili Karidesi',
    category: 'shrimp',
    price: 140.00,
    description: 'Yeşil Rili Neocaridina Karidesi, canlı yeşil renklenmesi ve şeffaf aksanlarıyla büyüleyici bir tatlı su karidesidir. Tayvan\'a özgü olan bu karides, sadece akvaryumlara çarpıcı görsel çekicilik katmakla kalmaz, aynı zamanda yosun ve kalıntıları yiyerek su kalitesini korumaya yardımcı olur. Barışçıl doğası ve uyumluluğu, deneyim seviyesi ne olursa olsun tüm akvaristler için mükemmel bir seçim haline getirir.',
    shortDescription: 'Canlı yeşil renklenmesi ve şeffaf aksanlarıyla büyüleyici Yeşil Rili karidesi.',
    image: 'https://tropicflow.com/cdn/shop/files/IMG-1266.jpg?v=1733645067&width=713',
    inStock: true,
    colors: ['Yeşil', 'Canlı Yeşil', 'Şeffaf Aksanlar'],
    socialBehavior: 'Barışçıl, uyumlu',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-10 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-8',
    name: 'Çikolata Karidesi',
    category: 'shrimp',
    price: 35.00,
    description: 'Çikolata Neocaridina Tatlı Su Karidesi, zengin kakao-kahverengi tonuyla herhangi bir akvaryuma renk ve zarafet katkısı yapar. Hem yeni başlayan hem de deneyimli akvaristler için ideal olan bu çarpıcı karidesler, sadece güzel renklenmeleriyle öne çıkmakla kalmaz, aynı zamanda yosun ve kalıntıları yiyerek su ortamını temiz tutmada kritik rol oynar.',
    shortDescription: 'Zengin kakao-kahverengi tonuyla çarpıcı Çikolata Neocaridina karidesi.',
    image: 'https://cdn.shopify.com/s/files/1/0667/6237/5466/files/neocaridina-black-chocolate-shrimp_480x480.jpg?v=1709021519',
    inStock: true,
    colors: ['Kakao Kahverengi', 'Zengin Kahverengi', 'Çikolata Kahverengi'],
    socialBehavior: 'Barışçıl, zarif',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-10 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-9',
    name: 'Bloody Mary Karidesi',
    category: 'shrimp',
    price: 80.00,
    description: 'Bloody Mary Karidesi, zengin domates rengine veya adını aldığı ünlü kokteyle benzeyen çarpıcı derin kırmızı rengiyle herhangi bir akvaryumda büyüleyici bir manzara sunar. Bu canlı yaratıklar çevrelerine renk ve yaşam katkısı yapar ve akvaristler arasında favori haline gelir. Şeffaf vücutları yoğun kırmızı ile parlar ve yeşil bitkiler veya koyu substratlar üzerinde güzel bir kontrast oluşturur. Bakımı kolay ve doğası barışçıl olan Bloody Mary Karidesleri sadece bakılması güzel değil, aynı zamanda yosun ve kalıntıları temizleyerek sağlıklı bir akvaryuma katkıda bulunur.',
    shortDescription: 'Zengin domates rengine benzeyen çarpıcı derin kırmızı Bloody Mary karidesi.',
    image: 'https://cdn.shopify.com/s/files/1/0667/6237/5466/files/neocaridina-bloody-mary-shrimp_480x480.jpg?v=1709021186',
    inStock: true,
    colors: ['Derin Kırmızı', 'Zengin Domates Rengi', 'Yoğun Kırmızı'],
    socialBehavior: 'Barışçıl, zarif',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-10 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-10',
    name: 'Karbon Rili Karidesi',
    category: 'shrimp',
    price: 20.00,
    description: 'Karbon Rili Neocaridina Karidesi, yıldızlı bir gece gibi büyüleyici koyu vücudu ve şeffaf noktalarıyla sualtı evreninin eşdeğeridir. Bu küçük yaratıklar akvaryumunuza kozmik bir harika dokunuşu getirir ve onu huzurlu, yıldızlı bir akşam sahnesine dönüştürür. Suyun içinde kolayca kayarlar ve benzersiz desenleri, sizi sessiz düşünce ve güzellik dünyasına çeken büyüleyici bir gösteri sunar. Onlara bakmak, evrenin bir parçasını yakaladığınızı hissetmenizi sağlar.',
    shortDescription: 'Yıldızlı gece gibi büyüleyici koyu vücut ve şeffaf noktalı Karbon Rili karidesi.',
    image: 'https://cdn.shopify.com/s/files/1/0667/6237/5466/files/neocaridina-carbon-rili-shrimp_480x480.jpg?v=1709020502',
    inStock: true,
    colors: ['Siyah', 'Koyu Siyah', 'Şeffaf Noktalar'],
    socialBehavior: 'Barışçıl, zarif',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '6-12 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-11',
    name: 'Turuncu Rili Karidesi',
    category: 'shrimp',
    price: 75.00,
    description: 'Turuncu Rili Neocaridina Karidesi, parlak turuncu vücudu ve benzersiz şeffaf noktalarıyla herhangi bir akvaryuma sıcak, güneşli bir hava getirir. Küçük, yüzen güneş ışınları gibi suyu neşeli renkleriyle aydınlatırlar. Etraflarında olması çok kolay arkadaşlardır ve hiçbir zahmet çıkarmadan mutluluk ve renk patlaması eklerler. Tankın etrafında dart yaparken onları izlemek, küçük güneş ışığı parlamalarını yakalamak gibidir ve akvaryumunuzu daha canlı ve neşeli bir yer haline getirir. Bu turuncu güzellikler sualtı dünyanıza eğlence ve canlılık katmak için mükemmeldir.',
    shortDescription: 'Parlak turuncu vücut ve benzersiz şeffaf noktalı Turuncu Rili karidesi.',
    image: 'https://tropicflow.com/cdn/shop/files/IMG-9536VhtTgcoMJ3RKR.jpg?v=1707327066&width=713',
    inStock: true,
    colors: ['Parlak Turuncu', 'Güneşli Turuncu', 'Şeffaf Noktalar'],
    socialBehavior: 'Barışçıl, neşeli',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '4-8 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },
  {
    id: 'shrimp-12',
    name: 'Kırmızı Rili Karidesi',
    category: 'shrimp',
    price: 35.00,
    description: 'Kırmızı Rili Neocaridina Karidesi, akvaryumunuzda kırmızı boya sıçraması gibidir ve şeffaf yamaları onları gerçekten öne çıkarır. Onları izlemek, etrafta yüzen küçük neşe damlalarını görmek gibidir ve canlı renkleriyle tankı aydınlatırlar. Bakımları çok kolaydır ve diğerleriyle iyi geçinirler, balık tankınızı daha mutlu ve güzel bir yer haline getirirler. Bu küçük kırmızı yüzücüler herhangi bir akvaryuma eğlenceli bir renk patlaması getirir ve özel, sualtı bir parti hissi verir.',
    shortDescription: 'Kırmızı boya sıçraması gibi şeffaf yamalı Kırmızı Rili karidesi.',
    image: 'https://tropicflow.com/cdn/shop/files/red_rili_neocaridina_shrimp.jpg?v=1737400632&width=713',
    inStock: true,
    colors: ['Kırmızı', 'Canlı Kırmızı', 'Şeffaf Yamalar'],
    socialBehavior: 'Barışçıl, neşeli',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '4-8 dGH'
    },
    size: '1.9-2.5 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay üretim, yumurta taşıyıcı',
    diet: 'Omnivor, yosun, biyofilm, ticari karides peletleri, haşlanmış sebzeler',
    lifespan: '1-2 yıl',
    tankSize: 'Minimum 19L (5 galon)'
  },

  // Plants Category
  {
    id: 'plants-1',
    name: 'Anubias Bitkisi',
    category: 'plants',
    price: 9.99,
    description: 'Dayanıklı Anubias bitkisi, düşük ışık koşullarında bile gelişir. Akvaryumunuzda doğal bir görünüm sağlar.',
    shortDescription: 'Dayanıklı Anubias bitkisi, düşük ışıkta bile gelişir.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'plants-2',
    name: 'Java Moss',
    category: 'plants',
    price: 7.99,
    description: 'Hızlı büyüyen Java Moss, akvaryumunuzda yoğun yeşil örtü oluşturur. Balıklar için mükemmel saklanma yeri.',
    shortDescription: 'Hızlı büyüyen Java Moss, yoğun yeşil örtü oluşturur.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'plants-3',
    name: 'Amazon Kılıcı',
    category: 'plants',
    price: 11.99,
    description: 'Büyük yapraklı Amazon Kılıcı, akvaryumunuzda etkileyici bir görünüm sağlar. Orta ışık koşullarında gelişir.',
    shortDescription: 'Büyük yapraklı Amazon Kılıcı, etkileyici görünüm sağlar.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },

  // Equipment Category
  {
    id: 'equipment-11',
    name: 'SOBO Dış Askı Filtresi SF-350F',
    category: 'equipment',
    price: 89.99,
    description: 'Güçlü ve sessiz akvaryum filtresi. Su kalitesini korur ve balıklarınız için sağlıklı bir ortam sağlar.',
    shortDescription: 'Güçlü ve sessiz akvaryum filtresi.',
    image: 'https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/6154e259-319d-4562-9c29-cbd92e981b63/image_2560.webp',
    inStock: true,
    featured: true,
  },
  {
    id: 'equipment-12',
    name: 'Eurostar HBL802 Askı Filtre 500L/H 6W',
    category: 'equipment',
    price: 89.99,
    description: '60 - 100 litreye kadar olan akvaryumlarda mekanik, kimyasal ve biyolojik temizlik sağlayan, 6 watt gücünde, saatte 500 litre filtrasyon kapasitesine sahip askı dış filtredir.',
    shortDescription: 'Güçlü ve sessiz akvaryum filtresi.',
    image: 'https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/556db63d-ae7d-4f63-a7fe-7dc9ddbc5e3c/image_1080.webp',
    inStock: true,
    featured: true,
  },
  {
    id: 'equipment-2',
    name: 'Isıtıcı',
    category: 'equipment',
    price: 29.99,
    description: 'Dijital termostatlı akvaryum ısıtıcısı. Su sıcaklığını sabit tutar.',
    shortDescription: 'Dijital termostatlı akvaryum ısıtıcısı.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'equipment-3',
    name: 'LED Aydınlatma',
    category: 'equipment',
    price: 59.99,
    description: 'Enerji tasarruflu LED aydınlatma sistemi. Bitkileriniz için mükemmel ışık sağlar.',
    shortDescription: 'Enerji tasarruflu LED aydınlatma sistemi.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'equipment-4',
    name: 'Hava Motoru',
    category: 'equipment',
    price: 24.99,
    description: 'Sessiz çalışan hava motoru. Akvaryumunuza oksijen sağlar ve su sirkülasyonunu artırır.',
    shortDescription: 'Sessiz çalışan hava motoru ile oksijen sağlayın.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
    new: true,
  },
  {
    id: 'equipment-5',
    name: 'Dış Filtre',
    category: 'equipment',
    price: 149.99,
    description: 'Güçlü dış filtre sistemi. Büyük akvaryumlar için ideal, üç aşamalı filtreleme sistemi.',
    shortDescription: 'Güçlü dış filtre sistemi ile üstün su kalitesi.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'equipment-6',
    name: 'CO2 Sistemi',
    category: 'equipment',
    price: 199.99,
    description: 'Profesyonel CO2 sistemi. Bitkili akvaryumlar için gerekli karbondioksit desteği sağlar.',
    shortDescription: 'Profesyonel CO2 sistemi ile bitki büyümesini destekleyin.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'equipment-7',
    name: 'UV Sterilizatör',
    category: 'equipment',
    price: 79.99,
    description: 'UV sterilizatör ile suyunuzu temiz tutun. Zararlı bakterileri ve algleri yok eder.',
    shortDescription: 'UV sterilizatör ile su kalitesini artırın.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },

  // Accessories Category
  {
    id: 'accessories-1',
    name: 'Akvaryum Dekorasyonu',
    category: 'accessories',
    price: 19.99,
    description: 'Doğal görünümlü akvaryum dekorasyonu. Balıklarınız için saklanma yeri sağlar.',
    shortDescription: 'Doğal görünümlü akvaryum dekorasyonu.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'accessories-2',
    name: 'Su Test Kitleri',
    category: 'accessories',
    price: 24.99,
    description: 'Kapsamlı su test kitleri. pH, amonyak, nitrit ve nitrat seviyelerini ölçer.',
    shortDescription: 'Kapsamlı su test kitleri.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'accessories-3',
    name: 'Akvaryum Temizlik Seti',
    category: 'accessories',
    price: 34.99,
    description: 'Akvaryum temizliği için gerekli tüm araçları içeren set. Dip çekme hortumu ve sünger dahil.',
    shortDescription: 'Akvaryum temizliği için gerekli tüm araçları içeren set.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },

  // Food Category
  {
    id: 'food-1',
    name: 'Premium Balık Yemi',
    category: 'food',
    price: 14.99,
    description: 'Yüksek kaliteli premium balık yemi. Dengeli beslenme sağlar ve canlı renkler geliştirir.',
    shortDescription: 'Yüksek kaliteli premium balık yemi.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'food-2',
    name: 'Karides Yemi',
    category: 'food',
    price: 9.99,
    description: 'Karidesler için özel formül yem. Protein açısından zengin ve sağlıklı büyüme sağlar.',
    shortDescription: 'Karidesler için özel formül yem.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'food-3',
    name: 'Bitki Yemi',
    category: 'food',
    price: 12.99,
    description: 'Akvaryum bitkileri için sıvı gübre. Hızlı büyüme ve canlı renkler sağlar.',
    shortDescription: 'Akvaryum bitkileri için sıvı gübre.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    inStock: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};


