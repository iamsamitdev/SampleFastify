# Advanced Database Migration

## ใช้ node-pg-migrate (แนะนำสำหรับโปรเจกต์ขนาดใหญ่)

### 1. ติดตั้ง migration library

```bash
npm install --save-dev node-pg-migrate
```

### 2. สร้าง migration config

สร้างไฟล์ `database-url.js`:

```javascript
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'fastify_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
}

module.exports = `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
```

### 3. เพิ่ม scripts ใน package.json

```json
{
  "scripts": {
    "migrate:create": "node-pg-migrate create",
    "migrate:up": "node-pg-migrate up",
    "migrate:down": "node-pg-migrate down",
    "migrate:redo": "node-pg-migrate redo"
  }
}
```

### 4. สร้าง migration files

```bash
# สร้าง migration สำหรับ users table
npm run migrate:create create-users-table

# สร้าง migration สำหรับ products table
npm run migrate:create create-products-table
```

### 5. แก้ไข migration files

ไฟล์ `migrations/xxx-create-users-table.js`:

```javascript
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: {
      type: 'varchar(255)',
      notNull: true,
      unique: true
    },
    password: {
      type: 'varchar(255)',
      notNull: true
    },
    fullname: {
      type: 'varchar(255)',
      notNull: true
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true
    },
    tel: {
      type: 'varchar(20)',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })

  // Create indexes
  pgm.createIndex('users', 'username')
  pgm.createIndex('users', 'email')
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
```

### 6. รัน migrations

```bash
npm run migrate:up
```

## ข้อดีของ Migration Library

1. **Version Control**: ติดตาม schema changes
2. **Rollback**: สามารถย้อนกลับได้
3. **Team Collaboration**: ทีมสามารถ sync database schema ได้
4. **Production Safe**: ปลอดภัยสำหรับ production

## คำสั่งที่ใช้บ่อย

```bash
# สร้าง migration ใหม่
npm run migrate:create add-new-column

# รัน migration ทั้งหมด
npm run migrate:up

# ย้อนกลับ migration ล่าสุด
npm run migrate:down

# ย้อนกลับแล้วรันใหม่
npm run migrate:redo

# ดู status ของ migrations
npx node-pg-migrate status
``` 