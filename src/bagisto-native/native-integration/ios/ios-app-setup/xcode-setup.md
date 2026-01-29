# Xcode Setup

To begin development with the iOS Native App library, you need to configure your Xcode environment correctly.

## Prerequisites
- **Xcode 14.0** or later.
- **macOS Monterey** or later.
- A **your web storefront Storefront** running locally or in production.

## Step 1: Install Dependencies
The library uses **Swift Package Manager (SPM)**.
1. Open your project in Xcode.
2. Go to **File → Add Package Dependencies...**.
3. Enter the repository URL: `https://github.com/SocialMobikul/BagistoNative_iOS`.
4. Select the version or branch you wish to use.
5. Click **Add Package**.

## Step 2: Configure Info.plist
Ensure your app has the necessary permissions.
- **Local Network**: If testing on a physical device, you may need to add `Privacy - Local Network Usage Description`.
- **App Transport Security**: Add exceptions for local `http` URLs if needed.

## Step 3: Register Components
In your `AppDelegate.swift`, register the core bridge components:

```swift
import BagistoNative_iOS

func application(...) {
    Hotwire.registerBridgeComponents(Bridgework.coreComponents)
    return true
}
```
