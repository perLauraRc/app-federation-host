# AI Coding Agent Instructions

This document provides comprehensive guidelines for AI coding agents (GitHub Copilot, Cursor, Windsurf, Cline, Claude, etc.) working with this micro-frontend host application.

## Project Overview

**Architecture**: Micro-frontend host application using Module Federation
**Tech Stack**: Vite 5.4.19, React 18.3.1, TypeScript 5.8.3, TailwindCSS 4.1.13, Zustand 5.0.8
**Testing**: Vitest 3.2.4 (unit), Playwright 1.56.1 (E2E)
**Linting**: ESLint 9.34.0 with flat config format
**Package Manager**: npm (not pnpm or yarn)

### Module Federation Architecture

This host app federates a remote app for micro-frontend composition:

- **Host**: `http://app-federation:5173` (local) / `http://localhost:5173` (CI)
- **Remote**: `http://app-federation-remote:5174` (local) / `http://localhost:5174` (CI)
- **Federation Entry**: `/assets/remoteEntry.js` from remote app
- **Shared Dependencies**: `react`, `react-dom` (must match versions exactly)

**Critical**: Custom hostnames require `/etc/hosts` entries locally:

```
127.0.0.1 app-federation
127.0.0.1 app-federation-remote
```

**CI Environment**: GitHub Actions uses `localhost` URLs instead of custom hostnames (see `playwright.config.ts` and `vite.config.ts` conditional logic).

### Remote Components Available

The host can import federated components from `remoteApp/*`:

- `remoteApp/Background`
- `remoteApp/CircleProgress`
- `remoteApp/ErrorPage`
- `remoteApp/FixturesCarousel`
- `remoteApp/GalleryCell`
- `remoteApp/IconButton`
- `remoteApp/ArrowLeftIcon`
- `remoteApp/ArrowRightIcon`
- `remoteApp/DeleteIcon`
- `remoteApp/FavoriteIcon`
- `remoteApp/MenuIcon`
- `remoteApp/NotificationIcon`

**Testing**: Remote and local components are all mocked in `src/test/mocks/` for unit tests (see `vitest.config.ts` alias mappings).

## Project Structure

```
/Users/lauraribes/Projects/app-micro-frontends/host/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD for E2E tests
│       └── main.yml                # CI/CD for main branch
├── constants.ts                    # App-level constants (hostnames, ports)
├── copilot-instructions.md         # Base AI Coding Agent Instructions (TO REMOVE)
├── src/
├── index.ts                        # Entry point for the application
├── index.css                       # Global styles that include TailwindCSS directives imports, custom color/other tokens in CSS @theme block and tailwind configuration
│   ├── assets/                     # Static assets (SVG, images)
│   ├── components/                 # React components (atomic design)
│   │   ├── App/
│   │   ├── Avatar/
│   │   ├── FixturesDisplay/
│   │   ├── ImportMap/
│   │   ├── Sidebar/
│   │   └── pages/
│   │       └── Home/
│   ├── constants/                  # App constants (layout, REST API)
│   ├── hooks/                      # Custom React hooks
│   ├── services/                   # API/data services
│   ├── test/
│   │   └── mocks/                  # Module Federation mocks for Vitest
│   ├── types/                      # TypeScript type definitions
│   │   ├── API/                    # API response types
│   │   ├── esm.confetti.d.ts       # Custom TypeScript type declarations for external modules
│   │   ├── jest-dom.d.ts           # Testing Library types
│   │   └── remoteModules.d.ts      # Custom TypeScript type declarations for modules to be imported from remote app
│   │   ├── **.ts                   # Other types
│   └── utils/                      # Utility functions
├── store/
│   └── store.ts                    # Store to setup Zustand state management
├── e2e/                            # Playwright E2E tests
├── eslint.config.js                # ESLint flat config
├── playwright.config.ts            # Playwright E2E test config
├── vite.config.ts                  # Vite + Module Federation
├── vitest.config.ts                # Vitest config
└── tailwind.config.ts              # TailwindCSS config
```

## Configuration Files

### ESLint (Flat Config Format)

**File**: `eslint.config.js`

**Critical Patterns**:

```javascript
// ❌ WRONG: Don't nest extends or use inner config objects
export default [
  {
    extends: [preset1, preset2]  // Not supported
  }
]

// ✅ CORRECT: Spread presets at top level
export default [
  ...preset1,
  ...preset2,
  { /* custom rules */ }
]
```

**Custom Color Tokens**: ESLint dynamically reads `src/index.css` to whitelist custom Tailwind color classes (e.g., `bg-cerulean`, `text-powder-blue/50`).

**Shared Config Between Files**:

- `sharedRules` object: `jsx-quotes`, `no-console`, `quotes`
- Applied to both TypeScript and CSS files

**Global Ignores**: `node_modules`, `.vitest`, `dist`, `mocks`, `coverage`, `**/*.css`

### Vite Configuration

**File**: `vite.config.ts`

**Path Alias**: `@src/*` → `./src/*` (use in imports)

**Module Federation**:

```typescript
federation({
  name: 'host-app',
  remotes: {
    remoteApp: process.env.CI
      ? 'http://localhost:5174/assets/remoteEntry.js'
      : `${REMOTE_URL}:${REMOTE_PORT}/assets/remoteEntry.js`
  },
  shared: ['react', 'react-dom']
})
```

**API Proxy**: `/api` → `https://api.football-data.org` (for REST API requests)

**Build Config**:

- `modulePreload: false`
- `minify: false` (easier debugging)
- `cssCodeSplit: false`

### Vitest Configuration

**File**: `vitest.config.ts`

**Environment**: `happy-dom` (not jsdom)

**Setup Files**: `.vitest/setup`

**Path Aliases for Mocking**:

```typescript
{
  '@src': './src',
  '@src/assets/thex.svg': './src/test/mocks/svgMock.tsx',
  'https://esm.sh/canvas-confetti@1.6.0': './src/test/mocks/confettiModule.ts',
  'remoteApp/Background': './src/test/mocks/BackgroundComponent.tsx',
  'remoteApp/CircleProgress': './src/test/mocks/CircleProgressComponent.tsx',
  'remoteApp/ErrorPage': './src/test/mocks/ErrorPageComponent.tsx',
  'remoteApp/FixturesCarousel': './src/test/mocks/FixturesCarouselComponent.tsx'
}
```

**Coverage Excludes**: Config files, index files, constants, types, `.d.ts`, mocks

### Playwright Configuration

**File**: `playwright.config.ts`

**Environment Detection**:

```typescript
baseURL: process.env.CI
  ? 'http://localhost:5173'
  : `${process.env.BASE_URL}:${process.env.HOST_PORT}`
```

**Web Server**:

- **CI**: Only starts host app (remote is served separately)
- **Local**: Builds and previews remote app, then starts host app

**Test Settings**:

- `fullyParallel: true`
- `retries: process.env.CI ? 2 : 0`
- `workers: process.env.CI ? 1 : undefined`

### TailwindCSS 4

**File**: `tailwind.config.ts`

**Custom Properties**: Defined in `src/index.css` using `@theme` directive:

```css
@theme {
  --color-cerulean: #325877;
  --color-powder-blue: #b7e3f1;
  /* ... */
}
```

**PostCSS**: Uses `@tailwindcss/postcss` plugin (not `autoprefixer` - handled internally)

## Coding Standards

### TypeScript

**Strict Mode**: All files use strict type checking

**Type Definitions**:

- Interface for object types
- Type for union types or simple aliases
- Alphabetically sorted members in types/interfaces

**Example**:

```typescript
// ✅ CORRECT
export interface MatchData {
  awayTeam: Team
  competition: Competition
  homeTeam: Team
  id: number
  matchStatus: MatchStatus
  score: Score
  utcDate: string
}

// ❌ WRONG: Unsorted members
export interface MatchData {
  id: number
  homeTeam: Team
  awayTeam: Team
  competition: Competition
  // ...
}
```

**Avoid**:

- `any` type
- `React.FC` (use direct props annotation)
- Default exports (use named exports)

### React Components

**Pattern**:

```typescript
// ✅ CORRECT
export interface SidebarProps {
  children: React.ReactNode
  onRetractBack: () => void
  retracted: boolean
  side?: 'left' | 'right'
}

export const Sidebar = ({
  children,
  onRetractBack,
  retracted,
  side = 'left'
}: SidebarProps) => {
  // Component logic
}
```

