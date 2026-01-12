# Update Cart Item

This guide explains how users can modify the quantity of items already in their shopping cart within the Bagisto Headless storefront.


## Overview

The update cart operation allows users to adjust item quantities directly from the cart sidebar or cart page. This process involves capturing the new quantity, identifying the specific cart item ID, executing a GraphQL mutation via a server-side API route, and synchronizing the updated cart data with the Redux store.


## 1. GraphQL Mutation

The `UPDATE_CART_ITEM` mutation is used to send the new quantity and cart item identifier to the Bagisto backend.

**File:** `src/graphql/cart/mutations/UpdateCartItems.ts`

```graphql
mutation UpdateCartItem(
  $token: String!
  $cartItemId: Int!
  $quantity: Int!
) {
  createUpdateCartItem(
    input: {
      token: $token
      cartItemId: $cartItemId
      quantity: $quantity
    }
  ) {
    updateCartItem {
      id
      taxAmount
      shippingAmount
      subtotal
      grandTotal
      items {
        edges {
          node {
            id
            quantity
            # ... other item fields
          }
        }
      }
      itemsQty
    }
  }
}
```


## 2. Frontend Implementation

The update logic is encapsulated in the `useAddProduct` hook, which provides the `onUpdateCart` function.

### Update Hook Logic
The hook handles the communication with the `cart/updateCart` API route and updates the local Redux state on success.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
export const useAddProduct = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync: updateCartItem } = useMutation({
    onSuccess: (response) => {
      const responseData = response?.data?.createUpdateCartItem?.updateCartItem;

      if (responseData) {
        // SYNCHRONIZATION: Update Redux store with fresh cart data
        dispatch(addItem(responseData));
        showToast("Cart updated successfully", "success");
      }
    },
  });

  const onUpdateCart = async ({ cartItemId, quantity }) => {
    if (quantity < 1) return; // Minimum quantity check

    const token = getCartToken();
    await updateCartItem({
      token: token || "",
      cartItemId,
      quantity,
    });
  };

  return { onUpdateCart, isUpdateLoading };
};
```


## 3. UI Interaction

In components like the `CartSidebar`, users typically interact with quantity selectors (plus/minus buttons) that trigger the `onUpdateCart` function.

```tsx
function CartItem({ item }) {
  const { onUpdateCart, isUpdateLoading } = useAddProduct();

  const handleUpdate = (newQuantity) => {
    onUpdateCart({
      cartItemId: item.id,
      quantity: newQuantity
    });
  };

  return (
    <div>
       {/* Quantity controls here */}
       <button onClick={() => handleUpdate(item.quantity + 1)} disabled={isUpdateLoading}>
         +
       </button>
    </div>
  );
}
```


## 4. State Synchronization

- **Immediate Feedback:** While the update is in progress, the UI can show a loading state (e.g., using `isUpdateLoading`).
- **Server-Driven Data:** After a successful update, the server returns the entire updated cart object. The Redux state is replaced with this fresh data, ensuring all totals (grand total, tax, etc.) are recalculated accurately by the Bagisto core.


## Summary

- **Scoped Updates:** Updates are performed on individual cart items using their unique IDs.
- **Validation:** Ensures quantities don't drop below 1 using client-side checks.
- **Accurate Totals:** Synchronizes the entire cart state after every update to reflect current prices and taxes.
- **Optimized UI:** Uses loading states to prevent multiple simultaneous update requests.

## Next Steps

- 🗑️ [Remove from Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/remove-from-cart.md) - Learn how to delete items.
- 🛒 [Add to Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - Standard addition workflow.
- 💾 [Cart Synchronization](/bagisto-headless-ecommerce/features/cart/state-management/cart-synchronization.md) - Understanding state rehydration.
