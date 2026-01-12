# Performance Tips

### 1. Enable ISR (Incremental Static Regeneration)

```ts

// Add to search page
export const revalidate = 3600; // Revalidate every hour
```


### 2. Implement Static Params Generation

```ts
export async function generateStaticParams() {
  const commonSearches = ["laptop", "phone", "tablet"];
  const params = [];

  for (const query of commonSearches) {
    const data = await graphqlRequest(GET_PRODUCTS, {
      query,
      first: 12,
    });

    const totalPages = Math.ceil(data.totalCount / 12);
    for (let i = 0; i < totalPages; i++) {
      params.push({ q: query, page: String(i + 1) });
    }
  }

  return params;
}
```


### 3. Use Dynamic Imports

```ts

import dynamic from "next/dynamic";

const Pagination = dynamic(() => import("@/components/catalog/Pagination"));
const ProductGridItems = dynamic(
  () => import("@/components/catalog/product/ProductGridItems")
);
```

