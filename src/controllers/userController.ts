import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../services/userService'
import { CreateUserInput, LoginInput } from '../models/userModel'
import { successResponse, errorResponse } from '../utils/apiResponse'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userData = request.body as CreateUserInput

      // Validation
      if (!userData.username || !userData.password || !userData.fullname || !userData.email || !userData.tel) {
        return reply.status(400).send(
          errorResponse('All fields are required', 'VALIDATION_ERROR')
        )
      }

      const user = await this.userService.createUser(userData)
      
      return reply.status(201).send(
        successResponse('User registered successfully', user)
      )
    } catch (error: any) {
      return reply.status(400).send(
        errorResponse('Registration failed', error.message)
      )
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { username, password } = request.body as LoginInput

      if (!username || !password) {
        return reply.status(400).send(
          errorResponse('Username and password are required', 'VALIDATION_ERROR')
        )
      }

      const result = await this.userService.loginUser(username, password)
      
      return reply.status(200).send(
        successResponse('Login successful', result)
      )
    } catch (error: any) {
      return reply.status(401).send(
        errorResponse('Login failed', error.message)
      )
    }
  }

  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId
      
      if (!userId) {
        return reply.status(401).send(
          errorResponse('User not authenticated', 'UNAUTHORIZED')
        )
      }

      const user = await this.userService.getUserById(userId)
      
      if (!user) {
        return reply.status(404).send(
          errorResponse('User not found', 'USER_NOT_FOUND')
        )
      }

      return reply.status(200).send(
        successResponse('Profile retrieved successfully', user)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to get profile', error.message)
      )
    }
  }

  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.getAllUsers()
      
      return reply.status(200).send(
        successResponse('Users retrieved successfully', users)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to get users', error.message)
      )
    }
  }
} 