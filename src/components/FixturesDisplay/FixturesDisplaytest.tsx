// import { render, screen } from '@testing-library/react'
// import { describe, expect, it } from 'vitest'
// import FixturesDisplay from './FixturesDisplayDisplay'

// describe('FixturesDisplay', () => {
//   const mockFixturesDisplay = [
//     {
//       id: 1,
//       homeTeam: 'Team A',
//       awayTeam: 'Team B',
//       dateTime: '2025-09-26T15:00:00Z',
//       status: 'SCHEDULED'
//     },
//     {
//       id: 2,
//       homeTeam: 'Team C',
//       awayTeam: 'Team D',
//       dateTime: '2025-09-26T17:00:00Z',
//       status: 'LIVE',
//       score: {
//         home: 2,
//         away: 1
//       }
//     }
//   ]

//   it('renders fixtures correctly', () => {
//     render(<FixturesDisplay fixtures={mockFixturesDisplay} />)

//     // Check team names are displayed
//     expect(screen.getByText('Team A')).toBeInTheDocument()
//     expect(screen.getByText('Team B')).toBeInTheDocument()
//     expect(screen.getByText('Team C')).toBeInTheDocument()
//     expect(screen.getByText('Team D')).toBeInTheDocument()
//   })

//   it('displays match status', () => {
//     render(<FixturesDisplay fixtures={mockFixturesDisplay} />)

//     expect(screen.getByText('SCHEDULED')).toBeInTheDocument()
//     expect(screen.getByText('LIVE')).toBeInTheDocument()
//   })

//   it('shows scores when available', () => {
//     render(<FixturesDisplay fixtures={mockFixturesDisplay} />)

//     expect(screen.getByText('2')).toBeInTheDocument()
//     expect(screen.getByText('1')).toBeInTheDocument()
//   })

//   it('formats time correctly', () => {
//     render(<FixturesDisplay fixtures={mockFixturesDisplay} />)

//     const times = screen.getAllByRole('time')
//     expect(times).toHaveLength(2)
//     expect(times[0]).toHaveAttribute('dateTime', '2025-09-26T15:00:00Z')
//   })

//   it('applies custom className', () => {
//     const customClass = 'custom-fixtures'
//     const { container } = render(
//       <FixturesDisplay fixtures={mockFixturesDisplay} className={customClass} />
//     )

//     expect(container.firstChild).toHaveClass(customClass)
//   })
// })
