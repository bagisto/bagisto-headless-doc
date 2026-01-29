# Available Bridge Components

The **BagistoNative_iOS** library includes a wide range of bridge components that enable nearly every aspect of the native experience to be controlled from the web.

## Comprehensive Component List

These components are typically registered via `Bridgework.coreComponents` and can be triggered from your React/Next.js application.

<!-- ### 1. [AlertComponent](./alert.md)
Triggers native iOS alerts (standard system dialogs). -->

### 1. [BarcodeScannerComponent](./barcode-scanner.md)
Provides access to a native barcode/QR code scanner.

<!-- ### 3. [ButtonComponent / NavBarButton](./button.md)
Handles interactions for custom buttons and navigation bar buttons. -->

<!-- ### 4. [DownloadFile](./download-file.md)
Enables native file downloading and management. -->

<!-- ### 5. [FormComponent](./form.md)
Enhances web forms with native behaviors. -->

<!-- ### 6. [HapticComponent](./haptic.md)
Triggers haptic feedback (vibrations) on the device. -->

### 2. [ImageSearchComponent](./image-search.md)
Integrates with the device camera for visual searches.

### 3. [LocationComponent](./location.md)
Syncs the webview's location and handles native geo-location.

<!-- ### 9. [MenuComponent](./menu.md)
Controls the native side-drawer or tab menus. -->

### 4. [NavigationHistory](./navigation-history.md)
Ensures the native navigation stack and web history are in sync.

<!-- ### 11. [ReviewPromptComponent](./review-prompt.md)
Triggers the native iOS App Store review prompt. -->

### 5. [SearchComponent](./search.md)
Bridges web search inputs with the native search bar.

### 6. [ThemeComponent](./theme.md)
Synchronizes Light/Dark mode between iOS and the webview.

<!-- ### 14. [Adding New Component](../how-to-guides/add-new-component.md)
Learn how to build your own bridge component and extend the native capabilities. -->

### 7. [ToastComponent](./toast.md)
Displays non-intrusive native success, error, or info messages.

### 8. [Dynamic Button](./custom-button-view.md)
A versatile component that dynamically manages navigation bar buttons, including cart badges, scanner actions, and theme switching.

## Component Functionality Reference

If you need to deep-dive into the specific implementation or logic of a component, you can find the source code here:

[GitHub: BagistoNative_iOS Components](https://github.com/SocialMobikul/BagistoNative_iOS/tree/main/Sources/BagistoNative_iOS/Classes/Components)

## How to Verify
1. **Xcode Console**: Most components log their initialization and activation events.
2. **Interactive Testing**: Use the [iOS App Setup](../ios-app-setup/repository-overview.md) to run the app and trigger these components from your local development server.
