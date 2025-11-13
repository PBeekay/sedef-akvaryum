import { useEffect } from 'react';

/**
 * Disables the native pull-to-refresh behaviour on mobile browsers.
 * Some Android browsers (Chrome, Samsung Internet) trigger a full page reload when the user
 * pulls down while the window scroll position is already at the top. This hook intercepts the
 * gesture and prevents the default behaviour so that scrolling continues smoothly instead of
 * refreshing the page.
 */
const useDisablePullToRefresh = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const supportsTouch =
      'ontouchstart' in window || (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints > 0;

    if (!supportsTouch) {
      return;
    }

    let lastTouchY = 0;
    let maybePreventPullToRefresh = false;

    const canScrollUp = () =>
      window.scrollY > 0 ||
      document.documentElement.scrollTop > 0 ||
      document.body.scrollTop > 0;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        return;
      }

      lastTouchY = event.touches[0].clientY;
      maybePreventPullToRefresh = !canScrollUp();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!maybePreventPullToRefresh) {
        return;
      }

      const currentY = event.touches[0].clientY;
      const deltaY = currentY - lastTouchY;
      lastTouchY = currentY;

      if (deltaY > 0) {
        event.preventDefault();
      } else {
        maybePreventPullToRefresh = false;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
};

export default useDisablePullToRefresh;


