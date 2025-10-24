# GitHub Copilot Instructions

This document provides instructions and guidelines for GitHub Copilot when working with this project.

## Project Overview

This is the host application for a micro-frontend architecture built with:

- Vite
- React 18
- TypeScript
- TailwindCSS 4
- Module Federation
- Vitest and React Testing Library for testing

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Ensure strict type checking
- Avoid using `any` type
- Use interface for object types
- Use type for union types or simple aliases
- Use meaningful type names that describe the data
- Sort alphabetically type and interface props

### React

- Use functional components with hooks
- Use TypeScript generics for reusable components
- Implement error boundaries where necessary
- Follow React 18 best practices
- Use proper component file structure:

  ```
  components/
    ComponentName/
      ComponentName.tsx
      ComponentName.test.tsx
      ComponentName.styles.css
  ```

  - Automatically update the index.ts file in the components folder to export new added components

### Type Safety

•⁠ ⁠Use TypeScript types/interfaces
•⁠ ⁠Prefer type annotations for component props
•⁠ ⁠Do not use React.FC for functional components, use Direct Props Annotation instead

### Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Use semantic class names
- Avoid inline styles
- Use CSS modules when custom CSS is necessary

### Testing

- Write tests for all new components
- Follow Testing Library best practices
- Use meaningful test descriptions
- Test component behavior, not implementation
- Follow the Arrange-Act-Assert pattern

### File Naming

- Use PascalCase for component files
- Use camelCase for utility files
- Use kebab-case for configuration files
- Test files should be named `test.tsx` or `ComponentName.test.tsx`

### Import Order

1. React/External libraries
2. Components
3. Types/Interfaces
4. Utilities
5. Styles

Example:

```typescript
import { useState } from 'react'
import { ComponentName } from './components'
import type { ComponentProps } from './types'
import { utilityFunction } from './utils'
import './styles.css'
```

### Code Organization

- Keep components small and focused
- Extract reusable logic into custom hooks
- Place shared types in `types/` directory
- Place utility functions in `utils/` directory
- Modularize components so to comply with atomic methodology following the following hierarchy:

  ```
  src/
    components/
      /atoms
      /molecules
      /organisms
      /templates
      /pages
  ```

### Error Handling

- Use proper error boundaries
- Handle async errors appropriately
- Provide meaningful error messages
- Log errors when necessary

### Performance Considerations

- Use React.memo() for expensive computations
- Implement proper code splitting
- Optimize images and assets
- Use lazy loading where appropriate

### Documentation

- Add JSDoc comments for complex functions
- Document complex business logic
- Keep README up to date
- Add comments for non-obvious code

### Git Practices

- Write meaningful commit messages
- Keep commits atomic and focused
- Follow conventional commits specification
- Create descriptive PR titles and descriptions

## Project Structure

```
src/
  components/     # React components
  assets/         # Static assets
  types/          # TypeScript types/interfaces
  utils/          # Utility functions
  __tests__/      # Test files
```

## Dependencies

- Use npm for package management
- Keep dependencies up to date
- Review security vulnerabilities
- Document any specific version requirements

## Build and Development

- Use npm scripts for common tasks
- Follow the development workflow in README.md
- Ensure all tests pass before committing
- Verify builds locally before pushing

Remember to maintain consistency with existing code and follow established patterns in the codebase.
