const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export interface ContactFormData {
  name: string
  email: string
  company: string
  role?: string
  projectType: string
  timeline?: string
  budget?: string
  description?: string
  preferredTime?: string
  urgency?: string
}

export interface ROICalculationData {
  company_size: string
  industry: string
  current_processes: string[]
  pain_points: string[]
  budget_range: string
  timeline: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || data.message || `Server error: ${response.status}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  async submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
    return this.request('/api/v1/contact/', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  async calculateROI(data: ROICalculationData): Promise<ApiResponse> {
    return this.request('/api/v1/roi/calculate/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health')
  }
}

export const apiClient = new ApiClient()

// Hook for contact form submission
export const useContactForm = () => {
  const submitForm = async (formData: ContactFormData) => {
    // Development mode: just log and show success
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submitted (dev mode):', formData)
      return {
        success: true,
        message: 'Thank you! We\'ll be in touch within 24 hours.',
      }
    }

    // Production mode: submit to actual API
    return apiClient.submitContactForm(formData)
  }

  return { submitForm }
}

// Hook for ROI calculation
export const useROICalculation = () => {
  const calculateROI = async (data: ROICalculationData) => {
    // Development mode: return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('ROI calculation requested (dev mode):', data)
      return {
        success: true,
        data: {
          estimated_savings: '$2.3M annually',
          roi_percentage: '340%',
          payback_period: '6 months',
          efficiency_gain: '65%',
        },
      }
    }

    // Production mode: submit to actual API
    return apiClient.calculateROI(data)
  }

  return { calculateROI }
}