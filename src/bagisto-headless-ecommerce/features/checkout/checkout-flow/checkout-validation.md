# Checkout Validation

This guide explains the multi-layered validation strategy used in the Bagisto Headless storefront to ensure data integrity and a smooth checkout experience.


## Overview

Validation in the checkout flow occurs at three levels:
1.  **Client-Side:** Immediate feedback using form validation rules.
2.  **Logic-Side:** Ensuring the user follows the correct sequence of steps.
3.  **Server-Side:** Backend validation for business rules like stock availability and payment eligibility.


## 1. Client-Side Form Validation

The storefront uses **React Hook Form** to provide real-time validation for all checkout inputs, such as email, billing addresses, and shipping details.

### Example: Email Validation
The email step ensures a correctly formatted email is provided before allowing the user to proceed.

**File:** `src/components/checkout/stepper/Email.tsx`
```tsx
{...register("email", {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address",
  }
})}
```

### Example: Address & Phone Validation
The address form includes complex validation, such as minimum length requirements for phone numbers.

**File:** `src/components/checkout/stepper/GuestAddAdressForm.tsx`
```tsx
{...register("billing.phone", {
  required: "Phone field is required",
  validate: (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length >= 10 || "Phone must be at least 10 digits";
  }
})}
```


## 2. Step and Sequence Validation

To prevent users from skipping essential checkout steps (e.g., trying to access the payment step without providing an address), the `isCheckout` helper validates the current state against the requested URL.

**File:** `src/utils/helper.ts`
```typescript
export const isCheckout = (items, isGuest, email, isSeclectAddress, ...) => {
  if (!items || items.length === 0) return "/"; // Redirect to home if cart is empty

  if (isSeclectAddress && !isSelectShipping) {
    return "/checkout?step=shipping"; // Force return to shipping if address is set but shipping is not
  }
  // ... other step sequence checks
};
```


## 3. Server-Side Business Validation

When a user submits a step (like saving an address or placing an order), the request is sent to the Bagisto GraphQL API. The backend performs critical checks:
- **Stock Validation:** Ensures items are still in stock at the moment of checkout.
- **Address Eligibility:** Validates if shipping is available to the provided zip code/country.
- **Payment Success:** Validates the selected payment method against the cart total.

### Handling API Errors
If the server rejects a request, the `useCheckout` hook captures the error and displays it to the user via a toast notification.

**File:** `src/utils/hooks/useCheckout.ts`
```typescript
onSuccess: (response) => {
  if (isObject(responseData)) {
    showToast(responseData.message, "success");
    // Proceed to next step
  } else {
    // Show backend validation error (e.g., "Out of stock")
    showToast(response?.error?.message, "warning");
  }
}
```


## 4. Visual Feedback

- **Input Errors:** Validation messages appear immediately below the affected input fields.
- **Loading States:** Submit buttons are disabled and show loading spinners during API validation to prevent double submissions.
- **Toasts:** Real-time feedback for successful saves or server-side rejections.



## Summary

- **Proactive Feedback:** React Hook Form catches most errors before they reach the server.
- **Sequence Integrity:** URL-based logic prevents jumping ahead in the checkout process.
- **Backend Authority:** Bagisto core acts as the final validator for commerce rules (stock, taxes, shipping).
- **Graceful Error Handling:** Server errors are translated into user-friendly toast notifications.

## Next Steps

- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - Understanding the overall flow.
- 🔐 [Guest Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/guest-checkout.md) - How guest-specific validation is handled.
- 💾 [Cart Synchronization](/bagisto-headless-ecommerce/features/cart/state-management/cart-synchronization.md) - Ensuring local data matches the server.
