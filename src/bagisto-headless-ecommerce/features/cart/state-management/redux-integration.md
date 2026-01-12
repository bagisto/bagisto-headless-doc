# Redux Integration for Cart State

This guide explains how Redux Toolkit is used to manage the shopping cart's global state in the Bagisto Headless storefront.


## Overview

In Bagisto Headless, while the primary source of truth for cart data is the Bagisto GraphQL API, we use Redux Toolkit to manage the client-side state. This ensures that cart updates (like item counts and totals) are instantly reflected across different UI components (Navbar, Cart Sidebar, Product Page) without needing a full page reload or redundant API calls.

### Cart State Introduction
The cart state acts as a local cache of the user's current shopping session. It stores:
- **Items:** List of products added to the cart with their quantities and attributes.
- **Totals:** Calculated subtotal, taxes, shipping, and discounts.
- **Checkout Info:** Selected addresses, shipping methods, and payment details.

By maintaining this state globally, the storefront can provide a reactive experience, such as updating the cart badge in the header as soon as a user clicks "Add to Cart."


## 1. Redux Toolkit Setup

To get started with Redux in your project, you need to install the core Redux Toolkit package and the React bindings.

```bash
# Using npm
npm install @reduxjs/toolkit react-redux

# Using yarn
yarn add @reduxjs/toolkit react-redux
```

Once installed, these packages allow you to create a logic-driven store using slices, which simplifies state management compared to traditional Redux.


## 2. Store Configuration

The Redux store is configured to hold the cart details, including items, shipping/billing addresses, and selected shipping/payment methods.

**File:** `src/store/store.ts`

```typescript
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";

export const store = configureStore({
  reducer: {
    cartDetail: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```


## 3. Cart Slice

The `cart-slice` defines the structure of the cart state and the reducers used to update it.

**File:** `src/store/slices/cart-slice.ts`

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cart: undefined,
  selectedShippingRate: null,
  selectedPayment: null,
  billingAddress: null,
  shippingAddress: null,
};

const cartSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Cart>) => {
      state.cart = { ...action.payload };
    },
    clearCart(state) {
      state.cart = undefined;
      // ... reset other fields
    },
    // ... other reducers like setBillingAddress, setSelectedPayment
  },
});

export const { addItem, clearCart, /* ... */ } = cartSlice.actions;
export default cartSlice.reducer;
```


## 4. Dispatched State Updates

The Redux state is updated reactively based on the results of GraphQL mutations. This is typically handled within custom hooks like `useAddProduct`.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
export const useAddProduct = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation({
    onSuccess: (res) => {
      const responseData = res?.data?.createAddProductInCart?.addProductInCart;
      
      if (responseData?.success) {
        // Update Redux store with the new cart data from API response
        dispatch(addItem(responseData));
        showToast("Product added to cart", "success");
      }
    },
  });
  
  // ...
};
```


## 5. Redux Provider

To make the store available throughout the application, the `Provider` from `react-redux` is included in the global provider wrapper.

**File:** `src/providers/MainProvider.tsx`

```tsx
export const MainProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {/* Other providers like Apollo, NextAuth */}
      {children}
    </Provider>
  );
};
```


## Summary

- **Centralized State:** Redux Toolkit manages all cart-related data in a single store.
- **Reactive Updates:** State is updated immediately following successful API mutations (`addItem`, `clearCart`).
- **UI Consistency:** Components like the `Cart` icon and `CartSidebar` subscribe to this state for real-time updates.
- **Optimized Flux:** Reduces the number of API requests by keeping a local copy of the cart data for immediate UI rendering.


## Next Steps

- 🛒 [Add to Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - Deep dive into item addition logic.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - How Redux state is used during the checkout process.
- 💾 [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - How state is maintained across sessions.
