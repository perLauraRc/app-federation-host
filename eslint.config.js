import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptEslint from 'typescript-eslint'
// import typescriptEslintParser from '@typescript-eslint/parser'
import tailwindcss from 'eslint-plugin-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { globalIgnores } from 'eslint/config'
import fs from 'node:fs'
import path from 'node:path'

const tailwindConfigPath = path.resolve(process.cwd(), 'tailwind.config.ts')
const indexCssPath = path.resolve(process.cwd(), 'src/index.css')

// Reads index.css at build time and extracts custom color tokens from CSS @theme block
let customColorTokens = []
try {
  const css = fs.readFileSync(indexCssPath, 'utf8')
  // Collects color token names from index.css file scanning custom properties like: --color-cerulean: #325877;
  customColorTokens = Array.from(
    css.matchAll(/--color-([a-z0-9-]+)\s*:/gi),
    (m) => m[1]
  )
} catch {
  customColorTokens = []
}

// Tailwind utilities that accept colors
const colorUtilities = [
  'bg',
  'text',
  'border',
  'outline',
  'ring',
  'ring-offset',
  'fill',
  'stroke',
  'caret',
  'accent',
  'divide',
  'decoration',
  'from',
  'via',
  'to'
]

// Optional alpha suffixes
const alphaSuffixes = [
  '',
  '/10',
  '/20',
  '/30',
  '/40',
  '/50',
  '/100',
  '/200',
  '/300',
  '/400',
  '/500',
  '/600',
  '/700',
  '/800',
  '/900',
  '/950'
]

// Builds explicit whitelist of classes by combining every token with every utility and alpha suffix,
// producing literal class strings like bg-cerulean, text-violet/50
const whitelistColorClasses = [
  // token-based utilities: bg-cerulean, text-violet/50, etc.
  ...customColorTokens.flatMap((token) =>
    colorUtilities.flatMap((util) =>
      alphaSuffixes.map((alpha) => `${util}-${token}${alpha}`)
    )
  )
]

// eslint-disable-next-line no-console
console.log('Custom color tokens detected by ESLint: ', customColorTokens)
// eslint-disable-next-line no-console
console.log(
  'Tailwind color classes whitelisted in ESLint: ',
  whitelistColorClasses
)

const sharedRules = {
  'jsx-quotes': ['error', 'prefer-single'],
  'no-console': 'error',
  quotes: ['error', 'single', { avoidEscape: true }]
}

export default defineConfig([
  js.configs.recommended, // enables the rules recommended by the ESLint team (the replacement for eslint:recommended)
  ...typescriptEslint.configs.recommended, // enables the rules recommended by the TypeScript-ESLint team (also disables core ESLint rules known to conflict with typescript-eslint rules or cause issues in TypeScript codebases)
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  tailwindcss.configs['flat/recommended'],
  {
    // Config object dedicated to setup path of tailwind config file before enabling the preset
    name: 'tailwind/settings',
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl'],
        config: tailwindConfigPath,
        cssFiles: [
          '**/*.css',
          '!**/node_modules',
          '!**/.*',
          '!**/dist',
          '!**/build'
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [
          ...whitelistColorClasses,
          'font\\-inter',
          'font\\-roboto',
          'z-gridCellHovered'
        ], // e.g. to avoid "no-custom-classname" linting error for classes that are generated dynamically or contain custom properties
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: '^class(Name)?$' // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      }
    }
  },
  {
    name: 'allfiles',
    files: ['**/*.{js,jsx,ts,tsx,css}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...sharedRules,
      // React
      'react/react-in-jsx-scope': 'off' // With new JSX transform from React 17 import of React is not needed
      // 'react/jsx-uses-react': 'off', // Not needed with new JSX transform from React 17
      // 'react/jsx-uses-vars': 'error',
      // 'react/jsx-no-undef': 'error',
      // 'react/no-unknown-property': ['error', { ignore: ['class'] }]
    }
  },
  globalIgnores([
    'node_modules',
    '.vitest',
    'dist',
    'mocks',
    'coverage',
    '**/*.css'
  ]),
  eslintConfigPrettier // Overrides Eslint rules (must be last to do so)
])
