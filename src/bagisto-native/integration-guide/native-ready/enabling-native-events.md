# Enabling Native Events

Instead of writing custom logic for "Add to Cart" or "Share", use the native triggers.

## Using Utility Functions

When a user performs an action (e.g., clicks "Add to Cart"), call the utility function to notify the native app.

```tsx
import { triggerHotwireNativeToast, triggerCartCountValue } from '@bagisto-native/core';

function handleAddToCart(count) {
  // 1. Perform API call to add to cart
  api.addToCart(...);

  // 2. Notify Native App to update badge
  triggerCartCountValue(count);

  // 3. Show Native Toast
  triggerHotwireNativeToast("Product added to cart!");
}
```

This ensures the user sees a native UI response (Android Toast / iOS Snack bar) rather than a web HTML alert.

## Next Steps

- Learn about [Native-safe Routing Rules](./native-safe-routing-rules.md)
- Understand [SSR vs Client-side Considerations](./ssr-vs-client-side-considerations.md)
- Explore [Web Components](../../sdk-reference/bagisto-native-core/web-components.md)
