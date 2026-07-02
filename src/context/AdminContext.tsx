import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// FIREBASE İÇİN GEREKLİ İMPORTLAR
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase'; // Projenize eklediğiniz firebase.js dosyası

import { useAuth } from './AuthContext';
import { Product } from '../types/Product';
import PageLoader from '../components/PageLoader';
// initialProducts'a artık ihtiyacımız yok, bu satırı silebilirsiniz.
// import { products as initialProducts } from '../data/products';


// SliderData interface'i - Firebase uyumlu
interface SliderData {
  id: string; // Firebase document ID'si string olacak
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  icon: string;
  buttonText: string;
  buttonLink: string;
}

// AdminContextType interface'i - Firebase Auth ile güncellendi
interface AdminContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  sliderData: SliderData[];
  setSliderData: (data: SliderData[]) => void;
  addSlider: (slide: Omit<SliderData, 'id'>) => Promise<void>;
  updateSlider: (id: string, slide: Partial<SliderData>) => Promise<void>;
  deleteSlider: (id: string) => Promise<void>;
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

const defaultSliderData: SliderData[] = [];

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { currentUser, isAdmin, isModerator } = useAuth();
  
  // Slider yönetimi artık Firebase'den gelecek
  const [sliderData, setSliderData] = useState<SliderData[]>(defaultSliderData);
  const [loadingSliders, setLoadingSliders] = useState(true); // Slider'lar için yüklenme durumu
  
  // Ürünler artık LocalStorage'dan değil, Firebase'den gelecek. Başlangıçta boş.
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true); // Ürünler için yüklenme durumu

  // Firebase Auth ile authentication durumu
  const isAuthenticated = !!currentUser && (isAdmin || isModerator);

  // *** YENİ: SLIDER'LARI FIREBASE'DEN ÇEKME ***
  useEffect(() => {
    let isMounted = true;
    const slidersCollection = collection(db, "sliders");

    const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
      if (!isMounted) return;

      const sliderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SliderData[];

      if (process.env.NODE_ENV === 'development') {
        console.log('🎠 Firebase onSnapshot slider güncellemesi:', sliderList);
        console.log('📊 Toplam slider sayısı:', sliderList.length);
      }

      setSliderData(sliderList);
      setLoadingSliders(false);
    };

    const unsubscribe = onSnapshot(
      slidersCollection,
      handleSnapshot,
      (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error("❌ Firebase onSnapshot slider dinlenirken hata oluştu: ", error);
        }
        if (isMounted) {
          setLoadingSliders(false);
        }
      }
    );

    const fetchSliders = async () => {
      setLoadingSliders(true);
      try {
        const sliderSnapshot = await getDocs(slidersCollection);
        handleSnapshot(sliderSnapshot);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("❌ Firebase'den slider'lar çekilirken hata oluştu: ", error);
        }
        if (isMounted) {
          setSliderData(defaultSliderData);
          setLoadingSliders(false);
        }
      }
    };

    fetchSliders();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // *** YENİ: ÜRÜNLERİ FIREBASE'DEN ÇEKME ***
  useEffect(() => {
    let isMounted = true;
    const productsCollection = collection(db, "products");

    const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
      if (!isMounted) {
        return;
      }

      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      if (process.env.NODE_ENV === 'development') {
        console.log('🔥 Firebase onSnapshot ürün güncellemesi:', productList);
        console.log('📊 Toplam ürün sayısı:', productList.length);

        if (productList.length > 0) {
          console.log('🔍 İlk ürün detayı:', productList[0]);
          console.log('📋 quickInfo:', productList[0].quickInfo);
          console.log('📋 careInfo:', productList[0].careInfo);
          console.log('📋 waterParameters:', productList[0].waterParameters);
        }
      }

      setProducts(productList);
      setLoadingProducts(false);
    };

    const unsubscribe = onSnapshot(
      productsCollection,
      handleSnapshot,
      (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error("❌ Firebase onSnapshot sırasında hata oluştu: ", error);
        }
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    );

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const productSnapshot = await getDocs(productsCollection);
        handleSnapshot(productSnapshot);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("❌ Firebase'den ürünler çekilirken hata oluştu: ", error);
        }
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // *** GÜNCELLENMİŞ: Slider Yönetim Fonksiyonları (Firebase Entegrasyonu) ***
  const addSlider = async (slide: Omit<SliderData, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "sliders"), slide);
      const newSlider = { id: docRef.id, ...slide } as SliderData;
      setSliderData(prev => [...prev, newSlider]);
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Slider başarıyla Firebase\'e eklendi:', newSlider);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Slider ekleme'));
    }
  };

  const updateSlider = async (id: string, slide: Partial<SliderData>) => {
    try {
      const sliderRef = doc(db, "sliders", id);
      await updateDoc(sliderRef, slide);
      setSliderData(prev => prev.map(s =>
        s.id === id ? { ...s, ...slide } : s
      ));
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Slider başarıyla Firebase\'de güncellendi:', id);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Slider güncelleme'));
    }
  };

  const deleteSlider = async (id: string) => {
    try {
      await deleteDoc(doc(db, "sliders", id));
      setSliderData(prev => prev.filter(s => s.id !== id));
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Slider başarıyla Firebase\'den silindi:', id);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Slider silme'));
    }
  };

  // Login ve Logout fonksiyonları Firebase Auth'a taşındı
  // Artık AuthContext'te yönetiliyor

  // Firestore hatalarını kullanıcı dostu mesajlara dönüştür
  const getFirestoreErrorMessage = (error: any, action: string): string => {
    const code = error?.code || '';
    const msg = error?.message || '';

    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ Firestore ${action} hatası:`, { code, msg, full: error });
    }

    if (code === 'permission-denied') {
      // permission-denied hem yetki hem de veri doğrulama için gelir
      // Firestore kural hatalarında msg içinde "Missing or insufficient permissions" yazar
      if (msg.includes('Missing or insufficient permissions')) {
        return `${action} izniniz yok. Lütfen admin olarak giriş yaptığınızdan emin olun.`;
      }
      // Veri doğrulama hataları için daha detaylı mesaj
      return `${action} başarısız. Gönderilen verilerde sorun olabilir. Lütfen tüm alanları doğru doldurduğunuzdan emin olun (alan adları, fiyat, kategori, görsel URL'si ve stok durumu zorunludur).`;
    }

    if (code === 'unauthenticated') {
      return `Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.`;
    }

    if (code === 'not-found') {
      return `${action} başarısız. İstenen kayıt bulunamadı.`;
    }

    if (code === 'already-exists') {
      return `${action} başarısız. Bu kayıt zaten mevcut.`;
    }

    if (code === 'resource-exhausted') {
      return `${action} başarısız. Çok fazla istek gönderildi. Lütfen biraz bekleyin ve tekrar deneyin.`;
    }

    return msg || `${action} sırasında bir hata oluştu. Lütfen tekrar deneyin.`;
  };

  // *** GÜNCELLENMİŞ: Ürün Yönetim Fonksiyonları (Firebase Entegrasyonu) ***
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "products"), productData);
      const newProduct = { id: docRef.id, ...productData } as Product;
      setProducts(prev => [...prev, newProduct]);
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Ürün başarıyla Firebase\'e eklendi:', newProduct);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Ürün ekleme'));
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, productData);
      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, ...productData } : p
      ));
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Ürün başarıyla Firebase\'de güncellendi:', id);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Ürün güncelleme'));
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(prev => prev.filter(p => p.id !== id));
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Ürün başarıyla Firebase\'den silindi:', id);
      }
    } catch (error: any) {
      throw new Error(getFirestoreErrorMessage(error, 'Ürün silme'));
    }
  };

  const value: AdminContextType = {
    isAuthenticated,
    isAdmin,
    isModerator,
    sliderData,
    setSliderData,
    addSlider,
    updateSlider,
    deleteSlider,
    products, // Artık bu veri Firebase'den geliyor
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <AdminContext.Provider value={value}>
      {(loadingProducts || loadingSliders) ? <PageLoader /> : children}
    </AdminContext.Provider>
  );
};