# SampleFastify - Modern REST API

โปรเจ็กต์ REST API ที่สร้างด้วย Fastify Framework, PostgreSQL และ JWT Authentication พร้อมด้วย Environment Variables Management และ Swagger Documentation ที่ครบถ้วน

## 🚀 Features

### 🎯 Core Features
- **⚡ High Performance**: Fastify framework ที่เร็วกว่า Express ถึง 2 เท่า
- **🔐 JWT Authentication**: ระบบ authentication ที่ปลอดภัยด้วย JWT
- **🗄️ PostgreSQL Integration**: การเชื่อมต่อฐานข้อมูล PostgreSQL แบบ connection pooling
- **📚 Swagger Documentation**: API documentation อัตโนมัติพร้อม testing UI
- **🔷 Full TypeScript**: รองรับ TypeScript เต็มรูปแบบ
- **✅ Schema Validation**: การ validate request/response ด้วย JSON Schema

### 🛡️ Security Features
- **🚫 Rate Limiting**: ป้องกัน DDoS และ brute force attacks ด้วย @fastify/rate-limit
- **🌐 CORS Policy**: ควบคุม Cross-Origin requests ด้วย @fastify/cors
- **🔒 Security Headers**: HTTP security headers ด้วย @fastify/helmet
- **🔐 Password Hashing**: bcrypt hashing สำหรับความปลอดภัยสูงสุด
- **🛡️ JWT Tokens**: Secure authentication ด้วย configurable expiration
- **✅ Input Validation**: ป้องกัน injection attacks ด้วย schema validation

### 📊 Monitoring & Operations
- **📈 Real-time Monitoring**: ระบบ monitoring แบบ real-time
- **🏥 Health Checks**: ตรวจสอบสถานะ API และฐานข้อมูล
- **📊 Performance Metrics**: ติดตาม response time และ request counts
- **🌍 Environment Management**: การจัดการ environment variables แบบมืออาชีพ
- **🏗️ Clean Architecture**: โครงสร้างโค้ดที่เป็นระเบียบด้วย controllers, services, models
- **🔄 Hot Reload**: การพัฒนาที่รวดเร็วด้วย nodemon

## 📁 Project Structure

```
SampleFastify/
├── 📄 README.md              # เอกสารโปรเจ็กต์หลัก
├── 📄 SWAGGER_GUIDE.md       # คู่มือการใช้งาน Swagger
├── 📄 SETUP_GUIDE.md         # คู่มือการติดตั้ง
├── 📄 MIGRATION_ADVANCED.md  # คู่มือ database migration
├── 📄 package.json           # ข้อมูลโปรเจ็กต์และ dependencies
├── 📄 tsconfig.json          # การตั้งค่า TypeScript
├── 📄 .env                   # Environment variables (ไม่อยู่ใน git)
├── 📄 env.example            # ตัวอย่าง environment variables
│
├── 🗂️ src/                   # Source code หลัก
│   ├── 📄 index.ts           # Entry point ของแอปพลิเคชัน
│   │
│   ├── 🗂️ config/            # การตั้งค่าต่างๆ
│   │   ├── env.ts            # Environment variables management
│   │   └── security.ts       # Security configurations (Rate limit, CORS, Helmet)
│   │
│   ├── 🗂️ controllers/       # HTTP request handlers
│   │   ├── userController.ts
│   │   └── productController.ts
│   │
│   ├── 🗂️ middlewares/       # Middleware functions
│   │   └── authMiddleware.ts # JWT authentication middleware
│   │
│   ├── 🗂️ models/            # Database models และ queries
│   │   ├── userModel.ts
│   │   └── productModel.ts
│   │
│   ├── 🗂️ routes/            # API route definitions
│   │   ├── userRoutes.ts         # User และ authentication routes
│   │   ├── productRoutes.ts      # Product management routes
│   │   ├── environmentRoutes.ts  # Environment monitoring routes
│   │   ├── monitoringRoutes.ts   # Monitoring และ metrics routes
│   │   ├── testRoutes.ts         # Testing และ health check routes
│   │   └── swaggerTestRoutes.ts  # Swagger testing routes
│   │
│   ├── 🗂️ services/          # Business logic
│   │   ├── userService.ts
│   │   ├── productService.ts
│   │   ├── environmentService.ts
│   │   └── monitoringService.ts  # Monitoring และ performance tracking
│   │
│   ├── 🗂️ types/             # TypeScript type definitions
│   │   └── fastify.d.ts
│   │
│   └── 🗂️ utils/             # Utility functions
│       ├── db.ts             # Database connection utilities
│       ├── jwtUtils.ts       # JWT helper functions
│       ├── apiResponse.ts    # API response utilities
│       ├── swagger.ts        # Swagger configuration
│       └── swaggerSchemas.ts # Common Swagger schemas
│
├── 🗂️ database/              # Database related files
│   ├── init.sql              # Database initialization script
│   └── migrate.js            # Database migration script
│
└── 🗂️ scripts/               # Utility scripts
    └── generate-password.js  # Password generation utility
```

