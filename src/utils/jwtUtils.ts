import jwt from 'jsonwebtoken'

export interface JwtPayload {
  userId: number
  username: string
  email: string
}

export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
} 