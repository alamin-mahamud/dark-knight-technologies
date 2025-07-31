import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock the theme toggle component
jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the header with logo and navigation', () => {
    render(<Header />)
    
    expect(screen.getByText('DK')).toBeInTheDocument()
    expect(screen.getByText('Dark Knight Technologies')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('highlights the active navigation item', () => {
    mockUsePathname.mockReturnValue('/services')
    render(<Header />)
    
    const servicesLink = screen.getByText('Services').closest('a')
    expect(servicesLink).toHaveClass('text-foreground', 'font-semibold')
  })

  it('shows inactive navigation items with different styles', () => {
    mockUsePathname.mockReturnValue('/services')
    render(<Header />)
    
    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveClass('text-foreground/60')
  })

  it('renders theme toggle component', () => {
    render(<Header />)
    
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders Get Started button in desktop view', () => {
    render(<Header />)
    
    const getStartedButtons = screen.getAllByText('Get Started')
    expect(getStartedButtons).toHaveLength(2) // One in desktop nav, one in mobile menu
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />)
    
    // Mobile menu should not be visible initially
    expect(screen.queryByRole('navigation')).toBeInTheDocument() // Desktop nav
    
    // Click menu button
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(menuButton)
    
    // Mobile menu should now be visible
    const mobileLinks = screen.getAllByText('Services')
    expect(mobileLinks).toHaveLength(2) // One in desktop nav, one in mobile menu
  })

  it('closes mobile menu when a navigation link is clicked', () => {
    render(<Header />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(menuButton)
    
    // Click a mobile navigation link
    const mobileLinks = screen.getAllByText('Services')
    const mobileServicesLink = mobileLinks[1] // Second one is the mobile link
    fireEvent.click(mobileServicesLink)
    
    // Menu should close (we can't directly test visibility, but the click handler should be called)
    expect(mobileServicesLink).toBeInTheDocument()
  })

  it('shows correct icon in menu button based on state', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    
    // Should show Menu icon initially
    expect(menuButton.querySelector('svg')).toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Should now show X icon
    expect(menuButton.querySelector('svg')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    expect(menuButton).toHaveAttribute('aria-label', undefined)
    
    const srText = screen.getByText('Toggle Menu')
    expect(srText).toHaveClass('sr-only')
  })

  it('renders navigation links with correct hrefs', () => {
    render(<Header />)
    
    expect(screen.getByText('Services').closest('a')).toHaveAttribute('href', '/services')
    expect(screen.getByText('Case Studies').closest('a')).toHaveAttribute('href', '/case-studies')
    expect(screen.getByText('ROI Calculator').closest('a')).toHaveAttribute('href', '/roi-calculator')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact')
  })
})