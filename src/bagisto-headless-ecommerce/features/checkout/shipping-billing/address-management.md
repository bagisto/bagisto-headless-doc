# Address Management

This guide explains how shipping and billing addresses are managed during the checkout process in the Bagisto Headless storefront.


## Overview

The address management system handles the collection, validation, and persistence of user location data. It supports both guest users (who enter data manually) and registered customers (who can use saved addresses). The system distinguishes between billing and shipping addresses and provides the option to use the same address for both.


## 1. Address Types

The storefront manages two types of addresses:
- **Billing Address:** The address associated with the payment method.
- **Shipping Address:** The physical location where the order will be delivered.

Users can toggle the "Use the same address for shipping?" checkbox to avoid redundant data entry.


## 2. Address Persistence

### Server-Side
Addresses are saved to the Bagisto backend using the `CREATE_CHECKOUT_ADDRESS` mutation. This mutation updates the active cart session with the provided details.

**File:** `src/graphql/checkout/mutations/CreateCheckoutAddress.ts`

### Client-Side (Redux)
Once the API responds with a success message, the addresses are also stored in the Redux store to ensure they remain accessible throughout the remainder of the checkout session (e.g., for the Order Review step).

**File:** `src/store/slices/cart-slice.ts`
```typescript
setCheckoutAddresses(state, action) {
  state.billingAddress = action.payload.billing;
  state.shippingAddress = action.payload.shipping;
},
```


## 3. Registered Customer Features

For authenticated users, the system provides an enhanced experience via the `useAddress` hook and `useAddressesFromApi` helper.

### Fetching Saved Addresses
The `useAddress` hook fetches address nodes associated with the current cart token from the API.

**File:** `src/utils/useAddress.ts`
```typescript
export const useAddress = () => {
  const token = getCartToken();
  return useQuery({
    queryKey: ["address", token],
    queryFn: () => fetchHandler({ url: "checkout/saveAddress", ... }),
  });
};
```

### Data Mapping
The `useAddressesFromApi` helper filters these nodes based on their type (`cart_billing` or `cart_shipping`) and maps them to a format compatible with the checkout forms.

**File:** `src/utils/helper.ts`
```typescript
const billingNode = address.find((a) => a.node?.addressType === "cart_billing")?.node;
const shippingNode = address.find((a) => a.node?.addressType === "cart_shipping")?.node;
```


## 4. Validation Rules

Addresses are validated using **React Hook Form** before submission:
- **Required Fields:** Name, street address, city, postcode, and phone.
- **Postal Code:** Validated per standard formats.
- **Phone Number:** Stripped of non-numeric characters and checked for minimum length (e.g., 10 digits).



## Summary

- **Unified Logic:** The same form handles both guest and registered user inputs.
- **Synced State:** Addresses are persisted both in the backend database and the local Redux store.
- **User Convenience:** Automatic address fetching for customers and "same as shipping" toggles reduce friction.
- **Validation-First:** Multi-step validation ensures orders are only placed with valid delivery data.

## Next Steps

- 🚚 [Shipping Methods](/bagisto-headless-ecommerce/features/checkout/shipping-billing/shipping-methods.md) - How shipping rates are calculated based on these addresses.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - The overall checkout structure.
- 🔐 [Guest Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/guest-checkout.md) - Address handling for non-logged-in users.
