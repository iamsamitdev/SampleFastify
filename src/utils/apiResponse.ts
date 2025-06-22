export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export function successResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  }
}

export function errorResponse(message: string, error?: string): ApiResponse {
  return {
    success: false,
    message,
    error
  }
} 