import { FastifyInstance } from 'fastify'
import { config } from '../config/env'

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

// ใช้ config จาก env.ts แทน
export const dbConfig: DatabaseConfig = {
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.user,
  password: config.database.password
}

export async function connectDatabase(fastify: FastifyInstance) {
  try {
    await fastify.register(require('@fastify/postgres'), {
      connectionString: config.database.connectionString
    })
    
    fastify.log.info('Database connected successfully')
  } catch (error) {
    fastify.log.error('Database connection failed:', error)
    throw error
  }
}