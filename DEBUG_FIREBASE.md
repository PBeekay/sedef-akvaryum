# 🔧 Firebase Veri Görünmüyor - Sorun Giderme

## 1️⃣ TARAYıCı CONSOLE KONTROLÜ

### Adımlar:
1. Web sitenizi açın (http://localhost:3000)
2. Tarayıcıda **F12** tuşuna basın (veya sağ tık → İncele)
3. **Console** sekmesini açın
4. Kırmızı hatalar var mı kontrol edin
5. Hataları bana gönderin

---

## 2️⃣ FİREBASE YAPI KONTROLÜ

### Doğru Yapı Böyle Olmalı:

```
products (Collection)
  └── [document-id]
      ├── name: "Neon Tetra" (string)
      ├── category: "fish" (string)
      ├── price: 15.50 (number)
      ├── quickInfo (map) ← MAP TİPİNDE OLMALI!
      │   ├── size: "4 cm" (string)
      │   ├── temperament: "Peaceful" (string)
      │   └── careLevel: "Easy" (string)
      ├── careInfo (map) ← MAP TİPİNDE OLMALI!
      │   ├── diet: "Omnivore" (string)
      │   ├── family: "Characidae" (string)
      │   ├── origin: "Güney Amerika" (string)
      │   ├── aquariumSize: "40 Litre" (string)
      │   └── lifespan: "3-5 yıl" (string)
      └── waterParameters (map) ← MAP TİPİNDE OLMALI!
          ├── temperature: "22-26°C" (string)
          ├── pH: "6.0-7.0" (string)
          └── hardness: "2-10 dGH" (string)
```

### ❌ Sık Yapılan Hatalar:

1. **Yanlış Tip:**
   ```
   ❌ quickInfo: "string olarak" 
   ✅ quickInfo: (map olarak)
   ```

2. **Yanlış İsimlendirme:**
   ```
   ❌ QuickInfo (büyük Q)
   ✅ quickInfo (küçük q)
   
   ❌ waterparameters (küçük p)
   ✅ waterParameters (büyük P - camelCase)
   
   ❌ careinfo
   ✅ careInfo (büyük I)
   ```

3. **Alt Alan İsimleri Yanlış:**
   ```
   careInfo içinde:
   ❌ Diet (büyük D)
   ✅ diet (küçük d)
   
   ❌ Family
   ✅ family
   ```

---

## 3️⃣ KATEGORİ KONTROLÜ

Ürünün kategorisi **mutlaka** "fish" olmalı!

```
❌ category: "Fish" (büyük F)
❌ category: "FISH" (tamamı büyük)
❌ category: "balık" (Türkçe)
✅ category: "fish" (küçük harf)
```

---

## 4️⃣ SCREENSHOT İLE KONTROL

Firebase'deki ürününüzün ekran görüntüsünü alın:

1. Firebase Console → products
2. Ürüne tıklayın
3. Tüm alanları görecek şekilde screenshot alın
4. Bana gönderin

---

## 5️⃣ TEST SORGUSU

Tarayıcı Console'da şunu çalıştırın:

```javascript
// Console'u açın (F12) ve bu kodu yapıştırın:
console.log('Products:', window.localStorage);
```

---

## 6️⃣ ÖRNEK DOĞRU FIREBASE YAPISI

### Adım Adım Firebase'de Oluşturma:

#### A) quickInfo Oluşturma:

```
1. + Alan ekle
2. Alan adı: quickInfo (tam olarak böyle, küçük q, büyük I)
3. Tür: map (açılır menüden seçin)
4. Ekle butonuna tıklayın

5. quickInfo'nun yanındaki > işaretine tıklayın (genişletin)

6. quickInfo içinde + Alan ekle:
   - Alan: size, Tür: string, Değer: "4 cm"
   - Alan: temperament, Tür: string, Değer: "Peaceful"
   - Alan: careLevel, Tür: string, Değer: "Easy"
```

#### B) careInfo Oluşturma:

```
1. Ana seviyede + Alan ekle
2. Alan adı: careInfo (küçük c, büyük I)
3. Tür: map
4. Ekle

5. careInfo içinde + Alan ekle:
   - Alan: diet, Tür: string, Değer: "Omnivore"
   - Alan: family, Tür: string, Değer: "Characidae"
   - Alan: origin, Tür: string, Değer: "Güney Amerika"
   - Alan: aquariumSize, Tür: string, Değer: "40 Litre"
   - Alan: lifespan, Tür: string, Değer: "3-5 yıl"
```

#### C) waterParameters Oluşturma:

```
1. Ana seviyede + Alan ekle
2. Alan adı: waterParameters (küçük w, büyük P)
3. Tür: map
4. Ekle

5. waterParameters içinde + Alan ekle:
   - Alan: temperature, Tür: string, Değer: "22-26°C"
   - Alan: pH, Tür: string, Değer: "6.0-7.0"
   - Alan: hardness, Tür: string, Değer: "2-10 dGH"
```

---

## 7️⃣ SAYFA YENİLEME

Firebase'de değişiklik yaptıktan sonra:

1. Web sitesini tamamen kapatın
2. Tarayıcıyı yeniden başlatın
3. http://localhost:3000 açın
4. Ürün detay sayfasına gidin

---

## 8️⃣ CACHE TEMİZLEME

Bazen cache sorun yaratabilir:

1. Chrome'da: Ctrl + Shift + Delete
2. "Önbelleğe alınmış resimler ve dosyalar" seçin
3. "Verileri temizle"
4. Sayfayı yeniden yükleyin (Ctrl + F5)

---

## 9️⃣ ADMIN PANEL TEST

Firebase yerine Admin Panel'den test edin:

1. http://localhost:3000/admin/login
2. Giriş yapın
3. Ürün Yönetimi → Yeni Ürün Ekle
4. Kategori: "Fish" seçin
5. Formda bu alanlar görünüyor mu?
   - Hızlı Bilgiler (mavi kutu)
   - Bakım Bilgileri (yeşil kutu)
   - Su Değerleri (mor kutu)

Eğer formda görünüyorsa, Firebase yapınızda sorun var demektir.

---

## 🔟 HATA MESAJI ÖRNEKLERİ

Şu hataları görüyor musunuz?

```
Cannot read properties of undefined (reading 'size')
  → quickInfo yok veya map değil

Cannot read properties of undefined (reading 'diet')
  → careInfo yok veya map değil

Cannot read properties of undefined (reading 'temperature')
  → waterParameters yok veya map değil
```

---

## ✅ DOĞRULAMA LİSTESİ

Firebase'deki ürününüzde kontrol edin:

### Temel Alanlar:
- [ ] `name` var ve string tipinde
- [ ] `category` var ve değeri "fish" (küçük harf)
- [ ] `price` var ve number tipinde
- [ ] `description` var ve string tipinde
- [ ] `image` var ve string tipinde

### Map Alanları:
- [ ] `quickInfo` var ve **map** tipinde (string değil!)
- [ ] `careInfo` var ve **map** tipinde
- [ ] `waterParameters` var ve **map** tipinde

### quickInfo İçindeki Alt Alanlar:
- [ ] `size` (küçük s)
- [ ] `temperament` (küçük t)
- [ ] `careLevel` (küçük c, büyük L)

### careInfo İçindeki Alt Alanlar:
- [ ] `diet` (küçük d)
- [ ] `family` (küçük f)
- [ ] `origin` (küçük o)
- [ ] `aquariumSize` (küçük a, büyük S)
- [ ] `lifespan` (küçük l)

### waterParameters İçindeki Alt Alanlar:
- [ ] `temperature` (küçük t)
- [ ] `pH` (küçük p, büyük H)
- [ ] `hardness` (küçük h)

---

## 🎯 EN KOLAY ÇÖZÜM

Eğer hala çalışmıyorsa:

1. Firebase'deki problemi olan ürünü **silin**
2. **Admin Panel'den** yeni ürün ekleyin:
   ```
   http://localhost:3000/admin/login
   Ürün Yönetimi → + Yeni Ürün Ekle
   Kategori: Fish seçin
   Tüm alanları doldurun
   Kaydet
   ```
3. Admin panel otomatik olarak doğru yapıda Firebase'e kaydeder

---

## 📞 DESTEK

Hala çalışmıyorsa bana şunları gönderin:

1. Tarayıcı Console'daki hata mesajları (varsa)
2. Firebase'deki ürünün screenshot'u
3. Hangi sayfada görünmüyor? (Ana sayfa mı, ürün detay mı?)
4. Ürünün kategorisi nedir?

