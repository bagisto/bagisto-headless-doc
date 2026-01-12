# Remove from Cart

This guide explains how to implement the functionality to remove items from the shopping cart in the Bagisto Headless storefront.


## Overview

The "Remove from Cart" operation allows users to delete specific items from their cart. This process involves identifying the cart item ID, executing a GraphQL mutation through the backend API, and updating the local Redux state. If the last item is removed, the storefront also handles clearing the entire cart session and resetting guest tokens.


## 1. GraphQL Mutation

The `REMOVE_CART_ITEM` mutation is responsible for deleting a specific item based on its ID and the active session token.

**File:** `src/graphql/cart/mutations/RemoveCartItem.ts`

```graphql
mutation RemoveCartItem(
  $token: String!
  $cartItemId: Int!
) {
  createRemoveCartItem(
    input: {
      token: $token
      cartItemId: $cartItemId
    }
  ) {
    removeCartItem {
      id
      grandTotal
      items {
        edges {
          node {
            id
            name
          }
        }
      }
      itemsQty
    }
  }
}
```


## 2. Frontend Implementation

The removal logic is provided by the `useAddProduct` hook through the `onAddToRemove` function.

### Removal Hook Logic
The hook manages the API request and performs different state updates depending on whether the cart still contains items.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
export const useAddProduct = () => {
  const dispatch = useAppDispatch();
  const { resetGuestToken } = useGuestCartToken();

  const { mutateAsync: removeFromCart } = useMutation({
    onSuccess: async (response) => {
      const responseData = response?.data?.createRemoveCartItem;

      if (responseData?.removeCartItem) {
        // 1. Sync Redux with updated cart data
        dispatch(addItem(responseData.removeCartItem));
        showToast("Item removed successfully", "success");

        // 2. If cart is now empty, clear everything
        if (!responseData.removeCartItem.itemsQty) {
          dispatch(clearCart());
          resetGuestToken();
        }
      }
    },
  });

  const onAddToRemove = async (cartItemId: string) => {
    const token = getCartToken();
    await removeFromCart({
      token: token || "",
      cartItemId: parseInt(cartItemId),
    });
  };

  return { onAddToRemove, isRemoveLoading };
};
```


## 3. UI Implementation

In the `CartSidebar` or cart page, a "Remove" button or "Delete" icon triggers the removal process.

```tsx
function CartItem({ item }) {
  const { onAddToRemove, isRemoveLoading } = useAddProduct();

  return (
    <button 
      onClick={() => onAddToRemove(item.id)} 
      disabled={isRemoveLoading}
    >
      {isRemoveLoading ? 'Removing...' : 'Remove'}
    </button>
  );
}
```


## 4. Session and Data Management

- **Clean Slate:** When `itemsQty` reaches zero, `dispatch(clearCart())` resets the entire Redux state (including addresses and payment methods) to ensure a fresh experience for the next purchase.
- **Guest Token Reset:** In addition to the Redux state, `resetGuestToken()` handles the clearing of persisted cookies and generates a new session identifier if necessary.
- **Immediate Sync:** Like addition and updates, removal returns the latest cart object, ensuring all totals are updated instantly.


## Summary

- **Identifier-Based:** Removal works specifically with the unique `cartItemId`.
- **Session Cleanup:** Automatically clears guest tokens and Redux state when the cart becomes empty.
- **Reactive UI:** Uses loading states to prevent multiple clicks during the deletion process.
- **Integrated Feedback:** Displays success toasts to confirm the item has been removed.


## Next Steps

- 🔄 [Update Cart Item](/bagisto-headless-ecommerce/features/cart/cart-operations/update-cart-item.md) - Learn how to change item quantities.
- 🛒 [Add to Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - The standard addition workflow.
- 💾 [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - How cart sessions are managed.
