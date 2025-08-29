import bcrypt from 'bcryptjs';

// Environment variables (gerçek uygulamada .env dosyasından alınmalı)
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || 'sedef-akvaryum-secret-key-2024';
const SALT_ROUNDS = 12;

// Browser-compatible JWT Token işlemleri
export const generateToken = (payload: any): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (8 * 60 * 60); // 8 hours
  
  const data = {
    ...payload,
    iat: now,
    exp: exp
  };
  
  // Simple base64 encoding for browser compatibility
  const headerB64 = btoa(JSON.stringify(header));
  const payloadB64 = btoa(JSON.stringify(data));
  
  // Simple signature (in production, use proper crypto)
  const signature = btoa(JWT_SECRET + headerB64 + payloadB64);
  
  return `${headerB64}.${payloadB64}.${signature}`;
};

export const verifyToken = (token: string): any => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerB64, payloadB64, signature] = parts;
    
    // Verify signature (simple check for browser compatibility)
    const expectedSignature = btoa(JWT_SECRET + headerB64 + payloadB64);
    if (signature !== expectedSignature) return null;
    
    const payload = JSON.parse(atob(payloadB64));
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    
    return payload;
  } catch (error) {
    return null;
  }
};

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Input validation ve sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // XSS koruması
    .replace(/javascript:/gi, '') // JavaScript injection koruması
    .replace(/on\w+=/gi, ''); // Event handler koruması
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

// Rate limiting için basit bir in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Secure storage utilities
export const secureStorage = {
  setItem: (key: string, value: any): void => {
    try {
      const encryptedValue = btoa(JSON.stringify(value));
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Secure storage setItem error:', error);
    }
  },
  
  getItem: (key: string): any => {
    try {
      const encryptedValue = sessionStorage.getItem(key);
      if (!encryptedValue) return null;
      return JSON.parse(atob(encryptedValue));
    } catch (error) {
      console.error('Secure storage getItem error:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    sessionStorage.removeItem(key);
  }
};

