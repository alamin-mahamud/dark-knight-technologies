import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock all the components
jest.mock('@/components/header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

jest.mock('@/components/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

jest.mock('@/components/sections/hero', () => ({
  HeroSection: () => <section data-testid="hero-section">Hero Section</section>,
}))

jest.mock('@/components/sections/services', () => ({
  ServicesSection: () => <section data-testid="services-section">Services Section</section>,
}))

jest.mock('@/components/sections/social-proof', () => ({
  SocialProofSection: () => <section data-testid="social-proof-section">Social Proof Section</section>,
}))

jest.mock('@/components/case-study-preview', () => ({
  CaseStudyPreviewSection: () => <section data-testid="case-study-section">Case Study Section</section>,
}))

jest.mock('@/components/testimonials', () => ({
  TestimonialsSection: () => <section data-testid="testimonials-section">Testimonials Section</section>,
}))

describe('Home Page', () => {
  it('renders all main sections', () => {
    render(<Home />)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('services-section')).toBeInTheDocument()
    expect(screen.getByTestId('case-study-section')).toBeInTheDocument()
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument()
    expect(screen.getByTestId('social-proof-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('has correct layout structure', () => {
    const { container } = render(<Home />)

    const mainContainer = container.firstChild
    expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'flex-col')

    const main = container.querySelector('main')
    expect(main).toHaveClass('flex-1')
  })

  it('renders sections in correct order', () => {
    render(<Home />)

    const sections = [
      screen.getByTestId('header'),
      screen.getByTestId('hero-section'),
      screen.getByTestId('services-section'),
      screen.getByTestId('case-study-section'),
      screen.getByTestId('testimonials-section'),
      screen.getByTestId('social-proof-section'),
      screen.getByTestId('footer'),
    ]

    // Check that sections appear in the expected order
    for (let i = 0; i < sections.length - 1; i++) {
      expect(sections[i].compareDocumentPosition(sections[i + 1])).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      )
    }
  })

  it('contains main content area', () => {
    const { container } = render(<Home />)

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toContainElement(screen.getByTestId('hero-section'))
    expect(main).toContainElement(screen.getByTestId('services-section'))
    expect(main).toContainElement(screen.getByTestId('case-study-section'))
    expect(main).toContainElement(screen.getByTestId('testimonials-section'))
    expect(main).toContainElement(screen.getByTestId('social-proof-section'))
  })

  it('header and footer are outside main content', () => {
    const { container } = render(<Home />)

    const main = container.querySelector('main')
    expect(main).not.toContainElement(screen.getByTestId('header'))
    expect(main).not.toContainElement(screen.getByTestId('footer'))
  })
})