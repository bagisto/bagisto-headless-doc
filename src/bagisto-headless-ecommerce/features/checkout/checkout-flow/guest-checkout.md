# Guest Checkout

This guide explains how guest users can complete the checkout process without creating an account in the Bagisto Headless storefront.


## Overview

Guest checkout allows users to make purchases quickly by providing only their email and address information during the checkout flow. The storefront manages these guest sessions using persisted tokens and local storage to ensure a seamless experience from cart addition to order placement.


## 1. Guest Session Initialization

As explained in the [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) guide, a guest session begins as soon as a user adds their first item to the cart.

- **Token Generation:** A `GUEST_CART_TOKEN` is created and stored in cookies.
- **Cart Context:** Every subsequent request (fetching cart details, adding/removing items) includes this token to identify the user's specific guest cart on the Bagisto backend.


## 2. Guest-Specific Checkout Steps

While the overall checkout flow is the same for guests and customers, several components are specifically designed to handle guest data.

### Email Step
For guests, the `Email` component allows direct entry of their contact email. This email is stored in local storage to pre-populate subsequent address fields.

**File:** `src/components/checkout/stepper/Email.tsx`

```tsx
const onSubmit = async (data: EmailFormValues) => {
  // Store guest email locally for address pre-population
  setLocalStorage(EMAIL, data?.email);
  router.push("/checkout?step=address");
};
```

### Guest Address Form
The `GuestAddAdressForm` is used to collect billing and shipping information from non-authenticated users.

**File:** `src/components/checkout/stepper/GuestAddAdressForm.tsx`

```tsx
export const GuestAddAdressForm = ({ billingAddress, shippingAddress }) => {
  const email = getLocalStorage(EMAIL);
  
  const addGuestAddress = async (data) => {
    const payload = {
      billingFirstName: data.billing.firstName,
      billingEmail: data.billing.email ?? email,
      // ... other guest billing/shipping fields
    };

    // Save to Bagisto backend using the guest session token
    await saveCheckoutAddress(payload);
  };

  return (
    <form onSubmit={handleSubmit(addGuestAddress)}>
      {/* Address fields here */}
    </form>
  );
};
```


## 3. Order Placement for Guests

When a guest places an order, the `SavePlaceOrder` function handles the finalization and session cleanup.

**File:** `src/utils/hooks/useCheckout.ts`

```typescript
const SavePlaceOrder = async () => {
  const token = getCartToken();
  
  // 1. Send the place order mutation to Bagisto
  await placeOrder({ token });
  
  // 2. Perform checkout cleanup for the guest session
  await resetGuestToken();
};
```

### Post-Order Cleanup
To ensure security and a clean state for future guest sessions:
- **Redux Reset:** The `clearCart` action is dispatched to reset the global state.
- **Token Reset:** The `resetGuestToken` function deletes the `GUEST_CART_TOKEN` and `GUEST_CART_ID` cookies.
- **Success Redirect:** The user is redirected to the `/success` page where they can see their order summary.


## 4. Key Considerations

- **Session Longevity:** Guest sessions are persisted via cookies for a defined period (e.g., 7 days) or until the order is placed.
- **Customer Conversion:** Guests are encouraged to log in via links in the email step, but it is not required.
- **Data Privacy:** Guest addresses and emails are sent over the secure GraphQL API and are only accessible via the specific session token until the order is finalized.


## Summary

- **Low Friction:** No account creation required for order placement.
- **Email Tracking:** Captures guest email early for communication and address population.
- **Session Managed:** Uses secure tokens to link carts and checkout progress to the guest browser.
- **Clean Transitions:** Automatically handles session destruction after order success.

## Next Steps

- 🔐 [Customer Authentication](/bagisto-headless-ecommerce/authentication/nextauth-setup.md) - How guest carts are merged into customer accounts.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - Full breakdown of the checkout stages.
- 💾 [Cart Persistence](/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md) - Detailed look at guest token management.
