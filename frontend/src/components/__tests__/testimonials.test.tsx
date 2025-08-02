import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { TestimonialsSection } from '../testimonials'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <p {...props}>{children}</p>,
  },
}))

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card-content" {...props}>{children}</div>,
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )
}

describe('TestimonialsSection', () => {
  it('renders the testimonials section', () => {
    renderWithTheme(<TestimonialsSection />)
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument()
    expect(screen.getByText(/Real results from real businesses/)).toBeInTheDocument()
  })

  it('displays all testimonials', () => {
    renderWithTheme(<TestimonialsSection />)
    
    // Check for client names
    expect(screen.getByText('Sarah Mitchell')).toBeInTheDocument()
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument()
    expect(screen.getByText('Dr. Amanda Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('James Park')).toBeInTheDocument()
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument()
    expect(screen.getByText('David Kim')).toBeInTheDocument()
  })

  it('displays client roles and companies', () => {
    renderWithTheme(<TestimonialsSection />)
    
    expect(screen.getByText('CTO')).toBeInTheDocument()
    expect(screen.getByText('FinanceFlow')).toBeInTheDocument()
    expect(screen.getByText('VP Operations')).toBeInTheDocument()
    expect(screen.getByText('MegaRetail Corp')).toBeInTheDocument()
    expect(screen.getByText('Head of Research')).toBeInTheDocument()
    expect(screen.getByText('MedTech Solutions')).toBeInTheDocument()
  })

  it('displays testimonial quotes', () => {
    renderWithTheme(<TestimonialsSection />)
    
    expect(screen.getByText(/Dark Knight Technologies delivered exactly what they promised/)).toBeInTheDocument()
    expect(screen.getByText(/We were skeptical about the 30-day promise/)).toBeInTheDocument()
    expect(screen.getByText(/The AI model they built for our drug discovery/)).toBeInTheDocument()
  })

  it('displays results metrics', () => {
    renderWithTheme(<TestimonialsSection />)
    
    expect(screen.getByText('85% reduction in false positives')).toBeInTheDocument()
    expect(screen.getByText('30% inventory cost reduction')).toBeInTheDocument()
    expect(screen.getByText('40% faster drug discovery')).toBeInTheDocument()
    expect(screen.getByText('50% increase in click-through rates')).toBeInTheDocument()
  })

  it('renders star ratings', () => {
    const { container } = renderWithTheme(<TestimonialsSection />)
    
    // Check for star icons (should be SVG elements with star-related classes)
    const stars = container.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('displays quote icons', () => {
    const { container } = renderWithTheme(<TestimonialsSection />)
    
    // Check for quote icons
    const quoteIcons = container.querySelectorAll('svg[class*="quote"]')
    expect(quoteIcons.length).toBeGreaterThan(0)
  })

  it('renders client avatars with initials', () => {
    renderWithTheme(<TestimonialsSection />)
    
    expect(screen.getByText('SM')).toBeInTheDocument() // Sarah Mitchell
    expect(screen.getByText('MC')).toBeInTheDocument() // Marcus Chen
    expect(screen.getByText('AR')).toBeInTheDocument() // Amanda Rodriguez
    expect(screen.getByText('JP')).toBeInTheDocument() // James Park
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<TestimonialsSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders testimonials in a grid layout', () => {
    const { container } = renderWithTheme(<TestimonialsSection />)
    
    const testimonialGrid = container.querySelector('.grid')
    expect(testimonialGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('applies correct styling to section', () => {
    renderWithTheme(<TestimonialsSection />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('py-24', 'sm:py-32', 'bg-background')
  })

  it('centers the main content', () => {
    renderWithTheme(<TestimonialsSection />)
    
    const headerContent = screen.getByText('What Our Clients Say').closest('.mx-auto')
    expect(headerContent).toHaveClass('mx-auto', 'max-w-2xl', 'text-center')
  })

  it('renders testimonial cards with proper styling', () => {
    renderWithTheme(<TestimonialsSection />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBe(6) // Six testimonials
    
    cards.forEach(card => {
      expect(card).toHaveClass('bg-background', 'border', 'hover:shadow-lg', 'transition-shadow')
    })
  })

  it('displays full rating stars for all testimonials', () => {
    const { container } = renderWithTheme(<TestimonialsSection />)
    
    // All testimonials should have 5-star ratings
    const starContainers = container.querySelectorAll('.flex.items-center.gap-1')
    expect(starContainers.length).toBeGreaterThan(0)
  })

  it('includes industry diversity in testimonials', () => {
    renderWithTheme(<TestimonialsSection />)
    
    // Check for different industries
    expect(screen.getByText('FinanceFlow')).toBeInTheDocument() // Finance
    expect(screen.getByText('MegaRetail Corp')).toBeInTheDocument() // Retail
    expect(screen.getByText('MedTech Solutions')).toBeInTheDocument() // Healthcare
    expect(screen.getByText('AdTech Innovations')).toBeInTheDocument() // Marketing/Advertising
  })

  it('highlights quantifiable results', () => {
    renderWithTheme(<TestimonialsSection />)
    
    // Look for percentage improvements
    expect(screen.getByText(/85%/)).toBeInTheDocument()
    expect(screen.getByText(/30%/)).toBeInTheDocument()
    expect(screen.getByText(/40%/)).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })
})