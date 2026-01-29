# SSR Limitations

Because these components modify the native app shell (state outside the DOM body), their effects are **not visible on the server render**.

For example, `<HotwireThemeMode mode="dark" />` does not change the HTML sent from the server. It only sends a message to the native iOS/Android code *after* the JavaScript loads on the client.

## SEO Implication
This has **no negative impact** on SEO, because these components (toasts, native buttons, history sync) are purely functional/behavioral and do not contain indexable content.

## Next Steps

- Understand [Client-only Components](./client-only-components.md)
- Learn about [Dynamic Imports](./dynamic-imports.md)
- Explore [Integration Patterns](../integration-patterns.md)
