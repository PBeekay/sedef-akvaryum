// Güvenlik testleri için utility fonksiyonları
import { 
  sanitizeInput, 
  sanitizeHTML, 
  validateEmail, 
  validatePassword,
  generateToken,
  verifyToken,
  checkRateLimit,
  clearRateLimit
} from './security';

export const runSecurityTests = async (): Promise<void> => {
  console.log('🔒 Güvenlik Testleri Başlatılıyor...\n');

  // XSS Testleri
  console.log('1. XSS Koruması Testleri:');
  const xssTests = [
    '<script>alert("XSS")</script>',
    'javascript:alert("XSS")',
    '<img src="x" onerror="alert(\'XSS\')">',
    '<svg onload="alert(\'XSS\')">',
    '"><script>alert("XSS")</script>'
  ];

  xssTests.forEach((test, index) => {
    const sanitized = sanitizeInput(test);
    const isSafe = !sanitized.includes('<script>') && !sanitized.includes('javascript:');
    console.log(`  Test ${index + 1}: ${isSafe ? '✅' : '❌'} "${test}" -> "${sanitized}"`);
  });

  // HTML Sanitization Testleri
  console.log('\n2. HTML Sanitization Testleri:');
  const htmlTests = [
    '<b>Bold text</b>',
    '<script>alert("XSS")</script>',
    '<p>Paragraph with <strong>strong</strong> text</p>',
    '<div onclick="alert(\'XSS\')">Click me</div>'
  ];

  htmlTests.forEach((test, index) => {
    const sanitized = sanitizeHTML(test);
    console.log(`  Test ${index + 1}: "${test}" -> "${sanitized}"`);
  });

  // Email Validation Testleri
  console.log('\n3. Email Validation Testleri:');
  const emailTests = [
    'test@example.com',
    'invalid-email',
    'user@domain.co.uk',
    'test.email@subdomain.example.com',
    'not-an-email'
  ];

  emailTests.forEach((test, index) => {
    const isValid = validateEmail(test);
    console.log(`  Test ${index + 1}: ${isValid ? '✅' : '❌'} "${test}"`);
  });

  // Password Validation Testleri
  console.log('\n4. Password Validation Testleri:');
  const passwordTests = [
    'Password123',
    'weak',
    'StrongPass1',
    '12345678',
    'NoNumbers',
    'nouppercase123'
  ];

  passwordTests.forEach((test, index) => {
    const result = validatePassword(test);
    console.log(`  Test ${index + 1}: ${result.isValid ? '✅' : '❌'} "${test}" - ${result.errors.join(', ')}`);
  });

  // JWT Testleri
  console.log('\n5. JWT Token Testleri:');
  try {
    const payload = { username: 'test', role: 'admin' };
    const token = await generateToken(payload);
    const verified = await verifyToken(token);
    console.log(`  Token Generation: ${token ? '✅' : '❌'}`);
    console.log(`  Token Verification: ${verified ? '✅' : '❌'}`);
  } catch (error) {
    console.log(`  JWT Test: ❌ Error - ${error}`);
  }

  // Rate Limiting Testleri
  console.log('\n6. Rate Limiting Testleri:');
  const testId = 'test-user-123';
  clearRateLimit(testId); // Temizle
  
  for (let i = 1; i <= 7; i++) {
    const allowed = checkRateLimit(testId, 5, 60000);
    console.log(`  Request ${i}: ${allowed ? '✅' : '❌'} ${allowed ? 'Allowed' : 'Blocked'}`);
  }

  // URL Validation Testleri
  console.log('\n7. URL Validation Testleri:');
  const urlTests = [
    'https://wa.me/905551234567',
    'javascript:alert("XSS")',
    'https://evil.com/steal-data',
    'data:text/html,<script>alert("XSS")</script>',
    'https://wa.me/905551234567?text=Hello'
  ];

  urlTests.forEach((test, index) => {
    const isSafe = test.startsWith('https://wa.me/') && !test.includes('javascript:') && !test.includes('data:');
    console.log(`  Test ${index + 1}: ${isSafe ? '✅' : '❌'} "${test}"`);
  });

  // Storage Key Validation Testleri
  console.log('\n8. Storage Key Validation Testleri:');
  const keyTests = [
    'valid_key_123',
    'invalid key with spaces',
    'key-with-special@chars',
    'password_secret',
    'admin_token'
  ];

  keyTests.forEach((test, index) => {
    const isValid = /^[a-zA-Z0-9_-]+$/.test(test);
    const isSensitive = ['password', 'token', 'secret', 'key', 'auth'].some(s => test.toLowerCase().includes(s));
    console.log(`  Test ${index + 1}: ${isValid ? '✅' : '❌'} "${test}" ${isSensitive ? '(Sensitive)' : ''}`);
  });

  console.log('\n🔒 Güvenlik Testleri Tamamlandı!');
};

// Test fonksiyonunu export et
export default runSecurityTests;
