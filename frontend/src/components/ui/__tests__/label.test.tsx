import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Label } from '../label'

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label>Label text</Label>)
    const label = screen.getByText('Label text')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('data-slot', 'label')
    expect(label).toHaveClass('flex', 'items-center', 'gap-2', 'text-sm', 'leading-none', 'font-medium', 'select-none')
  })

  it('accepts custom className', () => {
    render(<Label className="text-lg font-bold">Custom Label</Label>)
    const label = screen.getByText('Custom Label')
    expect(label).toHaveClass('text-lg', 'font-bold')
  })

  it('associates with form controls via htmlFor', () => {
    render(
      <>
        <Label htmlFor="username">Username</Label>
        <input id="username" type="text" />
      </>
    )
    
    const label = screen.getByText('Username')
    const input = screen.getByRole('textbox')
    
    expect(label).toHaveAttribute('for', 'username')
    expect(input).toHaveAttribute('id', 'username')
  })

  it('can be clicked to focus associated input', async () => {
    const user = userEvent.setup()
    
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    )
    
    const label = screen.getByText('Email')
    const input = screen.getByRole('textbox')
    
    await user.click(label)
    expect(input).toHaveFocus()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('handles disabled state with group data attribute', () => {
    render(
      <div data-disabled="true" className="group">
        <Label>Disabled Label</Label>
      </div>
    )
    
    const label = screen.getByText('Disabled Label')
    expect(label).toHaveClass('group-data-[disabled=true]:pointer-events-none', 'group-data-[disabled=true]:opacity-50')
  })

  it('handles peer disabled state', () => {
    render(
      <>
        <input disabled className="peer" />
        <Label>Peer Disabled Label</Label>
      </>
    )
    
    const label = screen.getByText('Peer Disabled Label')
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-50')
  })

  it('renders children correctly', () => {
    render(
      <Label>
        <span>Icon</span>
        Label with icon
      </Label>
    )
    
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Label with icon')).toBeInTheDocument()
  })

  it('accepts all standard label attributes', () => {
    render(
      <Label
        htmlFor="test-input"
        aria-label="Custom aria label"
        data-testid="test-label"
      >
        Test Label
      </Label>
    )
    
    const label = screen.getByTestId('test-label')
    expect(label).toHaveAttribute('for', 'test-input')
    expect(label).toHaveAttribute('aria-label', 'Custom aria label')
  })

  it('maintains gap spacing for multiple children', () => {
    render(
      <Label>
        <svg />
        <span>Text with icon</span>
      </Label>
    )
    
    const label = screen.getByText('Text with icon').parentElement
    expect(label).toHaveClass('gap-2')
  })
})