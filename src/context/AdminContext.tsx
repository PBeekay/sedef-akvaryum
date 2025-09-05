import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { generateToken, verifyToken, secureStorage, checkRateLimit } from '../utils/security';
import { Product } from '../types/Product';
import { products as initialProducts } from '../data/products';

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

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  sliderData: SliderData[];
  setSliderData: (data: SliderData[]) => void;
  addSlider: (slide: Omit<SliderData, 'id'>) => void;
  updateSlider: (id: number, slide: Partial<SliderData>) => void;
  deleteSlider: (id: number) => void;
  // Product management
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
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

// LocalStorage anahtarları
const STORAGE_KEYS = {
  SLIDER_DATA: 'sedef_akvaryum_slider_data',
  PRODUCTS: 'sedef_akvaryum_products',
  CATEGORIES: 'sedef_akvaryum_categories',
  GUIDE_CONTENT: 'sedef_akvaryum_guide_content'
};

// Varsayılan slider verileri
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
    title: "Çalışma Saatlerimiz",
    subtitle: "Hizmetinizdeyiz",
    description: "Her gün sabah 10:00 - akşam 20:00 arası hizmetinizdeyiz. Pazar günleri kapalıyız. Müşteri memnuniyeti bizim önceliğimizdir.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "info",
    icon: "🕐",
    buttonText: "Çalışma Saatleri",
    buttonLink: "/contact"
  },
  {
    id: 7,
    title: "Adresimiz",
    subtitle: "Eskişehir Merkez",
    description: "Eskişehir merkezde bulunan mağazamızda sizleri ağırlamaktan mutluluk duyarız. Geniş ürün yelpazesi ve uzman ekibimizle hizmetinizdeyiz.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "info",
    icon: "📍",
    buttonText: "Adres Bilgileri",
    buttonLink: "/contact"
  },
  {
    id: 3,
    title: "Kargo & Teslimat",
    subtitle: "Anlaşmalı Kargo",
    description: "Anlaşmalı kargo firmaları ile güvenli teslimat. 2000 TL üzeri alışverişlerde ücretsiz kargo! Alıcı ödemeli gönderim seçeneği de mevcut.",
    image: "https://www.ideasoft.com.tr/wp-content/uploads/2024/08/image-7-1024x681.png",
    category: "shipping",
    icon: "📦",
    buttonText: "Teslimat Bilgileri",
    buttonLink: "/contact"
  },
  {
    id: 4,
    title: "Kalite Asla Tesadüf Değildir",
    subtitle: "1965'ten Günümüze",
    description: "Arkasında emek, alın teri, bilgi ve tecrübe vardır. Amcadan babaya, babadan oğula, Ankaradan İstanbul'a, İstanbul'dan Eskişehir'e uzanan 58 yıllık güven ve kalite geleneği.",
    image: "https://images.unsplash.com/photo-1587764379873-97837921fd44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "about",
    icon: "🏆",
    buttonText: "Hakkımızda",
    buttonLink: "/contact"
  },
  {
    id: 5,
    title: "Canlı Karidesler",
    subtitle: "Temizlik Uzmanları",
    description: "Akvaryumunuzu temiz tutan canlı karidesler. Hem güzel hem de faydalı dostlarınız.",
    image: "https://images.unsplash.com/photo-1676825707552-2ba5a89bfc62?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "shrimp",
    icon: "🦐",
    buttonText: "Karidesleri İncele",
    buttonLink: "/category/shrimp"
  },
  {
    id: 6,
    title: "Premium Balık Yemleri",
    subtitle: "Sağlıklı Beslenme",
    description: "Balıklarınızın sağlığı için özel olarak seçilmiş premium yemler ve besin takviyeleri.",
    image: "https://cdn.myikas.com/images/d70af965-261f-4405-a1d9-1f58e6784a19/7c4c9512-aade-4beb-b26f-4b87f58809b2/image_1080.webp",
    category: "food",
    icon: "🍖",
    buttonText: "Yemleri Görüntüle",
    buttonLink: "/category/food"
  }
];

