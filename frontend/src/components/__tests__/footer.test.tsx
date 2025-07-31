import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

// Mock the current year to ensure consistent tests
jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024)

describe('Footer', () => {
  it('renders company logo and name', () => {
    render(<Footer />)
    
    expect(screen.getByText('DK')).toBeInTheDocument()
    expect(screen.getByText('Dark Knight Technologies')).toBeInTheDocument()
  })

  it('renders company description', () => {
    render(<Footer />)
    
    expect(screen.getByText(/Transforming businesses with AI implementations 90% faster/)).toBeInTheDocument()
  })

  it('renders main navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders service navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('AI Implementation')).toBeInTheDocument()
    expect(screen.getByText('MLOps Setup')).toBeInTheDocument()
    expect(screen.getByText('Data Strategy')).toBeInTheDocument()
    expect(screen.getByText('Team Training')).toBeInTheDocument()
  })

  it('renders legal navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  })

  it('renders social media links with correct hrefs', () => {
    render(<Footer />)
    
    const emailLink = screen.getByLabelText('Email')
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@darkknighttech.com')
    
    const twitterLink = screen.getByLabelText('Twitter')
    expect(twitterLink).toHaveAttribute('href', '#')
    
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('href', '#')
    
    const linkedinLink = screen.getByLabelText('LinkedIn')
    expect(linkedinLink).toHaveAttribute('href', '#')
  })

  it('renders navigation links with correct hrefs', () => {
    render(<Footer />)
    
    const servicesLink = screen.getByText('Services').closest('a')
    expect(servicesLink).toHaveAttribute('href', '/services')
    
    const caseStudiesLink = screen.getByText('Case Studies').closest('a')
    expect(caseStudiesLink).toHaveAttribute('href', '/case-studies')
    
    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
    
    const contactLink = screen.getByText('Contact').closest('a')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders service links with correct hrefs', () => {
    render(<Footer />)
    
    const aiImplementationLink = screen.getByText('AI Implementation').closest('a')
    expect(aiImplementationLink).toHaveAttribute('href', '/services/ai-implementation')
    
    const mlopsLink = screen.getByText('MLOps Setup').closest('a')
    expect(mlopsLink).toHaveAttribute('href', '/services/mlops')
    
    const dataStrategyLink = screen.getByText('Data Strategy').closest('a')
    expect(dataStrategyLink).toHaveAttribute('href', '/services/data-strategy')
    
    const trainingLink = screen.getByText('Team Training').closest('a')
    expect(trainingLink).toHaveAttribute('href', '/services/training')
  })

  it('renders legal links with correct hrefs', () => {
    render(<Footer />)
    
    const privacyLink = screen.getByText('Privacy Policy').closest('a')
    expect(privacyLink).toHaveAttribute('href', '/privacy')
    
    const termsLink = screen.getByText('Terms of Service').closest('a')
    expect(termsLink).toHaveAttribute('href', '/terms')
    
    const cookiesLink = screen.getByText('Cookie Policy').closest('a')
    expect(cookiesLink).toHaveAttribute('href', '/cookies')
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    
    expect(screen.getByText('© 2024 Dark Knight Technologies. All rights reserved.')).toBeInTheDocument()
  })

  it('renders technology credits', () => {
    render(<Footer />)
    
    expect(screen.getByText('Built with Next.js and Tailwind CSS')).toBeInTheDocument()
  })

  it('has proper grid layout classes', () => {
    const { container } = render(<Footer />)
    
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-4', 'gap-8')
  })

  it('renders social icons with accessibility labels', () => {
    render(<Footer />)
    
    // Check that each social link has screen reader text
    expect(screen.getByText('Twitter')).toHaveClass('sr-only')
    expect(screen.getByText('GitHub')).toHaveClass('sr-only')
    expect(screen.getByText('LinkedIn')).toHaveClass('sr-only')
    expect(screen.getByText('Email')).toHaveClass('sr-only')
  })

  it('applies correct styling classes', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-background', 'border-t')
    
    const bottomSection = container.querySelector('.border-t.border-border')
    expect(bottomSection).toBeInTheDocument()
  })
})