# Best Practices

### 1. Use Appropriate Fragments

```ts
// ✅ Good: Use minimal fragment for listings
const { data } = await graphqlRequest(GET_PRODUCTS, {
  // Uses PRODUCT_CORE_FRAGMENT
});

// ❌ Bad: Fetching unnecessary data
const { data } = await graphqlRequest(GET_PRODUCT_BY_ID, {
  // Uses PRODUCT_DETAILED_FRAGMENT (too much for listings)
});
```


### 2. Parallel Data Fetching

```ts
// ✅ Good: Fetch in parallel
const [products, filters] = await Promise.all([
  graphqlRequest(GET_PRODUCTS, {}),
  graphqlRequest(GET_FILTER_OPTIONS, {}),
]);

// ❌ Bad: Sequential fetching
const products = await graphqlRequest(GET_PRODUCTS, {});
const filters = await graphqlRequest(GET_FILTER_OPTIONS, {});
```


### 3. Implement Proper Caching

```typescript
// ✅ Good: Cache with appropriate lifetime
const data = await graphqlRequest(
  GET_PRODUCTS,
  { query: "laptop" },
  {
    tags: ["products"],
    life: "hours", // Cache for 1 hour
  }
);

// ❌ Bad: No caching
const data = await graphqlRequest(
  GET_PRODUCTS,
  { query: "laptop" },
  { noCache: true }
);
```

### 4. Handle Empty States

```ts
// ✅ Good: Proper empty state handling
const products = data?.products?.edges?.map((e) => e.node) || [];

if (products.length === 0) {
  return <NoProductsFound searchQuery={searchValue} />;
}

return <ProductGrid products={products} />;
```


### 5. Optimize Pagination

```ts

// ✅ Good: Use lightweight query for cursor calculation
const cursorData = await graphqlRequest(GET_PRODUCTS_PAGINATION, {
  first: currentPage * itemsPerPage,
});

// ❌ Bad: Fetching full product data just for cursor
const cursorData = await graphqlRequest(GET_PRODUCTS, {
  first: currentPage * itemsPerPage,
});
```


### 6. URL State Management

```ts

// ✅ Good: Use URL params for all state
const searchParams = {
  q: searchValue,
  page: currentPage,
  sort: sortValue,
  color: selectedColors.join(","),
};

// ❌ Bad: Using local state (not shareable/bookmarkable)
const [filters, setFilters] = useState({});
```