**Key Rules**:

- Named exports only (no default exports)
- Destructured props (not `props.children`)
- No default values in function signature for icons (set in destructuring)
- PascalCase for component names
- Arrow functions

**File Structure**:

```
components/
  ComponentName/
    ComponentName.tsx
    ComponentName.test.tsx
    ComponentName.css (if needed)
```

**Atomic Design**: Organize components by hierarchy:

- `atoms/` - Basic building blocks
- `molecules/` - Composite components
- `organisms/` - Complex components
- `templates/` - Page layouts
- `pages/` - Route-level pages

### Icon Components

**Pattern** (for local icons - most icons are from remote app):

```typescript
import type { IconProps } from '@src/types'

export const FavoriteIcon = ({ color, size }: IconProps) => (
  <svg
    fill={color}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG paths */}
  </svg>
)
```

**Key Rules**:

- Named export
- Destructured props `({ color, size }: IconProps)`
- No default values in signature
- Consistent SVG attributes order: `fill`, `height`, `viewBox`, `width`, `xmlns`

### Import Order

```typescript
// 1. React/External libraries
import { useState, useEffect } from 'react'
import { create } from 'zustand'

// 2. Remote components (Module Federation)
import IconButton from 'remoteApp/IconButton'
import { MenuIcon } from 'remoteApp/MenuIcon'

// 3. Local components
import { Sidebar } from '@src/components/Sidebar/Sidebar'

// 4. Types/Interfaces
import type { IconProps } from '@src/types'

// 5. Utilities
import { classNames } from '@src/utils'

// 6. Styles
import './Component.css'
```

**Path Aliases**: Always use `@src/*` for local imports (configured in `vite.config.ts` and `vitest.config.ts`).

### State Management (Zustand)

**File**: `store/store.ts`

**Pattern for Map-based State**:

```typescript
import { create } from 'zustand'

interface WishlistStore {
  map: Map<number, MatchData>
  addMatch: (match: MatchData) => void
  removeMatch: (id: number) => void
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  map: new Map(),
  addMatch: (match) =>
    set((state) => ({
      map: new Map(state.map).set(match.id, match)
    })),
  removeMatch: (id) =>
    set((state) => {
      const newMap = new Map(state.map)
      newMap.delete(id)
      return { map: newMap }
    })
}))
```

**Critical**: Always create new `Map()` instances for immutability.

### Accessibility (W3C Standards)

**Keyboard Navigation**:

```typescript
// ✅ Use native KeyboardEvent for addEventListener
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    // Not React.KeyboardEvent
    if (e.key === 'Escape' && !retracted) {
      onRetractBack()
    }
  }
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [retracted, onRetractBack])
```

**Focus Management**:

```typescript
// ✅ Store previous focus and restore on close
const previousActiveElement = useRef<HTMLElement | null>(null)

useEffect(() => {
  if (!retracted) {
    previousActiveElement.current = document.activeElement as HTMLElement
    setTimeout(() => containerRef.current?.focus(), 100)
  } else {
    previousActiveElement.current?.focus()
  }
}, [retracted])
```

**ARIA Attributes**: Use semantic HTML first, ARIA attributes when necessary.

### Testing

**Unit Tests (Vitest)**:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders children when not retracted', () => {
    // Arrange
    render(
      <Sidebar retracted={false} onRetractBack={() => {}}>
        <div>Content</div>
      </Sidebar>
    )

    // Act
    const content = screen.getByText('Content')

    // Assert
    expect(content).toBeInTheDocument()
  })
})
```

**E2E Tests (Playwright)**:

```typescript
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/App Micro Frontends/)
})
```

**Test Files**: `test.tsx` or `ComponentName.test.tsx`

**Follow**: Arrange-Act-Assert pattern, test behavior not implementation.

### Styling (TailwindCSS 4)

**Custom Colors**:

```jsx
<div className="bg-cerulean text-powder-blue/50">{/* Content */}</div>
```

**Dynamic Classes**:

```typescript
import { classNames } from '@src/utils/classNames'

