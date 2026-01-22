# React / Next.js Wrappers

This guide demonstrates how to use the components from `@bagisto-native/react` in a Next.js application.

## 1. Dynamic Button

The `DynamicButton` is a versatile component that adapts its behavior based on the `pageType`.

### Loading the Component
Since Web Components rely on browser APIs, use `next/dynamic` with `ssr: false` to load them.

```tsx
'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function NativeBridge() {
  return (
    <>
      {/* Home Page Actions (Scan, Search, etc.) */}
      <DynamicButton pageType="home" />
      
      {/* Product Page Activity (Share, etc.) */}
      <DynamicButton pageType="product" />
    </>
  );
}
```

## 2. Hotwire Toast

Use this component to enable native toast notifications.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireToast = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireToast),
  { ssr: false }
);

export default function AppToast() {
  return <HotwireToast />;
}
```

## 3. History & Theme Sync

These components ensures the native app stays in sync with the web view's state.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireHistorySync = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireHistorySync),
  { ssr: false }
);

const HotwireThemeMode = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireThemeMode),
  { ssr: false }
);

export default function NativeSync() {
  return (
    <>
      <HotwireHistorySync />
      <HotwireThemeMode />
    </>
  );
}
```

::: warning SSR Config
Always ensure `{ ssr: false }` is passed to the dynamic loader, otherwise, the server will crash attempting to access `window` or `customElements`.
:::

## Next Steps

- Understand the [Relationship with core](./relationship-with-core.md)
- Explore the [React Module](../../react-module/react-overview.md)
- Check [Versioning & Compatibility](../versioning-compatibility.md)