## 🛠️ Installation & Setup

### 📋 ความต้องการของระบบ
- **Node.js**: เวอร์ชัน 18.0.0 หรือสูงกว่า
- **PostgreSQL**: เวอร์ชัน 12 หรือสูงกว่า
- **npm**: เวอร์ชัน 8.0.0 หรือสูงกว่า

### 🚀 ขั้นตอนการติดตั้ง

1. **Clone repository**
```powershell
git clone <repository-url>
cd SampleFastify
```

2. **ติดตั้ง dependencies**
```powershell
npm install
```

3. **ตั้งค่า PostgreSQL database**
   - สร้าง database ชื่อ `fastify_app`
   - รัน SQL script จากไฟล์ `database/init.sql`

4. **ตั้งค่า environment variables**
```powershell
# Copy ไฟล์ตัวอย่าง
Copy-Item env.example .env

# แก้ไขไฟล์ .env ให้เหมาะสมกับระบบของคุณ
notepad .env
```

5. **ตั้งค่าฐานข้อมูล (ถ้าต้องการ)**
```powershell
# รัน migration script
npm run migrate
```

### ⚙️ การตั้งค่า Environment Variables

แก้ไขไฟล์ `.env` ให้เหมาะสมกับระบบของคุณ:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fastify_app
DB_USER=postgres
DB_PASSWORD=your-password-here

# JWT Configuration (สำคัญ: เปลี่ยนในการใช้งานจริง!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Security Configuration
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=15
AUTH_RATE_LIMIT_MAX=5

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
CORS_CREDENTIALS=true
```

> **⚠️ คำเตือน**: อย่าใช้ JWT_SECRET ที่เป็นค่า default ในการใช้งานจริง! ใช้คำสั่งนี้เพื่อสร้าง secret ใหม่:
```powershell
npm run generate-password
```

## 🏃‍♂️ การรันแอปพลิเคชัน

### 🔧 Development Mode (แนะนำสำหรับการพัฒนา)
```powershell
npm run dev
```
- เริ่มเซิร์ฟเวอร์ในโหมด development
- มี hot-reload (restart อัตโนมัติเมื่อแก้ไขไฟล์)
- แสดง configuration ปัจจุบัน
- รันที่ `http://localhost:3000`

### 🚀 Production Mode
```powershell
# 1. Build โปรเจ็กต์
npm run build

# 2. เริ่มเซิร์ฟเวอร์
npm start
```

### 🎯 คำสั่งเพิ่มเติม
```powershell
# ทดสอบการเชื่อมต่อฐานข้อมูล
npm run migrate

# สร้าง JWT secret ใหม่
npm run generate-password

# ตรวจสอบ TypeScript errors
npx tsc --noEmit
```

## 📚 API Documentation

### 🌐 การเข้าถึง Swagger UI

เมื่อเซิร์ฟเวอร์ทำงานแล้ว สามารถเข้าถึงเอกสารและทดสอบ API ได้ที่:

- **📖 Swagger UI**: `http://localhost:3000/docs`
- **📄 JSON Schema**: `http://localhost:3000/docs/json`
- **📜 YAML Schema**: `http://localhost:3000/docs/yaml`

### 🎯 Features ของ Swagger UI

