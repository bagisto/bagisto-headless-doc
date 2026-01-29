# Common Mistakes

Avoiding these common pitfalls will save you time during the setup of your iOS Native App app.

## 1. Incorrect URL Format
The Base URL must be a valid URL string including the protocol and a trailing slash in some cases.
- **Wrong**: `192.168.1.10:3000`
- **Right**: `http://192.168.1.10:3000/`

## 2. SSL/TLS Issues (ATS)
Forgetting that Apple enforces HTTPS for all connections by default.
- **Issue**: App fails to load `http` content.
- **Solution**: Add `NSAppTransportSecurity` exceptions in `Info.plist` for development, or use `https`.

## 3. Network Isolation
The iPhone is on 5G and the Mac is on Wi-Fi.
- **Issue**: App cannot reach the local server.
- **Solution**: Ensure both devices are on the same Wi-Fi subnet.

## 4. Port Blocking
Vite/Next.js is running on port 3000, but the Mac's firewall is blocking it.
- **Solution**: Check your System Settings → Network → Firewall options.

## 5. Missing Component Registration
Forgot to call `Hotwire.registerBridgeComponents(...)`.
- **Issue**: Web actions (like search) don't trigger native UI.
- **Solution**: Verify `AppDelegate.swift` has the registration call.
