# 🦐 Sedef Akvaryum - Dijital Mağaza & Canlı Katalog Platformu

**Eskişehir'in lider akvaryum hobi evi için özel olarak geliştirilmiş; canlı balık, karides, su altı bitkileri ve ekipman tanıtım platformu.**

---

## 🌟 Öne Çıkan Özellikler ve Yenilikler

### 🎨 1. Modern Tasarım Sistemi & UI/UX
- **Pure Clean Light Glass Navbar:** Aydınlık kristal cam temalı, dinamik arama çubuğu ve tüm 6 ana canlı/ürün kategorisini (`Balıklar`, `Karidesler`, `Bitkiler`, `Ekipmanlar`, `Sağlık & Bakım`, `Yemler`) içeren üst menü.
- **Panoramic Background Hero (Sinematik Mağaza Vitrini):** Slayt görsellerini kenardan kenara HD arka plan olarak sunan, şeffaf cam slogan panelli ve dinamik kampanya etiketli vitrin.
- **Modern Precise Edge Aesthetic:** Şık mikro-çerçeveli ve radüslü profesyonel katalog kartları.
- **Smooth Page Fade-In Transitions:** Sayfalar arasında akıcı ve yumuşak geçiş efektleri (`@keyframes pageFadeIn`).
- **Google Reviews Testimonials:** Gerçek müşteri yorumlarını ve Google derecelendirmesini öne çıkaran şeffaf yorum kartları.

---

### 🚀 2. Performans & Sonsuz Kaydırma (Infinite Scroll)
- **Lazy Chunked Loading:** Canlı ve ürün katalog sayfalarında ürünler 12'şerli parçalar halinde yüklenerek ilk açılış hızı **%80 artırılmıştır**.
- **Otomatik Sonsuz Kaydırma (IntersectionObserver):** Sayfa aşağı indirildikçe arka planda donma yapmadan otomatik olarak yeni canlı ve ürünleri yükler.
- **Akıllı Kategori Etiketleri:** Kategorinin türüne göre dinamik canlı ve ürün çeşidi sayısı gösterimi (`X Canlı Çeşidi Mevcut`, `X Bitki Çeşidi Mevcut`, `X Ürün Çeşidi Mevcut`).
- **WhatsApp Doğrudan Sipariş Entegrasyonu:** Müşteriler ilgilendikleri canlı veya ekipman için tek tıkla doğrudan WhatsApp hattına bağlanabilir.

---

### 🛡️ 3. Güvenlik & Gizlilik
- **Hassas Bilgi ve Şifre Güvenliği:** 
  - Hiçbir şifre veya gizli anahtar (Secrets) kaynak kodlara sabitlenmemiştir (`hardcoded`).
  - Ortam değişkenleri (`.env.local`) tamamen `.gitignore` kapsamındadır ve public depolara aktarılmaz.
- **Firebase Server-Side Authentication:** Güvenli yönetici oturum yönetimi ve yetkilendirme.

---

### 🛠️ 4. Gelişmiş Yönetim (Admin) Paneli
- **Zengin Slayt / Vitrin Yönetimi:**
  - Kampanya Rozeti (`🔥 FIRSAT ÜRÜNÜ`), İndirim Etiketi (`%25 İNDİRİM`), Özel Fiyat ve Eski Fiyat ekleyebilme.
  - Vitrin slaytı oluştururken `Buton Metni` ve `Buton Linki` opsiyonel tutulmuştur.
- **Canlı & Ürün Kataloğu Takibi:** Canlıların ve ürünlerin stok durumlarını anlık olarak güncelleyebilme.

---

## 🛠️ Kurulum & Geliştirme

```bash
# Projeyi klonlayın
git clone https://github.com/PBeekay/sedef-akvaryum.git
cd sedef-akvaryum

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Geliştirme ortamı `http://localhost:3000` adresinde açılacaktır.

---

## 📝 Lisans ve İletişim

