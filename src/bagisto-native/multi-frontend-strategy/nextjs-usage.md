# Using with Next.js


Next.js is the recommended framework for building Bagisto Native applications. Its Server-Side Rendering (SSR) capabilities closely mimic the navigation patterns of a native app while ensuring excellent SEO and initial load performance.

## Why Next.js?

1.  **SSR & SEO**: Native apps aside, your storefront needs to be indexed by search engines. Next.js handles this out of the box.
2.  **Routing**: The file-system based routing maps 1:1 with how Turbo Native expects navigation to work (URL-driven).
3.  **Image Optimization**: Critical for e-commerce performance.

## Integration Guide

### 1. Installation

Ensure you have the React wrapper installed:
```bash
npm install @bagisto-native/react @hotwired/turbo
```

### 2. Setup (App Router)

In your `layout.tsx` or a dedicated provider, initialize the native bridge. Even though Next.js uses React Server Components (RSC), bridge components must be **Client Components**.

```tsx
// app/providers.tsx
'use client';

import { useEffect } from 'react';
import * as Turbo from '@hotwired/turbo';

export function NativeProvider({ children }) {
  useEffect(() => {
    Turbo.start();
  }, []);

  return <>{children}</>;
}
```

### 3. Creating Native-Friendly Pages

Wrap your pages or layout with checks to conditionalize UI. For example, you might want to hide the web header when running inside the native app.

```tsx
'use client';
import { useNativeBridge } from '@bagisto-native/react';

export default function Header() {
  const { isNative } = useNativeBridge();

  if (isNative) return null; // Hide header in native app

  return <header>...</header>;
}
```

### 4. Routing

Use standard `Link` components from `next/link`. Turbo Drive will intercept these clicks automatically.

```tsx
import Link from 'next/link';

<Link href="/product/1">
  View Product
</Link>
```

## Next Steps

- Learn about [React SPA Usage](./react-spa-usage.md)
- Explore [Shared API Strategy](./shared-api-strategy.md)
- Understand the [React Module](../react-module/react-overview.md)
