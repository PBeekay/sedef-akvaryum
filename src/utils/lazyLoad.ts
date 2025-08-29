import { lazy, ComponentType } from 'react';

// Lazy load components with error boundary
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback ? <fallback /> : <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Preload components for better UX
export const preloadComponent = (importFunc: () => Promise<any>) => {
  return () => {
    importFunc();
  };
};

