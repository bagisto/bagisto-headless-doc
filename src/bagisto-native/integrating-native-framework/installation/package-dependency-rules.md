# Package Dependency Rules

To ensure stability, follow these dependency rules.

## 1. Matching Versions

Ideally, keep `@bagisto-native/core` and `@bagisto-native/react` on the **same minor version**.

*   ✅ `core: 1.2.0`, `react: 1.2.1` (OK)
*   ❌ `core: 1.0.0`, `react: 2.0.0` (Avoid: Likely Breaking Changes)

## 2. Peer Dependencies

The React wrapper has a **peer dependency** on `react` and `react-dom`. Ensure your project meets the minimum version requirements (usually React >= 18).

## 3. Core is Singleton

Never install multiple versions of `@bagisto-native/core` in the same project. The custom element registry is global (`window.customElements`). Defining the same element (`<dynamic-button>`) twice will throw a browser error.

## Next Steps

- Explore [Hotwire Bridge Bundle](../hotwire-bridge-bundle.md)
- Learn about [Making App Native-Ready](../making-app-native-ready.md)
- Understand the [Core Module](../../core-module/core-overview.md)
