import { useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  cacheHitRate: number;
  bundleSize: number;
  loadTime: number;
}

interface PerformanceConfig {
  enableFPS: boolean;
  enableMemory: boolean;
  enableRenderTime: boolean;
  enableCacheAnalytics: boolean;
  logToConsole: boolean;
  logLevel: 'info' | 'warn' | 'error' | 'debug';
}

const defaultConfig: PerformanceConfig = {
  enableFPS: true,
  enableMemory: true,
  enableRenderTime: true,
  enableCacheAnalytics: true,
  logToConsole: true,
  logLevel: 'info'
};

// Terminal logging utility
const logToTerminal = (message: string, level: string = 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [PERFORMANCE]`;
  
  switch (level) {
    case 'error':
      console.error(`${prefix} ❌ ${message}`, data || '');
      break;
    case 'warn':
      console.warn(`${prefix} ⚠️  ${message}`, data || '');
      break;
    case 'debug':
      console.debug(`${prefix} 🔍 ${message}`, data || '');
      break;
    case 'info':
    default:
      console.log(`${prefix} ℹ️  ${message}`, data || '');
      break;
  }
};

export const usePerformance = (config: Partial<PerformanceConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef<number[]>([]);
  const renderTimesRef = useRef<number[]>([]);
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    cacheHitRate: 0,
    bundleSize: 0,
    loadTime: 0
  });

  // FPS measurement with terminal logging
  const measureFPS = useCallback(() => {
    if (!finalConfig.enableFPS || !finalConfig.logToConsole) return;

    const now = performance.now();
    frameCountRef.current++;

    if (now - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
      fpsRef.current.push(fps);
      
      // Keep only last 10 measurements
      if (fpsRef.current.length > 10) {
        fpsRef.current.shift();
      }

      const avgFPS = fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length;
      metricsRef.current.fps = Math.round(avgFPS);
      
      // Log FPS to terminal
      if (avgFPS < 30) {
        logToTerminal(`Low FPS detected: ${Math.round(avgFPS)}`, 'warn', { fps: avgFPS, samples: fpsRef.current.length });
      } else if (avgFPS < 45) {
        logToTerminal(`FPS: ${Math.round(avgFPS)}`, 'info', { fps: avgFPS });
      } else {
        logToTerminal(`FPS: ${Math.round(avgFPS)}`, 'debug', { fps: avgFPS });
      }
      
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }

    requestAnimationFrame(measureFPS);
  }, [finalConfig.enableFPS, finalConfig.logToConsole]);

  // Memory usage measurement with terminal logging
  const measureMemory = useCallback(() => {
    if (!finalConfig.enableMemory || !finalConfig.logToConsole || !('memory' in performance)) return;

    const memory = (performance as any).memory;
    if (memory) {
      const usedJSHeapSize = memory.usedJSHeapSize / 1024 / 1024; // MB
      const totalJSHeapSize = memory.totalJSHeapSize / 1024 / 1024; // MB
      const jsHeapSizeLimit = memory.jsHeapSizeLimit / 1024 / 1024; // MB
      
      metricsRef.current.memoryUsage = Math.round(usedJSHeapSize * 100) / 100;
      
      // Log memory usage to terminal
      const memoryUsagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;
      
      if (memoryUsagePercent > 80) {
        logToTerminal(`High memory usage: ${Math.round(usedJSHeapSize)}MB (${Math.round(memoryUsagePercent)}%)`, 'error', {
          used: Math.round(usedJSHeapSize),
          total: Math.round(totalJSHeapSize),
          limit: Math.round(jsHeapSizeLimit),
          percent: Math.round(memoryUsagePercent)
        });
      } else if (memoryUsagePercent > 60) {
        logToTerminal(`Memory usage: ${Math.round(usedJSHeapSize)}MB (${Math.round(memoryUsagePercent)}%)`, 'warn', {
          used: Math.round(usedJSHeapSize),
          total: Math.round(totalJSHeapSize),
          limit: Math.round(jsHeapSizeLimit)
        });
      } else {
        logToTerminal(`Memory usage: ${Math.round(usedJSHeapSize)}MB (${Math.round(memoryUsagePercent)}%)`, 'debug', {
          used: Math.round(usedJSHeapSize),
          total: Math.round(totalJSHeapSize)
        });
      }
    }
  }, [finalConfig.enableMemory, finalConfig.logToConsole]);

  // Render time measurement with terminal logging
  const measureRenderTime = useCallback((renderFunction: () => void, componentName?: string) => {
    if (!finalConfig.enableRenderTime || !finalConfig.logToConsole) {
      renderFunction();
      return;
    }

    const start = performance.now();
    renderFunction();
    const end = performance.now();
    
    const renderTime = end - start;
    renderTimesRef.current.push(renderTime);
    
    // Keep only last 20 measurements
    if (renderTimesRef.current.length > 20) {
      renderTimesRef.current.shift();
    }

    const avgRenderTime = renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length;
    metricsRef.current.renderTime = Math.round(avgRenderTime * 100) / 100;
    
    // Log render time to terminal
    if (renderTime > 16) { // More than one frame at 60fps
      logToTerminal(`Slow render detected${componentName ? ` in ${componentName}` : ''}: ${Math.round(renderTime)}ms`, 'warn', {
        renderTime: Math.round(renderTime),
        avgRenderTime: Math.round(avgRenderTime),
        component: componentName
      });
    } else if (renderTime > 8) {
      logToTerminal(`Render time${componentName ? ` in ${componentName}` : ''}: ${Math.round(renderTime)}ms`, 'info', {
        renderTime: Math.round(renderTime),
        component: componentName
      });
    } else {
      logToTerminal(`Render time${componentName ? ` in ${componentName}` : ''}: ${Math.round(renderTime)}ms`, 'debug', {
        renderTime: Math.round(renderTime),
        component: componentName
      });
    }
  }, [finalConfig.enableRenderTime, finalConfig.logToConsole]);

  // Cache analytics with terminal logging
  const measureCachePerformance = useCallback(() => {
    if (!finalConfig.enableCacheAnalytics || !finalConfig.logToConsole) return;

    // Get cache stats from localStorage
    const cacheStats = JSON.parse(localStorage.getItem('cache_stats') || '{"hits": 0, "misses": 0}');
    const total = cacheStats.hits + cacheStats.misses;
    const hitRate = total > 0 ? (cacheStats.hits / total) * 100 : 0;
    
    metricsRef.current.cacheHitRate = Math.round(hitRate * 100) / 100;
    
    // Log cache performance to terminal
    if (hitRate < 50) {
      logToTerminal(`Low cache hit rate: ${Math.round(hitRate)}%`, 'warn', {
        hits: cacheStats.hits,
        misses: cacheStats.misses,
        total,
        hitRate: Math.round(hitRate)
      });
    } else if (hitRate < 80) {
      logToTerminal(`Cache hit rate: ${Math.round(hitRate)}%`, 'info', {
        hits: cacheStats.hits,
        misses: cacheStats.misses,
        hitRate: Math.round(hitRate)
      });
    } else {
      logToTerminal(`Cache hit rate: ${Math.round(hitRate)}%`, 'debug', {
        hits: cacheStats.hits,
        misses: cacheStats.misses,
        hitRate: Math.round(hitRate)
      });
    }
  }, [finalConfig.enableCacheAnalytics, finalConfig.logToConsole]);

  // Bundle size measurement with terminal logging
  const measureBundleSize = useCallback(() => {
    if (!finalConfig.logToConsole) return;

    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;
    const scriptSizes: { [key: string]: number } = {};
    
    scripts.forEach(script => {
      const src = (script as HTMLScriptElement).src;
      if (src.includes('static/js/')) {
        // Estimate based on common chunk sizes
        const estimatedSize = 50; // KB
        totalSize += estimatedSize;
        scriptSizes[src] = estimatedSize;
      }
    });

    metricsRef.current.bundleSize = totalSize;
    
    // Log bundle size to terminal
    if (totalSize > 500) {
      logToTerminal(`Large bundle size: ${totalSize}KB`, 'warn', {
        totalSize,
        scripts: scriptSizes
      });
    } else if (totalSize > 300) {
      logToTerminal(`Bundle size: ${totalSize}KB`, 'info', {
        totalSize,
        scriptCount: scripts.length
      });
    } else {
      logToTerminal(`Bundle size: ${totalSize}KB`, 'debug', {
        totalSize,
        scriptCount: scripts.length
      });
    }
  }, [finalConfig.logToConsole]);

  // Load time measurement with terminal logging
  const measureLoadTime = useCallback(() => {
    if (!finalConfig.logToConsole) return;

    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      metricsRef.current.loadTime = Math.round(loadTime);
      
      // Log load time to terminal
      if (loadTime > 3000) {
        logToTerminal(`Slow page load: ${Math.round(loadTime)}ms`, 'warn', {
          loadTime: Math.round(loadTime),
          navigationStart: performance.timing.navigationStart,
          loadEventEnd: performance.timing.loadEventEnd
        });
      } else if (loadTime > 1000) {
        logToTerminal(`Page load time: ${Math.round(loadTime)}ms`, 'info', {
          loadTime: Math.round(loadTime)
        });
      } else {
        logToTerminal(`Page load time: ${Math.round(loadTime)}ms`, 'debug', {
          loadTime: Math.round(loadTime)
        });
      }
    }
  }, [finalConfig.logToConsole]);

  // Start performance monitoring
  const startMonitoring = useCallback(() => {
    if (finalConfig.logToConsole) {
      logToTerminal('Starting performance monitoring', 'info');
    }
    
    measureLoadTime();
    measureBundleSize();
    
    if (finalConfig.enableFPS) {
      measureFPS();
    }

    // Set up periodic measurements
    const interval = setInterval(() => {
      measureMemory();
      measureCachePerformance();
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [finalConfig, measureFPS, measureMemory, measureCachePerformance, measureLoadTime, measureBundleSize]);

  // Get current metrics
  const getMetrics = useCallback(() => {
    return { ...metricsRef.current };
  }, []);

  // Get performance report
  const getPerformanceReport = useCallback(() => {
    const report = {
      ...metricsRef.current,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      deviceMemory: (navigator as any).deviceMemory || 'unknown'
    };

    if (finalConfig.logToConsole) {
      logToTerminal('Performance report generated', 'info', report);
    }

    return report;
  }, [finalConfig.logToConsole]);

  // Log performance summary
  const logPerformanceSummary = useCallback(() => {
    if (!finalConfig.logToConsole) return;

    const metrics = getMetrics();
    logToTerminal('Performance Summary', 'info', {
      fps: metrics.fps,
      memory: `${metrics.memoryUsage}MB`,
      renderTime: `${metrics.renderTime}ms`,
      cacheHitRate: `${metrics.cacheHitRate}%`,
      bundleSize: `${metrics.bundleSize}KB`,
      loadTime: `${metrics.loadTime}ms`
    });
  }, [finalConfig.logToConsole, getMetrics]);

  return {
    startMonitoring,
    measureRenderTime,
    getMetrics,
    getPerformanceReport,
    logPerformanceSummary
  };
};

export default usePerformance;