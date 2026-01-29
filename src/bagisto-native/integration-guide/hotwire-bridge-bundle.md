# Hotwire Bridge Bundle

The **Hotwire Bridge Bundle** (`bundle.js`) is the "secret sauce" that allows your web application to talk to the native mobile shell.

Without this file, your app is just a regular website inside a WebView. With it, it becomes a "Native" app capable of triggering native toasts, accessing the camera, and syncing navigation history.

## Key Concepts

*   **Static Asset**: It is a pre-compiled JavaScript file.
*   **Public Access**: It must be served publicly so the native app can inject/load it.
*   **Initialization**: It automatically initializes the global `Stimulus` application and registers the bridge controllers.

## Next Steps

- Understand [What is bundle.js](./hotwire-bridge-bundle/what-bundlejs-is.md)
- Learn [How to Include It Safely](./hotwire-bridge-bundle/how-to-include-it-safely.md)
- Explore [Making App Native-Ready](./making-app-native-ready.md)
