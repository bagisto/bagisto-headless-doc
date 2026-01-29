# DynamicButton

The `DynamicButton` component controls the native top navigation bar actions. It is context-aware and changes the available buttons based on the `pageType`.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `pageType` | `string` | `'home'` | The context for the native navbar: `'home'` or `'product'`. |
| `cartCountEvent` | `boolean` | `false` | If true, enables the silent cart count sync mode. |
| `style` | `object` | `{ display: 'none' }` | Logic-only component, usually hidden. |

## Feature Breakdown

The `pageType` prop determines the native navbar buttons.

### 1. Home Page Context (`pageType="home"`)
Enables icons for:
- **Image Search**: Native object detection.
- **QR/Barcode Scanner**: Triggers scan; results in `turbo:next-search` event.
- **Cart**: Triggers `turbo:next-cart-modal` event.

### 2. Product Page Context (`pageType="product"`)
Enables icons for:
- **Share**: Opens native share sheet.
- **Cart**: Triggers `turbo:next-cart-modal` event.

---

## Event Handling in React

To respond to native actions (like a scan result or a cart tap), use `useEffect` to attach listeners.

### Handling Search/Scan Results
```tsx
useEffect(() => {
  const handleScan = (e: Event) => {
    const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
    const result = customEvent.detail.query || customEvent.detail.code;
    router.push(`/search?q=${encodeURIComponent(result)}`);
  };

  window.addEventListener("turbo:next-search", handleScan);
  return () => window.removeEventListener("turbo:next-search", handleScan);
}, []);
```

### Handling Cart Clicks
```tsx
useEffect(() => {
  const handleOpenCart = () => {
    // Logic to open cart drawer or navigate
    setCartOpen(true);
  };

  window.addEventListener("turbo:next-cart-modal", handleOpenCart);
  return () => window.removeEventListener("turbo:next-cart-modal", handleOpenCart);
}, []);
```

---

## Syncing Cart Count

The `DynamicButton` component also handles background cart count synchronization if `cartCountEvent={true}` is set. However, for manual or initial sync, use the `triggerCartCountValue` utility from `@bagisto-native/core`.

```tsx
import { triggerCartCountValue } from "@bagisto-native/core";

// Inside your component or hook
useEffect(() => {
  if (cartCount !== undefined) {
    triggerCartCountValue(cartCount);
  }
}, [cartCount]);
```

---

## Ready Event & Race Conditions

To ensure the bridge is ready before sending data (especially during the first page load), listen for the ready event.

| Event Name | Description |
| :--- | :--- |
| `bagisto-native:dynamic-button-ready` | Emitted when the bridge element is fully connected. |

```tsx
window.addEventListener("bagisto-native:dynamic-button-ready", () => {
  // Safe to sync cart or trigger native actions
});
```


## Next Steps

- Explore [HotwireToast](./hotwire-toast.md)
- Learn about [HotwireSearch](./hotwire-search.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
