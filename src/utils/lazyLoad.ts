import React, { lazy, ComponentType, Suspense } from 'react';

// Enhanced lazy loading with retry mechanism
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  FallbackComponent?: ComponentType,
  retryCount: number = 3
) => {
  const LazyComponent = lazy(() => 
    importFunc().catch((error) => {
      console.warn('Lazy loading failed, retrying...', error);
      return importFunc();
    })
  );

  return (props: React.ComponentProps<T>) =>
    React.createElement(
      Suspense,
      {
        fallback: FallbackComponent
          ? React.createElement(FallbackComponent)
          : React.createElement('div', { 
              className: 'flex items-center justify-center p-4',
              children: 'Loading...' 
            })
      },
      React.createElement(LazyComponent, props)
    );
};

// Preload components for better UX with priority
export const preloadComponent = (importFunc: () => Promise<any>, priority: 'high' | 'low' = 'low') => {
  return () => {
    if (priority === 'high') {
      // Use requestIdleCallback for high priority
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => importFunc());
      } else {
        setTimeout(() => importFunc(), 0);
      }
    } else {
      // Use setTimeout for low priority
      setTimeout(() => importFunc(), 100);
    }
  };
};

// Batch preload multiple components
export const preloadComponents = (components: Array<() => Promise<any>>) => {
  return () => {
    components.forEach((component, index) => {
      setTimeout(() => component(), index * 50); // Stagger loading
    });
  };
};

// Enhanced lazy loading with error boundary
export const lazyLoadWithErrorBoundary = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  FallbackComponent?: ComponentType,
  ErrorComponent?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => {
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
      const handleError = () => setHasError(true);
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError && ErrorComponent) {
      return React.createElement(ErrorComponent, props);
    }

    return React.createElement(
      Suspense,
      {
        fallback: FallbackComponent
          ? React.createElement(FallbackComponent)
          : React.createElement('div', { 
              className: 'flex items-center justify-center p-4',
              children: 'Loading...' 
            })
      },
      React.createElement(LazyComponent, props)
    );
  };
};


