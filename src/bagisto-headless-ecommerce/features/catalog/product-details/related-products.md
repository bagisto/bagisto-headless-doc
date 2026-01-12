# Related Products

This guide explains how to fetch and display related products on the product detail page in the Bagisto Headless storefront.


## Overview

In Bagisto Headless, related products are cross-sell or up-sell items associated with a specific product in the backend. These products are fetched independently from the main product details, allowing for more flexible rendering and optimized performance through separate caching and revalidation.


## 1. GraphQL Query & Fragments

The `GET_RELATED_PRODUCTS` query is used to retrieve a list of products related to a specific product ID or slug.

### Related Products Query
This query uses the `ProductSection` fragment to fetch a lightweight set of product data suitable for display in a carousel or grid.

**File:** `src/graphql/catelog/queries/Product.ts`

```graphql
query GetRelatedProducts($id: ID!, $first: Int) {
  product(id: $id) {
    id
    sku
    relatedProducts(first: $first) {
      edges {
        node {
          ...ProductSection
        }
      }
    }
  }
}
```


## 2. Frontend Implementation

Related products are implemented as a server component that is lazily loaded or wrapped in a `Suspense` boundary to prevent blocking the main product information.

### Related Products Section Component
The `RelatedProductsSection` component handles the data fetching and mapping of the related products.

**File:** `src/components/catalog/product/RelatedProductsSection.tsx`

```typescript
export async function RelatedProductsSection({ fullPath }) {
  // Fetch related products data
  const fetchResult = await getRelatedProduct(fullPath);

  // Extract nodes from edges
  const relatedProducts = fetchResult?.relatedProducts?.edges
    ? fetchResult.relatedProducts.edges.map((e) => e.node)
    : [];

  return (
    <ProductsSection
      title="Related Products"
      description="Discover similar products you might love."
      products={relatedProducts}
    />
  );
}
```

### Async Data Fetching Utility
A nested function handles the GraphQL request with specific caching tags related to the product.

```typescript
async function getRelatedProduct(productIdentifier: string) {
  return await graphqlRequest<SingleProductResponse>(
    GET_RELATED_PRODUCTS,
    { id: productIdentifier, first: 4 },
    {
      tags: ["related-products", `product-${productIdentifier}`],
      life: "hours",
    }
  );
}
```


## 3. Caching & Performance

To ensure the related products section doesn't negatively impact the user experience, several strategies are used:

- **Isolated Fetching:** By fetching related products separately, the initial load of the primary product information remains fast.
- **Tag-based Revalidation:** Uses the `related-products` tag. This allows the storefront to refresh related items globally or for a specific product without affecting other caches.
- **Suspense Integration:** In the main `ProductPage`, this component is wrapped in a `Suspense` boundary with a skeleton loader, providing immediate visual feedback while the data fetches.


## Summary

- **Independent Query:** Fetches related items using a dedicated `GET_RELATED_PRODUCTS` query.
- **Optimized Schema:** Uses small fragments to reduce the payload size for listing related items.
- **Progressive Rendering:** Leverages React Suspense to improve perceived performance.
- **Effective Caching:** Uses Next.js tags for granular cache control.

## Next Steps

- 📦 [Product Listing](/bagisto-headless-ecommerce/features/catalog/product-listing/fetching-products.md) - How large product sets are managed.
- 🖼️ [Product Images](/bagisto-headless-ecommerce/features/catalog/product-details/product-images.md) - Displaying images in product grids.
