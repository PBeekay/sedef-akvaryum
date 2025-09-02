import React, { lazy, ComponentType, Suspense } from 'react';

// Lazy load components with optional fallback component
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  FallbackComponent?: ComponentType
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) =>
    React.createElement(
      Suspense,
      {
        fallback: FallbackComponent
          ? React.createElement(FallbackComponent)
          : React.createElement('div', null, 'Loading...')
      },
      React.createElement(LazyComponent, props)
    );
};

// Preload components for better UX
export const preloadComponent = (importFunc: () => Promise<any>) => {
  return () => {
    importFunc();
  };
};


