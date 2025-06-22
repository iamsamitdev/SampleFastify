import { FastifyInstance } from 'fastify'
import { ProductController } from '../controllers/productController'
import { ProductService } from '../services/productService'
import { authMiddleware } from '../middlewares/authMiddleware'

export async function productRoutes(fastify: FastifyInstance) {
  const productService = new ProductService(fastify)
  const productController = new ProductController(productService)

  // All product routes require authentication
  fastify.addHook('preHandler', authMiddleware)

  // Get all products
  fastify.get('/products', productController.getAllProducts.bind(productController))

  // Get product by ID
  fastify.get('/products/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        },
        required: ['id']
      }
    }
  }, productController.getProductById.bind(productController))

  // Create new product
  fastify.post('/products', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'price'],
        properties: {
          name: { type: 'string', minLength: 1 },
          price: { type: 'number', minimum: 0.01 }
        }
      }
    }
  }, productController.createProduct.bind(productController))

  // Update product
  fastify.put('/products/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          price: { type: 'number', minimum: 0.01 }
        }
      }
    }
  }, productController.updateProduct.bind(productController))

  // Delete product
  fastify.delete('/products/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        },
        required: ['id']
      }
    }
  }, productController.deleteProduct.bind(productController))
} 