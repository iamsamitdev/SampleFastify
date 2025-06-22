import { FastifyRequest, FastifyReply } from 'fastify'
import { ProductService } from '../services/productService'
import { CreateProductInput, UpdateProductInput } from '../models/productModel'
import { successResponse, errorResponse } from '../utils/apiResponse'

interface ProductParams {
  id: string
}

export class ProductController {
  private productService: ProductService

  constructor(productService: ProductService) {
    this.productService = productService
  }

  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const productData = request.body as CreateProductInput

      // Validation
      if (!productData.name || !productData.price) {
        return reply.status(400).send(
          errorResponse('Name and price are required', 'VALIDATION_ERROR')
        )
      }

      if (productData.price <= 0) {
        return reply.status(400).send(
          errorResponse('Price must be greater than 0', 'VALIDATION_ERROR')
        )
      }

      const product = await this.productService.createProduct(productData)
      
      return reply.status(201).send(
        successResponse('Product created successfully', product)
      )
    } catch (error: any) {
      return reply.status(400).send(
        errorResponse('Failed to create product', error.message)
      )
    }
  }

  async getAllProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await this.productService.getAllProducts()
      
      return reply.status(200).send(
        successResponse('Products retrieved successfully', products)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to get products', error.message)
      )
    }
  }

  async getProductById(request: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) {
    try {
      const productId = parseInt(request.params.id)
      
      if (isNaN(productId)) {
        return reply.status(400).send(
          errorResponse('Invalid product ID', 'VALIDATION_ERROR')
        )
      }

      const product = await this.productService.getProductById(productId)
      
      if (!product) {
        return reply.status(404).send(
          errorResponse('Product not found', 'PRODUCT_NOT_FOUND')
        )
      }

      return reply.status(200).send(
        successResponse('Product retrieved successfully', product)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to get product', error.message)
      )
    }
  }

  async updateProduct(request: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) {
    try {
      const productId = parseInt(request.params.id)
      const updateData = request.body as UpdateProductInput

      if (isNaN(productId)) {
        return reply.status(400).send(
          errorResponse('Invalid product ID', 'VALIDATION_ERROR')
        )
      }

      if (updateData.price !== undefined && updateData.price <= 0) {
        return reply.status(400).send(
          errorResponse('Price must be greater than 0', 'VALIDATION_ERROR')
        )
      }

      const product = await this.productService.updateProduct(productId, updateData)
      
      if (!product) {
        return reply.status(404).send(
          errorResponse('Product not found', 'PRODUCT_NOT_FOUND')
        )
      }

      return reply.status(200).send(
        successResponse('Product updated successfully', product)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to update product', error.message)
      )
    }
  }

  async deleteProduct(request: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) {
    try {
      const productId = parseInt(request.params.id)

      if (isNaN(productId)) {
        return reply.status(400).send(
          errorResponse('Invalid product ID', 'VALIDATION_ERROR')
        )
      }

      const product = await this.productService.deleteProduct(productId)
      
      if (!product) {
        return reply.status(404).send(
          errorResponse('Product not found', 'PRODUCT_NOT_FOUND')
        )
      }

      return reply.status(200).send(
        successResponse('Product deleted successfully', product)
      )
    } catch (error: any) {
      return reply.status(500).send(
        errorResponse('Failed to delete product', error.message)
      )
    }
  }
} 