<div className={classNames(
  'base-class',
  condition && 'conditional-class',
  { 'map-key': condition }
)}>
```

**ESLint Whitelist**: Custom color classes are auto-whitelisted by reading `src/index.css` at lint time.

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `Sidebar.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `classNames.ts`)
- **Config**: `kebab-case.ts` (e.g., `eslint.config.js`)
- **Tests**: `test.tsx` or `ComponentName.test.tsx`
- **Types**: `camelCase.ts` (e.g., `icon.ts`, not `Icon.ts`)

**Case Sensitivity**: Use lowercase for type files to avoid issues on case-insensitive filesystems (macOS).

## Common Workflows

### Development

**Start Development Server**:

```bash
npm run dev
```

- Host: `http://app-federation:5173`
- Requires remote app built and served at `http://app-federation-remote:5174`

**Run Unit Tests**:

```bash
npm run test          # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

**Run E2E Tests**:

```bash
npm run e2e           # Headless
npm run e2e:ui        # UI mode
npm run e2e:report    # Show report (port 9324)
```

**Linting**:

```bash
npm run lint          # Check for errors
npm run typecheck     # TypeScript type checking
```

**Build for Production**:

```bash
npm run build         # Outputs to dist/
npm run preview       # Preview production build
```

### Adding Components

1. Create component directory: `src/components/ComponentName/`
2. Create `ComponentName.tsx` with named export
3. Create `ComponentName.test.tsx` with tests
4. Update `src/components/index.ts` to export component (alphabetically)
5. Use `@src/components/ComponentName` in imports

### Adding Types

1. Create type file in `src/types/` (e.g., `icon.ts`)
2. Alphabetically sort interface/type members
3. Use named exports
4. Import with `import type { TypeName } from '@src/types'`

### Adding API Types

1. Create file in `src/types/API/` (e.g., `match.ts`)
2. Define interface from API response
3. Sort members alphabetically
4. Export from `src/types/index.ts`

### Mocking Remote Components

**For Unit Tests**:

1. Create mock in `src/test/mocks/ComponentName.tsx`:

```typescript
export const MockedComponent = () => <div>Mocked Component</div>
export default MockedComponent
```

2. Add alias to `vitest.config.ts`:

```typescript
'remoteApp/ComponentName': path.resolve(__dirname, './src/test/mocks/ComponentName.tsx')
```

## Module Federation Debugging

### Common Errors

**`__rf_placeholder__shareScope is not defined`**:

- **Cause**: Shared dependencies mismatch between host and remote
- **Fix**: Ensure identical `shared` config in both apps' `vite.config.ts`
- **Verify**: Check `react` and `react-dom` versions match exactly

**`Cannot find module 'remoteApp/...'`**:

- **Cause**: Remote app not running or remoteEntry.js not accessible
- **Fix Local**: Ensure remote app is running at correct port
- **Fix CI**: Verify GitHub Actions workflow builds and serves remote app
- **Check**: `curl http://localhost:5174/assets/remoteEntry.js`

**`getaddrinfo EAI_AGAIN app-federation`**:

- **Cause**: Custom hostname not in `/etc/hosts` (CI environments)
- **Fix**: Use conditional URLs based on `process.env.CI` (see configs)

### Verification Steps

1. **Check Remote is Accessible**:

```bash
curl http://app-federation-remote:5174/assets/remoteEntry.js
```

2. **Verify Shared Config**:

```bash
# In both host and remote vite.config.ts
shared: ['react', 'react-dom']
```

3. **Check Package Versions**:

```bash
npm ls react react-dom
```

## CI/CD (GitHub Actions)

**File**: `.github/workflows/playwright.yml`

**Workflow**:

1. Checkout host repository
2. Checkout remote repository (`perLauraRc/app-federation-remote`)
3. Install dependencies (both apps)
4. Build remote app (`npm run build`)
5. Start remote preview server (port 5174)
6. Wait for remote to be ready (`npx wait-on`)
7. Run Playwright tests (host app uses `localhost` URLs)
8. Upload test results and traces

**Environment Variables**:

```yaml
env:
  HOSTNAME: app-federation
  BASE_URL: http://localhost
  HOST_PORT: 5173
  REMOTE_URL: http://localhost
  REMOTE_PORT: 5174
```

