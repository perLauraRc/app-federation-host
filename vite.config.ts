/// <reference types="vitest" />
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    federation({
      name: 'host-app',
      remotes: {
        remoteApp: 'http://localhost:5174/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  server: {
    host: 'app-federation',
    port: 5173,
    open: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false // Disables CSS combination into a single file rather than splitting it.
  }
})
