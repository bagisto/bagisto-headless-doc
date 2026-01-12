# Category Products

This guide explains how to fetch and display products within a specific category, including support for filtering, sorting, and pagination.


## Overview

In Bagisto Headless, category-specific product listing is handled by a dynamic route that resolves a category slug to a category ID and then fetches the associated products. This page is highly interactive, allowing users to narrow down results using various attributes like color, size, and brand.


## 1. GraphQL Query & Fragments

The `GET_FILTER_PRODUCTS` query is the primary tool for retrieving products based on category and other filter criteria.

### Filter Products Query
This query accepts a JSON-encoded `filter` string, which can include `category_id` and other attribute filters.

**File:** `src/graphql/catelog/queries/ProductFilter.ts`

```graphql
query getProducts(
  $filter: String
  $sortKey: String
  $reverse: Boolean
  $first: Int
  $after: String
) {
  products(
    filter: $filter
    sortKey: $sortKey
    reverse: $reverse
    first: $first
    after: $after
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ...ProductSection
      }
    }
  }
}
```


## 2. Frontend Implementation

The category product listing is implemented in a dynamic route `[collection]`, which handles the slug-to-ID resolution and the complex filtering logic.

### Routing & Data Resolution
The page first resolves the category ID from the slug using the category tree data.

**File:** `src/app/(public)/search/[collection]/page.tsx`

```typescript
export default async function CategoryPage({ params, searchParams }) {
  const { collection: categorySlug } = await params;
  
  // 1. Resolve category ID from slug
  const treeData = await graphqlRequest(GET_TREE_CATEGORIES, { parentId: 1 });
  const categoryItem = findCategoryBySlug(treeData.treeCategories, categorySlug);
  const numericId = extractNumericId(categoryItem.id);

  // 2. Build filter object from search parameters
  const filterObject: Record<string, string> = {
    category_id: numericId
  };
  
  // Add other filters (color, size, brand) if present in URL
  if (colorIds.length > 0) filterObject.color = colorIds.join(",");

  // 3. Fetch filtered products
  const data = await graphqlRequest(GET_FILTER_PRODUCTS, {
    filter: JSON.stringify(filterObject),
    first: 12,
    sortKey: selectedSort.sortKey,
    reverse: selectedSort.reverse
  });

  const products = data?.products?.edges?.map((e) => e.node) || [];

  return (
    <section>
      <CategoryDetail categoryItem={categoryItem} />
      <ProductGridItems products={products} />
      <Pagination total={data.products.totalCount} />
    </section>
  );
}
```


## 3. Filtering & Sorting Logic

The category page integrates several UI components to manage state:

- **FilterList:** Displays available filter options (Color, Size, Brand) and updates the URL search parameters when selected.
- **SortOrder:** Updates the `sort` parameter in the URL, which triggers a re-fetch with the corresponding `sortKey` and `reverse` values in the GraphQL query.
- **URL-based Filter State:** All filter and sorting states are persisted in the URL. This allows for easy sharing of filtered results and ensures that the browser's back/forward buttons work as expected.


## Summary

- **Dynamic Resolution:** Automatically maps category slugs to IDs for fetching.
- **Flexible Filtering:** Supports multiple attributes through a single JSON filter input.
- **Stateful URLs:** Persists all user selections (filters, sort, page) in the URL.
- **Optimized Performance:** Uses server-side fetching with granular caching tags.


## Next Steps

- 🔍 [Implementing Search](/bagisto-headless-ecommerce/features/catalog/product-listing/search-functionality.md) - Learn how global search works.
- 📉 [Category Filtering](/bagisto-headless-ecommerce/features/catalog/categories/category-filtering.md) - Deep dive into filter attribute management.
