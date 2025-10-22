import { defineConfig, devices } from '@playwright/test'
// import { BASE_URL, HOST_PORT, REMOTE_URL, REMOTE_PORT } from './constants'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
  path: `${path.resolve(
    process.cwd(),
    // Should resolve to .env.ci file when ENV variable is set to "ci"
    // Otherwise should resolve to default .env file
    `.env${
      process.env.ENV && process.env.ENV === 'ci' ? `.${process.env.ENV}` : ''
    }`
  )}`
})
console.log(
  'path resolved for environment file : ',
  `${path.resolve(
    process.cwd(),
    `.env${
      process.env.ENV && process.env.ENV === 'ci' ? `.${process.env.ENV}` : ''
    }`
  )}`
)
// console.log(
//   'path resolved for env variables file : ',
//   JSON.stringify(process.env, null, 2)
// )

const getBaseUrl = () => {
  if (process.env.CI) {
    return 'http://localhost:5173'
  }
  return `${process.env.BASE_URL}:${process.env.HOST_PORT}`
}

export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: getBaseUrl(),
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Take screenshot on failure */
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ],

  /* Serve both host and remote applications before starting the tests */
  webServer: process.env.CI
    ? [
        {
          command: 'npm run dev',
          url: 'http://localhost:5173',
          reuseExistingServer: true,
          timeout: 2 * 60 * 1000
        }
      ]
    : [
        {
          command: 'cd ../remote && npm run build && npm run preview',
          url: `${process.env.REMOTE_URL ?? ''}:${
            process.env.REMOTE_PORT ?? ''
          }`,
          reuseExistingServer: true
        },
        {
          command: 'npm run dev',
          url: `${process.env.BASE_URL}:${process.env.HOST_PORT}`,
          reuseExistingServer: true
        }
      ]
})
