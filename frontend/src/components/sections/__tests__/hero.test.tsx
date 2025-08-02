import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { HeroSection } from '../hero'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h1 {...props}>{children}</h1>,
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

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )
}

describe('HeroSection', () => {
  it('renders the hero section with correct structure', () => {
    renderWithTheme(<HeroSection />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('relative', 'overflow-hidden', 'bg-background')
  })

  it('displays the main heading', () => {
    renderWithTheme(<HeroSection />)
    
    expect(screen.getByText('30-Day AI Implementation')).toBeInTheDocument()
    expect(screen.getByText('90% Faster Results')).toBeInTheDocument()
  })

  it('displays the hero description', () => {
    renderWithTheme(<HeroSection />)
    
    expect(screen.getByText(/Our AI\/MLOps Team-as-a-Service delivers/)).toBeInTheDocument()
    expect(screen.getByText(/enterprise-grade AI implementations in just 30 days/)).toBeInTheDocument()
  })

  it('displays the badge with sparkles icon', () => {
    renderWithTheme(<HeroSection />)
    
    expect(screen.getByText('Transform Your Business with AI')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    renderWithTheme(<HeroSection />)
    
    const primaryCTA = screen.getByText('Start Your 30-Day Implementation')
    expect(primaryCTA).toBeInTheDocument()
    expect(primaryCTA.closest('a')).toHaveAttribute('href', '/contact')
    
    const secondaryCTA = screen.getByText('View Case Studies')
    expect(secondaryCTA).toBeInTheDocument()
    expect(secondaryCTA.closest('a')).toHaveAttribute('href', '/case-studies')
  })

  it('displays feature highlights with icons', () => {
    renderWithTheme(<HeroSection />)
    
    // Check for feature titles
    expect(screen.getByText('30-Day Delivery')).toBeInTheDocument()
    expect(screen.getByText('90% Faster')).toBeInTheDocument()
    expect(screen.getByText('Guaranteed ROI')).toBeInTheDocument()
    
    // Check for feature descriptions
    expect(screen.getByText('From strategy to deployment in just one month')).toBeInTheDocument()
    expect(screen.getByText('Than traditional AI implementation approaches')).toBeInTheDocument()
    expect(screen.getByText('Measurable results or your money back')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<HeroSection />)
    
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    
    const subHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(subHeadings).toHaveLength(3) // Three feature highlights
  })

  it('applies gradient styles to key text', () => {
    renderWithTheme(<HeroSection />)
    
    const gradientText = screen.getByText('90% Faster Results')
    expect(gradientText).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-violet-600', 'bg-clip-text', 'text-transparent')
  })

  it('displays features in a grid layout', () => {
    renderWithTheme(<HeroSection />)
    
    const featureGrid = screen.getByText('30-Day Delivery').closest('.grid')
    expect(featureGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8')
  })

  it('includes decorative background element', () => {
    const { container } = renderWithTheme(<HeroSection />)
    
    const backgroundElement = container.querySelector('.absolute.inset-0.-z-10')
    expect(backgroundElement).toBeInTheDocument()
  })

  it('renders responsive text sizes', () => {
    renderWithTheme(<HeroSection />)
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveClass('text-4xl', 'sm:text-6xl')
    
    const description = screen.getByText(/Our AI\/MLOps Team-as-a-Service/)
    expect(description).toHaveClass('text-xl')
  })

  it('displays buttons with proper styling', () => {
    renderWithTheme(<HeroSection />)
    
    const buttonsContainer = screen.getByText('Start Your 30-Day Implementation').closest('.flex')
    expect(buttonsContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'justify-center')
  })
})