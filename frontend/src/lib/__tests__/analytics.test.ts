import {
  pageview,
  event,
  trackContactFormSubmission,
  trackROICalculation,
  trackServicePageView,
  trackCTAClick,
  trackCaseStudyView,
  isAnalyticsEnabled,
  GA_TRACKING_ID,
} from '@/lib/analytics'

// Mock window.gtag
const mockGtag = jest.fn()

describe('Analytics', () => {
  const originalWindow = global.window
  const originalProcess = process.env

  beforeEach(() => {
    // Mock window object
    Object.defineProperty(global, 'window', {
      value: {
        gtag: mockGtag,
        dataLayer: [],
      },
      writable: true,
    })
    
    // Reset environment
    process.env = { ...originalProcess }
    process.env.NEXT_PUBLIC_GA_ID = 'GA-12345'
    
    mockGtag.mockClear()
  })

  afterEach(() => {
    global.window = originalWindow
    process.env = originalProcess
  })

  describe('pageview', () => {
    it('tracks page view when gtag is available', () => {
      pageview('/test-page')
      
      expect(mockGtag).toHaveBeenCalledWith('config', 'GA-12345', {
        page_location: '/test-page',
      })
    })

    it('does not track when window is undefined', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      
      pageview('/test-page')
      
      expect(mockGtag).not.toHaveBeenCalled()
    })

    it('does not track when gtag is undefined', () => {
      Object.defineProperty(global, 'window', {
        value: { gtag: undefined },
        writable: true,
      })
      
      pageview('/test-page')
      
      expect(mockGtag).not.toHaveBeenCalled()
    })
  })

  describe('event', () => {
    it('tracks custom event with all parameters', () => {
      event({
        action: 'click',
        category: 'button',
        label: 'cta-button',
        value: 1,
      })
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: 'cta-button',
        value: 1,
      })
    })

    it('tracks custom event with minimal parameters', () => {
      event({
        action: 'click',
        category: 'button',
      })
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: undefined,
        value: undefined,
      })
    })

    it('does not track when window is undefined', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      })
      
      event({ action: 'click', category: 'button' })
      
      expect(mockGtag).not.toHaveBeenCalled()
    })
  })

  describe('trackContactFormSubmission', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Test Corp',
      projectType: 'AI Implementation',
    }

    it('tracks contact form submission event', () => {
      trackContactFormSubmission(formData)
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit', {
        event_category: 'Contact',
        event_label: 'contact_form_submission',
        value: 1,
      })
    })

    it('tracks generate_lead event with enhanced data', () => {
      trackContactFormSubmission(formData)
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'generate_lead', {
        currency: 'USD',
        value: 50000,
        project_type: 'AI Implementation',
        company: 'Test Corp',
      })
    })
  })

  describe('trackROICalculation', () => {
    const calculationData = {
      company_size: 'Large',
      industry: 'Technology',
      estimated_roi: '340%',
    }

    it('tracks ROI calculation event', () => {
      trackROICalculation(calculationData)
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'roi_calculation', {
        event_category: 'Engagement',
        event_label: 'roi_calculator_completion',
        value: 1,
      })
    })

    it('tracks view_promotion event with calculation data', () => {
      trackROICalculation(calculationData)
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'view_promotion', {
        promotion_id: 'roi_calculator',
        promotion_name: 'ROI Calculator',
        company_size: 'Large',
        industry: 'Technology',
        estimated_roi: '340%',
      })
    })
  })

  describe('trackServicePageView', () => {
    it('tracks service page view', () => {
      trackServicePageView('AI Implementation')
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        event_category: 'Services',
        event_label: 'AI Implementation',
        value: undefined,
      })
    })
  })

  describe('trackCTAClick', () => {
    it('tracks CTA click event', () => {
      trackCTAClick('hero-section', 'Get Started')
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_click', {
        event_category: 'Engagement',
        event_label: 'hero-section: Get Started',
        value: undefined,
      })
    })
  })

  describe('trackCaseStudyView', () => {
    it('tracks case study view', () => {
      trackCaseStudyView('retail-ai-transformation')
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'case_study_view', {
        event_category: 'Content',
        event_label: 'retail-ai-transformation',
        value: undefined,
      })
    })
  })

  describe('isAnalyticsEnabled', () => {
    it('returns true when GA_ID is set and not in development', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-12345'
      process.env = { ...process.env, NODE_ENV: 'production' }
      
      expect(isAnalyticsEnabled()).toBe(true)
    })

    it('returns false when GA_ID is not set', () => {
      delete process.env.NEXT_PUBLIC_GA_ID
      process.env = { ...process.env, NODE_ENV: 'production' }
      
      expect(isAnalyticsEnabled()).toBe(false)
    })

    it('returns false in development environment', () => {
      process.env.NEXT_PUBLIC_GA_ID = 'GA-12345'
      process.env = { ...process.env, NODE_ENV: 'development' }
      
      expect(isAnalyticsEnabled()).toBe(false)
    })
  })

  describe('GA_TRACKING_ID', () => {
    it('exports the correct tracking ID', () => {
      expect(GA_TRACKING_ID).toBe('GA-12345')
    })
  })
})