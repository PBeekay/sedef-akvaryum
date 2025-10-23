import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// FIREBASE İÇİN GEREKLİ İMPORTLAR
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
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

// Varsayılan slider verileri (sadece fallback için)
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
    const fetchSliders = async () => {
        setLoadingSliders(true);
        try {
            const slidersCollection = collection(db, "sliders");
            const sliderSnapshot = await getDocs(slidersCollection);
            const sliderList = sliderSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as SliderData[];
            
            // DEBUG: Firebase'den gelen slider verilerini konsola yazdır (sadece development)
            if (process.env.NODE_ENV === 'development') {
                console.log('🎠 Firebase\'den çekilen slider\'lar:', sliderList);
                console.log('📊 Toplam slider sayısı:', sliderList.length);
            }
            
            setSliderData(sliderList);
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error("❌ Firebase'den slider'lar çekilirken hata oluştu: ", error);
            }
            // Hata durumunda varsayılan verileri kullan
            setSliderData(defaultSliderData);
        } finally {
            setLoadingSliders(false);
        }
    };
    fetchSliders();
  }, []);

  // *** YENİ: ÜRÜNLERİ FIREBASE'DEN ÇEKME ***
  useEffect(() => {
    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const productsCollection = collection(db, "products");
            const productSnapshot = await getDocs(productsCollection);
            const productList = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            
            // DEBUG: Firebase'den gelen verileri konsola yazdır (sadece development)
            if (process.env.NODE_ENV === 'development') {
                console.log('🔥 Firebase\'den çekilen ürünler:', productList);
                console.log('📊 Toplam ürün sayısı:', productList.length);
                
                // İlk ürünü detaylı göster
                if (productList.length > 0) {
                    console.log('🔍 İlk ürün detayı:', productList[0]);
                    console.log('📋 quickInfo:', productList[0].quickInfo);
                    console.log('📋 careInfo:', productList[0].careInfo);
                    console.log('📋 waterParameters:', productList[0].waterParameters);
                }
            }
            
            setProducts(productList);
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error("❌ Firebase'den ürünler çekilirken hata oluştu: ", error);
            }
        } finally {
            setLoadingProducts(false);
        }
    };
    fetchProducts();
  }, []); // Bu sadece component ilk yüklendiğinde çalışacak

  // *** GÜNCELLENMİŞ: Slider Yönetim Fonksiyonları (Firebase Entegrasyonu) ***
  const addSlider = async (slide: Omit<SliderData, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "sliders"), slide);
      const newSlider = { id: docRef.id, ...slide } as SliderData;
      setSliderData(prev => [...prev, newSlider]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'e slider eklenirken hata oluştu: ", error);
      }
    }
  };

  const updateSlider = async (id: string, slide: Partial<SliderData>) => {
    try {
      const sliderRef = doc(db, "sliders", id);
      await updateDoc(sliderRef, slide);
      setSliderData(prev => prev.map(s =>
        s.id === id ? { ...s, ...slide } : s
      ));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'de slider güncellenirken hata oluştu: ", error);
      }
    }
  };

  const deleteSlider = async (id: string) => {
    try {
      await deleteDoc(doc(db, "sliders", id));
      setSliderData(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'den slider silinirken hata oluştu: ", error);
      }
    }
  };

  // Login ve Logout fonksiyonları Firebase Auth'a taşındı
  // Artık AuthContext'te yönetiliyor

  // *** GÜNCELLENMİŞ: Ürün Yönetim Fonksiyonları (Firebase Entegrasyonu) ***
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "products"), productData);
      const newProduct = { id: docRef.id, ...productData } as Product;
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'e ürün eklenirken hata oluştu: ", error);
      }
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, productData);
      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, ...productData } : p
      ));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'de ürün güncellenirken hata oluştu: ", error);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Firebase'den ürün silinirken hata oluştu: ", error);
      }
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