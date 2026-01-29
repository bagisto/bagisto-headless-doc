# Component Registration

Before your iOS app can respond to bridge events, you must register the specific components in your `AppDelegate` or during the app initialization phase.

## Registration in Swift

The `BagistoNative_iOS` library provides a convenient way to register all core bridge components at once or individually.

### Step 1: Import the Library
In your `AppDelegate.swift` or wherever you initialize your Hotwire configuration:

```swift
import BagistoNative_iOS
```

### Step 2: Register Components
Call the `registerBridgeComponents` method. It is recommended to do this within `application(_:didFinishLaunchingWithOptions:)`.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    // Register all core components provided by the library
    Hotwire.registerBridgeComponents(Bridgework.coreComponents)
    
    return true
}
```

## Custom Component Registration

If you have created your own custom bridge components, you can register them alongside the core components:

```swift
Hotwire.registerBridgeComponents([
    MyCustomComponent.self,
    AnotherComponent.self
] + Bridgework.coreComponents)
```

## Verification

To verify that components are registered correctly:
1. Run the app in the **Xcode Simulator**.
2. Look at the console output.
3. If a component is triggered from the web but not registered, you will typically see a warning in the Xcode logs.

- [Explore Available Components](./available-components.md)
