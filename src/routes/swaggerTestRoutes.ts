import { FastifyInstance } from 'fastify'
import { commonSchemas, commonResponses } from '../utils/swaggerSchemas'

export async function swaggerTestRoutes(fastify: FastifyInstance) {
  
  // Endpoint สำหรับทดสอบ Swagger Schema
  fastify.get('/api/swagger/test', {
    schema: {
      description: 'Test endpoint for Swagger documentation',
      tags: ['Test'],
      summary: 'Swagger Test Endpoint',
      querystring: {
        type: 'object',
        properties: {
          message: { 
            type: 'string', 
            default: 'Hello Swagger!',
            description: 'Test message to echo back' 
          },
          count: { 
            type: 'integer', 
            minimum: 1, 
            maximum: 10,
            default: 1,
            description: 'Number of times to repeat the message' 
          }
        }
      },      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', default: true },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                originalMessage: { type: 'string' },
                count: { type: 'integer' },
                repeated: { 
                  type: 'array',
                  items: { type: 'string' }
                },
                timestamp: { type: 'string', format: 'date-time' },
                serverInfo: {
                  type: 'object',
                  properties: {
                    version: { type: 'string' },
                    environment: { type: 'string' },
                    uptime: { type: 'number' }
                  }
                }
              }
            }
          }
        },
        400: commonResponses[400]
      },
      security: [] // Public endpoint
    }
  }, async (request, reply) => {
    const { message = 'Hello Swagger!', count = 1 } = request.query as any
    
    const repeated = Array(count).fill(message)
    
    return {
      success: true,
      message: "Swagger test completed successfully",
      data: {
        originalMessage: message,
        count: count,
        repeated: repeated,
        timestamp: new Date().toISOString(),
        serverInfo: {
          version: "1.0.0",
          environment: process.env.NODE_ENV || 'development',
          uptime: process.uptime()
        }
      }
    }
  })

  // Endpoint แสดงตัวอย่าง User Schema
  fastify.get('/api/swagger/user-example', {
    schema: {
      description: 'Example endpoint showing User schema',
      tags: ['Test'],
      summary: 'User Schema Example',
      response: {        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', default: true },
            message: { type: 'string' },
            data: commonSchemas.User,
            schema_info: {
              type: 'object',
              properties: {
                schema_name: { type: 'string' },
                description: { type: 'string' }
              }
            }
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    return {
      success: true,
      message: "User schema example",
      data: {
        id: 1,
        username: "johndoe",
        fullname: "John Doe",
        email: "john@example.com",
        tel: "1234567890",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      schema_info: {
        schema_name: "User",
        description: "Standard user object schema"
      }
    }
  })

  // Endpoint แสดงตัวอย่าง Product Schema
  fastify.get('/api/swagger/product-example', {
    schema: {
      description: 'Example endpoint showing Product schema',
      tags: ['Test'],
      summary: 'Product Schema Example',
      response: {        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean', default: true },
            message: { type: 'string' },
            data: commonSchemas.Product
          }
        }
      },
      security: []
    }
  }, async (request, reply) => {
    return {
      success: true,
      message: "Product schema example",
      data: {
        id: 1,
        name: "iPhone 15 Pro",
        description: "Latest iPhone with advanced features",
        price: 999.99,
        category: "Electronics",
        stock: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  })

  // Endpoint แสดงตัวอย่าง Error Responses
  fastify.get('/api/swagger/error-examples', {
    schema: {
      description: 'Example endpoint showing different error responses',
      tags: ['Test'],
      summary: 'Error Response Examples',
      querystring: {
        type: 'object',
        properties: {
          error_type: { 
            type: 'string', 
            enum: ['400', '401', '404', '500'],
            default: '400',
            description: 'Type of error to simulate' 
          }
        }
      },
      response: {
        400: commonResponses[400],
        401: commonResponses[401],
        404: commonResponses[404],
        500: commonResponses[500]
      },
      security: []
    }
  }, async (request, reply) => {
    const { error_type = '400' } = request.query as any
    
    switch (error_type) {
      case '400':
        reply.code(400)
        return {
          success: false,
          message: "Bad Request Example",
          errors: ["Invalid parameter", "Missing required field"]
        }
      case '401':
        reply.code(401)
        return {
          success: false,
          message: "Unauthorized Example - Authentication required"
        }
      case '404':
        reply.code(404)
        return {
          success: false,
          message: "Not Found Example - Resource does not exist"
        }
      case '500':
        reply.code(500)
        return {
          success: false,
          message: "Internal Server Error Example"
        }
      default:
        reply.code(400)
        return {
          success: false,
          message: "Invalid error_type parameter",
          errors: ["error_type must be one of: 400, 401, 404, 500"]
        }
    }
  })
}
