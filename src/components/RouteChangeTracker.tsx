// src/components/RouteChangeTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Her sayfa (URL) değiştiğinde, Google Analytics'e bu yeni sayfayı gönderiyoruz.
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]); // Bu useEffect, sadece location değiştiğinde çalışır.

  return null; // Bu bileşen ekranda hiçbir şey göstermeyecek.
};

export default RouteChangeTracker;