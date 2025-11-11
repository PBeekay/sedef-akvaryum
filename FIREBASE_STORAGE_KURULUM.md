# 🔥 Firebase Storage Kurulum Rehberi

## 📋 İçindekiler
1. [Firebase Console'da Storage'ı Etkinleştirme](#1-firebase-consoleda-storageı-etkinleştirme)
2. [Storage Security Rules Ayarlama](#2-storage-security-rules-ayarlama)
3. [Kod Tarafında Kontrol](#3-kod-tarafında-kontrol)
4. [Test Etme](#4-test-etme)
5. [Sorun Giderme](#5-sorun-giderme)

---

## 1. Firebase Console'da Storage'ı Etkinleştirme

### Adım 1: Firebase Console'a Giriş
1. Tarayıcınızda [https://console.firebase.google.com/](https://console.firebase.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. **"sedef-akvaryum"** projenizi seçin

### Adım 2: Storage'ı Başlat
1. Sol menüden **"Storage"** (Depolama) seçeneğini bulun ve tıklayın
2. Eğer Storage henüz aktif değilse, **"Get started"** (Başlayın) butonuna tıklayın

### Adım 3: Storage Modunu Seçin
1. **Production mode** (Üretim modu) veya **Test mode** (Test modu) seçeneklerinden birini seçin
   - **Test mode:** İlk 30 gün için sınırsız okuma/yazma (önerilir başlangıç için)
   - **Production mode:** Güvenlik kurallarıyla başlar (daha güvenli)
2. **"Next"** (İleri) butonuna tıklayın

### Adım 4: Storage Konumunu Seçin
1. Storage bucket konumunu seçin
   - **Önerilen:** `europe-west1` (Belçika) veya `europe-west3` (Frankfurt) - Türkiye'ye yakın
   - Veya varsayılan konumu kullanın
2. **"Done"** (Tamam) butonuna tıklayın

### Adım 5: Storage Bucket'ını Doğrulama
1. Storage sayfasında bucket adını kontrol edin
   - Örnek: `sedef-akvaryum.firebasestorage.app`
   - Bu ad `src/firebase.js` dosyasındaki `storageBucket` ile eşleşmeli

---

## 2. Storage Security Rules Ayarlama

### Adım 1: Rules Sayfasına Git
1. Storage sayfasında, üst menüden **"Rules"** (Kurallar) sekmesine tıklayın

### Adım 2: Security Rules'u Ekle
1. Aşağıdaki kuralları Rules editörüne yapıştırın:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Ürün görselleri - Herkes okuyabilir, sadece admin/moderator yazabilir
    match /products/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.email == "admin@sedefakvaryum.com" || 
         request.auth.token.email == "moderator@sedefakvaryum.com");
    }
    
    // Slider görselleri (gelecekte kullanılabilir)
    match /sliders/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.email == "admin@sedefakvaryum.com" || 
         request.auth.token.email == "moderator@sedefakvaryum.com");
    }
    
    // Diğer tüm dosyalar - Varsayılan olarak erişim yok
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### Adım 3: Kuralları Yayınla
1. **"Publish"** (Yayınla) butonuna tıklayın
2. Onay penceresinde **"Publish"** butonuna tekrar tıklayın
3. Kurallar birkaç saniye içinde aktif olacak

### Kurallar Açıklaması
- **`allow read: if true;`** - Herkes (giriş yapmamış kullanıcılar dahil) görselleri okuyabilir
- **`allow write: if request.auth != null && ...`** - Sadece giriş yapmış admin/moderator görsel yükleyebilir
- **`match /products/{fileName}`** - `products/` klasöründeki dosyalar için geçerli
- **`match /{allPaths=**}`** - Diğer tüm klasörlere erişim kapalı (güvenlik)

---

## 3. Kod Tarafında Kontrol

### Kontrol 1: Firebase Config
`src/firebase.js` dosyasında Storage'ın import edildiğini ve initialize edildiğini kontrol edin:

```javascript
import { getStorage } from "firebase/storage";

// ...

const storage = getStorage(app);

export { db, auth, storage };
```

✅ **Durum:** Zaten yapıldı!

### Kontrol 2: AdminPage'de Upload Fonksiyonu
`src/pages/AdminPage.tsx` dosyasında Storage'a yükleme fonksiyonunun olduğunu kontrol edin:

```javascript
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
```

✅ **Durum:** Zaten yapıldı!

### Kontrol 3: Storage Bucket Adı
`src/firebase.js` dosyasındaki `storageBucket` değerinin Firebase Console'daki bucket adıyla eşleştiğini kontrol edin:

```javascript
storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "sedef-akvaryum.firebasestorage.app"
```

---

## 4. Test Etme

### Test 1: Admin Paneli ile Fotoğraf Yükleme
1. Projeyi çalıştırın: `npm start`
2. Admin paneline giriş yapın
3. Ürün ekleme/güncelleme sayfasına gidin
4. **"Dosya Seç veya Sürükle"** butonuna tıklayın
5. Bir fotoğraf seçin
6. Progress bar'ın göründüğünü ve yükleme ilerlemesini kontrol edin
7. Yükleme tamamlandıktan sonra görselin göründüğünü kontrol edin

### Test 2: Firebase Console'da Dosyayı Görme
1. Firebase Console → Storage → **"Files"** (Dosyalar) sekmesine gidin
2. **"products"** klasörünü açın
3. Yüklediğiniz dosyanın listede göründüğünü kontrol edin
4. Dosyaya tıklayarak detaylarını ve URL'ini görebilirsiniz

### Test 3: Firestore'da URL'i Kontrol Etme
1. Firebase Console → Firestore Database → **"products"** collection'ına gidin
2. Yeni eklediğiniz ürünü açın
3. `images` ve `image` alanlarının Firebase Storage URL'leri içerdiğini kontrol edin
   - Örnek URL: `https://firebasestorage.googleapis.com/v0/b/sedef-akvaryum.firebasestorage.app/o/products%2F1234567890-photo.jpg?alt=media&token=...`

---

## 5. Sorun Giderme

### Sorun 1: "Firebase Storage: User does not have permission to access"
**Çözüm:**
- Firebase Console → Storage → Rules'a gidin
- Security Rules'u kontrol edin
- Admin email adresinin doğru olduğundan emin olun
- Kuralları **"Publish"** butonuna tıklayarak yayınlayın

### Sorun 2: "Firebase Storage: An unknown error occurred"
**Çözüm:**
- Storage'ın Firebase Console'da aktif olduğunu kontrol edin
- Storage bucket adının `firebase.js` dosyasındaki `storageBucket` ile eşleştiğini kontrol edin
- Tarayıcı konsolunda (F12) hata mesajını kontrol edin

### Sorun 3: "Upload error: Network request failed"
**Çözüm:**
- İnternet bağlantınızı kontrol edin
- Dosya boyutunun çok büyük olmadığını kontrol edin (önerilen: 5MB altı)
- Firebase Console → Storage → Usage'da quota limitini kontrol edin

### Sorun 4: Progress Bar Görünmüyor
**Çözüm:**
- Tarayıcı konsolunda (F12) hata olup olmadığını kontrol edin
- `uploadProgress` state'inin doğru güncellendiğini kontrol edin
- React DevTools ile component state'ini kontrol edin

### Sorun 5: Dosya Yükleniyor Ama Firestore'a Kaydedilmiyor
**Çözüm:**
- AdminPage'de `handleFileUpload` fonksiyonunun `handleInputChange('images', updatedImages)` çağırdığını kontrol edin
- Ürün kaydedilirken `formData.images` array'inin Firestore'a gönderildiğini kontrol edin
- Firestore Security Rules'da `products` collection'ına yazma izninin olduğunu kontrol edin

---

## 📊 Storage Kullanım İstatistikleri

### Firebase Console'da İstatistikleri Görme
1. Firebase Console → Storage → **"Usage"** (Kullanım) sekmesine gidin
2. Toplam depolama alanını ve bant genişliğini görebilirsiniz

### Ücretsiz Kotanız (Spark Plan)
- **Storage:** 5 GB
- **Download:** 1 GB/gün
- **Upload:** 1 GB/gün

### Blaze Plan (Ücretli)
- **Storage:** $0.026/GB/ay
- **Download:** $0.12/GB
- **Upload:** Ücretsiz

---

## 🎯 Önemli Notlar

1. **Dosya Boyutu:** Büyük dosyalar (5MB+) yavaş yüklenebilir. Mümkünse görselleri optimize edin.

2. **Dosya Adları:** Firebase Storage otomatik olarak timestamp ekler: `1234567890-photo.jpg`

3. **URL Formatı:** Firebase Storage URL'leri otomatik olarak oluşturulur ve public'tir (read: if true olduğu için).

4. **Güvenlik:** Sadece admin/moderator yazabilir, herkes okuyabilir. Bu, görsellerin herkese açık olması anlamına gelir.

5. **Maliyet:** Spark Plan (ücretsiz) çoğu küçük proje için yeterlidir. Blaze Plan'a geçiş yapmak 1MB doküman limitini kaldırmaz (bu Firestore limitidir), ancak Storage kapasitesini artırır.

---

## ✅ Kurulum Tamamlandı!

Artık Firebase Storage kullanıma hazır! Admin panelinden fotoğraf yükleyebilir ve Firestore'da URL'lerini saklayabilirsiniz.

Herhangi bir sorun yaşarsanız, yukarıdaki "Sorun Giderme" bölümüne bakın veya Firebase Console'daki hata mesajlarını kontrol edin.

