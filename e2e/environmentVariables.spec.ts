/* eslint-disable no-console */
import { test, expect } from '@playwright/test'

test.describe('Environment Variables', () => {
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
  test('has correct URL and port values per environment', async () => {
    // Verify url and port values in a specific environment with ENV equal to ci
    if (process.env.ENV && process.env.ENV === 'ci') {
      await expect(process.env.HOSTNAME).toMatch('app-federation')
      await expect(process.env.BASE_URL).toMatch('http://localhost')
      await expect(process.env.HOST_PORT).toMatch('5173')
      await expect(process.env.REMOTE_URL).toMatch('http://localhost')
      await expect(process.env.REMOTE_PORT).toMatch('5174')
    } else if (!process.env.CI) {
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
