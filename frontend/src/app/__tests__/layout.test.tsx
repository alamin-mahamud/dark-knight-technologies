import { render } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

// Mock Next.js components
jest.mock('next/script', () => {
  return function MockScript({ children, ...props }: React.ComponentProps<'script'>) {
    return <script {...props}>{children}</script>
  }
})

// Mock the ThemeProvider component
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}))

// Mock SEO utilities
jest.mock('@/lib/seo', () => ({
  defaultMetadata: {
    title: 'Dark Knight Technologies',
    description: 'AI Implementation & MLOps Solutions',
  },
  generateStructuredData: jest.fn(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dark Knight Technologies',
  })),
}))

describe('RootLayout', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct font classes to body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const body = container.querySelector('body')
    expect(body).toHaveClass('font-inter', 'antialiased')
  })

  it('renders ThemeProvider with correct props', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const themeProvider = getByTestId('theme-provider')
    expect(themeProvider).toHaveAttribute('attribute', 'class')
    expect(themeProvider).toHaveAttribute('defaultTheme', 'system')
    expect(themeProvider).toHaveAttribute('enableSystem', 'true')
    expect(themeProvider).toHaveAttribute('disableTransitionOnChange', 'true')
  })

  it('includes organization structured data script', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const structuredDataScript = container.querySelector('#organization-schema')
    expect(structuredDataScript).toBeInTheDocument()
    expect(structuredDataScript).toHaveAttribute('type', 'application/ld+json')
  })

  it('includes Google Analytics scripts when GA_ID is provided', () => {
    process.env.NEXT_PUBLIC_GA_ID = 'GA-12345'

    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const gaScript = container.querySelector('script[src*="googletagmanager"]')
    expect(gaScript).toBeInTheDocument()
    expect(gaScript).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=GA-12345')

    const gaConfigScript = container.querySelector('#google-analytics')
    expect(gaConfigScript).toBeInTheDocument()
  })

  it('does not include Google Analytics scripts when GA_ID is not provided', () => {
    delete process.env.NEXT_PUBLIC_GA_ID

    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const gaScript = container.querySelector('script[src*="googletagmanager"]')
    expect(gaScript).not.toBeInTheDocument()

    const gaConfigScript = container.querySelector('#google-analytics')
    expect(gaConfigScript).not.toBeInTheDocument()
  })

  it('sets correct HTML attributes', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'en')
    expect(html).toHaveAttribute('suppressHydrationWarning', 'true')
  })

  it('exports correct metadata', () => {
    expect(metadata).toBeDefined()
    expect(metadata.title).toBe('Dark Knight Technologies')
    expect(metadata.description).toBe('AI Implementation & MLOps Solutions')
  })
})