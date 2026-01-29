# Environment Switching

Managing multiple environments (Development, Staging, Production) efficiently is a common requirement during the app lifecycle.

## Manual Switching
The simplest way to switch environments is by modifying the `AppConfig` struct in `SceneDelegate.swift`.

```swift
// Example: Switching from Local to Staging
struct AppConfig {
    static var baseURL: URL = URL(string: "https://staging.yourstore.com/")!
}
```

## Recommended Approach: Conditional URLs
For more complex workflows, you can use Swift's conditional compilation or simple Boolean flags to switch URLs.

```swift
struct AppConfig {
    static let useStaging = true
    
    static var baseURL: URL {
        if useStaging {
            return URL(string: "https://staging.yourstore.com/")!
        } else {
            return URL(string: "https://yourstore.com/")!
        }
    }
}
```

## Advanced: Shared Schemes
In Xcode, you can create multiple **Build Schemes** (e.g., `Example-Dev`, `Example-Prod`) and use **xcconfig** files to inject the Base URL into the project's environment variables. This is the gold standard for enterprise-level apps.

> [!TIP]
> Always verify which environment is active before deploying to the App Store using a simple `print(AppConfig.baseURL)` in `AppDelegate`.
