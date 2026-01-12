# Address Validation

This guide explains the multi-layered validation logic used to ensure high-quality address data during the checkout process in the Bagisto Headless storefront.


## Overview

Address validation ensures that orders are only placed with reachable and accurate delivery information. The storefront implements validation at the **Input**, **Form**, and **API** levels to provide a seamless user experience while maintaining data integrity.


## 1. Input-Level Validation

Individual fields are validated as the user types or moves between inputs using **React Hook Form** rules.

### Required Fields
Critical fields like first name, last name, street address, city, postcode, and phone number are marked as required. If a user attempts to submit the form without these, the UI immediately displays a "Required" error message.

**File:** `src/components/checkout/stepper/GuestAddAdressForm.tsx`
```tsx
{...register("billing.firstName", {
  required: "First name is required",
})}
```

### Format Validation
Certain fields require specific formats:
- **Email:** Validated against a standard email regex pattern.
- **Phone Number:** Validated using a regex (`/^[\d\s\-\+\(\)]+$/`) and a custom validator to ensure a minimum of 10 digits after stripping non-numeric characters.

```tsx
validate: (value) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length >= 10 || "Phone must be at least 10 digits";
}
```


## 2. Dynamic Field Validation

The storefront dynamically changes validation requirements based on user interaction.

### "Same for Shipping" Toggle
- **When Checked:** Only the billing address fields are validated. The storefront internally clones these values for the shipping payload.
- **When Unchecked:** A whole new set of shipping fields becomes visible and carries its own independent validation rules, ensuring both addresses are fully vetted.


## 3. Server-Side Validation

Once the client-side checks pass, the address data is sent to the Bagisto GraphQL API via the `saveCheckoutAddress` mutation.

### Backend Checks
The Bagisto core performs advanced validation that the frontend cannot:
- **Country/State Matching:** Ensures the provided state is valid for the selected country.
- **Service Availability:** Validates if any active shipping methods can deliver to the specified postcode/region.

### Handling API Errors
If the backend rejects the address (e.g., due to an invalid zip code format not caught by the frontend), the `useCheckout` hook intercepts the GraphQL error and displays it as a warning toast.

**File:** `src/utils/hooks/useCheckout.ts`
```typescript
onSuccess: (response) => {
  if (!isObject(responseData)) {
    // Displays server-side validation error (e.g., "Invalid shipping address")
    showToast(response?.error?.message, "warning");
  }
}
```


## 4. UI/UX Feedback

- **Real-time Errors:** Error messages appear instantly below inputs to guide the user.
- **Visual Cues:** Erroneous inputs are often highlighted or accompanied by alert icons (depending on the CSS implementation).
- **Submission Guard:** Submit buttons are disabled or show a loading state while address validation is pending on the server.



## Summary

- **Proactive Checks:** Catches missing or poorly formatted data before an API call is made.
- **Clean Data:** Normalizes inputs (like phone numbers) to match backend expectations.
- **Backend Authority:** Relies on Bagisto for region-specific and business-rule validation.
- **Transparent Communication:** Uses toast notifications to relay complex server-side rejections to the user.

## Next Steps

- 🏠 [Address Management](/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md) - Overview of the address system.
- 💳 [Billing Information](/bagisto-headless-ecommerce/features/checkout/shipping-billing/billing-information.md) - Details on billing-specific data.
- 🧱 [Checkout Validation](/bagisto-headless-ecommerce/features/checkout/checkout-flow/checkout-validation.md) - Broader checkout-wide validation strategies.
