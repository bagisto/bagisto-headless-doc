# Server vs Client Usage

All utility functions in the Core package are **Isomorphic-safe**.

This means you can call them safely:
1.  **On the Server**: They check for `typeof document === 'undefined'` and simply return without error.
2.  **On the Client**: They execute the DOM logic.

However, for functions that trigger visual changes (Tooast, Theme), calling them on the server has no effect because the native bridge only exists in the client's WebView context.

::: tip Best Practice
Always invoke event triggers (Toast, Cart Count) inside client-side event handlers or `useEffect` hooks.
:::

## Next Steps

- Explore [Best Practices](../best-practices.md)
- Understand the [React Module](../../react-module/react-overview.md)
- Learn about [Integrating Native Framework](../../integrating-native-framework/installing-packages.md)
