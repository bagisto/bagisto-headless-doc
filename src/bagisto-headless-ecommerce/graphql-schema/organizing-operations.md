# Organizing Operations

To maintain a scalable e-commerce storefront, GraphQL operations (queries, mutations, and fragments) are organized into domain-specific modules. This structure ensures that code remains reusable, testable, and easy to navigate.


## 1. Directory Structure

All GraphQL operations are located in `src/graphql/`. Each domain folder follows a consistent sub-directory pattern:

```text
src/graphql/
├── catelog/               # Modular domain (e.g., Catalog)
│   ├── fragments/         # Reusable data structures
│   │   ├── Product.ts
│   │   └── index.ts       # Barrel export
│   ├── queries/           # Data fetching operations
│   │   ├── GetProduct.ts
│   │   └── index.ts
│   └── mutations/         # Data modification operations
│       └── index.ts
├── cart/
├── checkout/
├── index.ts               # Global entry point for all operations
└── types/                 # Shared TypeScript interfaces
```


## 2. Standard Pattern: Queries

Queries are defined as named constants in `.ts` files using the `gql` tag.

```graphql
// src/graphql/catelog/queries/GetProduct.ts
import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
       id
       name
       sku
    }
  }
`;
```

> [!NOTE]
> We recommend naming constants in `UPPER_SNAKE_CASE` (e.g., `GET_PRODUCT_DETAIL`) to distinguish them from standard variables.


## 3. Reusable Fragments

To avoid duplicating field lists across multiple queries, we use GraphQL Fragments. This is particularly useful for complex entities like Products or Cart Items.

```graphql
// src/graphql/catelog/fragments/Product.ts
import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    sku
    name
    price
    baseImageUrl
  }
`;
```
```graphql
// Usage in a Query
import { PRODUCT_FRAGMENT } from "../fragments/Product";

export const GET_HOME_PRODUCTS = gql`
  query GetHomeProducts {
    products(first: 4) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
```


## 4. Barrel Exports (Streamlined Imports)

Each sub-directory and the main `src/graphql/` folder uses an `index.ts` (barrel file) to export all operations. This allows for clean, single-line imports in your components.

```tsx
// ❌ Avoid deep, multi-line imports
import { GET_PRODUCT } from "@/graphql/catelog/queries/GetProduct";
import { ADD_TO_CART } from "@/graphql/cart/mutations/AddToCart";

// ✅ Use the global entry point
import { GET_PRODUCT, ADD_TO_CART } from "@/graphql";
```


## 5. Development Best Practices

1. **Naming Consistency:** Match the query constant name to the filename (e.g., `GET_CATEGORIES` in `GetCategories.ts`).
2. **Type Safety:** Always import or define types from `src/graphql/types` when using queries in `graphqlRequest`.
3.  **Modularization:** If a query grows too large, break it down using fragments located in the same domain's `fragments/` folder.
4.  **Backend Alignment:** Ensure variables match the input types defined in the Bagisto GraphQL schema (found in the backend documentation).


📖 **Continue Reading:**
- [Understanding the Schema](/bagisto-headless-ecommerce/graphql-schema/overview.md)
- [GraphQL Request Utility](/bagisto-headless-ecommerce/apollo-client/request-utility.md)
- [Apollo Client Setup](/bagisto-headless-ecommerce/apollo-client/apollo-setup.md)
