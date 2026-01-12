# Layout Components

This guide explains the structural components that define the shell and global navigation of the Bagisto Headless storefront.

## Overview

Layout components provide the consistent frame (Header and Footer) that surrounds the main content area. They are designed to be responsive, accessible, and performant, ensuring users can always navigate the store regardless of their device.

All layout components reside in the `src/components/layout` directory.

## 1. Navbar (Header)

The Navbar is the primary navigation hub of the storefront, located at `src/components/layout/navbar`.

### Core Features:
- **Logo & Navigation:** Displays the store branding and top-level category/page links.
- **Search System:**
    - **Search.tsx:** Implements the desktop search bar with real-time suggestions.
    - **MobileSearch.tsx:** A tailored search interface optimized for mobile interactions.
- **Mobile Menu:**
    - **MobileMenu.tsx:** A responsive drawer that houses navigation links for smaller screens.
- **Cart & Account Access:** Provides quick access to the [Mini Cart](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md).

### Implementation Details:
The Navbar uses the `index.tsx` as its main wrapper, orchestrating the visibility of search and menu components based on the viewport size.

## 2. Footer

The Footer provides essential information and secondary navigation at the bottom of every page, located at `src/components/layout/footer`.

### Sections:
- **Footer Menu (`FooterMenu.tsx`):** Organizes links into categories such as "Company," "Customer Service," and "Quick Links."
- **Service Highlights (`ServiceContent.tsx`):** Displays value propositions like "Free Shipping," "Secure Payment," or "24/7 Support."
- **Newsletter Subscription (`Subscribe.tsx`):** A form for users to sign up for marketing updates, integrated with backend subscriber mutations.
- **Copyright & Social:** Standard legal information and links to social media profiles.

## 3. Responsive Behavior

The layout components utilize Tailwind CSS's responsive utilities and state management to transition between mobile and desktop views:
- **Mobile View:** Uses a condensed header with a hamburger menu and a persistent search icon.
- **Desktop View:** Displays a full horizontally-oriented menu and an expanded search field.

## 4. Integration with Providers

The layout components often consume global state from several providers:
- **Redux:** To display the live cart item count in the header.
- **NextAuth:** To show the user's name or a login link based on authentication status.
- **Theme Provider:** To support light and dark mode transitions.

## Next Steps

- 🏗️ [Component Structure](/bagisto-headless-ecommerce/overview/architecture-overview/component-structure.md) - Where the layout fits in the project hierarchy.

- 🛍️ [Mini Cart](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - Details on the cart component integrated into the Navbar.
