# Typed Queries & Mutations

This guide explains how to use TypeScript to ensure type safety when executing GraphQL queries and mutations in the Bagisto Headless storefront.

## Overview

The storefront leverages TypeScript's powerful type inference and generic interfaces to provide end-to-end type safety. This ensures that the data sent to the API and the responses received are always validated against pre-defined interfaces, reducing runtime errors and improving developer productivity.

## 1. Defining Input Interfaces

Before executing a query or mutation, define the shape of the data required by the API. This is usually done using interfaces that match the GraphQL input types.

**Example: Shipping Method Input**
```typescript
interface saveShippingMethodsTypes {
  token: string;
  shippingMethod: string;
}
```

## 2. Typing API Requests

The `fetchHandler` utility is designed to handle API requests. While it is generic, you can provide it with specific types to ensure the `body` payload is correct.

**Internal Type:** `src/utils/fetch-handler.ts`
```typescript
interface FetchHandlerOptions<TBody = unknown> {
  url: string;
  method?: Method;
  body?: TBody; // Typed payload
  // ...
}
```

## 3. Using Generic Mutations

When using `useMutation` from `@tanstack/react-query`, you can pass your input interfaces to the mutation function. This provides autocomplete and linting errors if you pass incorrect data.

**File:** `src/utils/hooks/useCheckout.ts`
```typescript
const { mutateAsync: saveShipping } = useMutation({
  mutationFn: (data: saveShippingMethodsTypes) => // Explicitly typed input
    fetchHandler({
      url: "checkout/saveShipping",
      method: "POST",
      body: data,
    }),
});
```

## 4. Handling Typed Responses

Since API responses can vary, the storefront often uses type casting or guards to handle the returned data safely.

```typescript
const { data } = useQuery({
  queryKey: ["cart", token],
  queryFn: async () => {
    const response = await fetchHandler({ url: "cart/getCart", ... });
    return response.data as BagistoCart; // Casting to a known interface
  }
});
```

## 5. Benefits of Typed Operations

- **Early Error Detection:** TypeScript will flag if you are missing a required field (like `token`) before you even run the code.
- **Improved Autocomplete:** IDEs can provide suggestions for the response data (e.g., `data.grandTotal`), making development faster.
- **Refactoring Safety:** If the GraphQL schema changes, you only need to update the interface in one place to see all affected parts of the application.

## Next Steps

- 📘 [Type Definitions](/bagisto-headless-ecommerce/typescript/type-definitions.md) - Overview of the core e-commerce interfaces.
- 🧱 [GraphQL Schema](/bagisto-headless-ecommerce/graphql-schema/overview.md) - Understanding the backend source of truth.
- 💾 [Redux Integration](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - How typed data is stored in the global state.