- **📝 เอกสาร API อัตโนมัติ**: สร้างจาก code โดยตรง
- **🧪 ทดสอบ API**: ทดสอบ endpoints ผ่าน UI
- **🔐 JWT Authentication**: รองรับการทดสอบ protected endpoints
- **✅ Schema Validation**: แสดง request/response schemas
- **💡 ตัวอย่างข้อมูล**: มี examples สำหรับแต่ละ endpoint

### 📖 คู่มือเพิ่มเติม

สำหรับรายละเอียดการใช้งาน Swagger ดูได้ที่: **[SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md)**

## 🔗 API Endpoints

### 🔐 Authentication
- `POST /auth/register` - ลงทะเบียนผู้ใช้ใหม่ (Public)
- `POST /auth/login` - เข้าสู่ระบบ (Public)
- `GET /auth/profile` - ดูข้อมูลโปรไฟล์ (Protected)

### 👥 Users Management
- `GET /users` - ดูรายการผู้ใช้ทั้งหมด (Protected)

### 📦 Products Management
- `GET /products` - ดูรายการสินค้าทั้งหมด (Protected)
- `GET /products/:id` - ดูข้อมูลสินค้าตาม ID (Protected)
- `POST /products` - สร้างสินค้าใหม่ (Protected)
- `PUT /products/:id` - แก้ไขข้อมูลสินค้า (Protected)
- `DELETE /products/:id` - ลบสินค้า (Protected)

### 🌍 Environment & Monitoring
- `GET /api/env/config` - ดูการตั้งค่าระบบ (Public)
- `GET /api/env/health` - ตรวจสอบสถานะระบบ (Public)
- `GET /api/env/server` - ข้อมูล server configuration (Public)

### 📊 Monitoring & Metrics
- `GET /api/monitoring/metrics` - ดู performance metrics (Public)
- `GET /api/monitoring/health` - ตรวจสอบสถานะ monitoring (Public)
- `GET /api/monitoring/rate-limit-status` - ดูสถานะ rate limiting (Public)

### 🧪 Testing & Development
- `GET /health` - ตรวจสอบสถานะ API (Public)
- `GET /test/db` - ทดสอบการเชื่อมต่อฐานข้อมูล (Public)
- `GET /api/swagger/test` - ทดสอบ Swagger functionality (Public)
- `GET /api/swagger/user-example` - ตัวอย่าง User schema (Public)
- `GET /api/swagger/product-example` - ตัวอย่าง Product schema (Public)
- `GET /api/swagger/error-examples` - ตัวอย่าง Error responses (Public)

### 📊 API Response Format

ทุก API response จะอยู่ในรูปแบบมาตรฐาน:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // ข้อมูลที่ส่งกลับ
  }
}
```

สำหรับ Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🔐 Authentication

API ใช้ **JWT (JSON Web Token)** สำหรับ authentication

### 🎯 การใช้งาน Authentication:

#### 1. **ลงทะเบียนหรือเข้าสู่ระบบ**
```powershell
# ลงทะเบียนผู้ใช้ใหม่
Invoke-RestMethod -Uri "http://localhost:3000/auth/register" -Method POST -Body (@{
  username = "testuser"
  password = "password123"
  fullname = "Test User"
  email = "test@example.com"
  tel = "1234567890"
} | ConvertTo-Json) -ContentType "application/json"

# เข้าสู่ระบบ
$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body (@{
  username = "testuser"
  password = "password123"
} | ConvertTo-Json) -ContentType "application/json"

$token = $response.data.token
```

#### 2. **ใช้ Token ใน Protected Endpoints**
```powershell
# เรียกใช้ protected endpoint
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:3000/auth/profile" -Headers $headers
```

#### 3. **ใช้ใน Swagger UI**
1. คลิกปุ่ม **"Authorize"** ที่ด้านบน Swagger UI
2. กรอก `Bearer <your-jwt-token>` ในช่อง Authorization
3. คลิก "Authorize"
4. ตอนนี้สามารถทดสอบ protected endpoints ได้

### 🛡️ Security Features
- **Password Hashing**: ใช้ bcrypt สำหรับ hash passwords
- **JWT Tokens**: ใช้ RS256 algorithm (สามารถเปลี่ยนเป็น HS256 ได้)
- **Token Expiration**: กำหนดเวลาหมดอายุ token (default: 24 ชั่วโมง)
- **Input Validation**: ตรวจสอบ input ด้วย JSON Schema
- **SQL Injection Prevention**: ใช้ parameterized queries

## 🗄️ Database Schema

### 👥 Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,        -- bcrypt hashed
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tel VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index สำหรับการค้นหาที่เร็วขึ้น
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

### 📦 Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,                       -- คำอธิบายสินค้า
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),                  -- หมวดหมู่สินค้า
  stock INTEGER DEFAULT 0,               -- จำนวนสต็อก
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index สำหรับการค้นหาที่เร็วขึ้น
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
```

