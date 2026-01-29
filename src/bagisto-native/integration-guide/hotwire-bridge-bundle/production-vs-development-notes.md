# Production vs Development Notes

## Development
*   **Caching**: Browsers cache `bundle.js` aggressively. If you update the `@bagisto-native/core` package, remember to manually copy the new `bundle.js` to your public folder again.
*   **Source Maps**: The bundle is minified. Debugging inside `bundle.js` can be difficult. Rely on console logs from your React components instead.

## Production
*   **Versioning**: It is good practice to append a version query string to the script src to bust caches on new deployments:
    ```tsx
    <Script src="/bundle.js?v=1.0.1" />
    ```
*   **Performance**: The bundle is relatively small, but ensure your CDN serves it with correct compression (gzip/brotli).

## Next Steps

- Understand [Making App Native-Ready](../making-app-native-ready.md)
- Learn about [Registering Bridge Components](../native-ready/registering-bridge-components.md)
- Explore [Core Module](../../sdk-reference/bagisto-native-core/core-overview.md)
