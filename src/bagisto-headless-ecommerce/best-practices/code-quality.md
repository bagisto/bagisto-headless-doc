# Code Quality

This guide details the standards and tools used to maintain high code quality and consistency in the Bagisto Headless storefront.

## Overview

We follow industry-standard practices to ensure the codebase remains clean, readable, and free of common errors. This is achieved through automated linting, strict type checking, and standardized formatting.

## 1. ESLint Configuration

The project uses **ESLint 9** with the Flat Config system (`eslint.config.mjs`) to enforce coding standards.

### Core Plugins
- **Next.js Vitals:** Ensures the code follows Next.js performance and accessibility best practices.
- **TypeScript ESLint:** Provides specialized rules for TypeScript codebases.

### Configured Rules
Our configuration focuses on catchable errors and code cleanliness:
- **`@typescript-eslint/no-unused-vars`**: Errors on unused variables (allows patterns starting with `_`).
- **`no-console`**: Warns against using `console.log` in production code (allows `warn` and `error`).
- **`@typescript-eslint/no-explicit-any`**: Warns when the `any` type is used, encouraging specific type definitions.
- **`react-hooks/exhaustive-deps`**: Ensures all dependencies are included in React hooks like `useEffect`.

**Run Linting:**
```bash
npm run lint
```

## 2. TypeScript Strict Mode

The project is built with **TypeScript** in **Strict Mode** to catch potential bugs at compile-time.

**File:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  }
}
```

### Key Strict Features:
- **`strictNullChecks`**: Prevents "null is not an object" errors by forcing explicit handling of potentially null/undefined values.
- **`noImplicitAny`**: Ensures every variable has a known type, preventing accidental use of `any`.
- **`strictFunctionTypes`**: Ensures function parameters and return types are compatible.

## 3. Formatting Standards

While ESLint handles many stylistic choices, the project follows a consistent formatting pattern:
- **Indentation:** 2 spaces.
- **Quotes:** Double quotes for strings.
- **Semicolons:** Always used.
- **Imports:** Organized by path aliases (`@/`, `@components/`, etc.).

*Recommendation: Use the Prettier extension in your IDE for real-time formatting alignment.*

## 4. Code Reviews

To maintain quality, every pull request should be reviewed for:
- **Logic Correctness:** Does it solve the user's problem without side effects?
- **Performance:** Are there unnecessary re-renders or heavy computations?
- **Type Safety:** Are types specific and well-defined?
- **Readability:** Is the code self-documenting, or are comments needed for complex logic?

## Next Steps

- 📁 [Code Organization](/bagisto-headless-ecommerce/best-practices/code-organization.md) - How files are structured.
- ⚡ [Performance Optimization](/bagisto-headless-ecommerce/advanced/performance-optimization.md) - Strategies for a faster storefront.
- ⚠️ [Error Handling](/bagisto-headless-ecommerce/best-practices/error-handling.md) - Patterns for a resilient application.
