# 📚 **Swagger Documentation Guide**

## 🎯 **การกำหนดและใช้งาน Swagger ในโปรเจ็กต์ Fastify**

โปรเจ็กต์นี้ใช้ Swagger (OpenAPI) สำหรับสร้างเอกสาร API อัตโนมัติ ครอบคลุมทั้งการกำหนดค่า, การเขียน schema, และการใช้งาน

---

## 🔧 **1. การตั้งค่า Swagger**

### ไฟล์หลักสำหรับกำหนดค่า:
- **`src/utils/swagger.ts`** - การตั้งค่า Swagger และ Swagger UI
- **`src/utils/swaggerSchemas.ts`** - Common schemas ที่ใช้ร่วมกัน
- **`src/index.ts`** - การลงทะเบียน Swagger plugins

### Dependencies ที่จำเป็น:
```json
{
  "@fastify/swagger": "^9.2.0",
  "@fastify/swagger-ui": "^5.1.0"
}
```

---

## ⚙️ **2. โครงสร้างการกำหนดค่า Swagger**

### `src/utils/swagger.ts`
```typescript
export const swaggerOptions = {
  swagger: {
    info: {
      title: 'SampleFastify API',
      description: 'REST API with PostgreSQL, JWT Authentication, and Environment Variables',
      version: '1.0.0',
      contact: { name: 'API Support', email: 'support@example.com' },
      license: { name: 'ISC', url: 'https://opensource.org/licenses/ISC' }
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    
    // Tags สำหรับจัดกลุ่ม endpoints
    tags: [
      { name: 'Authentication', description: 'User registration and login endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Products', description: 'Product management endpoints' },
      { name: 'Environment', description: 'Environment and health check endpoints' },
      { name: 'Test', description: 'Test and utility endpoints' }
    ],
    
    // การกำหนด Security (JWT Authentication)
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT token with Bearer prefix (e.g., Bearer eyJhbGciOiJIUzI1NiIs...)'
      }
    }
  }
}

export const swaggerUiOptions = {
  routePrefix: '/docs',        // URL ของ Swagger UI
  exposeRoute: true,           // เปิดให้เข้าถึงได้
  uiConfig: {
    docExpansion: 'list',      // แสดงรายการ endpoints แบบยุบ
    deepLinking: true,         // รองรับ deep linking
    tryItOutEnabled: true      // เปิดใช้งานปุ่ม "Try it out"
  }
}
```

---

## 📝 **3. การเขียน Schema สำหรับ Endpoints**

### โครงสร้างพื้นฐานของ Schema:
```typescript
fastify.post('/endpoint', {
  schema: {
    description: 'คำอธิบาย endpoint',
    tags: ['Tag Name'],                    // กลุ่มใน Swagger UI
    summary: 'สรุปสั้นๆ',
    
    // Request Body Schema
    body: {
      type: 'object',
      required: ['field1', 'field2'],
      properties: {
        field1: { 
          type: 'string', 
          description: 'คำอธิบาย field1' 
        },
        field2: { 
          type: 'number', 
          minimum: 0 
        }
      }
    },
    
    // Query Parameters Schema
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'integer', minimum: 1, default: 1 },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      }
    },
    
    // URL Parameters Schema
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: '^[0-9]+$' }
      },
      required: ['id']
    },
    
    // Response Schema
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { /* schema ของข้อมูลที่ส่งกลับ */ }
        }
      },
      400: {
        type: 'object',
        properties: {
          success: { type: 'boolean', default: false },
          message: { type: 'string' }
        }
      }
    },
    
    // Security สำหรับ endpoint นี้
    security: [{ bearerAuth: [] }]  // หรือ security: [] สำหรับ public endpoint
  }
}, handlerFunction)
```

---

## 🔐 **4. การจัดการ Authentication ใน Swagger**

### การกำหนด Security Definition:
```typescript
// ใน swagger.ts
securityDefinitions: {
  bearerAuth: {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
    description: 'Enter JWT token with Bearer prefix'
  }
}
```

### การใช้งานใน Endpoints:

#### Public Endpoint (ไม่ต้อง authentication):
```typescript
schema: {
  security: []  // Override global security
}
```

#### Protected Endpoint (ต้อง authentication):
```typescript
schema: {
  security: [{ bearerAuth: [] }]
}
```

---

## 📊 **5. Common Schemas และการใช้งาน**

### `src/utils/swaggerSchemas.ts`:
```typescript
export const commonSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      username: { type: 'string' },
      fullname: { type: 'string' },
      email: { type: 'string', format: 'email' },
      created_at: { type: 'string', format: 'date-time' }
    }
  },
  
  ApiResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      data: { description: 'Response data' }
    }
  }
}

export const commonResponses = {
  200: { /* Standard success response */ },
  400: { /* Bad request response */ },
  401: { /* Unauthorized response */ },
  404: { /* Not found response */ },
  500: { /* Server error response */ }
}
```

### การใช้ Common Schemas:
```typescript
import { commonSchemas, commonResponses } from '../utils/swaggerSchemas'

schema: {
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: commonSchemas.User  // ใช้ schema ที่กำหนดไว้แล้ว
      }
    },
    400: commonResponses[400]     // ใช้ response ที่กำหนดไว้แล้ว
  }
}
```

---

## 🌐 **6. การเข้าถึงและใช้งาน Swagger UI**

