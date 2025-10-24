type Size = 'small' | 'medium' | 'large' | 'full'
type AspectRatio = '1/1' | '3/2' | '4/3' | '16/9'

interface BackgroundProps {
  aspectRatio?: AspectRatio
  position?: 'absolute' | 'relative'
  size?: Size
  src?: string
}

const Background = ({
  aspectRatio,
  position,
  size = 'small',
  src
}: BackgroundProps) => (
  <div data-testid="mock-background-component">
    Mock BackgroundComponent: {aspectRatio}, {position}, {size}, {src}
  </div>
)

export default Background
