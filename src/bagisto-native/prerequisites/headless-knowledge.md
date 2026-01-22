# Headless Commerce Knowledge

Bagisto Native is an advanced implementation of headless commerce. To be successful, you should be familiar with the following concepts.

## Core Concepts

### 1. Headless Architecture
Understanding that the **Frontend** (Next.js/React) is completely decoupled from the **Backend** (Laravel/Bagisto). They communicate strictly via APIs.

### 2. Next.js & React
*   **Server Components vs Client Components**: Knowing when to use `'use client'` is critical for Bagisto Native, as bridge components (like `HotwireToast`) function differently in SSR contexts.
*   **Routing**: Understanding the Next.js App Router.

### 3. Hotwire / Turbo (Optional but Recommended)
While we provide wrappers, understanding the basics of **Turbo Drive**—how it swaps HTML body content without a full page reload—will help you debug navigation issues between the web and native layers.

## Recommended Reading
*   [Next.js Documentation](https://nextjs.org/docs)
*   [Turbo Handbook](https://turbo.hotwired.dev/handbook/introduction)

## Next Steps

- Explore [Getting Started](../getting-started/setup-flow-overview.md)
- Understand [Create Bagisto Headless Commerce](../getting-started/create-headless-commerce.md)
- Learn about [Installing Packages](../integrating-native-framework/installing-packages.md)
