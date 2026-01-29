# Configuration Example

Setting up your iOS Native App app involves two primary steps: registering the bridge components in the `AppDelegate` and configuring the initial navigation in the `SceneDelegate`.

## Step 1: Register Components (AppDelegate)

The `AppDelegate` is responsible for app-wide initialization. Here, we register the bridge components that allow the web and native layers to communicate.

```swift
import UIKit
import HotwireNative
import BagistoNative_iOS

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        configureHotwire()
        
        return true
    }

    private func configureHotwire() {
        // Register the core bridge components
        Hotwire.registerBridgeComponents(Bridgework.coreComponents)

        // Optional: Additional configuration
        Hotwire.config.backButtonDisplayMode = .minimal
        Hotwire.config.debugLoggingEnabled = true
    }
}
```

## Step 2: Configure Starting URL (SceneDelegate)

The `SceneDelegate` manages the window scenes. This is where you define your Base URL and start the Hotwire Navigator.

```swift
import HotwireNative
import UIKit

// MARK: - App Configuration
struct AppConfig {
    static var baseURL: URL = URL(string: "https://your-bagisto-storefront.com/")!
}

// MARK: - Navigator Setup
var navigator: Navigator? = {
    let config = Navigator.Configuration(name: "main", startLocation: AppConfig.baseURL)
    return Navigator(configuration: config)
}()

// MARK: - Scene Delegate
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    var window: UIWindow?

    func scene(_ scene: UIScene, 
               willConnectTo session: UISceneSession, 
               options connectionOptions: UIScene.ConnectionOptions) {
        
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = navigator?.rootViewController
        window?.makeKeyAndVisible()

        navigator?.start()
    }
}
```

## Key Breakdown

1.  **Bridgework.coreComponents**: This provides the default set of bridge components (Search, Location, etc.) recognized by the Bagisto Native framework.
2.  **AppConfig**: A centralized location for your storefront's URL.
3.  **Navigator**: Manages the WebView stack and coordinates transitions between web pages and native views.

> [!IMPORTANT]
> Make sure to call `Hotwire.registerBridgeComponents` **before** starting the navigator to ensure all components are available when the first page loads.
