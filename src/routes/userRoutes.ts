import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/userController'
import { UserService } from '../services/userService'
import { authMiddleware } from '../middlewares/authMiddleware'

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify)
  const userController = new UserController(userService)
  // Public routes
  fastify.post('/auth/register', {
    schema: {
      description: 'Register a new user account',
      tags: ['Authentication'],
      summary: 'User Registration',
      body: {
        type: 'object',
        required: ['username', 'password', 'fullname', 'email', 'tel'],
        properties: {
          username: { 
            type: 'string', 
            minLength: 3,
            description: 'Unique username (minimum 3 characters)'
          },
          password: { 
            type: 'string', 
            minLength: 6,
            description: 'Password (minimum 6 characters)'
          },
          fullname: { 
            type: 'string', 
            minLength: 2,
            description: 'Full name (minimum 2 characters)'
          },
          email: { 
            type: 'string', 
            format: 'email',
            description: 'Valid email address'
          },
          tel: { 
            type: 'string', 
            minLength: 10,
            description: 'Phone number (minimum 10 digits)'
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                fullname: { type: 'string' },
                email: { type: 'string' }
              }
            }
          }
        },
        400: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      },
      security: [] // Override global security สำหรับ public route
    }
  }, userController.register.bind(userController))
  fastify.post('/auth/login', {
    schema: {
      description: 'Login with username and password',
      tags: ['Authentication'],
      summary: 'User Login',
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { 
            type: 'string',
            description: 'Username'
          },
          password: { 
            type: 'string',
            description: 'Password'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    fullname: { type: 'string' },
                    email: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      },
      security: [] // Override global security สำหรับ public route
    }
  }, userController.login.bind(userController))

  // Protected routes
  fastify.get('/auth/profile', {
    schema: {
      description: 'Get current user profile',
      tags: ['Users'],
      summary: 'Get User Profile',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                fullname: { type: 'string' },
                email: { type: 'string' },
                tel: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    preHandler: authMiddleware
  }, userController.getProfile.bind(userController))

  fastify.get('/users', {
    schema: {
      description: 'Get all users (admin only)',
      tags: ['Users'],
      summary: 'Get All Users',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  username: { type: 'string' },
                  fullname: { type: 'string' },
                  email: { type: 'string' },
                  created_at: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    },
    preHandler: authMiddleware
  }, userController.getAllUsers.bind(userController))
}