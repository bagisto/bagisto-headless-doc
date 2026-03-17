# Registering Bridge Components

This guide explains how to register native bridge components in your Android application.

## Basic Info

- **Native Class**: `BridgeNavigator`
- **GitHub Path**: [BridgeNavigator.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/BridgeNavigator.kt)

## Overview

Bridge components must be registered with the `BridgeNavigator` to be accessible from the web layer. This registration maps a component ID to its native implementation.

## Registration Process

### 1. Initialize Bridge Navigator

In your `MainActivity.kt`:

```kotlin
class MainActivity : AppCompatActivity() {
    
    private lateinit var navigator: BridgeNavigator
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize the bridge navigator
        navigator = BridgeNavigator(this)
        
        // Register components
        registerComponents()
        
        // Load web content
        loadWebContent()
    }
    
    private fun registerComponents() {
        // Core components
        navigator.registerBridgeComponent("alert", AlertComponent(this))
        navigator.registerBridgeComponent("toast", ToastComponent(this))
        navigator.registerBridgeComponent("button", ButtonComponent(this))
        navigator.registerBridgeComponent("menu", MenuComponent(this))
        
        // Navigation components
        navigator.registerBridgeComponent("navigationHistory", NavigationHistoryComponent(this))
        navigator.registerBridgeComponent("navbarButton", NavbarButtonComponent(this))
        
        // Device features
        navigator.registerBridgeComponent("location", LocationComponent(this))
        navigator.registerBridgeComponent("barcodeScanner", BarcodeScannerComponent(this))
        navigator.registerBridgeComponent("imageSearch", ImageSearchComponent(this))
        navigator.registerBridgeComponent("haptic", HapticComponent(this))
        
        // Media & files
        navigator.registerBridgeComponent("downloadFile", DownloadFileComponent(this))
        navigator.registerBridgeComponent("share", ShareComponent(this))
        navigator.registerBridgeComponent("search", SearchComponent(this))
        
        // UX components
        navigator.registerBridgeComponent("theme", ThemeComponent(this))
        navigator.registerBridgeComponent("themeMode", ThemeModeComponent(this))
        navigator.registerBridgeComponent("reviewPrompt", ReviewPromptComponent(this))
        
        // Account
        navigator.registerBridgeComponent("logout", LogoutComponent(this))
        navigator.registerBridgeComponent("form", FormComponent(this))
    }
    
    private fun loadWebContent() {
        // Load your web app
        webView.loadUrl("https://your-app.com")
    }
}
```

### 2. Component ID Naming

Use consistent naming conventions:

| Category | Prefix | Example |
|----------|--------|---------|
| Core | None | `alert`, `toast`, `menu` |
| Navigation | `navigation`, `navbar` | `navigationHistory`, `navbarButton` |
| Device | None | `location`, `camera` |
| Media | None | `share`, `downloadFile` |

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.VIBRATE" />
```

## Web Layer Usage

After registration, components are accessible from JavaScript:

```javascript
import { useAlert } from '@bagisto-native/react';

const MyComponent = () => {
    const { showAlert } = useAlert();
    
    showAlert({
        title: "Hello",
        message: "This is a native alert!"
    });
};
```

## Troubleshooting

### Component Not Found

If you get "component not registered" errors:

1. Verify the component is registered in `onCreate()`
2. Check the component ID matches exactly
3. Ensure the component class is imported

### Permission Errors

If native features don't work:

1. Check required permissions in manifest
2. Request runtime permissions in code
3. Verify component is initialized before use

## Next Steps

- [Bridge Components Overview](./overview.md) - View all components
- [Alert Component](./alert.md) - Start with a simple component
- [Bridge Components (iOS)](../ios/bridge-components/registration.md) - iOS equivalent
