# GraphQL Mutations

This guide explains how to use GraphQL mutations in the Bagisto Headless storefront to modify data, such as managing the shopping cart, customer profiles, and placing orders.


## Overview

While queries are used for fetching data, **mutations** are used to perform write operations that change data on the server. In Bagisto Headless, mutations are essential for core e-commerce interactions like adding products to the cart, updating customer addresses, and completing the checkout process.


## 1. Structure of a Mutation

A mutation structure is similar to a query but starts with the `mutation` keyword. It typically takes an `input` object containing the data to be processed and returns the updated state of the affected entity.

### Example: Adding Product to Cart
The `CREATE_ADD_PRODUCT_IN_CART` mutation demonstrates how input variables are used and what kind of data is returned upon success.

**File:** `src/graphql/cart/mutations/AddProductToCart.ts`

```graphql
mutation CreateAddProductInCart(
  $token: String
  $cartId: Int
  $productId: Int!
  $quantity: Int!
) {
  createAddProductInCart(
    input: {
      token: $token
      cartId: $cartId
      productId: $productId
      quantity: $quantity
    }
  ) {
    addProductInCart {
      id
      cartToken
      itemsCount
      grandTotal
      success
      message
    }
  }
}
```


## 2. Executing Mutations

Mutations are typically executed through API routes or client-side actions. Unlike queries, mutations should never be cached, so we use `cache: "no-store"` or `noCache: true` options.

### Server-Side Implementation (API Route)
In an API route, you can use `bagistoFetch` to execute the mutation.

**File:** `src/app/api/cart/addToCart/route.ts`

```typescript
const res = await bagistoFetch<AddToCartOperation>({
  query: CREATE_ADD_PRODUCT_IN_CART,
  variables: {
    productId: body.productId,
    quantity: body.quantity,
    // ... other variables
  },
  cache: "no-store",
});
```


## 3. Best Practices for Mutations

To ensure a reliable and secure experience when modifying data:

- **Input Validation:** Always validate data on the client side before sending the mutation to provide immediate feedback and reduce server load.
- **Error Handling:** Mutations often return a `success` flag and a `message`. Check these fields in your response to handle business logic errors gracefully.
- **Cache Invalidation:** After a successful mutation, you may need to invalidate specific cache tags to ensure the UI reflects the updated data.
- **Strong Typing:** Use TypeScript interfaces for mutation inputs and responses to prevent runtime errors and improve developer productivity.
- **Client-Side Feedback:** Use loading states to notify users that an operation is in progress, preventing double submissions.


## Summary

- **Write Operations:** Used for any action that changes state on the server.
- **Input Objects:** Pass structured data to the backend via variables.
- **No Caching:** Always execute mutations with caching disabled to ensure data integrity.
- **Comprehensive Responses:** Request fields that allow you to update the local UI state immediately after the mutation succeeds.

## Next Steps

- 📦 [Cart Operations](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - Specific mutations for cart management.
- 🔐 [Customer Authentication](/bagisto-headless-ecommerce/authentication/customer-auth.md) - Mutations for login and registration.
