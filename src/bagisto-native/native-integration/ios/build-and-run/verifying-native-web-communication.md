# Verifying Native-Web Communication

Ensuring that the web storefront and the native iOS shell are "talking" to each other is critical for bridge functionality.

## 1. Verify Bridge Connection
When the app loads, open the Safari Web Inspector on your Mac (Develop → [Your Device] → [Your URL]).
- In the console, type `window.NativeBridge` (or your registered bridge namespace).
- If it returns an object, the bridge is successfully initialized.

## 2. Check for Bridge Events
Trigger an action on the web page that is supposed to call a native feature (e.g., clicking a "Native Search" button).
- Look for console logs in Xcode. If you enabled `Hotwire.config.debugLoggingEnabled = true`, you should see incoming bridge message logs.

## 3. Test a Core Component
The easiest way to verify communication is to use a component like `DynamicButton`.
1. Place a `<dynamic-button>` element on your web page.
2. Click it in the iOS app.
3. Observe if the native action (like a toast or navigation) is triggered.

> [!TIP]
> If actions aren't triggering, verify that the `bundle.js` is loaded **before** any bridge components are rendered on the page.