### URLs สำคัญ:
- **Swagger UI**: `http://localhost:3000/docs`
- **Swagger JSON**: `http://localhost:3000/docs/json`
- **Swagger YAML**: `http://localhost:3000/docs/yaml`

### การใช้งาน Swagger UI:

#### 1. **การทดสอบ Public Endpoints**:
   - เลือก endpoint ที่ต้องการ
   - คลิก "Try it out"
   - กรอกข้อมูลใน form
   - คลิก "Execute"

#### 2. **การทดสอบ Protected Endpoints**:
   - ล็อกอินผ่าน `/auth/login` ก่อน
   - คัดลอก JWT token จาก response
   - คลิกปุ่ม "Authorize" ที่ด้านบน
   - กรอก `Bearer {token}` ในช่อง Authorization
   - คลิก "Authorize"
   - ตอนนี้สามารถทดสอบ protected endpoints ได้

#### 3. **การดู Schema**:
   - แต่ละ endpoint จะแสดง schema ของ request และ response
   - สามารถดู example data ได้
   - มีการ validate input อัตโนมัติ

---

## 🚀 **7. ตัวอย่าง Endpoints ที่มีอยู่**

### Authentication Endpoints:
- `POST /auth/register` - สมัครสมาชิก (Public)
- `POST /auth/login` - เข้าสู่ระบบ (Public)
- `GET /auth/profile` - ดูโปรไฟล์ (Protected)

### User Management:
- `GET /users` - ดู user ทั้งหมด (Protected)

### Product Management:
- `GET /products` - ดู product ทั้งหมด (Protected)
- `GET /products/{id}` - ดู product ตาม ID (Protected)

### Environment & Testing:
- `GET /api/env/config` - ดูการตั้งค่าระบบ
- `GET /api/env/health` - ตรวจสอบสถานะระบบ
- `GET /api/swagger/test` - ทดสอบ Swagger (Public)

---

## 💡 **8. เทคนิคและ Best Practices**

### การเขียน Schema ที่ดี:
```typescript
// ❌ ไม่ดี - ขาดรายละเอียด
body: {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
}

// ✅ ดี - มีรายละเอียดครบถ้วน
body: {
  type: 'object',
  required: ['name'],
  properties: {
    name: { 
      type: 'string',
      minLength: 2,
      maxLength: 100,
      description: 'Product name (2-100 characters)'
    }
  }
}
```

### การจัดกลุ่ม Tags:
```typescript
tags: [
  { name: 'Authentication', description: 'User authentication endpoints' },
  { name: 'Users', description: 'User management operations' },
  { name: 'Products', description: 'Product catalog operations' }
]
```

### การใช้ Description และ Summary:
```typescript
schema: {
  description: 'Create a new user account with validation',  // รายละเอียด
  summary: 'Register User',                                  // สรุปสั้น
  tags: ['Authentication']
}
```

---

## 🔍 **9. การ Debug และ Troubleshooting**

### ปัญหาที่พบบ่อย:

#### 1. **Error: "unknown keyword: example"**
```typescript
// ❌ ไม่ถูกต้อง - ใช้ example ใน schema
body: {
  type: 'object',
  properties: { name: { type: 'string' } },
  example: { name: "test" }  // จะเกิด error
}

// ✅ ถูกต้อง - ไม่ใช้ example ใน JSON Schema
body: {
  type: 'object',
  properties: { name: { type: 'string' } }
}
```

#### 2. **Schema Validation Error**
- ตรวจสอบ required fields
- ตรวจสอบ data types
- ตรวจสอบ format (email, date-time, etc.)

#### 3. **Security ไม่ทำงาน**
- ตรวจสอบการลงทะเบียน JWT middleware
- ตรวจสอบการกำหนด securityDefinitions
- ตรวจสอบการใช้ security ใน endpoint

---

## 📋 **10. Checklist สำหรับเพิ่ม Endpoint ใหม่**

เมื่อสร้าง endpoint ใหม่ ให้ตรวจสอบ:

- [ ] **Tags**: กำหนด tags ที่เหมาะสม
- [ ] **Description**: เขียนคำอธิบายที่ชัดเจน
- [ ] **Body Schema**: กำหนด validation สำหรับ request body
- [ ] **Query/Params**: กำหนด schema สำหรับ query parameters และ URL parameters
- [ ] **Response Schema**: กำหนด schema สำหรับ response ทุก status code
- [ ] **Security**: กำหนด authentication requirement
- [ ] **Error Handling**: กำหนด error response schemas
- [ ] **Documentation**: เขียนคำอธิบายใน description

---

## 🎉 **สรุป**

Swagger ในโปรเจ็กต์นี้ให้ความสามารถ:

1. **📖 เอกสาร API อัตโนมัติ** - สร้างเอกสารจาก code
2. **🧪 ทดสอบ API** - ทดสอบ endpoints ผ่าน UI
3. **✅ Validation** - validate request/response อัตโนมัติ
4. **🔐 Authentication** - รองรับ JWT authentication
5. **📊 Schema Management** - จัดการ data schemas แบบรวมศูนย์

การใช้งาน Swagger ช่วยให้การพัฒนา API มีประสิทธิภาพและการดูแลรักษาง่ายขึ้น!

---

**🔗 เข้าถึง Swagger UI**: http://localhost:3000/docs
