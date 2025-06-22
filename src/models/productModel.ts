export interface Product {
  id?: number
  name: string
  price: number
  created_at?: Date
  updated_at?: Date
}

export interface CreateProductInput {
  name: string
  price: number
}

export interface UpdateProductInput {
  name?: string
  price?: number
}

// SQL Queries
export const productQueries = {
  createTable: `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  
  createProduct: `
    INSERT INTO products (name, price)
    VALUES ($1, $2)
    RETURNING *
  `,
  
  getAllProducts: `
    SELECT * FROM products ORDER BY created_at DESC
  `,
  
  getProductById: `
    SELECT * FROM products WHERE id = $1
  `,
  
  updateProduct: `
    UPDATE products 
    SET name = COALESCE($2, name), 
        price = COALESCE($3, price),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `,
  
  deleteProduct: `
    DELETE FROM products WHERE id = $1
    RETURNING *
  `
} 