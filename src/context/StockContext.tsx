import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';
import { safeLocalStorage } from '../utils/validation';

interface StockItem {
  productId: string;
  quantity: number;
  lastUpdated: string;
  lowStockThreshold: number;
}

interface StockContextType {
  stockItems: StockItem[];
  getStockQuantity: (productId: string) => number;
  updateStock: (productId: string, quantity: number) => void;
  isLowStock: (productId: string) => boolean;
  isOutOfStock: (productId: string) => boolean;
  getStockStatus: (productId: string) => 'in-stock' | 'low-stock' | 'out-of-stock';
  setLowStockThreshold: (productId: string, threshold: number) => void;
  getLowStockProducts: () => Product[];
  initializeStockForProduct: (productId: string) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

interface StockProviderProps {
  children: ReactNode;
}

// LocalStorage anahtarı
const STOCK_STORAGE_KEY = 'sedef_akvaryum_stock';

// Varsayılan stok verileri - sadece temel ürünler için
const getDefaultStock = (): StockItem[] => [
  // Shrimp Products
  { productId: 'shrimp-1', quantity: 50, lastUpdated: new Date().toISOString(), lowStockThreshold: 10 },
  { productId: 'shrimp-2', quantity: 30, lastUpdated: new Date().toISOString(), lowStockThreshold: 8 },
  { productId: 'shrimp-3', quantity: 25, lastUpdated: new Date().toISOString(), lowStockThreshold: 5 },
  { productId: 'shrimp-4', quantity: 35, lastUpdated: new Date().toISOString(), lowStockThreshold: 7 },
  { productId: 'shrimp-5', quantity: 20, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  { productId: 'shrimp-6', quantity: 15, lastUpdated: new Date().toISOString(), lowStockThreshold: 3 },
  { productId: 'shrimp-7', quantity: 18, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  { productId: 'shrimp-8', quantity: 12, lastUpdated: new Date().toISOString(), lowStockThreshold: 3 },
  { productId: 'shrimp-9', quantity: 22, lastUpdated: new Date().toISOString(), lowStockThreshold: 5 },
  { productId: 'shrimp-10', quantity: 28, lastUpdated: new Date().toISOString(), lowStockThreshold: 6 },
  { productId: 'shrimp-11', quantity: 16, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  { productId: 'shrimp-12', quantity: 24, lastUpdated: new Date().toISOString(), lowStockThreshold: 5 },
  
  // Fish Products - Tropical Fish
  { productId: 'fish-tropical-1', quantity: 100, lastUpdated: new Date().toISOString(), lowStockThreshold: 20 },
  { productId: 'fish-tropical-2', quantity: 120, lastUpdated: new Date().toISOString(), lowStockThreshold: 25 },
  { productId: 'fish-tropical-3', quantity: 80, lastUpdated: new Date().toISOString(), lowStockThreshold: 15 },
  { productId: 'fish-tropical-4', quantity: 60, lastUpdated: new Date().toISOString(), lowStockThreshold: 12 },
  { productId: 'fish-tropical-5', quantity: 90, lastUpdated: new Date().toISOString(), lowStockThreshold: 18 },
  { productId: 'fish-tropical-6', quantity: 150, lastUpdated: new Date().toISOString(), lowStockThreshold: 30 },
  { productId: 'fish-tropical-7', quantity: 70, lastUpdated: new Date().toISOString(), lowStockThreshold: 14 },
  { productId: 'fish-tropical-8', quantity: 85, lastUpdated: new Date().toISOString(), lowStockThreshold: 17 },
  { productId: 'fish-tropical-9', quantity: 110, lastUpdated: new Date().toISOString(), lowStockThreshold: 22 },
  { productId: 'fish-tropical-10', quantity: 40, lastUpdated: new Date().toISOString(), lowStockThreshold: 8 },
  { productId: 'fish-tropical-11', quantity: 35, lastUpdated: new Date().toISOString(), lowStockThreshold: 7 },
  { productId: 'fish-tropical-12', quantity: 65, lastUpdated: new Date().toISOString(), lowStockThreshold: 13 },
  
  // Additional Fish Products
  { productId: 'fish-japanese', quantity: 75, lastUpdated: new Date().toISOString(), lowStockThreshold: 15 },
  { productId: 'fish-betta', quantity: 45, lastUpdated: new Date().toISOString(), lowStockThreshold: 9 },
  
  // Equipment Products
  { productId: 'equipment-11', quantity: 15, lastUpdated: new Date().toISOString(), lowStockThreshold: 3 },
  { productId: 'equipment-12', quantity: 8, lastUpdated: new Date().toISOString(), lowStockThreshold: 2 },
  { productId: 'equipment-2', quantity: 12, lastUpdated: new Date().toISOString(), lowStockThreshold: 3 },
  { productId: 'equipment-3', quantity: 20, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  { productId: 'equipment-4', quantity: 25, lastUpdated: new Date().toISOString(), lowStockThreshold: 5 },
  { productId: 'equipment-5', quantity: 10, lastUpdated: new Date().toISOString(), lowStockThreshold: 2 },
  { productId: 'equipment-6', quantity: 8, lastUpdated: new Date().toISOString(), lowStockThreshold: 2 },
  { productId: 'equipment-7', quantity: 15, lastUpdated: new Date().toISOString(), lowStockThreshold: 3 },
  
  // Accessories Products
  { productId: 'accessories-1', quantity: 20, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  { productId: 'accessories-2', quantity: 30, lastUpdated: new Date().toISOString(), lowStockThreshold: 6 },
  { productId: 'accessories-3', quantity: 18, lastUpdated: new Date().toISOString(), lowStockThreshold: 4 },
  
  // Food Products
  { productId: 'food-1', quantity: 200, lastUpdated: new Date().toISOString(), lowStockThreshold: 30 },
  { productId: 'food-2', quantity: 150, lastUpdated: new Date().toISOString(), lowStockThreshold: 25 },
  { productId: 'food-3', quantity: 180, lastUpdated: new Date().toISOString(), lowStockThreshold: 28 },
  
  // Plants Products
  { productId: 'plants-1', quantity: 40, lastUpdated: new Date().toISOString(), lowStockThreshold: 8 },
  { productId: 'plants-2', quantity: 60, lastUpdated: new Date().toISOString(), lowStockThreshold: 12 },
  { productId: 'plants-3', quantity: 35, lastUpdated: new Date().toISOString(), lowStockThreshold: 7 },
];

// LocalStorage yardımcı fonksiyonları
const loadStockFromStorage = (): StockItem[] => {
  try {
    const stockData = safeLocalStorage.get(STOCK_STORAGE_KEY);
    return stockData ? stockData : getDefaultStock();
  } catch (error) {
    return getDefaultStock();
  }
};

const saveStockToStorage = (stock: StockItem[]): void => {
  try {
    safeLocalStorage.set(STOCK_STORAGE_KEY, stock);
  } catch (error) {
  }
};

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [stockItems, setStockItems] = useState<StockItem[]>(() => loadStockFromStorage());

  // Stoku localStorage'a kaydet
  useEffect(() => {
    saveStockToStorage(stockItems);
  }, [stockItems]);

  const getStockQuantity = (productId: string): number => {
    const stockItem = stockItems.find(item => item.productId === productId);
    return stockItem ? stockItem.quantity : 0;
  };

  const updateStock = (productId: string, quantity: number) => {
    setStockItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === productId
            ? { 
                ...item, 
                quantity: Math.max(0, quantity), // Negatif değerleri engelle
                lastUpdated: new Date().toISOString() 
              }
            : item
        );
      } else {
        return [...prevItems, { 
          productId, 
          quantity: Math.max(0, quantity), 
          lastUpdated: new Date().toISOString(),
          lowStockThreshold: 5 // Varsayılan eşik
        }];
      }
    });
  };

  const isLowStock = (productId: string): boolean => {
    const stockItem = stockItems.find(item => item.productId === productId);
    if (!stockItem) return false;
    return stockItem.quantity <= stockItem.lowStockThreshold && stockItem.quantity > 0;
  };

  const isOutOfStock = (productId: string): boolean => {
    const stockItem = stockItems.find(item => item.productId === productId);
    return !stockItem || stockItem.quantity <= 0;
  };

  const getStockStatus = (productId: string): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (isOutOfStock(productId)) return 'out-of-stock';
    if (isLowStock(productId)) return 'low-stock';
    return 'in-stock';
  };

  const setLowStockThreshold = (productId: string, threshold: number) => {
    setStockItems(prevItems => 
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, lowStockThreshold: Math.max(0, threshold) }
          : item
      )
    );
  };

  const getLowStockProducts = (): Product[] => {
    // Şimdilik boş array döndürüyoruz
    return [];
  };

  const initializeStockForProduct = (productId: string) => {
    setStockItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      if (existingItem) return prevItems;
      
      return [...prevItems, { 
        productId, 
        quantity: 0, 
        lastUpdated: new Date().toISOString(),
        lowStockThreshold: 5 // Varsayılan eşik
      }];
    });
  };

  const value: StockContextType = {
    stockItems,
    getStockQuantity,
    updateStock,
    isLowStock,
    isOutOfStock,
    getStockStatus,
    setLowStockThreshold,
    getLowStockProducts,
    initializeStockForProduct
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};
