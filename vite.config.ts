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
        remoteApp: 'http://app-federation-remote:5174/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   setupFiles: '.vitest/setup',
  //   include: ['**/test.{ts,tsx}']
  // },
  // preview: {
  //   host: 'localhost',
  //   port: 5173,
  //   strictPort: true,
  // },
  server: {
    host: 'app-federation',
    port: 5173,
    strictPort: true, // Exits if the port is already in use
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // in case of using https with an invalid certificate,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
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
