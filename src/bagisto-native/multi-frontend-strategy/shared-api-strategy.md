# Shared API Strategy

A key benefit of Bagisto Native is that it consumes the **exact same API** as your web storefront and other headless channels.

## Bagisto GraphQL API

The native app does not require a special "mobile API". It relies on the standard Bagisto GraphQL endpoints.

- **Endpoint**: `https://your-store.com/graphql`
- **Documentation**: [Bagisto GraphQL Docs](https://devdocs.bagisto.com/1.x/graphql/)

## Authentication Sharing

As discussed in [Authentication Flows](../advanced-guides/authentication-flows.md), you can share sessions.

1.  **Cookie Sharing**: The native WebView enables `HttpOnly` cookies. Login once on web, and the session persists for subsequent GraphQL calls made by the browser.
2.  **State Management**: Use a library like **Apollo Client** or **TanStack Query** to manage server state.
    - Since the API is shared, you can rehydrate your cache from server-side renders (Next.js) to the client effortlessly.

## Versioning

Since the Web and Native app share the same frontend codebase (mostly), API versioning issues are minimized. Typically, the "Native App" is just a window into your "Web App".

- **Update Strategy**: When you deploy a new version of your Web App (new API fields, new UI), the Native App gets it **instantly**. No App Store review needed.
- **Breaking Changes**: If you change the GraphQL schema, ensure your web deployment coincides with the backend update.

## API Extensions

If you need native-specific data (e.g., "is this user on iOS?"), avoid creating new API endpoints. Instead:
1.  Pass context via HTTP Headers in the WebView.
    - `X-Platform: iOS`
2.  Or check the User-Agent string on the server.

## Next Steps

- Learn about [React SPA Usage](./react-spa-usage.md)
- Explore [Future Support](./future-support.md)
- Understand [Backend Support](../introduction/supported-ecosystems.md)
