# iOS Requirements

To build and run the native iOS application wrapper, you need a properly configured Apple development environment.

## Software

*   **Xcode**: Version **14.3** or newer is required. Download it from the Mac App Store.
*   **iOS SDK**: iOS 15.0 or later.
*   **CocoaPods** (Optional): If managing native dependencies manually, though modern projects often use Swift Package Manager.

## Hardware

*   **Mac**: A Mac running macOS Sonoma is recommended.
*   **Device**: An iOS device (iPhone/iPad) is recommended for testing camera features (like Barcode Scanning) which may not work fully in the Simulator.

## Developer Account

*   **Apple ID**: Required to download Xcode.
*   **Apple Developer Program**: Required if you intend to distribute the app to the App Store or use TestFlight.

::: info Simulator
The iOS Simulator (included with Xcode) is sufficient for testing most UI and Hotwire navigation features during development.
:::

## Next Steps

- Check [Network Requirements](./network-requirements.md)
- Explore [Getting Started](../getting-started/setup-flow-overview.md)
- Understand [iOS App Setup](../native-integration/ios-app-setup.md)
