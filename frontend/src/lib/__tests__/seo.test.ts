import { createMetadata, defaultMetadata, generateStructuredData } from '../seo'

describe('SEO utilities', () => {
  describe('createMetadata', () => {
    it('creates metadata with required title', () => {
      const metadata = createMetadata({
        title: 'Test Page'
      })

      expect(metadata.title).toBe('Test Page | Dark Knight Technologies')
      expect(metadata.description).toBe('30-Day AI Implementation | 90% Faster Results. Transform your business with our AI/MLOps Team-as-a-Service. Enterprise-grade AI solutions delivered in just 30 days.')
    })

    it('uses site name as title when title matches site name', () => {
      const metadata = createMetadata({
        title: 'Dark Knight Technologies'
      })

      expect(metadata.title).toBe('Dark Knight Technologies')
    })

    it('creates metadata with custom description', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        description: 'Custom description'
      })

      expect(metadata.description).toBe('Custom description')
    })

    it('creates metadata with custom image', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        image: 'https://example.com/custom-image.jpg'
      })

      expect(metadata.openGraph?.images).toContain('https://example.com/custom-image.jpg')
    })

    it('creates metadata with custom URL', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        url: '/test-page'
      })

      expect(metadata.openGraph?.url).toBe('https://darkknighttech.com/test-page')
    })

    it('merges custom keywords with default keywords', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        keywords: ['test', 'custom']
      })

      expect(metadata.keywords).toContain('AI implementation')
      expect(metadata.keywords).toContain('test')
      expect(metadata.keywords).toContain('custom')
    })

    it('sets noIndex when specified', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        noIndex: true
      })

      expect(metadata.robots).toBe('noindex, nofollow')
    })

    it('creates proper OpenGraph metadata', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        description: 'Test description',
        url: '/test'
      })

      expect(metadata.openGraph).toEqual({
        title: 'Test Page | Dark Knight Technologies',
        description: 'Test description',
        url: 'https://darkknighttech.com/test',
        siteName: 'Dark Knight Technologies',
        images: ['https://darkknighttech.com/og-image.jpg'],
        locale: 'en_US',
        type: 'website'
      })
    })

    it('creates proper Twitter metadata', () => {
      const metadata = createMetadata({
        title: 'Test Page',
        description: 'Test description'
      })

      expect(metadata.twitter).toEqual({
        card: 'summary_large_image',
        title: 'Test Page | Dark Knight Technologies',
        description: 'Test description',
        creator: '@darkknighttech',
        images: ['https://darkknighttech.com/og-image.jpg']
      })
    })

    it('includes proper metadata structure', () => {
      const metadata = createMetadata({
        title: 'Test Page'
      })

      expect(metadata.authors).toEqual([{ name: 'Dark Knight Technologies' }])
      expect(metadata.creator).toBe('@darkknighttech')
      expect(metadata.robots).toBe('index, follow')
      expect(metadata.viewport).toBe('width=device-width, initial-scale=1')
    })
  })

  describe('defaultMetadata', () => {
    it('exports default metadata', () => {
      expect(defaultMetadata).toBeDefined()
      expect(defaultMetadata.title).toBe('Dark Knight Technologies')
      expect(defaultMetadata.description).toBe('30-Day AI Implementation | 90% Faster Results. Transform your business with our AI/MLOps Team-as-a-Service. Enterprise-grade AI solutions delivered in just 30 days.')
    })

    it('includes all required metadata fields', () => {
      expect(defaultMetadata.keywords).toContain('AI implementation')
      expect(defaultMetadata.openGraph).toBeDefined()
      expect(defaultMetadata.twitter).toBeDefined()
      expect(defaultMetadata.authors).toBeDefined()
    })
  })

  describe('generateStructuredData', () => {
    it('generates Organization structured data', () => {
      const structuredData = generateStructuredData({
        type: 'Organization',
        contactPoint: {
          telephone: '+1-555-123-4567',
          email: 'hello@darkknighttech.com',
          contactType: 'Customer Service'
        },
        services: ['AI Implementation', 'MLOps Setup']
      })

      expect(structuredData['@context']).toBe('https://schema.org')
      expect(structuredData['@type']).toBe('Organization')
      expect(structuredData.name).toBe('Dark Knight Technologies')
      expect(structuredData.url).toBe('https://darkknighttech.com')
      expect(structuredData.contactPoint).toEqual({
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        email: 'hello@darkknighttech.com',
        contactType: 'Customer Service'
      })
    })

    it('generates Article structured data', () => {
      const structuredData = generateStructuredData({
        type: 'Article',
        headline: 'Test Article',
        datePublished: '2024-01-01',
        dateModified: '2024-01-02',
        author: 'John Doe',
        description: 'Test article description'
      })

      expect(structuredData['@type']).toBe('Article')
      expect(structuredData.headline).toBe('Test Article')
      expect(structuredData.datePublished).toBe('2024-01-01')
      expect(structuredData.dateModified).toBe('2024-01-02')
      expect(structuredData.author).toEqual({
        '@type': 'Person',
        name: 'John Doe'
      })
    })

    it('generates Service structured data', () => {
      const structuredData = generateStructuredData({
        type: 'Service',
        name: 'AI Implementation',
        description: 'Complete AI solution development',
        provider: 'Dark Knight Technologies',
        serviceType: 'AI Consulting'
      })

      expect(structuredData['@type']).toBe('Service')
      expect(structuredData.name).toBe('AI Implementation')
      expect(structuredData.description).toBe('Complete AI solution development')
      expect(structuredData.provider).toEqual({
        '@type': 'Organization',
        name: 'Dark Knight Technologies'
      })
    })

    it('generates WebPage structured data', () => {
      const structuredData = generateStructuredData({
        type: 'WebPage',
        name: 'About Us',
        description: 'Learn about our company',
        url: '/about'
      })

      expect(structuredData['@type']).toBe('WebPage')
      expect(structuredData.name).toBe('About Us')
      expect(structuredData.description).toBe('Learn about our company')
      expect(structuredData.url).toBe('https://darkknighttech.com/about')
    })

    it('generates FAQ structured data', () => {
      const faqs = [
        {
          question: 'What is AI implementation?',
          answer: 'AI implementation is the process of integrating artificial intelligence solutions into business operations.'
        },
        {
          question: 'How long does implementation take?',
          answer: 'Our standard implementation takes 30 days from start to finish.'
        }
      ]

      const structuredData = generateStructuredData({
        type: 'FAQ',
        faqs
      })

      expect(structuredData['@type']).toBe('FAQPage')
      expect(structuredData.mainEntity).toHaveLength(2)
      expect(structuredData.mainEntity[0]['@type']).toBe('Question')
      expect(structuredData.mainEntity[0].name).toBe('What is AI implementation?')
      expect(structuredData.mainEntity[0].acceptedAnswer).toEqual({
        '@type': 'Answer',
        text: 'AI implementation is the process of integrating artificial intelligence solutions into business operations.'
      })
    })

    it('includes common organization properties', () => {
      const structuredData = generateStructuredData({
        type: 'Organization'
      })

      expect(structuredData.name).toBe('Dark Knight Technologies')
      expect(structuredData.url).toBe('https://darkknighttech.com')
      expect(structuredData.logo).toBe('https://darkknighttech.com/logo.png')
      expect(structuredData.description).toBe('30-Day AI Implementation | 90% Faster Results. Transform your business with our AI/MLOps Team-as-a-Service. Enterprise-grade AI solutions delivered in just 30 days.')
    })

    it('handles missing optional properties gracefully', () => {
      const structuredData = generateStructuredData({
        type: 'Article',
        headline: 'Test Article'
      })

      expect(structuredData.headline).toBe('Test Article')
      expect(structuredData.author).toBeUndefined()
      expect(structuredData.datePublished).toBeUndefined()
    })
  })
})