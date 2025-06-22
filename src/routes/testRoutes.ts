import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { successResponse } from '../utils/apiResponse'

export async function testRoutes(fastify: FastifyInstance) {
  // Health check endpoint
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send(
      successResponse('API is healthy', {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    )
  })

  // Test database connection
  fastify.get('/test/db', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await fastify.pg.query('SELECT NOW() as current_time')
      return reply.status(200).send(
        successResponse('Database connection successful', {
          current_time: result.rows[0].current_time
        })
      )
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Database connection failed',
        error: error.message
      })
    }
  })
} 