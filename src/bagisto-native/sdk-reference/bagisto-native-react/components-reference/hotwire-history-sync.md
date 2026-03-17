# HotwireHistorySync

The `HotwireHistorySync` component is essential for maintaining the native back-stack. It informs the native app of the current "active" URL so that the native Back button mimics the browser Back button correctly.

### Key Functions

Whenever a navigation occurs within the web view, this component:

1.  **Enables the Native Back Button**: It sends the current page URL to the native app to maintain a synchronized history stack. Without this, the native app might not recognize that a navigation has occurred, and the **Native Back Button will not appear**, even if you have moved to another page.
2.  **Browser-like Navigation**: It ensures the native back button behaves exactly like the browser's back button, allowing users to navigate through the web history seamlessly.
3.  **Syncs Document Title**: It sends the current `document.title` (tab title) to the native app. Without this sync, the native navigation bar will fail to update, showing the title of the previous page instead of the current one.

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

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { triggerHistorySyncEvent } from '@bagisto-native/core';

export default function HistorySync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

   useEffect(() => {
    const url = new URL(`${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    const tabTitle = document?.title || "";
    triggerHistorySyncEvent(url, tabTitle);
  }, [pathname, searchParams]);

  return null;
}
```
---
## Ready Event & Race Conditions

Listen for the `bagisto-native:history-sync-ready` event to ensure the bridge is ready.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:history-sync-ready` | Dispatched once | Dispatched once the component connects and is ready. |

---
You can also check the sample repo [here](https://github.com/anikeshwebkul/bagisto-native-commerce).

## Next Steps

- Explore [HotwireThemeMode](./hotwire-theme-mode.md)
- Learn about [App-level Providers](../common-integration-patterns/app-level-providers.md)
- Understand [Layout-level Integration](../common-integration-patterns/layout-level-integration.md)
