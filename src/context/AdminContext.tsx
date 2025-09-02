import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { generateToken, verifyToken, secureStorage, comparePassword, checkRateLimit } from '../utils/security';

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
    description: "Her gün sabah 10:00 - akşam 20:00 arası hizmetinizdeyiz. Pazar günleri kapalıyız. Adres: Eskişehir, Telefon: 0555 123 45 67",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "info",
    icon: "🕐",
    buttonText: "İletişim Bilgileri",
    buttonLink: "/contact"
  },
  {
    id: 3,
    title: "Kargo & Teslimat",
    subtitle: "Anlaşmalı Kargo",
    description: "Anlaşmalı kargo firmaları ile güvenli teslimat. 2000 TL üzeri alışverişlerde ücretsiz kargo! Alıcı ödemeli gönderim seçeneği de mevcut.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // Authentication check on mount
  useEffect(() => {
    const token = secureStorage.getItem('adminToken');
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setIsAuthenticated(true);
      } else {
        secureStorage.removeItem('adminToken');
      }
    }
  }, []);

  // Slider verilerini localStorage'a kaydet
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SLIDER_DATA, sliderData);
  }, [sliderData]);

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
      // Gerçek uygulamada bu bilgiler veritabanından alınır
      const hashedPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i'; // "akvaryum2024"
      
      const isValidPassword = await comparePassword(password, hashedPassword);
      
      if (username === 'sedefadmin' && isValidPassword) {
        const token = generateToken({ 
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

  const value: AdminContextType = {
    isAuthenticated,
    login,
    logout,
    sliderData,
    setSliderData,
    addSlider,
    updateSlider,
    deleteSlider
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
