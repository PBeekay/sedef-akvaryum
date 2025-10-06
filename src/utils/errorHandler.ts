// Enhanced error handling utilities
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly severity: 'low' | 'medium' | 'high' | 'critical';
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    code: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.severity = severity;
    this.context = context;
  }
}

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low' as const,
  MEDIUM: 'medium' as const,
  HIGH: 'high' as const,
  CRITICAL: 'critical' as const
} as const;

// Error codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RUNTIME_ERROR: 'RUNTIME_ERROR',
  CHUNK_LOAD_ERROR: 'CHUNK_LOAD_ERROR',
  SERVICE_WORKER_ERROR: 'SERVICE_WORKER_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  PERFORMANCE_ERROR: 'PERFORMANCE_ERROR'
} as const;

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: ErrorInfo[] = [];
  private maxQueueSize = 50;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError(new AppError(
        event.message,
        ERROR_CODES.RUNTIME_ERROR,
        ERROR_SEVERITY.MEDIUM,
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      ));
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(new AppError(
        event.reason?.message || 'Unhandled Promise Rejection',
        ERROR_CODES.RUNTIME_ERROR,
        ERROR_SEVERITY.HIGH,
        { reason: event.reason }
      ));
    });
  }

  public handleError(error: Error | AppError, context?: Record<string, any>): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      ...context
    };

    // Add to queue
    this.errorQueue.push(errorInfo);
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log error
    this.logError(errorInfo);

    // Handle based on severity
    if (error instanceof AppError) {
      this.handleSeverity(error.severity, errorInfo);
    }
  }

  private handleSeverity(severity: string, errorInfo: ErrorInfo): void {
    switch (severity) {
      case ERROR_SEVERITY.CRITICAL:
        this.handleCriticalError(errorInfo);
        break;
      case ERROR_SEVERITY.HIGH:
        this.handleHighSeverityError(errorInfo);
        break;
      case ERROR_SEVERITY.MEDIUM:
        this.handleMediumSeverityError(errorInfo);
        break;
      case ERROR_SEVERITY.LOW:
        this.handleLowSeverityError(errorInfo);
        break;
    }
  }

  private handleCriticalError(errorInfo: ErrorInfo): void {
    // Show user notification
    this.showErrorNotification('A critical error occurred. Please refresh the page.', 'error');
    
    // Report to analytics
    this.reportError(errorInfo);
    
    // Try to recover
    this.attemptRecovery();
  }

  private handleHighSeverityError(errorInfo: ErrorInfo): void {
    this.showErrorNotification('An error occurred. Some features may not work properly.', 'warning');
    this.reportError(errorInfo);
  }

  private handleMediumSeverityError(errorInfo: ErrorInfo): void {
    this.reportError(errorInfo);
  }

  private handleLowSeverityError(errorInfo: ErrorInfo): void {
    // Just log, no user notification
    console.warn('Low severity error:', errorInfo);
  }

  private logError(errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', errorInfo);
    }
  }

  private showErrorNotification(message: string, type: 'error' | 'warning' | 'info'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-black' :
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  private reportError(errorInfo: ErrorInfo): void {
    // In a real app, you would send this to your error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: send to error reporting service
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorInfo) });
    }
  }

  private attemptRecovery(): void {
    // Try to reload the page
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  private getUserId(): string | undefined {
    // Get user ID from localStorage or context
    return localStorage.getItem('userId') || undefined;
  }

  private getSessionId(): string | undefined {
    // Get session ID from localStorage or generate one
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  public getErrorQueue(): ErrorInfo[] {
    return [...this.errorQueue];
  }

  public clearErrorQueue(): void {
    this.errorQueue = [];
  }

  public getErrorStats(): { total: number; bySeverity: Record<string, number> } {
    const stats = {
      total: this.errorQueue.length,
      bySeverity: {} as Record<string, number>
    };

    this.errorQueue.forEach(error => {
      // This would need to be enhanced to track severity
      stats.bySeverity['unknown'] = (stats.bySeverity['unknown'] || 0) + 1;
    });

    return stats;
  }
}

// React error boundary hook
export const useErrorHandler = () => {
  const errorHandler = ErrorHandler.getInstance();

  const handleError = (error: Error | AppError, context?: Record<string, any>) => {
    errorHandler.handleError(error, context);
  };

  const createError = (
    message: string,
    code: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    context?: Record<string, any>
  ) => {
    return new AppError(message, code, severity, context);
  };

  return {
    handleError,
    createError,
    getErrorQueue: () => errorHandler.getErrorQueue(),
    getErrorStats: () => errorHandler.getErrorStats()
  };
};

// Utility functions
export const createNetworkError = (message: string = 'Network request failed') => {
  return new AppError(message, ERROR_CODES.NETWORK_ERROR, ERROR_SEVERITY.MEDIUM);
};

export const createValidationError = (message: string = 'Validation failed') => {
  return new AppError(message, ERROR_CODES.VALIDATION_ERROR, ERROR_SEVERITY.LOW);
};

export const createAuthenticationError = (message: string = 'Authentication failed') => {
  return new AppError(message, ERROR_CODES.AUTHENTICATION_ERROR, ERROR_SEVERITY.HIGH);
};

export const createChunkLoadError = (message: string = 'Failed to load application chunk') => {
  return new AppError(message, ERROR_CODES.CHUNK_LOAD_ERROR, ERROR_SEVERITY.HIGH);
};

export default ErrorHandler;


