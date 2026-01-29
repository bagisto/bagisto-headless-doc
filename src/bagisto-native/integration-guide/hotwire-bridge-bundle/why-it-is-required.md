# Why It Is Required

You might ask: *"Why can't I just import the controllers in my React code?"*

## The Problem
Web applications (especially Next.js) often use module bundlers like Webpack that isolate code into chunks. However, the Native iOS/Android apps inject their own scripts into the WebView to "hook" into the JavaScript environment.

## The Solution
The `bundle.js` provides a predictable, global entry point. The Native App knows that if it loads this script, the `window.Stimulus` object will be available, and the bridge controllers (like `bridge--toast`) will be registered and ready to receive messages.

Without this specific bundle, the native app's "glue code" would have nothing to stick to, and features like the native navigation bar or hardware back button would fail to sync with your website.

## Next Steps

- Learn [How to Include It Safely](./how-to-include-it-safely.md)
- Explore [Production vs Development Notes](./production-vs-development-notes.md)
- Understand [Making App Native-Ready](../making-app-native-ready.md)
