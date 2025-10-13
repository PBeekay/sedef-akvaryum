# ⚡ Firebase Hızlı Başlangıç Kılavuzu

## 🚀 5 Dakikada İlk Ürünü Ekleyin

### 1️⃣ Firebase Console'a Giriş
```
1. https://console.firebase.google.com/ → Giriş Yap
2. "sedef-akvaryum" projesini seç
3. Sol menüden "Firestore Database" tıkla
```

### 2️⃣ Yeni Ürün Belgesi Oluştur
```
1. "products" collection'ını bul
2. "+ Belge ekle" butonuna tıkla
3. Belge Kimliği: Otomatik Kimlik (veya özel ID)
```

### 3️⃣ Temel Alanları Ekle

#### ✏️ Her Alan İçin: "+ Alan ekle" Butonunu Kullan

```
Alan Adı: name
Tür: string
Değer: "Neon Tetra"
[Ekle]

Alan Adı: category
Tür: string
Değer: "fish"
[Ekle]

Alan Adı: price
Tür: number
Değer: 15.50
[Ekle]

Alan Adı: description
Tür: string
Değer: "Akvaryumların vazgeçilmez balığı..."
[Ekle]

Alan Adı: shortDescription
Tür: string
Değer: "Barışçıl ve renkli balık"
[Ekle]

Alan Adı: image
Tür: string
Değer: "/images/products/neon_tetra.png"
[Ekle]

Alan Adı: inStock
Tür: boolean
Değer: true
[Ekle]
```

### 4️⃣ Balık İçin Özel Alanlar (Map)

#### 🔵 quickInfo Ekleme

```
1. + Alan ekle
   Alan Adı: quickInfo
   Tür: map
   [Ekle]

2. quickInfo'nun yanındaki > işaretine tıkla (genişlet)

3. quickInfo içinde + Alan ekle:
   - size: string → "4 cm"
   - temperament: string → "Peaceful"
   - careLevel: string → "Easy"
```

#### 🟢 careInfo Ekleme

```
1. + Alan ekle (Ana seviyede)
   Alan Adı: careInfo
   Tür: map
   [Ekle]

2. careInfo içinde + Alan ekle:
   - diet: string → "Omnivore"
   - family: string → "Characidae"
   - origin: string → "Güney Amerika"
   - aquariumSize: string → "40 Litre"
   - lifespan: string → "3-5 yıl"
```

#### 🟣 waterParameters Ekleme

```
1. + Alan ekle (Ana seviyede)
   Alan Adı: waterParameters
   Tür: map
   [Ekle]

2. waterParameters içinde + Alan ekle:
   - temperature: string → "22-26°C"
   - pH: string → "6.0-7.0"
   - hardness: string → "2-10 dGH"
```

### 5️⃣ Kaydet ve Kontrol Et

```
1. Tüm alanları ekledikten sonra "Kaydet" butonuna tıkla
2. Web sitenize gidin ve ürünü kontrol edin
3. Admin panelden ürünü düzenleyebilirsiniz
```

---

## 📋 Kopya-Yapıştır Şablonlar

### 🐟 Balık Ürünü - Alan İsimleri (Sırayla)

```
1. name (string)
2. category (string) → "fish"
3. price (number)
4. description (string)
5. shortDescription (string)
6. image (string)
7. inStock (boolean) → true
8. featured (boolean) → false
9. quickInfo (map)
   ├─ size (string)
   ├─ temperament (string)
   └─ careLevel (string)
10. careInfo (map)
    ├─ diet (string)
    ├─ family (string)
    ├─ origin (string)
    ├─ aquariumSize (string)
    └─ lifespan (string)
11. waterParameters (map)
    ├─ temperature (string)
    ├─ pH (string)
    └─ hardness (string)
```

### 🦐 Karides Ürünü - Alan İsimleri (Sırayla)

