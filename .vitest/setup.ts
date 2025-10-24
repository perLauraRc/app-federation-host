import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'mocked data' }),
    text: () => Promise.resolve('mocked text'),
    status: 200
  })
) as any

// Clean up after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
