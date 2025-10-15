import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// FIREBASE İÇİN GEREKLİ İMPORTLAR
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Projenize eklediğiniz firebase.js dosyası

import { generateToken, verifyToken, secureStorage, checkRateLimit } from '../utils/security';
import { Product } from '../types/Product';
import PageLoader from '../components/PageLoader';
// initialProducts'a artık ihtiyacımız yok, bu satırı silebilirsiniz.
// import { products as initialProducts } from '../data/products';


// SliderData interface'i (sizdekiyle aynı)
interface SliderData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  icon: string;
  buttonText: string;
  buttonLink: string;
}

// AdminContextType interface'i (sizdekiyle aynı, sadece fonksiyonlar async olacak)
interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  sliderData: SliderData[];
  setSliderData: (data: SliderData[]) => void;
  addSlider: (slide: Omit<SliderData, 'id'>) => void;
  updateSlider: (id: number, slide: Partial<SliderData>) => void;
  deleteSlider: (id: number) => void;
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

// LocalStorage anahtarları (Slider için hala kullanılıyor)
const STORAGE_KEYS = {
  SLIDER_DATA: 'sedef_akvaryum_slider_data',
};

// Varsayılan slider verileri (sizdekiyle aynı)
const defaultSliderData: SliderData[] = [
    {
      id: 1,
      title: "Güzel Balıklar",
      subtitle: "Renkli ve Sağlıklı",
      description: "Akvaryumunuzu canlandıracak güzel ve sağlıklı balıklar. Uzman bakım ve kalite garantisi ile.",
      image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "fish",
      icon: "🐠",
      buttonText: "Balıkları Keşfet",
      buttonLink: "/category/fish"
    },
    {
      id: 2,
      title: "Karides Dünyası",
      subtitle: "Renkli ve Zarif",
      description: "Akvaryumunuzu renklendirecek güzel karidesler. Bakımı kolay ve üretimi mümkün.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "shrimp",
      icon: "🦐",
      buttonText: "Karidesleri Keşfet",
      buttonLink: "/category/shrimp"
    },
    {
      id: 3,
      title: "Doğal Bitkiler",
      subtitle: "Sağlıklı ve Güzel",
      description: "Akvaryumunuzu doğal bir ortama dönüştürecek su bitkileri. CO2 ve ışık ihtiyaçlarına göre seçim yapın.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "plants",
      icon: "🌿",
      buttonText: "Bitkileri Keşfet",
      buttonLink: "/category/plants"
    }
];

// LocalStorage yardımcı fonksiyonları (Slider için hala kullanılıyor)
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
  }
};


export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Slider yönetimi LocalStorage'dan devam ediyor
  const [sliderData, setSliderData] = useState<SliderData[]>(() =>
    loadFromStorage(STORAGE_KEYS.SLIDER_DATA, defaultSliderData)
  );
  
  // Ürünler artık LocalStorage'dan değil, Firebase'den gelecek. Başlangıçta boş.
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true); // Ürünler için yüklenme durumu

  // Authentication check on mount (sizdekiyle aynı)
  useEffect(() => {
    const checkAuth = async () => {
      const token = secureStorage.getItem('adminToken');
      if (token) {
        const decoded = await verifyToken(token);
        if (decoded) {
          setIsAuthenticated(true);
        } else {
          secureStorage.removeItem('adminToken');
        }
      }
    };
    checkAuth();
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
            
            // DEBUG: Firebase'den gelen verileri konsola yazdır
            console.log('🔥 Firebase\'den çekilen ürünler:', productList);
            console.log('📊 Toplam ürün sayısı:', productList.length);
            
            // İlk ürünü detaylı göster
            if (productList.length > 0) {
                console.log('🔍 İlk ürün detayı:', productList[0]);
                console.log('📋 quickInfo:', productList[0].quickInfo);
                console.log('📋 careInfo:', productList[0].careInfo);
                console.log('📋 waterParameters:', productList[0].waterParameters);
            }
            
            setProducts(productList);
        } catch (error) {
            console.error("❌ Firebase'den ürünler çekilirken hata oluştu: ", error);
        } finally {
            setLoadingProducts(false);
        }
    };
    fetchProducts();
  }, []); // Bu sadece component ilk yüklendiğinde çalışacak

  // Slider verilerini localStorage'a kaydet (sizdekiyle aynı)
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SLIDER_DATA, sliderData);
  }, [sliderData]);

  // Ürünleri LocalStorage'a kaydetme useEffect'i SİLİNDİ.
  
  // Slider fonksiyonları (sizdekiyle aynı)
  const addSlider = (slide: Omit<SliderData, 'id'>) => {
    const newSlide = { ...slide, id: Date.now() };
    setSliderData(prev => [...prev, newSlide]);
  };
  const updateSlider = (id: number, slide: Partial<SliderData>) => {
    setSliderData(prev => prev.map(s => s.id === id ? { ...s, ...slide } : s));
  };
  const deleteSlider = (id: number) => {
    setSliderData(prev => prev.filter(s => s.id !== id));
  };

  // Login ve Logout fonksiyonları (sizdekiyle aynı, hiç dokunulmadı)
  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    // ... sizin mevcut login kodunuz ...
    if (!checkRateLimit('admin-login', 3, 300000)) {
        return { success: false, message: 'Çok fazla başarısız giriş denemesi. Lütfen 5 dakika bekleyin.' };
    }
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME || 'sedef';
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'Adm.Sdf.25!';
    if (username === adminUsername && password === adminPassword) {
        const token = await generateToken({ username, role: 'admin' });
        secureStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        return { success: true, message: 'Giriş başarılı!' };
    }
    return { success: false, message: 'Kullanıcı adı veya şifre hatalı!' };
  };

  const logout = () => {
    secureStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  // *** GÜNCELLENMİŞ: Ürün Yönetim Fonksiyonları (Firebase Entegrasyonu) ***
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, "products"), productData);
      const newProduct = { id: docRef.id, ...productData } as Product;
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error("Firebase'e ürün eklenirken hata oluştu: ", error);
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
      console.error("Firebase'de ürün güncellenirken hata oluştu: ", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Firebase'den ürün silinirken hata oluştu: ", error);
    }
  };

  const value: AdminContextType = {
    isAuthenticated,
    login,
    logout,
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
      {loadingProducts ? <PageLoader /> : children}
    </AdminContext.Provider>
  );
};