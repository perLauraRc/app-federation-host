import { render, screen } from '@testing-library/react'
// import { render, screen } from '@testing-library/react'
// import { describe, expect, it } from 'vitest'
// import Background from './Background'
// import { AspectRatios, Sizes } from './constants/Background'

import { describe, expect, it } from 'vitest'

import { BrandHeading } from './BrandHeading'

describe('BrandHeading', () => {
  it('should render html element with "heading" role and level 1', () => {
    render(<BrandHeading />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should render "TheX" text three times (layered effect)', () => {
    render(<BrandHeading />)
    const textElements = screen.getAllByText('TheX')
    expect(textElements).toHaveLength(3)
  })

  it('should apply correct heading styles', () => {
    render(<BrandHeading />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('mt-2')
    expect(heading).toHaveClass('text-[2.5rem]/13')
    expect(heading).toHaveClass('tracking-tight')
    expect(heading).toHaveClass('text-pretty')
    expect(heading).toHaveClass('lg:text-[5rem]/20')
  })

  it('should have a skewed background container', () => {
    const { container } = render(<BrandHeading />)
    const skewedSpan = container.querySelector('span.bg-tiktok-red')
    expect(skewedSpan).toBeInTheDocument()
    expect(skewedSpan).toHaveClass('-skew-x-4')
    expect(skewedSpan).toHaveClass('-skew-y-5')
  })

  it('should render layered text with correct z-index ordering', () => {
    const { container } = render(<BrandHeading />)

    // Base layer (red background)
    const baseLayer = container.querySelector('span.bg-tiktok-red')
    expect(baseLayer).toBeInTheDocument()

    // Middle layer (white text)
    const whiteLayer = container.querySelector('span.z-2')
    expect(whiteLayer).toBeInTheDocument()
    expect(whiteLayer).toHaveClass('text-white')

    // Top layer (black text)
    const blackLayer = container.querySelector('span.z-3')
    expect(blackLayer).toBeInTheDocument()
    expect(blackLayer).toHaveClass('text-black')
  })

  it('should apply correct positioning for layered effect', () => {
    const { container } = render(<BrandHeading />)

    const whiteLayer = container.querySelector('span.z-2')
    expect(whiteLayer).toHaveClass('absolute')
    expect(whiteLayer).toHaveClass('top-1')
    expect(whiteLayer).toHaveClass('left-1')

    const blackLayer = container.querySelector('span.z-3')
    expect(blackLayer).toHaveClass('absolute')
    expect(blackLayer).toHaveClass('top-0')
    expect(blackLayer).toHaveClass('left-0')
  })

  it('should maintain consistent padding across all layers', () => {
    const { container } = render(<BrandHeading />)
    const allLayers = container.querySelectorAll('span.pt-2.pr-4.pb-2.pl-4')
    expect(allLayers).toHaveLength(3)
  })

  it('should apply font weight to all text layers', () => {
    const { container } = render(<BrandHeading />)
    const weightedSpans = container.querySelectorAll('span.font-\\[600\\]')
    expect(weightedSpans).toHaveLength(3)
  })

  it('should have relative positioning on the base layer', () => {
    const { container } = render(<BrandHeading />)
    const baseLayer = container.querySelector('span.bg-tiktok-red')
    expect(baseLayer).toHaveClass('relative')
  })
})