// LocalStorage yardımcı fonksiyonları
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sliderData, setSliderData] = useState<SliderData[]>(() => 
    loadFromStorage(STORAGE_KEYS.SLIDER_DATA, defaultSliderData)
  );
  const [products, setProducts] = useState<Product[]>(() => {
    const loadedProducts = loadFromStorage(STORAGE_KEYS.PRODUCTS, initialProducts);
    console.log('=== AdminContext Products Initialize ===');
    console.log('Storage key:', STORAGE_KEYS.PRODUCTS);
    console.log('Loaded products from localStorage:', loadedProducts.length);
    console.log('Initial products from data:', initialProducts.length);
    console.log('Loaded products:', loadedProducts.map(p => ({ id: p.id, name: p.name })));
    return loadedProducts;
  });

  // Authentication check on mount
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

  // Slider verilerini localStorage'a kaydet
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SLIDER_DATA, sliderData);
  }, [sliderData]);

  // Products verilerini localStorage'a kaydet
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  const addSlider = (slide: Omit<SliderData, 'id'>) => {
    const newSlide = {
      ...slide,
      id: Math.max(...sliderData.map(s => s.id)) + 1
    };
    setSliderData(prev => [...prev, newSlide]);
  };

  const updateSlider = (id: number, slide: Partial<SliderData>) => {
    setSliderData(prev => prev.map(s => s.id === id ? { ...s, ...slide } : s));
  };

  const deleteSlider = (id: number) => {
    setSliderData(prev => prev.filter(s => s.id !== id));
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Rate limiting kontrolü
    const clientIP = 'admin-login'; // Gerçek uygulamada IP adresi kullanılır
    if (!checkRateLimit(clientIP, 3, 300000)) { // 3 deneme, 5 dakika
      return {
        success: false,
        message: 'Çok fazla başarısız giriş denemesi. Lütfen 5 dakika bekleyin.'
      };
    }

    try {
      // Güvenli admin girişi - environment variables kullanarak
      const adminUsername = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
      
      if (process.env.NODE_ENV === 'development' && (!process.env.REACT_APP_ADMIN_USERNAME || !process.env.REACT_APP_ADMIN_PASSWORD)) {
        console.warn('Using development fallback credentials. Set REACT_APP_ADMIN_USERNAME and REACT_APP_ADMIN_PASSWORD for production.');
      }
      
      const isValidCredentials = username === adminUsername && password === adminPassword;
      
      if (isValidCredentials) {
        const token = await generateToken({ 
          username, 
          role: 'admin',
          loginTime: Date.now()
        });
        secureStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        return {
          success: true,
          message: 'Giriş başarılı!'
        };
      } else {
        return {
          success: false,
          message: 'Kullanıcı adı veya şifre hatalı!'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      };
    }
  };

  const logout = () => {
    secureStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    console.log('Adding new product:', productData);
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      ...productData
    };
    console.log('Created product with ID:', newProduct.id);
    
    setProducts(prev => {
      const updated = [...prev, newProduct];
      console.log('Updated products array, new length:', updated.length);
      console.log('New product added to array:', newProduct);
      
      // Immediately save to localStorage
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      
      return updated;
    });
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    console.log('Updating product:', id, 'with data:', productData);
    setProducts(prev => {
      const updated = prev.map(p => 
        p.id === id ? { ...p, ...productData } : p
      );
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated); // Immediate save
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    console.log('=== AdminContext deleteProduct called ===');
    console.log('Product ID to delete:', id);
    console.log('Current products before deletion:', products.length);
    console.log('Products before deletion:', products.map(p => ({ id: p.id, name: p.name })));
    
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      console.log('Updated products after deletion, new length:', updated.length);
      console.log('Products after deletion:', updated.map(p => ({ id: p.id, name: p.name })));
      
      // Save to localStorage immediately
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      console.log('Saved to localStorage:', STORAGE_KEYS.PRODUCTS);
      
      return updated;
    });
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
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
