import { render, screen, fireEvent } from '@testing-library/react'
import { useTheme } from 'next-themes'
import { ThemeToggle } from '@/components/theme-toggle'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
    })
    mockSetTheme.mockClear()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-9', 'w-9', 'rounded-full')
  })

  it('renders sun and moon icons', () => {
    const { container } = render(<ThemeToggle />)
    
    // Check for SVG icons (Sun and Moon)
    const svgElements = container.querySelectorAll('svg')
    expect(svgElements).toHaveLength(2)
  })

  it('has accessibility label', () => {
    render(<ThemeToggle />)
    
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
    expect(screen.getByText('Toggle theme')).toHaveClass('sr-only')
  })

  it('switches from light to dark theme when clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('switches from dark to light theme when clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      resolvedTheme: 'dark',
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('handles undefined theme gracefully', () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
    })

    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('applies correct button variant and size', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('has proper icon transition classes', () => {
    const { container } = render(<ThemeToggle />)
    
    const svgElements = container.querySelectorAll('svg')
    
    // Check that both icons have transition classes
    svgElements.forEach(svg => {
      expect(svg).toHaveClass('transition-all')
    })
  })

  it('renders as ghost button with correct styling', () => {
    const { container } = render(<ThemeToggle />)
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('h-9', 'w-9', 'rounded-full')
  })
})