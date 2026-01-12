# Performance Optimization

This guide explains the strategies and technical implementations used to ensure the Bagisto Headless storefront delivers a high-performance shopping experience.

## Overview

The storefront is engineered for speed, utilizing modern Next.js features, aggressive caching layers, and advanced browser capabilities like Speculation Rules. Our goal is to minimize Time to First Byte (TTFB), maximize Core Web Vitals scores, and provide near-instant page transitions.

## 1. Data Fetching & Server Caching

We use a custom GraphQL fetch handler that integrates deeply with Next.js's data cache system.

**File:** `src/lib/graphql-fetch.ts`

### `graphqlRequest` Wrapper
- **Data Caching:** Leverages `unstable_cache` to store GraphQL responses on the server.
- **Tag-Based Invalidation:** Support for `tags` (e.g., `["products"]`) allows for targeted cache purging when data changes in the Bagisto backend.
- **Cache Life Presets:** Simplified revalidation logic using presets like `seconds`, `minutes`, `hours`, or `days`.
- **Query Memoization:** Prevents redundant processing by memoizing GraphQL document strings and query variables.

## 2. Client-Side Caching (LRU)

To provide an instant experience when navigating between recently viewed products, the storefront implements a Least Recently Used (LRU) cache on the client.

**File:** `src/utils/LRUCache.ts`

- **In-Memory Storage:** Stores full product nodes in the browser's memory.
- **Automatic Expiration:** Features a Time-To-Live (TTL) mechanism to ensure users don't see stale data for too long.
- **Size Management:** Automatically evicts the oldest entries when the cache reaches its maximum size.

## 3. Prerendering & Prefetching

We utilize the **Speculation Rules API** to predict user intent and prepare pages before the user even clicks them.

**File:** `src/components/theme/SpeculationRules.tsx`

- **Prerendering:** Highlighting a link with `moderate` eagerness triggers a full background prerender of the target page.
- **Smart Filtering:** The system is configured to avoid prerendering sensitive paths like `/checkout` or `/logout` to save resources and maintain security.
- **Standard Next.js Prefetching:** Every `<Link>` component automatically prefetches the code for the linked page when it enters the viewport.

## 4. Image Optimization

Images are the heaviest assets in an e-commerce store. We ensure they are handled efficiently using the `NextImage` component.

**File:** `src/components/common/NextImage.tsx`

- **Modern Formats:** Automatically serves WebP/AVIF formats based on browser support.
- **Responsive Sizing:** Uses the `sizes` attribute to ensure the browser only downloads the image size appropriate for the user's screen.
- **Lazy Loading:** All non-critical images use native lazy loading.
- **Priority Loading:** Critical "above-the-fold" images (like Hero banners) use the `priority` prop to bypass lazy loading and start downloading immediately.

## 5. Code Splitting & Lazy Loading

To keep the initial bundle size small, we use Next.js `dynamic` imports for components that aren't immediately necessary.

```tsx
const OrderDetail = dynamic(() => import("@/components/cart/OrderDetail"), {
  loading: () => <Skeleton />,
});
```
This ensures that the JavaScript for complex UI components (like the Cart Detail or Review section) is only loaded when the user reaches that part of the journey.


## Performance Checklist

- [x] **SSG/ISR:** Most catalog pages are statically generated for instant delivery.
- [x] **Memoization:** Heavy calculations and query strings are memoized.
- [x] **Minimized Re-renders:** Careful use of React hooks and context prevents unnecessary UI updates.
- [x] **Bundle Optimization:** Tree-shaking is enabled to remove unused code from third-party libraries.

## Next Steps

- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The high-level map of our optimized system.
- 💾 [Caching Strategies](/bagisto-headless-ecommerce/advanced/caching-strategies/nextjs-caching.md) - Deep dive into Next.js specific caching.
- 🧱 [Feature Components](/bagisto-headless-ecommerce/overview/architecture-overview/feature-components.md) - See how specific components implement these patterns.
