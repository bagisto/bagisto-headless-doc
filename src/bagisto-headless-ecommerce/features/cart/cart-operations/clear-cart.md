# Clear Cart

This guide explains how the shopping cart is cleared in the Bagisto Headless storefront, typically after a successful purchase or when the last item is removed.


## Overview

In Bagisto Headless, clearing the cart involves resetting both the server-side session and the client-side global state. This ensures that the user starts with a fresh shopping session for their next purchase, with no lingering items, addresses, or selected shipping/payment methods.


## 1. Triggering the Clear Action

The cart is cleared in two primary scenarios:
- **Automated Removal:** When the user removes the last item from their cart, the storefront detects that the item count has reached zero and triggers a complete reset.
- **Post-Purchase:** After a user successfully completes the checkout process, the "Success" page uses a dedicated button to clear the state and redirect the user back to the home page.

### Example: ClearCartButton
The `ClearCartButton` component is used on the order success page to ensure the cart is empty before the user continues shopping.

**File:** `src/components/checkout/success/EmptyCart.tsx`

```tsx
function SubmitButton({ buttonName, redirectNav }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart state when the component mounts
    dispatch(clearCart());
  }, []);

  return (
    <button
      onClick={() => {
        dispatch(clearCart());
        router.replace(redirectNav);
      }}
    >
      {buttonName}
    </button>
  );
}
```


## 2. Redux State Reset

The `clearCart` reducer is responsible for resetting all cart-related fields in the Redux store to their initial values.

**File:** `src/store/slices/cart-slice.ts`

```typescript
clearCart(state) {
  state.cart = undefined;
  state.billingAddress = null;
  state.shippingAddress = null;
  state.selectedShippingRate = null;
  state.selectedPayment = null;
},
```


## 3. Session and Cookie Cleanup

In addition to the Redux state, the storefront also clears the persisted session identifiers stored in cookies via the `resetGuestToken` function.

**File:** `src/utils/hooks/useGuestCartToken.ts`

```typescript
const resetGuestToken = async () => {
  tokenCreated = false;

  // Delete persisted session cookies
  deleteCookie(GUEST_CART_TOKEN);
  deleteCookie(GUEST_CART_ID);

  // Optionally create a new fresh token for the next session
  await createGuestToken();
};
```


## 4. Integration with Removal Flow

The logic is also integrated into the item removal process to provide a seamless transition when the cart becomes empty.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
if (!responseData?.removeCartItem?.itemsQty) {
  // If the server returns 0 items, perform a full local reset
  dispatch(clearCart());
  resetGuestToken();
}
```



## Summary

- **Multi-layer Reset:** Clears Redux state, cookies, and local identifiers.
- **Contextual Usage:** Triggered automatically upon reaching zero items or manually after checkout.
- **Data Integrity:** Ensures no stale address or payment information persists between different shopping sessions.
- **Seamless Re-entry:** Prepares the storefront for the next customer interaction immediately.


## Next Steps

- 🗑️ [Remove from Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/remove-from-cart.md) - How individual items are deleted.
- 💾 [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - Understanding how session tokens work.
- 🚚 [Checkout Flow](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - How the cart state is used during checkout.
