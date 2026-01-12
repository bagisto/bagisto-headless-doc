# Cart Actions and Reducers

This guide provides a detailed look at the Redux actions and reducers used to manage the cart state in the Bagisto Headless storefront.


## Overview

In Redux Toolkit, **actions** are objects that describe what happened, and **reducers** are functions that specify how the state changes in response to those actions. In Bagisto Headless, the `cart-slice` centralizes all logic for updating the shopping cart, addresses, and checkout selections.


## 1. Core Cart Actions

The primary action for managing cart data is `addItem`, which is responsible for synchronizing the server-side cart state with the local Redux store.

**File:** `src/store/slices/cart-slice.ts`

```typescript
// Action to update the entire cart object
addItem: (state, action: PayloadAction<Cart>) => {
  state.cart = { ...action.payload };
},

// Action to completely reset the cart state (e.g., after logout or checkout)
clearCart(state) {
  state.cart = undefined;
  state.billingAddress = null;
  state.shippingAddress = null;
  state.selectedShippingRate = null;
  state.selectedPayment = null;
},
```


## 2. Address Management Reducers

During the checkout process, the storefront manages billing and shipping addresses separately in the Redux state.

```typescript
// Update billing address
setBillingAddress(state, action: PayloadAction<AddressDataTypes>) {
  state.billingAddress = action.payload;
},

// Update shipping address
setShippingAddress(state, action: PayloadAction<AddressDataTypes>) {
  state.shippingAddress = action.payload;
},

// Update both addresses simultaneously
setCheckoutAddresses(state, action: PayloadAction<{ billing: AddressDataTypes; shipping: AddressDataTypes }>) {
  state.billingAddress = action.payload.billing;
  state.shippingAddress = action.payload.shipping;
},
```


## 3. Shipping & Payment Selection

The store also keeps track of the user's selections for shipping methods and payment providers.

```typescript
// Set the user's selected shipping rate/method
setSelectedShippingRate(state, action: PayloadAction<SelectedShippingRate>) {
  state.selectedShippingRate = action.payload;
},

// Set the user's selected payment method
setSelectedPayment(state, action: PayloadAction<SelectedPayment>) {
  state.selectedPayment = action.payload;
},
```


## 4. Usage in Components

These actions are dispatched from components or hooks using the `useAppDispatch` hook.

```typescript
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";

const dispatch = useAppDispatch();

// Example: Updating the cart after an API call
const handleAddToCart = (newCartData) => {
  dispatch(addItem(newCartData));
};
```


## Summary

- **addItem:** The workhorse action that keeps the local cart in sync with the backend.
- **Address Reducers:** Manage complex address structures for checkout.
- **Selection Actions:** Persist shipping and payment choices across checkout steps.
- **clearCart:** Ensures a clean state for new sessions or completed orders.


## Next Steps

- 🔩 [Redux Integration](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - How the store is configured and provided globally.
- 📦 [Cart Operations](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - Using these actions in real-world scenarios.
