import { FastifyInstance } from 'fastify'

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

export const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'fastify_app',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
}

export async function connectDatabase(fastify: FastifyInstance) {
  try {
    await fastify.register(require('@fastify/postgres'), {
      connectionString: `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    })
    
    fastify.log.info('Database connected successfully')
  } catch (error) {
    fastify.log.error('Database connection failed:', error)
    throw error
  }
} 