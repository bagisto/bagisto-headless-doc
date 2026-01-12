# Billing Information

This guide details how billing information is collected, processed, and utilized during the checkout journey in the Bagisto Headless storefront.


## Overview

Billing information is essential for transaction legality, tax calculation, and payment processor verification. While often identical to the shipping address, the storefront allows users to provide distinct billing details to accommodate various financial and delivery requirements.


## 1. Data Collection & UI

The billing information is gathered during the **Address** step of the multi-step checkout.

### Form Structure
The billing form is the primary address form displayed to the user. It includes fields for:
- **Personal Details:** First Name, Last Name, Email.
- **Physical Address:** Company Name (optional), Street Address, City, Country, State, and Zip Code.
- **Contact:** Phone Number.

### "Same as Shipping" Toggle
To improve conversion rates and simplify the user experience, the storefront provides a checkbox titled **"Use the same address for shipping?"**.
- **Enabled (Default):** The billing data is automatically cloned and used for the shipping payload sent to the API.
- **Disabled:** An additional, separate form appears for the user to enter different shipping details.

**File:** `src/components/checkout/stepper/GuestAddAdressForm.tsx`


## 2. Technical Implementation

### GraphQL Mapping
When the form is submitted, the data is mapped to the `billingFirstName`, `billingAddress`, `billingEmail`, etc., fields of the `CREATE_CHECKOUT_ADDRESS` mutation.

**File:** `src/graphql/checkout/mutations/CreateCheckoutAddress.ts`

```graphql
mutation createCheckoutAddress(
    $billingFirstName: String!
    $billingLastName: String!
    $billingEmail: String!
    # ... other billing fields
) {
    createCheckoutAddress(input: {
      billingFirstName: $billingFirstName
      # ...
    })
}
```

### Redux State
Successfully saved billing information is stored in the `cartDetail` slice. This ensures that the **Order Review** step can display the billing summary and that the **Payment** step has access to any region-specific data required by payment gateways.

**File:** `src/store/slices/cart-slice.ts`


## 3. Business Rules and Validation

- **Email Uniqueness:** For registered users, the billing email is locked to their account email.
- **Tax Calculation:** The billing city/state/country data is used by the Bagisto backend to determine applicable taxes for the order.
- **Verification:** Some payment gateways (like Stripe or PayPal) require specific billing address fields to match the cardholder's data to prevent fraud.



## Summary

- **Primary Address:** The billing profile serves as the foundation for the order's financial record.
- **Flexible Entry:** Supports both shared (with shipping) and distinct billing-only data.
- **Backend Sync:** Integrated with the core checkout mutation for seamless processing.
- **Tax Foundation:** Crucial for accurate order total calculations based on geographical location.

## Next Steps

- 🏠 [Address Management](/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md) - General overview of address handling.
- 💳 [Payment Integration](/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-methods.md) - How billing data affects payment processing.
- 🚚 [Shipping Methods](/bagisto-headless-ecommerce/features/checkout/shipping-billing/shipping-methods.md) - Understanding how destination data (separate from billing) drives costs.
