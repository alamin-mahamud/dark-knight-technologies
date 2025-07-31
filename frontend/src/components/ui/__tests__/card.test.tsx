import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>)
      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
      expect(card).toHaveAttribute('data-slot', 'card')
      expect(card).toHaveClass('bg-card', 'text-card-foreground', 'flex', 'flex-col', 'gap-6', 'rounded-xl', 'border', 'py-6', 'shadow-sm')
    })

    it('accepts custom className', () => {
      render(<Card className="custom-class">Card</Card>)
      const card = screen.getByText('Card')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards other props', () => {
      render(<Card data-testid="test-card" aria-label="Custom card">Card</Card>)
      const card = screen.getByTestId('test-card')
      expect(card).toHaveAttribute('aria-label', 'Custom card')
    })
  })

  describe('CardHeader', () => {
    it('renders with default props', () => {
      render(<CardHeader>Header content</CardHeader>)
      const header = screen.getByText('Header content')
      expect(header).toBeInTheDocument()
      expect(header).toHaveAttribute('data-slot', 'card-header')
      expect(header).toHaveClass('@container/card-header', 'grid')
    })

    it('accepts custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>)
      const header = screen.getByText('Header')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('renders with default props', () => {
      render(<CardTitle>Title text</CardTitle>)
      const title = screen.getByText('Title text')
      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute('data-slot', 'card-title')
      expect(title).toHaveClass('font-semibold')
    })

    it('accepts custom className', () => {
      render(<CardTitle className="text-lg">Large Title</CardTitle>)
      const title = screen.getByText('Large Title')
      expect(title).toHaveClass('text-lg')
      expect(title).toHaveClass('font-semibold')
    })
  })

  describe('CardDescription', () => {
    it('renders with default props', () => {
      render(<CardDescription>Description text</CardDescription>)
      const description = screen.getByText('Description text')
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('data-slot', 'card-description')
      expect(description).toHaveClass('text-muted-foreground', 'text-sm')
    })

    it('accepts custom className', () => {
      render(<CardDescription className="text-xs">Small description</CardDescription>)
      const description = screen.getByText('Small description')
      expect(description).toHaveClass('text-xs', 'text-muted-foreground')
    })
  })

  describe('CardAction', () => {
    it('renders with default props', () => {
      render(<CardAction>Action button</CardAction>)
      const action = screen.getByText('Action button')
      expect(action).toBeInTheDocument()
      expect(action).toHaveAttribute('data-slot', 'card-action')
      expect(action).toHaveClass('col-start-2', 'row-span-2', 'row-start-1')
    })

    it('accepts custom className', () => {
      render(<CardAction className="custom-action">Action</CardAction>)
      const action = screen.getByText('Action')
      expect(action).toHaveClass('custom-action')
    })
  })

  describe('CardContent', () => {
    it('renders with default props', () => {
      render(<CardContent>Main content</CardContent>)
      const content = screen.getByText('Main content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveAttribute('data-slot', 'card-content')
      expect(content).toHaveClass('px-6')
    })

    it('accepts custom className', () => {
      render(<CardContent className="py-4">Padded content</CardContent>)
      const content = screen.getByText('Padded content')
      expect(content).toHaveClass('py-4', 'px-6')
    })
  })

  describe('CardFooter', () => {
    it('renders with default props', () => {
      render(<CardFooter>Footer content</CardFooter>)
      const footer = screen.getByText('Footer content')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('data-slot', 'card-footer')
      expect(footer).toHaveClass('flex', 'items-center', 'px-6')
    })

    it('accepts custom className', () => {
      render(<CardFooter className="justify-end">Footer</CardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer).toHaveClass('justify-end', 'flex', 'items-center', 'px-6')
    })
  })

  describe('Card composition', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Main content of the card</p>
          </CardContent>
          <CardFooter>
            <span>Footer text</span>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
      expect(screen.getByText('Main content of the card')).toBeInTheDocument()
      expect(screen.getByText('Footer text')).toBeInTheDocument()
    })
  })
})