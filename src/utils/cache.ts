import { log } from './logger';

// Cache utility for better performance
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheOptions {
  ttl?: number; // Default TTL: 5 minutes
  maxSize?: number; // Maximum cache size
  enableLogging?: boolean; // Enable cache logging
}

class CacheManager {
  private memoryCache = new Map<string, CacheItem<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly maxSize = 100;
  private cacheStats = { hits: 0, misses: 0 };

  constructor(private options: CacheOptions = {}) {
    this.options.ttl = this.options.ttl || this.defaultTTL;
    this.options.maxSize = this.options.maxSize || this.maxSize;
    this.options.enableLogging = this.options.enableLogging ?? true;
    
    // Load cache stats from localStorage
    try {
      const savedStats = localStorage.getItem('cache_stats');
      if (savedStats) {
        this.cacheStats = JSON.parse(savedStats);
      }
    } catch (error) {
      log.error('Failed to load cache stats', { error }, 'CacheManager');
    }
  }

  // Set item in cache
  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.options.ttl!
    };

    // Check cache size and remove oldest items if needed
    if (this.memoryCache.size >= this.options.maxSize!) {
      const oldestKey = this.memoryCache.keys().next().value;
      if (oldestKey) {
        this.memoryCache.delete(oldestKey);
        if (this.options.enableLogging) {
          log.cache('delete', oldestKey, 'CacheManager');
        }
      }
    }

    this.memoryCache.set(key, item);
    
    if (this.options.enableLogging) {
      log.cache('set', key, 'CacheManager');
    }
  }

  // Get item from cache
  get<T>(key: string): T | null {
    const item = this.memoryCache.get(key);
    
    if (!item) {
      this.cacheStats.misses++;
      this.saveCacheStats();
      if (this.options.enableLogging) {
        log.cache('miss', key, 'CacheManager');
      }
      return null;
    }

    // Check if item is expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.memoryCache.delete(key);
      this.cacheStats.misses++;
      this.saveCacheStats();
      if (this.options.enableLogging) {
        log.cache('miss', key, 'CacheManager');
      }
      return null;
    }

    this.cacheStats.hits++;
    this.saveCacheStats();
    if (this.options.enableLogging) {
      log.cache('hit', key, 'CacheManager');
    }
    return item.data;
  }

  // Check if item exists and is valid
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Remove item from cache
  delete(key: string): boolean {
    return this.memoryCache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.memoryCache.clear();
  }

  // Save cache stats to localStorage
  private saveCacheStats(): void {
    try {
      localStorage.setItem('cache_stats', JSON.stringify(this.cacheStats));
    } catch (error) {
      log.error('Failed to save cache stats', { error }, 'CacheManager');
    }
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.memoryCache.size,
      maxSize: this.options.maxSize,
      keys: Array.from(this.memoryCache.keys()),
      hits: this.cacheStats.hits,
      misses: this.cacheStats.misses,
      hitRate: this.cacheStats.hits + this.cacheStats.misses > 0 
        ? (this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses)) * 100 
        : 0
    };
  }

  // Clean expired items
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    const entries = Array.from(this.memoryCache.entries());
    for (const [key, item] of entries) {
      if (now - item.timestamp > item.ttl) {
        this.memoryCache.delete(key);
        cleaned++;
        if (this.options.enableLogging) {
          log.cache('delete', key, 'CacheManager');
        }
      }
    }

    if (cleaned > 0 && this.options.enableLogging) {
      log.info(`Cache cleanup: removed ${cleaned} expired items`, { cleaned }, 'CacheManager');
    }

    return cleaned;
  }
}



// Create cache instances
export const memoryCache = new CacheManager();

// Cache decorator for functions
export function cacheable<T extends (...args: any[]) => any>(
  fn: T,
  options: { 
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
    enableLogging?: boolean;
  } = {}
): T {
  const cache = memoryCache; // Only memory cache is available
  const ttl = options.ttl;
  const enableLogging = options.enableLogging ?? true;
  const keyGenerator = options.keyGenerator || ((...args: Parameters<T>) => 
    `${fn.name}_${JSON.stringify(args)}`
  );

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);
    const cached = cache.get(key);
    
    if (cached !== null) {
      if (enableLogging) {
        log.debug(`Cache hit for function ${fn.name}`, { key, function: fn.name }, 'CacheDecorator');
      }
      return cached as ReturnType<T>;
    }

    if (enableLogging) {
      log.debug(`Cache miss for function ${fn.name}`, { key, function: fn.name }, 'CacheDecorator');
    }

    const result = fn(...args);
    
    // Handle promises
    if (result instanceof Promise) {
      return result.then(resolvedResult => {
        cache.set(key, resolvedResult, ttl);
        if (enableLogging) {
          log.debug(`Cached result for function ${fn.name}`, { key, function: fn.name }, 'CacheDecorator');
        }
        return resolvedResult;
      }) as ReturnType<T>;
    }

    cache.set(key, result, ttl);
    if (enableLogging) {
      log.debug(`Cached result for function ${fn.name}`, { key, function: fn.name }, 'CacheDecorator');
    }
    return result;
  }) as T;
}

// Auto cleanup expired items every 5 minutes
setInterval(() => {
  const cleaned = memoryCache.cleanup();
  if (cleaned > 0) {
    log.info(`Automatic cache cleanup completed`, { cleaned }, 'CacheManager');
  }
}, 5 * 60 * 1000);

export default CacheManager;
