import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import AboutPage from '../page'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <h1 {...props}>{children}</h1>,
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
  Button: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <button {...props}>{children}</button>
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div data-testid="card-content" {...props}>{children}</div>
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {component}
    </ThemeProvider>
  )
}

describe('About Page', () => {
  it('renders the main layout structure', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    
    const container = screen.getByTestId('header').parentElement
    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })

  it('displays the hero section with main heading', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText('About Dark Knight Technologies')).toBeInTheDocument()
    expect(screen.getByText(/We're a specialized AI consulting firm/)).toBeInTheDocument()
  })

  it('displays the mission and values section', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText('Our Mission & Values')).toBeInTheDocument()
    
    // Check for values cards
    expect(screen.getByText('Excellence')).toBeInTheDocument()
    expect(screen.getByText('Innovation')).toBeInTheDocument()
    expect(screen.getByText('Integrity')).toBeInTheDocument()
    expect(screen.getByText('Partnership')).toBeInTheDocument()
  })

  it('displays team members section', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument()
    
    // Check for key team members
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Chief AI Officer')).toBeInTheDocument()
    expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Head of MLOps')).toBeInTheDocument()
  })

  it('displays company stats', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument()
  })

  it('has call-to-action section', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText('Ready to Transform Your Business?')).toBeInTheDocument()
    
    const contactButton = screen.getByText('Get in Touch')
    expect(contactButton).toBeInTheDocument()
    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact')
  })

  it('renders team member cards with expertise', () => {
    renderWithTheme(<AboutPage />)
    
    // Check for expertise areas
    expect(screen.getByText('Deep Learning')).toBeInTheDocument()
    expect(screen.getByText('MLOps')).toBeInTheDocument()
    expect(screen.getByText('Data Strategy')).toBeInTheDocument()
    expect(screen.getByText('LLMs')).toBeInTheDocument()
  })

  it('displays contact information for team members', () => {
    renderWithTheme(<AboutPage />)
    
    // Check for email links (should have mailto:)
    const emailLinks = screen.getAllByText(/darkknighttech\.com/)
    expect(emailLinks.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    renderWithTheme(<AboutPage />)
    
    // Check for main content area
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex-1')
  })

  it('renders company history and background', () => {
    renderWithTheme(<AboutPage />)
    
    expect(screen.getByText(/Founded by AI veterans/)).toBeInTheDocument()
    expect(screen.getByText(/Fortune 500 companies/)).toBeInTheDocument()
  })
})