/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R
    toHaveClass(...classNames: string[]): R
    toHaveAttribute(attr: string, value?: string): R
    toHaveValue(value: string | number | string[]): R
    toBeDisabled(): R
    toBeRequired(): R
    toHaveFocus(): R
    toContainElement(element: HTMLElement | null): R
  }
}