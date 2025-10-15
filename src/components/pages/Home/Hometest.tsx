// import { render, screen } from '@testing-library/react'
// import ErrorPage from './ErrorPage'

// describe('ErrorPage', () => {
//   it('renders default error message', () => {
//     render(<ErrorPage />)
//     expect(screen.getByText('Something went wrong')).toBeInTheDocument()
//     expect(
//       screen.getByText('An unexpected error occurred. Please try again later.')
//     ).toBeInTheDocument()
//     expect(screen.getByText('Error')).toBeInTheDocument()
//   })

//   it('renders custom error message and status code', () => {
//     render(
//       <ErrorPage
//         title="404 Not Found"
//         message="Page not found."
//         statusCode={404}
//       />
//     )
//     expect(screen.getByText('404')).toBeInTheDocument()
//     expect(screen.getByText('404 Not Found')).toBeInTheDocument()
//     expect(screen.getByText('Page not found.')).toBeInTheDocument()
//   })
// })