```
1. name (string)
2. category (string) → "shrimp"
3. price (number)
4. description (string)
5. shortDescription (string)
6. image (string)
7. inStock (boolean) → true
8. colors (array)
9. size (string)
10. difficulty (string)
11. socialBehavior (string)
12. breeding (string)
13. diet (string)
14. lifespan (string)
15. tankSize (string)
16. waterParameters (map)
    ├─ temperature (string)
    ├─ pH (string)
    └─ hardness (string)
```

---

## 🎨 Kategori Değerleri

**Mutlaka bu değerlerden birini kullanın:**

```
fish       → Balıklar
shrimp     → Karides
plant      → Bitkiler
food       → Yem & Besin
equipment  → Ekipman
```

---

## 🖼️ Görsel Ekleme

### Adım 1: Görseli Kaydet
```
Dosya: public/images/products/neon_tetra.png
```

### Adım 2: Firebase'de URL Yaz
```
Alan: image
Tür: string
Değer: /images/products/neon_tetra.png
```

### Adım 3: Galeri İçin (Opsiyonel)
```
Alan: images
Tür: array
Değerler:
  0: /images/products/neon_tetra.png
  1: /images/products/neon_tetra_2.png
```

---

## ⚠️ Sık Yapılan Hatalar

### ❌ YANLIŞ → ✅ DOĞRU

```
❌ Category: "Fish"     → ✅ category: "fish"
❌ Price: "15.50"       → ✅ price: 15.50 (number)
❌ inStock: "true"      → ✅ inStock: true (boolean)
❌ quickInfo: "string"  → ✅ quickInfo: map {size: "4cm"}
```

---

## 🔧 Sorun Çözme - 30 Saniye

### Ürün Görünmüyor?

```bash
✓ name alanı var mı?              → [  ]
✓ category "fish" mi?             → [  ]
✓ price number tipinde mi?        → [  ]
✓ inStock true mu?                → [  ]
✓ image URL'si doğru mu?          → [  ]
```

### Balık Detayları Görünmüyor?

```bash
✓ quickInfo map tipinde mi?       → [  ]
✓ careInfo map tipinde mi?        → [  ]
✓ waterParameters map tipinde mi? → [  ]
```

---

## 📱 Admin Panel ile Ürün Ekleme

### Firebase Yerine Admin Panel Kullanabilirsiniz!

```
1. Web sitenize gidin
2. /admin/login adresine gidin
3. Giriş yapın (kullanıcı adı ve şifre .env dosyasında)
4. "Ürün Yönetimi" sekmesine tıklayın
5. "+ Yeni Ürün Ekle" butonuna tıklayın
6. Formu doldurun
7. Kategori olarak "Fish (Balık)" seçin
8. Balık özellikleri bölümleri otomatik görünecek
9. Kaydet!
```

**Avantajları:**
- ✅ Daha kolay ve hızlı
- ✅ Alanlar otomatik doğru tipte
- ✅ Görsel önizleme var
- ✅ Hata yapmak zor

**Firebase'i Ne Zaman Kullanmalı:**
- 🔧 Toplu veri güncellemesi yaparken
- 🔧 Direkt veritabanı kontrolü gerektiğinde
- 🔧 Admin panel erişimi yoksa

---

## 📞 Destek

**Detaylı Bilgi İçin:** `FIREBASE_REHBERI.md` dosyasına bakın

**Admin Panel Şifresi:** `.env` dosyasında:
```
REACT_APP_ADMIN_USERNAME=sedef
REACT_APP_ADMIN_PASSWORD=Adm.Sdf.25!
```

---

## ✨ İpuçları

1. **İlk ürünü Firebase'de ekleyin**, sonra Admin Panel'den kopyalayın
2. **Görselleri önce yükleyin**, sonra URL'yi yazın
3. **Map alanlarını hep birlikte ekleyin**, eksik bırakmayın
4. **Test için önce `inStock: false` yapın**, hazır olunca `true`
5. **Kategori adını küçük harfle yazın**: `fish`, `shrimp`, vb.

---

**Son Güncelleme:** 2024  
**Kılavuz Versiyonu:** 2.0  

