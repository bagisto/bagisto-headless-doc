# Product Listing

### GraphQL Queries

The project uses three main GraphQL queries for fetching products:

#### 1. GET_PRODUCTS (Full Product Data)

```graphql
import { gql } from "@apollo/client";
import { PRODUCT_CORE_FRAGMENT } from "../fragments";

export const GET_PRODUCTS = gql`
  ${PRODUCT_CORE_FRAGMENT}

  query GetProducts(
    $query: String
    $sortKey: String
    $reverse: Boolean
    $first: Int
    $after: String
    $before: String
    $channel: String
    $locale: String
    $filter: String
  ) {
    products(
      query: $query
      sortKey: $sortKey
      reverse: $reverse
      first: $first
      after: $after
      before: $before
      channel: $channel
      locale: $locale
      filter: $filter
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
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

**Query Parameters:**

| Parameter | Type    | Description              | Example                              |
| --------- | ------- | ------------------------ | ------------------------------------ |
| `query`   | String  | Search term              | `"laptop"`                           |
| `sortKey` | String  | Field to sort by         | `"PRICE"`, `"CREATED_AT"`, `"TITLE"` |
| `reverse` | Boolean | Reverse sort order       | `true` for descending                |
| `first`   | Int     | Number of items per page | `12`                                 |
| `after`   | String  | Cursor for next page     | `"eyJpZCI6MTIzfQ=="`                 |
| `before`  | String  | Cursor for previous page | `"eyJpZCI6MTAwfQ=="`                 |
| `channel` | String  | Sales channel            | `"default"`                          |
| `locale`  | String  | Localization             | `"en"`                               |
| `filter`  | String  | Filter criteria (JSON)   | `'{"color":"23"}'`                   |


#### 2. GET_FILTER_PRODUCTS (Filtered Products)

```graphql
import { gql } from "@apollo/client";
import { PRODUCT_SECTION_FRAGMENT } from "../fragments";

export const GET_FILTER_PRODUCTS = gql`
  ${PRODUCT_SECTION_FRAGMENT}
  query getProducts(
    $filter: String
    $sortKey: String
    $reverse: Boolean
    $first: Int
    $after: String
    $before: String
  ) {
    products(
      filter: $filter
      sortKey: $sortKey
      reverse: $reverse
      first: $first
      after: $after
      before: $before
    ) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...ProductSection
        }
      }
    }
  }
`;
```

**Use Case:** Optimized for filtered product listings (color, size, brand filters applied)


#### 3. GET_PRODUCTS_PAGINATION (Lightweight)

```graphql
export const GET_PRODUCTS_PAGINATION = gql`
  query GetProductsPagination(
    $query: String
    $sortKey: String
    $reverse: Boolean
    $first: Int
    $channel: String
    $locale: String
    $after: String
    $before: String
  ) {
    products(
      query: $query
      sortKey: $sortKey
      reverse: $reverse
      first: $first
      channel: $channel
      locale: $locale
      after: $after
      before: $before
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
        }
      }
    }
  }
`;
```

**Use Case:** Fetch only pagination metadata to calculate cursor positions without loading full product data


### Product Fragments

#### PRODUCT_CORE_FRAGMENT (Minimal Data)

```graphql
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
```

**Use:** Product listing pages, search results


#### PRODUCT_DETAILED_FRAGMENT (Full Details)

```graphql
export const PRODUCT_DETAILED_FRAGMENT = gql`
  fragment ProductDetailed on Product {
    id
    sku
    type
    name
    urlKey
    description
    shortDescription
    price
    baseImageUrl
    minimumPrice
    specialPrice
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
          rating
          id
          name
          title
          comment
        }
      }
    }
  }
`;
```

**Use:** Product detail pages (PDP)


### Fetching Products (Server-Side)

**Example:** Search page implementation

```typescript
// src/app/(public)/search/page.tsx
import { graphqlRequest } from "@/lib/graphql-fetch";
import { GET_PRODUCTS } from "@/graphql";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const searchValue = params?.q as string;
  const itemsPerPage = 12;

  // Fetch products on the server
  const data = await graphqlRequest(
    GET_PRODUCTS,
    {
      query: searchValue,
      first: itemsPerPage,
      sortKey: "CREATED_AT",
      reverse: true,
    },
    {
      tags: ["products"],
      life: "hours", // Cache for 1 hour
    }
  );

  const products = data?.products?.edges?.map((e) => e.node) || [];
  const totalCount = data?.products?.totalCount;

  return (
    <div>
      <h1>Search Results: {searchValue}</h1>
      <ProductGrid products={products} />
      <Pagination totalCount={totalCount} itemsPerPage={itemsPerPage} />
    </div>
  );
}
```
