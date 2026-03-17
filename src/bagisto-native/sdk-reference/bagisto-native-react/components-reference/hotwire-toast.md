# HotwireToast

The `HotwireToast` component acts as a hidden listener that the Native Bridge uses to trigger native toast messages (Snackbars on Android / Alerts on iOS).

## Import and Setup

It should be placed in your **Root Layout** so it is always available.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireToast = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireToast),
  { ssr: false }
);

export default function NativeToastListener() {
  return <HotwireToast />;
}
```

## Triggering Toasts

To show a toast, do not interact with the component props. Instead, use the core utility function.

```tsx
import { triggerHotwireNativeToast } from "@bagisto-native/core";

// Call this anywhere in your client-side code
triggerHotwireNativeToast("Item added to cart successfully!");
```

## Ready Event & Race Conditions

To ensure that the component is fully connected and ready to receive messages, you can listen for the `bagisto-native:toast-ready` event. This is particularly useful for solving race conditions where you might try to trigger a toast before the Web Component has finished initialization.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:toast-ready` | Dispatched once | Dispatched once the component connects and is ready. |

### Example: Handling Race Conditions

```ts
window.addEventListener('bagisto-native:toast-ready', () => {
    console.log("Hotwire Toast is ready!");
    // Safe to trigger toasts now
});
```

::: warning Singleton
You should only have one instance of `<hotwire-toast>` in your DOM at any time.
:::

You can also check the sample repo [here](https://github.com/anikeshwebkul/bagisto-native-commerce).

## Next Steps

- Explore [HotwireSearch](./hotwire-search.md)
- Learn about [HotwireLocation](./hotwire-location.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
