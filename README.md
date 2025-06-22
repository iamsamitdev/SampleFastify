# SampleFastify

โปรเจ็กต์ตัวอย่างการใช้งาน Fastify Framework สำหรับพัฒนา REST API ด้วย TypeScript

## 📋 Table of Contents
- [รายละเอียดโปรเจ็กต์](#รายละเอียดโปรเจ็กต์)
- [โครงสร้างโปรเจ็กต์](#โครงสร้างโปรเจ็กต์)
- [ความต้องการของระบบ](#ความต้องการของระบบ)
- [การติดตั้งและการตั้งค่า](#การติดตั้งและการตั้งค่า)
- [การใช้งาน](#การใช้งาน)
- [คำสั่งสำคัญ](#คำสั่งสำคัญ)
- [API Endpoints](#api-endpoints)
- [การพัฒนาต่อ](#การพัฒนาต่อ)
- [การ Deploy](#การ-deploy)
- [Technologies Used](#technologies-used)

## 📖 รายละเอียดโปรเจ็กต์

SampleFastify เป็นโปรเจ็กต์ตัวอย่างที่แสดงการใช้งาน Fastify Framework ซึ่งเป็น web framework ที่มีประสิทธิภาพสูงสำหรับ Node.js โปรเจ็กต์นี้ใช้ TypeScript เพื่อเพิ่มความปลอดภัยในการเขียนโค้ดและการจัดการ type

### ✨ Features
- ⚡ High-performance web server ด้วย Fastify
- 🔷 TypeScript support เต็มรูปแบบ
- 🔄 Hot-reload ในการพัฒนา
- 📦 Modern ES6+ syntax
- 🛠️ Ready for production build

## 🏗️ โครงสร้างโปรเจ็กต์

```
SampleFastify/
├── src/
│   └── index.ts            # ไฟล์หลักของแอปพลิเคชัน
├── dist/                   # โฟลเดอร์ที่เก็บไฟล์ที่ compile แล้ว (จะถูกสร้างขึ้นหลังจาก build)
├── node_modules/           # Dependencies ที่ติดตั้งแล้ว
├── package.json            # ข้อมูลโปรเจ็กต์และ dependencies
├── tsconfig.json           # การตั้งค่า TypeScript compiler
└── README.md              # เอกสารโปรเจ็กต์
```

### 📁 รายละเอียดโฟลเดอร์

- **`src/`**: ไฟล์ source code ภาษา TypeScript
  - `index.ts`: ไฟล์หลักที่ประกอบด้วย Fastify server และ routes
- **`dist/`**: ไฟล์ JavaScript ที่ compile แล้วพร้อมสำหรับ production
- **`node_modules/`**: โฟลเดอร์ที่เก็บ dependencies ทั้งหมด

## 💻 ความต้องการของระบบ

### Software Requirements
- **Node.js**: เวอร์ชัน 18.0.0 หรือสูงกว่า
- **npm**: เวอร์ชัน 8.0.0 หรือสูงกว่า (มากับ Node.js)
- **TypeScript**: จะถูกติดตั้งเป็น dev dependency

### การตรวจสอบเวอร์ชัน
```powershell
# ตรวจสอบเวอร์ชัน Node.js
node --version

# ตรวจสอบเวอร์ชัน npm
npm --version
```

## 🚀 การติดตั้งและการตั้งค่า

### 1. Clone หรือ Download โปรเจ็กต์
```powershell
# หากมี git repository
git clone <repository-url>
cd SampleFastify

# หรือ download และแตกไฟล์แล้ว navigate เข้าไปในโฟลเดอร์
cd SampleFastify
```

### 2. ติดตั้ง Dependencies
```powershell
npm install
```

### 3. รายละเอียด Dependencies ที่จะถูกติดตั้ง

#### Production Dependencies
- **`fastify@^5.4.0`**: High-performance web framework

#### Development Dependencies
- **`@types/node@^24.0.3`**: Type definitions สำหรับ Node.js
- **`nodemon@^3.1.10`**: File watcher สำหรับ auto-restart server
- **`ts-node@^10.9.2`**: TypeScript execution engine สำหรับ Node.js
- **`typescript@^5.8.3`**: TypeScript compiler

### 4. การตั้งค่า TypeScript (tsconfig.json)
โปรเจ็กต์ใช้การตั้งค่า TypeScript ดังนี้:
```json
{
  "compilerOptions": {
    "target": "es2016",           // JavaScript version เป้าหมาย
    "module": "commonjs",         // Module system
    "rootDir": "src",             // โฟลเดอร์ source code
    "outDir": "dist",             // โฟลเดอร์ output
    "esModuleInterop": true,      // รองรับ import/export
    "forceConsistentCasingInFileNames": true,
    "strict": true,               // เปิดใช้ strict mode
    "skipLibCheck": true
  },
  "include": ["src"],             // รวมเฉพาะไฟล์ใน src/
  "exclude": ["node_modules"]     // ยกเว้น node_modules
}
```

## 🎯 การใช้งาน

### Development Mode (แนะนำสำหรับการพัฒนา)
```powershell
npm run dev
```
- เริ่มเซิร์ฟเวอร์ในโหมด development
- มี hot-reload (restart อัตโนมัติเมื่อแก้ไขไฟล์)
- ใช้ ts-node เพื่อรัน TypeScript โดยตรง

### Production Mode
```powershell
# 1. Build โปรเจ็กต์
npm run build

# 2. เริ่มเซิร์ฟเวอร์
npm start
```

### การเข้าถึงแอปพลิเคชัน
เมื่อเซิร์ฟเวอร์เริ่มทำงานแล้ว สามารถเข้าถึงได้ที่:
- **URL**: `http://localhost:3000`
- **เบราว์เซอร์**: เปิด `http://localhost:3000` จะเห็นข้อความ `{"message":"Hello, World!"}`

## 🔧 คำสั่งสำคัญ

### npm Scripts
```powershell
# Development - รันในโหมดพัฒนาพร้อม hot-reload
npm run dev

# Build - compile TypeScript เป็น JavaScript
npm run build

# Start - รันเซิร์ฟเวอร์ production
npm start

# Test - รันการทดสอบ (ยังไม่ได้ตั้งค่า)
npm test
```

### การจัดการ Dependencies
```powershell
# ติดตั้ง dependency ใหม่
npm install <package-name>

# ติดตั้ง dev dependency
npm install --save-dev <package-name>

# อัพเดต dependencies
npm update

# ตรวจสอบ dependencies ที่ล้าสมัย
npm outdated

# ลบ node_modules และติดตั้งใหม่
Remove-Item -Recurse -Force node_modules
npm install
```

## 🌐 API Endpoints

### GET /
- **URL**: `http://localhost:3000/`
- **Method**: GET
- **Description**: ส่งข้อความทักทาย
- **Response**:
  ```json
  {
    "message": "Hello, World!"
  }
  ```

### ตัวอย่างการทดสอบด้วย PowerShell
```powershell
# ใช้ Invoke-WebRequest
Invoke-WebRequest -Uri "http://localhost:3000/" -Method GET

# ใช้ Invoke-RestMethod (แนะนำสำหรับ JSON)
Invoke-RestMethod -Uri "http://localhost:3000/" -Method GET
```

### ตัวอย่างการทดสอบด้วย curl (หากติดตั้งแล้ว)
```powershell
curl http://localhost:3000/
```

## 🔨 การพัฒนาต่อ

### เพิ่ม Routes ใหม่
แก้ไขไฟล์ `src/index.ts`:

```typescript
// GET endpoint ใหม่
app.get('/api/users', async (request, reply) => {
  return { users: ['John', 'Jane', 'Bob'] };
});

// POST endpoint
app.post('/api/users', async (request, reply) => {
  const body = request.body;
  return { message: 'User created', data: body };
});

// GET endpoint พร้อม parameters
app.get('/api/users/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  return { message: `User ${id}` };
});
```

### เพิ่ม Plugins และ Middleware
```typescript
// CORS plugin
app.register(require('@fastify/cors'), {
  origin: true
});

// Static files
app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
});
```

### การติดตั้ง Plugins เพิ่มเติม
```powershell
# CORS support
npm install @fastify/cors

# Static files
npm install @fastify/static

# JWT authentication
npm install @fastify/jwt

# Database integration (MongoDB)
npm install @fastify/mongodb

# Validation and serialization
npm install @fastify/schema-to-typescript
```

### การจัดการ Environment Variables
สร้างไฟล์ `.env`:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
```

ติดตั้งและใช้ dotenv:
```powershell
npm install dotenv
npm install --save-dev @types/dotenv
```

### โครงสร้างโปรเจ็กต์ขนาดใหญ่
```
src/
├── controllers/        # Logic การจัดการ request/response
├── routes/            # การกำหนด routes
├── models/           # Data models
├── services/         # Business logic
├── utils/           # Utility functions
├── types/           # Type definitions
└── index.ts         # Entry point
```

## 🚀 การ Deploy

### Deploy บน Local Server
```powershell
# Build โปรเจ็กต์
npm run build

# ใช้ PM2 สำหรับ production (ติดตั้งก่อน: npm install -g pm2)
pm2 start dist/index.js --name "fastify-app"
```

### Deploy บน Cloud Platforms

#### Heroku
```powershell
# ติดตั้ง Heroku CLI และ login
heroku create your-app-name
git push heroku main
```

#### Railway
```powershell
# ติดตั้ง Railway CLI
railway login
railway init
railway up
```

#### Vercel (สำหรับ Serverless)
```powershell
# ติดตั้ง Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables สำหรับ Production
```env
NODE_ENV=production
PORT=80
# เพิ่ม variables อื่นๆ ตามความต้องการ
```

## 🛠️ Technologies Used

| Technology | Version | Description |
|------------|---------|-------------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **TypeScript** | ^5.8.3 | Typed superset of JavaScript |
| **Fastify** | ^5.4.0 | Fast and low overhead web framework |
| **ts-node** | ^10.9.2 | TypeScript execution engine |
| **nodemon** | ^3.1.10 | Development file watcher |

### Fastify Features ที่สำคัญ
- ⚡ **High Performance**: เร็วกว่า Express ถึง 2 เท่า
- 🔒 **JSON Schema**: Built-in validation และ serialization
- 🔌 **Plugin System**: ระบบ plugin ที่ยืดหยุ่น
- 📝 **TypeScript Support**: รองรับ TypeScript อย่างเต็มรูปแบบ
- 🧪 **Testing**: เครื่องมือทดสอบที่ครบครัน

## 📝 การ Troubleshooting

### ปัญหาที่พบบ่อย

#### 1. Port ถูกใช้งานแล้ว
```
Error: listen EADDRINUSE: address already in use :::3000
```
**วิธีแก้**:
```powershell
# หา process ที่ใช้ port 3000
netstat -ano | findstr :3000

# Kill process (แทนที่ PID ด้วยเลขที่แท้จริง)
taskkill /PID <PID> /F

# หรือเปลี่ยน port ในไฟล์ index.ts
```

#### 2. Module not found
```
Error: Cannot find module 'fastify'
```
**วิธีแก้**:
```powershell
# ติดตั้ง dependencies ใหม่
npm install
```

#### 3. TypeScript compilation errors
**วิธีแก้**:
```powershell
# ตรวจสอบ syntax และ type errors
npx tsc --noEmit

# หรือใช้ VS Code เพื่อดู errors
```

## 📞 การติดต่อและการสนับสนุน

- 📧 **Email**: [samit@email.com]
- 🐛 **Bug Reports**: [https://www.itgenius.co.th/issue]
- 💡 **Feature Requests**: [https://www.itgenius.co.th]

## 📜 License

ISC License - ดูรายละเอียดในไฟล์ LICENSE

---

### 🎉 ขอให้สนุกกับการพัฒนา!

ไฟล์ README นี้ครอบคลุมทุกสิ่งที่จำเป็นสำหรับการเริ่มต้นและพัฒนาโปรเจ็กต์ Fastify หากมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม อย่าลังเลที่จะสอบถาม!
