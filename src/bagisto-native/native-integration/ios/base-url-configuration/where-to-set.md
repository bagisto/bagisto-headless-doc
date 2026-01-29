# Where to Set Base URL

In the iOS Native App project, the Base URL is centrally managed to ensure consistency across the application.

## Configuration File
The URL is typically defined in `SceneDelegate.swift` within an `AppConfig` struct.

### Implementation Example
Locate the `AppConfig` struct in your project:

```swift
// MARK: - App Configuration
struct AppConfig {
    static var baseURL: URL = URL(string: "https://your-bagisto-storefront.com/")!
}
```

## How to Set
1. Open the project in **Xcode**.
2. Navigate to `SceneDelegate.swift`.
3. Locate the `AppConfig` struct near the top of the file.
4. Replace the existing URL string with your storefront's URL.

> [!TIP]
> If you are using a local development server, ensure your Mac and iOS device are on the same Wi-Fi network and use your Mac's IP address (e.g., `http://192.168.1.10:3000`).
