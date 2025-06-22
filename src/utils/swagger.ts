import { config } from '../config/env'

export const swaggerOptions = {
  swagger: {
    info: {
      title: 'SampleFastify API',
      description: 'REST API with PostgreSQL, JWT Authentication, and Environment Variables',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    host: `localhost:${config.port}`,
    schemes: config.nodeEnv === 'production' ? ['https', 'http'] : ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Authentication', description: 'User registration and login endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Products', description: 'Product management endpoints' },
      { name: 'Environment', description: 'Environment and health check endpoints' },
      { name: 'Test', description: 'Test and utility endpoints' }
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT token with Bearer prefix (e.g., Bearer eyJhbGciOiJIUzI1NiIs...)'
      }
    },
    // กำหนด security global สำหรับทุก endpoint (จะ override ใน route ที่ไม่ต้องการ)
    security: [
      { bearerAuth: [] }
    ]
  }
}

export const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
  uiConfig: {
    docExpansion: 'list', // 'list', 'full', 'none'
    deepLinking: true,
    displayOperationId: false,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    defaultModelRendering: 'example',
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
}