### 🚀 การติดตั้งฐานข้อมูล

#### วิธีที่ 1: ใช้ SQL Script
```powershell
# เชื่อมต่อ PostgreSQL และรัน script
psql -U postgres -d fastify_app -f database/init.sql
```

#### วิธีที่ 2: ใช้ Migration Script
```powershell
npm run migrate
```

### 🔍 ตัวอย่างข้อมูล

#### Sample Users:
```sql
INSERT INTO users (username, password, fullname, email, tel) VALUES
('admin', '$2b$10$...', 'Administrator', 'admin@example.com', '0123456789'),
('testuser', '$2b$10$...', 'Test User', 'test@example.com', '0987654321');
```

#### Sample Products:
```sql
INSERT INTO products (name, description, price, category, stock) VALUES
('iPhone 15 Pro', 'Latest iPhone with advanced features', 999.99, 'Electronics', 50),
('MacBook Air M3', '13-inch laptop with M3 chip', 1299.99, 'Computers', 25),
('AirPods Pro', 'Wireless earbuds with noise cancellation', 249.99, 'Audio', 100);
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fastify_app
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

## 📦 Dependencies

### Production Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `fastify` | ^5.4.0 | High-performance web framework |
| `@fastify/jwt` | ^8.0.1 | JWT authentication plugin |
| `@fastify/postgres` | ^6.0.2 | PostgreSQL integration plugin |
| `@fastify/swagger` | ^9.2.0 | API documentation generation |
| `@fastify/swagger-ui` | ^5.1.0 | Swagger UI integration |
| `@fastify/rate-limit` | ^10.1.1 | Rate limiting protection |
| `@fastify/cors` | ^10.0.1 | CORS policy management |
| `@fastify/helmet` | ^12.0.1 | Security headers middleware |
| `bcryptjs` | ^2.4.3 | Password hashing library |
| `dotenv` | ^16.5.0 | Environment variables loader |
| `jsonwebtoken` | ^9.0.2 | JWT token utilities |
| `pg` | ^8.12.0 | PostgreSQL client library |

### Development Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `typescript` | ^5.8.3 | TypeScript compiler |
| `ts-node` | ^10.9.2 | TypeScript execution for Node.js |
| `nodemon` | ^3.1.10 | Development server with hot reload |
| `@types/node` | ^24.0.3 | Node.js type definitions |
| `@types/bcryptjs` | ^2.4.6 | bcryptjs type definitions |
| `@types/jsonwebtoken` | ^9.0.10 | jsonwebtoken type definitions |
| `@types/pg` | ^8.11.6 | PostgreSQL type definitions |
| `@types/dotenv` | ^6.1.1 | dotenv type definitions |

### 📊 Package Statistics
- **Total packages**: 21 (12 production + 9 development)
- **Bundle size**: ~18MB (production dependencies)
- **Security vulnerabilities**: 0 (latest security patches applied)

## 🧪 Testing & Development

### 🔍 การทดสอบ API

#### 1. **ผ่าน Swagger UI** (แนะนำ)
- เข้าไป: `http://localhost:3000/docs`
- ทดสอบ endpoints ผ่าน UI ที่สวยงาม
- มี authentication support

#### 2. **ผ่าน PowerShell**
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:3000/health"

# Database connection test
Invoke-RestMethod -Uri "http://localhost:3000/test/db"

# Environment configuration
Invoke-RestMethod -Uri "http://localhost:3000/api/env/config"

# Monitoring metrics
Invoke-RestMethod -Uri "http://localhost:3000/api/monitoring/metrics"

