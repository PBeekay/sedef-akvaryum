import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PWAInstallButton from './components/PWAInstallButton';
import OfflinePage from './components/OfflinePage';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

import { AdminProvider } from './context/AdminContext';
import { StockProvider } from './context/StockContext';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component for Suspense fallback
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <StockProvider>
          <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />

            {/* Floating WhatsApp Button */}
            <WhatsAppButton
              message="Merhaba! Akvaryum mağazanızın hizmetleri hakkında sorum var."
              variant="floating"
            />

            {/* PWA Install Button */}
            <PWAInstallButton variant="floating" />

            {/* Offline Page */}
            <OfflinePage />

            {/* Performance Monitor (Development Only) */}
            
                      </div>
          </Router>
        </StockProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;
