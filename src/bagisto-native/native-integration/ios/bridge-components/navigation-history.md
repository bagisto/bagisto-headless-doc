# Navigation History Component

The `NavigationHistory` component ensures that the native iOS navigation stack and the webview's history are perfectly synchronized.

## Basic Info

- **Native Class**: `NavigationHistort.swift`
- **GitHub Path**: [NavigationHistort.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/NavigationHistort.swift)

## Description

This internal component prevents common "double back" or "frozen loader" issues by informing the native app about web-side navigation changes, ensuring the native "Back" button always behaves as expected.

## How it works

This component is usually active automatically when using `Bridgework.coreComponents`. It listens for `turbo:visit` and `popstate` events in the webview and updates the native `UINavigationController`.

## Verification

If navigation feels sluggish or the back button requires two clicks, verify that this component is registered and active in your `AppDelegate`.

```swift
Hotwire.registerBridgeComponents([NavigationHistory.self])
```
