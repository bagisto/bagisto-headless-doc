# Dynamic Button (`<dynamic-button>`)

The `dynamic-button` component is a context-aware controller that instructs the native app to show specific buttons (like Cart, Share, Image Search, or Barcode/QR Search) in the Top Navigation Bar.

::: tip
This is the core component that powers the dynamic button feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire Dynamic Button](../../bagisto-native-react/components-reference/dynamic-button.md)
:::

## What is Dynamic Button?

The `<dynamic-button>` is a custom Web Component from `@bagisto-native/core`. It acts as a bridge to manage native UI elements based on the current page context.

When included, the following element is added to the DOM:

```html
<dynamic-button data-controller="bridge--dynamicbutton" data-page-type="home" style="display: none;"></dynamic-button>
```

- **`data-controller="bridge--dynamicbutton"`**: Connects the component to the Stimulus bridge controller.
- **`data-page-type="..."`**: Defines the current context (`home`, `product`, or `empty`).
- **`style="display: none;"`**: The component is functional and does not render its own UI in the web view.

---

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `pageType` | `string` | `'home'` | The context for the native navbar: `'home'` or `'product'`. |
| `cartCountEvent` | `boolean` | `false` | If true, enables the silent cart count sync mode. |
| `modalOpenEvent` | `boolean` | `false` | If true, enables the silent modal open event. |
| `modalDismissEvent` | `boolean` | `false` | If true, enables the silent modal dismiss event. |
| `style` | `object` | `{ display: 'none' }` | Logic-only component, usually hidden. |


## Page Type Variants

The `data-page-type` attribute determines which icons appear in the native app's top navigation bar.

### 1. Home Page Variant (`page-type="home"`)
Displays three icons in the native area:
- **Image Search**: Opens a native photo/gallery component for visual search.
- **Barcode/QR Search**: Opens a native scanner for product lookups.
- **Cart & Cart Count**: Displays a cart icon with an optional item count badge.

### 2. Product Page Variant (`page-type="product"`)
Displays two icons in the native area:
- **Product Share**: Opens the native system share sheet.
- **Cart & Cart Count**: Displays a cart icon.

### 3. Empty Variant (`page-type="empty"`)
Hides all dynamic icons. Use this on login, registration, or other checkout pages to clear the navigation bar.


## Feature Deep Dive

### Cart & Cart Count
The Cart icon is persistent in most variants. When tapped, it emits the `turbo:next-cart-modal` event.

#### Update Cart Count Badge
To synchronize the native cart count with your web state:
1. Add the `sendCartCount` action to the DOM:
```html
<dynamic-button data-action="click->bridge--dynamicbutton#sendCartCount" style="display: none;"></dynamic-button>
```
2. Trigger the update using the utility function:
```ts
import { triggerCartCountValue } from '@bagisto-native/core';

   // Sync 5 items
triggerCartCountValue(5);
```

### Native Search Hub (Image & Barcode/Qrcode)
The `home` variant provides access to native Search Hubs. When a user finishes an Image or Barcode search natively, the result is sent to the web via the `turbo:next-search` event.

> [!NOTE]
> For standard **Text Search** activation, use the [Hotwire Search](./hotwire-search.md) component instead.

```ts
window.addEventListener("turbo:next-search", (e: Event) => {
    const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
    const query = customEvent.detail.query || customEvent.detail.code;
    
    if (query) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
});
```

### Native Modal Management
If you open a web modal (e.g., Cart Modal) and want the native app to provide a standardized "Close" icon in the navigation bar, use the following integration:

#### 1. Setup Listeners
Add these actions to your DOM to handle bi-directional modal signaling:
```html
<dynamic-button data-action="click->bridge--dynamicbutton#sendModalOpenEvent" style="display: none;"></dynamic-button>
<dynamic-button data-action="click->bridge--dynamicbutton#sendModalDismissEvent" style="display: none;"></dynamic-button>
```

#### 2. Sync State
- When you open your web modal:
  ```ts
  import { triggerDynamicButtonModalOpenEvent } from '@bagisto-native/core';
  triggerDynamicButtonModalOpenEvent();
  ```
- When you close your web modal:
  ```ts
  import { triggerDynamicButtonModalDismissEvent } from '@bagisto-native/core';
  triggerDynamicButtonModalDismissEvent();
  ```

## React Wrapper Syntax

The '@bagisto-native/react' wrapper simplifies feature selection through props.

```tsx
import { DynamicButton } from '@bagisto-native/react';

// Standard Home Page
<DynamicButton pageType="home" />

// Enable Modal Signaling
<DynamicButton modalOpenEvent={true} />
<DynamicButton modalDismissEvent={true} />

// Enable Cart Count Syncing
<DynamicButton cartCountEvent={true} />
```

## Next.js Integration Guide

For Next.js, always use `dynamic` imports with `ssr: false` to ensure the bridge connects in the browser environment.

```tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { triggerCartCountValue } from '@bagisto-native/core';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function CartSync({ count }: { count: number }) {
  useEffect(() => {
    // Only update if bridge is ready
    const handleReady = () => triggerCartCountValue(count);
    
    window.addEventListener("bagisto-native:dynamic-button-ready", handleReady);
    return () => window.removeEventListener("bagisto-native:dynamic-button-ready", handleReady);
  }, [count]);

  return (
    <>
      <DynamicButton cartCountEvent={true} />
      <DynamicButton pageType="product" />
    </>
  );
}
```

## Ready Event & Race Conditions

Always wait for the `bagisto-native:dynamic-button-ready` event before calling utility functions to avoid "bridge not connected" issues.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:dynamic-button-ready` | Dispatched once | Dispatched once the component connects and is ready. |

## Creating a Custom Wrapper

For other frameworks, simply render the component with standard attributes:

```ts
import '@bagisto-native/core';
// Template: <dynamic-button data-page-type="home" style="display: none;"></dynamic-button>
```

## Next Steps

- Explore [Hotwire toast](./hotwire-toast.md)
- Learn about [Hotwire search](./hotwire-search.md)
- Understand [Utility Functions](../utility-functions.md)
