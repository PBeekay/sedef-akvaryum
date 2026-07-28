import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import RouteChangeTracker from './components/RouteChangeTracker';

import useDisablePullToRefresh from './hooks/useDisablePullToRefresh';

import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { StockProvider } from './context/StockContext';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component for Suspense fallback - keep UI boş, ekstra ekran gösterme
const SuspenseLoader: React.FC = () => null;

// Inner component to use useLocation hook
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useDisablePullToRefresh();

  return (
    <>
      {/* Google Analytics Route Tracking */}
      <RouteChangeTracker />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-primary-700 px-3 py-2 rounded-md shadow">
        İçeriğe geç
      </a>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main id="main-content" role="main" className="flex-grow" tabIndex={-1}>
          <Suspense fallback={<SuspenseLoader />}>
            <div key={location.pathname} className="page-transition">
              <Routes location={location}>
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
                <Route path="/search" element={<SearchPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminPage />} />

                {/* 404 Route */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
          </Suspense>
        </main>

        {!isAdminPage && <Footer />}

        {/* Floating WhatsApp Button - Hide on admin pages */}
        {!isAdminPage && (
          <WhatsAppButton
            message="Merhaba! Akvaryum mağazanızın hizmetleri hakkında sorum var."
            variant="floating"
          />
        )}
        {/* Back To Top Button - Hide on admin pages */}
        {!isAdminPage && <BackToTop />}

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />
      </div>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <StockProvider>
            <Router basename="/">
              <AppContent />
            </Router>
          </StockProvider>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

