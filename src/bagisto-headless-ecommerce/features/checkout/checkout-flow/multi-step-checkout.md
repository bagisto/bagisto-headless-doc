# Multi-step Checkout

This guide explains the implementation of the multi-step checkout process in the Bagisto Headless storefront.


## Overview

The checkout process is broken down into five distinct steps to ensure a smooth user experience. Each step captures specific information required to place an order, starting from the user's email to a final order review. The state is managed via URL search parameters and Redux, ensuring that the current progress is maintained across page refreshes.


## 1. Checkout Steps

The checkout process follows the sequence: **Email** → **Address** → **Shipping** → **Payment** → **Review**.

### Logic Overview
The current step is determined by the `step` search parameter in the URL. If no parameter is provided, it defaults to the `email` step.

**File:** `src/app/(checkout)/checkout/page.tsx`
```typescript
const { step = "email" } = (await searchParams);
return <CheckOut step={step} />;
```

The `Stepper` component then renders the appropriate step based on this key.

**Step Keys:**
- `email`: User identification (guest or customer).
- `address`: Collection of billing and shipping addresses.
- `shipping`: Selection of available shipping methods.
- `payment`: Selection of available payment methods.
- `review`: Order summary and final placement.


## 2. GraphQL Operations

Each step involves specific GraphQL mutations to save information incrementally to the Bagisto backend.

### Billing & Shipping Address
Saves the customer's contact and physical address information.

**Mutation:** `CREATE_CHECKOUT_ADDRESS`
**File:** `src/graphql/checkout/mutations/CreateCheckoutAddress.ts`

```graphql
mutation createCheckoutAddress($token: String!, $billingFirstName: String!, ...) {
  createCheckoutAddress(input: {
    token: $token,
    billingFirstName: $billingFirstName,
    # ... other billing/shipping fields
  }) {
    checkoutAddress {
      success
      message
    }
  }
}
```

### Shipping & Payment Methods
After addresses are saved, the backend calculates available shipping and payment options. These are saved using:
- `CREATE_CHECKOUT_SHIPPING_METHOD`
- `CREATE_CHECKOUT_PAYMENT_METHOD`

### Final Order Placement
The final step executes the order creation.

**Mutation:** `CREATE_CHECKOUT_ORDER`
**File:** `src/graphql/checkout/mutations/CreateCheckoutOrder.ts`


## 3. Frontend Implementation

### The Stepper Component
The `Stepper` component acts as a layout wrapper for all checkout steps, providing a visual progress indicator.

**File:** `src/components/checkout/stepper/index.tsx`
```tsx
const steps = [
  { id: 1, key: "email", title: "Email", component: <Email /> },
  { id: 2, key: "address", title: "Address", component: <GuestAddAdressForm /> },
  // ... other steps
];
```

### State & Navigation
The storefront uses **Redux** to share cart details across the checkout steps and **URL routing** to navigate between them. When a step is successfully completed (e.g., after the `CREATE_CHECKOUT_ADDRESS` mutation), the user is redirected to the next step via:

```typescript
router.push("/checkout?step=shipping");
```


## 4. Caching & Performance

Checkout operations are inherently dynamic and transaction-based. To ensure data accuracy:
- **No Caching:** All checkout API requests are made with `cache: "no-store"` to prevent stale data.
- **Server Actions:** Mutations are triggered by client interactions, providing immediate feedback.
- **Revalidation:** After placing an order, the cart state is cleared in Redux.


## Summary

- **Incremental Progress:** Information is saved step-by-step to the backend.
- **URL-Based Routing:** The progress is tracked and navigated via the `step` search parameter.
- **Redux Integration:** Global cart state is utilized to display totals, items, and selected methods throughout the flow.
- **Transaction Integrity:** No-cache policies ensure the checkout data always reflects the latest backend calculations.

## Next Steps

- 💳 [Payment Integration](/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-methods.md) - Deep dive into payment provider setup.
- 📦 [Shipping & Billing](/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md) - Details on address management.
- 🛍️ [Clear Cart](/bagisto-headless-ecommerce/features/cart/cart-operations/clear-cart.md) - How the session is reset after a successful order.
