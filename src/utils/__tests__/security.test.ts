import { 
  generateToken, 
  verifyToken, 
  hashPassword, 
  comparePassword, 
  sanitizeInput, 
  validateEmail, 
  validatePassword,
  checkRateLimit,
  generateCSRFToken
} from '../security';

describe('Security Utils', () => {
  describe('JWT Token Operations', () => {
    it('should generate and verify token correctly', () => {
      const payload = { username: 'test', role: 'admin' };
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      const decoded = verifyToken(token);
      expect(decoded).toBeDefined();
      expect(decoded.username).toBe('test');
      expect(decoded.role).toBe('admin');
    });

    it('should return null for invalid token', () => {
      const result = verifyToken('invalid-token');
      expect(result).toBeNull();
    });
  });

  describe('Password Hashing', () => {
    it('should hash password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should compare password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await comparePassword(password, hashedPassword);
      expect(isValid).toBe(true);
      
      const isInvalid = await comparePassword('wrongPassword', hashedPassword);
      expect(isInvalid).toBe(false);
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize input correctly', () => {
      const maliciousInput = '<script>alert("xss")</script>Hello World';
      const sanitized = sanitizeInput(maliciousInput);
      
      expect(sanitized).toBe('scriptalert("xss")/scriptHello World');
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
    });

    it('should remove javascript protocol', () => {
      const input = 'javascript:alert("xss")';
      const sanitized = sanitizeInput(input);
      
      expect(sanitized).toBe('alert("xss")');
    });

    it('should remove event handlers', () => {
      const input = 'onclick=alert("xss") onload=alert("xss")';
      const sanitized = sanitizeInput(input);
      
      expect(sanitized).toBe('=alert("xss") =alert("xss")');
    });
  });

  describe('Email Validation', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org'
      ];
      
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com'
      ];
      
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      const strongPassword = 'StrongPass123';
      const result = validatePassword(strongPassword);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const weakPassword = 'weak';
      const result = validatePassword(weakPassword);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should provide specific error messages', () => {
      const password = 'weak';
      const result = validatePassword(password);
      
      expect(result.errors).toContain('Şifre en az 8 karakter olmalıdır');
      expect(result.errors).toContain('Şifre en az bir büyük harf içermelidir');
      expect(result.errors).toContain('Şifre en az bir rakam içermelidir');
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests within limit', () => {
      const identifier = 'test-user';
      
      // İlk 5 istek izin verilmeli
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(identifier, 5, 60000)).toBe(true);
      }
    });

    it('should block requests over limit', () => {
      const identifier = 'test-user-2';
      
      // 5 istek yap
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier, 5, 60000);
      }
      
      // 6. istek engellenmeli
      expect(checkRateLimit(identifier, 5, 60000)).toBe(false);
    });
  });

  describe('CSRF Token Generation', () => {
    it('should generate unique tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      
      expect(token1).toBeDefined();
      expect(token2).toBeDefined();
      expect(token1).not.toBe(token2);
      expect(typeof token1).toBe('string');
      expect(token1.length).toBeGreaterThan(0);
    });
  });
});



