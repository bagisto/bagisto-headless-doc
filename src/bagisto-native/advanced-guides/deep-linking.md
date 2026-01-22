# Deep Linking Strategy


Deep linking allows your native application to respond to external URLs (e.g., from emails, push notifications, or other apps) by navigating to the correct screen within the Bagisto Native app.

## Project URL Configuration

Crucially, your native app is configured with a **Base URL** (e.g., `https://your-store.com`). The native app intercepts links matching this domain.

- **Path Routing**: If a user clicks `https://your-store.com/checkout/onepage`, the native app intercepts this. Instead of opening Safari/Chrome, it pushes a new ViewController (iOS) or Activity (Android) loading that URL.
- **Universal Links (iOS) / App Links (Android)**: You must configure your `apple-app-site-association` and `assetlinks.json` files on your server to prove ownership of the domain. This allow the OS to open your app directly.

## Handling Routing in Bagisto Native

Bagisto Native relies on standard web routing (`Next.js` pages).

1.  **Normal Navigation**: When you define a link `<a href="/product/1">`, Turbo Native intercepts the click and handles the transition natively.
2.  **Programmatic Navigation**: If you need to navigate programmatically, ensure you use `Turbo.visit("/path")` or `window.location.href = "/path"`.

## Deep Linking to Specific Native Tabs

Sometimes you want a link to switch to a specific native tab (e.g., "Cart" or "Profile") rather than pushing a new WebView. This requires native-side configuration in your `SceneDelegate` (iOS) or `MainActivity` (Android).

**Web-Side Triggering:**
If you want to trigger a tab switch from the web:
1.  Use the URL path conventions (e.g., `/checkout/cart` might be mapped natively to the Cart Tab).
2.  Or use a Bridge Component to send a "switchTab" message.

```javascript
// Example: Switching to Cart Tab via Bridge
this.send("delegate", { action: "selectTab", tab: "cart" });
```

## Push Notifications

Payloads for push notifications should include a `path` parameter.
```json
{
  "aps": {
    "alert": "New Offer!"
  },
  "path": "/category/sale"
}
```
When the user taps the notification, the native app reads the `path` and calls `session.visit('/category/sale')`.


## Next Steps

- Explore [Authentication Flows](./authentication-flows.md)
- Learn about [Analytics & Tracking](./analytics-tracking.md)
- Understand [Checkout Edge Cases](./checkout-edge-cases.md)
