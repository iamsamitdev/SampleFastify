/// <reference path="./types/fastify.d.ts" />
// fastify-app.ts
import Fastify from 'fastify'
import { connectDatabase } from './utils/db'
import { swaggerOptions, swaggerUiOptions } from './utils/swagger'
import { userRoutes } from './routes/userRoutes'
import { productRoutes } from './routes/productRoutes'
import { testRoutes } from './routes/testRoutes'

const app = Fastify({
  logger: true
})

const port = parseInt(process.env.PORT || '3000')

async function startServer() {
  try {
    // Register plugins
    await app.register(require('@fastify/swagger'), swaggerOptions)
    await app.register(require('@fastify/swagger-ui'), swaggerUiOptions)
    
    // Connect to database
    await connectDatabase(app)
    
    // Register routes
    await app.register(testRoutes)
    await app.register(userRoutes)
    await app.register(productRoutes)

    // Start server
    await app.listen({ port, host: '0.0.0.0' })
    
    app.log.info(`🚀 Server is running on http://localhost:${port}`)
    app.log.info(`📚 API Documentation available at http://localhost:${port}/docs`)
    
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    app.log.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  app.log.info('Received SIGINT, shutting down gracefully...')
  await app.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  app.log.info('Received SIGTERM, shutting down gracefully...')
  await app.close()
  process.exit(0)
})

startServer()
