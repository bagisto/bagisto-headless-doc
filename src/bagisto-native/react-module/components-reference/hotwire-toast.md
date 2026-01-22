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

## Next Steps

- Explore [HotwireSearch](./hotwire-search.md)
- Learn about [HotwireLocation](./hotwire-location.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
