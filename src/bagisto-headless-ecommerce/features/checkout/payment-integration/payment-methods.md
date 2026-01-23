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
The `CREATE_CHECKOUT_PAYMENT_METHODS` mutation now supports additional redirect URLs for handling third-party payment gateway flows, including success, failure, and cancel scenarios. The mutation signature and variable names have been updated to match the latest implementation.

**File:** `src/graphql/checkout/mutations/CreateCheckoutPaymentMethod.ts`

```graphql
mutation CreateCheckoutPaymentMethod(
  $paymentMethod: String!
  $successUrl: String
  $failureUrl: String
  $cancelUrl: String
) {
  createCheckoutPaymentMethod(
    input: {
      paymentMethod: $paymentMethod
      paymentSuccessUrl: $successUrl
      paymentFailureUrl: $failureUrl
      paymentCancelUrl: $cancelUrl
    }
  ) {
    checkoutPaymentMethod {
      success
      message
      paymentGatewayUrl
      paymentData
    }
  }
}
```


### API Route Implementation
The API route for saving the payment method constructs the redirect URLs dynamically using your app's base URL, and passes them to the mutation. This enables seamless integration with third-party payment gateways.

**File:** `src/app/api/checkout/payment/route.ts`

```typescript
import { NextResponse } from "next/server";
import { bagistoFetch } from "@/utils/bagisto";
import { isBagistoError } from "@/utils/type-guards";
import { CREATE_CHECKOUT_PAYMENT_METHODS } from "@/graphql";
import { getAuthToken } from "@/utils/helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const guestToken = getAuthToken(req);

    const variables = {
      paymentMethod: body.paymentMethod,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      failureUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`
    }

    const res = await bagistoFetch<any>({
      query: CREATE_CHECKOUT_PAYMENT_METHODS,
      variables: variables as any,
      cache: "no-store",
      guestToken,
    });

    return NextResponse.json({ data: res?.body?.data }, { status: 200 });
  } catch (error) {
    if (isBagistoError(error)) {
      return NextResponse.json(
        {
          data: { saveShipping: null },
          error: { ...error.cause },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
```



## 4. Navigation & Redirects

- **Offline Methods:** For methods like "Cash on Delivery", the user is simply advanced to the `review` step.
- **Online Gateways:** If the selected method requires external authorization (e.g., Stripe, PayPal), the API may return a `paymentGatewayUrl`. The storefront can then redirect the user to complete the transaction on the provider's secure page.

### Third-Party Payment Gateway Redirection

When integrating with third-party payment providers, you can specify custom redirect URLs for success, failure, and cancel events. These URLs are passed to the backend and used by the payment gateway to return the user to the appropriate page after the transaction.

- **Success URL:** The user is redirected here after a successful payment (e.g., `/payment/success`).
- **Failure URL:** The user is redirected here if the payment fails (e.g., `/payment/failure`).
- **Cancel URL:** The user is redirected here if they cancel the payment process (e.g., `/payment/cancel`).

This approach is similar to other modern e-commerce platforms and allows for flexible integration with a wide range of payment providers. You can customize these URLs to match your application's flow and user experience.



## Summary

- **Contextual Options:** Displays only the payment methods supported by the current store configuration and user location.
- **Incremental Progress:** Saves the choice to the backend immediately upon selection.
- **Rich Feedback:** Provides descriptions for each method to help users make informed decisions.
- **Flexible Extensions:** The architecture supports both standard offline payments and complex online gateway redirects.

## Next Steps

- 🔍 [Order Review](/bagisto-headless-ecommerce/features/checkout/payment-integration/order-confirmation.md) - The final step before order placement.
- 📦 [Shipping Methods](/bagisto-headless-ecommerce/features/checkout/shipping-billing/shipping-methods.md) - How costs are calculated before payment selection.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - The overall checkout structure.
