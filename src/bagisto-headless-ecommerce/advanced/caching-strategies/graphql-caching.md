# GraphQL Caching

This guide explains how GraphQL-specific caching is implemented and managed in the Bagisto Headless storefront, both on the server and the client.

## Overview

In Bagisto Headless, we use **Apollo Client** as the primary engine for interacting with the Bagisto GraphQL API. Caching is used to minimize network traffic and provide a snappy user interface by reusing previously fetched data.

## 1. Client-Side Caching (Normalized Cache)

Apollo Client features a sophisticated **Normalized Cache** (`InMemoryCache`) that stores the results of your GraphQL queries in a flattened format.

**File:** `src/lib/apollo-client.ts`

### Configuration
```typescript
const cache = new InMemoryCache();

return new ApolloClient({
  cache: cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
```

### Fetch Policies
We utilize different fetch policies depending on the environment:
- **`cache-first` (Default Client):** Checks the cache first. If data is found, it returns it instantly; otherwise, it executes a network request.
- **`network-only` (Default Server/SSR):** Always bypasses the cache to ensure the server-side rendered HTML is fresh.
- **`no-cache`:** Used for mutations or sensitive data that should never be stored.

## 2. Server-Side Data Fetching (`graphqlRequest`)

For Server Components, we have a custom wrapper that combines Apollo Client's query execution with Next.js's native caching.

**File:** `src/lib/graphql-fetch.ts`

While Next.js handles the persistence (File/Redis), the `graphqlRequest` utility manages the **Apollo `fetchPolicy`** during the fetch operation:

```typescript
if (options?.noCache) {
  const result = await client.query({
    query,
    variables,
    fetchPolicy: options?.fetchPolicy ?? "no-cache",
  });
  return result.data;
}
```

## 3. Fragment-Based Caching

By using **GraphQL Fragments**, we ensure that different queries return standardized objects (e.g., `Product` or `Cart`). Apollo's normalized cache uses these standard IDs (like `Product:123`) to automatically update all components that use that same data when it changes.

## 4. Cache Invalidation Patterns

### Client-Side
- **`refetchQueries`:** After a mutation (like adding an item to the cart), we often tell Apollo to refetch related queries to ensure the UI is in sync.
- **Direct Cache Updates:** For faster UI feedback, we can manually update the Apollo cache after a successful mutation.

### Server-Side
- **Revalidation Tags:** We assign custom tags to our server-side cached requests. When a product is updated in Bagisto, a webhook (or manual revalidation) can trigger a purge of all requests tagged with `products`.



## Summary

- **Normalization:** Apollo Client stores data as a flat lookup table based on IDs.
- **Policy Driven:** Different behaviors for SSR (freshness) vs Client (speed).
- **Synergy:** Works alongside Next.js caching to provide a comprehensive optimization layer.


## Next Steps

- ⚡ [Next.js Caching](/bagisto-headless-ecommerce/advanced/caching-strategies/nextjs-caching.md) - How these queries are persisted on the server.
- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The global data flow.
- 🧱 [GraphQL Fragments](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/fragments.md) - The foundation of normalized caching.
