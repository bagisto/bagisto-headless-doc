# Payment Processing

This guide explains the technical flow and logic behind processing payments and finalizing orders in the Bagisto Headless storefront.


## Overview

Payment processing is the final stage of the checkout journey. It involves validating the selected payment method, capturing the order intent, communicating with the Bagisto backend to generate an official order record, and handling the transition to the success state.


## 1. Capturing the Payment Intent

When a user selects a payment method and clicks "Pay Now", the storefront captures this choice and sends it to the API.

### Mutation Execution
The `CREATE_CHECKOUT_PAYMENT_METHODS` mutation is used to associate the payment method with the cart. This step is critical as it allows the backend to perform final total calculations, including any payment-specific surcharges or discounts.

**File:** `src/graphql/checkout/mutations/CreateCheckoutPaymentMethod.ts`

### Frontend Transition
Upon success, the storefront navigates the user to the `review` step. At this point, the backend has all the necessary information (Address, Shipping, and Payment) but the order is not yet "placed".

```typescript
// useCheckout.ts
onSuccess: (response) => {
  // Save choosing payment choice
  router.replace("/checkout?step=review");
}
```


## 2. Final Order Placement

The actual "processing" happens when the user clicks **"Place Order"** on the review page. This triggers the `CREATE_CHECKOUT_ORDER` mutation.

### Order Generation
The backend converts the active cart into a permanent order record.
1. **Validation:** Checks stock, price changes, and payment eligibility one last time.
2. **Record Creation:** Generates a unique `orderId`.
3. **Session Link:** Associates the order with the customer (if logged in) or the checkout token.

### Post-Placement Logic
Once the order is successfully created, the storefront performs several cleanup actions:

**File:** `src/utils/hooks/useCheckout.ts`

```typescript
const { mutateAsync: placeOrder } = useMutation({
  onSuccess: (response) => {
    const responseData = response?.data?.createCheckoutOrder?.checkoutOrder;
    if (responseData) {
      // 1. Store order ID for the success page
      setCookie(ORDER_ID, responseData.orderId);
      
      // 2. Clear client-side cart state
      dispatch(clearCart());
      
      // 3. Navigate to success page
      router.replace("/success");
    }
  }
});
```


## 3. Session and Token Management

To ensure security and prevent session reuse:
- **Cookie Storage:** The `ORDER_ID` is stored in a cookie so the `/success` page can retrieve and display the order details without needing an active cart session.
- **Token Invalidation:** The `resetGuestToken` function is called to delete the cart-specific cookie identifiers.

```typescript
const SavePlaceOrder = async () => {
  await placeOrder({ token });
  await resetGuestToken(); // Deletes GUEST_CART_TOKEN
};
```


## 4. Handling Redirects (Online Payments)

For online gateways (e.g., PayPal, Stripe), the architecture supports redirection to external authorization pages.
- **Success URL:** Where the gateway should return the user after payment.
- **Failure URL:** Where the gateway should return the user if the payment is declined.

Currently, the storefront can pass these URLs during the payment selection mutation to ensure the user is returned to the correct state in the headless application.



## Summary

- **Staged Submission:** Decouples payment selection from final order placement.
- **Transaction Safety:** Performs a final validation check at the moment of order creation.
- **State Cleanup:** Ensures the browser session is reset immediately after a successful purchase.
- **Order Tracking:** Uses temporary cookies to pass order identifiers to the success page.


## Next Steps

- ✅ [Order Success](/bagisto-headless-ecommerce/features/checkout/payment-integration/order-confirmation.md) - What the user sees after payment.
- 🛍️ [Clear Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/clear-cart.md) - Deep dive into the session reset logic.
- 💳 [Payment Methods](/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-methods.md) - How methods are initially selected.
