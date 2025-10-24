interface CircleProgressProps {
  /** Label for accessibility */
  ariaLabel?: string
  /** Background circle color (Tailwind color variable name) */
  bgColor?: string
  /** Additional class names (Tailwind syntax) */
  className?: string
  /** Progress color  (Tailwind color variable name) */
  color?: string
  /** Diameter in pixels */
  size?: number
  /** Stroke width in pixels */
  strokeWidth?: number
  /** Progress value (0-100) */
  value: number
}

const CircleProgress = ({
  ariaLabel,
  bgColor,
  className,
  color = '--color-white',
  size = 100,
  strokeWidth = 8,
  value
}: CircleProgressProps) => (
  <div data-testid="mock-circle-progress-component">
    Mock CircleProgressComponent: {ariaLabel}, {bgColor}, {className}, {color},
    {size}, {strokeWidth}, {value}
  </div>
)

export default CircleProgress
