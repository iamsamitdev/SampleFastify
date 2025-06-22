const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'fastify_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
})

async function runMigration() {
  try {
    await client.connect()
    console.log('Connected to PostgreSQL database')

    // Create Users Table
    const createUsersTable = `
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
    `

    // Create Products Table
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create indexes
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
    `

    console.log('Creating users table...')
    await client.query(createUsersTable)
    console.log('✅ Users table created successfully')

    console.log('Creating products table...')
    await client.query(createProductsTable)
    console.log('✅ Products table created successfully')

    console.log('Creating indexes...')
    await client.query(createIndexes)
    console.log('✅ Indexes created successfully')

    // Insert sample data
    const insertSampleUsers = `
      INSERT INTO users (username, password, fullname, email, tel) VALUES
      ('admin', '$2a$10$c5588WRTwjs5e8IH216sMe1TzWgQLzUc9MiL/DTMBqlI269N5a8iW', 'Administrator', 'admin@example.com', '0800000000'),
      ('testuser', '$2a$10$MesxH.kZRsefV0rUvCzoN.FVirLC1l73ZS7IP71Oxci0bjWe3M3vG', 'Test User', 'test@example.com', '0812345678')
      ON CONFLICT (username) DO NOTHING;
    `

    const insertSampleProducts = `
      INSERT INTO products (name, price) VALUES
      ('Sample Product 1', 99.99),
      ('Sample Product 2', 149.50),
      ('Laptop Computer', 25000.00),
      ('Wireless Mouse', 890.00)
      ON CONFLICT DO NOTHING;
    `

    console.log('Inserting sample users...')
    await client.query(insertSampleUsers)
    console.log('✅ Sample users inserted successfully')

    console.log('Inserting sample products...')
    await client.query(insertSampleProducts)
    console.log('✅ Sample products inserted successfully')

    console.log('🎉 Database migration completed successfully!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration() 