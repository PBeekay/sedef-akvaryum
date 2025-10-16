import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sanitizeInput } from '../utils/security';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Input sanitization
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Basic validation
    if (!sanitizedEmail || !sanitizedPassword) {
      setError('Email ve şifre gereklidir!');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setError('Geçerli bir email adresi girin!');
      setIsLoading(false);
      return;
    }

    try {
      await login(sanitizedEmail, sanitizedPassword);
      navigate('/admin');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Firebase Auth error handling
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Bu email adresi ile kayıtlı kullanıcı bulunamadı.');
          break;
        case 'auth/wrong-password':
          setError('Şifre hatalı.');
          break;
        case 'auth/invalid-email':
          setError('Geçersiz email adresi.');
          break;
        case 'auth/too-many-requests':
          setError('Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.');
          break;
        default:
          setError('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">🦐</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Girişi
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sedef Akvaryum Yönetim Paneli
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Adresi
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Email adresinizi girin"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Şifrenizi girin"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Bu panel sadece yetkili kullanıcılar içindir.
          </p>
          
          {/* Admin Bilgileri - Sadece development için */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Firebase Auth Giriş Bilgileri:</h3>
              <div className="text-xs text-blue-700 space-y-2">
                <div>
                  <p><strong>Admin:</strong> admin@sedefakvaryum.com</p>
                </div>
                <div>
                  <p><strong>Moderator:</strong> moderator@sedefakvaryum.com</p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  ⚠️ Bu kullanıcıları Firebase Console'da oluşturun
                </p>
                <p className="text-xs text-blue-600">
                  ⚠️ Authentication → Users → Add User
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
