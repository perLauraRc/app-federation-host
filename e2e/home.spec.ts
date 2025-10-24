/* eslint-disable no-console */
import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`:::: RUNNING THE FOLLOWING TEST "${testInfo.title}" ::::`)
    // *****************************************/
    // Listen to page console logs and errors
    // Surface page runtime problems in CI logs
    // *****************************************/
    // page.on('console', (msg) => {
    //   console.log(`&#x2757; [page console] ${msg.type()}: ${msg.text()}`)
    // })
    // page.on('pageerror', (err) => {
    //   console.error(`&#x2757; [page error]: ${err.message}`)
    // })
    // page.on('requestfailed', (req) => {
    //   console.error(
    //     `&#x274C; [request failed] ${req.method()} ${req.url()}: ${
    //       req.failure()?.errorText ?? 'unknown'
    //     }`
    //   )
    // })
    // *****************************************/
    // Listen to page console logs and errors
    // Surface page runtime problems in CI logs
    // *****************************************/
    await page.goto('/')
  })
  test.afterEach(async ({ page }, testInfo) => {
    console.log(
      `:::: TEST "${
        testInfo.title
      }" WITHIN URL ${page.url()} HAS BEEN COMPLETED IN ${
        testInfo.duration
      }ms :::::`
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
    // wait for main to exist; longer timeout in CI
    await page.waitForSelector('main', { timeout: 15000 })
    // Verify layout is visible in the DOM
    await expect(page.locator('main')).toBeVisible()
    // try {
    //   await expect(page.locator('main')).toBeVisible()
    // } catch (err) {
    //   console.error('=== CI page snapshot (first 50000 chars) ===')
    //   console.error((await page.content()).slice(0, 50000))
    //   throw err
    // }
    await expect(page.getByTestId('home-page')).toBeVisible()
    // Verify content is visible in the DOM
    const theXHeading = page.getByRole('heading', { name: 'TheX TheX TheX' })
    await expect(theXHeading).toBeVisible()
  })
})
