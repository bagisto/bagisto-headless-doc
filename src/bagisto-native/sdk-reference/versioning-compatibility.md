# Versioning & Compatibility

To ensure a stable and high-performance integration, Bagisto Native follows a strict versioning policy. This page helps you align your tech stack with the Bagisto ecosystem.

## Core Technology Stack

Maintain these minimum versions in your development environment to ensure a stable bridge connection across any headless architecture.

| Technology | Minimum Version | Recommended | Notes |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v18.x` | `v20.x` (LTS) | Required for modern build cycles. |
| **React** | `v18.0.0` | `v18.x` or newer | Supports the `@bagisto-native/react` wrappers. |
| **Next.js** | `v13.x` | `v15.x` | Optimized for App Router architecture. |
| **API Backend** | Any | Latest | Works with REST, GraphQL, or Custom APIs. |

---

## Ecosystem Compatibility Matrix

The Bagisto Native framework is designed to be **API-agnostic**, ensuring the Bridge Protocol works across any frontend-backend combination.

| Native Framework (JS) | Headless Web Application | Backend & API Services | Native Shell (iOS/Android) |
| :--- | :--- | :--- | :--- |
| `v1.0.x` | Compatible | Any GraphQL/REST | `v1.0.x` |
| `v1.x.x` | Compatible | Any GraphQL/REST | `v1.x.x` |

> **Tip**: The bridge is independent of your backend logic. As long as your web app is reachable via URL, the native features will function correctly.

> **Tip**: If you upgrade the JS framework, ensure your Native iOS/Android app shells are also updated to support new bridge messages.

---

## Versioning Strategy

Bagisto Native follows [Semantic Versioning (SemVer)](https://semver.org/):

- **Major (`1.0.0`)**: Breaking changes in the bridge protocol or React component APIs.
- **Minor (`0.1.0`)**: New native features (e.g., adding a new scanner component).
- **Patch (`0.0.1`)**: Bug fixes and performance optimizations.

### Package Synchronization
Always keep `@bagisto-native/core` and `@bagisto-native/react` on the same version:

```json
"dependencies": {
  "@bagisto-native/core": "^1.0.0",
  "@bagisto-native/react": "^1.0.0"
}
```

---

## Native Platform Support

The native shells rely on modern web engines provided by the mobile operating systems.

- **iOS**: iOS 15.0+ (Uses `WKWebView`)
- **Android**: Android 7.0+ (API Level 24) (Uses `System WebView`)

::: warning Major Upgrades
When migrating between major versions (e.g., v1 to v2), always refer to the **Migration Guide** (if available) as the Bridge message structure may change.
:::

## Next Steps

- Learn about [Getting Started](../integration-guide/getting-started.md)
- Explore [Integration with Bagisto Headless](../getting-started/integration-with-bagisto-headless/setup-flow-overview.md)
