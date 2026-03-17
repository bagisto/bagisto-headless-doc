# Hotwire History Sync (`<hotwire-history-sync>`)

The `hotwire-history-sync` component is essential for maintaining navigation state between the web view and the native application, particularly in Single Page Applications (SPAs) like Next.js.

::: tip
This is the core component that powers the History Sync feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire History Sync](../../bagisto-native-react/components-reference/hotwire-history-sync.md)
:::

## What is Hotwire History Sync?

The `<hotwire-history-sync>` is a custom Web Component from `@bagisto-native/core`. It ensures that the native application stays synchronized with the web view's internal routing.

This component is specifically designed to solve problems that occur with frameworks like **Next.js**, where navigation happens internally without full page reloads.

### Key Functions

Whenever a navigation occurs within the web view, this component:

1.  **Enables the Native Back Button**: It sends the current page URL to the native app to maintain a synchronized history stack. Without this, the native app might not recognize that a navigation has occurred, and the **Native Back Button will not appear**, even if you have moved to another page.
2.  **Browser-like Navigation**: It ensures the native back button behaves exactly like the browser's back button, allowing users to navigate through the web history seamlessly.
3.  **Syncs Document Title**: It sends the current `document.title` (tab title) to the native app. Without this sync, the native navigation bar will fail to update, showing the title of the previous page instead of the current one.

When included, the following element is added to the DOM:

```html
<hotwire-history-sync role="button" data-controller="bridge--historysync" style="display: none;"></hotwire-history-sync>
```

- **`data-controller="bridge--historysync"`**: Connects the component to the Stimulus history bridge.
- **`style="display: none;"`**: The component is functional only and does not render a UI.

> [!IMPORTANT]
> This component is critical for **Next.js** applications. Without it, the native app cannot track internal route transitions, leading to a mismatched navigation bar title and a missing or non-functional native back button.

## React Wrapper Syntax

The `@bagisto-native/react` module provides a simple wrapper for easy integration.

```tsx
import React from 'react';
import '@bagisto-native/core';

const HotwireHistorySync: React.FC = () => {
  return <hotwire-history-sync style={{display: 'none'} as any}></hotwire-history-sync>;
};

export default HotwireHistorySync;
```

## Integration in Next.js

Include this component in your root `layout.tsx` or a global navigation provider to ensure every route change is synced.

```tsx
'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const HotwireHistorySync = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireHistorySync),
  { ssr: false }
);

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html>
      <body>
        <HotwireHistorySync />
        {children}
      </body>
    </html>
  );
}
```

## Triggering Sync / Events

### Event: `turbo:next-history-sync`

The component dispatches this event to notify the bridge. It carries the current URL and document title.

### Utility Function

You can also trigger a sync manually using the utility function from `@bagisto-native/core`:

```ts
import { triggerHistorySyncEvent } from "@bagisto-native/core";

// Sync a specific URL and title
triggerHistorySyncEvent(new URL(window.location.href), document.title);
```

## Ready Event & Race Conditions

Listen for the `bagisto-native:history-sync-ready` event to ensure the bridge is ready.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:history-sync-ready` | Dispatched once | Dispatched once the component connects and is ready. |

## Creating a Custom Wrapper

For other frameworks:

```ts
import '@bagisto-native/core';
// Template: <hotwire-history-sync style="display: none;"></hotwire-history-sync>
```

## Next Steps

- Learn about [Hotwire theme mode](./hotwire-theme-mode.md)
- Explore [Utility Functions](../utility-functions.md)

