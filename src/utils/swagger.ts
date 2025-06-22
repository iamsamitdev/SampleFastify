export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'REST API with PostgreSQL and JWT Authentication',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT token with Bearer prefix'
      }
    }
  }
}

export const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true
} 