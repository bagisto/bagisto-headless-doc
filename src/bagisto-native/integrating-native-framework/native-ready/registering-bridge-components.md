# Registering Bridge Components

For the native app to "listen" to your website, certain bridge components must be present in the DOM.

## Global Components

Add these to your `layout.tsx` so they are present on **every** page.

```tsx
'use client';
import dynamic from 'next/dynamic';

const HotwireToast = dynamic(() => import('@bagisto-native/react').then(m => m.HotwireToast), { ssr: false });
const HotwireHistorySync = dynamic(() => import('@bagisto-native/react').then(m => m.HotwireHistorySync), { ssr: false });
const HotwireThemeMode = dynamic(() => import('@bagisto-native/react').then(m => m.HotwireThemeMode), { ssr: false });

export default function NativeListeners() {
  return (
    <>
      <HotwireToast />
      <HotwireHistorySync />
      <HotwireThemeMode />
    </>
  );
}
```

## Page-Specific Components

Components like `<DynamicButton type="search" />` or `<DynamicButton type="share" />` should be added only to the specific pages where that action makes sense (e.g., Share on Product Page, Search on Home).

## Next Steps

- Understand [Enabling Native Events](./enabling-native-events.md)
- Learn about [Native-safe Routing Rules](./native-safe-routing-rules.md)
- Explore [Core Module](../../core-module/core-overview.md)
