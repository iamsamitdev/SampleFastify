/**
 * Common Swagger Schemas
 * เก็บ schema ที่ใช้ร่วมกันในหลายๆ endpoint
 */

// Common Response Schemas
export const commonSchemas = {
  // Standard API Response
  ApiResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', description: 'Indicates if the request was successful' },
      message: { type: 'string', description: 'Response message' },
      data: { description: 'Response data (varies by endpoint)' }
    },
    required: ['success']
  },

  // Error Response
  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string', description: 'Error message' },
      error: { type: 'string', description: 'Error details' }
    },
    required: ['success', 'message']
  },

  // User Schema
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer', description: 'User ID' },
      username: { type: 'string', description: 'Username' },
      fullname: { type: 'string', description: 'Full name' },
      email: { type: 'string', format: 'email', description: 'Email address' },
      tel: { type: 'string', description: 'Phone number' },
      created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
      updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
    }
  },

  // Product Schema
  Product: {
    type: 'object',
    properties: {
      id: { type: 'integer', description: 'Product ID' },
      name: { type: 'string', description: 'Product name' },
      description: { type: 'string', description: 'Product description' },
      price: { type: 'number', minimum: 0, description: 'Product price' },
      category: { type: 'string', description: 'Product category' },
      stock: { type: 'integer', minimum: 0, description: 'Stock quantity' },
      created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
      updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
    }
  },

  // JWT Token Schema
  JWTToken: {
    type: 'object',
    properties: {
      token: { type: 'string', description: 'JWT access token' },
      expiresIn: { type: 'string', description: 'Token expiration time' },
      tokenType: { type: 'string', default: 'Bearer', description: 'Token type' }
    }
  },

  // Pagination Schema
  Pagination: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, description: 'Current page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Items per page' },
      total: { type: 'integer', minimum: 0, description: 'Total number of items' },
      totalPages: { type: 'integer', minimum: 0, description: 'Total number of pages' }
    }
  }
}

// Common Query Parameters
export const commonParams = {
  // Pagination Query Parameters
  paginationQuery: {
    type: 'object',
    properties: {
      page: { 
        type: 'integer', 
        minimum: 1, 
        default: 1,
        description: 'Page number (starts from 1)' 
      },
      limit: { 
        type: 'integer', 
        minimum: 1, 
        maximum: 100, 
        default: 20,
        description: 'Number of items per page (max 100)' 
      },
      sort: { 
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order' 
      },
      sortBy: { 
        type: 'string',
        default: 'created_at',
        description: 'Field to sort by' 
      }
    }
  },

  // Search Query Parameters
  searchQuery: {
    type: 'object',
    properties: {
      q: { 
        type: 'string',
        minLength: 1,
        description: 'Search query string' 
      },
      category: { 
        type: 'string',
        description: 'Filter by category' 
      }
    }
  }
}

// Common HTTP Status Code Responses
export const commonResponses = {
  200: {
    description: 'Success',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: true },
      data: { description: 'Response data' }
    }
  },
  201: {
    description: 'Created',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: true },
      message: { type: 'string' },
      data: { description: 'Created resource data' }
    }
  },
  400: {
    description: 'Bad Request',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string' },
      errors: { 
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  401: {
    description: 'Unauthorized',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string', default: 'Authentication required' }
    }
  },
  403: {
    description: 'Forbidden',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string', default: 'Access denied' }
    }
  },
  404: {
    description: 'Not Found',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string', default: 'Resource not found' }
    }
  },
  500: {
    description: 'Internal Server Error',
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: { type: 'string', default: 'Internal server error' }
    }
  }
}
