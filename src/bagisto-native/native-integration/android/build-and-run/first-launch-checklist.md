# First Launch Checklist

Before you hit the "Run" button in Android Studio for the first time, go through this checklist to ensure a successful launch.

## 1. Storefront Status

- [ ] Is your web storefront running?
- [ ] Can you access the storefront in a browser on your computer?
- [ ] Is the `@bagisto-native` JavaScript correctly included in your storefront?

## 2. Android Studio Configuration

- [ ] Is the BagistoNative Android library added and synced?
- [ ] Is the `startLocation` set to the correct URL?
- [ ] Are the bridge components registered in `MainActivity.kt`?

## 3. Network Setup

- [ ] (Emulator) Is your computer connected to the internet?
- [ ] (Device) Is the Android device and computer on the same Wi-Fi?
- [ ] (Device) Is the URL using the computer's IP address (not `localhost`)?
- [ ] (Emulator) Use `10.0.2.2` to access host machine localhost

## 4. Permissions

- [ ] Does the `AndroidManifest.xml` contain the necessary internet permission?

> [!IMPORTANT]
> If the app loads but shows a blank white screen, double-check your base URL and network connectivity first.
