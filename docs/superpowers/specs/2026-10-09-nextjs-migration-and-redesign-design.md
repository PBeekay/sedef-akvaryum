# Sedef Akvaryum - Next.js App Router Dönüşümü ve Modern Tasarım Tasarımı

- **Tarih:** 2026-10-09
- **Durum:** Onaylandı (Spec Review)
- **Hedef:** Create React App (CRA) tabanlı frontend mimarisini Next.js App Router'a taşımak, modern minimalist su temalı yeni bir vitrin tasarlamak, 2.720 satırlık monolitik admin panelini modüler hale getirmek ve Render üzerinde yüksek performansla yayına almak.

---

## 1. Genel Bakış ve Amaç

Sedef Akvaryum web platformu şu anda Create React App (`react-scripts 5.0.1`), React 18, React Router v6 ve Tailwind CSS kullanmaktadır. Bu yapı istemci taraflı render (CSR) sınırlamaları nedeniyle SEO, WhatsApp link önizlemeleri (OpenGraph) ve ilk yükleme hızında (LCP) darboğazlara yol açmaktadır. Ayrıca `AdminPage.tsx` dosyasının 2.720 satırlık tek bir monolitik bileşende toplanmış olması ciddi bir teknik borçtur.

Bu proje ile:
1. **Frontend Mimarisi:** Next.js (App Router) mimarisine taşınacak.
2. **Görsel Tasarım:** "Modern Minimalist & Canlı Su Teması" (ferah açık zemin, buzlu cam dokular, derin okyanus & zümrüt detayları) ile sıfırdan yenilenecek.
3. **İşlevsellik:** Tüm mevcut işlevler (katalog, kategori filtreleri, WhatsApp siparişi, Google yorumları, Firebase veri tabanı, stok takibi, slider yönetimi) eksiksiz korunacak.
4. **Teknik Borç:** 2.720 satırlık `AdminPage.tsx` dosyası bağımsız alt rotalara ve modüler bileşenlere ayrılacak.
5. **Barındırma:** Render üzerinde Node.js Web Service olarak sorunsuz şekilde çalıştırılacak.

---

## 2. Kapsam ve Sınırlar (Scope & Non-Goals)

### Kapsam İçi (Goals)
- Next.js App Router (`app/`) dizin mimarisi ve Route Groups (`(shop)` ve `(admin)`).
- Sunucu taraflı rendering (SSR) ve `generateMetadata` ile ürün detay sayfalarında dinamik WhatsApp kartı (OpenGraph görsel, başlık ve fiyat).
- `next/image` entegrasyonu ile otomatik WebP sıkıştırma ve sıfır layout shift (CLS).
- Modüler Admin Paneli:
  - `/admin` (Dashboard & Özet)
  - `/admin/products` (Ürün CRUD & Firebase Storage görsel yükleme)
  - `/admin/stock` (Stok güncelleme & kritik stok alarmları)
  - `/admin/sliders` (Hero vitrin afiş yönetimi)
  - `/admin/login` (Firebase Auth admin girişi)
- Firebase Firestore, Firebase Storage ve Firebase Auth ile tam entegrasyon (mevcut canlı verilerde sıfır kayıp).
- Render Web Service ortam değişkenleri ve build optimizasyonu (`NEXT_PUBLIC_` prefix standardı).

### Kapsam Dışı (Non-Goals)
- Firebase'den farklı bir veritabanına geçiş yapılmayacaktır (Firestore yapısı korunur).
- Sanal pos / online ödeme geçidi eklenmeyecektir (WhatsApp sipariş ve danışmanlık modeli korunacaktır).

---

## 3. Sistem Mimarisi & Dizin Yapısı

Next.js App Router yapısında mağaza arayüzü ile yönetim paneli birbirinden bağımsız `layout` dosyalarıyla izole edilir:

