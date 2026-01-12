# Implementing Filters

### Filter Architecture

The filtering system uses:
1. **GET_FILTER_OPTIONS** - Fetch available filter attributes
2. **URL Parameters** - Store selected filters in query params
3. **FilterList Component** - Render filter UI
4. **Dynamic GraphQL Query** - Apply filters to product query


### Step 1: Fetch Filter Attributes

```graphql
// GET_FILTER_OPTIONS query
export const GET_FILTER_OPTIONS = gql`
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
                  id
                  label
                  locale
                }
              }
            }
          }
        }
      }
    }
  }
`;
```

**Usage:**

```ts

// Fetch color, size, and brand filters in parallel
const [colorFilterData, sizeFilterData, brandFilterData] = await Promise.all([
  graphqlRequest(GET_FILTER_OPTIONS, {
    id: "/api/admin/attributes/23", // Color attribute ID
    locale: "en",
  }),
  graphqlRequest(GET_FILTER_OPTIONS, {
    id: "/api/admin/attributes/24", // Size attribute ID
    locale: "en",
  }),
  graphqlRequest(GET_FILTER_OPTIONS, {
    id: "/api/admin/attributes/25", // Brand attribute ID
    locale: "en",
  }),
]);
```


### Step 2: Parse URL Parameters

```ts

// Extract filter values from URL params
const rawColor = params?.color;
const rawSize = params?.size;
const rawBrand = params?.brand;

// Convert to arrays
const colorFilter =
  typeof rawColor === "string"
    ? rawColor.split(",")
    : Array.isArray(rawColor)
      ? rawColor
      : [];

const sizeFilter =
  typeof rawSize === "string"
    ? rawSize.split(",")
    : Array.isArray(rawSize)
      ? rawSize
      : [];

const brandFilter =
  typeof rawBrand === "string"
    ? rawBrand.split(",")
    : Array.isArray(rawBrand)
      ? rawBrand
      : [];

```

**URL Example:**
```ts

/search?q=laptop&color=23,24&size=12&brand=5
```


### Step 3: Build Filter Input

```typescript
// Extract IDs from filter values
const extractId = (value: string) => {
  if (/^\d+$/.test(value)) return value;
  const match = value.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

const colorIds = colorFilter
  .map(extractId)
  .filter((id): id is string => Boolean(id));

const sizeIds = sizeFilter
  .map(extractId)
  .filter((id): id is string => Boolean(id));

const brandIds = brandFilter
  .map(extractId)
  .filter((id): id is string => Boolean(id));

// Build filter object
const filterObject: Record<string, string> = {};
if (colorIds.length > 0) filterObject.color = colorIds.join(",");
if (sizeIds.length > 0) filterObject.size = sizeIds.join(",");
if (brandIds.length > 0) filterObject.brand = brandIds.join(",");

// Convert to GraphQL filter format
const filterInput = Object.entries(filterObject)
  .map(([key, value]) => JSON.stringify({ [key]: value }))
  .join("");
```

**Filter Input Example:**
```json

{"color":"23,24"}{"size":"12"}{"brand":"5"}

```


### Step 4: Apply Filters to Query

```typescript
const isFilterApplied = Object.keys(filterObject).length > 0;

let dataPromise;
if (isFilterApplied) {
  // Use GET_FILTER_PRODUCTS for filtered queries
  dataPromise = graphqlRequest(GET_FILTER_PRODUCTS, {
    filter: filterInput,
    first: itemsPerPage,
    sortKey: selectedSort.sortKey,
    reverse: selectedSort.reverse,
  });
} else {
  // Use GET_PRODUCTS for unfiltered queries
  dataPromise = graphqlRequest(GET_PRODUCTS, {
    query: searchValue,
    first: itemsPerPage,
    sortKey: selectedSort.sortKey,
    reverse: selectedSort.reverse,
  });
}

const data = await dataPromise;
```

### Step 5: FilterList Component


```ts

"use client";
import { Select, SelectItem } from "@heroui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterItemList({ list, title }) {
  const currentParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get selected filters from URL
  const selectedFilters = useMemo(
    () => new Set(currentParams.get(list.code)?.split(",") ?? []),
    [list.code, currentParams]
  );

  const handleFilterChange = (selectedIds: Set<string>) => {
    const code = list.code;
    const selected = Array.from(selectedIds);
    const newParams = new URLSearchParams(currentParams.toString());

    if (selected.length > 0) {
      newParams.set(code, selected.join(","));
    } else {
      newParams.delete(code);
    }

    const newUrl = createUrl(pathname, newParams);
    router.replace(newUrl, { scroll: false });
  };

  return (
    <Select
      items={list.options}
      placeholder={`Select a ${list.adminName}`}
      selectedKeys={selectedFilters}
      selectionMode="multiple"
      onSelectionChange={(keys) => handleFilterChange(keys as Set<string>)}
    >
      {(item) => (
        <SelectItem key={item.id}>
          {item.adminName}
        </SelectItem>
      )}
    </Select>
  );
}

export default function FilterList({ filterAttributes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filterAttributes?.map((item) => (
        <FilterItemList key={item.id} list={item} title={item.adminName} />
      ))}
      <button onClick={handleClearAll}>Clear all filters</button>
    </div>
  );
}
```

**Key Features:**
- ✅ Multi-select dropdowns for each filter attribute
- ✅ URL-based state management
- ✅ Shallow routing (no page reload)
- ✅ Clear all filters button

