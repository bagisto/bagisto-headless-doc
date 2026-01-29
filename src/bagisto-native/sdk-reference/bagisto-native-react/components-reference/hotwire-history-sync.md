# HotwireHistorySync

The `HotwireHistorySync` component is essential for maintaining the native back-stack. It informs the native app of the current "active" URL so that the native Back button mimics the browser Back button correctly.

## Setup

Add the component to your **Root Layout**:

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireHistorySync = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireHistorySync),
    { ssr: false }
);

export default function HistorySyncListener() {
    return <HotwireHistorySync />;
}
```

## Triggering Sync on Route Change

You must manually trigger the sync event whenever the route changes. In Next.js (App Router), use `useEffect` with `usePathname`.

```tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { triggerHistorySyncEvent } from "@bagisto-native/core";

export default function RouteChangeObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct the full URL
    const location = window.location;
    const urlString = `${location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const url = new URL(urlString);
    
    // Notify Native App
    triggerHistorySyncEvent(url);
  }, [pathname, searchParams]);

  return null;
}
```

## Next Steps

- Explore [HotwireThemeMode](./hotwire-theme-mode.md)
- Learn about [App-level Providers](../common-integration-patterns/app-level-providers.md)
- Understand [Layout-level Integration](../common-integration-patterns/layout-level-integration.md)
