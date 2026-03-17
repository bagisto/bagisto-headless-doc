# Common Mistakes

Avoiding these common pitfalls will save you time during the setup of your Android Native App.

## 1. Incorrect URL Format

The Base URL must be a valid URL string including the protocol.
- **Wrong**: `192.168.1.10:3000`
- **Right**: `http://192.168.1.10:3000/`

## 2. HTTP in Production

Forgetting that Android blocks HTTP by default on Android 9+.
- **Issue**: App fails to load `http` content.
- **Solution**: Use `https` for production, or add `android:usesCleartextTraffic="true"` in `AndroidManifest.xml` for development.

## 3. Network Isolation

The Android emulator is on a different network than your development machine.
- **Issue**: App cannot reach the local server.
- **Solution**: Use `10.0.2.2` to access host machine localhost from emulator.

## 4. Port Forwarding

The development server is running on port 3000, but the emulator can't reach it.
- **Solution**: Use ADB port forwarding: `adb reverse tcp:3000 tcp:3000`

## 5. Missing Component Registration

Forgot to call `navigator.registerBridgeComponent(...)`.
- **Issue**: Web actions (like search) don't trigger native UI.
- **Solution**: Verify `MainActivity.kt` has all component registrations.
