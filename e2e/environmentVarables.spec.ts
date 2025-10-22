/* eslint-disable no-console */
import { test, expect } from '@playwright/test'

test.describe('Environment Variables', () => {
  test('has correct URL and port values per environment', async () => {
    // Verify url and port values in a specific environment with ENV equal to ci
    if (process.env.ENV && process.env.ENV === 'ci') {
      await expect(process.env.HOSTNAME).toMatch('app-federation')
      await expect(process.env.BASE_URL).toMatch('http://localhost')
      await expect(process.env.HOST_PORT).toMatch('5173')
      await expect(process.env.REMOTE_URL).toMatch('http://localhost')
      await expect(process.env.REMOTE_PORT).toMatch('5174')
    } else {
      await expect(process.env.HOSTNAME).toMatch('app-federation')
      await expect(process.env.BASE_URL).toMatch('http://app-federation')
      await expect(process.env.HOST_PORT).toMatch('5173')
      await expect(process.env.REMOTE_URL).toMatch(
        'http://app-federation-remote'
      )
      await expect(process.env.REMOTE_PORT).toMatch('5174')
    }
  })
})
