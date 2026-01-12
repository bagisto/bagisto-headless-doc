# Product Images

This guide describes how product images are fetched, processed, and displayed in the Bagisto Headless storefront, including support for base images and variant-specific galleries.


## Overview

In Bagisto Headless, product photography is handled dynamically. The storefront retrieves image URLs from the GraphQL API and uses a specialized utility to resolve full paths. On the product detail page, a carousel component handles the display of multiple images, automatically switching between the main product gallery and variant-specific images based on user selection.


## 1. GraphQL Query & Fragments

Product image data is included in the `ProductDetailed` fragment, which is used by the `GET_PRODUCT_BY_ID` query.

### Image Fields in Fragment
The `baseImageUrl` field provides the path to the product's primary image. For configurable products, variants also include their own `baseImageUrl` to allow for dynamic gallery updates.

**File:** `src/graphql/catelog/fragments/Product.ts`

```graphql
fragment ProductDetailed on Product {
  # Main product image
  baseImageUrl
  
  # Variant-specific images
  variants {
    edges {
      node {
        id
        sku
        baseImageUrl
      }
    }
  }
}
```


## 2. Frontend Implementation

The storefront uses a combination of utility functions and components to provide a seamless image viewing experience.

### Image URL Resolution
The `getImageUrl` utility ensures that image paths (whether relative or absolute) are correctly formatted and includes a fallback mechanism for missing images.

**File:** `src/utils/constants.ts`

```typescript
export function getImageUrl(url?: string, baseUrl?: string, fallback?: string) {
  if (!url) return fallback;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}
```

### Gallery Component
The `HeroCarousel` component is responsible for rendering the main product image and a thumbnail navigation list. It supports smooth transitions using Framer Motion.

**File:** `src/components/common/slider/HeroCarousel.tsx`

```tsx
export default function HeroCarousel({ images }) {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="group relative overflow-hidden">
      <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Image
          fill
          src={images[current]?.src}
          alt={images[current]?.altText}
          className="object-cover"
        />
      </motion.div>
      
      {/* Thumbnail Navigation */}
      <ul className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <li key={image.src}>
            <button onClick={() => setCurrent(index)}>
              <GridTileImage src={image.src} active={current === index} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```


## 3. Dynamic Variant Images

One of the key features of the product page is its ability to switch the image gallery based on the selected variant.

### Selection Logic
In the `ProductPage` component, the storefront checks if there are variant-specific images available. If a variant is selected (or if variants exist), it prioritizes those images over the base product image.

**File:** `src/app/(public)/product/[...urlProduct]/page.tsx`

```tsx
// Extract variant images if they exist
const VariantImages = isArray(product?.variants?.edges)
  ? product?.variants.edges.map((edge) => edge.node)
  : [];

// Determine which images to pass to the carousel
const carouselImages = isArray(VariantImages) && VariantImages.length > 0
  ? VariantImages.map((image) => ({
      src: getImageUrl(image.baseImageUrl, baseUrl, NOT_IMAGE),
      altText: image?.name || product?.name,
    }))
  : [{
      src: getImageUrl(product?.baseImageUrl, baseUrl, NOT_IMAGE),
      altText: product?.name,
    }];
```


## Summary

- **Multiple Image Sources:** Supports both primary product images and variant-specific photography.
- **Path Resolution:** Uses `getImageUrl` to handle both local and remote image sources.
- **Interactive Carousel:** Features thumbnail navigation and smooth transitions.
- **Dynamic Updates:** Automatically reflects the selected variant's images via React state and URL parameters.

## Next Steps

- 🎨 [Product Variants](/bagisto-headless-ecommerce/features/catalog/product-details/product-variants.md) - Learn how variants are managed.
- 🚀 [Performance Optimization](/bagisto-headless-ecommerce/features/catalog/product-listing/performance.md) - Understanding Next.js Image component benefits.