# Rate limit status
Invoke-RestMethod -Uri "http://localhost:3000/api/monitoring/rate-limit-status"

# Swagger test endpoint
Invoke-RestMethod -Uri "http://localhost:3000/api/swagger/test?message=Hello&count=3"
```

#### 3. **ผ่าน curl** (ถ้าติดตั้งแล้ว)
```powershell
curl "http://localhost:3000/health"
curl "http://localhost:3000/api/env/health"
```

### 🔧 Development Tools

#### npm Scripts ที่มีอยู่:
```powershell
npm run dev          # Development mode with hot reload
npm run build        # Build for production
npm start            # Run production build
npm run migrate      # Run database migration
npm run generate-password  # Generate secure JWT secret
```

#### การ Debug:
```powershell
# ดู TypeScript errors
npx tsc --noEmit

# ตรวจสอบ linting (ถ้ามี eslint)
npx eslint src/

# ดู package vulnerabilities
npm audit
npm audit fix
```

### 📊 Monitoring & Health Checks

| Endpoint | Purpose | Example Response |
|----------|---------|------------------|
| `/health` | API status | `{"status": "ok", "timestamp": "..."}` |
| `/test/db` | Database connectivity | `{"success": true, "message": "Database connected"}` |
| `/api/env/health` | Environment readiness | `{"ready": true, "errors": []}` |
| `/api/env/config` | Current configuration | `{"server": {...}, "database": {...}}` |
| `/api/monitoring/metrics` | Performance metrics | `{"requests": {...}, "performance": {...}}` |
| `/api/monitoring/health` | Monitoring system status | `{"status": "healthy", "uptime": "..."}` |
| `/api/monitoring/rate-limit-status` | Rate limiting info | `{"rateLimitHits": {...}, "errors": [...]}` |

## 🔒 Security Features

### 🛡️ ระบบป้องกันความปลอดภัย

#### 🚫 Rate Limiting
- **Global Rate Limiting**: 100 requests/15 minutes (production), 1000 requests/15 minutes (development)
- **Authentication Rate Limiting**: 5 attempts/15 minutes สำหรับ authentication endpoints
- **IP-based Tracking**: ติดตาม rate limit ตาม IP address
- **Configurable Limits**: สามารถปรับค่าผ่าน environment variables
- **Graceful Handling**: แสดงข้อความที่เหมาะสมเมื่อเกิน limit

#### 🌐 CORS Policy
- **Origin Control**: กำหนด allowed origins ตาม environment
- **Method Restrictions**: อนุญาตเฉพาะ HTTP methods ที่จำเป็น
- **Header Management**: ควบคุม allowed และ exposed headers
- **Credentials Support**: รองรับ cookies และ authorization headers
- **Pre-flight Caching**: Cache OPTIONS requests เป็นเวลา 24 ชั่วโมง

#### 🔐 Security Headers (Helmet)
- **Content Security Policy**: ป้องกัน XSS attacks
- **X-Frame-Options**: ป้องกัน clickjacking
- **HTTP Strict Transport Security**: บังคับใช้ HTTPS
- **X-Content-Type-Options**: ป้องกัน MIME type sniffing
- **Referrer Policy**: ควบคุมข้อมูล referrer
- **X-XSS-Protection**: เปิดใช้ XSS filtering

#### Authentication & Authorization
- **🔐 JWT Authentication**: ใช้ JSON Web Tokens สำหรับ stateless authentication
- **⏰ Token Expiration**: กำหนดเวลาหมดอายุ token (configurable)
- **🔑 Secure Secret Management**: JWT secrets จาก environment variables
- **🔒 bcrypt Hashing**: Password hashing ด้วย bcrypt (salt rounds: 10)
- **💪 Password Strength**: Validation ความแข็งแรงของ password
- **🚫 No Plain Text**: ไม่เก็บ password แบบ plain text

#### Input Validation & Protection
- **✅ JSON Schema Validation**: ตรวจสอบ input ทุก request
- **🛡️ SQL Injection Prevention**: ใช้ parameterized queries
- **🚷 XSS Protection**: ป้องกัน Cross-Site Scripting
- **📏 Request Size Limiting**: จำกัดขนาด request payload

#### Environment Security
- **🌍 Environment Variables**: ข้อมูลละเอียดอ่อนจาก environment variables
- **🙈 Secrets Management**: ไม่เปิดเผย sensitive data ใน logs
- **🔍 Security Headers**: HTTP security headers ผ่าน Helmet middleware
- **📊 Monitoring Integration**: ติดตาม security events แบบ real-time

### 📊 Real-time Monitoring

#### Performance Tracking
- **📈 Request Metrics**: นับจำนวน requests ต่อ endpoint
- **⏱️ Response Time Monitoring**: ติดตาม response time และ slow requests
- **🐌 Slow Request Detection**: แจ้งเตือนเมื่อ response ช้าเกิน threshold
- **📊 Error Tracking**: ติดตาม error rates และ patterns

#### Security Monitoring
- **🚫 Rate Limit Violations**: ติดตาม IP addresses ที่ถูก rate limit
- **🔐 Authentication Failures**: ลบ failed login attempts
- **🚨 Security Events**: บันทึก security-related events
- **📝 Request Logging**: ลบ requests พร้อม security context

#### Health Monitoring
- **💓 Application Health**: ตรวจสอบสถานะ application
- **🗄️ Database Health**: ตรวจสอบการเชื่อมต่อฐานข้อมูล
- **🔧 Configuration Validation**: ตรวจสอบ environment configuration
- **📊 System Metrics**: แสดง uptime, memory usage, และ performance stats

### 🚨 Security Best Practices

#### สำหรับ Development:
```env
# ✅ ใช้ strong JWT secret
JWT_SECRET=your-very-long-and-random-secret-here

