# Purpose of Core Module

The primary purpose of `@bagisto-native/core` is to establish a standardized **communication protocol** (Bridge) between the Web View and the Native Shell.

## Responsibilities

1.  **Transport Layer**: It manages the `postMessage` (Android) and `webkit.messageHandlers` (iOS) channels.
2.  **State Synchronization**: It keeps the native navigation stack in sync with the web's URL.
3.  **Hardware Access**: It provides a unified API to trigger hardware features like Haptic Feedback and location services.
4.  **UI Coordination**: It coordinates native UI elements (like the Navigation Bar title and buttons) based on the web page's content.

## Next Steps

- Understand [What Problems It Solves](./what-problems-it-solves.md)
- Explore [Web Components](../web-components.md)
- Learn about [Utility Functions](../utility-functions.md)