**Critical**: CI uses `localhost` instead of custom hostnames.

## Troubleshooting

### ESLint Errors

**"non-object extensions"**:

- ❌ Don't nest `extends` in config objects
- ✅ Spread presets at top level of array

**"Cannot use 'in' operator to search for 'globals' in undefined"**:

- ❌ Don't use inner config objects with `languageOptions`
- ✅ Use top-level config objects

**"no-custom-classname" for dynamic Tailwind classes**:

- Add to `tailwindcss.whitelist` in `eslint.config.js`
- Custom colors auto-whitelisted from `src/index.css`

### TypeScript Errors

**"Cannot find module '@src/types'"**:

- Ensure `vite.config.ts` has `resolve.alias` for `@src`
- Ensure `tsconfig.json` has `paths` mapping

**"Cannot find module 'remoteApp/...' or its corresponding type declarations"**:

- Create type declaration in `src/types/remoteModules.d.ts`:

```typescript
declare module 'remoteApp/ComponentName' {
  const Component: React.ComponentType<any>
  export default Component
}
```

### Vitest Errors

**"Cannot find module 'remoteApp/...'"**:

- Add mock to `src/test/mocks/`
- Add alias to `vitest.config.ts`

**"received null instead of CSS string"**:

- Check `postcss.config.js` only uses `@tailwindcss/postcss`
- Remove `autoprefixer` (handled by Tailwind v4)

### Playwright Errors

**"webServer exited with non-zero exit code"**:

- Check remote app builds successfully
- Verify ports are not already in use
- Ensure `remoteEntry.js` exists in remote's `dist/assets/`

**"Navigation timeout"**:

- Increase `webServer.timeout` in `playwright.config.ts`
- Check browser console for federation errors

## Best Practices

### Performance

- Use `React.memo()` for expensive components
- Implement code splitting with `React.lazy()`
- Optimize images (use SVG when possible)
- Lazy load remote components when appropriate

### Security

- Review dependencies for vulnerabilities: `npm audit`
- Use environment variables for sensitive data
- Sanitize user inputs
- Follow OWASP best practices

### Documentation

- Add JSDoc comments for complex functions
- Document non-obvious business logic
- Keep README.md updated
- Update this file when architecture changes

### Git Practices

- **Commit Messages**: Follow Conventional Commits

  - `feat:` - New feature
  - `fix:` - Bug fix
  - `refactor:` - Code refactoring
  - `test:` - Adding tests
  - `chore:` - Tooling changes
  - `docs:` - Documentation updates

- **Commits**: Keep atomic and focused
- **PR Titles**: Descriptive and clear
- **Branches**: `feature/`, `fix/`, `refactor/` prefixes

## Quick Reference

### npm Scripts

```bash
npm run dev           # Start dev server (port 5173)
npm run build         # Build for production
npm run preview       # Preview production build
npm run test          # Run unit tests (watch mode)
npm run test:ui       # Run unit tests (UI mode)
npm run test:coverage # Generate coverage report
npm run e2e           # Run E2E tests (headless)
npm run e2e:ui        # Run E2E tests (UI mode)
npm run e2e:report    # Show E2E test report
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript type checking
```

### Important Ports

- `5173` - Host app development server
- `5174` - Remote app development server
- `9324` - Playwright report server

### Key Directories

- `src/components/` - React components
- `src/types/` - TypeScript type definitions
- `src/test/mocks/` - Module Federation mocks
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `src/services/` - API/data services
- `store/` - Zustand state management
- `e2e/` - Playwright E2E tests

### Environment Variables

- `CI` - Set to `true` in GitHub Actions
- `BASE_URL` - Host app base URL (default: `http://app-federation`)
- `REMOTE_URL` - Remote app base URL (default: `http://app-federation-remote`)
- `HOST_PORT` - Host app port (default: `5173`)
- `REMOTE_PORT` - Remote app port (default: `5174`)

## References

- [Vite Documentation](https://vitejs.dev)
- [Module Federation](https://module-federation.io/)
- [React 18 Documentation](https://react.dev)
- [TailwindCSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)

---

**Last Updated**: 2025
**Maintained By**: Laura Ribes (@perLauraRc)
**Project**: App Micro Frontends Host
