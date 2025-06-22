import * as dotenv from 'dotenv'

// โหลด environment variables จากไฟล์ .env
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
dotenv.config({ path: envPath })

// Log เพื่อดูว่าโหลดไฟล์ .env สำเร็จหรือไม่
console.log(`Loading environment variables from: ${process.cwd()}/${envPath}`)

// Export การตั้งค่าสำหรับใช้งานในส่วนอื่นๆ
export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'fastify_app',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    // เพิ่ม SSL configuration สำหรับ production
    connectionString: process.env.DATABASE_URL || 
      `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}${
        process.env.NODE_ENV === 'production' ? '?sslmode=require' : ''
      }`
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  rateLimiting: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    timeWindow: `${process.env.RATE_LIMIT_TIME_WINDOW || '15'} minutes`,
    authMax: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '5', 10)
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  }
}

// ตรวจสอบ required environment variables
const requiredEnvVars = ['DB_PASSWORD', 'JWT_SECRET']
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Warning: Missing environment variables: ${missingEnvVars.join(', ')}`)
  console.warn('   Please check your .env file')
}

// Log current configuration (hide sensitive data)
console.log('📋 Current Configuration:')
console.log(`   Port: ${config.port}`)
console.log(`   Environment: ${config.nodeEnv}`)
console.log(`   Database: ${config.database.host}:${config.database.port}/${config.database.name}`)
console.log(`   Database User: ${config.database.user}`)
console.log(`   JWT Expires In: ${config.jwt.expiresIn}`)
