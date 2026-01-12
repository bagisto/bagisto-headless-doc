# GraphQL Operations: Queries, Mutations & Fragments

This guide provides a comprehensive reference for working with GraphQL operations in the Bagisto Headless project. We group operations into three categories to ensure modularity, reusability, and optimal performance.


## 1. Fragments (Reusable Fields)

Fragments allow you to define common field sets for core entities like Products, Cart Items, or Categories. This ensures UI consistency and reduces query maintenance.

### Key Fragments (Catalog Domain)
| Fragment | Primary Use | Core Fields |
| :--- | :--- | :--- |
| **`ProductCore`** | Grids & Search | ID, SKU, Name, Price, UrlKey, BaseImageUrl. |
| **`ProductDetailed`** | Product Pages | `ProductCore` + Description, Variants, Reviews. |
| **`ProductReview`** | Review Sections | Rating, Title, Comment, Customer Name. |

### Implementation Pattern
```typescript
// src/graphql/catelog/fragments/Product.ts
export const PRODUCT_CORE_FRAGMENT = gql`
  fragment ProductCore on Product {
    id
    sku
    name
    price
    urlKey
    baseImageUrl
  }
`;
```


## 2. Queries (Data Fetching)

Queries are used for read-only operations. In this project, most queries are executed on the server using the `graphqlRequest` utility.

### Standard Query Example
```typescript
// src/graphql/catelog/queries/Product.ts
import { PRODUCT_CORE_FRAGMENT } from "../fragments/Product";

export const GET_HOME_PRODUCTS = gql`
  query GetHomeProducts($first: Int) {
    products(first: $first) {
      edges {
        node {
          ...ProductCore
        }
      }
    }
  }
  ${PRODUCT_CORE_FRAGMENT}
`;
```

### Best Practices for Queries
- **Modularize with Fragments:** Always use fragments for shared entities.
- **Relay Pagination:** Most listings use `edges`, `node`, and `pageInfo`.
- **Server-Side Execution:** Prefer using `graphqlRequest` in Server Components for SEO and speed.


## 3. Mutations (Data Modification)

Mutations are used to create, update, or delete data (e.g., adding to cart, placing orders, or logging in).

### Mutation Example: Add to Cart
```typescript
// src/graphql/cart/mutations/AddProductToCart.ts
export const CREATE_ADD_PRODUCT_IN_CART = gql`
  mutation CreateAddProductInCart($productId: Int!, $quantity: Int!) {
    createAddProductInCart(input: {
      productId: $productId
      quantity: $quantity
    }) {
      addProductInCart {
        id
        cartToken
        grandTotal
        itemsCount
        success
      }
    }
  }
`;
```

### Best Practices for Mutations
- **Return Status:** Always request `success` and `message` fields to handle UI feedback.
- **Cache Invalidation:** After a successful mutation, remember to call `revalidateTag()` or `revalidatePath()` to refresh the UI.
- **Error Handling:** Use try-catch blocks in your components to capture network or GraphQL errors.


## 4. Summary Decision Matrix

| Operation Type | When to Use | Result Storage |
| :--- | :--- | :--- |
| **Fragment** | When fields are shared across >1 component. | Inline in other operations. |
| **Query** | When fetching data for display. | Next.js Data Cache / Apollo Cache. |
| **Mutation** | When the user performs an action (Write). | Uncached (Immediate UI feedback). |


📖 **Related Documentation:**
- [GraphQL Request Utility](/bagisto-headless-ecommerce/apollo-client/request-utility.md)
- [Cache Options & Configuration](/bagisto-headless-ecommerce/apollo-client/cache-options.md)
- [Understanding the Schema](/bagisto-headless-ecommerce/graphql-schema/overview.md)
