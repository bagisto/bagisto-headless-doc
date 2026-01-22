# Versioning & Compatibility

Ensure your environment meets the following requirements to successfully run Bagisto Native.

## System Requirements

| Technology | Minimum Version | Recommended |
| :--- | :--- | :--- |
| **Node.js** | `v18.x` | `v20.x` (LTS) |
| **React** | `v18.0.0` | `v18.x` or newer |
| **Next.js** | `v13.x` | `v15.x` |
| **Bagisto Headless** | `v1.0.0` | Latest |

## Bagisto Native Packages

We recommend keeping both `@bagisto-native/core` and `@bagisto-native/react` on the same major version to ensure compatibility.

```json
"dependencies": {
  "@bagisto-native/core": "^1.0.0",
  "@bagisto-native/react": "^1.0.0"
}
```

::: warning Native App Version
The native iOS and Android applications also need to be compatible with the message protocol used by the Hotwire bundle. Always check the release notes of the native app repository for the required web package versions.
:::

## Next Steps

- Learn about [Prerequisites](../prerequisites/system-requirements.md)
- Understand [Networking Requirements](../prerequisites/network-requirements.md)
- Explore [Getting Started](../getting-started/setup-flow-overview.md)
