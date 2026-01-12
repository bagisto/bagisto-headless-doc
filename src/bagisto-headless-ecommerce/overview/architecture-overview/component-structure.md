# Component Structure

This document outlines the organization of React components in the Bagisto Headless storefront. The project follows a modular and domain-driven approach to component organization, ensuring scalability and ease of maintenance.

## Directory Overview

All UI components are located in the `src/components` directory. This directory is subdivided into several domains based on their functionality and the part of the store they serve.

```bash
src/components/
├── cart/           # Cart-specific components (Mini-cart, Order Details)
├── catalog/        # Catalog features (Product Card, Variant Selector, Filters)
├── checkout/       # Checkout flow components (Stepper, Address Forms, Payment)
├── common/         # Shared/Generic components (Buttons, Icons, Skeletons)
├── customer/       # Customer account components (Login forms, Dashboard items)
├── home/           # Home-page specific sections (Hero blocks, Banners)
├── layout/         # Layout-level components (Header, Footer, Sidebar)
└── theme/          # UI Kit and core primitive elements
```

## 1. Domain-Specific Components

### 1.1 Cart (`src/components/cart/`)
Contains components related to the shopping cart experience.
- **CartSidebar:** The sliding drawer showing cart items.
- **OrderDetail:** Summaries used during checkout and on the success page.
- **AddToCart:** The primary CTA for adding items to the cart.

### 1.2 Catalog (`src/components/catalog/`)
Handles all product-related displays and interactions.
- **ProductCard:** The reusable preview used in listings and carousels.
- **VariantSelector:** Intelligent logic for handling configurable product attributes.
- **ProductGallery:** Image carousels and zoom functionality for PDP.

### 1.3 Checkout (`src/components/checkout/`)
Includes the complex logic and mult-step forms required for order placement.
- **Stepper:** The container managing the progression between checkout stages.
- **PaymentMethod:** Provides selectable options for payment gateways.

### 1.4 Customer (`src/components/customer/`)
Focuses on authentication and account management.
- **LoginForm / RegisterForm:** Core authentication UI.
- **AddressBook:** Component for managing saved customer addresses.

## 2. Shared & Core Components

### 2.1 Common (`src/components/common/`)
This is the repository for generic, reusable elements that are used across multiple domains.
- **UI primitives:** Buttons, Inputs, Modal, and Drawer wrappers.
- **Feedback:** Skeletons for loading states and custom Icons (SVG components).
- **Hooks:** Local UI-specific hooks.

### 2.2 Layout (`src/components/layout/`)
Structural components that define the shell of the application.
- **Header / Footer:** The global navigation and informative footer.
- **SideMenu:** Navigation drawers for mobile devices.

### 2.3 Theme (`src/components/theme/`)
Core design system elements. These are the building blocks of the UI, often wrapping base libraries like HeroUI or Tailwind utilities to ensure a consistent brand look and feel.


## Summary of Best Practices

- **Modularity:** Keep components small and focused on a single responsibility.
- **Reusable:** Abstract generic UI into `common/` or `theme/`.
- **Domain Isolated:** If a component is only used within the Checkout flow, it should live in `checkout/`.
- **Client vs Server:** Explicitly define "use client" only where interactivity is required to optimize server-side rendering.

## Next Steps

- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The high-level technical map.

- 🧱 [GraphQL Fragments](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/fragments.md) - Understanding how data is typed for these components.