```text
sedef-akvaryum/
├── app/
│   ├── (shop)/                           # Mağaza Vitrini Grubu
│   │   ├── layout.tsx                    # Cam Navbar, Footer, WhatsApp Floating Button
│   │   ├── page.tsx                      # Ana Sayfa (Hero Slider, Canlı Vitrini, Yorumlar)
│   │   ├── category/
│   │   │   └── [slug]/page.tsx           # Kategori Sayfası (Filtreleme & Sonsuz Kaydırma)
│   │   ├── product/
│   │   │   └── [id]/page.tsx             # Ürün Detayı (Server-Side Metadata & WhatsApp CTA)
│   │   ├── search/
│   │   │   └── page.tsx                  # Arama Sayfası
│   │   └── not-found.tsx                 # 404 Sayfası
│   ├── (admin)/admin/                    # Yönetim Paneli Grubu
│   │   ├── layout.tsx                    # Admin Sidebar + Firebase Auth Guard
│   │   ├── page.tsx                      # Dashboard İstatistikleri
│   │   ├── products/
│   │   │   └── page.tsx                  # Ürün Listesi & Filtreleme
│   │   ├── stock/
│   │   │   └── page.tsx                  # Stok Tablosu & Eşikler
│   │   ├── sliders/
│   │   │   └── page.tsx                  # Vitrin Slider Yönetimi
│   │   └── login/
│   │       └── page.tsx                  # Güvenli Giriş Formu
│   ├── globals.css                       # Tailwind + Cam/Aqua Teması
│   └── layout.tsx                        # Kök HTML & Fontlar
├── components/
│   ├── shop/                             # Mağaza Bileşenleri
│   │   ├── Navbar.tsx                    # Frosted Glass Üst Menü
│   │   ├── Footer.tsx                    # Kurumsal Alt Bilgi
│   │   ├── HeroSlider.tsx                # Panoramik Vitrin Slaytı
│   │   ├── ProductCard.tsx               # Yeni Nesil Canlı/Ürün Kartı
│   │   ├── WhatsAppButton.tsx            # Hızlı Sipariş / Destek
│   │   ├── ReviewsSection.tsx            # Google Müşteri Yorumları
│   │   └── FilterSidebar.tsx             # Kategori ve Canlı Filtreleri
│   ├── admin/                            # Yönetim Paneli Bileşenleri
│   │   ├── AdminSidebar.tsx              # Yan Navigasyon Menüsü
│   │   ├── ProductFormModal.tsx          # Ürün Ekle/Düzenle Formu
│   │   ├── ImageUploader.tsx             # Firebase Storage Görsel Yükleyici
│   │   ├── StockRow.tsx                  # Tekil Stok Satırı & Düzenleme
│   │   ├── SliderEditorModal.tsx         # Slayt Ekle/Düzenle
│   │   └── ConfirmDeleteModal.tsx        # Güvenli Silme Onayı
│   └── ui/                               # Atomik Arayüz Bileşenleri
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Badge.tsx
│       └── Toast.tsx
├── lib/
│   ├── firebase/                         # Firebase Entegrasyonu
│   │   ├── client.ts                     # Auth, Firestore, Storage başlatıcı
│   │   └── services.ts                   # CRUD yardımcı servis fonksiyonları
│   ├── data/
│   │   └── products.ts                   # Yerel Fallback / Varsayılan Veri
│   └── utils.ts                          # Genel yardımcı araçlar & formatlayıcılar
└── types/
    ├── product.ts                        # Product, CareInfo, WaterParameters tipleri
    ├── slider.ts                         # SliderData tipi
    └── stock.ts                          # StockItem tipi
```

---

## 4. Kullanıcı Deneyimi ve Görsel Tasarım (UI/UX)

- **Renk Paleti & Atmosfer:**
  - Zemin: Temiz beyaz (`bg-white`), açık buz mavisi (`bg-slate-50 / bg-sky-50/30`).
  - Vurgu Renkleri: Derin okyanus mavisi (`text-sky-900 / bg-sky-600`), zümrüt su altı yeşili (`emerald-500`), mercan kırmızısı (indirim ve stok uyarıları için).
  - Cam Efektleri: `backdrop-blur-md bg-white/80 border border-sky-100/70 shadow-sm`.
