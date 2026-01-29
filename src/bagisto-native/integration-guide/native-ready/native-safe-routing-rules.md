# Native-safe Routing Rules

Bagisto Native relies on **URL Pattern Matching** to determine if a link should open in the current WebView, a new Modal, or an External Browser.

## Standard Rules

| Pattern | Action | Use Case |
| :--- | :--- | :--- |
| **Same Domain** | Turbo Drive Navigation | Moving from Product -> Category. |
| **Different Domain** | External Browser | Opening Payment Gateways or Social Links. |

## Modals for Auth / Cart

The native app is often configured to open path patterns like `/checkout/cart` or `/customer/login` in a **native modal**.

*   Ensure your Cart page URL matches the pattern expected by the native app configuration.
*   Do not use complex hash routers (`/#/cart`) as they are harder for native interceptors to detect. Use clean paths.

## History Sync

Always include the `<HotwireHistorySync />` component. It tells the Native App exactly what the current URL is after a client-side navigation, ensuring the native "Back" button works correctly.

## Next Steps

- Understand [SSR vs Client-side Considerations](./ssr-vs-client-side-considerations.md)
- Learn about [Registering Bridge Components](./registering-bridge-components.md)
- Explore [Core Module](../../sdk-reference/bagisto-native-core/core-overview.md)
