# Category Filtering

This guide explains how filtering is implemented in the Bagisto Headless storefront, allowing users to refine product results within categories using attributes like color, size, and brand.


## Overview

Filtering in Bagisto Headless is a dynamic process that combines backend attribute configuration with a reactive frontend. The storefront fetches available filter options for specific attributes and uses URL search parameters to manage the active filter state, ensuring a highly performant and bookmarkable user experience.


## 1. GraphQL Query & Fragments

The storefront uses the `GET_FILTER_OPTIONS` query to fetch the available options for filterable attributes.

### Fetch Attribute Query
This query retrieves the options for a specific attribute identified by its IRI (e.g., `/api/admin/attributes/23`).

**File:** `src/graphql/catelog/queries/ProductFilter.ts`

```graphql
query FetchAttribute($id: ID!) {
  attribute(id: $id) {
    id
    code
    options {
      edges {
        node {
          id
          adminName
          translations {
            edges {
              node {
                label
              }
            }
          }
        }
      }
    }
  }
}
```


## 2. Frontend Implementation

The filtering logic is divided between the category page (which fetches the data) and the filter components (which manage user interaction).

### Data Fetching
In the category page, multiple attributes (like Color, Size, Brand) are fetched in parallel to populate the filter options.

**File:** `src/app/(public)/search/[collection]/page.tsx`

```typescript
// Fetch multiple attribute options
const [colorData, sizeData, brandData] = await Promise.all([
  graphqlRequest(GET_FILTER_OPTIONS, { id: "attribute_id_color" }),
  graphqlRequest(GET_FILTER_OPTIONS, { id: "attribute_id_size" }),
  graphqlRequest(GET_FILTER_OPTIONS, { id: "attribute_id_brand" }),
]);

const filterAttributes = [
  colorData?.attribute,
  sizeData?.attribute,
  brandData?.attribute,
].filter(Boolean);
```

### Filter List Component
The `FilterList` component renders the filter options and handles selection changes by updating the URL.

**File:** `src/components/theme/filters/FilterList.tsx`

```typescript
const handleFilterChange = (selectedIds: Set<string>) => {
  const newParams = new URLSearchParams(currentParams.toString());
  const selected = Array.from(selectedIds);

  if (selected.length > 0) {
    newParams.set(attributeCode, selected.join(","));
  } else {
    newParams.delete(attributeCode);
  }

  // Update URL to trigger server-side re-fetch
  router.replace(createUrl(pathname, newParams), { scroll: false });
};
```


## 3. URL-based Filter State

Bagisto Headless leverages Next.js URL parameters to manage the filtering state. This provides several technical advantages:

- **Shallow Routing:** The storefront uses `router.replace` with `{ scroll: false }` and `useTransition` for smooth navigation without full page reloads.
- **Server-Side Re-fetching:** When the URL changes, the server component (Category Page) automatically re-runs with the new search parameters, fetching the correctly filtered product set.
- **Multi-select Support:** Multiple options for the same attribute (e.g., `?color=Red,Blue`) are supported by joining IDs with commas in the URL.
- **Persistence:** Users can share specific filtered views by simply copying the URL.


## Summary

- **Dynamic Options:** Fetches attribute options directly from the Bagisto GraphQL API.
- **Parallel Requests:** Optimized data fetching for multiple filter categories.
- **Reactive Navigation:** Uses URL parameters to drive the filtering logic.
- **Enhanced UX:** Supports multi-selection and "Clear all" functionality for a better shopping experience.


## Next Steps

- 📦 [Category Products](/bagisto-headless-ecommerce/features/catalog/categories/category-products.md) - How filtered products are displayed.
- 🛒 [Cart State Management](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - Describes how cart data is managed on the client using Redux, including syncing cart state with the Bagisto API.
