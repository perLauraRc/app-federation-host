/* eslint-disable no-console */
import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`:: Running the following test "${testInfo.title}" ::`)
    await page.goto('/')
  })
  test.afterEach(async ({ page }, testInfo) => {
    console.log(
      `:: Test "${
        testInfo.title
      }" within URL ${page.url()} has been completed in ${
        testInfo.duration
      }ms ::`
    )
  })
  test('has correct title and layout', async ({ page }) => {
    if ((process.env.ENV && process.env.ENV === 'ci') || process.env.CI) {
      expect(page.url()).toBe('http://localhost:5173/')
    } else {
      expect(page.url()).toBe('http://app-federation:5173/')
    }
    // Verify meta title
    await expect(page).toHaveTitle(/theX/)
    // Verify layout is visible in the DOM
    await expect(page.locator('main')).toBeVisible()
    await expect(page.getByTestId('home-page')).toBeVisible()
    // Verify content is visible in the DOM
    const theXHeading = page.getByRole('heading', { name: 'TheX TheX TheX' })
    await expect(theXHeading).toBeVisible()
  })
})
