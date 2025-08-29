import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import PWAInstallButton from './components/PWAInstallButton';
import OfflinePage from './components/OfflinePage';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';

import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import { AdminProvider } from './context/AdminContext';
import { StockProvider } from './context/StockContext';

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <StockProvider>
          <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
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
                      </div>
          </Router>
        </StockProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;
