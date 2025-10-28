import type { Match } from '@src/types'

interface FixturesCarouselProps {
  // Auto-advance interval in ms (disabled if 0)
  autoScrollInterval?: number
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** List of fixture objects (required) */
  fixtures: Match[]
  /** Callback when fixture clicked */
  onSelect?: () => void
  /** Approximate number of visible cards (default 3) */
  visibleCount?: number
}

const FixturesCarousel = ({
  autoScrollInterval = 0,
  className,
  fixtures,
  onSelect,
  visibleCount = 2
}: FixturesCarouselProps) => (
  <div data-testid="mock-fixtures-carousel-component">
    Mock FixturesCarouselComponent: {autoScrollInterval}, {className},{' '}
    {fixtures.length}, {onSelect && 'onSelect'}, {visibleCount}
  </div>
)

export default FixturesCarousel
