import { config } from './env'

/**
 * Security Configuration
 * การตั้งค่าความปลอดภัยสำหรับ Fastify application
 */

// Rate Limiting Configuration
export const rateLimitOptions = {
  max: config.nodeEnv === 'production' ? 100 : 1000, // requests per timeWindow
  timeWindow: '15 minutes', // 15 นาที
  cache: 10000, // จำนวน users ที่จะเก็บใน memory
  allowList: ['127.0.0.1', '::1'], // IP addresses ที่ไม่ถูก rate limit
  continueExceeding: true, // ให้ส่ง response แม้จะเกิน limit
  message: {
    success: false,
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: '15 minutes'
  },
  // Custom key generator สำหรับ rate limiting
  keyGenerator: (request: any) => {
    // ใช้ IP address เป็น key
    return request.raw.ip || request.ip || 'unknown'
  },
  // Rate limit สำหรับ authentication endpoints (เข้มงวดกว่า)
  authRateLimit: {
    max: config.nodeEnv === 'production' ? 5 : 50, // 5 attempts per 15 minutes
    timeWindow: '15 minutes',
    message: {
      success: false,
      message: 'Too many authentication attempts. Please try again later.',
      retryAfter: '15 minutes'
    }
  }
}

// CORS Configuration
export const corsOptions = {
  // กำหนด origins ที่อนุญาต
  origin: config.nodeEnv === 'production' 
    ? [
        'https://yourdomain.com',
        'https://www.yourdomain.com',
        'https://api.yourdomain.com'
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173', // Vite default port
        'http://localhost:8080', // Vue/Angular default port
        'http://127.0.0.1:3000'
      ],
  
  // HTTP methods ที่อนุญาต
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
  // Headers ที่อนุญาต
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key'
  ],
  
  // Headers ที่จะส่งกลับไปให้ client
  exposedHeaders: [
    'X-Total-Count',
    'X-Page-Count',
    'X-Rate-Limit-Limit',
    'X-Rate-Limit-Remaining',
    'X-Rate-Limit-Reset'
  ],
  
  // อนุญาตให้ส่ง credentials (cookies, authorization headers)
  credentials: true,
  
  // Cache preflight response เป็นเวลา 24 ชั่วโมง
  maxAge: 86400,
  
  // Pre-flight OPTIONS request configuration
  optionsSuccessStatus: 204,
  
  // CORS error handling
  errorHandler: (error: Error, request: any, reply: any) => {
    reply.status(400).send({
      success: false,
      message: 'CORS policy violation',
      error: config.nodeEnv === 'development' ? error.message : 'Access denied'
    })
  }
}

// Helmet Configuration (Security Headers)
export const helmetOptions = {
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  
  // Cross Origin Embedder Policy
  crossOriginEmbedderPolicy: config.nodeEnv === 'production',
  
  // Cross Origin Opener Policy
  crossOriginOpenerPolicy: { policy: "same-origin" },
  
  // Cross Origin Resource Policy
  crossOriginResourcePolicy: { policy: "cross-origin" },
  
  // X-DNS-Prefetch-Control
  dnsPrefetchControl: { allow: false },
  
  // X-Frame-Options
  frameguard: { action: 'deny' },
  
  // Hide X-Powered-By header
  hidePoweredBy: true,
  
  // HTTP Strict Transport Security
  hsts: config.nodeEnv === 'production' ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  } : false,
  
  // X-Content-Type-Options
  noSniff: true,
  
  // Origin-Agent-Cluster
  originAgentCluster: true,
  
  // X-Permitted-Cross-Domain-Policies
  permittedCrossDomainPolicies: false,
  
  // Referrer-Policy
  referrerPolicy: { policy: "no-referrer" },
  
  // X-XSS-Protection
  xssFilter: true
}

// Monitoring Configuration
export const monitoringOptions = {
  // Request logging configuration
  requestLogging: {
    enabled: true,
    logLevel: config.nodeEnv === 'production' ? 'info' : 'debug',
    ignorePaths: ['/health', '/docs', '/docs/json', '/docs/yaml'],
    includeHeaders: config.nodeEnv === 'development',
    includeBody: config.nodeEnv === 'development',
    maxBodyLength: 1000 // characters
  },
  
  // Performance monitoring
  performance: {
    enabled: true,
    slowRequestThreshold: 1000, // milliseconds
    logSlowRequests: true
  },
  
  // Error tracking
  errorTracking: {
    enabled: true,
    logErrors: true,
    includeStack: config.nodeEnv === 'development'
  }
}

// Security headers สำหรับ API responses
export const securityHeaders = {
  'X-API-Version': '1.0.0',
  'X-Response-Time': (responseTime: number) => `${responseTime}ms`,
  'X-Request-ID': (requestId: string) => requestId,
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
}
