# Order Confirmation

This guide explains the final stage of the checkout process: the order confirmation/success page in the Bagisto Headless storefront.


## Overview

After a user successfully places an order, they are redirected to the `/success` page. This page serves as a clear confirmation that the transaction was successful and provides the user with their unique order identifier. It also ensures that the shopping session is properly concluded by clearing any remaining cart data.


## 1. Redirection to Success

The redirection is triggered immediately after the `CREATE_CHECKOUT_ORDER` mutation returns a successful response from the Bagisto backend.

**File:** `src/utils/hooks/useCheckout.ts`

```typescript
onSuccess: (response) => {
  const responseData = response?.data?.createCheckoutOrder?.checkoutOrder;
  if (responseData) {
    // 1. Store order ID in a temporary cookie
    setCookie(ORDER_ID, responseData.orderId);
    
    // 2. Clear Redux cart state
    dispatch(clearCart());
    
    // 3. Redirect to the success page
    router.replace("/success");
  }
}
```


## 2. Order ID Retrieval

The success page needs to display the order number to the user. Since the cart session has been cleared, the storefront retrieves this information from a temporary cookie called `ORDER_ID`.

**File:** `src/components/cart/OrderDetail.tsx`

```tsx
export default function OrderDetail() {
    const getOrderId = getCookie(ORDER_ID);

  return (
    <div>
      <h1>
        Your order <span>#{getOrderId}</span> has been placed successfully
      </h1>
      <p>Missing page, but your next favorite chair is just a click away.</p>
    </div>
  );
}
```


## 3. Session Conclusion

The success page includes a "Continue shopping" button that acts as a final sweep for the user session. It ensures that the Redux state is fully reset before the user returns to the catalog.

**File:** `src/components/checkout/success/EmptyCart.tsx`

```tsx
function SubmitButton({ buttonName, redirectNav }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Proactively clear the cart in case of manual page visits
    dispatch(clearCart());
  }, []);

  return (
    <button onClick={() => {
        dispatch(clearCart());
        router.replace(redirectNav);
      }}>
      {buttonName}
    </button>
  );
}
```


## 4. Key UI Elements

- **Success Icon:** A visual checkmark indicating a completed transaction.
- **Order Number:** Boldly displayed using the ID retrieved from the session cookie.
- **Action Button:** A prominent call-to-action to return to the home page or catalog.



## Summary

- **User Assurance:** Provides immediate visual and textual confirmation of the order.
- **State Integrity:** Performs a final reset of the cart state to prepare for the next shopping session.
- **Data Persistence:** Uses secure, temporary cookies to bridge the data gap between the checkout flow and the success page.
- **Seamless Re-entry:** Encourages users to continue browsing with a clear navigation path.


## Next Steps

- 💳 [Payment Processing](/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-processing.md) - Understanding the logic that leads to this page.
- 🗑️ [Clear Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/clear-cart.md) - Details on how the session is reset.
