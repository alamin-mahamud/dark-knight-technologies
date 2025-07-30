// Google Analytics 4 conversion tracking
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_location: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Conversion tracking functions
export const trackContactFormSubmission = (formData: {
  name: string;
  email: string;
  company: string;
  projectType: string;
}) => {
  event({
    action: 'form_submit',
    category: 'Contact',
    label: 'contact_form_submission',
    value: 1,
  });
  
  // Enhanced conversion tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 50000, // Average deal value
      project_type: formData.projectType,
      company: formData.company,
    });
  }
};

export const trackROICalculation = (calculationData: {
  company_size: string;
  industry: string;
  estimated_roi: string;
}) => {
  event({
    action: 'roi_calculation',
    category: 'Engagement',
    label: 'roi_calculator_completion',
    value: 1,
  });
  
  // Track high-value interactions
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_promotion', {
      promotion_id: 'roi_calculator',
      promotion_name: 'ROI Calculator',
      company_size: calculationData.company_size,
      industry: calculationData.industry,
      estimated_roi: calculationData.estimated_roi,
    });
  }
};

export const trackServicePageView = (serviceName: string) => {
  event({
    action: 'page_view',
    category: 'Services',
    label: serviceName,
  });
};

export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  event({
    action: 'cta_click',
    category: 'Engagement',
    label: `${ctaLocation}: ${ctaText}`,
  });
};

export const trackCaseStudyView = (caseStudyId: string) => {
  event({
    action: 'case_study_view',
    category: 'Content',
    label: caseStudyId,
  });
};

// Utility to check if analytics is enabled
export const isAnalyticsEnabled = () => {
  return !(!GA_TRACKING_ID || process.env.NODE_ENV === 'development');
};