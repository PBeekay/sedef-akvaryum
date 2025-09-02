// Cache utility for better performance
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface CacheOptions {
  ttl?: number; // Default TTL: 5 minutes
  maxSize?: number; // Maximum cache size
}

class CacheManager {
  private memoryCache = new Map<string, CacheItem<any>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly maxSize = 100;

  constructor(private options: CacheOptions = {}) {
    this.options.ttl = this.options.ttl || this.defaultTTL;
    this.options.maxSize = this.options.maxSize || this.maxSize;
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
      }
    }

    this.memoryCache.set(key, item);
  }

  // Get item from cache
  get<T>(key: string): T | null {
    const item = this.memoryCache.get(key);
    
    if (!item) return null;

    // Check if item is expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.memoryCache.delete(key);
      return null;
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

  // Get cache statistics
  getStats() {
    return {
      size: this.memoryCache.size,
      maxSize: this.options.maxSize,
      keys: Array.from(this.memoryCache.keys())
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
      }
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
  } = {}
): T {
  const cache = memoryCache; // Only memory cache is available
  const ttl = options.ttl;
  const keyGenerator = options.keyGenerator || ((...args: Parameters<T>) => 
    `${fn.name}_${JSON.stringify(args)}`
  );

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);
    const cached = cache.get(key);
    
    if (cached !== null) {
      return cached as ReturnType<T>;
    }

    const result = fn(...args);
    
    // Handle promises
    if (result instanceof Promise) {
      return result.then(resolvedResult => {
        cache.set(key, resolvedResult, ttl);
        return resolvedResult;
      }) as ReturnType<T>;
    }

    cache.set(key, result, ttl);
    return result;
  }) as T;
}

// Auto cleanup expired items every 5 minutes
setInterval(() => {
  memoryCache.cleanup();
}, 5 * 60 * 1000);

export default CacheManager;
