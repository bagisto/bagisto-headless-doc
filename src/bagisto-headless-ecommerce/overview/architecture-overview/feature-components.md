# Feature Components

This guide explores the feature-specific components that implement the core e-commerce logic and user journeys in the Bagisto Headless storefront.

## Overview

Feature components are domain-specific modules located in `src/components/`. Unlike reusable or layout components, these modules are tightly coupled with the storefront's business logic, state management (Redux), and data fetching (GraphQL).

## 1. Catalog Features (`src/components/catalog/`)

The catalog domain handles product discovery and detailed views.

### Product Detail Page (PDP)
- **ProductInfo:** Orchestrates the display of basic product data, pricing, and stock status.
- **VariantSelector:** A complex logic component that handles attribute selection for configurable products, updating images and prices dynamically.
- **ProductDescription:** Manages the display of product specifications and rich-text descriptions.
- **RelatedProductsSection:** Fetches and displays cross-sells and upsells using the `RelatedProducts` query.

### Listing & Search (PLP)
- **ProductCard:** The primary entry point for products in lists, featuring hover effects, price displays, and "Add to Cart" hooks.
- **Pagination:** Handles client-side or server-side pagination for large product sets.

## 2. Cart Features (`src/components/cart/`)

The cart domain manages the user's active shopping session.

- **Mini Cart:** A persistent UI component (often in a sidebar or popover) that provides a quick overview of the cart contents.
- **CartPage:** A dedicated view for managing quantities, applying coupons, and initiating checkout.
- **AppliedDiscounts:** Displays active promotions and tax breakdowns.

## 3. Checkout Features (`src/components/checkout/`)

The checkout domain is the most logic-heavy part of the application, managing the transition from guest/customer to order completion.

- **Stepper:** A state-managed container that guides users through Email, Address, Shipping, and Payment stages.
- **Address Forms:** Specialized forms for billing and shipping that integrate with `react-hook-form` and server-side validation.
- **OrderReview:** Provides a final summary of the order before the `CREATE_CHECKOUT_ORDER` mutation is fired.

## 4. Customer Account (`src/components/customer/`)

Focuses on personalized user experiences and history.

- **Dashboard:** A summary view of recent orders and account status.
- **OrderHistory:** Fetches and displays past transactions with status tracking.
- **AddressBook:** Allows customers to create, update, and delete saved addresses for faster checkout.

## 5. Implementation Strategy

### Data Fetching
Feature components typically use the `useQuery` or `useMutation` hooks from `@apollo/client` or `@tanstack/react-query` to interact with the Bagisto API.

### State Integration
These components subscribe to and dispatch actions to the **Redux** store (specifically the `cartDetail` slice) to ensure the UI stays synchronized across different domains (e.g., adding an item from the catalog updates the Navbar count).


## Next Steps

- 🏗️ [Component Structure](/bagisto-headless-ecommerce/overview/architecture-overview/component-structure.md) - A high-level view of how these files are organized.
- 🛍️ [Cart Operations](/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md) - See how catalog and cart components interact.
- 🧱 [Multi-step Checkout](/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md) - Deep dive into checkout-specific components.
