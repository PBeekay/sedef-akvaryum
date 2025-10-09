# 🦐 Sedef Akvaryum - E-Ticaret Platformu

Modern, hızlı ve kullanıcı dostu akvaryum ürünleri satış platformu.

## 🚀 Hızlı Başlangıç

```bash
# Paketleri yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

**Site açılacak:** http://localhost:3000

---

## 📁 Proje Yapısı

```
sedefak/
├── src/                        # React kaynak kodları
│   ├── components/            # UI bileşenleri
│   ├── pages/                 # Sayfa bileşenleri
│   ├── context/               # State yönetimi
│   ├── data/                  # Ürün verileri
│   ├── utils/                 # Yardımcı fonksiyonlar
│   └── types/                 # TypeScript tipleri
│
├── public/                     # Statik dosyalar
├── build/                      # Production build (npm run build)
└── package.json                # Bağımlılıklar
```

---

## 🎯 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Kategori bazlı ürün listeleme (Balık, Karides, Ekipman vb.)
- ✅ Detaylı ürün sayfaları
- ✅ Arama fonksiyonu
- ✅ WhatsApp entegrasyonu (kolay sipariş)
- ✅ Google Reviews
- ✅ SEO optimizasyonu
- ✅ Erişilebilirlik (A11y)
- ✅ Admin paneli (LocalStorage tabanlı)

---

## 🛠️ Geliştirme Komutları

```bash
npm start              # Geliştirme sunucusu (port 3000)
npm run build          # Production build
npm test               # Testleri çalıştır
npm run test:coverage  # Test coverage raporu
```

---

## 🌐 Production Deployment

### Build Alma

```bash
npm run build
```

`build/` klasörü oluşacak. Bu klasörü hosting'e yükleyin.

### Önerilen Hosting Platformları

**Ücretsiz:**
- Netlify (Önerilen)
- Vercel
- GitHub Pages

**Ücretli:**
- cPanel (Shared hosting)
- DigitalOcean ($5/ay)

### cPanel Kurulumu

1. `npm run build` çalıştırın
2. `build/` klasörü içindeki **tüm dosyaları** `public_html/` klasörüne yükleyin
3. `.htaccess` dosyası oluşturun (React Router için):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔧 Teknolojiler

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- LocalStorage (veri yönetimi)

---

## 📱 Sayfalar

- **Ana Sayfa** - Slider, kategoriler, öne çıkan ürünler
- **Kategori Sayfası** - Kategoriye özel ürün listesi
- **Ürün Detay** - Detaylı ürün bilgileri
- **Arama** - Ürün arama ve filtreleme
- **İletişim** - İletişim bilgileri ve harita
- **Admin** - Ürün/slider yönetimi (LocalStorage)

---

## 📞 İletişim

**Sedef Akvaryum Hediye Evi**
- 📍 Eskişehir
- 📱 WhatsApp: +90 555 555 5555
- 🌐 Website: sedefakvaryum.com

---

## 📝 Lisans

Bu proje Sedef Akvaryum için özel olarak geliştirilmiştir.

---

Başarılar! 🎉