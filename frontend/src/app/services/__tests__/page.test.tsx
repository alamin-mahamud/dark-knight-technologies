import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import ServicesPage from '../page'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <section {...props}>{children}</section>,
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

// Mock components
jest.mock('@/components/header', () => ({
  Header: () => <header data-testid="header">Header</header>
}))

jest.mock('@/components/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}))

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

describe('Services Page', () => {
  it('renders the main layout structure', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    
    const container = screen.getByTestId('header').parentElement
    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })

  it('displays the hero section', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText(/Comprehensive AI solutions/)).toBeInTheDocument()
  })

  it('displays all service cards', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('AI Implementation')).toBeInTheDocument()
    expect(screen.getByText('MLOps Setup')).toBeInTheDocument()
    expect(screen.getByText('Data Strategy')).toBeInTheDocument()
    expect(screen.getByText('Team Training')).toBeInTheDocument()
  })

  it('displays service descriptions', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('End-to-end AI solution development from strategy to deployment')).toBeInTheDocument()
    expect(screen.getByText('Complete MLOps infrastructure for scalable machine learning operations')).toBeInTheDocument()
    expect(screen.getByText('Strategic data architecture and governance for AI readiness')).toBeInTheDocument()
    expect(screen.getByText('Comprehensive training programs to empower your internal teams')).toBeInTheDocument()
  })

  it('displays service timelines and pricing', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('30 days')).toBeInTheDocument()
    expect(screen.getByText('Starting at $50K')).toBeInTheDocument()
    expect(screen.getByText('21 days')).toBeInTheDocument()
    expect(screen.getByText('Starting at $75K')).toBeInTheDocument()
  })

  it('displays service features', () => {
    renderWithTheme(<ServicesPage />)
    
    // AI Implementation features
    expect(screen.getByText('Custom AI model development')).toBeInTheDocument()
    expect(screen.getByText('API integration')).toBeInTheDocument()
    expect(screen.getByText('Performance optimization')).toBeInTheDocument()
    
    // MLOps features
    expect(screen.getByText('CI/CD pipeline setup')).toBeInTheDocument()
    expect(screen.getByText('Model monitoring')).toBeInTheDocument()
    expect(screen.getByText('Automated testing')).toBeInTheDocument()
  })

  it('displays process timeline section', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('Our Process')).toBeInTheDocument()
    expect(screen.getByText('Discovery & Strategy')).toBeInTheDocument()
    expect(screen.getByText('Development & Implementation')).toBeInTheDocument()
    expect(screen.getByText('Testing & Optimization')).toBeInTheDocument()
    expect(screen.getByText('Deployment & Support')).toBeInTheDocument()
  })

  it('displays FAQ section', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText(/How long does a typical implementation take/)).toBeInTheDocument()
    expect(screen.getByText(/What technologies do you work with/)).toBeInTheDocument()
    expect(screen.getByText(/Do you provide ongoing support/)).toBeInTheDocument()
  })

  it('displays call-to-action section', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
    expect(screen.getByText(/Let\'s discuss your project requirements/)).toBeInTheDocument()
    
    const ctaButton = screen.getByText('Schedule a Consultation')
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/contact')
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<ServicesPage />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex-1')
    
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders service cards in a grid layout', () => {
    const { container } = renderWithTheme(<ServicesPage />)
    
    const serviceGrid = container.querySelector('.grid')
    expect(serviceGrid).toBeInTheDocument()
  })

  it('displays icons for each service', () => {
    const { container } = renderWithTheme(<ServicesPage />)
    
    // Check that icons are rendered (they should be SVG elements)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders pricing information clearly', () => {
    renderWithTheme(<ServicesPage />)
    
    expect(screen.getByText(/Starting at \$50K/)).toBeInTheDocument()
    expect(screen.getByText(/Starting at \$75K/)).toBeInTheDocument()
    expect(screen.getByText(/Starting at \$40K/)).toBeInTheDocument()
    expect(screen.getByText(/Starting at \$30K/)).toBeInTheDocument()
  })

  it('includes contact information', () => {
    renderWithTheme(<ServicesPage />)
    
    const contactButtons = screen.getAllByText(/contact/i)
    expect(contactButtons.length).toBeGreaterThan(0)
  })

  it('displays feature benefits with check icons', () => {
    const { container } = renderWithTheme(<ServicesPage />)
    
    // Look for check icons or similar indicators
    const checkElements = container.querySelectorAll('[data-testid*="check"], svg[class*="check"]')
    expect(checkElements.length).toBeGreaterThan(0)
  })
})