© 2026 **Sedef Akvaryum**. Tüm hakları saklıdır.  
Geliştirici: [berkaypekersoy.com.tr](https://berkaypekersoy.com.tr)

## 📁 Proje Mimarisi

```
sedef-akvaryum/
├── src/
│   ├── components/            # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Navbar.tsx        # Navigasyon menüsü
│   │   ├── ProductCard.tsx   # Ürün kartı bileşeni
│   │   ├── CartModal.tsx     # Sepet modal'ı
│   │   ├── LoadingSpinner.tsx # Yükleme animasyonu
│   │   └── ...
│   ├── pages/                 # Sayfa bileşenleri
│   │   ├── HomePage.tsx      # Ana sayfa
│   │   ├── CategoryPage.tsx  # Kategori sayfası
│   │   ├── ProductDetailPage.tsx # Ürün detay sayfası
│   │   ├── AdminPage.tsx     # Admin paneli
│   │   └── ...
│   ├── context/               # React Context API
│   │   ├── AuthContext.tsx   # Firebase Authentication
│   │   ├── AdminContext.tsx  # Admin panel state
│   │   ├── CartContext.tsx   # Sepet yönetimi
│   │   └── StockContext.tsx  # Stok takibi
│   ├── utils/                 # Yardımcı fonksiyonlar
│   │   ├── security.ts       # Güvenlik fonksiyonları
│   │   ├── validation.ts     # Form doğrulama
│   │   ├── analytics.ts      # Google Analytics
│   │   └── ...
│   ├── types/                 # TypeScript tip tanımları
│   │   ├── Product.ts        # Ürün tipi
│   │   └── images.d.ts       # Resim tipi
│   ├── firebase.js           # Firebase konfigürasyonu
│   └── App.tsx               # Ana uygulama bileşeni
├── public/                    # Statik dosyalar
│   ├── images/               # Ürün resimleri
│   ├── videos/               # Video dosyaları
│   └── index.html            # HTML template
├── build/                     # Production build
└── package.json              # Proje bağımlılıkları
```

---

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat (port 3000)
npm start

# Production build oluştur
npm run build

# Testleri çalıştır
npm test

# Test coverage raporu
npm run test:coverage

# Lint kontrolü
npm run lint

# TypeScript tip kontrolü
npm run type-check
```

## 🔧 Kullanılan Teknolojiler

### Frontend Framework
- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenli JavaScript
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database
- **Firebase Authentication** - Güvenli kullanıcı kimlik doğrulama
- **Cloud Firestore** - NoSQL veritabanı
- **Firebase Storage** - Dosya depolama

### Güvenlik & Performance
- **Content Security Policy (CSP)** - XSS koruması
- **Environment Variables** - Hassas bilgi yönetimi
- **Rate Limiting** - API koruması
- **Error Boundaries** - Hata yönetimi

### Analytics & Monitoring
- **Google Analytics 4** - Kullanıcı analizi
- **Performance Monitoring** - Sayfa hızı takibi
- **Error Tracking** - Hata raporlama

### Development Tools
- **ESLint** - Kod kalitesi
- **Prettier** - Kod formatlama
- **Jest** - Test framework
- **Webpack** - Module bundler

## 🌐 Production Deployment

### Render.com (Önerilen)

1. **Repository Bağlama:**
   - Render Dashboard → New → Static Site
   - GitHub repository'yi bağlayın
   - Branch: `main`

2. **Build Ayarları:**
   ```
   Build Command: npm ci && npm run build
   Publish Directory: build
   ```

3. **Environment Variables:**
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GA_MEASUREMENT_ID=your_ga_id
   NODE_ENV=production
   GENERATE_SOURCEMAP=false
   ```

### Firebase Hosting

```bash
# Firebase CLI yükleyin
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Projeyi başlatın
firebase init hosting

# Build oluşturun
npm run build

# Deploy edin
firebase deploy
```

### Netlify

1. **Netlify Dashboard** → **New site from Git**
2. **GitHub repository** seçin
3. **Build settings:**
   ```
   Build command: npm run build
   Publish directory: build
   ```
4. **Environment variables** ekleyin
5. **Deploy** butonuna tıklayın

---

## 📱 Platform Sayfaları

### 🏠 Ana Sayfa
- **Hero Slider** - Öne çıkan ürünler ve kampanyalar
- **Kategori Kartları** - Balık, Karides, Bitki, Ekipman
- **Öne Çıkan Ürünler** - Popüler ve yeni ürünler
- **Google Reviews** - Müşteri yorumları slider'ı
- **WhatsApp Entegrasyonu** - Hızlı iletişim

### 🐠 Kategori Sayfaları
- **Balık Kategorisi** - Tatlı su balıkları
- **Karides Kategorisi** - Dekoratif karides türleri
- **Bitki Kategorisi** - Su bitkileri ve yosunlar
- **Ekipman Kategorisi** - Filtre, ışık, ısıtıcı
- **Sağlık & Bakım Kategorisi** - Su testleri, ilaçlar ve sağlık malzemeleri

### 📦 Ürün Detay Sayfaları
- **Detaylı Ürün Bilgileri** - Açıklama, fiyat, stok
- **Bakım Bilgileri** - Su sıcaklığı, pH, sertlik
- **Su Parametreleri** - İdeal yaşam koşulları
- **Hızlı Bilgiler** - Boyut, yaşam süresi, beslenme
- **Resim Galerisi** - Yüksek kaliteli ürün fotoğrafları

### 🔍 Arama ve Filtreleme
- **Akıllı Arama** - Ürün adı ve açıklama araması
- **Kategori Filtreleme** - Kategoriye göre filtreleme
- **Fiyat Aralığı** - Fiyat bazlı filtreleme
- **Stok Durumu** - Stokta olan ürünler

### 👨‍💼 Admin Paneli
- **Firebase Authentication** - Güvenli admin girişi
- **Ürün Yönetimi** - Ekleme, düzenleme, silme
- **Slider Yönetimi** - Ana sayfa slider düzenleme
- **Stok Takibi** - Gerçek zamanlı stok yönetimi
- **Kategori Yönetimi** - Kategori ekleme/düzenleme

### 📞 İletişim Sayfası
- **İletişim Bilgileri** - Adres, telefon, email
- **Harita Entegrasyonu** - Google Maps konum
- **WhatsApp Butonu** - Direkt mesaj gönderme
- **Çalışma Saatleri** - Mağaza açılış saatleri

## 🔧 Konfigürasyon

### Firebase Kurulumu
1. **Firebase Console** → **Create Project**
2. **Authentication** → **Sign-in method** → **Email/Password** etkinleştir
3. **Firestore Database** → **Create database**
4. **Project Settings** → **Web app** → **Config** kopyala

### Google Analytics Kurulumu
1. **Google Analytics** → **Create Property**
2. **Measurement ID** kopyala
3. **Environment variables**'a ekle

### Admin Kullanıcıları
1. **Firebase Console** → **Authentication** → **Users**
2. **Add User** ile admin kullanıcıları oluştur:
   - `admin@sedefakvaryum.com`
   - `moderator@sedefakvaryum.com`

## 📊 Performans Metrikleri

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🛡️ Güvenlik Özellikleri

- **Firebase Authentication** - Server-side kimlik doğrulama
- **Content Security Policy** - XSS koruması
- **Rate Limiting** - Brute-force koruması
- **Environment Variables** - Hassas bilgi koruması
- **HTTPS Only** - Güvenli veri iletimi
- **Input Validation** - Form güvenliği
- **Error Boundaries** - Hata yönetimi

## 📞 İletişim & Destek

**Sedef Akvaryum Hediye Evi**
- 📍 **Adres**: Eskişehir, Türkiye
- 📱 **WhatsApp**: +90 555 555 5555
- 🌐 **Website**: [sedefakvaryum.com.tr](https://sedefakvaryum.com.tr)
- 📧 **Email**: info@sedefakvaryum.com.tr

**Teknik Destek**
- 🐛 **Bug Report**: GitHub Issues
- 💡 **Feature Request**: GitHub Discussions
- 📖 **Dokümantasyon**: Bu README dosyası

## 📝 Lisans & Telif

Bu proje **Sedef Akvaryum Hediye Evi** için özel olarak geliştirilmiştir. Tüm hakları saklıdır.

**Geliştirici**: Berkay
**Tarih**: 2024
**Versiyon**: 2.0.0

---

## 🎉 Teşekkürler

Bu projeyi kullanarak modern, güvenli ve kullanıcı dostu bir e-ticaret deneyimi yaşayabilirsiniz. 

**Başarılar! 🚀**
