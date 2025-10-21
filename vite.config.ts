/* eslint-disable no-console */
/// <reference types="vitest" />
// import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { REMOTE_URL, REMOTE_PORT, HOSTNAME } from './constants'
import 'dotenv/config'

// dotenv.config()
console.log('process.env : ', JSON.stringify(process.env, null, 2))

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    federation({
      name: 'host-app',
      remotes: {
        remoteApp: `${process.env.REMOTE_URL || REMOTE_URL}:${
          process.env.REMOTE_PORT || REMOTE_PORT
        }/assets/remoteEntry.js`
      },
      shared: ['react', 'react-dom']
    })
  ],
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   setupFiles: '.vitest/setup',
  //   include: ['**/**.test.{ts,tsx}'],
  //   exclude: [
  //     ...configDefaults.exclude,
  //     '**/**.config.{js,ts,tsx}',
  //     '**/index.{ts,tsx}',
  //     '**/constants/**{ts,tsx}',
  //     '**/types/**/**{ts,tsx}',
  //     '**/*.d.ts',
  //     '**/.vitest/**',
  //     '**/mocks/**'
  //   ],
  //   coverage: {
  //     provider: 'v8', // istanbul or v8 are the preferred providers, v8 is the default provider anyway
  //     reportOnFailure: true,
  //     exclude: [
  //       ...configDefaults.exclude,
  //       '**/**.config.{js,ts,tsx}',
  //       '**/index.{ts,tsx}',
  //       '**/constants/**{ts,tsx}',
  //       '**/types/**/**{ts,tsx}',
  //       '**/*.d.ts',
  //       '**/.vitest/**',
  //       '**/mocks/**'
  //     ]
  //   }
  // },
  // preview: {
  //   host: 'localhost',
  //   port: 5173,
  //   strictPort: true,
  // },
  server: {
    host: HOSTNAME,
    port: 5173,
    strictPort: true, // Exits if the port is already in use
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // in case of using https with an invalid certificate,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (_, req) => {
            console.log('Sending Request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from:', req.url, proxyRes.statusCode)
          })
        }
      }
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false // Disables CSS combination into a single file rather than splitting it.
  }
})
