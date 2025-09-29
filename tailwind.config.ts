/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,css}',
    '../remote/src/components/**/*.{js,jsx,ts,tsx}' // Include remote app exposed components so Tailwind generates utility classes at build time based on the files it scans
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
}
