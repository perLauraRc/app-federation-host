import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running the following test: ${testInfo.title}`)
    await page.goto('/')
  })
  test.afterEach(async (_, testInfo) => {
    console.log(`Test complete: ${testInfo.title} in ${testInfo.duration}ms`)
  })
  test('has correct title and layout', async ({ page }) => {
    expect(page.url()).toBe('http://app-federation:5173/')
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