# ✅ ตั้งเวลาหมดอายุที่เหมาะสม
JWT_EXPIRES_IN=24h

# ✅ ใช้ strong database password
DB_PASSWORD=your-strong-password-here

# 🛡️ Security configuration
RATE_LIMIT_MAX=1000
AUTH_RATE_LIMIT_MAX=50
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

#### สำหรับ Production:
```env
# 🔥 Production security settings
NODE_ENV=production
JWT_SECRET=your-very-secure-random-production-secret
JWT_EXPIRES_IN=1h

# 🛡️ Stricter rate limits
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=5

# 🌐 Production CORS
CORS_ORIGIN=https://yourdomain.com,https://api.yourdomain.com
CORS_CREDENTIALS=true
```

#### Production Checklist:
- 🔄 เปลี่ยน JWT secret เป็นแบบ random และยาวพอ (อย่างน้อย 32 characters)
- 🔒 ใช้ HTTPS เสมอ
- 🔥 ตั้ง NODE_ENV=production
- 🗄️ ใช้ database connection ที่มี SSL
- 📊 ตั้งค่า rate limiting ที่เหมาะสมกับ traffic
- 🛡️ กำหนด CORS policy ที่เข้มงวด
- 📝 เปิดใช้ request logging และ monitoring
- 🚨 ตั้งการแจ้งเตือน security events

### 🔧 การใช้งาน Security Features

#### 1. **Rate Limiting Configuration**
```typescript
// สามารถปรับค่าใน .env file
RATE_LIMIT_MAX=100                    # Global rate limit
RATE_LIMIT_TIME_WINDOW=15             # Time window ในนาที
AUTH_RATE_LIMIT_MAX=5                 # Rate limit สำหรับ auth endpoints
```

#### 2. **CORS Policy Setup**
```typescript
// ตั้งค่า allowed origins
CORS_ORIGIN=https://yourdomain.com,https://api.yourdomain.com
CORS_CREDENTIALS=true                  # อนุญาต cookies/auth headers
```

#### 3. **Monitoring Security Events**
```powershell
# ดู rate limit violations
Invoke-RestMethod -Uri "http://localhost:3000/api/monitoring/rate-limit-status"

# ดู security metrics
Invoke-RestMethod -Uri "http://localhost:3000/api/monitoring/metrics"
```

#### 4. **Testing Security Features**
```powershell
# ทดสอบ rate limiting (ส่ง request หลายครั้งติดกัน)
for ($i=1; $i -le 10; $i++) {
  Invoke-RestMethod -Uri "http://localhost:3000/health"
  Write-Host "Request $i completed"
}

# ทดสอบ CORS (จาก domain อื่น)
Invoke-RestMethod -Uri "http://localhost:3000/api/env/config" -Headers @{
  "Origin" = "https://unauthorized-domain.com"
}
```

