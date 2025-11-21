import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { LocationsList } from './Posts'
import type { Location } from '@src/types'

const mockLocations: Location[] = [
  {
    description: 'A beautiful beach destination',
    id: '1',
    name: 'Miami Beach',
    photo: 'https://example.com/miami.jpg'
  },
  {
    description: 'Historic mountain village',
    id: '2',
    name: 'Alpine Resort',
    photo: 'https://example.com/alpine.jpg'
  }
]

describe('LocationsList', () => {
  it('renders loading state when loading prop is true', () => {
    // Arrange & Act
    render(<LocationsList loading={true} locations={[]} />)

    // Assert
    expect(screen.getByTestId('locations-loading')).toBeInTheDocument()
    expect(screen.getByText('Loading locations...')).toBeInTheDocument()
  })

  it('renders empty state when no locations provided', () => {
    // Arrange & Act
    render(<LocationsList locations={[]} />)

    // Assert
    expect(screen.getByTestId('locations-empty')).toBeInTheDocument()
    expect(screen.getByText('No locations available.')).toBeInTheDocument()
  })

  it('renders list of locations with all data', () => {
    // Arrange & Act
    render(<LocationsList locations={mockLocations} />)

    // Assert
    expect(screen.getByTestId('locations-list')).toBeInTheDocument()
    expect(screen.getByTestId('location-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('location-item-2')).toBeInTheDocument()
    expect(screen.getByText('Miami Beach')).toBeInTheDocument()
    expect(screen.getByText('Alpine Resort')).toBeInTheDocument()
    expect(
      screen.getByText('A beautiful beach destination')
    ).toBeInTheDocument()
    expect(screen.getByText('Historic mountain village')).toBeInTheDocument()
  })

  it('renders images with correct alt text', () => {
    // Arrange & Act
    render(<LocationsList locations={mockLocations} />)

    // Assert
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    expect(images[0]).toHaveAttribute('alt', 'Miami Beach photo')
    expect(images[1]).toHaveAttribute('alt', 'Alpine Resort photo')
  })

  it('renders without images when photo is missing', () => {
    // Arrange
    const locationsWithoutPhotos: Location[] = [
      {
        description: 'No photo available',
        id: '3',
        name: 'Mystery Location',
        photo: ''
      }
    ]

    // Act
    render(<LocationsList locations={locationsWithoutPhotos} />)

    // Assert
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Mystery Location')).toBeInTheDocument()
  })

  it('renders without description when description is missing', () => {
    // Arrange
    const locationsWithoutDescription: Location[] = [
      {
        description: '',
        id: '4',
        name: 'Simple Location',
        photo: 'https://example.com/simple.jpg'
      }
    ]

    // Act
    render(<LocationsList locations={locationsWithoutDescription} />)

    // Assert
    expect(screen.getByText('Simple Location')).toBeInTheDocument()
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    // Arrange & Act
    render(<LocationsList locations={mockLocations} />)

    // Assert
    const section = screen.getByRole('region', { name: 'Locations list' })
    expect(section).toBeInTheDocument()
  })
})
