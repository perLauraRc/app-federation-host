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
        'remoteApp': 'http://app-federation-remote:5174/assets/remoteEntry.js'
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
    open: true,
    // cors: {
    //   origin: '*',
    //   methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    //   allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization']
    // },
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false, // Disables minification, making the output easier to debug
    cssCodeSplit: false // Disables CSS combination into a single file rather than splitting it.
  }
})
