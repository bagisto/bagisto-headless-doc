# Revalidation Strategies

This guide explains the different strategies used in the Bagisto Headless storefront to ensure that cached data in the storefront stays up-to-date with the Bagisto backend.

## Overview

Caching is essential for performance, but it can lead to stale data. To solve this, we implement several revalidation strategies that strike a balance between high speed and data accuracy.

## 1. Time-Based Revalidation (TTL)

Time-based revalidation automatically purges cached data after a specific duration has passed. This is handled by the `life` option in our `graphqlRequest` utility.

**File:** `src/lib/graphql-fetch.ts`

The storefront uses predefined "presets" to make revalidation management easier for developers:

- **`seconds` (10s):** For very volatile data (e.g., current cart quantities if managed via SSR).
- **`minutes` (60s):** For frequently changing content like home page banners.
- **`hours` (1 hour):** The default for products and category listings.
- **`days` (24h+):** For mostly static structural data like the category tree or store configurations.

```typescript
export function getRevalidateTime(life?: CacheLifeOption): number | false {
  if (!life) return false;
  if (typeof life === "number") return life;

  switch (life) {
    case "seconds": return 10;
    case "minutes": return 60;
    case "hours": return 3600;
    case "days": return 86400;
    // ...
  }
}
```

## 2. On-Demand Revalidation (Cache Tags)

On-demand revalidation allows us to manually purge specific data the moment it becomes outdated. This is more efficient than time-based revalidation because it only refreshes data when necessary.

### Implementation
We assign **tags** to every cached GraphQL request. These tags usually correspond to the type of data or a specific record ID.

```typescript
await graphqlRequest(GET_PRODUCT, { id: "1" }, {
    tags: ["products", "product-1"]
});
```

### Targeted Purging
When an event occurs (like a product update in Bagisto Admin), the storefront can use Next.js's `revalidateTag` function to clear all cache segments associated with that tag.

```typescript
import { revalidateTag } from 'next/cache';

// Purge all cached products
revalidateTag('products');

// Purge only a specific product
revalidateTag('product-1');
```

## 3. Client-Side Revalidation

For interactive features like the shopping cart, we rely on immediate state updates to provide a responsive experience.

- **State Sync:** After a mutation (e.g., `addItemToCart`), we dispatch a Redux action to update the local cart state immediately using the API response.
- **Query Refetching:** We use `@tanstack/react-query` or `@apollo/client` refetching logic to trigger a background refresh of stale queries once a mutation completes.

## 4. SSG & ISR Revalidation

For statically generated routes (SSG), we use **Incremental Static Regeneration (ISR)**. By specifying a `revalidate` interval in the page component, Next.js will recreate the page in the background after the timeout.

```typescript
export const revalidate = 3600; // Revalidate the page every hour
```


## Best Practices

1. **Start Conservative:** Use shorter TTLs (`minutes`) during development and transition to longer ones (`hours` or `days`) for production.
2. **Use Broad & Specific Tags:** Always include a general tag (e.g., `products`) and a specific one (e.g., `product-ID`) to allow both global and granular purges.
3. **Prefer On-Demand:** Whenever possible, use tags to update the cache rather than relying solely on timers.

## Next Steps

- ⚡ [Next.js Caching](/bagisto-headless-ecommerce/advanced/caching-strategies/nextjs-caching.md) - Deep dive into the server-side cache.
- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - How revalidation fits into the global system.
- 🧱 [Feature Components](/bagisto-headless-ecommerce/overview/architecture-overview/feature-components.md) - See how specific components trigger revalidation.
