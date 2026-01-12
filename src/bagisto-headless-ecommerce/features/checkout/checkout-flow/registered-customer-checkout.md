# Registered Customer Checkout

This guide explains the checkout experience for authenticated (logged-in) customers in the Bagisto Headless storefront.


## Overview

For registered customers, the checkout process is streamlined by leveraging their existing account data. This includes pre-filling contact information and allowing them to select from their saved address book, resulting in a faster and more personalized experience compared to guest checkout.


## 1. Authentication Integration

The checkout process automatically detects the user's authentication status using **NextAuth.js**.

- **Session Detection:** The `Stepper` component and individual steps check if a customer session is active.
- **Email Recognition:** In the initial **Email** step, the customer's account email is automatically retrieved and pre-filled, often skipping the manual entry requirement.

**File:** `src/components/checkout/stepper/Email.tsx`
```tsx
const emailFromStorage = getLocalStorage(EMAIL);
const isGuest = !session; // Simplified representation of auth check
```


## 2. Address Management for Customers

Unlike guest users who must enter their address manually, registered customers can leverage their saved address book.

### Automatic Address Fetching
The storefront uses the `useAddressesFromApi` helper to fetch any addresses already associated with the customer's active cart or account.

**File:** `src/utils/helper.ts`
```typescript
export const useAddressesFromApi = () => {
  const { data } = useAddress();
  // Maps API nodes like 'cart_billing' and 'cart_shipping' to local state
  return {
    billingAddress: mapNode(billingNode),
    shippingAddress: mapNode(shippingNode),
  };
};
```

### Pre-filling the Form
The `GuestAddAdressForm` (which also handles registered users) uses these initial values to populate the form fields immediately.

**File:** `src/components/checkout/stepper/GuestAddAdressForm.tsx`
```tsx
export const GuestAddAdressForm = ({ initialBilling, initialShipping }) => {
  const { reset } = useForm({
    defaultValues: {
      billing: {
        email: initialBilling?.email || "",
        firstName: initialBilling?.firstName || "",
        // ... other fields
      }
    }
  });
};
```


## 3. Persistent Cart Merging

If a user was browsing as a guest and then logs in during the checkout process, the storefront automatically merges their guest cart into their customer account. This ensures no items are lost and the checkout progress is maintained.

- **Trigger:** Login mutation success.
- **Action:** `CREATE_MERGE_CART` mutation is executed.
- **Outcome:** The local Redux store is updated with the consolidated cart data.



## Summary

- **Profile Aware:** Utilizes account data to minimize user effort.
- **Seamless Merge:** Transitions guest carts into customer accounts without data loss.
- **Dynamic Pre-filling:** Uses custom hooks to fetch and map saved addresses to the checkout forms.
- **Unified Experience:** Shares the same multi-step logic as guest checkout but with automated data population.

## Next Steps

- 🔐 [Customer Authentication](/bagisto-headless-ecommerce/authentication/nextauth-setup.md) - Understanding how customer sessions are managed.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - Overview of the universal checkout stages.
- 🏠 [Address Book](/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md) - Managing saved addresses in the customer profile.
