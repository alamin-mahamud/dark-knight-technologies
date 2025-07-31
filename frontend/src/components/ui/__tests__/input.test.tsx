import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('data-slot', 'input')
    expect(input).toHaveClass('h-9', 'w-full', 'rounded-md', 'border')
  })

  it('renders different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" placeholder="Number" />)
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number')

    rerender(<Input type="search" placeholder="Search" />)
    expect(screen.getByPlaceholderText('Search')).toHaveAttribute('type', 'search')
  })

  it('accepts custom className', () => {
    render(<Input className="custom-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('handles value changes', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'Hello')
    expect(handleChange).toHaveBeenCalledTimes(5)
    expect(input).toHaveValue('Hello')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:pointer-events-none', 'disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('shows placeholder text', () => {
    render(<Input placeholder="Enter your name" />)
    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('accepts aria attributes', () => {
    render(
      <Input
        aria-label="Username"
        aria-describedby="username-help"
        aria-invalid="true"
      />
    )
    
    const input = screen.getByLabelText('Username')
    expect(input).toHaveAttribute('aria-describedby', 'username-help')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('aria-invalid:border-destructive')
  })

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const user = userEvent.setup()
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('accepts min and max for number inputs', () => {
    render(<Input type="number" min="0" max="100" />)
    const input = screen.getByRole('spinbutton')
    
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '100')
  })

  it('accepts pattern attribute', () => {
    render(<Input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}')
  })

  it('can be required', () => {
    render(<Input required />)
    const input = screen.getByRole('textbox')
    
    expect(input).toBeRequired()
  })

  it('accepts name attribute', () => {
    render(<Input name="username" />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('name', 'username')
  })

  it('has focus styles', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('focus-visible:border-ring', 'focus-visible:ring-ring/50', 'focus-visible:ring-[3px]')
  })
})