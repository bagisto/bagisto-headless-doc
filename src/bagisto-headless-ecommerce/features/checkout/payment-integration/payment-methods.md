# Payment Methods

This guide explains how payment methods are fetched, selected, and processed within the Bagisto Headless checkout flow.


## Overview

In the fourth step of the checkout process, users select their preferred payment method (e.g., Cash on Delivery, Money Transfer, or online gateways like PayPal/Stripe). The storefront dynamically fetches eligible methods based on the billing address and order total, ensuring only applicable options are displayed.


## 1. Fetching Available Methods

Similar to shipping methods, payment options are retrieved from the backend once the address information is saved. The `useQuery` hook fetches this data based on the active cart token.

**File:** `src/components/checkout/stepper/payment/index.tsx`

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["paymentMethods", token],
  queryFn: () =>
    fetchHandler({
      url: "checkout/paymentMethods",
      method: "POST",
      body: { token },
    }),
});
```


## 2. Selection UI

Payment methods are displayed using an accessible radio group. Each option includes a title and a brief description providing clarity on the payment terms.

**File:** `src/components/checkout/stepper/payment/PaymentMethod.tsx`

```tsx
<RadioGroup value={field.value} onValueChange={field.onChange}>
  {methods.map((method) => (
    <CustomRadio
      key={method.method}
      description={method.description}
      value={method.method}
    >
      {method.title}
    </CustomRadio>
  ))}
</RadioGroup>
```


## 3. Saving the Payment Selection

Once a user selects a method and clicks "Pay Now", the selection is persisted to the Bagisto backend.

### GraphQL Mutation
The `CREATE_CHECKOUT_PAYMENT_METHODS` mutation handles the association between the cart and the selected gateway. It also accepts redirect URLs for online payments.

**File:** `src/graphql/checkout/mutations/CreateCheckoutPaymentMethod.ts`

```graphql
mutation CreateCheckoutPaymentMethod($token: String!, $paymentMethod: String!) {
  createCheckoutPaymentMethod(input: {
    token: $token,
    paymentMethod: $paymentMethod,
    # Optional redirect URLs for external gateways
    paymentSuccessUrl: "/success",
    paymentFailureUrl: "/checkout?step=payment"
  }) {
    checkoutPaymentMethod {
      success
      message
      paymentGatewayUrl # Provided if an external redirect is required
    }
  }
}
```

### Hook Implementation
The `useCheckout` hook manages the submission and transitions the user to the final **Review** step.

**File:** `src/utils/hooks/useCheckout.ts`


## 4. Navigation & Redirects

- **Offline Methods:** For methods like "Cash on Delivery", the user is simply advanced to the `review` step.
- **Online Gateways:** If the selected method requires external authorization (e.g., Stripe, PayPal), the API may return a `paymentGatewayUrl`. The storefront can then redirect the user to complete the transaction on the provider's secure page.



## Summary

- **Contextual Options:** Displays only the payment methods supported by the current store configuration and user location.
- **Incremental Progress:** Saves the choice to the backend immediately upon selection.
- **Rich Feedback:** Provides descriptions for each method to help users make informed decisions.
- **Flexible Extensions:** The architecture supports both standard offline payments and complex online gateway redirects.

## Next Steps

- 🔍 [Order Review](/bagisto-headless-ecommerce/features/checkout/payment-integration/order-confirmation.md) - The final step before order placement.
- 📦 [Shipping Methods](/bagisto-headless-ecommerce/features/checkout/shipping-billing/shipping-methods.md) - How costs are calculated before payment selection.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - The overall checkout structure.
