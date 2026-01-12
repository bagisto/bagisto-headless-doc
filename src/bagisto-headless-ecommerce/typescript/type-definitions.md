# Type Definitions

This guide provides an overview of the core TypeScript type definitions used in the Bagisto Headless storefront.

## Overview

TypeScript is used throughout the project to provide type safety and improved developer experience. Most global type definitions are centralized in the `src/types` directory, with domain-specific subdirectories for better organization.

**Primary File:** `src/types/types.ts`

## 1. Core GraphQL Helpers

The storefront uses standard helpers to handle the structure of GraphQL responses, especially for paginated data.

```typescript
export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};
```

## 2. Product Models

Product types are comprehensive, covering everything from simple display data to complex configurable variants.

- **`BagistoProductInfo`**: The primary type for product data returned from the API, including names, descriptions, and media.
- **`ProductVariant`**: Defines the structure of a product variant, including its unique SKU, availability, and specific options (e.g., Size, Color).
- **`ProductPrice`**: Handles complex pricing structures, including regular, final, and formatted prices with currency codes.

## 3. Cart & Checkout Models

These types define the structure of the active shopping session and the data required for order placement.

- **`Cart` / `BagistoCart`**: Represents the overall shopping cart, including item counts, totals, and session identifiers.
- **`CartItem`**: Details for an individual item in the cart, linked to its parent product and selected options.
- **`AddressDataTypes`**: A unified type for both billing and shipping addresses, used across forms and API mutations.
- **`BagistoPaymentDataType`**: Encapsulates the cart total and the selected payment method details.

## 4. Customer & User Models

Used for authentication and profile management.

- **`BagistoUser`**: The core profile type containing the user's name, email, phone, and account status.
- **`BagistoUserTypes`**: Helper types for handling user registration and login mutation responses.

## 5. Theme & Layout Models

- **`ThemeCustomizationTypes`**: Defines the structure for theme-driven content like banners, carousels, and footer menus.
- **`IconSvgProps`**: A standard interface for SVG icon components, extending the native `SVGProps` with an optional `size` parameter.

## 6. Directory Structure

For larger domains, types are further subdivided:

```bash
src/types/
├── cart/           # Cart-specific interfaces
├── category/       # Category and hierarchy types
├── checkout/       # Checkout flow and payment types
├── theme/          # UI Kit and primitive types
└── types.ts        # Global e-commerce models
```

## Best Practices

1. **Explicit Typing:** Avoid using `any` whenever possible. Leverage the existing interfaces to ensure complete coverage.
2. **Domain Grouping:** If a type is only used within a specific feature (e.g., Checkout), consider placing it in a feature-relative `type.ts` or within `src/types/checkout/`.
3. **API Alignment:** Most types in `types.ts` are designed to match the expected structure of the Bagisto GraphQL API, making it easier to map mutation responses directly to the application state.

## Next Steps

- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - How these types fit into the global system.
- 💾 [Redux Integration](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - See how these types are used in global state.
- 🧱 [GraphQL Schema](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/queries.md) - The source of truth for these definitions.
