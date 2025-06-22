import * as dotenv from 'dotenv'
import path from 'path'

// โหลด environment variables จากไฟล์ .env
const envPath = path.resolve(process.cwd(), '.env')
dotenv.config({ path: envPath })

// Log เพื่อดูว่าโหลดไฟล์ .env สำเร็จหรือไม่
console.log(`Loading environment variables from: ${envPath}`)

// Export การตั้งค่าสำหรับใช้งานในส่วนอื่นๆ
export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'fastify_app',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    
    // สร้าง connection string
    get connectionString() {
      return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`
    }
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
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
