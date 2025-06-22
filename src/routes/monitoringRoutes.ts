import { FastifyInstance } from 'fastify'
import { MonitoringService } from '../services/monitoringService'

let monitoringService: MonitoringService

export async function monitoringRoutes(fastify: FastifyInstance) {
  monitoringService = new MonitoringService(fastify)

  // GET /api/monitoring/metrics - ดูข้อมูล metrics
  fastify.get('/api/monitoring/metrics', {
    schema: {
      description: 'Get application metrics and performance data',
      tags: ['Monitoring'],
      summary: 'Application Metrics',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                requests: { type: 'object' },
                errors: { type: 'object' },
                performance: { type: 'object' },
                system: { type: 'object' },
                timestamp: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    const metrics = monitoringService.getMetrics()
    
    return {
      success: true,
      data: metrics
    }
  })

  // POST /api/monitoring/reset - รีเซ็ต metrics (admin only)
  fastify.post('/api/monitoring/reset', {
    schema: {
      description: 'Reset all metrics data (admin operation)',
      tags: ['Monitoring'],
      summary: 'Reset Metrics',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    monitoringService.resetMetrics()
    
    return {
      success: true,
      message: 'Metrics reset successfully',
      timestamp: new Date().toISOString()
    }
  })

  // GET /api/monitoring/health-detailed - ตรวจสอบสถานะระบบอย่างละเอียด
  fastify.get('/api/monitoring/health-detailed', {
    schema: {
      description: 'Detailed health check including system resources',
      tags: ['Monitoring'],
      summary: 'Detailed Health Check',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            status: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            checks: { type: 'object' },
            system: { type: 'object' }
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    const healthData = await performHealthChecks(fastify)
    
    return {
      success: healthData.status === 'healthy',
      status: healthData.status,
      timestamp: new Date().toISOString(),
      checks: healthData.checks,
      system: healthData.system
    }
  })

  // GET /api/monitoring/rate-limit-status - ดูสถานะ rate limiting
  fastify.get('/api/monitoring/rate-limit-status', {
    schema: {
      description: 'Get current rate limit status for the requesting IP',
      tags: ['Monitoring'],
      summary: 'Rate Limit Status',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                ip: { type: 'string' },
                remaining: { type: 'number' },
                total: { type: 'number' },
                resetTime: { type: 'string' },
                timeWindow: { type: 'string' }
              }
            }
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    // ข้อมูล rate limit จาก headers ที่ @fastify/rate-limit เพิ่มเข้ามา
    const rateLimit = {
      ip: request.ip,
      remaining: parseInt(reply.getHeader('x-ratelimit-remaining') as string) || 0,
      total: parseInt(reply.getHeader('x-ratelimit-limit') as string) || 0,
      resetTime: new Date(parseInt(reply.getHeader('x-ratelimit-reset') as string) * 1000).toISOString(),
      timeWindow: '15 minutes'
    }
    
    return {
      success: true,
      data: rateLimit
    }
  })
}

/**
 * ทำการตรวจสอบสุขภาพของระบบ
 */
async function performHealthChecks(fastify: FastifyInstance) {
  const checks: any = {}
  let overallStatus = 'healthy'

  // ตรวจสอบการเชื่อมต่อฐานข้อมูล
  try {
    await fastify.pg.query('SELECT 1')
    checks.database = {
      status: 'healthy',
      message: 'Database connection successful',
      responseTime: '< 100ms'
    }
  } catch (error) {
    checks.database = {
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
    overallStatus = 'unhealthy'
  }

  // ตรวจสอบ memory usage
  const memUsage = process.memoryUsage()
  const memUsageMB = {
    rss: Math.round(memUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
    external: Math.round(memUsage.external / 1024 / 1024)
  }

  // ถ้า memory usage เกิน 500MB ถือว่า warning
  const memoryStatus = memUsageMB.heapUsed > 500 ? 'warning' : 'healthy'
  if (memoryStatus === 'warning' && overallStatus === 'healthy') {
    overallStatus = 'warning'
  }

  checks.memory = {
    status: memoryStatus,
    usage: memUsageMB,
    message: memoryStatus === 'warning' ? 'High memory usage detected' : 'Memory usage normal'
  }

  // ตรวจสอบ uptime
  const uptimeSeconds = process.uptime()
  const uptimeHours = uptimeSeconds / 3600
  
  checks.uptime = {
    status: 'healthy',
    seconds: Math.round(uptimeSeconds),
    human: formatUptime(uptimeSeconds),
    message: `Server running for ${formatUptime(uptimeSeconds)}`
  }

  // ตรวจสอบ Node.js version
  checks.nodeVersion = {
    status: 'healthy',
    version: process.version,
    message: `Running Node.js ${process.version}`
  }

  return {
    status: overallStatus,
    checks,
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      uptime: formatUptime(uptimeSeconds),
      memory: memUsageMB,
      pid: process.pid
    }
  }
}

/**
 * จัดรูปแบบ uptime ให้อ่านง่าย
 */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}
