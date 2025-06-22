# Fastify REST API with PostgreSQL and JWT Authentication

REST API ที่สร้างด้วย Fastify, PostgreSQL และ JWT Authentication พร้อมด้วย Swagger documentation

## 🚀 Features

- **Authentication**: JWT-based authentication with login/register
- **Database**: PostgreSQL integration with connection pooling
- **API Documentation**: Swagger UI สำหรับทดสอบ API
- **TypeScript**: Full TypeScript support
- **Validation**: Request validation with JSON Schema
- **Error Handling**: Standardized error responses
- **Security**: Password hashing with bcrypt
- **Architecture**: Clean architecture with controllers, services, and models

## 📁 Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── middlewares/     # Authentication middleware
├── models/         # Database models and queries
├── routes/         # API route definitions
├── services/       # Business logic
└── utils/          # Utility functions
```

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Setup PostgreSQL database
4. Copy environment variables:
```bash
cp env.example .env
```

5. Update `.env` file with your database credentials

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📚 API Documentation

เมื่อเซิร์ฟเวอร์ทำงานแล้ว สามารถเข้าถึง Swagger UI ได้ที่:
```
http://localhost:3000/docs
```

## 🔗 API Endpoints

### Authentication
- `POST /auth/register` - ลงทะเบียนผู้ใช้ใหม่
- `POST /auth/login` - เข้าสู่ระบบ
- `GET /auth/profile` - ดูข้อมูลโปรไฟล์ (ต้อง authenticate)

### Users
- `GET /users` - ดูรายการผู้ใช้ทั้งหมด (ต้อง authenticate)

### Products
- `GET /products` - ดูรายการสินค้าทั้งหมด (ต้อง authenticate)
- `GET /products/:id` - ดูข้อมูลสินค้าตาม ID (ต้อง authenticate)
- `POST /products` - สร้างสินค้าใหม่ (ต้อง authenticate)
- `PUT /products/:id` - แก้ไขข้อมูลสินค้า (ต้อง authenticate)
- `DELETE /products/:id` - ลบสินค้า (ต้อง authenticate)

### Health Check
- `GET /health` - ตรวจสอบสถานะ API
- `GET /test/db` - ทดสอบการเชื่อมต่อฐานข้อมูล

## 🔐 Authentication

API ใช้ JWT (JSON Web Token) สำหรับ authentication

### การใช้งาน:
1. ลงทะเบียนหรือเข้าสู่ระบบเพื่อรับ token
2. ใส่ token ใน Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tel VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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

### Production
- `fastify` - Web framework
- `@fastify/jwt` - JWT authentication
- `@fastify/postgres` - PostgreSQL plugin
- `@fastify/swagger` - API documentation
- `@fastify/swagger-ui` - Swagger UI
- `bcryptjs` - Password hashing
- `pg` - PostgreSQL client

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Development server
- `@types/*` - Type definitions

## 🧪 Testing

ทดสอบ API endpoints ผ่าน:
- Swagger UI: `http://localhost:3000/docs`
- Health check: `http://localhost:3000/health`
- Database test: `http://localhost:3000/test/db`

## 🔒 Security Features

- Password hashing ด้วย bcrypt
- JWT token authentication
- Input validation
- SQL injection prevention
- Environment variables สำหรับ sensitive data

## 📝 License

MIT License
