import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { config } from '../config/env'
import { monitoringOptions } from '../config/security'

/**
 * Monitoring Service
 * ระบบ monitoring และ logging สำหรับ application
 */

export class MonitoringService {
  private fastify: FastifyInstance
  private requestCounter: Map<string, number> = new Map()
  private slowRequests: Array<{ path: string; duration: number; timestamp: Date }> = []
  private errorCount: Map<string, number> = new Map()

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  /**
   * ติดตั้ง monitoring hooks
   */
  setupMonitoring() {
    // Request logging hook
    this.fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
      const startTime = Date.now()
      request.requestId = this.generateRequestId()
      
      // Set request start time
      ;(request as any).startTime = startTime
      
      // Log incoming request
      if (monitoringOptions.requestLogging.enabled) {
        this.logRequest(request)
      }
      
      // Count requests per endpoint
      this.incrementRequestCounter(request.routerPath || request.url)
      
      // Set security headers
      this.setSecurityHeaders(reply, request.requestId)
    })

    // Response logging hook
    this.fastify.addHook('onSend', async (request: FastifyRequest, reply: FastifyReply, payload) => {
      const duration = Date.now() - ((request as any).startTime || Date.now())
      
      // Log response
      if (monitoringOptions.requestLogging.enabled) {
        this.logResponse(request, reply, duration)
      }
      
      // Track slow requests
      if (monitoringOptions.performance.enabled && 
          duration > monitoringOptions.performance.slowRequestThreshold) {
        this.trackSlowRequest(request, duration)
      }
      
      // Add response time header
      reply.header('X-Response-Time', `${duration}ms`)
      
      return payload
    })

    // Error logging hook
    this.fastify.addHook('onError', async (request: FastifyRequest, reply: FastifyReply, error: Error) => {
      if (monitoringOptions.errorTracking.enabled) {
        this.logError(request, error)
        this.incrementErrorCounter(error.name || 'UnknownError')
      }
    })

    // Setup periodic cleanup
    this.setupPeriodicCleanup()
  }

  /**
   * สร้าง unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * ตั้งค่า security headers
   */
  private setSecurityHeaders(reply: FastifyReply, requestId: string) {
    reply.header('X-Request-ID', requestId)
    reply.header('X-API-Version', '1.0.0')
    reply.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    reply.header('Pragma', 'no-cache')
    reply.header('Expires', '0')
  }

  /**
   * Log incoming request
   */
  private logRequest(request: FastifyRequest) {
    const shouldIgnore = monitoringOptions.requestLogging.ignorePaths.some(
      path => request.url.startsWith(path)
    )
    
    if (shouldIgnore) return

    const logData: any = {
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      timestamp: new Date().toISOString()
    }

    if (monitoringOptions.requestLogging.includeHeaders) {
      logData.headers = this.sanitizeHeaders(request.headers)
    }

    if (monitoringOptions.requestLogging.includeBody && request.body) {
      logData.body = this.sanitizeBody(request.body)
    }

    this.fastify.log.info(logData, `📥 ${request.method} ${request.url}`)
  }

  /**
   * Log outgoing response
   */
  private logResponse(request: FastifyRequest, reply: FastifyReply, duration: number) {
    const shouldIgnore = monitoringOptions.requestLogging.ignorePaths.some(
      path => request.url.startsWith(path)
    )
    
    if (shouldIgnore) return

    const logData = {
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    }

    const emoji = reply.statusCode >= 500 ? '❌' : 
                  reply.statusCode >= 400 ? '⚠️' : 
                  reply.statusCode >= 300 ? '🔄' : '✅'

    this.fastify.log.info(logData, `📤 ${emoji} ${request.method} ${request.url} - ${reply.statusCode} (${duration}ms)`)
  }

  /**
   * Log errors
   */
  private logError(request: FastifyRequest, error: Error) {
    const logData = {
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      error: {
        name: error.name,
        message: error.message,
        stack: monitoringOptions.errorTracking.includeStack ? error.stack : undefined
      },
      timestamp: new Date().toISOString()
    }

    this.fastify.log.error(logData, `💥 Error in ${request.method} ${request.url}: ${error.message}`)
  }

  /**
   * Track slow requests
   */
  private trackSlowRequest(request: FastifyRequest, duration: number) {
    this.slowRequests.push({
      path: `${request.method} ${request.url}`,
      duration,
      timestamp: new Date()
    })

    // Keep only last 100 slow requests
    if (this.slowRequests.length > 100) {
      this.slowRequests = this.slowRequests.slice(-100)
    }

    if (monitoringOptions.performance.logSlowRequests) {
      this.fastify.log.warn({
        requestId: request.requestId,
        method: request.method,
        url: request.url,
        duration: `${duration}ms`,
        threshold: `${monitoringOptions.performance.slowRequestThreshold}ms`
      }, `🐌 Slow request detected: ${request.method} ${request.url} (${duration}ms)`)
    }
  }

  /**
   * นับจำนวน requests ต่อ endpoint
   */
  private incrementRequestCounter(path: string) {
    const current = this.requestCounter.get(path) || 0
    this.requestCounter.set(path, current + 1)
  }

  /**
   * นับจำนวน errors ต่อประเภท
   */
  private incrementErrorCounter(errorType: string) {
    const current = this.errorCount.get(errorType) || 0
    this.errorCount.set(errorType, current + 1)
  }

  /**
   * ทำความสะอาดข้อมูล headers
   */
  private sanitizeHeaders(headers: any) {
    const sanitized = { ...headers }
    // ซ่อน sensitive headers
    delete sanitized.authorization
    delete sanitized.cookie
    delete sanitized['x-api-key']
    return sanitized
  }

  /**
   * ทำความสะอาดข้อมูล request body
   */
  private sanitizeBody(body: any) {
    if (typeof body === 'string') {
      return body.length > monitoringOptions.requestLogging.maxBodyLength
        ? body.substring(0, monitoringOptions.requestLogging.maxBodyLength) + '...'
        : body
    }
    
    if (typeof body === 'object') {
      const sanitized = { ...body }
      // ซ่อน sensitive fields
      if (sanitized.password) sanitized.password = '[REDACTED]'
      if (sanitized.token) sanitized.token = '[REDACTED]'
      if (sanitized.secret) sanitized.secret = '[REDACTED]'
      return sanitized
    }
    
    return body
  }

  /**
   * ตั้งค่าการทำความสะอาดข้อมูลเป็นระยะ
   */
  private setupPeriodicCleanup() {
    // ทำความสะอาดทุก 1 ชั่วโมง
    setInterval(() => {
      this.cleanupOldData()
    }, 60 * 60 * 1000) // 1 hour
  }

  /**
   * ทำความสะอาดข้อมูลเก่า
   */
  private cleanupOldData() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    // ทำความสะอาด slow requests ที่เก่ากว่า 1 ชั่วโมง
    this.slowRequests = this.slowRequests.filter(req => req.timestamp > oneHourAgo)
    
    this.fastify.log.info({
      remainingSlowRequests: this.slowRequests.length,
      totalEndpoints: this.requestCounter.size,
      totalErrors: Array.from(this.errorCount.values()).reduce((a, b) => a + b, 0)
    }, '🧹 Periodic cleanup completed')
  }

  /**
   * ดึงข้อมูล metrics ปัจจุบัน
   */
  getMetrics() {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    
    const recentSlowRequests = this.slowRequests.filter(req => req.timestamp > oneHourAgo)
    
    return {
      requests: {
        total: Array.from(this.requestCounter.values()).reduce((a, b) => a + b, 0),
        byEndpoint: Object.fromEntries(this.requestCounter),
        slowRequestsLastHour: recentSlowRequests.length
      },
      errors: {
        total: Array.from(this.errorCount.values()).reduce((a, b) => a + b, 0),
        byType: Object.fromEntries(this.errorCount)
      },
      performance: {
        slowestRequests: recentSlowRequests
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 10)
          .map(req => ({
            path: req.path,
            duration: `${req.duration}ms`,
            timestamp: req.timestamp.toISOString()
          }))
      },
      system: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        environment: config.nodeEnv
      },
      timestamp: now.toISOString()
    }
  }

  /**
   * รีเซ็ต metrics
   */
  resetMetrics() {
    this.requestCounter.clear()
    this.errorCount.clear()
    this.slowRequests = []
    
    this.fastify.log.info('📊 Metrics reset completed')
  }
}
