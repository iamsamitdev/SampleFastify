/// <reference path="./types/fastify.d.ts" />
// โหลด environment variables เป็นสิ่งแรก
import './config/env'

// fastify-app.ts
import Fastify from 'fastify'
import { config } from './config/env'
import { rateLimitOptions, corsOptions, helmetOptions } from './config/security'
import { connectDatabase } from './utils/db'
import { swaggerOptions, swaggerUiOptions } from './utils/swagger'
import { userRoutes } from './routes/userRoutes'
import { productRoutes } from './routes/productRoutes'
import { testRoutes } from './routes/testRoutes'
import { environmentRoutes } from './routes/environmentRoutes'
import { swaggerTestRoutes } from './routes/swaggerTestRoutes'
import { monitoringRoutes } from './routes/monitoringRoutes'
import { MonitoringService } from './services/monitoringService'

const app = Fastify({
  logger: {
    level: config.nodeEnv === 'production' ? 'info' : 'debug'
  }
})

const port = config.port

async function startServer() {
  try {
    // 🛡️ Security plugins (ต้องลงทะเบียนก่อน routes)
    app.log.info('🔒 Setting up security middleware...')
    
    // CORS - Cross-Origin Resource Sharing
    await app.register(require('@fastify/cors'), corsOptions)
    app.log.info('✅ CORS policy configured')
    
    // Helmet - Security headers
    await app.register(require('@fastify/helmet'), helmetOptions)
    app.log.info('✅ Security headers configured')
    
    // Rate Limiting - Global rate limit
    await app.register(require('@fastify/rate-limit'), rateLimitOptions)
    app.log.info('✅ Rate limiting configured')
    
    // Rate Limiting for Authentication endpoints (more restrictive)
    await app.register(async function (fastify) {
      await fastify.register(require('@fastify/rate-limit'), {
        ...rateLimitOptions.authRateLimit,
        keyGenerator: rateLimitOptions.keyGenerator
      })
      
      // Apply to auth routes
      fastify.addHook('onRequest', async (request, reply) => {
        if (request.url.startsWith('/auth/')) {
          // Rate limit will be applied automatically
        }
      })
    }, { prefix: '/auth' })
    app.log.info('✅ Authentication rate limiting configured')

    // 📊 Monitoring setup
    app.log.info('📊 Setting up monitoring...')
    const monitoringService = new MonitoringService(app)
    monitoringService.setupMonitoring()
    app.log.info('✅ Monitoring service initialized')

    // 📚 Documentation plugins
    app.log.info('📚 Setting up API documentation...')
    await app.register(require('@fastify/swagger'), swaggerOptions)
    await app.register(require('@fastify/swagger-ui'), swaggerUiOptions)
    app.log.info('✅ Swagger documentation configured')
    
    // 🗄️ Database connection
    app.log.info('🗄️ Connecting to database...')
    await connectDatabase(app)
    app.log.info('✅ Database connected successfully')
    
    // 🌐 Register routes
    app.log.info('🌐 Registering API routes...')
    await app.register(testRoutes)
    await app.register(userRoutes)
    await app.register(productRoutes)
    await app.register(environmentRoutes)
    await app.register(swaggerTestRoutes)
    await app.register(monitoringRoutes)
    app.log.info('✅ All routes registered successfully')    // Start server
    app.log.info('🚀 Starting server...')
    await app.listen({ port, host: '0.0.0.0' })
    
    // Success messages
    app.log.info(`🎉 Server successfully started!`)
    app.log.info(`🌐 Server URL: http://localhost:${port}`)
    app.log.info(`📚 API Documentation: http://localhost:${port}/docs`)
    app.log.info(`🔍 Health Check: http://localhost:${port}/health`)
    app.log.info(`📊 Monitoring: http://localhost:${port}/api/monitoring/metrics`)
    app.log.info(`🌍 Environment: ${config.nodeEnv}`)
    app.log.info(`🛡️ Security features: CORS, Rate Limiting, Security Headers`)
    
  } catch (error) {
    app.log.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  app.log.info('🛑 Received SIGINT, shutting down gracefully...')
  try {
    await app.close()
    app.log.info('✅ Server closed successfully')
    process.exit(0)
  } catch (error) {
    app.log.error('❌ Error during shutdown:', error)
    process.exit(1)
  }
})

process.on('SIGTERM', async () => {
  app.log.info('🛑 Received SIGTERM, shutting down gracefully...')
  try {
    await app.close()
    app.log.info('✅ Server closed successfully')
    process.exit(0)
  } catch (error) {
    app.log.error('❌ Error during shutdown:', error)
    process.exit(1)
  }
})

if (process.env.NODE_ENV === 'production') {
  // Export สำหรับ Vercel
  module.exports = app;
} else {
  // รันเซิร์ฟเวอร์ปกติ
  startServer();
}
