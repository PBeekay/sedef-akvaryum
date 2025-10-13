# 🔥 Firebase Database Kullanım Rehberi

## 📋 İçindekiler
1. [Firebase Console'a Giriş](#firebase-consolea-giriş)
2. [Collection ve Document Yapısı](#collection-ve-document-yapısı)
3. [Ürün Ekleme Adım Adım](#ürün-ekleme-adım-adım)
4. [Veri Tipleri ve Kullanımları](#veri-tipleri-ve-kullanımları)
5. [Örnek Ürün Verileri](#örnek-ürün-verileri)

---

## 🌐 Firebase Console'a Giriş

1. **Firebase Console'u Açın**
   - Tarayıcınızda [https://console.firebase.google.com/](https://console.firebase.google.com/) adresine gidin
   - Google hesabınızla giriş yapın

2. **Projenizi Seçin**
   - "sedef-akvaryum" projesine tıklayın

3. **Firestore Database'e Gidin**
   - Sol menüden **"Firestore Database"** seçeneğini bulun ve tıklayın
   - Ana sayfada tüm collection'larınızı göreceksiniz

---

## 📚 Collection ve Document Yapısı

### Collection Nedir?
- Collection, birden fazla belgenin (document) toplandığı klasör gibidir
- Projemizde `products` adında bir collection kullanıyoruz

### Document Nedir?
- Her document bir ürünü temsil eder
- Her document'in benzersiz bir ID'si vardır
- Document'ler içinde alanlar (fields) bulunur

### Veri Hiyerarşisi
```
sedef-akvaryum (Proje)
  └── products (Collection)
      ├── abc123 (Document - Ürün 1)
      │   ├── name: "Neon Tetra"
      │   ├── price: 15.50
      │   ├── quickInfo: {...}
      │   └── ...
      ├── def456 (Document - Ürün 2)
      └── ghi789 (Document - Ürün 3)
```

---

## ➕ Ürün Ekleme Adım Adım

### Adım 1: Collection'ı Bulun veya Oluşturun

1. Firestore Database ana sayfasında **"products"** collection'ını bulun
2. Yoksa:
   - **"+ Koleksiyon başlat"** (Start collection) butonuna tıklayın
   - Koleksiyon ID'si olarak `products` yazın
   - İlk document'i oluşturmak için devam edin

### Adım 2: Yeni Document Ekleyin

1. **"products"** collection'ının yanındaki **"+ Belge ekle"** (Add document) butonuna tıklayın
2. **Belge Kimliği** (Document ID):
   - "Otomatik Kimlik" seçeneğini kullanabilirsiniz
   - Veya manuel olarak `fish_neon_tetra` gibi bir ID girebilirsiniz

### Adım 3: Temel Alanları Ekleyin

Her alan için **"+ Alan ekle"** (Add field) butonunu kullanarak şu alanları ekleyin:

#### 📝 Zorunlu Temel Alanlar

| Alan Adı | Tür | Örnek Değer | Açıklama |
|----------|-----|-------------|----------|
| `name` | string | "Neon Tetra" | Ürün adı |
| `category` | string | "fish" | Kategori (fish, shrimp, plant, food, equipment) |
| `price` | number | 15.50 | Fiyat (ondalık sayı) |
| `description` | string | "Akvaryumların vazgeçilmez balığı..." | Detaylı açıklama |
| `shortDescription` | string | "Barışçıl ve renkli balık" | Kısa açıklama |
| `image` | string | "/images/products/neon_tetra.png" | Ana görsel URL'si |
| `inStock` | boolean | true | Stok durumu (true/false) |

#### 🎨 Opsiyonel Temel Alanlar

| Alan Adı | Tür | Örnek Değer | Açıklama |
|----------|-----|-------------|----------|
| `featured` | boolean | true | Öne çıkan ürün mü? |
| `new` | boolean | false | Yeni ürün mü? |
| `images` | array | ["/img1.png", "/img2.png"] | Galeri görselleri |

---

### Adım 4: BALIK ÜRÜNLERİ İÇİN Özel Alanlar

Eğer balık ürünü ekliyorsanız, aşağıdaki **map** (nesne) alanlarını ekleyin:

#### 🔵 quickInfo (Map)

1. **"+ Alan ekle"** butonuna tıklayın
2. **Alan adı**: `quickInfo`
3. **Tür**: `map` seçin
4. `quickInfo`'nun yanındaki ok işaretine tıklayarak genişletin
5. İçine şu alt alanları ekleyin:

| Alt Alan | Tür | Örnek Değer |
|----------|-----|-------------|
| `size` | string | "4 cm" |
| `temperament` | string | "Peaceful" |
| `careLevel` | string | "Easy" |

**Adım adım quickInfo ekleme:**
```
1. + Alan ekle → quickInfo, map
2. quickInfo içinde + Alan ekle → size, string, "4 cm"
3. quickInfo içinde + Alan ekle → temperament, string, "Peaceful"
4. quickInfo içinde + Alan ekle → careLevel, string, "Easy"
```

#### 🟢 careInfo (Map)

1. **"+ Alan ekle"** butonuna tıklayın (ana seviyede)
2. **Alan adı**: `careInfo`
3. **Tür**: `map` seçin
4. İçine şu alt alanları ekleyin:

| Alt Alan | Tür | Örnek Değer |
|----------|-----|-------------|
| `diet` | string | "Omnivore" |
| `family` | string | "Characidae" |
| `origin` | string | "Güney Amerika" |
| `aquariumSize` | string | "40 Litre" |
| `lifespan` | string | "3-5 yıl" |

**Adım adım careInfo ekleme:**
```
1. + Alan ekle → careInfo, map
2. careInfo içinde + Alan ekle → diet, string, "Omnivore"
3. careInfo içinde + Alan ekle → family, string, "Characidae"
4. careInfo içinde + Alan ekle → origin, string, "Güney Amerika"
5. careInfo içinde + Alan ekle → aquariumSize, string, "40 Litre"
6. careInfo içinde + Alan ekle → lifespan, string, "3-5 yıl"
```

#### 🟣 waterParameters (Map)

1. **"+ Alan ekle"** butonuna tıklayın (ana seviyede)
2. **Alan adı**: `waterParameters`
3. **Tür**: `map` seçin
4. İçine şu alt alanları ekleyin:

| Alt Alan | Tür | Örnek Değer |
|----------|-----|-------------|
| `temperature` | string | "22-26°C" |
| `pH` | string | "6.0-7.0" |
| `hardness` | string | "2-10 dGH" |

**Adım adım waterParameters ekleme:**
```
1. + Alan ekle → waterParameters, map
2. waterParameters içinde + Alan ekle → temperature, string, "22-26°C"
3. waterParameters içinde + Alan ekle → pH, string, "6.0-7.0"
4. waterParameters içinde + Alan ekle → hardness, string, "2-10 dGH"
```

---

### Adım 5: KARİDES ÜRÜNLERİ İÇİN Özel Alanlar

Karides için eski yapı kullanılıyor:

| Alan Adı | Tür | Örnek Değer |
|----------|-----|-------------|
| `colors` | array | ["Kırmızı", "Mavi"] |
| `size` | string | "2-3 cm" |
| `difficulty` | string | "Kolay" |
| `socialBehavior` | string | "Barışçıl" |
| `breeding` | string | "Kolay üretim" |
| `diet` | string | "Omnivor" |
| `lifespan` | string | "1-2 yıl" |
| `tankSize` | string | "Minimum 20L" |

**Array (Dizi) Ekleme:**
```
1. + Alan ekle → colors, array
2. colors içinde + 0, string, "Kırmızı"
3. colors içinde + 1, string, "Mavi"
```

---

## 📊 Veri Tipleri ve Kullanımları

### Firebase'de Kullanılan Veri Tipleri

| Tür | Ne Zaman Kullanılır | Örnek |
|-----|---------------------|-------|
| **string** | Metin verileri | "Neon Tetra", "Balık kategorisi" |
| **number** | Sayısal değerler | 15.50, 100 |
| **boolean** | Doğru/Yanlış | true, false |
| **map** | İç içe yapılar (nesne) | {temperature: "22°C", pH: "7.0"} |
| **array** | Liste/dizi | ["Kırmızı", "Mavi", "Sarı"] |
| **timestamp** | Tarih/saat | (otomatik) |

### 💡 Önemli Notlar

1. **String vs Number:**
   - Fiyat için `number` kullanın (15.50)
   - Sıcaklık gibi aralıklar için `string` kullanın ("22-26°C")

2. **Map (Nesne) Kullanımı:**
   - İlişkili verileri gruplamak için kullanılır
   - Örnek: Su parametreleri hep birlikte olmalı

3. **Array (Dizi) Kullanımı:**
   - Birden fazla değer için kullanılır
   - Örnek: Renk çeşitleri, görseller

---

## 📦 Örnek Ürün Verileri

### 🐟 Örnek 1: Balık Ürünü (Neon Tetra)

```javascript
{
  // Temel Bilgiler
  name: "Neon Tetra",
  category: "fish",
  price: 15.50,
  description: "Akvaryumların vazgeçilmez balığı Neon Tetra, parlak renkli çizgisi ve sakin doğasıyla dikkat çeker.",
  shortDescription: "Barışçıl ve renkli balık",
  image: "/images/products/neon_tetra.png",
  images: [
    "/images/products/neon_tetra.png",
    "/images/products/neon_tetra_2.png"
  ],
  inStock: true,
  featured: true,
  new: false,
  
  // Hızlı Bilgiler
  quickInfo: {
    size: "4 cm",
    temperament: "Peaceful",
    careLevel: "Easy"
  },
  
  // Bakım Bilgileri
  careInfo: {
    diet: "Omnivore",
    family: "Characidae",
    origin: "Güney Amerika",
    aquariumSize: "40 Litre",
    lifespan: "3-5 yıl"
  },
  
  // Su Değerleri
  waterParameters: {
    temperature: "22-26°C",
    pH: "6.0-7.0",
    hardness: "2-10 dGH"
  }
}
```

### 🦐 Örnek 2: Karides Ürünü (Red Cherry)

```javascript
{
  // Temel Bilgiler
  name: "Red Cherry Shrimp",
  category: "shrimp",
  price: 25.00,
  description: "Neocaridina Davidi türünden kırmızı renkli güzel karides.",
  shortDescription: "Canlı kırmızı renk",
  image: "/images/products/red_cherry.png",
  inStock: true,
  featured: false,
  
  // Karides Özellikleri
  colors: ["Kırmızı", "Koyu Kırmızı"],
  size: "2-3 cm",
  difficulty: "Kolay",
  socialBehavior: "Barışçıl, grup halinde yaşar",
  breeding: "Kolay üretim",
  diet: "Omnivor",
  lifespan: "1-2 yıl",
  tankSize: "Minimum 20L",
  
  // Su Değerleri
  waterParameters: {
    temperature: "18-28°C",
    pH: "7.0-7.6",
    hardness: "9-11 dGH"
  }
}
```

---

## ✏️ Ürün Güncelleme

### Mevcut Ürünü Düzenleme

1. **Firestore Database** sayfasında `products` collection'ını açın
2. Düzenlemek istediğiniz ürünün (document) üzerine tıklayın
3. Değiştirmek istediğiniz alanın yanındaki **✏️ (kalem)** ikonuna tıklayın
4. Yeni değeri girin
5. **"Güncelleştir"** (Update) butonuna tıklayın

### Yeni Alan Ekleme

1. Document açıkken, en altta **"+ Alan ekle"** (Add field) butonunu kullanın
2. Alan adını ve türünü seçin
3. Değeri girin
4. **"Ekle"** (Add) butonuna tıklayın

### Alan Silme

1. Silmek istediğiniz alanın üzerine mouse ile gelin
2. Sağda görünen **🗑️ (çöp kutusu)** ikonuna tıklayın
3. Onaylayın

---

## 🎯 En İyi Pratikler

### ✅ Yapılması Gerekenler

1. **Tutarlı İsimlendirme:**
   - Alan adları küçük harfle başlamalı: `quickInfo`, `careInfo`
   - Türkçe karakter kullanmayın: `menşei` yerine `origin`

2. **Doğru Veri Tipi Seçimi:**
   - Fiyatlar için `number`
   - Metinler için `string`
   - Evet/Hayır için `boolean`

3. **Map Yapısı:**
   - İlişkili verileri `map` içinde gruplayın
   - Örnek: Tüm su parametreleri `waterParameters` içinde

4. **Görsel URL'leri:**
   - Görselleri önce `public/images/products/` klasörüne ekleyin
   - URL'yi `/images/products/dosya_adi.png` formatında yazın

### ❌ Yapılmaması Gerekenler

1. **Boş Alan Bırakmayın:**
   - Kullanılmayan alanları eklemeyin
   - Veya en azından boş string ("") değeri verin

2. **Tutarsız Kategori İsimleri:**
   - Her zaman aynı formatı kullanın: `fish`, `shrimp`, `plant`
   - `Fish`, `FISH`, `balık` gibi farklı yazımlar kullanmayın

3. **Gereksiz Nested Yapılar:**
   - Çok derin iç içe yapılar oluşturmayın
   - 2-3 seviyeden fazla inmemeye çalışın

---

## 🔍 Sorun Giderme

### Ürün Web Sitesinde Görünmüyor

✅ **Kontrol Listesi:**
- [ ] `name` alanı var mı ve dolu mu?
- [ ] `category` alanı doğru yazılmış mı? (`fish`, `shrimp`, vb.)
- [ ] `price` number tipinde mi?
- [ ] `image` alanı dolu ve doğru URL mi?
- [ ] `inStock` true olarak ayarlanmış mı?

### Balık Özellikleri Görünmüyor

✅ **Kontrol Listesi:**
- [ ] `quickInfo` map tipinde mi?
- [ ] `careInfo` map tipinde mi?
- [ ] `waterParameters` map tipinde mi?
- [ ] Map içindeki alt alanlar string tipinde mi?

### Görseller Yüklenmiyor

✅ **Kontrol Listesi:**
- [ ] Görsel `public/images/products/` klasöründe mi?
- [ ] Dosya adı doğru mu? (küçük harf, boşluksuz)
- [ ] URL `/images/products/` ile mi başlıyor?
- [ ] Dosya uzantısı doğru mu? (.png, .jpg)

---

## 📞 Yardım

Sorun yaşarsanız:
1. Önce bu rehberdeki kontrol listelerini inceleyin
2. Firebase Console'daki hata mesajlarını okuyun
3. Örnek ürün verilerine bakarak karşılaştırın

---

**Hazırlayan:** Sedef Akvaryum Tech Team  
**Son Güncelleme:** {{ TARIH }}  
**Versiyon:** 2.0

