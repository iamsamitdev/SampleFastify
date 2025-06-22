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
      body: {
        type: 'object',
        required: ['username', 'password', 'fullname', 'email', 'tel'],
        properties: {
          username: { type: 'string', minLength: 3 },
          password: { type: 'string', minLength: 6 },
          fullname: { type: 'string', minLength: 2 },
          email: { type: 'string', format: 'email' },
          tel: { type: 'string', minLength: 10 }
        }
      }
    }
  }, userController.register.bind(userController))

  fastify.post('/auth/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      }
    }
  }, userController.login.bind(userController))

  // Protected routes
  fastify.get('/auth/profile', {
    preHandler: authMiddleware
  }, userController.getProfile.bind(userController))

  fastify.get('/users', {
    preHandler: authMiddleware
  }, userController.getAllUsers.bind(userController))
} 