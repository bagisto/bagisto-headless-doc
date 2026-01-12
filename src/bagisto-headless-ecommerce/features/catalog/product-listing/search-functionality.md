# Search Functionality

### URL-Based Search

The search system uses URL query parameters for state management:

```
/search?q=laptop&sort=price-asc&page=2&cursor=ABC123&color=23&size=12
```

**Parameters:**
- `q` - Search query
- `sort` - Sort order
- `page` - Current page number
- `cursor` - Pagination cursor
- `color`, `size`, `brand` - Filter values


### Sort Options


```ts
export const SortByFields = [
  {
    key: "name-asc",
    title: "From A-Z",
    value: "name-asc",
    sortKey: "TITLE",
    reverse: false,
  },
  {
    key: "name-desc",
    title: "From Z-A",
    value: "name-desc",
    sortKey: "TITLE",
    reverse: true,
  },
  {
    key: "newest",
    title: "Newest First",
    value: "newest",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    key: "oldest",
    title: "Oldest First",
    value: "oldest",
    sortKey: "CREATED_AT",
    reverse: false,
  },
  {
    key: "price-asc",
    title: "Cheapest First",
    value: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  },
  {
    key: "price-desc",
    title: "Expensive First",
    value: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];
```


### Implementing Search

```ts

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const searchValue = params?.q as string;
  const sortValue = params?.sort || "name-asc";
  
  const selectedSort =
    SortByFields.find((s) => s.key === sortValue) || SortByFields[0];

  const data = await graphqlRequest(GET_PRODUCTS, {
    query: searchValue,
    first: 12,
    sortKey: selectedSort.sortKey,
    reverse: selectedSort.reverse,
  });

  const products = data?.products?.edges?.map((e) => e.node) || [];

  return (
    <div>
      <h1>Search Results: {searchValue}</h1>
      <SortOrder sortOrders={SortByFields} />
      <ProductGrid products={products} />
    </div>
  );
}
```

