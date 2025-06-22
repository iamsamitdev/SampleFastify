import { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken, JwtPayload } from '../utils/jwtUtils'
import { errorResponse } from '../utils/apiResponse'

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization
    
    if (!authHeader) {
      return reply.status(401).send(
        errorResponse('Access token is required', 'UNAUTHORIZED')
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    if (!token) {
      return reply.status(401).send(
        errorResponse('Invalid token format', 'INVALID_TOKEN')
      )
    }

    const decoded = verifyToken(token)
    request.user = decoded
    
  } catch (error) {
    return reply.status(401).send(
      errorResponse('Invalid or expired token', 'TOKEN_INVALID')
    )
  }
} 