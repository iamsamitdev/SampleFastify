import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { CreateUserInput, UserResponse, userQueries } from '../models/userModel'
import { generateToken } from '../utils/jwtUtils'

export class UserService {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async createUser(userData: CreateUserInput): Promise<UserResponse> {
    const { username, password, fullname, email, tel } = userData

    // ตรวจสอบว่า username หรือ email มีอยู่แล้วหรือไม่
    const existingUser = await this.fastify.pg.query(
      userQueries.findByUsername,
      [username]
    )
    
    if (existingUser.rows.length > 0) {
      throw new Error('Username already exists')
    }

    const existingEmail = await this.fastify.pg.query(
      userQueries.findByEmail,
      [email]
    )
    
    if (existingEmail.rows.length > 0) {
      throw new Error('Email already exists')
    }

    // เข้ารหัสรหัสผ่าน
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // สร้างผู้ใช้ใหม่
    const result = await this.fastify.pg.query(
      userQueries.createUser,
      [username, hashedPassword, fullname, email, tel]
    )

    return result.rows[0]
  }

  async loginUser(username: string, password: string): Promise<{ user: UserResponse, token: string }> {
    // ค้นหาผู้ใช้
    const result = await this.fastify.pg.query(
      userQueries.findByUsername,
      [username]
    )

    if (result.rows.length === 0) {
      throw new Error('Invalid username or password')
    }

    const user = result.rows[0]

    // ตรวจสอบรหัสผ่าน
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      throw new Error('Invalid username or password')
    }

    // สร้าง JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email
    })

    // ลบรหัสผ่านออกจาก response
    const { password: _, ...userResponse } = user

    return {
      user: userResponse,
      token
    }
  }

  async getUserById(userId: number): Promise<UserResponse | null> {
    const result = await this.fastify.pg.query(
      userQueries.findById,
      [userId]
    )

    return result.rows.length > 0 ? result.rows[0] : null
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const result = await this.fastify.pg.query(userQueries.getAllUsers)
    return result.rows
  }
} 