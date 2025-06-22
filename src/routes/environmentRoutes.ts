import { FastifyInstance } from 'fastify'
import { EnvironmentService } from '../services/environmentService'

const environmentService = new EnvironmentService()

export async function environmentRoutes(fastify: FastifyInstance) {
  
  // GET /api/env/config - แสดงข้อมูล configuration
  fastify.get('/api/env/config', {
    schema: {
      description: 'Get application configuration',
      tags: ['Environment'],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const config = environmentService.getAllConfig()
    
    return {
      success: true,
      data: config
    }
  })

  // GET /api/env/health - ตรวจสอบสถานะแอปพลิเคชัน
  fastify.get('/api/env/health', {
    schema: {
      description: 'Check application health and readiness',
      tags: ['Environment'],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            ready: { type: 'boolean' },
            errors: { 
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const readiness = environmentService.isAppReady()
    
    return {
      success: true,
      ready: readiness.ready,
      errors: readiness.errors
    }
  })

  // GET /api/env/server - ข้อมูล server
  fastify.get('/api/env/server', {
    schema: {
      description: 'Get server configuration',
      tags: ['Environment'],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: { type: 'object' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const serverConfig = environmentService.getServerConfig()
    
    return {
      success: true,
      data: serverConfig
    }
  })
}
