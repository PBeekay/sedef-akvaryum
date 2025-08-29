import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
}

export const usePerformance = (pageName: string) => {
  const trackPageLoad = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const metrics: PerformanceMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
        timeToInteractive: navigation.domInteractive - navigation.fetchStart,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      };

      // Send to analytics (you can replace with your analytics service)
      console.log(`Performance metrics for ${pageName}:`, metrics);
      
      // You can send this to Google Analytics, Mixpanel, etc.
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'performance', {
          page_name: pageName,
          page_load_time: metrics.pageLoadTime,
          time_to_interactive: metrics.timeToInteractive,
          first_contentful_paint: metrics.firstContentfulPaint
        });
      }
    }
  }, [pageName]);

  const trackUserInteraction = useCallback((action: string, value?: any) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'user_interaction', {
        page_name: pageName,
        action,
        value
      });
    }
  }, [pageName]);

  useEffect(() => {
    // Track page load when component mounts
    const timer = setTimeout(trackPageLoad, 100);
    return () => clearTimeout(timer);
  }, [trackPageLoad]);

  return { trackUserInteraction };
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
