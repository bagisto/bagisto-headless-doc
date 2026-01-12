# Cart Synchronization

This guide explains how the Bagisto Headless storefront ensures that the client-side cart state remains synchronized with the backend Bagisto GraphQL API.


## Overview

Cart synchronization is the process of keeping the local Redux store in lockstep with the server-side data. This is critical in e-commerce to ensure that prices, quantities, and totals shown to the user are always accurate. Synchronization occurs during three primary events: immediate mutation responses, initial page rehydration, and guest-to-customer cart merging.


## 1. Reactive Synchronization via Mutations

Every time a user modifies their cart (adding an item, changing quantity, or removing an item), a GraphQL mutation is executed. The Bagisto API returns the complete updated cart object in the mutation response.

### Implementation in Custom Hooks
Our custom hooks, such as `useAddProduct`, catch these responses and immediately dispatch them to the Redux store.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
const { mutateAsync } = useMutation({
  // ...
  onSuccess: (res) => {
    const responseData = res?.data?.createAddProductInCart?.addProductInCart;
    
    if (responseData?.success) {
      // SYNCHRONIZATION: Update local store with fresh server data
      dispatch(addItem(responseData));
    }
  },
});
```


## 2. Guest to Customer Cart Merging

When a guest user logs in, they may already have items in their guest cart. To preserve these items, the storefront performs a "Merge Cart" operation.

### Merge Logic
The `useMergeCart` hook sends the guest's `cartId` and the authenticated user's `token` to the server. The server merges the items and returns the final consolidated cart, which is then used to update the Redux store.

**File:** `src/utils/hooks/useMergeCart.ts`

```typescript
onSuccess: (response) => {
  const responseData = response?.data?.createMergeCart?.mergeCart;
  
  if (responseData) {
    // Update local state with the merged cart results
    dispatch(addItem(responseData));
    
    // Update persisted guest_cart_id if it changed
    setCookie("guest_cart_id", String(responseData.id));
  }
}
```


## 3. Initial Load Synchronization

When a user first visits the site or refreshes the page, the storefront must "rehydrate" the Redux store from the server using the persisted session token.

- **Check Persistence:** The application retrieves the `GUEST_CART_TOKEN` from cookies.
- **Fetch Latest State:** A query is executed to fetch the current cart details from the Bagisto API using this token.
- **Dispatch to Store:** The retrieved data is dispatched to the Redux store, ensuring the `Navbar` cart counter and `CartSidebar` are accurate from the moment the page becomes interactive.


## 4. Why Sync Matters

Synchronizing after every write operation provides several benefits:
- **Price Accuracy:** Correctly reflects discounts, taxes, and shipping rates calculated by the Bagisto core.
- **Inventory Validation:** Ensures that the quantities requested are actually available in the backend.
- **Seamless Experience:** Users can transition between devices or guest/logged-in states without losing their shopping progress.


## Summary

- **Mutation-Driven:** Immediate updates following any cart modification.
- **Consolidated Merging:** Handles the transition from guest to customer sessions.
- **Server-Side Truth:** The Redux store always reflects the latest state from the Bagisto GraphQL API.
- **Persistent Connectivity:** Uses session tokens in cookies to maintain sync across page reloads.

## Next Steps

- 💾 [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - Understanding how tokens are stored.
- 🧱 [Cart Actions and Reducers](/bagisto-headless-ecommerce/features/cart/state-management/actions-reducers.md) - How the Redux store processes synchronized data.
