# Verifying Native-Web Communication

Ensuring that the web storefront and the native Android shell are "talking" to each other is critical for bridge functionality.

## 1. Verify Bridge Connection

When the app loads, open Chrome DevTools on your computer:
- Connect your Android device via USB
- Navigate to `chrome://inspect` in Chrome
- Find your WebView and click "Inspect"

In the console, type `window.BagistoNative` (or your registered bridge namespace).
- If it returns an object, the bridge is successfully initialized.

## 2. Check for Bridge Events

Trigger an action on the web page that is supposed to call a native feature (e.g., clicking an "Alert" button).
- Look for logs in Logcat. If you enabled debug logging, you should see incoming bridge message logs.

## 3. Test a Core Component

The easiest way to verify communication is to use a component like `AlertComponent`.
1. Trigger an alert from your web page.
2. Click it in the Android app.
3. Observe if the native action (like a toast or alert dialog) is triggered.

> [!TIP]
> If actions aren't triggering, verify that the bridge JavaScript is loaded **before** any bridge components are rendered on the page.
