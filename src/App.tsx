import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import RouteChangeTracker from './components/RouteChangeTracker';
import { ProductGridSkeleton } from './components/SkeletonLoader';

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

// Loading component for Suspense fallback - Skeleton instead of spinner
const PageLoader: React.FC = () => (
  <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 h-12 bg-gray-200 rounded animate-pulse w-64" />
      <ProductGridSkeleton count={8} />
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <StockProvider>
          <Router basename="/">
          {/* Google Analytics Route Tracking */}
          <RouteChangeTracker />
          
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-primary-700 px-3 py-2 rounded-md shadow">
            İçeriğe geç
          </a>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main id="main-content" role="main" className="flex-grow pb-20 md:pb-0" tabIndex={-1}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Turkish slug aliases → canonical category routes */}
                  <Route path="/balik" element={<Navigate to="/category/fish" replace />} />
                  <Route path="/karides" element={<Navigate to="/category/shrimp" replace />} />
                  <Route path="/bitkiler" element={<Navigate to="/category/plants" replace />} />
                  <Route path="/ekipman" element={<Navigate to="/category/equipment" replace />} />
                  <Route path="/aksesuarlar" element={<Navigate to="/category/accessories" replace />} />
                  <Route path="/yem" element={<Navigate to="/category/food" replace />} />
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
            {/* Back To Top Button */}
            <BackToTop />

            {/* Scroll Progress Bar */}
            <ScrollProgressBar />

            {/* Bottom Navigation (Mobile Only) */}
            <BottomNav />
          </div>
          </Router>
        </StockProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;
