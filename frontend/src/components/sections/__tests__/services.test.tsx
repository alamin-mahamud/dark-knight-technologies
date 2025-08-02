import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { ServicesSection } from '../services'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <p {...props}>{children}</p>,
  },
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  return function Link({ children, href, ...props }: { children?: React.ReactNode; href: string; [key: string]: unknown }) {
    return (
    <a href={href} {...props}>
      {children}
    </a>
    )
  }
})

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: { children?: React.ReactNode; asChild?: boolean; [key: string]: unknown }) => {
    if (asChild) {
      return <div {...props}>{children}</div>
    }
    return <button {...props}>{children}</button>
  }
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card-content" {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <p data-testid="card-description" {...props}>{children}</p>,
  CardHeader: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card-header" {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h3 data-testid="card-title" {...props}>{children}</h3>,
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )
}

describe('ServicesSection', () => {
  it('renders the services section with correct structure', () => {
    const { container } = renderWithTheme(<ServicesSection />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-24', 'sm:py-32', 'bg-muted/50')
  })

  it('displays the main heading and description', () => {
    renderWithTheme(<ServicesSection />)
    
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText(/Comprehensive AI solutions tailored to your business needs/)).toBeInTheDocument()
  })

  it('renders all four service cards', () => {
    renderWithTheme(<ServicesSection />)
    
    expect(screen.getByText('AI Implementation')).toBeInTheDocument()
    expect(screen.getByText('MLOps Setup')).toBeInTheDocument()
    expect(screen.getByText('Data Strategy')).toBeInTheDocument()
    expect(screen.getByText('Team Training')).toBeInTheDocument()
  })

  it('displays service descriptions', () => {
    renderWithTheme(<ServicesSection />)
    
    expect(screen.getByText('End-to-end AI solution development from strategy to deployment')).toBeInTheDocument()
    expect(screen.getByText('Complete MLOps infrastructure for scalable machine learning operations')).toBeInTheDocument()
    expect(screen.getByText('Strategic data architecture and governance for AI readiness')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive training programs to empower your internal teams')).toBeInTheDocument()
  })

  it('displays service features for each card', () => {
    renderWithTheme(<ServicesSection />)
    
    // AI Implementation features
    expect(screen.getByText('Custom AI Models')).toBeInTheDocument()
    expect(screen.getByText('Integration Support')).toBeInTheDocument()
    expect(screen.getByText('Performance Optimization')).toBeInTheDocument()
    
    // MLOps features
    expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument()
    expect(screen.getByText('Model Monitoring')).toBeInTheDocument()
    expect(screen.getByText('Automated Testing')).toBeInTheDocument()
    
    // Data Strategy features
    expect(screen.getByText('Data Architecture')).toBeInTheDocument()
    expect(screen.getByText('Quality Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Privacy Compliance')).toBeInTheDocument()
    
    // Team Training features
    expect(screen.getByText('Hands-on Workshops')).toBeInTheDocument()
    expect(screen.getByText('Best Practices')).toBeInTheDocument()
    expect(screen.getByText('Ongoing Support')).toBeInTheDocument()
  })

  it('renders service cards with proper links', () => {
    renderWithTheme(<ServicesSection />)
    
    const aiImplementationLink = screen.getByText('Learn More').closest('a')
    expect(aiImplementationLink).toHaveAttribute('href', '/services/ai-implementation')
  })

  it('displays call-to-action section', () => {
    renderWithTheme(<ServicesSection />)
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
    expect(screen.getByText(/Let\'s discuss how we can transform your business/)).toBeInTheDocument()
    
    const ctaButton = screen.getByText('Schedule a Consultation')
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/contact')
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<ServicesSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toBeInTheDocument()
    
    const serviceHeadings = screen.getAllByTestId('card-title')
    expect(serviceHeadings).toHaveLength(4)
  })

  it('renders service cards in a grid layout', () => {
    const { container } = renderWithTheme(<ServicesSection />)
    
    const cardGrid = container.querySelector('.grid')
    expect(cardGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-8')
  })

  it('displays service icons', () => {
    const { container } = renderWithTheme(<ServicesSection />)
    
    // Check that icons are rendered (they should be SVG elements)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('applies hover effects to service cards', () => {
    renderWithTheme(<ServicesSection />)
    
    const cards = screen.getAllByTestId('card')
    cards.forEach(card => {
      expect(card).toHaveClass('group', 'hover:shadow-lg', 'transition-all', 'duration-300')
    })
  })

  it('renders responsive text sizes', () => {
    renderWithTheme(<ServicesSection />)
    
    const mainHeading = screen.getByRole('heading', { level: 2 })
    expect(mainHeading).toHaveClass('text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')
  })

  it('displays feature lists with check icons', () => {
    const { container } = renderWithTheme(<ServicesSection />)
    
    // Check for check mark icons next to features
    const checkIcons = container.querySelectorAll('svg[class*="check"]')
    expect(checkIcons.length).toBeGreaterThan(0)
  })

  it('centers the main content', () => {
    renderWithTheme(<ServicesSection />)
    
    const headerContent = screen.getByText('Our Services').closest('.mx-auto')
    expect(headerContent).toHaveClass('mx-auto', 'max-w-2xl', 'text-center')
  })
})