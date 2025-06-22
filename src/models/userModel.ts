export interface User {
  id?: number
  username: string
  password: string
  fullname: string
  email: string
  tel: string
  created_at?: Date
  updated_at?: Date
}

export interface CreateUserInput {
  username: string
  password: string
  fullname: string
  email: string
  tel: string
}

export interface LoginInput {
  username: string
  password: string
}

export interface UserResponse {
  id: number
  username: string
  fullname: string
  email: string
  tel: string
  created_at: Date
  updated_at: Date
}

// SQL Queries
export const userQueries = {
  createTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      fullname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      tel VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  
  createUser: `
    INSERT INTO users (username, password, fullname, email, tel)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, fullname, email, tel, created_at, updated_at
  `,
  
  findByUsername: `
    SELECT * FROM users WHERE username = $1
  `,
  
  findByEmail: `
    SELECT * FROM users WHERE email = $1
  `,
  
  findById: `
    SELECT id, username, fullname, email, tel, created_at, updated_at 
    FROM users WHERE id = $1
  `,
  
  getAllUsers: `
    SELECT id, username, fullname, email, tel, created_at, updated_at 
    FROM users ORDER BY created_at DESC
  `
} 