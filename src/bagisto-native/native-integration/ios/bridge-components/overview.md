# Bridge Components Overview

Bridge components are the key to communication between your **your web storefront (Web)** application and the **iOS Native App** app. They allow web-based elements to trigger native iOS functionality.

## How it Works

The iOS Native App library uses **Hotwire (Turbo Native)** to bridge the gap between web and native. When a specific HTML element or event is triggered in the webview, the bridge components intercept these actions and execute native Swift code.

### Key Benefits
- **Native Experience**: Trigger native UI elements like toasts, alerts, and loaders from the web.
- **Deep Integration**: Control native navigation, tabs, and hardware features (like the camera or haptics) via web events.
- **Simplified Development**: Write your business logic once in React/Next.js and use bridge components to "native-ify" the experience.

## Communication Flow

1. **Web Trigger**: A user interacts with a component in the Next.js storefront (e.g., clicking an "Add to Cart" button).
2. **Bridge Event**: The `@bagisto-native/core` or `@bagisto-native/react` library sends a message through the Hotwire bridge.
3. **Native Execution**: The iOS app receives the message and performs the corresponding native action (e.g., showing a native success toast).

## Next Steps

To start using these components, you first need to register them in your iOS application.

- [Component Registration](./registration.md)
- [Available Components](./available-components.md)
