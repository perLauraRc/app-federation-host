import { defineConfig, configDefaults } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/**.test.{ts,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '**/**.config.{js,ts,tsx}',
      '**/index.{ts,tsx}',
      '**/constants/**{ts,tsx}',
      '**/types/**/**{ts,tsx}',
      '**/*.d.ts',
      '**/.vitest/**',
      '**/mocks/**'
    ],
    coverage: {
      provider: 'v8', // istanbul or v8 are the preferred providers, v8 is the default provider anyway
      reportOnFailure: true,
      exclude: [
        ...configDefaults.exclude,
        '**/**.config.{js,ts,tsx}',
        '**/index.{ts,tsx}',
        '**/constants/**{ts,tsx}',
        '**/types/**/**{ts,tsx}',
        '**/*.d.ts',
        '**/.vitest/**',
        '**/mocks/**'
      ]
    }
  },
  resolve: {
    alias: {
      // Add @ path alias
      '@': resolve(__dirname, './src'),
      // Mock for SVG imports
      '@/assets/thex.svg': resolve(__dirname, './src/test/mocks/svgMock.tsx'),
      // Mock for ESM imports
      '@/components/pages/Home/Home': resolve(
        __dirname,
        './src/test/mocks/HomeComponent.tsx'
      ),
      'https://esm.sh/canvas-confetti@1.6.0': resolve(
        __dirname,
        './src/test/mocks/confettiModule.ts'
      ),
      // Mocks for Module Federation remote components
      'remoteApp/Background': resolve(
        __dirname,
        './src/test/mocks/BackgroundComponent.tsx'
      ),
      'remoteApp/CircleProgress': resolve(
        __dirname,
        './src/test/mocks/CircleProgressComponent.tsx'
      ),
      'remoteApp/ErrorPage': resolve(
        __dirname,
        './src/test/mocks/ErrorPageComponent.tsx'
      ),
      'remoteApp/FixturesCarousel': resolve(
        __dirname,
        './src/test/mocks/FixturesCarouselComponent.tsx'
      )
    }
  }
})
