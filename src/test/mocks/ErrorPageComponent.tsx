interface ErrorPageProps {
  /** Optional action component (e.g., button) */
  action?: React.ReactNode
  /** Detailed error message */
  message?: string
  /** Error status code */
  status?: number
  /** Main error title */
  title: string
}

const ErrorPage = ({
  action,
  message = 'An unexpected error occurred. Please try again later.',
  status,
  title
}: ErrorPageProps) => (
  <div data-testid="mock-error-page-component">
    Mock ErrorPageComponent: {action && 'action'}, {message}, {status}, {title}
  </div>
)

export default ErrorPage
