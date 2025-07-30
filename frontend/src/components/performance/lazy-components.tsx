"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components for better performance
export const LazyROICalculator = dynamic(
  () => import('@/components/roi-calculator').then(mod => ({ default: mod.ROICalculator })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    ),
    ssr: false,
  }
)

export const LazyTestimonialsSection = dynamic(
  () => import('@/components/testimonials').then(mod => ({ default: mod.TestimonialsSection })),
  {
    loading: () => (
      <div className="h-64 bg-muted/50 animate-pulse rounded-lg"></div>
    ),
  }
)

export const LazyCaseStudyPreview = dynamic(
  () => import('@/components/case-study-preview').then(mod => ({ default: mod.CaseStudyPreviewSection })),
  {
    loading: () => (
      <div className="h-96 bg-muted/50 animate-pulse rounded-lg"></div>
    ),
  }
)

// Wrapper component with Suspense
export function LazyComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      {children}
    </Suspense>
  )
}