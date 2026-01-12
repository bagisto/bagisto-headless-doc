# Shipping Methods

This guide explains how shipping methods are fetched, displayed, and selected during the checkout process in the Bagisto Headless storefront.


## Overview

After a user provides their shipping address, the storefront fetches available shipping methods from the Bagisto backend. These methods (e.g., Flat Rate, Free Shipping) are calculated based on the delivery destination and the items in the cart. Once a user selects a method, it is saved to the checkout session.


## 1. Fetching Shipping Methods

The storefront uses the `useQuery` hook to fetch available rates from the API. This request is typically triggered as soon as the user enters the "Shipping" step of the checkout flow.

**File:** `src/components/checkout/stepper/shipping/index.tsx`

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["shippingMethods", token],
  queryFn: () =>
    fetchHandler({
      url: "checkout/shippingMethods",
      method: "POST",
      body: { token },
    }),
});
```

The API returns an array of available methods, each including a label, a description, and the calculated price.


## 2. Selection UI

The selection is presented to the user using a radio group. The storefront utilizes the `@heroui/react` library to provide a premium, accessible selection experience.

**File:** `src/components/checkout/stepper/shipping/ShippingMethod.tsx`

```tsx
<RadioGroup
  value={field.value}
  onValueChange={field.onChange}
>
  {shippingMethod.map((method) => (
    <CustomRadio
      key={method.code}
      description={"$" + method.price}
      value={method.method}
    >
      {method.label}
    </CustomRadio>
  ))}
</RadioGroup>
```


## 3. Saving the Selection

When the user clicks "Next", the selected shipping method is saved to the Bagisto backend using a GraphQL mutation.

### GraphQL Mutation
The `CREATE_CHECKOUT_SHIPPING_METHODS` mutation identifies the session via the cart token and assigns the chosen method name.

**File:** `src/graphql/checkout/mutations/CreateCheckoutShippingMethod.ts`

```graphql
mutation CreateCheckoutShippingMethod($token: String!, $shippingMethod: String!) {
  createCheckoutShippingMethod(input: {
    token: $token
    shippingMethod: $shippingMethod
  }) {
    checkoutShippingMethod {
      success
      message
    }
  }
}
```

### Hook Implementation
The `useCheckout` hook handles the API call and redirects the user to the next step (Payment) upon success.

**File:** `src/utils/hooks/useCheckout.ts`

```typescript
const { mutateAsync: saveShipping } = useMutation({
  mutationFn: (data) => fetchHandler({ url: "checkout/saveShipping", ... }),
  onSuccess: (response) => {
    // Redirect to next step
    router.replace("/checkout?step=payment");
  }
});
```


## 4. State Persistence

The selected shipping rate is also synchronized with the Redux store. This allows the Order Summary sidebar to reflect the chosen shipping cost immediately throughout the rest of the checkout process.

**File:** `src/store/slices/cart-slice.ts`
```typescript
setSelectedShippingRate(state, action) {
  state.selectedShippingRate = action.payload;
},
```

## Summary

- **Destination Aware:** Rates are fetched based on the provided shipping address.
- **Dynamic Pricing:** Prices are calculated server-side and returned via the GraphQL API.
- **Incremental Save:** The selection is saved to the backend before moving to the payment step.
- **Global Context:** Redux ensures the total order cost is always up-to-date in the UI.

## Next Steps

- 💳 [Payment Integration](/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-methods.md) - How to select and process payments.
- 🏠 [Address Management](/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md) - How destination data is collected.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - The overall checkout structure.
