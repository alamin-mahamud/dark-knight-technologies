import {
  apiClient,
  useContactForm,
  useROICalculation,
  ContactFormData,
  ROICalculationData,
} from '@/lib/api'

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('API Client', () => {
  const originalEnv = process.env

  beforeEach(() => {
    mockFetch.mockClear()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('ApiClient', () => {
    describe('submitContactForm', () => {
      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Corp',
        projectType: 'AI Implementation',
      }

      it('makes successful API call', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Success' }),
        } as Response)

        const result = await apiClient.submitContactForm(formData)

        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:8000/api/v1/contact/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        )

        expect(result).toEqual({
          success: true,
          data: { message: 'Success' },
        })
      })

      it('handles API error response', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
          json: async () => ({ detail: 'Validation error' }),
        } as Response)

        const result = await apiClient.submitContactForm(formData)

        expect(result).toEqual({
          success: false,
          error: 'Validation error',
        })
      })

      it('handles network error', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'))

        const result = await apiClient.submitContactForm(formData)

        expect(result).toEqual({
          success: false,
          error: 'Network error',
        })
      })
    })

    describe('calculateROI', () => {
      const roiData: ROICalculationData = {
        company_size: 'Large',
        industry: 'Technology',
        current_processes: ['Manual data entry'],
        pain_points: ['Inefficiency'],
        budget_range: '$100k-$500k',
        timeline: '6 months',
      }

      it('makes successful ROI calculation call', async () => {
        const mockResponse = {
          estimated_savings: '$2.3M annually',
          roi_percentage: '340%',
        }

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        } as Response)

        const result = await apiClient.calculateROI(roiData)

        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:8000/api/v1/roi/calculate/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(roiData),
          }
        )

        expect(result).toEqual({
          success: true,
          data: mockResponse,
        })
      })
    })

    describe('healthCheck', () => {
      it('makes health check request', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ status: 'healthy' }),
        } as Response)

        const result = await apiClient.healthCheck()

        expect(mockFetch).toHaveBeenCalledWith(
          'http://localhost:8000/health',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        expect(result).toEqual({
          success: true,
          data: { status: 'healthy' },
        })
      })
    })
  })

  describe('useContactForm hook', () => {
    it('returns mock response in development mode', async () => {
      process.env = { ...process.env, NODE_ENV: 'development' }
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const { submitForm } = useContactForm()
      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Corp',
        projectType: 'AI Implementation',
      }

      const result = await submitForm(formData)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Contact form submitted (dev mode):',
        formData
      )
      expect(result).toEqual({
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
      })

      consoleSpy.mockRestore()
    })

    it('calls API client in production mode', async () => {
      process.env = { ...process.env, NODE_ENV: 'production' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Success' }),
      } as Response)

      const { submitForm } = useContactForm()
      const formData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Corp',
        projectType: 'AI Implementation',
      }

      const result = await submitForm(formData)

      expect(mockFetch).toHaveBeenCalled()
      expect(result).toEqual({
        success: true,
        data: { message: 'Success' },
      })
    })
  })

  describe('useROICalculation hook', () => {
    it('returns mock data in development mode', async () => {
      process.env = { ...process.env, NODE_ENV: 'development' }
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const { calculateROI } = useROICalculation()
      const roiData: ROICalculationData = {
        company_size: 'Large',
        industry: 'Technology',
        current_processes: ['Manual data entry'],
        pain_points: ['Inefficiency'],
        budget_range: '$100k-$500k',
        timeline: '6 months',
      }

      const result = await calculateROI(roiData)

      expect(consoleSpy).toHaveBeenCalledWith(
        'ROI calculation requested (dev mode):',
        roiData
      )
      expect(result).toEqual({
        success: true,
        data: {
          estimated_savings: '$2.3M annually',
          roi_percentage: '340%',
          payback_period: '6 months',
          efficiency_gain: '65%',
        },
      })

      consoleSpy.mockRestore()
    })

    it('calls API client in production mode', async () => {
      process.env = { ...process.env, NODE_ENV: 'production' }
      const mockResponse = {
        estimated_savings: '$3M annually',
        roi_percentage: '400%',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const { calculateROI } = useROICalculation()
      const roiData: ROICalculationData = {
        company_size: 'Large',
        industry: 'Technology',
        current_processes: ['Manual data entry'],
        pain_points: ['Inefficiency'],
        budget_range: '$100k-$500k',
        timeline: '6 months',
      }

      const result = await calculateROI(roiData)

      expect(mockFetch).toHaveBeenCalled()
      expect(result).toEqual({
        success: true,
        data: mockResponse,
      })
    })
  })
})