import { useState, useEffect, useRef, TouchEvent } from 'react';

interface SwipeInput {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = input.minSwipeDistance || 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    // Horizontal swipes
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe && input.onSwipeLeft) {
        input.onSwipeLeft();
      }
      if (isRightSwipe && input.onSwipeRight) {
        input.onSwipeRight();
      }
    }
    // Vertical swipes
    else {
      if (isUpSwipe && input.onSwipeUp) {
        input.onSwipeUp();
      }
      if (isDownSwipe && input.onSwipeDown) {
        input.onSwipeDown();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

// Pull to refresh hook
export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Ref'ler kullanarak değişkenleri sakla (re-render'ları önlemek için)
  const touchDataRef = useRef({
    startY: 0,
    currentY: 0,
    touchStartTime: 0,
    hasScrolled: false,
    pullDistance: 0,
  });

  // Sabit değerler
  const MAX_PULL_DISTANCE = 120;
  const REFRESH_THRESHOLD = 100; // Daha yüksek eşik - sadece kasıtlı çekmede tetiklenir
  const SCROLL_THRESHOLD = 5; // Scroll pozisyonu bu değerin altındaysa pull to refresh aktif
  const MIN_PULL_DISTANCE = 30; // Minimum çekme mesafesi

  const isAtTop = () => {
    // Sayfa en üstteyse veya çok yakınsa (5px tolerans)
    return window.scrollY <= SCROLL_THRESHOLD || 
           document.documentElement.scrollTop <= SCROLL_THRESHOLD ||
           document.body.scrollTop <= SCROLL_THRESHOLD;
  };

  useEffect(() => {
    const handleTouchStart = (e: globalThis.TouchEvent) => {
      // Sadece sayfa en üstteyken ve refresh yapılmıyorken pull to refresh'i başlat
      if (isAtTop() && !isRefreshing) {
        touchDataRef.current.startY = e.touches[0].clientY;
        touchDataRef.current.touchStartTime = Date.now();
        touchDataRef.current.hasScrolled = false;
        setIsPulling(true);
      } else {
        setIsPulling(false);
      }
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      // Eğer sayfa en üstte değilse veya refresh yapılıyorsa, hiçbir şey yapma
      if (!isAtTop() || isRefreshing) {
        if (isPulling) {
          setIsPulling(false);
          setPullDistance(0);
          touchDataRef.current.pullDistance = 0;
        }
        return;
      }

      // Eğer kullanıcı yukarı çekiyorsa (pull to refresh), tetikle
      if (isPulling) {
        touchDataRef.current.currentY = e.touches[0].clientY;
        const distance = touchDataRef.current.currentY - touchDataRef.current.startY;

        // Sadece yukarı doğru çekme hareketi (distance > 0)
        if (distance > 0) {
          // Minimum çekme gereksinimi - küçük hareketleri ignore et
          if (distance > MIN_PULL_DISTANCE) {
            e.preventDefault();
            const pull = Math.min((distance - MIN_PULL_DISTANCE) * 0.6, MAX_PULL_DISTANCE);
            touchDataRef.current.pullDistance = pull;
            setPullDistance(pull);
          }
        } else if (distance < -10) {
          // Kullanıcı aşağı kaydırıyorsa, pull to refresh'i iptal et
          setIsPulling(false);
          setPullDistance(0);
          touchDataRef.current.pullDistance = 0;
          touchDataRef.current.hasScrolled = true;
        }
      }
    };

    const handleTouchEnd = async () => {
      const { hasScrolled, touchStartTime, pullDistance: currentPullDistance } = touchDataRef.current;
      
      if (!isPulling || hasScrolled || isRefreshing) {
        setIsPulling(false);
        setPullDistance(0);
        touchDataRef.current.pullDistance = 0;
        touchDataRef.current.hasScrolled = false;
        return;
      }

      const touchDuration = Date.now() - touchStartTime;
      
      // Çok kısa dokunmaları ignore et (yanlışlıkla tetiklemeyi önle)
      if (touchDuration < 100) {
        setIsPulling(false);
        setPullDistance(0);
        touchDataRef.current.pullDistance = 0;
        return;
      }

      setIsPulling(false);
      setPullDistance(0);

      // Eşik değerini aştıysa ve hala en üstteysek refresh yap
      if (currentPullDistance >= REFRESH_THRESHOLD && isAtTop()) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      
      touchDataRef.current.pullDistance = 0;
    };

    // Scroll olayını dinle - eğer kullanıcı scroll yapıyorsa pull to refresh'i iptal et
    const handleScroll = () => {
      if (!isAtTop() && isPulling) {
        setIsPulling(false);
        setPullDistance(0);
        touchDataRef.current.pullDistance = 0;
        touchDataRef.current.hasScrolled = true;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPulling, isRefreshing, onRefresh]);

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    refreshThreshold: REFRESH_THRESHOLD,
  };
};

