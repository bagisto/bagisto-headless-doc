# Next.js Caching Strategies

This guide details how the Bagisto Headless storefront leverages Next.js caching mechanisms to deliver high performance and scalability.

## Overview

The storefront uses the Next.js App Router, which provides a sophisticated, multi-layered caching system. In Bagisto Headless, we primarily focus on three types: **Request Memoization**, **Data Cache**, and **Full Route Cache**.

## 1. Request Memoization

Next.js automatically dedupes `fetch` requests with the same URL and options. This allows us to call the same GraphQL query in multiple components (e.g., in a Layout and a Page) without incurring multiple network requests to the Bagisto backend.

- **Scope:** Lasts for the lifetime of a single server request.
- **Benefit:** Simplifies the component tree by allowing data-heavy components to fetch their own requirements safely.

## 2. Data Cache (Server Side)

We store the results of expensive GraphQL queries in the **Data Cache** to persist data across multiple user requests and deployments.

**Implementation:**
We use `unstable_cache` from `next/cache` inside our `graphqlRequest` utility to manually cache results from the Bagisto API.

**File:** `src/lib/graphql-fetch.ts`
```typescript
const cachedQuery = unstable_cache(
  async () => {
    // Fetch logic via Apollo Client
    return result.data;
  },
  [cacheKey], // Unique key based on query + variables
  {
    tags: options?.tags, // Cache tags for invalidation
    revalidate: getRevalidateTime(options?.life), // TTL
  }
);
```

### Cache Lifetime Presets
The system supports several presets for revalidation:
- `seconds`: 10s (Ideal for volatile data)
- `minutes`: 60s
- `hours`: 3600s (Default for most products)
- `days`: 86400s (Ideal for static themes/categories)

## 3. Full Route Cache (SSG & ISR)

Next.js automatically caches the rendered HTML and data for static routes at build time. For e-commerce, we use **Incremental Static Regeneration (ISR)** to keep these static pages fresh without a full rebuild.

- **Product Pages:** Generated statically with a revalidation period (e.g., 1 hour).
- **Category Pages:** Cached at the route level to ensure near-instant TTFB.

**Example from Product Page:**
```typescript
export const dynamic = 'force-static';
// Page is cached as a static route
```

## 4. Cache Invalidation (On-Demand)

To ensure the storefront reflects updates made in the Bagisto Admin (e.g., price changes or stock updates), we use **Tag-based Invalidation**.

By assigning tags like `products` or `theme` to our cached requests, we can purge specific chunks of the cache programmatically when the backend notifies the frontend of a change.

## 5. Client-Side Router Cache

The Next.js App Router has an in-memory client-side cache that stores the RSC (React Server Component) payload of previously visited routes. Combined with our custom [LRU Cache](/advanced/performance-optimization.md#2-client-side-caching-lru), this ensures that navigating back to a product is instantaneous.


## Best Practices

- **Explicit Revalidation:** Always define a sensible `life` period for your GraphQL requests.
- **Granular Tags:** Use specific tags like `product-[id]` for data that changes frequently, and generic tags like `catalog` for broad updates.
- **Prefer Static:** Default to static rendering (`force-static`) for product and category pages to maximize CDN efficiency.


## Next Steps

- ⚡ [Performance Optimization](/bagisto-headless-ecommerce/advanced/performance-optimization.md) - Broader context on storefront speed.
- 🧱 [GraphQL Caching](/bagisto-headless-ecommerce/advanced/caching-strategies/graphql-caching.md) - Deep dive into Apollo and fetch policies.
- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - How caching fits into the global app shell.
