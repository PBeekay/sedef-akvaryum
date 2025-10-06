// Enhanced terminal logging utility
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  component?: string;
  userId?: string;
  sessionId?: string;
}

export interface LoggerConfig {
  enableConsole: boolean;
  enableLocalStorage: boolean;
  maxLogEntries: number;
  logLevel: LogLevel;
  enablePerformance: boolean;
  enableErrors: boolean;
  enableUserActions: boolean;
}

const defaultConfig: LoggerConfig = {
  enableConsole: true,
  enableLocalStorage: true,
  maxLogEntries: 1000,
  logLevel: 'info',
  enablePerformance: true,
  enableErrors: true,
  enableUserActions: true
};

class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private logQueue: LogEntry[] = [];
  private isProcessing = false;

  private constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.setupGlobalErrorHandling();
  }

  public static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  private setupGlobalErrorHandling(): void {
    if (!this.config.enableErrors) return;

    // Global error handler
    window.addEventListener('error', (event) => {
      this.error('Global error caught', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
      });
    });
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.config.logLevel);
  }

  private formatMessage(level: LogLevel, message: string, component?: string): string {
    const timestamp = new Date().toISOString();
    const levelEmoji = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    };
    
    const componentStr = component ? ` [${component}]` : '';
    return `[${timestamp}] ${levelEmoji[level]} [${level.toUpperCase()}]${componentStr} ${message}`;
  }

  private createLogEntry(level: LogLevel, message: string, data?: any, component?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      component,
      userId: this.getUserId(),
      sessionId: this.getSessionId()
    };
  }

  private getUserId(): string | undefined {
    return localStorage.getItem('userId') || undefined;
  }

  private getSessionId(): string | undefined {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private async processLogQueue(): Promise<void> {
    if (this.isProcessing || this.logQueue.length === 0) return;

    this.isProcessing = true;

    try {
      // Process logs in batches
      const batchSize = 10;
      const batch = this.logQueue.splice(0, batchSize);

      for (const entry of batch) {
        await this.writeLog(entry);
      }

      // Clean up old logs if needed
      if (this.config.enableLocalStorage) {
        this.cleanupOldLogs();
      }
    } catch (error) {
      console.error('Error processing log queue:', error);
    } finally {
      this.isProcessing = false;
      
      // Process remaining logs if any
      if (this.logQueue.length > 0) {
        setTimeout(() => this.processLogQueue(), 100);
      }
    }
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    // Console logging
    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(entry.level, entry.message, entry.component);
      
      switch (entry.level) {
        case 'debug':
          console.debug(formattedMessage, entry.data || '');
          break;
        case 'info':
          console.info(formattedMessage, entry.data || '');
          break;
        case 'warn':
          console.warn(formattedMessage, entry.data || '');
          break;
        case 'error':
          console.error(formattedMessage, entry.data || '');
          break;
      }
    }

    // Local storage logging
    if (this.config.enableLocalStorage) {
      try {
        const existingLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        existingLogs.push(entry);
        
        // Keep only the most recent logs
        if (existingLogs.length > this.config.maxLogEntries) {
          existingLogs.splice(0, existingLogs.length - this.config.maxLogEntries);
        }
        
        localStorage.setItem('app_logs', JSON.stringify(existingLogs));
      } catch (error) {
        console.error('Failed to save log to localStorage:', error);
      }
    }
  }

  private cleanupOldLogs(): void {
    try {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      if (logs.length > this.config.maxLogEntries) {
        const recentLogs = logs.slice(-this.config.maxLogEntries);
        localStorage.setItem('app_logs', JSON.stringify(recentLogs));
      }
    } catch (error) {
      console.error('Failed to cleanup old logs:', error);
    }
  }

  private log(level: LogLevel, message: string, data?: any, component?: string): void {
    if (!this.shouldLog(level)) return;

    const entry = this.createLogEntry(level, message, data, component);
    this.logQueue.push(entry);
    
    // Process queue asynchronously
    setTimeout(() => this.processLogQueue(), 0);
  }

  // Public logging methods
  public debug(message: string, data?: any, component?: string): void {
    this.log('debug', message, data, component);
  }

  public info(message: string, data?: any, component?: string): void {
    this.log('info', message, data, component);
  }

  public warn(message: string, data?: any, component?: string): void {
    this.log('warn', message, data, component);
  }

  public error(message: string, data?: any, component?: string): void {
    this.log('error', message, data, component);
  }

  // Performance logging
  public logPerformance(metric: string, value: number, unit: string = '', component?: string): void {
    if (!this.config.enablePerformance) return;
    
    this.info(`Performance: ${metric}`, { value, unit }, component);
  }

  // User action logging
  public logUserAction(action: string, data?: any, component?: string): void {
    if (!this.config.enableUserActions) return;
    
    this.info(`User Action: ${action}`, data, component);
  }

  // API logging
  public logAPI(method: string, url: string, status: number, duration: number, component?: string): void {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
    this.log(level, `API ${method} ${url}`, { status, duration }, component);
  }

  // Cache logging
  public logCache(action: 'hit' | 'miss' | 'set' | 'delete', key: string, component?: string): void {
    this.debug(`Cache ${action}`, { key }, component);
  }

  // Navigation logging
  public logNavigation(from: string, to: string, component?: string): void {
    this.info('Navigation', { from, to }, component);
  }

  // Get logs
  public getLogs(level?: LogLevel, limit?: number): LogEntry[] {
    try {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      let filteredLogs = logs;
      
      if (level) {
        filteredLogs = logs.filter((log: LogEntry) => log.level === level);
      }
      
      if (limit) {
        filteredLogs = filteredLogs.slice(-limit);
      }
      
      return filteredLogs;
    } catch (error) {
      console.error('Failed to get logs:', error);
      return [];
    }
  }

  // Clear logs
  public clearLogs(): void {
    localStorage.removeItem('app_logs');
    this.logQueue = [];
  }

  // Export logs
  public exportLogs(format: 'json' | 'csv' = 'json'): string {
    const logs = this.getLogs();
    
    if (format === 'csv') {
      const headers = ['timestamp', 'level', 'message', 'component', 'userId', 'sessionId'];
      const csvContent = [
        headers.join(','),
        ...logs.map(log => [
          log.timestamp,
          log.level,
          `"${log.message.replace(/"/g, '""')}"`,
          log.component || '',
          log.userId || '',
          log.sessionId || ''
        ].join(','))
      ].join('\n');
      
      return csvContent;
    }
    
    return JSON.stringify(logs, null, 2);
  }

  // Get log statistics
  public getLogStats(): { total: number; byLevel: Record<LogLevel, number>; byComponent: Record<string, number> } {
    const logs = this.getLogs();
    const stats = {
      total: logs.length,
      byLevel: { debug: 0, info: 0, warn: 0, error: 0 } as Record<LogLevel, number>,
      byComponent: {} as Record<string, number>
    };

    logs.forEach(log => {
      stats.byLevel[log.level]++;
      if (log.component) {
        stats.byComponent[log.component] = (stats.byComponent[log.component] || 0) + 1;
      }
    });

    return stats;
  }

  // Update configuration
  public updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Create default logger instance
const logger = Logger.getInstance();

// Export convenience functions
export const log = {
  debug: (message: string, data?: any, component?: string) => logger.debug(message, data, component),
  info: (message: string, data?: any, component?: string) => logger.info(message, data, component),
  warn: (message: string, data?: any, component?: string) => logger.warn(message, data, component),
  error: (message: string, data?: any, component?: string) => logger.error(message, data, component),
  performance: (metric: string, value: number, unit?: string, component?: string) => 
    logger.logPerformance(metric, value, unit, component),
  userAction: (action: string, data?: any, component?: string) => 
    logger.logUserAction(action, data, component),
  api: (method: string, url: string, status: number, duration: number, component?: string) => 
    logger.logAPI(method, url, status, duration, component),
  cache: (action: 'hit' | 'miss' | 'set' | 'delete', key: string, component?: string) => 
    logger.logCache(action, key, component),
  navigation: (from: string, to: string, component?: string) => 
    logger.logNavigation(from, to, component)
};

export const getLogger = () => logger;
export default logger;