- **Ürün Kartı:**
  - Resim üstünde "Yeni" veya "Öne Çıkan" rozetleri.
  - Canlılar için mini su parametresi ikonları (Örn: `24-28°C`, `pH 6.5-7.5`).
  - Stok durumu göstergesi (Stokta / Son X Adet / Tükendi).
  - "WhatsApp ile Sipariş Ver" hızlı aksiyon butonu.
- **WhatsApp Entegrasyonu:**
  - Tek tıkla ilgili ürünün adı, kodu, fiyatı ve web adresi önceden doldurulmuş hazır mesajla doğrudan WhatsApp web/mobil uygulamasına yönlendirir.

---

## 5. Yönetim Paneli (Admin) Çözümü

2.720 satırlık `AdminPage.tsx` aşağıdaki bağımsız birimlere dönüştürülür:

1. **`app/(admin)/admin/layout.tsx`:** `onAuthStateChanged` ile Firebase Auth durumunu dinler; oturum açık değilse veya kullanıcı admin/moderatör değilse `/admin/login` sayfasına yönlendirir.
2. **`app/(admin)/admin/page.tsx`:** Toplam ürün sayısı, tükenmek üzere olan stoklar, aktif slaytlar ve sistem durumunu gösteren Dashboard.
3. **`app/(admin)/admin/products/page.tsx` + `ProductFormModal.tsx`:**
   - Kategoriye göre dinamik form (Balık için su değerleri ve bakım, bitki için CO2/Işık, ekipman için standart alanlar).
   - `ImageUploader.tsx`: Firebase Storage yüklemelerini ilerleme çubuğuyla (upload progress) yönetir.
4. **`app/(admin)/admin/stock/page.tsx`:**
   - Sayısal stok girişi, kritik stok eşik ayarı.
5. **`app/(admin)/admin/sliders/page.tsx`:**
   - Vitrin slaytları listesi ve sürükle-bırak / tek tıkla düzenleme.

---

## 6. Veri Katmanı ve Firebase Uyumu

- **Firestore Koleksiyonları:**
  - `products`: Ürünlerin ve canlıların tüm teknik özellikleri, fiyatları ve görsel URL'leri.
  - `sliders`: Vitrin afişleri, kampanya rozetleri ve buton yönlendirmeleri.
- **Firebase Storage:**
  - `/products/{filename}` ve `/sliders/{filename}` dizinlerinde görseller saklanır.
- **Firebase Auth:**
  - Admin ve moderatör e-posta doğrulaması.

---

## 7. Render Barındırma ve Ortam Değişkenleri

- **Ortam Değişkenleri:**
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
  - `NEXT_PUBLIC_ADMIN_EMAIL`
- **Render Ayarları:**
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
  - Node.js Version: `>= 20.x`

---

## 8. Doğrulama ve Test Kriterleri

1. **Derleme Kontrolü:** `npm run build` komutunun hatasız (0 lint / 0 type hatası ile) tamamlanması.
2. **SEO & OpenGraph Doğrulaması:** Ürün detay sayfalarında `og:image`, `og:title`, `og:description` etiketlerinin sunucu çıktısında yer alması.
3. **Görsel Performansı:** `next/image` ile görsellerin modern formatlarda ve CLS hatası vermeden yüklenmesi.
4. **Admin İşlevselliği:**
   - Giriş yapma ve oturum koruma.
   - Ürün ekleme, düzenleme, silme ve Firebase Storage'a görsel yükleme.
   - Stok miktarını güncelleme ve kritik stok alarmları.
   - Slider ekleme ve güncelleme.
5. **WhatsApp Sipariş Akışı:** Ürün kartı ve detay sayfasından mesaj şablonunun doğru formatta WhatsApp'a aktarılması.
