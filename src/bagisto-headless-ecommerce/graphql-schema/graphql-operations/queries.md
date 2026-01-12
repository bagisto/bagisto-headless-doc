# GraphQL Queries

This guide explains how to write and use GraphQL queries in the Bagisto Headless storefront to fetch data from the backend.


## Overview

Queries are used to fetch data from the GraphQL server. In Bagisto Headless, we use queries for retrieving product lists, category details, customer profiles, and more. All queries are written using the `gql` tag and are typically executed on the server side in Next.js App Router pages or components.


## 1. Structure of a Query

A typical query in the storefront consists of three main parts:
1.  **Operation Name:** A unique name for the query (e.g., `GetProducts`).
2.  **Variable Definitions:** The dynamic inputs the query accepts (e.g., `$first`, `$query`).
3.  **Selection Set:** The specific fields and fragments you want to retrieve.

### Example: Fetching Products
The `GET_PRODUCTS` query demonstrates these components, including the use of fragments for field selection.

**File:** `src/graphql/catelog/queries/Product.ts`

```graphql
import { gql } from "@apollo/client";
import { PRODUCT_CORE_FRAGMENT } from "../fragments/Product";

export const GET_PRODUCTS = gql`
  ${PRODUCT_CORE_FRAGMENT}

  query GetProducts(
    $query: String
    $sortKey: String
    $reverse: Boolean
    $first: Int
    $channel: String
  ) {
    products(
      query: $query
      sortKey: $sortKey
      reverse: $reverse
      first: $first
      channel: $channel
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...ProductCore
        }
      }
    }
  }
`;
```


## 2. Using Variables

Variables allow you to make queries dynamic and reusable. In the example above, `$query`, `$sortKey`, and `$first` are variables.

When executing the query using our utility, you pass these variables in an object:

```tsx
const data = await graphqlRequest<ProductsResponse>(
  GET_PRODUCTS,
  {
    first: 12,
    channel: "default",
    query: "shoes"
  }
);
```


## 3. Best Practices for Queries

To maintain a clean and performant codebase, follow these best practices:

- **Use Descriptive Names:** Always provide an operation name for your queries. This makes debugging easier in browser devtools and server logs.
- **Request Only What You Need:** GraphQL allows you to specify exactly which fields you want. Avoid selecting unnecessary fields to keep the payload size small.
- **Leverage Fragments:** Use fragments for shared field sets to ensure data consistency across different components.
- **Handle Nullability:** Be mindful of fields that might return `null` and handle those cases in your frontend components.
- **Organize by Domain:** Store queries in files named after the domain they belong to (e.g., `Product.ts`, `Category.ts`, `Cart.ts`).


## Summary

- **Declarative Data Fetching:** Request exactly what you need.
- **Type-Safe Variables:** Pass dynamic inputs via variables for flexibility.
- **Fragment Integration:** Combine queries with fragments for consistent data structures.
- **Domain-Driven Organization:** Queries are organized into domain-specific files within `src/graphql/`.

## Next Steps

- 🗳️ [Mutations](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/mutations.md) - Learn how to modify data on the server.
- 🧱 [Fragments](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/fragments.md) - Deep dive into reusable field sets.
