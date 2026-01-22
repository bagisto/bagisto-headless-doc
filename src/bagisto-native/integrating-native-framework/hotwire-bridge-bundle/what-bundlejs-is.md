# What is bundle.js?

`bundle.js` is a pre-bundled JavaScript file provided by `@bagisto-native/core`.

It contains:
1.  **Turbo / Hotwire**: The core navigation library.
2.  **Stimulus**: The Javascript framework for HTML.
3.  **Bridge Component Controllers**: The logic files located in `hotwire/controllers/` (e.g., `ToastComponent`, `DynamicButtonComponent`).
4.  **Native Bridge Library**: The `@hotwired/hotwire-native-bridge` code that handles the actual implementation of `postMessage` to iOS/Android.

When this file runs in a browser (or WebView), it initializes the `window.Stimulus` application and registers all the "bridge--" controllers.

## Next Steps

- Understand [Why It Is Required](./why-it-is-required.md)
- Learn [How to Include It Safely](./how-to-include-it-safely.md)
- Explore [Production vs Development Notes](./production-vs-development-notes.md)
