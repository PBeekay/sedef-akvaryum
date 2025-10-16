import bcrypt from 'bcryptjs';
import DOMPurify from 'dompurify';
import { SignJWT, jwtVerify } from 'jose';

// Environment variables - .env dosyasından alınmalı
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-fallback-secret-key-2024' : undefined);
const SALT_ROUNDS = 12;

// JWT secret kontrolü - Production'da zorunlu
if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('REACT_APP_JWT_SECRET environment variable is required in production. Please set it in your environment variables.');
}

// Development için fallback
if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_JWT_SECRET) {
  console.warn('REACT_APP_JWT_SECRET not set in development. Using fallback secret.');
}

// Güvenli JWT Token işlemleri - Browser uyumlu kriptografi ile
export const generateToken = async (payload: any): Promise<string> => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required for token generation');
  }
  
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .setIssuer('sedef-akvaryum')
    .setAudience('admin-panel')
    .sign(secret);
    
  return jwt;
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is required for token verification');
    }
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'sedef-akvaryum',
      audience: 'admin-panel'
    });
    
    return payload;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }
};

// Token'ın geçerli olup olmadığını kontrol et
export const isTokenValid = async (token: string): Promise<boolean> => {
  const decoded = await verifyToken(token);
  return decoded !== null;
};

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Input validation ve sanitization - DOMPurify ile güçlendirilmiş XSS koruması
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // DOMPurify ile temizleme
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Hiçbir HTML tag'ine izin verme
    ALLOWED_ATTR: [], // Hiçbir attribute'a izin verme
    KEEP_CONTENT: true // Sadece metin içeriğini koru
  });
  
  return sanitized
    .trim()
    // Ek güvenlik için regex temizleme
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Maksimum uzunluk kontrolü
    .substring(0, 1000);
};

// HTML içeriği için güvenli sanitization (sınırlı HTML tag'leri ile)
export const sanitizeHTML = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting için localStorage tabanlı persistent store
const RATE_LIMIT_KEY = 'sedef_akvaryum_rate_limits';

interface RateLimitRecord {
  count: number;
  resetTime: number;
  blocked: boolean;
}

const getRateLimitStore = (): Map<string, RateLimitRecord> => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return new Map(Object.entries(data));
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    }
  }
  return new Map();
};

const saveRateLimitStore = (store: Map<string, RateLimitRecord>): void => {
  try {
    const data = Object.fromEntries(store);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    }
  }
};

export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const store = getRateLimitStore();
  const record = store.get(identifier);
  
  // Eğer kullanıcı bloklanmışsa ve süre dolmamışsa
  if (record?.blocked && now < record.resetTime) {
    return false;
  }
  
  // Eğer kayıt yoksa veya süre dolmuşsa yeni kayıt oluştur
  if (!record || now > record.resetTime) {
    store.set(identifier, { 
      count: 1, 
      resetTime: now + windowMs,
      blocked: false 
    });
    saveRateLimitStore(store);
    return true;
  }
  
  // Limit aşıldıysa blokla
  if (record.count >= maxRequests) {
    record.blocked = true;
    record.resetTime = now + (windowMs * 2); // 2x daha uzun blokla
    store.set(identifier, record);
    saveRateLimitStore(store);
    return false;
  }
  
  record.count++;
  store.set(identifier, record);
  saveRateLimitStore(store);
  return true;
};

// Rate limit durumunu temizle
export const clearRateLimit = (identifier: string): void => {
  const store = getRateLimitStore();
  store.delete(identifier);
  saveRateLimitStore(store);
};

// Tüm rate limit verilerini temizle
export const clearAllRateLimits = (): void => {
  localStorage.removeItem(RATE_LIMIT_KEY);
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Admin şifre hash'i oluşturma (sadece geliştirme için)
export const generateAdminPasswordHash = async (password: string): Promise<string> => {
  const hash = await hashPassword(password);
  return hash;
};

// Secure storage utilities - Geliştirilmiş güvenlik
export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      // Validate key format
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        return;
      }
      
      // Basit şifreleme (gerçek uygulamada daha güçlü şifreleme kullanın)
      const data = JSON.stringify(value);
      const encryptedValue = btoa(data);
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      // Production'da console.error kullanmayın
      if (process.env.NODE_ENV === 'development') {
      }
    }
  },
  
  getItem: (key: string): any => {
    try {
      // Validate key format
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        return null;
      }
      
      const encryptedValue = sessionStorage.getItem(key);
      if (!encryptedValue) return null;
      const decryptedValue = atob(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch (error) {
      // Şifreleme hatası durumunda temizle
      sessionStorage.removeItem(key);
      if (process.env.NODE_ENV === 'development') {
      }
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      return;
    }
    sessionStorage.removeItem(key);
  },
  
  // Tüm admin verilerini temizle
  clearAdminData: (): void => {
    const keys = ['adminToken', 'adminUser', 'adminSession'];
    keys.forEach(key => sessionStorage.removeItem(key));
  }
};

// Enhanced localStorage wrapper with security checks
export const secureLocalStorage = {
  setItem: (key: string, value: any): void => {
    try {
      // Validate key format
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        return;
      }
      
      // Don't store sensitive data in localStorage
      const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        return;
      }
      
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
      }
    }
  },
  
  getItem: (key: string): any => {
    try {
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        return null;
      }
      
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
      }
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      return;
    }
    localStorage.removeItem(key);
  }
};