## 🚀 Production Deployment

### 🌐 การ Deploy บน Cloud Platforms

#### **Heroku**
```powershell
# ติดตั้ง Heroku CLI และ login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev

# ตั้งค่า environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(npm run generate-password)

# Deploy
git push heroku main
```

#### **Railway**
```powershell
# ติดตั้ง Railway CLI
railway login
railway init
railway add postgresql
railway up
```

#### **DigitalOcean App Platform**
```powershell
# Deploy ผ่าน GitHub integration
# ตั้งค่า environment variables ใน dashboard
```

### 🐳 Docker Support (สามารถเพิ่มได้)

#### Dockerfile ตัวอย่าง:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### ⚙️ Production Configuration

#### Environment Variables สำหรับ Production:
```env
# Server Configuration
NODE_ENV=production
PORT=80

# Database Configuration
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-secure-production-password

# JWT Configuration
JWT_SECRET=your-very-secure-production-jwt-secret
JWT_EXPIRES_IN=1h

# Security Configuration
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=15
AUTH_RATE_LIMIT_MAX=5

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com,https://api.yourdomain.com
CORS_CREDENTIALS=true
```

### 📊 Performance Considerations

- **📈 Connection Pooling**: PostgreSQL connection pooling (already configured)
- **�️ Security Middleware**: Rate limiting, CORS, และ security headers
- **📊 Real-time Monitoring**: Performance tracking และ security monitoring
- **�🗜️ Response Compression**: เพิ่ม compression middleware (optional)
- **🚀 Caching Layer**: เพิ่ม Redis caching (optional)
- **📊 APM Integration**: เพิ่ม APM tools เช่น New Relic หรือ DataDog (optional)
- **🔍 Request Optimization**: Schema validation และ input sanitization

## 📖 เอกสารเพิ่มเติม

### 📚 คู่มือและเอกสาร
- **[SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md)** - คู่มือการใช้งาน Swagger อย่างละเอียด
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - คู่มือการติดตั้งและตั้งค่า
- **[MIGRATION_ADVANCED.md](./MIGRATION_ADVANCED.md)** - คู่มือ database migration ขั้นสูง

### 🔗 แหล่งข้อมูลภายนอก
- **[Fastify Documentation](https://www.fastify.io/docs/latest/)**
- **[PostgreSQL Documentation](https://www.postgresql.org/docs/)**
- **[JWT.io](https://jwt.io/)** - สำหรับทดสอบและ debug JWT tokens

## 🤝 การร่วมพัฒนา

### 🛠️ Development Workflow

1. **Fork และ Clone repository**
2. **สร้าง feature branch**: `git checkout -b feature/new-feature`
3. **เขียน code และ tests**
4. **ตรวจสอบ TypeScript**: `npx tsc --noEmit`
5. **Commit และ Push**: `git push origin feature/new-feature`
6. **สร้าง Pull Request**

### 📝 Code Standards

- ใช้ **TypeScript** สำหรับ type safety
- ใช้ **camelCase** สำหรับ variables และ functions
- ใช้ **PascalCase** สำหรับ classes และ interfaces
- เขียน **JSDoc comments** สำหรับ public functions
- ใช้ **async/await** แทน Promises

## 📄 License

**ISC License** - ดูรายละเอียดเพิ่มเติมในไฟล์ LICENSE

---

## 📞 ติดต่อและสนับสนุน

- 📧 **Email**: your-email@example.com
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/username/SampleFastify/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/username/SampleFastify/discussions)
- 📖 **Documentation**: ดูเอกสารใน `/docs` folder

---

### 🎉 ขอให้สนุกกับการพัฒนา API ที่ปลอดภัย!

> ⭐ ถ้าโปรเจ็กต์นี้มีประโยชน์ อย่าลืม **Star** repository นี้เพื่อให้กำลังใจ!

**Made with ❤️ using Fastify Framework**  
**🛡️ Secured with Rate Limiting, CORS, และ Security Headers**  
**📊 Monitored with Real-time Performance Tracking**
