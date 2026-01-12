# Fetching Single Product

This guide explains how to fetch detailed information for a single product from the Bagisto GraphQL API and display it in the product detail page within the Next.js storefront.


## Overview

In Bagisto Headless, product details are fetched using a specific GraphQL query that retrieves comprehensive data, including descriptions, variants, and reviews. This process is optimized for performance using server-side fetching and advanced caching mechanisms.


## 1. GraphQL Query & Fragments

The primary query used for fetching a single product is `GET_PRODUCT_BY_ID`. This query relies on the `ProductDetailed` fragment to ensure all necessary fields are retrieved consistently.

### Product Detailed Fragment
The `ProductDetailed` fragment defines the schema for a complete product object.

**File:** `src/graphql/catelog/fragments/Product.ts`

```graphql
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
```

### Get Product By ID Query
This query accepts a product ID (or slug/URL key) and returns the detailed product data.

**File:** `src/graphql/catelog/queries/Product.ts`

```graphql
query GetProductById($id: ID!) {
  product(id: $id) {
    ...ProductDetailed
  }
}
```


## 2. Frontend Implementation

The product detail page fetches data on the server side to ensure SEO optimization and fast initial load times.

### Data Fetching Utility
A specialized function `getSingleProduct` handles the GraphQL request and manages local caching.

**File:** `src/app/(public)/product/[...urlProduct]/page.tsx`

```typescript
async function getSingleProduct(productIdentifier: string) {
  // 1. Check local LRU cache
  const cachedProduct = productCache.get(productIdentifier);
  if (cachedProduct) {
    return cachedProduct;
  }

  try {
    // 2. Perform GraphQL request
    const dataById = await graphqlRequest<SingleProductResponse>(
      GET_PRODUCT_BY_ID,
      {
        id: productIdentifier,
      },
      {
        tags: ["products", `product-${productIdentifier}`],
        life: "hours",
      }
    );

    const product = dataById?.product || null;
    
    // 3. Update local cache if product found
    if (product) {
      productCache.set(productIdentifier, product);
    }
    
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
```

### Page Component
The `ProductPage` component coordinates the data fetching and passes the data to various UI components.

```typescript
export default async function ProductPage({ params }) {
  const { urlProduct } = await params;
  const fullPath = urlProduct.join("/");
  
  const product = await getSingleProduct(fullPath);
  
  if (!product) return notFound();

  // ... Render components like HeroCarousel and ProductInfo
}
```


## 3. Caching & Performance

To provide a lightning-fast experience, Bagisto Headless employs multiple layers of caching:

- **LRU Cache:** An in-memory cache (`LRUCache`) stores recently fetched products on the server side to avoid redundant API calls for subsequent requests within a short window.
- **Next.js Tag-based Revalidation:** The `graphqlRequest` utility uses Next.js `fetch` options with tags (`products`, `product-{id}`). This allows for on-demand revalidation when product data changes in the backend.
- **Static Rendering:** The product detail page is configured with `export const dynamic = 'force-static'`, enabling Next.js to pre-render the page and serve it from a CDN/Cache.


## Summary

- **Single Query:** All product details are fetched in one round-trip using `GET_PRODUCT_BY_ID`.
- **Server-Side Fetching:** Optimized for SEO and performance.
- **Multi-layer Caching:** Combines local in-memory caching with Next.js's native caching capabilities.
- **Fragments:** Uses `ProductDetailed` for consistent data structures.


## Next Steps

- 📦 [Implementing Filters](/bagisto-headless-ecommerce/features/catalog/categories/category-filtering.md) - Learn how to filter products.
- 🛒 [Add to Cart Flow](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - Integrating the product page with the shopping cart.
