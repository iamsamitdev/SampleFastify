# คำแนะนำการติดตั้งและใช้งาน

## 📋 ขั้นตอนการติดตั้ง

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ root:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fastify_app
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Environment
NODE_ENV=development
```

### 2. สร้างตารางในฐานข้อมูล

#### วิธีที่ 1: ใช้ Migration Script (แนะนำ)

```bash
npm run migrate
```

#### วิธีที่ 2: รัน SQL โดยตรง

เชื่อมต่อฐานข้อมูล PostgreSQL และรัน SQL นี้:

```sql
-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tel VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
```

#### วิธีที่ 3: ใช้ psql command line

```bash
psql -h localhost -U postgres -d fastify_app -f database/init.sql
```

### 3. รันแอปพลิเคชัน

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 🧪 ทดสอบการทำงาน

### 1. ตรวจสอบสถานะ API

```bash
curl http://localhost:3000/health
```

### 2. ทดสอบการเชื่อมต่อฐานข้อมูล

```bash
curl http://localhost:3000/test/db
```

### 3. ลงทะเบียนผู้ใช้ใหม่

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "fullname": "Test User",
    "email": "test@example.com",
    "tel": "0812345678"
  }'
```

### 4. เข้าสู่ระบบ

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 5. ใช้ JWT Token

```bash
# ใช้ token ที่ได้จากการ login
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 📚 API Documentation

เข้าถึง Swagger UI ได้ที่: `http://localhost:3000/docs`

## 🔧 การแก้ไขปัญหา

### ปัญหา: ไม่สามารถเชื่อมต่อฐานข้อมูลได้

1. ตรวจสอบว่า PostgreSQL ทำงานอยู่
2. ตรวจสอบ credentials ในไฟล์ `.env`
3. ตรวจสอบว่าฐานข้อมูล `fastify_app` มีอยู่จริง

### ปัญหา: Port 3000 ถูกใช้งานแล้ว

```bash
# หา process ที่ใช้ port 3000
lsof -i :3000

# หยุด process
kill -9 PID_NUMBER
```

### ปัญหา: JWT Token ไม่ทำงาน

1. ตรวจสอบว่า JWT_SECRET ในไฟล์ `.env` ถูกต้อง
2. ตรวจสอบว่า token ยังไม่หมดอายุ
3. ตรวจสอบ format ของ Authorization header: `Bearer <token>`

## 🎯 Next Steps

1. เพิ่ม validation ที่ครอบคลุมมากขึ้น
2. เพิ่ม logging และ monitoring
3. เพิ่ม unit tests
4. ตั้งค่า Docker สำหรับ deployment
5. เพิ่ม rate limiting
6. เพิ่ม CORS configuration 