# First Launch Checklist

Before you hit the "Run" button in Xcode for the first time, go through this checklist to ensure a successful launch.

## 1. Storefront Status
- [ ] Is your your web storefront storefront running?
- [ ] Can you access the storefront in Safari on your Mac?
- [ ] Is the `bundle.js` (Hotwire Bridge) correctly included in your storefront?

## 2. Xcode Configuration
- [ ] Is the `BagistoNative_iOS` package dependency added and fetched?
- [ ] Is the `AppConfig.baseURL` set to the correct URL?
- [ ] Are the bridge components registered in `AppDelegate.swift`?

## 3. Network Setup
- [ ] (Simulator) Is your Mac connected to the internet?
- [ ] (Device) Are the iPhone and Mac on the same Wi-Fi?
- [ ] (Device) Is the URL using the Mac's IP address (not `localhost`)?

## 4. Permissions
- [ ] Does the `Info.plist` contain the necessary `NSAppTransportSecurity` exceptions if using `http`?

> [!IMPORTANT]
> If the app loads but shows a blank white screen, double-check your `baseURL` and network connectivity first.
