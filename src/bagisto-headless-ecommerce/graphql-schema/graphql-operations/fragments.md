# GraphQL Fragments

This guide explains how GraphQL fragments are used in the Bagisto Headless storefront to maintain consistency, reduce code duplication, and simplify complex queries.


## Overview

Fragments are a key feature of GraphQL that allow you to define a set of fields that can be reused across multiple queries and mutations. In Bagisto Headless, we use fragments to define standard representations of core entities like Products, ensuring that different parts of the application always receive the same data structure for the same object type.


## 1. Defining Fragments

Fragments are typically defined in dedicated files within the `src/graphql` directory, organized by domain (e.g., catalog, cart).

### Example: Product Fragments
We define several fragments for products depending on the required level of detail.

**File:** `src/graphql/catelog/fragments/Product.ts`

```graphql
import { gql } from "@apollo/client";

// Core fields needed for simple product displays (e.g., in a grid)
export const PRODUCT_CORE_FRAGMENT = gql`
  fragment ProductCore on Product {
    id
    sku
    type
    name
    price
    urlKey
    baseImageUrl
    minimumPrice
    specialPrice
  }
`;

// Detailed fields needed for the product detail page
export const PRODUCT_DETAILED_FRAGMENT = gql`
  fragment ProductDetailed on Product {
    ...ProductCore
    description
    shortDescription
    variants {
      edges {
        node {
          id
          sku
          baseImageUrl
        }
      }
    }
    reviews {
      edges {
        node {
          ...ProductReview
        }
      }
    }
  }
`;
```


## 2. Using Fragments in Queries

To use a fragment in a query, you must include the fragment definition in the `gql` template literal and use the spread operator (`...`) to inject the fields.

### Example: Fetching Products with Fragments
The `GET_PRODUCTS` query uses `PRODUCT_CORE_FRAGMENT` to fetch the necessary fields for each product in the list.

**File:** `src/graphql/catelog/queries/Product.ts`

```graphql
import { gql } from "@apollo/client";
import { PRODUCT_CORE_FRAGMENT } from "../fragments/Product";

export const GET_PRODUCTS = gql`
  ${PRODUCT_CORE_FRAGMENT}

  query GetProducts($first: Int, $channel: String) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          ...ProductCore
        }
      }
    }
  }
`;
```


## 3. Benefits of Using Fragments

Using fragments in Bagisto Headless provides several advantages:

- **Single Source of Truth:** If a field needs to be added or changed for a product across the entire site, you only need to update the fragment definition once.
- **Improved Readability:** Queries remain clean and focused on their purpose (fetching a list, fetching by ID) rather than being cluttered with long lists of fields.
- **Type Safety:** When combined with TypeScript, fragments help define consistent types for component props, ensuring that a component designed to display a "core product" always receives exactly those fields.
- **Composable Queries:** Fragments can be nested, allowing you to build complex data requirements from smaller, manageable pieces.


## Summary

- **Reusable Fields:** Fragments define sets of fields for specific GraphQL types.
- **Centralized Definition:** Stored in `src/graphql/*/fragments/` for easy maintenance.
- **Consistent Data:** Ensures that all queries returning a specific type use the same field set.
- **Clean Queries:** Uses the spread operator to keep queries concise and readable.

## Next Steps

- 🔍 [Queries](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/queries.md) - How to use fragments in complex queries.
- 📉 [Mutations](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/mutations.md) - Using fragments to handle mutation responses.
