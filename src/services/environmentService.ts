import { config } from '../config/env'

/**
 * ตัวอย่างการใช้งาน Environment Variables
 * สร้างขึ้นเพื่อแสดงวิธีการเข้าถึง config ในส่วนต่างๆ ของแอปพลิเคชัน
 */

export class EnvironmentService {
  
  /**
   * ดึงข้อมูล server configuration
   */
  getServerConfig() {
    return {
      port: config.port,
      environment: config.nodeEnv,
      isProduction: config.nodeEnv === 'production',
      isDevelopment: config.nodeEnv === 'development'
    }
  }

  /**
   * ดึงข้อมูล database configuration (ซ่อนข้อมูลที่sensitive)
   */
  getDatabaseConfig() {
    return {
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      // ไม่แสดง password ด้วยเหตุผลด้านความปลอดภัย
      hasPassword: !!config.database.password
    }
  }

  /**
   * ดึงข้อมูล JWT configuration
   */
  getJWTConfig() {
    return {
      expiresIn: config.jwt.expiresIn,
      hasSecret: !!config.jwt.secret
    }
  }

  /**
   * ตรวจสอบว่าแอปพลิเคชันพร้อมทำงานหรือไม่
   */
  isAppReady(): { ready: boolean; errors: string[] } {
    const errors: string[] = []

    // ตรวจสอบ database configuration
    if (!config.database.host) errors.push('Database host not configured')
    if (!config.database.password) errors.push('Database password not configured')
    
    // ตรวจสอบ JWT secret
    if (!config.jwt.secret || config.jwt.secret === 'default-secret-change-in-production') {
      errors.push('JWT secret not properly configured')
    }

    // ตรวจสอบ production settings
    if (config.nodeEnv === 'production') {
      if (config.jwt.secret.includes('default') || config.jwt.secret.length < 32) {
        errors.push('JWT secret is not secure enough for production')
      }
    }

    return {
      ready: errors.length === 0,
      errors
    }
  }

  /**
   * แสดงข้อมูล configuration ทั้งหมด (สำหรับ debugging)
   */
  getAllConfig() {
    return {
      server: this.getServerConfig(),
      database: this.getDatabaseConfig(),
      jwt: this.getJWTConfig(),
      readiness: this.isAppReady()
    }
  }
}
