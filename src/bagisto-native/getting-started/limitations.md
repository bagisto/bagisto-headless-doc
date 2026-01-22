# Limitations & Common Pitfalls

While Bagisto Native provides a powerful bridge between web and native environments, there are several critical limitations and architectural rules that developers must follow to ensure a stable application.

## 1. JavaScript Errors
The Hotwire Native bridge relies heavily on a stable JavaScript environment. 
- **Fatal Impact**: If any type of JavaScript error occurs on your web instance (uncaught exceptions, syntax errors, etc.), the native app may stop working or behave unpredictably.
- **Console Warnings**: Even non-fatal console issues (like missing assets or failed network requests) can impact the overall reliability and performance of the bridge.

## 2. API Response Headers
The native app relies on standard HTTP behaviors. If incorrect or unexpected headers are set in your API responses, the app may fail to process the data correctly or crash. Ensure your backend consistently returns the correct `Content-Type` and standard status codes.

## 3. Framework Architecture
When using modern frameworks like **Next.js**, it is vital to adhere to their specific architectural concepts (e.g., proper use of `'use client'`, avoiding direct DOM manipulation in server components). Breaking these rules can cause the Hotwire components to lose their connection to the bridge.

## 4. Stability First
In summary, any type of JS console issue may crash or hang the application. A "stable web is a stable app" philosophy is required when building with Bagisto Native.

## Further Reading
For more details on the underlying technology and for solving specific implementation problems, please refer to the official Turbo documentation:
- [Turbo Handbook - Introduction](https://turbo.hotwired.dev/handbook/introduction)

## Next Steps

- Learn about [Installing Packages](../integrating-native-framework/installing-packages.md)
- Explore [Hotwire Bridge Bundle](../integrating-native-framework/hotwire-bridge-bundle.md)
- Understand [Making App Native-Ready](../integrating-native-framework/making-app-native-ready.md)
