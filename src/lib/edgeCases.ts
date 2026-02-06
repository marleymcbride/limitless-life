/**
 * Edge Case Handling Utilities
 *
 * Utilities for handling edge cases and graceful degradation.
 */

/**
 * Safe JSON parse with fallback
 */
export function safeJSONParse<T = unknown>(
  json: string,
  fallback: T
): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Safe localStorage operations
 */
export const safeStorage = {
  get: <T = unknown>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key: string): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear: (): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Safe sessionStorage operations
 */
export const safeSessionStorage = {
  get: <T = unknown>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;

    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key: string): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Safe fetch with timeout and retry
 */
export async function safeFetch(
  url: string,
  options?: RequestInit & { timeout?: number; retries?: number }
): Promise<Response> {
  const { timeout = 10000, retries = 3, ...fetchOptions } = options || {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }

    throw new Error('Fetch failed');
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Safe URL operations
 */
export const safeURL = {
  /**
   * Get URL parameter with fallback
   */
  getParam: (param: string, fallback: string = ''): string => {
    if (typeof window === 'undefined') return fallback;

    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(param) || fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Get all URL parameters
   */
  getAllParams: (): Record<string, string> => {
    if (typeof window === 'undefined') return {};

    try {
      const params = new URLSearchParams(window.location.search);
      const result: Record<string, string> = {};
      params.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    } catch {
      return {};
    }
  },
};

/**
 * Safe array operations
 */
export const safeArray = {
  /**
   * Get array item with fallback
   */
  get: <T>(array: T[] | null | undefined, index: number, fallback: T): T => {
    if (!array || !Array.isArray(array)) return fallback;
    return array[index] ?? fallback;
  },

  /**
   * Safe array length
   */
  length: (array: unknown[] | null | undefined): number => {
    if (!array || !Array.isArray(array)) return 0;
    return array.length;
  },

  /**
   * Safe array first
   */
  first: <T>(array: T[] | null | undefined, fallback: T): T => {
    return safeArray.get(array, 0, fallback);
  },

  /**
   * Safe array last
   */
  last: <T>(array: T[] | null | undefined, fallback: T): T => {
    if (!array || !Array.isArray(array) || array.length === 0) return fallback;
    return array[array.length - 1];
  },

  /**
   * Safe array isEmpty
   */
  isEmpty: (array: unknown[] | null | undefined): boolean => {
    return safeArray.length(array) === 0;
  },
};

/**
 * Safe object operations
 */
export const safeObject = {
  /**
   * Get object property with fallback
   */
  get: <T extends Record<string, unknown>, K extends keyof T | string>(
    obj: T | null | undefined,
    key: K,
    fallback?: K extends keyof T ? T[K] : unknown
  ): unknown => {
    if (!obj || typeof obj !== 'object') return fallback;
    return obj[key as string] ?? fallback;
  },

  /**
   * Safe object keys
   */
  keys: <T extends Record<string, unknown>>(obj: T | null | undefined): string[] => {
    if (!obj || typeof obj !== 'object') return [];
    return Object.keys(obj);
  },

  /**
   * Safe object values
   */
  values: <T extends Record<string, unknown>>(obj: T | null | undefined): unknown[] => {
    if (!obj || typeof obj !== 'object') return [];
    return Object.values(obj);
  },

  /**
   * Safe object entries
   */
  entries: <T extends Record<string, unknown>>(
    obj: T | null | undefined
  ): Array<[string, unknown]> => {
    if (!obj || typeof obj !== 'object') return [];
    return Object.entries(obj);
  },
};

/**
 * Safe number operations
 */
export const safeNumber = {
  /**
   * Parse number with fallback
   */
  parse: (value: unknown, fallback: number = 0): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = Number(value);
      return isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  },

  /**
   * To fixed with fallback
   */
  toFixed: (value: unknown, decimals: number, fallback: string = '0'): string => {
    const num = safeNumber.parse(value, 0);
    return num.toFixed(decimals);
  },

  /**
   * Clamp number between min and max
   */
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },
};

/**
 * Safe date operations
 */
export const safeDate = {
  /**
   * Create date with fallback
   */
  create: (value: unknown, fallback: Date = new Date()): Date => {
    if (value instanceof Date) return value;
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? fallback : date;
    }
    return fallback;
  },

  /**
   * Format date safely
   */
  format: (value: unknown, format: 'iso' | 'locale' | 'time' = 'iso', fallback: string = ''): string => {
    const date = safeDate.create(value);

    if (isNaN(date.getTime())) return fallback;

    switch (format) {
      case 'iso':
        return date.toISOString();
      case 'locale':
        return date.toLocaleDateString();
      case 'time':
        return date.toLocaleTimeString();
      default:
        return fallback;
    }
  },
};

/**
 * Graceful degradation utilities
 */
export const graceful = {
  /**
   * Execute function with fallback on error
   */
  exec: <T>(fn: () => T, fallback: T): T => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  },

  /**
   * Execute async function with fallback on error
   */
  async execAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try {
      return await fn();
    } catch {
      return fallback;
    }
  },

  /**
   * Get value or fallback
   */
  or: <T>(value: T | null | undefined, fallback: T): T => {
    return value ?? fallback;
  },
};

/**
 * Feature detection
 */
export const features = {
  /**
   * Check if feature is supported
   */
  supports: (feature: string): boolean => {
    if (typeof window === 'undefined') return false;

    switch (feature) {
      case 'intersectionObserver':
        return 'IntersectionObserver' in window;
      case 'localStorage':
        try {
          const test = '__test__';
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
        } catch {
          return false;
        }
      case 'serviceWorker':
        return 'serviceWorker' in navigator;
      case 'webp':
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      default:
        return false;
    }
  },

  /**
   * Check if device is mobile
   */
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },

  /**
   * Check if device is touch-enabled
   */
  isTouch: (): boolean => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
};
