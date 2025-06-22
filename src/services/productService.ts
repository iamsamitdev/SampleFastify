import { FastifyInstance } from 'fastify'
import { Product, CreateProductInput, UpdateProductInput, productQueries } from '../models/productModel'

export class ProductService {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async createProduct(productData: CreateProductInput): Promise<Product> {
    const { name, price } = productData

    const result = await this.fastify.pg.query(
      productQueries.createProduct,
      [name, price]
    )

    return result.rows[0]
  }

  async getAllProducts(): Promise<Product[]> {
    const result = await this.fastify.pg.query(productQueries.getAllProducts)
    return result.rows
  }

  async getProductById(productId: number): Promise<Product | null> {
    const result = await this.fastify.pg.query(
      productQueries.getProductById,
      [productId]
    )

    return result.rows.length > 0 ? result.rows[0] : null
  }

  async updateProduct(productId: number, updateData: UpdateProductInput): Promise<Product | null> {
    const { name, price } = updateData

    const result = await this.fastify.pg.query(
      productQueries.updateProduct,
      [productId, name, price]
    )

    return result.rows.length > 0 ? result.rows[0] : null
  }

  async deleteProduct(productId: number): Promise<Product | null> {
    const result = await this.fastify.pg.query(
      productQueries.deleteProduct,
      [productId]
    )

    return result.rows.length > 0 ? result.rows[0] : null
  }
} 