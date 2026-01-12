# Code Organization

This guide outlines the architectural principles and conventions used to organize the Bagisto Headless codebase, ensuring maintainability and scalability.

## 1. Directory Structure

The project follows a modular, feature-based organization. All source code resides in the `src/` directory.

```bash
src/
├── app/            # Next.js App Router (Routes, Layouts, APIs)
├── components/     # UI Components (Organized by domain: catalog, checkout, etc.)
├── graphql/        # GraphQL Operations (Queries, Mutations, Fragments)
├── lib/            # Core library configurations (Apollo, Graphql-fetch)
├── providers/      # React Context Providers (Store, Theme, Auth)
├── store/          # Redux Toolkit (Slices, Store configuration)
├── types/          # Global TypeScript definitions
└── utils/          # Shared Helpers and Custom Hooks
```

## 2. Naming Conventions

Consistency in naming makes the codebase predictable and easier to navigate.

### Components
All React components use **PascalCase** and are stored in `.tsx` files.
- Example: `ProductCard.tsx`, `MiniCart.tsx`

### Hooks
Custom hooks use **camelCase** and must start with the `use` prefix.
- Example: `useAddToCart.ts`, `useCheckout.ts`

### Utilities & Helpers
General utility functions use **camelCase**.
- Example: `helper.ts`, `type-guards.ts`

### TypeScript Types
Interfaces and types use **PascalCase**.
- Example: `AddressDataTypes`, `BagistoCart`

## 3. Import Organization

The project uses TypeScript **Path Aliases** to avoid complex relative paths (e.g., `../../../`). This makes moving files easier and imports cleaner.

**Defined Aliases:**
- `@/` -> `src/`
- `@components/` -> `src/components/`
- `@utils/` -> `src/utils/`

**Example:**
```typescript
import { ProductCard } from "@components/catalog/product/ProductCard";
import { useAddToCart } from "@utils/hooks/useAddToCart";
```

## 4. Code Splitting

To optimize performance and reduce initial bundle sizes, we utilize Next.js **Dynamic Imports** for components that are not required for the initial paint.

**Implementation:**
```tsx
import dynamic from "next/dynamic";

const OrderDetail = dynamic(() => import("@/components/cart/OrderDetail"), {
  loading: () => <Skeleton />,
});
```
Commonly used for:
- Heavy sidebar/drawer components.
- Success pages.
- Complex review sections in checkout.

## 5. Domain-Driven Design

Data and UI are grouped by their business domain (e.g., `cart`, `catalog`, `checkout`). Each domain typically has its own:
1. **GraphQL Operations:** `src/graphql/[domain]`
2. **Components:** `src/components/[domain]`
3. **Redux State:** `src/store/slices/[domain]-slice.ts`


## Next Steps

- ⚡ [Performance Optimization](/bagisto-headless-ecommerce/advanced/performance-optimization.md) - How organization impacts speed.
- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The high-level map.
- 🧱 [Feature Components](/bagisto-headless-ecommerce/overview/architecture-overview/feature-components.md) - See domain organization in action.
