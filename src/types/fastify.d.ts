import { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    pg: {
      query: (text: string, params?: any[]) => Promise<{ rows: any[] }>
      connect: () => Promise<void>
      end: () => Promise<void>
    }
  }
    interface FastifyRequest {
    requestId?: string
    startTime?: number
    routerPath?: string
    user?: {
      userId: number
      username: string
      email: string
    }
  }
}

declare module '@fastify/postgres' {
  export interface PostgreSQLDb {
    query: (text: string, params?: any[]) => Promise<{ rows: any[] }>
    connect: () => Promise<void>
    end: () => Promise<void>
  }
} 