# Add to Cart

This guide explains the "Add to Cart" workflow in the Bagisto Headless storefront, covering both simple and configurable products.


## Overview

Adding a product to the cart is a multi-step process that involves validating user selection (like variants), preparing session tokens, executing a GraphQL mutation, and updating the global state. The storefront provides immediate feedback through loading states and toast notifications.


## 1. Interaction Workflow

The process starts in the `AddToCart` component, typically located on the product detail page.

### Component Logic
The `AddToCart` component manages internal state for quantity and interacts with URL parameters for variant selection.

**File:** `src/components/cart/AddToCart.tsx`

```tsx
export function AddToCart({ productId, userInteracted }) {
  const { onAddToCart, isCartLoading } = useAddProduct();
  const [quantity, setQuantity] = useState(1);

  const handleAction = async () => {
    // 1. Determine the correct product/variant ID
    const pid = isConfigurable ? selectedVariantId : productId;
    
    // 2. Trigger the add to cart logic
    await onAddToCart({
      productId: pid,
      quantity,
    });
  };

  return (
    <form onSubmit={handleAction}>
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <SubmitButton pending={isCartLoading} />
    </form>
  );
}
```


## 2. Business Logic (useAddProduct Hook)

The `useAddProduct` hook encapsulates the core logic for the operation, including session management and API interaction.

**File:** `src/utils/hooks/useAddToCart.ts`

```typescript
export const useAddProduct = () => {
  const dispatch = useAppDispatch();
  const { createGuestToken } = useGuestCartToken();

  const onAddToCart = async ({ productId, quantity }) => {
    // 1. Ensure a valid session token exists
    let token = getCartToken();
    if (!token) {
      token = await createGuestToken();
    }

    // 2. Perform the API call via React Query mutation
    await mutateAsync({
      productId: parseInt(productId),
      quantity,
      token: token,
    });
  };

  // ... Mutation logic handles the response and updates Redux
};
```


## 3. GraphQL Mutation

The operation relies on the `CREATE_ADD_PRODUCT_IN_CART` mutation, which sends the product details to the Bagisto backend.

**File:** `src/graphql/cart/mutations/AddProductToCart.ts`

```graphql
mutation CreateAddProductInCart(
  $token: String
  $productId: Int!
  $quantity: Int!
) {
  createAddProductInCart(
    input: {
      token: $token
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


## 4. Updates and Feedback

Once the mutation succeeds:
- **State Update:** The updated cart data returned by the server is dispatched to the Redux store using the `addItem` action.
- **Visual Feedback:** A success toast notification is displayed to the user.
- **Persistence:** If a new session was created, the token is persisted in cookies for future requests.



## Summary

- **Unified Logic:** Handles both simple and configurable products seamlessly.
- **Session Aware:** Automatically creates a guest session if none exists.
- **Reactive UI:** Uses Redux to update cart icons and sidebars instantly.
- **Error Resilient:** Provides clear feedback if an item is out of stock or if the session fails.


## Next Steps

- 🗑️ [Remove from Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/remove-from-cart.md) - Learn how to delete items.
- 🔄 [Update Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/update-cart-item.md) - Managing item quantities in the cart.
- 💾 [Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - How cart tokens are managed.
