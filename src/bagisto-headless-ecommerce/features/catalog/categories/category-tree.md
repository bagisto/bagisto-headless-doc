# Category Tree Structure

This guide explains how to fetch and display the category tree structure in the Bagisto Headless storefront, typically used for navigation and mega menus.


## Overview

In Bagisto Headless, the category tree is a hierarchical structure of categories. The storefront fetches this tree to build global navigation elements like the main menu and mobile menus. The process involves fetching categories starting from a root parent ID and recursively building the hierarchy.


## 1. GraphQL Query & Fragments

The `GET_TREE_CATEGORIES` query is used to retrieve the hierarchical structure of categories.

### Category Tree Query
This query fetches the category ID, position, logo, status, and localized translations including slugs and names.

**File:** `src/graphql/catelog/queries/Category.ts`

```graphql
query treeCategories($parentId: Int) {
  treeCategories(parentId: $parentId) {
    id
    position
    logoPath
    status
    translations {
      edges {
        node {
          name
          slug
          urlPath
          description
          metaTitle
        }
      }
    }
  }
}
```


## 2. Frontend Implementation

The category tree is typically fetched in the layout or navigation components to ensure it's available across the site.

### Navigation Component
In the `Navbar` component, the category tree is fetched starting from a parent ID (usually `1` for the root category).

**File:** `src/components/layout/navbar/index.tsx`

```typescript
export default async function Navbar() {
  // Fetch the category tree starting from parentId 1
  const data = await graphqlRequest<any>(
    GET_TREE_CATEGORIES,
    { parentId: 1 },
    { tags: ["categories"], life: "days" }
  );

  const categories = data?.treeCategories || [];

  // Filter and map categories for navigation
  const menuData = categories
    .filter((cat: any) => cat.id !== "1") // Skip root
    .map((cat: any) => {
      const translation = cat.translations?.edges?.[0]?.node;
      return {
        id: cat.id,
        name: translation?.name || "",
        slug: translation?.slug || "",
      };
    })
    .filter((item: any) => item.name && item.slug);

  return (
    <nav>
      {/* Render menu items */}
      {menuData.map((item) => (
        <Link key={item.id} href={`/search/${item.slug}`}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
```


## 3. Caching & Performance

Since category structures don't change frequently, the storefront uses aggressive caching strategies:

- **Long-lived Cache:** The `graphqlRequest` utility is configured with `life: "days"`, meaning the category data will be cached for an extended period.
- **Tag-based Revalidation:** The `categories` tag allows for on-demand revalidation. If a category is updated in the Bagisto admin, this specific cache can be flushed without affecting other parts of the site.
- **Server Component Fetching:** Fetching data directly in server components like `Navbar` ensures that the HTML is pre-rendered with the correct links, improving SEO and reducing client-side JavaScript.


## Summary

- **Hierarchical Fetching:** Retrieves the category tree in a single query.
- **Navigation Mapping:** Transforms raw GraphQL data into a simplified menu structure.
- **Optimized Caching:** Uses long-lived server-side caching with tag-based revalidation for high performance.


## Next Steps

- 🔍 [Implementing Search](/bagisto-headless-ecommerce/features/catalog/product-listing/search-functionality.md) - How categories interact with search results.
- 📉 [Category Filtering](/bagisto-headless-ecommerce/features/catalog/categories/category-filtering.md) - Filtering products within a specific category.
