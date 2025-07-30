import { Metadata } from 'next'

const siteConfig = {
  name: 'Dark Knight Technologies',
  description: '30-Day AI Implementation | 90% Faster Results. Transform your business with our AI/MLOps Team-as-a-Service. Enterprise-grade AI solutions delivered in just 30 days.',
  url: 'https://darkknighttech.com',
  ogImage: 'https://darkknighttech.com/og-image.jpg',
  creator: '@darkknighttech',
  keywords: [
    'AI implementation',
    'MLOps',
    'artificial intelligence',
    'machine learning',
    'business transformation',
    'enterprise AI',
    'AI consulting',
    'data strategy',
    'automation',
    'digital transformation'
  ]
}

export function createMetadata({
  title,
  description,
  image,
  url,
  keywords = [],
  noIndex = false,
}: {
  title: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  noIndex?: boolean
}): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`
  const fullDescription = description || siteConfig.description
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const fullImage = image || siteConfig.ogImage
  const allKeywords = [...siteConfig.keywords, ...keywords]

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.creator,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}

export function generateStructuredData({
  type = 'Organization',
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  logo = `${siteConfig.url}/logo.png`,
  contactPoint,
  services,
}: {
  type?: 'Organization' | 'Service' | 'Article' | 'WebPage'
  name?: string
  description?: string
  url?: string
  logo?: string
  contactPoint?: {
    telephone: string
    email: string
    contactType: string
  }
  services?: string[]
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
  }

  if (type === 'Organization') {
    return {
      ...baseSchema,
      '@type': 'Organization',
      foundingDate: '2021',
      industry: 'Artificial Intelligence',
      numberOfEmployees: '10-50',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'Remote',
      },
      contactPoint: contactPoint ? {
        '@type': 'ContactPoint',
        telephone: contactPoint.telephone,
        email: contactPoint.email,
        contactType: contactPoint.contactType,
      } : undefined,
      sameAs: [
        'https://linkedin.com/company/darkknighttech',
        'https://twitter.com/darkknighttech',
      ],
      offers: services?.map(service => ({
        '@type': 'Offer',
        name: service,
        category: 'AI Implementation Services',
      })),
    }
  }

  if (type === 'Service') {
    return {
      ...baseSchema,
      '@type': 'Service',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      serviceType: 'AI Implementation',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Services',
        itemListElement: services?.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service,
          },
          position: index + 1,
        })),
      },
    }
  }

  return baseSchema
}

export const defaultMetadata = createMetadata({
  title: siteConfig.name,
})

export { siteConfig }