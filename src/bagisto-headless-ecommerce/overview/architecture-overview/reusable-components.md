# Reusable Components

This guide provides an overview of the reusable components available in the Bagisto Headless  storefront, designed to ensure UI consistency and speed up development.

## Overview

The storefront abstracts common UI patterns into reusable components categorized into `common` (generic) and `theme/ui` (brand-specific) collections. These components are atomic and can be combined to build complex interfaces.

## 1. Common Components (`src/components/common/`)

These are the most generic building blocks, often wrapping native HTML or third-party libraries for extra functionality.

### 1.1 UI Primitives
- **Button:** A versatile button component with multiple variants (primary, secondary, ghost) and loading states.
- **Input:** Standardized text inputs with integrated error handling (using React Hook Form).
- **NextImage:** A wrapper around `next/image` to provide consistent placeholder and fallback behavior.

### 1.2 Interactive Elements
- **Rating:** A stars-based rating display used in product reviews and summaries.
- **Slider:** Reusable carousel logic for banners and image galleries.

### 1.3 Feedback & State
- **Skeletons:** A collection of loading states for various parts of the UI, such as `ProductSkeleton` and `CheckoutSkeleton`.
- **Toast:** A global notification system for providing real-time feedback (success, warnings, errors).

## 2. Theme UI Components (`src/components/theme/ui/`)

These components are more closely tied to the storefront's design system and e-commerce business logic.

- **Price:** A utility component for formatting and displaying prices with currency symbols.
- **Label:** Standardized labels for product badges (e.g., "New", "Sale").
- **AddToCartButton:** A sophisticated button that integrates directly with the cart state and GraphQL mutations.
- **Grid:** Layout utilities for consistent product and category listings.

## 3. Icon Library (`src/components/common/icons/`)

The storefront uses SVG-based icon components instead of heavy icon fonts. Each icon is a React component that can be styled via props (e.g., `size`, `className`, `color`).

**Example Usage:**
```tsx
import CartIcon from "@components/common/icons/Cart";

const MyComponent = () => (
  <CartIcon className="w-5 h-5 text-primary" />
);
```

## 4. Best Practices for Reusable Components

To maintain the quality of the reusable library, follow these principles:

1. **Props-Driven:** Aim for highly configurable components via TypeScript props rather than hardcoded values.
2. **Accessibility:** Ensure all interactive elements include appropriate ARIA roles and labels.
3. **Styling:** Use Tailwind CSS utility classes within the components to allow for easy global theme overrides.
4. **Isolation:** Keep reusable components decoupled from specific domain logic whenever possible.


## Next Steps

- 🏗️ [Component Structure](/bagisto-headless-ecommerce/overview/architecture-overview/component-structure.md) - Understanding where these components live.

- 🧱 [GraphQL Fragments](/bagisto-headless-ecommerce/graphql-schema/graphql-operations/fragments.md) - See how data is passed to these components.
