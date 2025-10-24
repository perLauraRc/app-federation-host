interface GalleryCellProps {
  children: React.ReactNode
  description?: string
  title?: string
}

const GalleryCell = ({ children, description, title }: GalleryCellProps) => (
  <div data-testid="mock-gallery-cell-component">
    Mock GalleryCellComponent: {children && children}, {description}, {title}
  </div>
)

export default GalleryCell
