# 🦐 Sedef Akvaryum - Profesyonel E-Ticaret Platformu

**Modern, güvenli ve yüksek performanslı akvaryum ürünleri satış platformu**

Sedef Akvaryum için özel olarak geliştirilmiş, Firebase tabanlı, güvenli ve ölçeklenebilir e-ticaret çözümü. Balık, karides, ekipman ve aksesuar kategorilerinde geniş ürün yelpazesi sunan profesyonel web platformu.

## 🌟 Platform Özellikleri

### 🔐 Güvenlik & Performans
- **Firebase Authentication** - Server-side güvenli kimlik doğrulama
- **Firestore Database** - Gerçek zamanlı veri senkronizasyonu
- **Content Security Policy (CSP)** - XSS ve güvenlik saldırılarına karşı koruma
- **Rate Limiting** - Brute-force saldırılarına karşı koruma
- **Environment Variables** - Hassas bilgilerin güvenli yönetimi
- **Production Console Logs** - Hassas bilgi sızıntısı önleme

### 🎨 Kullanıcı Deneyimi
- **Responsive Design** - Mobil, tablet ve desktop uyumlu
- **Modern UI/UX** - Tailwind CSS ile şık tasarım
- **Loading States** - Kullanıcı dostu yükleme animasyonları
- **Error Handling** - Kapsamlı hata yönetimi ve kullanıcı bildirimleri
- **SEO Optimized** - Arama motorları için optimize edilmiş
- **Accessibility (A11y)** - Erişilebilirlik standartlarına uygun

### 🛍️ E-Ticaret Özellikleri
- **Kategori Bazlı Ürün Listeleme** - Balık, Karides, Bitki, Ekipman, Aksesuar
- **Detaylı Ürün Sayfaları** - Bakım bilgileri, su parametreleri, hızlı bilgiler
- **Gelişmiş Arama** - Ürün arama ve filtreleme sistemi
- **WhatsApp Entegrasyonu** - Kolay sipariş ve iletişim
- **Google Reviews** - Müşteri yorumları entegrasyonu
- **Admin Panel** - Ürün yönetimi, slider düzenleme, stok takibi

### 📊 Analytics & Monitoring
- **Google Analytics 4** - Detaylı kullanıcı analizi
- **Performance Monitoring** - Sayfa yükleme hızı takibi
- **Error Tracking** - Hata raporlama ve analiz
- **User Behavior** - Kullanıcı davranış analizi

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 16+ 
- npm veya yarn
- Firebase projesi
- Google Analytics hesabı

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/your-username/sedef-akvaryum.git
cd sedef-akvaryum

# Bağımlılıkları yükleyin
npm install

# Environment variables'ları ayarlayın
cp env.example .env.local
# .env.local dosyasını düzenleyin

# Geliştirme sunucusunu başlatın
npm start
```

**Site açılacak:** http://localhost:3000

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
   REACT_APP_ADMIN_EMAIL=admin@yourdomain.com
   REACT_APP_MODERATOR_EMAIL=moderator@yourdomain.com
   NODE_ENV=production
   GENERATE_SOURCEMAP=false
   ```

4. **Security Headers:**
   ```
   Content-Security-Policy: [CSP değeri]
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   X-XSS-Protection: 1; mode=block
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
- **Aksesuar Kategorisi** - Dekorasyon ve bakım malzemeleri

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